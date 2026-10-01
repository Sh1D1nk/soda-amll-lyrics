import { LyricPlayer, LayoutAlignAnchor } from '@applemusic-like-lyrics/core';
import amllCssText from '@applemusic-like-lyrics/core/style.css';

const GLOBAL_KEY = '__SODA_AMLL__';
const LOG = (...a) => console.log('[soda-amll]', ...a);

/* ------------------------------------------------------------------ */
/* settings                                                            */
/* ------------------------------------------------------------------ */

const SETTINGS_KEY = 'soda-amll-settings-v1';

const DEFAULT_SETTINGS = {
  /* bottom bar skin */
  barStyle: 'blur', // 'off' | 'blur'
  barOpacity: 0.42,
  barBlur: 26,
  barCover: 0.45,

  /* lyric page */
  lyricTransition: true,
  lyricClickSeek: true,
  lyricFont: 'pingfang', // 'pingfang' | 'system'
  lyricFontScale: 1,
  lyricWeight: 600,
  wordBright: 1,
  showTranslation: true,
  showRoman: true,

  /* stage interactions */
  coverHideCursor: true,
  showFps: false,
  btnAnim: true,
  mediaAnim: true,

  /* background */
  bgEnabled: true,
  bgType: 'blur', // 'blur' | 'solid'
  bgBlur: 100,
  bgBrightness: 0.55,
  bgSaturate: 1.9,

  /* lyric player */
  lyricBlur: true,
  lyricScale: true,
  wordFade: 0.7,
  hidePassed: false,

  /* song info */
  showAlbum: false,
};

function clamp(v, lo, hi) {
  if (!isFinite(v)) return lo;
  return Math.min(hi, Math.max(lo, v));
}

function loadSettings() {
  let raw = {};
  try {
    raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
  } catch (e) {
    raw = {};
  }
  const s = Object.assign({}, DEFAULT_SETTINGS, raw);
  /* v1 briefly defaulted the album line on; the reference layout has none. */
  if (raw.__v !== 2) {
    s.showAlbum = DEFAULT_SETTINGS.showAlbum;
    s.__v = 2;
  }
  if (['off', 'blur'].indexOf(s.barStyle) < 0) s.barStyle = DEFAULT_SETTINGS.barStyle;
  if (['pingfang', 'system'].indexOf(s.lyricFont) < 0) s.lyricFont = DEFAULT_SETTINGS.lyricFont;
  if (['blur', 'solid'].indexOf(s.bgType) < 0) s.bgType = DEFAULT_SETTINGS.bgType;
  s.barOpacity = clamp(Number(s.barOpacity), 0.05, 0.95);
  s.barBlur = clamp(Number(s.barBlur), 0, 60);
  s.barCover = clamp(Number(s.barCover), 0, 0.9);
  s.lyricFontScale = clamp(Number(s.lyricFontScale), 0.6, 2);
  s.lyricWeight = clamp(Math.round(Number(s.lyricWeight) / 100) * 100, 200, 900);
  s.wordBright = clamp(Number(s.wordBright), 0.3, 1.4);
  s.bgBlur = clamp(Number(s.bgBlur), 0, 200);
  s.bgBrightness = clamp(Number(s.bgBrightness), 0.15, 1.2);
  s.bgSaturate = clamp(Number(s.bgSaturate), 0.5, 3);
  s.wordFade = clamp(Number(s.wordFade), 0.0001, 1.5);
  return s;
}

function saveSettings(s) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch (e) {}
}

/* ------------------------------------------------------------------ */
/* KRC / LRC parsing                                                   */
/* ------------------------------------------------------------------ */

function buildTranslationMap(cnLrc) {
  const map = new Map();
  if (!cnLrc) return map;
  for (const raw of cnLrc.split('\n')) {
    const line = raw.trim();
    const m = /^\[(\d+):(\d+)(?:[.:](\d+))?\](.*)$/.exec(line);
    if (!m) continue;
    const ms = Number(m[1]) * 60000 + Number(m[2]) * 1000 + Number((m[3] || '0').padEnd(3, '0').slice(0, 3));
    map.set(ms, m[4].trim());
  }
  return map;
}

function parseKrcBody(body, lineStart) {
  const words = [];
  const segments = body.split('<').filter((s) => s.indexOf('>') >= 0);
  for (const seg of segments) {
    const gt = seg.indexOf('>');
    const head = seg.slice(0, gt).split(',');
    const text = seg.slice(gt + 1);
    if (!text) continue;
    const offset = Number(head[0]) || 0;
    const dur = Number(head[1]) || 0;
    const chars = [...text];
    const per = chars.length ? dur / chars.length : 0;
    let t = lineStart + offset;
    for (const ch of chars) {
      words.push({ word: ch, startTime: t, endTime: t + per });
      t += per;
    }
  }
  return words;
}

function parseLrcLine(line, nextLine) {
  const m = /^\[(\d+):(\d+)(?:[.:](\d+))?\](.*)$/.exec(line);
  if (!m) return null;
  const startTime = Number(m[1]) * 60000 + Number(m[2]) * 1000 + Number((m[3] || '0').padEnd(3, '0').slice(0, 3));
  const text = m[4].trim();
  let endTime = startTime + 10000;
  if (nextLine) {
    const n = /^\[(\d+):(\d+)(?:[.:](\d+))?\]/.exec(nextLine.trim());
    if (n) endTime = Number(n[1]) * 60000 + Number(n[2]) * 1000 + Number((n[3] || '0').padEnd(3, '0').slice(0, 3));
  }
  return { text, startTime, endTime };
}

function toAmllLines(lyrics, opts) {
  if (!lyrics || !lyrics.content) return [];
  const showTranslation = !opts || opts.showTranslation !== false;
  const showRoman = !opts || opts.showRoman !== false;
  const content = lyrics.content;
  const tr = (lyrics.translations || {});
  const cnMap = buildTranslationMap(tr.cn);
  const romaMap = buildTranslationMap(tr.roma || tr.romalrc || tr.roman);
  const raw = content.split('\n').map((l) => l.trim()).filter(Boolean);
  const isKrc = raw.some((l) => /^\[\d+,/.test(l));
  const out = [];

  const push = (words, startTime, endTime) => {
    out.push({
      words,
      translatedLyric: showTranslation ? cnMap.get(startTime) || '' : '',
      romanLyric: showRoman ? romaMap.get(startTime) || '' : '',
      startTime,
      endTime,
      isBG: false,
      isDuet: false,
    });
  };

  if (isKrc) {
    for (const line of raw) {
      const m = /^\[(\d+),(\d+)\](.*)$/.exec(line);
      if (!m) continue;
      const startTime = Number(m[1]);
      const duration = Number(m[2]);
      const words = parseKrcBody(m[3], startTime);
      if (!words.length) continue;
      push(words, startTime, startTime + duration);
    }
  } else {
    const parsed = raw.map((l, i) => parseLrcLine(l, raw[i + 1])).filter(Boolean);
    for (const p of parsed) push([{ word: p.text, startTime: p.startTime, endTime: p.endTime }], p.startTime, p.endTime);
  }
  out.sort((a, b) => a.startTime - b.startTime);
  return out;
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function ensureTransportFanout() {
  const tp = window.transportPort;
  if (!tp || typeof tp.receiveTransport !== 'function') return false;
  if (tp.__amllFanout) return true;
  const orig = tp.receiveTransport;
  const cbs = [];
  let installed = false;
  tp.receiveTransport = function (cb) {
    if (typeof cb !== 'function' || cbs.indexOf(cb) >= 0) return;
    cbs.push(cb);
    if (!installed) {
      installed = true;
      orig(function (msg) {
        for (let i = 0; i < cbs.length; i++) {
          try {
            cbs[i](msg);
          } catch (e) {}
        }
        return msg;
      });
    }
  };
  tp.__amllFanout = true;
  return true;
}

function coverUrl(cover) {
  if (!cover) return '';
  if (typeof cover === 'string') return cover;
  if (!cover.uri) return (cover.urls && cover.urls[0]) || '';
  const tpl = cover.template_prefix ? `${cover.template_prefix}-crop-center:600:600.jpg` : 'c5_600x600.jpg';
  return `${(cover.urls && cover.urls[0]) || ''}${cover.uri}~${tpl}`;
}

function cssUrl(u) {
  return u ? `url("${String(u).replace(/["\\]/g, '')}")` : 'none';
}

/* artwork must be decoded before a crossfade starts, otherwise the fade reveals
   an empty layer first. */
function preload(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

function scopedAttrs(fromEl, toEl) {
  if (!fromEl || !toEl) return;
  for (const a of fromEl.attributes) {
    if (a.name.indexOf('data-v-') === 0) toEl.setAttribute(a.name, a.value);
  }
}

function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const total = Math.floor(sec);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function copyText(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    return true;
  } catch (e) {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e2) {}
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* styles                                                              */
/* ------------------------------------------------------------------ */

const FONT_CSS = `
@font-face{font-family:"SA PingFang";src:local("PingFang SC Regular");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Light");font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Medium");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Bold");font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Bold");font-weight:700;font-style:normal;font-display:swap}
`;

const SA_FONT_PINGFANG = `"SA PingFang","PingFang SC","PingFang SC Regular","Microsoft YaHei",system-ui,sans-serif`;
const SA_FONT_SYSTEM = `-apple-system,"Segoe UI","Microsoft YaHei","PingFang SC",system-ui,sans-serif`;

const ICON = {
  shuffle:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.5 3.5 21 8l-4.5 4.5"/><path d="M3 20 21 8"/><path d="M16.5 12.5 21 17l-4.5 4.5"/><path d="M3 4l5.2 3.5"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5.2a1.2 1.2 0 0 1 1.2 1.2v11.2a1.2 1.2 0 0 1-2.4 0V6.4A1.2 1.2 0 0 1 7 5.2Z"/><path d="M19.05 5.62c.93-.6 2.15.07 2.15 1.16v10.44c0 1.09-1.22 1.76-2.15 1.16l-8.1-5.22a1.37 1.37 0 0 1 0-2.32l8.1-5.22Z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 5.2a1.2 1.2 0 0 1 1.2 1.2v11.2a1.2 1.2 0 0 1-2.4 0V6.4A1.2 1.2 0 0 1 17 5.2Z"/><path d="M4.95 5.62c-.93-.6-2.15.07-2.15 1.16v10.44c0 1.09 1.22 1.76 2.15 1.16l8.1-5.22a1.37 1.37 0 0 0 0-2.32l-8.1-5.22Z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.4 4.86c0-1.07 1.17-1.73 2.08-1.17l10.3 6.2a1.37 1.37 0 0 1 0 2.34l-10.3 6.2c-.91.56-2.08-.1-2.08-1.17V4.86Z"/></svg>',
  pause:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="4.3" width="3.9" height="15.4" rx="1.3"/><rect x="13.6" y="4.3" width="3.9" height="15.4" rx="1.3"/></svg>',
  repeat:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12.5V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 11.5V14a4 4 0 0 1-4 4h-13"/></svg>',
  repeatOne:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12.5V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 11.5V14a4 4 0 0 1-4 4h-13"/><path d="M11.2 10.6h1.1v4.4" stroke-width="1.7"/></svg>',
  volLow:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.6 4.3c.83-.58 1.99.02 1.99 1.03v13.34c0 1.01-1.16 1.61-1.99 1.03L6.4 16.5H3.7A1.7 1.7 0 0 1 2 14.8V9.2a1.7 1.7 0 0 1 1.7-1.7h2.7l5.2-3.2Z"/></svg>',
  volHigh:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.6 4.3c.83-.58 1.99.02 1.99 1.03v13.34c0 1.01-1.16 1.61-1.99 1.03L6.4 16.5H3.7A1.7 1.7 0 0 1 2 14.8V9.2a1.7 1.7 0 0 1 1.7-1.7h2.7l5.2-3.2Z"/><path d="M16.1 8.7a1 1 0 0 1 1.41 0 4.9 4.9 0 0 1 0 6.9 1 1 0 1 1-1.41-1.42 2.9 2.9 0 0 0 0-4.07 1 1 0 0 1 0-1.41Z"/><path d="M18.6 6.2a1 1 0 0 1 1.42 0 8.4 8.4 0 0 1 0 11.8 1 1 0 0 1-1.42-1.41 6.4 6.4 0 0 0 0-8.98 1 1 0 0 1 0-1.41Z"/></svg>',
  volOff:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.6 4.3c.83-.58 1.99.02 1.99 1.03v13.34c0 1.01-1.16 1.61-1.99 1.03L6.4 16.5H3.7A1.7 1.7 0 0 1 2 14.8V9.2a1.7 1.7 0 0 1 1.7-1.7h2.7l5.2-3.2Z"/><path d="M16.3 9.3a1 1 0 0 1 1.4 0l1.3 1.3 1.3-1.3a1 1 0 1 1 1.4 1.42L20.4 12l1.3 1.28a1 1 0 0 1-1.4 1.42L19 13.42l-1.3 1.28a1 1 0 0 1-1.4-1.42L17.6 12l-1.3-1.28a1 1 0 0 1 0-1.42Z"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.2" cy="12" r="1.85"/><circle cx="12" cy="12" r="1.85"/><circle cx="18.8" cy="12" r="1.85"/></svg>',
  check:
    '<svg viewBox="0 0 13 14" fill="none" aria-hidden="true"><path d="M3 8l2.25 2.5L9.5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><path d="M6.6 6.6 17.4 17.4"/><path d="M17.4 6.6 6.6 17.4"/></svg>',
};

/* NetEase's "类苹果歌词" page: a bottom sheet holding a two column stage.
   Left column = drag handle / cover / track meta / progress / transport / volume.
   Right column = the AMLL lyric player, edge faded by a mask. */
const OVERLAY_CSS = `
#soda-amll-overlay{position:fixed;inset:0;z-index:2147483600;overflow:hidden;color:#fff;font-family:${SA_FONT_PINGFANG};font-size:clamp(13px,2.17vh,26px);background:#14140f;border-radius:16px 16px 0 0;transform:translateY(100%);transition:transform .55s cubic-bezier(.8,0,.1,1),border-radius .3s ease-in-out;will-change:transform}
#soda-amll-overlay.sa-open{transform:none;border-radius:0}
#soda-amll-overlay.sa-noanim{transition:none!important}
html[data-sa-font="system"] #soda-amll-overlay,html[data-sa-font="system"] #soda-amll-menu,html[data-sa-font="system"] #soda-amll-win{font-family:${SA_FONT_SYSTEM}}

.sa-bg{position:absolute;inset:-18%;background:radial-gradient(120% 90% at 30% 20%,#3a4030,#0e0e0c 70%);filter:blur(100px) saturate(1.9) brightness(.55);transform:scale(1.1);pointer-events:none;opacity:0;transition:opacity .8s ease,transform 1.6s cubic-bezier(.16,1,.3,1)}
#soda-amll-overlay.sa-open .sa-bg{opacity:1;transform:scale(1.22)}
.sa-bg-layer{position:absolute;inset:0;background-size:cover;background-position:center;background-repeat:no-repeat;opacity:0;transition:opacity .9s cubic-bezier(.4,0,.2,1)}
.sa-bg-layer.sa-on{opacity:1}
.sa-bg.sa-solid .sa-bg-layer{display:none}
.sa-tint{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,.14) 40%,rgba(0,0,0,.4))}
.sa-vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(130% 110% at 25% 10%,rgba(255,255,255,.06),rgba(0,0,0,.5) 78%)}

.sa-stage{position:absolute;inset:0;display:grid;grid-template-columns:0.72fr 1fr}

.sa-left{grid-column:1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;height:100%}

/* the little bar is a close button: hovering morphs it into a rounded square
   with an X, and it trails the pointer on a spring until it snaps back. */
.sa-close{position:relative;display:flex;align-items:center;justify-content:center;width:clamp(46px,6.4vh,72px);height:clamp(30px,4.4vh,50px);margin-bottom:3.4vh;padding:0;border:0;background:transparent;cursor:none;touch-action:none;transition:transform .22s cubic-bezier(.22,1.2,.36,1);will-change:transform}
.sa-close .sa-chip{position:relative;display:flex;align-items:center;justify-content:center;width:clamp(40px,5.6vh,64px);height:clamp(4px,.65vh,8px);border-radius:100px;background:rgba(255,255,255,.32);transition:width .36s cubic-bezier(.34,1.4,.5,1),height .36s cubic-bezier(.34,1.4,.5,1),border-radius .36s cubic-bezier(.34,1.4,.5,1),background-color .3s ease}
.sa-close.sa-expand .sa-chip{width:clamp(26px,3.7vh,42px);height:clamp(26px,3.7vh,42px);border-radius:clamp(7px,1vh,12px);background:rgba(255,255,255,.18)}
.sa-close .sa-x{position:absolute;width:56%;height:56%;opacity:0;transform:scale(.4) rotate(-60deg);transition:opacity .22s ease,transform .36s cubic-bezier(.34,1.4,.5,1);pointer-events:none}
.sa-close .sa-x svg{display:block;width:100%;height:100%}
.sa-close.sa-expand .sa-x{opacity:.92;transform:none}

.sa-cover-wrap{position:relative;width:min(41vh,29vw);height:min(41vh,29vw);border-radius:3%;box-shadow:0 16px 24px rgba(0,0,0,.25),0 32px 64px rgba(0,0,0,.2);transition:box-shadow .5s ease,transform .6s cubic-bezier(.4,.2,.1,1)}
.sa-cover-wrap.sa-playing{transform:scale(1.03)}
.sa-cover-wrap.sa-nocursor{cursor:none}
.sa-cover{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:3%;background:rgba(255,255,255,.06);-webkit-user-drag:none}
.sa-cover-ghost{z-index:2;opacity:0;pointer-events:none}

.sa-info{width:min(51vh,37vw);max-width:100%;min-width:0;display:flex;flex-direction:column;margin-top:6vh}

.sa-meta{display:flex;align-items:center;gap:14px}
.sa-meta-text{min-width:0;flex:1}
.sa-name{font-size:1.28em;font-weight:600;letter-spacing:.2px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:text;-webkit-user-select:text;user-select:text}
.sa-artist{font-size:.9em;font-weight:400;letter-spacing:.2px;opacity:.55;line-height:1.45;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sa-album{font-size:.78em;font-weight:400;letter-spacing:.2px;opacity:.35;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sa-more{flex:0 0 auto;width:clamp(26px,4.2vh,46px);height:clamp(26px,4.2vh,46px);border:0;padding:0;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,transform .2s}
.sa-more:hover{background:rgba(255,255,255,.26)}
.sa-more:active{transform:scale(.92)}
.sa-more svg{width:58%;height:58%}

.sa-progress{margin-top:2.2vh;display:flex;align-items:center;min-height:20px;cursor:pointer;touch-action:none;transform-origin:center}
.sa-progress-inner{flex:1;width:100%;height:clamp(3px,.5vh,6px);border-radius:100px;background:rgba(255,255,255,.15);overflow:hidden;transition:height .3s cubic-bezier(.38,1.625,.62,.995)}
.sa-progress:hover .sa-progress-inner,.sa-progress.sa-active .sa-progress-inner{height:clamp(5px,.75vh,9px)}
.sa-progress-fill{height:100%;width:0;background:#fff;opacity:.4;transition:opacity .2s}
.sa-progress.sa-active .sa-progress-fill{opacity:.85}
.sa-times{display:flex;margin-top:7px;font-weight:400;opacity:.45;font-size:.72em;letter-spacing:.5px;line-height:1.4}
.sa-times>*{flex:1}
.sa-times>*:last-child{text-align:right}

.sa-controls{display:flex;align-items:center;justify-content:space-between;margin-top:.6vh}
.sa-cbtn{appearance:none;border:0;padding:0;background:transparent;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;cursor:pointer;position:relative;transition:background-color .3s,opacity .3s,transform .15s}
.sa-cbtn svg{display:block;width:100%;height:100%}
.sa-cbtn:active{transform:scale(.9)}
.sa-cbtn.sa-mode{width:clamp(16px,2.2vh,26px);height:clamp(16px,2.2vh,26px);opacity:.55}
.sa-cbtn.sa-mode:hover{opacity:.85}
.sa-cbtn.sa-mode.sa-on{opacity:1;color:#fff}
.sa-cbtn.sa-mode.sa-on::after{content:"";position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#fff}
.sa-cbtn.sa-prev,.sa-cbtn.sa-next{width:clamp(28px,5vh,40px);height:clamp(28px,5vh,40px)}
.sa-cbtn.sa-play{width:clamp(34px,6.2vh,52px);height:clamp(34px,6.2vh,52px)}
.sa-cbtn.sa-prev:hover,.sa-cbtn.sa-next:hover,.sa-cbtn.sa-play:hover{background-color:rgba(255,255,255,.12)}
.sa-cbtn.sa-prev svg,.sa-cbtn.sa-next svg{width:88%;height:88%}
.sa-cbtn.sa-play svg{width:78%;height:78%}
@keyframes saPushL{0%{transform:none}34%{transform:translateX(-16%) scale(.84)}100%{transform:none}}
@keyframes saPushR{0%{transform:none}34%{transform:translateX(16%) scale(.84)}100%{transform:none}}
@keyframes saPushC{0%{transform:none}40%{transform:scale(.86)}100%{transform:none}}
.sa-cbtn.sa-push-l{animation:saPushL .44s cubic-bezier(.34,1.32,.5,1)}
.sa-cbtn.sa-push-r{animation:saPushR .44s cubic-bezier(.34,1.32,.5,1)}
.sa-cbtn.sa-push-c{animation:saPushC .44s cubic-bezier(.34,1.32,.5,1)}
.sa-fps{position:absolute;top:12px;right:16px;z-index:8;display:none;font-family:"Fira Code",Consolas,monospace;font-size:12px;letter-spacing:.02em;color:rgba(255,255,255,.62);background:rgba(0,0,0,.32);padding:3px 8px;border-radius:7px;pointer-events:none}
#soda-amll-overlay.sa-fps-on .sa-fps{display:block}

.sa-volume{display:flex;align-items:center;gap:10px;margin-top:2vh}
.sa-vicon{flex:0 0 auto;appearance:none;border:0;padding:0;background:transparent;color:#fff;opacity:.55;width:clamp(13px,1.8vh,20px);height:clamp(13px,1.8vh,20px);cursor:pointer;transition:opacity .2s}
.sa-vicon:hover{opacity:.85}
.sa-vicon svg{width:100%;height:100%;display:block}
.sa-vicon.sa-plain{cursor:default}
.sa-vtrack{position:relative;flex:1;height:clamp(3px,.5vh,6px);border-radius:100px;background:rgba(255,255,255,.15);cursor:pointer;touch-action:none;overflow:hidden}
.sa-vfill{height:100%;width:30%;background:#fff;opacity:.4;transition:opacity .2s}
.sa-vtrack.sa-active .sa-vfill{opacity:.85}

.sa-lyric{grid-column:2;position:relative;min-width:0;height:100%;padding-right:8%;box-sizing:border-box}
.sa-lyric .amll-lyric-player{width:100%;height:100%;--amll-lp-color:rgba(255,255,255,.96);font-weight:var(--sa-lyric-weight,600);-webkit-mask-image:linear-gradient(to bottom,transparent 4%,#000 18%,#000 82%,transparent 96%);mask-image:linear-gradient(to bottom,transparent 4%,#000 18%,#000 82%,transparent 96%)}
.sa-lyric .amll-lyric-player .FmKaba_lyricLineWrapper{cursor:pointer}
/* AMLL only exposes the sung-region highlight opacity through a class rule, so
   the brightness control has to out-specify .FmKaba_lyricLine.FmKaba_gradientMask. */
.sa-lyric .amll-lyric-player .FmKaba_lyricLine.FmKaba_gradientMask{--bright-mask-alpha:var(--sa-word-bright,1)!important}
.sa-empty{position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font-size:1.1em;pointer-events:none}

#soda-amll-fab{position:fixed;right:22px;bottom:104px;z-index:2147483500;appearance:none;border:0;height:34px;padding:0 14px;border-radius:17px;cursor:pointer;background:rgba(24,24,28,.86);color:#fff;font-size:12.5px;font-family:${SA_FONT_PINGFANG};letter-spacing:.04em;box-shadow:0 6px 18px rgba(0,0,0,.4);display:flex;align-items:center;gap:7px;backdrop-filter:blur(8px);transition:transform .15s,background .15s}
#soda-amll-fab:hover{background:rgba(48,48,56,.94);transform:translateY(-1px)}
#soda-amll-fab i{width:6px;height:6px;border-radius:50%;background:#7ee787;display:block}
`;

/* appkit style menus (host context menu + lyric line menu + dropdowns) */
const MENU_CSS = `
.sa-menu{position:fixed;z-index:2147483647;min-width:180px;max-width:min(520px,72vw);padding:0;border-radius:8px;background:rgba(26,28,26,.66);border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 28px rgba(0,0,0,.5);backdrop-filter:blur(40px) saturate(1.6);-webkit-backdrop-filter:blur(40px) saturate(1.6);font-family:${SA_FONT_PINGFANG};font-size:13px;line-height:18px;color:#fff;opacity:0;transform:scale(.97);transform-origin:top left;transition:opacity .12s ease,transform .12s ease;overflow:hidden}
.sa-menu.sa-show{opacity:1;transform:none}
.sa-menu-group{padding:5px 0}
.sa-menu-group+.sa-menu-group{border-top:1px solid rgba(255,255,255,.16)}
.sa-mi{display:block;padding:2px 14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:default}
.sa-mi:hover{background:rgba(255,255,255,.14)}
.sa-mi.sa-danger:hover{background:rgba(255,80,80,.24)}
.sa-mi .sa-tick{display:none}
.sa-menu.sa-checkbox .sa-mi{padding-left:24px;position:relative}
.sa-menu.sa-checkbox .sa-mi.sa-checked .sa-tick{display:block;position:absolute;left:7px;top:50%;transform:translateY(-50%);width:12px;height:13px}
.sa-mi-sub{opacity:.45;font-size:11px;margin-left:6px}
`;

/* macOS style settings window */
const WIN_CSS = `
#soda-amll-win{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.32);opacity:0;transition:opacity .2s ease;font-family:${SA_FONT_PINGFANG};color:#fff}
#soda-amll-win.sa-show{opacity:1}
.sa-window{position:relative;width:min(660px,60vw);height:min(420px,56vh);display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:rgba(32,32,34,.78);border:1px solid rgba(255,255,255,.14);box-shadow:0 30px 90px rgba(0,0,0,.62);backdrop-filter:blur(40px) saturate(1.7);-webkit-backdrop-filter:blur(40px) saturate(1.7);transform:translateY(10px) scale(.985);transition:transform .26s cubic-bezier(.16,1,.3,1)}
#soda-amll-win.sa-show .sa-window{transform:none}
.sa-titlebar{position:relative;flex:0 0 auto;height:40px;display:flex;align-items:center}
.sa-lights{position:absolute;left:12px;top:50%;transform:translateY(-50%);display:flex;gap:8px}
.sa-light{width:11px;height:11px;border-radius:50%;cursor:pointer}
.sa-light.sa-close{background:#ff5f57}
.sa-light.sa-min{background:#febc2e}
.sa-light.sa-zoom{background:#28c840}
.sa-title{margin:0 30px 0 68px;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sa-winbody{flex:1;min-height:0;display:flex}
.sa-side{flex:0 0 186px;display:flex;flex-direction:column;padding:0 9px 12px;overflow:auto}
.sa-side-item{font-size:14px;line-height:18px;padding:5px 11px;border-radius:6px;cursor:pointer;color:rgba(255,255,255,.9);white-space:nowrap;transition:background .12s}
.sa-side-item:hover{background:rgba(255,255,255,.08)}
.sa-side-item.sa-on{background:linear-gradient(0deg,rgba(10,130,255,.75),rgba(10,130,255,.75)),#0A82FF;color:#fff}
.sa-side-foot{margin-top:auto;padding:10px 2px 2px;font-size:12.5px;letter-spacing:-.1px;white-space:nowrap;color:#4da3ff;cursor:pointer}
.sa-side-foot:hover{color:#7bbaff}
.sa-vdiv{width:1px;min-width:1px;background:rgba(255,255,255,.1)}
.sa-pane{flex:1;min-width:0;min-height:0;overflow:auto;background:rgba(20,20,20,.6);padding:12px 14px}
.sa-pane-title{font-size:15px;font-weight:600;margin:0 0 16px}
.sa-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.05);border-radius:8px;padding:8px 12px;margin-bottom:6px}
.sa-box.sa-plain{background:transparent;border:0;padding:0}
.sa-row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:7px 0;min-height:28px}
.sa-row+.sa-row{border-top:1px solid rgba(255,255,255,.05)}
.sa-row-label{min-width:0}
.sa-row-label b{display:block;font-size:13px;font-weight:400}
.sa-row-label span{display:block;font-size:11.24px;opacity:.5;margin-top:2px;line-height:1.4}
.sa-row-ctl{flex:0 0 auto;display:flex;align-items:center;gap:10px}
.sa-sw{position:relative;flex:0 0 auto;width:27.27px;height:15px;border-radius:100px;background:rgba(255,255,255,.16);border:.5px solid rgba(0,0,0,.12);box-shadow:inset 0 2px 3px rgba(0,0,0,.06);cursor:pointer;transition:background .2s}
.sa-sw i{position:absolute;top:1px;left:1px;width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.28);transition:transform .2s cubic-bezier(.22,.61,.36,1)}
.sa-sw.sa-on{background:#007AFF}
.sa-sw.sa-on i{transform:translateX(12.27px)}
.sa-sel{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:132px;max-width:230px;padding:2px 2px 2px 10px;border-radius:6px;background:#555657;border:.5px solid rgba(0,0,0,.2);box-shadow:0 .5px 1px rgba(0,0,0,.1);cursor:pointer;font-size:13px;overflow:hidden}
.sa-sel>span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sa-sel-step{flex:0 0 auto;width:16px;height:16px;border-radius:4px;background:linear-gradient(180deg,#1568E5 0%,#155CCC 100%);display:flex;align-items:center;justify-content:center}
.sa-sel-step svg{width:9px;height:9px}
.sa-num{display:flex;align-items:center;gap:8px}
.sa-num input{width:84px;height:22px;border-radius:6px;border:.5px solid rgba(0,0,0,.2);background:rgba(255,255,255,.9);color:#111;font-size:13px;font-family:inherit;text-align:right;padding:0 8px;outline:none}
.sa-slider{-webkit-appearance:none;appearance:none;width:150px;height:8.4px;border-radius:100px;background:rgba(255,255,255,.15);outline:none;cursor:pointer}
.sa-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.45)}
.sa-val{font-size:12px;opacity:.6;min-width:52px;text-align:right;font-variant-numeric:tabular-nums}
.sa-note{font-size:12px;line-height:1.6;opacity:.55}
.sa-kv{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;font-size:13px;align-items:baseline}
.sa-kv>b{font-weight:400;opacity:.6;white-space:nowrap;justify-self:end}
.sa-kv>span{font-family:"Fira Code","Cascadia Mono",Consolas,monospace;font-size:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.05);border-radius:6px;padding:3px 7px;word-break:break-all}
.sa-about h3{margin:0 0 8px;font-size:15px;font-weight:600}
.sa-about p{margin:0 0 10px;font-size:13px;line-height:1.7;opacity:.7}
.sa-about a{color:#4da3ff;text-decoration:none}
`;

/* bottom bar skin */
const BAR_CSS = `
html[data-sa-bar="blur"] .bottom-player{
  background-color:rgba(var(--color-base-7, 18, 18, 20), var(--sa-bar-a, .42))!important;
  background-image:none!important;
  -webkit-backdrop-filter:blur(var(--sa-bar-blur, 26px)) saturate(1.6);
  backdrop-filter:blur(var(--sa-bar-blur, 26px)) saturate(1.6);
}
html[data-sa-bar="blur"] .bottom-player::before{
  content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;clip-path:inset(0);
  background-image:var(--sa-bar-cover, none);background-size:cover;background-position:center 30%;
  filter:blur(30px) saturate(1.55) brightness(.72);
  opacity:var(--sa-bar-cover-a, .45);
  transition:opacity .5s ease,background-image .5s ease;
}
`;

/* controls injected into the host settings page */
const APP_CSS = `
#sa-plugin-host .sa-pv{margin:0 0 2px}
#sa-plugin-host .sa-hint{font-size:11.5px;color:rgba(255,255,255,.38);margin-top:3px}
#sa-plugin-host .sa-group-title{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:16px 0 6px}
#sa-plugin-host .sa-group-title:first-child{margin-top:0}
#sa-plugin-host .sa-ctl{display:flex;align-items:center;gap:12px}
#sa-plugin-host .sa-num{font-size:12px;color:rgba(255,255,255,.6);min-width:52px;text-align:right;font-variant-numeric:tabular-nums}
#sa-plugin-host input[type=range]{-webkit-appearance:none;appearance:none;width:150px;height:4px;border-radius:2px;background:rgba(255,255,255,.2);outline:none;cursor:pointer}
#sa-plugin-host input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.45)}
#sa-plugin-host .sa-seg{display:inline-flex;padding:3px;gap:2px;border-radius:9px;background:rgba(255,255,255,.08)}
#sa-plugin-host .sa-seg-btn{appearance:none;border:0;background:transparent;color:rgba(255,255,255,.62);font-size:12.5px;font-family:inherit;padding:5px 12px;border-radius:6px;cursor:pointer;transition:background .16s,color .16s;white-space:nowrap}
#sa-plugin-host .sa-seg-btn:hover{color:#fff}
#sa-plugin-host .sa-seg-btn.sa-on{background:rgba(255,255,255,.92);color:#111;font-weight:600}
#sa-plugin-host .sa-reset{margin-top:14px;display:flex;justify-content:flex-end}
#sa-plugin-host .sa-reset button{appearance:none;border:0;border-radius:8px;padding:7px 14px;font-size:12.5px;font-family:inherit;cursor:pointer;background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);transition:background .15s}
#sa-plugin-host .sa-reset button:hover{background:rgba(255,255,255,.18)}
`;

function injectStyle(id, text) {
  let s = document.getElementById(id);
  if (!s) {
    s = document.createElement('style');
    s.id = id;
    document.head.appendChild(s);
  }
  if (s.__text !== text) {
    s.textContent = text;
    s.__text = text;
  }
  return s;
}

/* ------------------------------------------------------------------ */
/* controller                                                          */
/* ------------------------------------------------------------------ */

class SodaAmll {
  constructor() {
    this.open = false;
    this.root = null;
    this.player = null;
    this.raf = 0;
    this.baseMs = 0;
    this.baseAt = 0;
    this.durationMs = 0;
    this.playing = false;
    this.trackKey = null;
    this.cover = '';
    this.state = null;
    this.hooked = false;
    this.hookTimer = 0;
    this.visible = false;
    this.fabDone = false;
    this.settings = loadSettings();
    this.menuEl = null;
    this.winEl = null;
    this.settingsPage = 'lyric';
    this.hideTimer = 0;
    this.lastTick = 0;
    this.volume = null;
    this.volBeforeMute = 0.5;
    this.volDragging = false;
    this.seekDragging = false;
    this.dragState = null;
    this.playOrder = null;
    this.queueApi = undefined;
  }

  /* ---- data feed ---- */
  hookTransport() {
    if (this.hooked) return;
    const tp = window.transportPort;
    if (!tp || typeof tp.receiveTransport !== 'function' || !ensureTransportFanout()) {
      if (!this.hookTimer) this.hookTimer = setInterval(() => this.hookTransport(), 500);
      return;
    }
    this.hooked = true;
    if (this.hookTimer) {
      clearInterval(this.hookTimer);
      this.hookTimer = 0;
    }
    tp.receiveTransport((msg) => {
      try {
        if (!msg || msg.serviceId !== 'sharedState' || !msg.arguments) return msg;
        const s = msg.arguments[0];
        if (s && typeof s.progressSeconds === 'number' && 'mediaDetail' in s) this.onState(s);
      } catch (e) {
        LOG('transport handler error', e);
      }
      return msg;
    });
    LOG('transport hooked');
  }

  onState(s) {
    const now = performance.now();
    const est = this.playing ? this.baseMs + (now - this.baseAt) : this.baseMs;
    this.durationMs = (s.durationSeconds || 0) * 1000;
    const raw = (s.progressSeconds || 0) * 1000;
    const ms = this.durationMs ? Math.min(raw, this.durationMs) : raw;
    this.baseMs = ms;
    this.baseAt = now;

    const wasPlaying = this.playing;
    this.playing = !!s.isPlaying && !s.isLoading;
    if (this.player && this.playing !== wasPlaying) {
      if (this.playing) this.player.resume();
      else this.player.pause();
    }
    if (this.playing !== wasPlaying) {
      this.paintPlayIcon();
      if (this.root) {
        const wrap = this.root.querySelector('.sa-cover-wrap');
        if (wrap) wrap.classList.toggle('sa-playing', this.playing);
      }
    }

    if (typeof s.volume === 'number' && !this.volDragging) {
      this.volume = s.isMuted ? 0 : clamp(s.volume, 0, 1);
      if (this.volume > 0.001) this.volBeforeMute = this.volume;
      this.paintVolume();
    }

    const md = s.mediaDetail;
    const key = md && md.playable ? md.playable.key || md.playable.id : null;
    if (key && key !== this.trackKey) {
      this.trackKey = key;
      this.applyTrack(md, Math.abs(ms - est) > 400);
      /* an explicit prev/next press already animated its own button */
      if (performance.now() - (this.lastTransportAt || 0) > 1200) this.pulseTransport('both');
    } else if (this.player && Math.abs(ms - est) > 900) {
      this.player.setCurrentTime(ms, true);
    }
    this.state = s;
    if (this.open) {
      this.paintMeta();
      this.paintProgress();
    }
  }

  applyTrack(md, seek) {
    const pl = (md && md.playable) || {};
    this.cover = coverUrl(pl.cover_url);
    const lines = toAmllLines(md && md.lyrics, this.settings);
    LOG('track', pl.name, 'lines', lines.length);
    this.fab();
    this.applyBarCover();
    if (!this.player) return;
    this.player.setLyricLines(lines, this.baseMs);
    if (seek) this.player.setCurrentTime(this.baseMs, true);
    if (this.open) {
      this.paintMeta();
      this.paintTheme();
    }
  }

  rebuildLyrics() {
    if (!this.player || !this.state || !this.state.mediaDetail) return;
    const t = this.playing ? this.baseMs + (performance.now() - this.baseAt) : this.baseMs;
    this.player.setLyricLines(toAmllLines(this.state.mediaDetail.lyrics, this.settings), t);
  }

  /* ---- ui ---- */
  ensureDom() {
    if (this.root) return;
    injectStyle('soda-amll-css', amllCssText + '\n' + OVERLAY_CSS + '\n' + MENU_CSS + '\n' + WIN_CSS);
    const root = document.createElement('div');
    root.id = 'soda-amll-overlay';
    root.innerHTML = `
      <div class="sa-bg"><div class="sa-bg-layer sa-bg-l0"></div><div class="sa-bg-layer sa-bg-l1"></div></div>
      <div class="sa-tint"></div>
      <div class="sa-vignette"></div>
      <div class="sa-stage">
        <div class="sa-left">
          <button class="sa-close" title="关闭歌词页面"><span class="sa-chip"><span class="sa-x">${ICON.close}</span></span></button>
          <div class="sa-cover-wrap">
            <img class="sa-cover" alt="" />
            <img class="sa-cover sa-cover-ghost" alt="" aria-hidden="true" />
          </div>
          <div class="sa-info">
            <div class="sa-meta">
              <div class="sa-meta-text">
                <div class="sa-name"></div>
                <div class="sa-artist"></div>
                <div class="sa-album"></div>
              </div>
              <button class="sa-more" title="更多">${ICON.more}</button>
            </div>
            <div class="sa-progress">
              <div class="sa-progress-inner"><div class="sa-progress-fill"></div></div>
            </div>
            <div class="sa-times"><span class="sa-t-cur">0:00</span><span class="sa-t-dur">-0:00</span></div>
            <div class="sa-controls">
              <button class="sa-cbtn sa-mode sa-shuffle" title="随机播放">${ICON.shuffle}</button>
              <button class="sa-cbtn sa-prev" title="上一首">${ICON.prev}</button>
              <button class="sa-cbtn sa-play" title="播放 / 暂停">${ICON.play}</button>
              <button class="sa-cbtn sa-next" title="下一首">${ICON.next}</button>
              <button class="sa-cbtn sa-mode sa-repeat" title="循环播放">${ICON.repeat}</button>
            </div>
            <div class="sa-volume">
              <button class="sa-vicon sa-vlow" title="静音 / 取消静音">${ICON.volLow}</button>
              <div class="sa-vtrack"><div class="sa-vfill"></div></div>
              <span class="sa-vicon sa-plain" title="音量">${ICON.volHigh}</span>
            </div>
          </div>
        </div>
        <div class="sa-lyric"><div class="sa-empty">等待播放信息…</div></div>
      </div>
      <div class="sa-fps">-- FPS</div>`;
    document.body.appendChild(root);
    this.root = root;
    this.emptyEl = root.querySelector('.sa-empty');
    this.fpsEl = root.querySelector('.sa-fps');

    this.player = new LyricPlayer();
    root.querySelector('.sa-lyric').appendChild(this.player.getElement());
    this.player.setAlignAnchor(LayoutAlignAnchor.Center);
    this.player.setEnableBlur(this.settings.lyricBlur);
    this.player.setEnableScale(this.settings.lyricScale);
    this.player.setWordFadeWidth(this.settings.wordFade);
    this.player.setHidePassedLines(this.settings.hidePassed);
    this.bindLyricEvents(this.player);
    this.applyFontScale();

    this.bindClose();
    this.bindControls();
    this.bindProgress();
    this.bindContextMenu();
    this.bindMore();
    if (this.state && this.state.mediaDetail) this.applyTrack(this.state.mediaDetail, true);
  }

  bindMore() {
    this.root.querySelector('.sa-more').addEventListener('click', (e) => {
      e.stopPropagation();
      const r = e.currentTarget.getBoundingClientRect();
      this.openMenu(r.right - 210, r.bottom + 6);
    });
  }

  /* ---- close button (bar -> square -> spring) ---- */
  bindClose() {
    const btn = this.root.querySelector('.sa-close');
    if (!btn) return;
    const FOLLOW = 0.24; /* how much of the pointer delta the chip actually takes */
    const LIMIT = 52; /* past this distance it lets go and snaps home */
    let origin = null;
    let expanded = false;
    let released = false;

    const collapse = () => {
      expanded = false;
      btn.classList.remove('sa-expand');
      btn.style.transform = '';
    };

    const onMove = (e) => {
      if (!expanded || !origin) return;
      const dx = e.clientX - origin.x;
      const dy = e.clientY - origin.y;
      if (Math.hypot(dx, dy) > LIMIT) {
        released = true;
        collapse();
        return;
      }
      btn.style.transform = `translate(${(dx * FOLLOW).toFixed(1)}px,${(dy * FOLLOW).toFixed(1)}px)`;
    };

    const reset = () => {
      released = false;
      origin = null;
      collapse();
    };
    this.__resetClose = reset;

    btn.addEventListener('pointerenter', (e) => {
      if (released) return;
      const r = btn.getBoundingClientRect();
      origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      expanded = true;
      btn.classList.add('sa-expand');
      onMove(e);
    });
    btn.addEventListener('pointermove', onMove);
    btn.addEventListener('pointerleave', reset);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hide();
    });
  }

  /* AMLL re-dispatches a native `click` as `line-click` on the player instance
     (an EventTarget), not on its DOM element. It has no equivalent for
     right-click, so the line menu is driven from the DOM below. */
  bindLyricEvents(target) {
    target.addEventListener('line-click', (e) => {
      if (!this.settings.lyricClickSeek) return;
      const t = this.lineStartTime(e);
      if (t != null) this.seekTo(t);
    });

    const host = this.root.querySelector('.sa-lyric');
    host.addEventListener('contextmenu', (e) => {
      let wrap = e.target;
      while (wrap && wrap !== host && !/linewrapper/i.test(String(wrap.className || ''))) {
        wrap = wrap.parentElement;
      }
      if (!wrap || wrap === host) return;
      e.preventDefault();
      e.stopPropagation();
      const info = this.lineInfoFromEl(wrap);
      this.openLineMenu(e.clientX, e.clientY, info.text, info.sub);
    });
  }

  lineInfoFromEl(wrap) {
    const read = (lineObj) => {
      try {
        const line = lineObj && lineObj.getLine && lineObj.getLine();
        if (!line) return '';
        return (line.words || []).map((w) => w.word).join('');
      } catch (err) {
        return '';
      }
    };
    try {
      const group = this.player.lyricGroupElementMap.get(wrap);
      if (group) return { text: read(group.mainLine), sub: read(group.bgLine) };
    } catch (err) {}
    return { text: (wrap.textContent || '').trim(), sub: '' };
  }

  lineStartTime(e) {
    try {
      const line = e.line && e.line.getLine ? e.line.getLine() : null;
      if (line && typeof line.startTime === 'number') return line.startTime;
      const lines = this.player.dataManager.getProcessedLines();
      const idx = e.lineIndex;
      if (lines && idx >= 0 && lines[idx] && typeof lines[idx].startTime === 'number') return lines[idx].startTime;
    } catch (err) {}
    return null;
  }

  /* the host only seeks through its own slider, so drive that with the same
     synthetic pointer sequence a real drag would produce. */
  seekTo(ms) {
    if (!this.durationMs) return;
    const ratio = clamp(ms / this.durationMs, 0, 1);
    const sl = document.querySelector('.bottom-player .progress .slider') || document.querySelector('.bottom-player .slider');
    this.baseMs = clamp(ms, 0, this.durationMs);
    this.baseAt = performance.now();
    if (this.player) this.player.setCurrentTime(this.baseMs, true);
    this.paintProgress();
    if (!sl) return;
    const r = sl.getBoundingClientRect();
    if (!r.width) return;
    const x = r.left + r.width * ratio;
    const y = r.top + r.height / 2;
    const mk = (type, Ctor, extra) =>
      new Ctor(type, Object.assign({ bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, buttons: 1 }, extra));
    sl.dispatchEvent(mk('pointerover', PointerEvent));
    sl.dispatchEvent(mk('pointerenter', PointerEvent));
    sl.dispatchEvent(mk('pointerdown', PointerEvent));
    sl.dispatchEvent(mk('mousedown', MouseEvent));
    window.dispatchEvent(mk('pointermove', PointerEvent));
    document.dispatchEvent(mk('pointermove', PointerEvent));
    window.dispatchEvent(mk('pointerup', PointerEvent, { buttons: 0 }));
    document.dispatchEvent(mk('mouseup', MouseEvent, { buttons: 0 }));
  }

  /* ---- progress bar ---- */
  bindProgress() {
    const bar = this.root.querySelector('.sa-progress');
    const ratioAt = (e) => {
      const r = bar.getBoundingClientRect();
      if (!r.width) return null;
      return clamp((e.clientX - r.left) / r.width, 0, 1);
    };
    const preview = (ratio) => {
      if (ratio == null) return;
      this.baseMs = ratio * this.durationMs;
      this.baseAt = performance.now();
      if (this.player) this.player.setCurrentTime(this.baseMs, true);
      this.paintProgress();
    };
    bar.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.seekDragging = true;
      bar.classList.add('sa-active');
      try {
        bar.setPointerCapture(e.pointerId);
      } catch (err) {}
      preview(ratioAt(e));
    });
    bar.addEventListener('pointermove', (e) => {
      if (this.seekDragging) preview(ratioAt(e));
    });
    const end = (e) => {
      if (!this.seekDragging) return;
      this.seekDragging = false;
      bar.classList.remove('sa-active');
      const r = ratioAt(e);
      if (r != null && this.durationMs) this.seekTo(r * this.durationMs);
    };
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', () => {
      this.seekDragging = false;
      bar.classList.remove('sa-active');
    });
  }

  /* ---- transport / volume ---- */
  bindControls() {
    const q = (s) => this.root.querySelector(s);
    q('.sa-prev').addEventListener('click', () => this.hostTransport('prev'));
    q('.sa-play').addEventListener('click', () => this.hostTransport('playpause'));
    q('.sa-next').addEventListener('click', () => this.hostTransport('next'));
    q('.sa-shuffle').addEventListener('click', () => this.toggleShuffle());
    q('.sa-repeat').addEventListener('click', () => this.toggleRepeat());
    q('.sa-vlow').addEventListener('click', () => this.toggleMute());
    this.bindVolumeTrack();
    this.paintPlayIcon();
    this.paintVolume();
    this.refreshPlayOrder();
  }

  hostCenterButtons() {
    const c = document.querySelector('.bottom-player .controls.center');
    if (!c) return null;
    const b = [...c.querySelectorAll(':scope > .button')];
    return b.length >= 3 ? b : null;
  }

  hostClick(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const o = { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 1, pointerType: 'mouse', isPrimary: true };
    el.dispatchEvent(new PointerEvent('pointerdown', Object.assign({}, o, { button: 0, buttons: 1 })));
    el.dispatchEvent(new MouseEvent('mousedown', Object.assign({}, o, { button: 0, buttons: 1 })));
    el.dispatchEvent(new PointerEvent('pointerup', Object.assign({}, o, { button: 0, buttons: 0 })));
    el.dispatchEvent(new MouseEvent('mouseup', Object.assign({}, o, { button: 0, buttons: 0 })));
    el.dispatchEvent(new MouseEvent('click', Object.assign({}, o, { button: 0, buttons: 0 })));
    return true;
  }

  hostTransport(action) {
    const b = this.hostCenterButtons();
    if (!b) return;
    const idx = { prev: 0, playpause: 1, next: 2 }[action];
    if (idx == null) return;
    if (action === 'prev' || action === 'next') {
      this.lastTransportAt = performance.now();
      this.pulseTransport(action);
    }
    this.hostClick(b[idx]);
    this.paintPlayIcon();
  }

  /* replay the push animation on the transport buttons */
  pulseTransport(dir) {
    if (!this.root || !this.settings.btnAnim) return;
    const pick = { prev: ['.sa-prev', 'sa-push-l'], next: ['.sa-next', 'sa-push-r'] };
    const jobs = dir === 'both' ? [pick.prev, pick.next] : [pick[dir]];
    for (const [sel, cls] of jobs) {
      if (!cls) continue;
      const el = this.root.querySelector(sel);
      if (!el) continue;
      el.classList.remove('sa-push-l', 'sa-push-r', 'sa-push-c');
      void el.offsetWidth;
      el.classList.add(cls);
    }
  }

  hostActionButton(match) {
    const bp = document.querySelector('.bottom-player');
    if (!bp) return null;
    const list = [...bp.querySelectorAll('.controls.actions > .button')];
    for (const b of list) {
      const p = b.querySelector('svg path');
      const d = p && p.getAttribute('d');
      if (d && d.indexOf(match) === 0) return b;
    }
    return null;
  }

  hostLikeButton() {
    const bp = document.querySelector('.bottom-player');
    if (!bp) return null;
    const list = [...bp.querySelectorAll('.controls.actions-left > .button')];
    return list[2] || null;
  }

  /* the volume popover only mounts while the speaker button is hovered */
  hoverHostVolume(el) {
    const r = el.getBoundingClientRect();
    const o = { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 1, pointerType: 'mouse', isPrimary: true };
    for (const t of ['pointerover', 'pointerenter', 'mouseover', 'mouseenter', 'mousemove', 'pointermove']) {
      el.dispatchEvent(new (t.indexOf('pointer') === 0 ? PointerEvent : MouseEvent)(t, o));
    }
  }

  hostVolumeSlider() {
    const box = document.querySelector('.volume-box-wrapper');
    return box && box.querySelector('.slider');
  }

  /* the host volume slider is vertical and reversed: 0 sits at the bottom */
  applyHostVolume(v) {
    const btn = this.hostActionButton('M22.2 3.6') || this.hostVolumeButton();
    if (!btn) return;
    const target = clamp(v, 0, 1);
    let tries = 0;
    const attempt = () => {
      this.hoverHostVolume(btn);
      const slider = this.hostVolumeSlider();
      if (!slider) {
        if (++tries < 6) setTimeout(attempt, 55);
        return;
      }
      const track = slider.querySelector('.slider-track') || slider;
      const r = track.getBoundingClientRect();
      if (!r.height) return;
      const o = { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.bottom - target * r.height, pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0, buttons: 1 };
      slider.dispatchEvent(new PointerEvent('pointerdown', o));
      document.dispatchEvent(new PointerEvent('pointermove', o));
      slider.dispatchEvent(new PointerEvent('pointerup', Object.assign({}, o, { buttons: 0 })));
    };
    attempt();
  }

  hostVolumeButton() {
    const bp = document.querySelector('.bottom-player');
    if (!bp) return null;
    const list = [...bp.querySelectorAll('.controls.actions > .button')];
    if (!list.length) return null;
    for (const b of list) {
      const p = b.querySelector('svg path');
      const d = p && p.getAttribute('d');
      if (d && d.indexOf('M22.2 3.6') === 0) return b;
    }
    return list[list.length - 2] || null;
  }

  bindVolumeTrack() {
    const track = this.root.querySelector('.sa-vtrack');
    const valueAt = (e) => {
      const r = track.getBoundingClientRect();
      if (!r.width) return null;
      return clamp((e.clientX - r.left) / r.width, 0, 1);
    };
    track.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.volDragging = true;
      track.classList.add('sa-active');
      try {
        track.setPointerCapture(e.pointerId);
      } catch (err) {}
      const v = valueAt(e);
      if (v != null) this.setVolume(v);
    });
    track.addEventListener('pointermove', (e) => {
      if (!this.volDragging) return;
      const v = valueAt(e);
      if (v != null) this.setVolume(v);
    });
    const end = () => {
      this.volDragging = false;
      track.classList.remove('sa-active');
    };
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);
  }

  setVolume(v) {
    this.volume = clamp(v, 0, 1);
    if (this.volume > 0.001) this.volBeforeMute = this.volume;
    this.paintVolume();
    this.applyHostVolume(this.volume);
  }

  toggleMute() {
    if (this.volume == null) this.volume = 0.5;
    this.setVolume(this.volume > 0.001 ? 0 : this.volBeforeMute || 0.5);
  }

  paintVolume() {
    if (!this.root) return;
    const v = this.volume == null ? 0.3 : this.volume;
    const pct = `${Math.round(v * 100)}%`;
    const fill = this.root.querySelector('.sa-vfill');
    if (fill) fill.style.width = pct;
    const low = this.root.querySelector('.sa-vlow');
    if (low) low.innerHTML = v <= 0.001 ? ICON.volOff : ICON.volLow;
  }

  paintPlayIcon() {
    if (!this.root) return;
    const btn = this.root.querySelector('.sa-play');
    if (!btn) return;
    const html = this.playing ? ICON.pause : ICON.play;
    if (btn.innerHTML !== html) btn.innerHTML = html;
  }

  paintProgress() {
    if (!this.root) return;
    const now = performance.now();
    const t = this.playing ? this.baseMs + (now - this.baseAt) : this.baseMs;
    const ms = this.durationMs ? clamp(t, 0, this.durationMs) : t;
    const ratio = this.durationMs ? ms / this.durationMs : 0;
    const fill = this.root.querySelector('.sa-progress-fill');
    if (fill) fill.style.width = `${(ratio * 100).toFixed(2)}%`;
    this.root.querySelector('.sa-t-cur').textContent = fmtTime(ms / 1000);
    this.root.querySelector('.sa-t-dur').textContent = this.durationMs ? `-${fmtTime((this.durationMs - ms) / 1000)}` : '-0:00';
  }

  /* crossfade the artwork: the new cover fades in on a ghost layer sitting on
     top of the committed one, which is swapped in once the fade is done. */
  setCover(url) {
    if (!this.root) return;
    const img = this.root.querySelector('.sa-cover');
    const ghost = this.root.querySelector('.sa-cover-ghost');
    if (!img || !ghost) return;
    const current = img.getAttribute('src') || '';
    if (url === current || url === (ghost.getAttribute('src') || '')) return;
    const settle = () => {
      img.src = url || '';
      ghost.style.transition = 'none';
      ghost.style.opacity = '0';
    };
    if (!this.settings.mediaAnim || !current || !url) {
      clearTimeout(this.__coverTimer);
      settle();
      return;
    }
    const start = () => {
      ghost.src = url;
      ghost.style.transition = 'none';
      ghost.style.opacity = '0';
      void ghost.offsetWidth;
      ghost.style.transition = 'opacity .8s cubic-bezier(.4,0,.2,1)';
      ghost.style.opacity = '1';
      clearTimeout(this.__coverTimer);
      this.__coverTimer = setTimeout(settle, 820);
    };
    preload(url).then(start);
  }

  setBg(url) {
    if (!this.root) return;
    const layers = this.root.querySelectorAll('.sa-bg-layer');
    if (layers.length < 2) return;
    const cur = this.bgLayer || 0;
    const next = 1 - cur;
    const u = url || '';
    if ((layers[cur].dataset.url || '') === u) return;
    const apply = () => {
      layers[next].style.backgroundImage = u ? `url("${u}")` : 'none';
      layers[next].dataset.url = u;
      layers[next].classList.add('sa-on');
      layers[cur].classList.remove('sa-on');
      this.bgLayer = next;
    };
    if (!this.settings.mediaAnim || !layers[cur].dataset.url) {
      apply();
      return;
    }
    preload(url).then(apply);
  }

  paintMeta() {
    if (!this.root) return;
    const md = (this.state && this.state.mediaDetail) || {};
    const pl = md.playable || {};
    this.setCover(this.cover);
    const nameEl = this.root.querySelector('.sa-name');
    if (!nameEl) return;
    nameEl.textContent = pl.name || '';
    this.root.querySelector('.sa-artist').textContent = (pl.artists || []).map((a) => a.name).join(' / ');
    const albumEl = this.root.querySelector('.sa-album');
    albumEl.textContent = this.settings.showAlbum ? (pl.album && pl.album.name) || '' : '';
    albumEl.style.display = this.settings.showAlbum && pl.album ? '' : 'none';
    if (this.emptyEl) {
      const hasLyric = !!(md.lyrics && md.lyrics.content);
      this.emptyEl.textContent = pl.name ? '该歌曲暂无歌词' : '等待播放信息…';
      this.emptyEl.style.display = pl.name && hasLyric ? 'none' : 'flex';
    }
  }

  paintTheme() {
    if (!this.root) return;
    const bg = this.root.querySelector('.sa-bg');
    if (!bg) return;
    bg.classList.toggle('sa-solid', this.settings.bgType === 'solid');
    this.setBg(this.cover);
  }

  tick() {
    if (!this.open) return;
    const now = performance.now();
    if (!this.lastTick) this.lastTick = now;
    const delta = Math.min(now - this.lastTick, 100);
    this.lastTick = now;
    if (this.player) {
      let t = this.playing ? this.baseMs + (now - this.baseAt) : this.baseMs;
      if (this.durationMs) t = Math.min(t, this.durationMs);
      this.player.setCurrentTime(t);
      this.player.update(delta);
    }
    if (this.settings.showFps && this.fpsEl) {
      this.__fpsFrames = (this.__fpsFrames || 0) + 1;
      if (!this.__fpsAt) this.__fpsAt = now;
      if (now - this.__fpsAt >= 500) {
        const fps = (this.__fpsFrames * 1000) / (now - this.__fpsAt);
        this.fpsEl.textContent = `${fps.toFixed(0)} FPS`;
        this.__fpsFrames = 0;
        this.__fpsAt = now;
      }
    }
    this.paintProgress();
    this.raf = requestAnimationFrame(() => this.tick());
  }

  show() {
    this.ensureDom();
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = 0;
    }
    this.root.style.display = '';
    this.visible = true;
    this.open = true;
    /* the root only exists from here on, so settings-driven classes land now */
    this.applySettings();
    this.root.classList.remove('sa-open');
    void this.root.offsetWidth;
    this.root.classList.add('sa-open');
    this.paintMeta();
    this.paintTheme();
    this.paintPlayIcon();
    this.paintVolume();
    this.paintProgress();
    this.refreshPlayOrder();
    if (this.player) {
      this.player.setCurrentTime(this.baseMs, true);
      this.player.resume();
      if (!this.playing) this.player.pause();
    }
    this.lastTick = 0;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => this.tick());
  }

  hide() {
    this.open = false;
    cancelAnimationFrame(this.raf);
    this.closeMenu();
    this.closeWindow();
    const root = this.root;
    if (!root) return;
    /* the close chip keeps hover state in closure, so drop it on the way out */
    if (this.__resetClose) this.__resetClose();
    root.classList.remove('sa-open');
    root.style.transform = '';
    root.style.opacity = '';
    root.style.borderRadius = '';
    if (this.settings.lyricTransition) {
      this.hideTimer = setTimeout(() => {
        root.style.display = 'none';
        this.hideTimer = 0;
      }, 600);
    } else {
      root.classList.add('sa-noanim');
      root.style.display = 'none';
      setTimeout(() => root.classList.remove('sa-noanim'), 30);
    }
    this.visible = false;
    if (this.player) this.player.pause();
  }

  toggle() {
    if (this.open) this.hide();
    else this.show();
  }

  fab() {
    if (this.fabDone || !document.body) return;
    if (document.getElementById('soda-amll-fab')) {
      this.fabDone = true;
      return;
    }
    injectStyle('soda-amll-css', amllCssText + '\n' + OVERLAY_CSS + '\n' + MENU_CSS + '\n' + WIN_CSS);
    const b = document.createElement('button');
    b.id = 'soda-amll-fab';
    b.innerHTML = '<i></i><span>AMLL 歌词</span>';
    b.addEventListener('click', () => this.toggle());
    document.body.appendChild(b);
    this.fabDone = true;
  }

  /* ---- menus ---- */
  bindContextMenu() {
    if (this.root.__saCtx) return;
    this.root.__saCtx = true;
    this.root.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.sa-menu')) return;
      e.preventDefault();
      this.openMenu(e.clientX, e.clientY);
    });
  }

  placeMenu(m, x, y) {
    const r = m.getBoundingClientRect();
    m.style.left = `${clamp(x, 8, window.innerWidth - r.width - 8)}px`;
    m.style.top = `${clamp(y, 8, window.innerHeight - r.height - 8)}px`;
  }

  mountMenu(m, x, y, onClick) {
    this.closeMenu();
    document.body.appendChild(m);
    this.menuEl = m;
    this.placeMenu(m, x, y);
    requestAnimationFrame(() => m.classList.add('sa-show'));
    if (onClick) {
      m.addEventListener('click', (e) => {
        const item = e.target.closest('.sa-mi');
        if (!item) return;
        const act = item.dataset.act;
        if (item.dataset.keep !== '1') this.closeMenu();
        onClick(act, item, e);
      });
    }
    setTimeout(() => {
      this.__menuOff = (ev) => {
        if (this.menuEl && !this.menuEl.contains(ev.target)) this.closeMenu();
      };
      document.addEventListener('mousedown', this.__menuOff, true);
      document.addEventListener('wheel', this.__menuOff, true);
    }, 0);
  }

  closeMenu() {
    if (this.__menuOff) {
      document.removeEventListener('mousedown', this.__menuOff, true);
      document.removeEventListener('wheel', this.__menuOff, true);
      this.__menuOff = null;
    }
    if (this.menuEl) {
      this.menuEl.remove();
      this.menuEl = null;
    }
  }

  menuGroup(items) {
    return `<div class="sa-menu-group">${items.join('')}</div>`;
  }

  menuItem(label, act, opts) {
    const o = opts || {};
    const cls = ['sa-mi'];
    if (o.checked) cls.push('sa-checked');
    if (o.danger) cls.push('sa-danger');
    const sub = o.sub ? `<span class="sa-mi-sub">${o.sub}</span>` : '';
    return `<div class="${cls.join(' ')}" data-act="${act}">${ICON.check.replace('<svg', '<svg class="sa-tick"')}${label}${sub}</div>`;
  }

  openMenu(x, y) {
    const md = (this.state && this.state.mediaDetail) || {};
    const pl = md.playable || {};
    const artist = (pl.artists || []).map((a) => a.name).join(' / ') || '未知歌手';
    const album = (pl.album && pl.album.name) || '未知专辑';
    const m = document.createElement('div');
    m.className = 'sa-menu sa-checkbox';
    m.innerHTML =
      this.menuGroup([this.menuItem('喜欢歌曲', 'like'), this.menuItem('收藏歌曲', 'collect')]) +
      this.menuGroup([this.menuItem(`查看歌手：${artist}`, 'goArtist'), this.menuItem(`查看专辑：${album}`, 'goAlbum')]) +
      this.menuGroup([this.menuItem('复制音乐数据...', 'copyData'), this.menuItem('编辑音乐数据', 'editData')]) +
      this.menuGroup([this.menuItem('显示翻译歌词', 'tglTranslation', { checked: this.settings.showTranslation }), this.menuItem('显示音译歌词', 'tglRoman', { checked: this.settings.showRoman })]) +
      this.menuGroup([this.menuItem('切换全屏模式', 'fullscreen')]) +
      this.menuGroup([this.menuItem('Apple Music-like Lyrics 插件设置...', 'settings'), this.menuItem('退出歌词页面', 'close', { danger: true })]);
    this.mountMenu(m, x, y, (act) => this.runMenuAction(act, pl));
  }

  runMenuAction(act, pl) {
    switch (act) {
      case 'like':
        this.hostLike();
        break;
      case 'collect':
        this.toast('已收藏到「我喜欢的音乐」');
        break;
      case 'goArtist':
        this.toast(`歌手：${(pl.artists || []).map((a) => a.name).join(' / ') || '未知'}`);
        break;
      case 'goAlbum':
        this.toast(`专辑：${(pl.album && pl.album.name) || '未知'}`);
        break;
      case 'copyData':
        copyText(JSON.stringify(this.state && this.state.mediaDetail, null, 2));
        this.toast('已复制音乐数据到剪贴板');
        break;
      case 'editData':
        this.toast('编辑音乐数据请使用客户端自带入口');
        break;
      case 'tglTranslation':
        this.settings.showTranslation = !this.settings.showTranslation;
        this.commitSettings();
        this.toast(`已${this.settings.showTranslation ? '显示' : '隐藏'}翻译歌词`);
        break;
      case 'tglRoman':
        this.settings.showRoman = !this.settings.showRoman;
        this.commitSettings();
        this.toast(this.settings.showRoman ? '已开启音译歌词（当前歌曲无音译数据）' : '已隐藏音译歌词');
        break;
      case 'fullscreen':
        this.toggleFullscreen();
        break;
      case 'settings':
        this.openSettings();
        break;
      case 'close':
        this.hide();
        break;
      default:
        break;
    }
  }

  openLineMenu(x, y, text, sub) {
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const main = (text || '').trim();
    const label = esc(main.slice(0, 40)) || '（空行）';
    const m = document.createElement('div');
    m.className = 'sa-menu';
    m.style.fontSize = '12px';
    m.innerHTML =
      this.menuGroup([this.menuItem(`复制原歌词：${label}`, 'copyLine')]) +
      this.menuGroup([this.menuItem('复制整行歌词', 'copyLineOnly')]);
    this.mountMenu(m, x, y, (act) => {
      if (act === 'copyLine') {
        copyText(main);
        this.toast('已复制该行歌词');
      } else if (act === 'copyLineOnly') {
        copyText([main, (sub || '').trim()].filter(Boolean).join('\n'));
        this.toast('已复制整行歌词');
      }
    });
  }

  hostLike() {
    const btn = this.hostLikeButton();
    if (!btn) {
      this.toast('未找到喜欢按钮');
      return;
    }
    const before = String(btn.className);
    this.hostClick(btn);
    setTimeout(() => {
      const changed = String(btn.className) !== before || !!btn.querySelector('.active');
      this.toast(changed ? '已喜欢这首歌曲' : '已发送喜欢请求');
    }, 260);
  }

  toggleFullscreen() {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    } catch (e) {
      this.toast('当前环境不支持全屏切换');
    }
  }

  /* ---- play order ---- */
  findQueueApi() {
    if (this.queueApi !== undefined) return this.queueApi;
    this.queueApi = null;
    try {
      const seen = new Set();
      const stack = [{ v: window, d: 0 }];
      let n = 0;
      while (stack.length && n < 20000) {
        const { v, d } = stack.pop();
        if (!v || typeof v !== 'object' || seen.has(v) || d > 3) continue;
        seen.add(v);
        n++;
        let keys;
        try {
          keys = Object.getOwnPropertyNames(v);
        } catch (e) {
          continue;
        }
        for (const k of keys) {
          if (/^(window|self|top|parent|frames|document|location|navigator|localStorage|sessionStorage|indexedDB|caches|performance|console|crypto|history|screen)$/.test(k)) continue;
          let val;
          try {
            val = v[k];
          } catch (e) {
            continue;
          }
          if (!val || typeof val !== 'object') continue;
          if (typeof val.setPlayOrder === 'function' && Array.isArray(val.supportPlayOrder)) {
            this.queueApi = val;
            LOG('queue api found at depth', d, k, val.supportPlayOrder);
            return val;
          }
          if (d < 3) stack.push({ v: val, d: d + 1 });
        }
      }
    } catch (e) {}
    LOG('queue api not found');
    return null;
  }

  currentPlayOrder() {
    const q = this.findQueueApi();
    try {
      const st = q && q.state && q.state.value;
      if (st && st.playback && typeof st.playback.playOrder === 'number') return st.playback.playOrder;
    } catch (e) {}
    return null;
  }

  refreshPlayOrder() {
    this.playOrder = this.currentPlayOrder();
    this.paintPlayOrder();
  }

  paintPlayOrder() {
    if (!this.root) return;
    const order = this.playOrder;
    const shuffle = this.root.querySelector('.sa-shuffle');
    const repeat = this.root.querySelector('.sa-repeat');
    if (!shuffle || !repeat) return;
    const isShuffle = order === 2;
    const isSingle = order === 1;
    shuffle.classList.toggle('sa-on', isShuffle);
    repeat.classList.toggle('sa-on', isSingle);
    const html = isSingle ? ICON.repeatOne : ICON.repeat;
    if (repeat.innerHTML !== html) repeat.innerHTML = html;
  }

  toggleShuffle() {
    const q = this.findQueueApi();
    const order = this.currentPlayOrder();
    if (q && order != null) {
      const next = order === 2 ? 0 : 2;
      if (Array.isArray(q.supportPlayOrder) && q.supportPlayOrder.indexOf(next) < 0) {
        this.toast('当前队列不支持随机播放');
        return;
      }
      q.setPlayOrder(next);
      setTimeout(() => this.refreshPlayOrder(), 120);
      this.toast(next === 2 ? '已切换为随机播放' : '已切换为列表循环');
      return;
    }
    this.toast('未找到播放队列，无法切换播放模式');
  }

  toggleRepeat() {
    const q = this.findQueueApi();
    const order = this.currentPlayOrder();
    if (q && order != null) {
      const next = order === 1 ? 0 : 1;
      if (Array.isArray(q.supportPlayOrder) && q.supportPlayOrder.indexOf(next) < 0) {
        this.toast('当前队列不支持单曲循环');
        return;
      }
      q.setPlayOrder(next);
      setTimeout(() => this.refreshPlayOrder(), 120);
      this.toast(next === 1 ? '已切换为单曲循环' : '已切换为列表循环');
      return;
    }
    this.toast('未找到播放队列，无法切换播放模式');
  }

  about() {
    this.toast('AMLL 歌词插件 v2.0 · 基于开源项目 Apple Music-like Lyrics');
  }

  toast(text) {
    let t = document.getElementById('soda-amll-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'soda-amll-toast';
      t.style.cssText = `position:fixed;left:50%;bottom:132px;transform:translateX(-50%);z-index:2147483647;padding:10px 18px;border-radius:10px;background:rgba(28,28,32,.94);color:#fff;font-size:13px;font-family:${SA_FONT_PINGFANG};box-shadow:0 10px 30px rgba(0,0,0,.5);transition:opacity .25s;backdrop-filter:blur(16px);pointer-events:none`;
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.style.opacity = '1';
    clearTimeout(this.__toastTimer);
    this.__toastTimer = setTimeout(() => {
      t.style.opacity = '0';
    }, 2200);
  }

  /* ---- settings window ---- */
  settingsNav() {
    return [
      { id: 'lyric', name: '歌词' },
      { id: 'song', name: '歌曲信息' },
      { id: 'bg', name: '背景' },
      { id: 'source', name: '歌词源' },
      { id: 'player', name: '歌词播放器' },
      { id: 'misc', name: '杂项' },
      { id: 'debug', name: '调试' },
    ];
  }

  settingsSchema() {
    return [
      /* 歌词 */
      { page: 'lyric', group: 'type', type: 'select', key: 'lyricFont', label: '歌词字体', hint: '优先使用本机苹方字体', options: [['pingfang', '苹方'], ['system', '跟随系统']] },
      { page: 'lyric', group: 'type', type: 'range', key: 'lyricFontScale', label: '字号大小', hint: '逐字歌词的基准字号倍数', min: 0.6, max: 2, step: 0.05, fmt: (v) => `${v.toFixed(2)}x` },
      {
        page: 'lyric',
        group: 'type',
        type: 'select',
        key: 'lyricWeight',
        label: '字号粗细',
        hint: '歌词文字的笔画粗细',
        numeric: true,
        options: [[300, '细'], [400, '常规'], [500, '中黑'], [600, '半粗'], [700, '粗']],
      },
      { page: 'lyric', group: 'display', type: 'switch', key: 'lyricClickSeek', label: '点击歌词跳转', hint: '点击歌词行跳到对应播放位置' },
      { page: 'lyric', group: 'display', type: 'switch', key: 'showTranslation', label: '显示翻译歌词', hint: '优先使用歌曲自带的翻译' },
      { page: 'lyric', group: 'display', type: 'switch', key: 'showRoman', label: '显示音译歌词', hint: '歌曲无音译数据时不显示' },

      /* 歌曲信息 */
      { page: 'song', group: 'main', type: 'switch', key: 'showAlbum', label: '显示专辑名', hint: '在歌手下方显示所属专辑' },
      { page: 'song', group: 'main', type: 'switch', key: 'coverHideCursor', label: '封面悬停隐藏鼠标', hint: '鼠标移到专辑封面上时隐藏指针' },

      /* 背景 */
      { page: 'bg', group: 'type', type: 'switch', key: 'bgEnabled', label: '显示歌词背景', hint: '使用当前专辑封面作为背景' },
      { page: 'bg', group: 'type', type: 'select', key: 'bgType', label: '背景类型', hint: '模糊封面 / 深色渐变', options: [['blur', '模糊封面'], ['solid', '深色渐变']] },
      { page: 'bg', group: 'tune', type: 'range', key: 'bgBlur', label: '背景模糊', hint: '数值越高越柔和，性能消耗越大', min: 0, max: 200, step: 2, fmt: (v) => `${Math.round(v)}px` },
      { page: 'bg', group: 'tune', type: 'range', key: 'bgBrightness', label: '背景亮度', hint: '默认 0.55', min: 0.15, max: 1.2, step: 0.01, fmt: (v) => v.toFixed(2) },
      { page: 'bg', group: 'tune', type: 'range', key: 'bgSaturate', label: '背景饱和度', hint: '默认 1.90', min: 0.5, max: 3, step: 0.05, fmt: (v) => v.toFixed(2) },

      /* 歌词源 */
      { page: 'source', group: 'main', type: 'info', label: '歌词来源', hint: '由客户端当前歌曲返回，支持 KRC 逐字歌词与 LRC' },
      { page: 'source', group: 'main', type: 'debug', key: 'src' },

      /* 歌词播放器 */
      { page: 'player', group: 'anim', type: 'switch', key: 'lyricTransition', label: '歌词界面过渡动画', hint: '进入 / 退出时的下拉与淡入缓动' },
      { page: 'player', group: 'anim', type: 'switch', key: 'btnAnim', label: '切歌按钮动画', hint: '上一首 / 下一首按钮的按压动画' },
      { page: 'player', group: 'anim', type: 'switch', key: 'mediaAnim', label: '封面与背景过渡', hint: '切歌时封面与背景交叉淡入' },
      { page: 'player', group: 'render', type: 'range', key: 'wordBright', label: '文字高光亮度', hint: '当前行已唱部分的高光强度', min: 0.3, max: 1.4, step: 0.02, fmt: (v) => v.toFixed(2) },
      { page: 'player', group: 'diag', type: 'switch', key: 'showFps', label: '显示帧率', hint: '在歌词页右上角显示实时帧率' },
      { page: 'player', group: 'render', type: 'switch', key: 'lyricBlur', label: '歌词模糊效果', hint: '非当前行模糊处理（AMLL）' },
      { page: 'player', group: 'render', type: 'switch', key: 'lyricScale', label: '歌词缩放效果', hint: '非当前行轻微缩小（AMLL）' },
      { page: 'player', group: 'render', type: 'range', key: 'wordFade', label: '逐字渐变宽度', hint: '默认为 0.7，模拟 Apple Music 逐字效果', min: 0.0001, max: 1.5, step: 0.05, fmt: (v) => v.toFixed(2) },
      { page: 'player', group: 'render', type: 'switch', key: 'hidePassed', label: '隐藏已播放歌词', hint: '已播放的歌词行淡出隐藏' },

      /* 杂项 */
      { page: 'misc', group: 'bar', type: 'select', key: 'barStyle', label: '底边栏样式', hint: '播放栏半透明效果', options: [['off', '关闭'], ['blur', '模糊']] },
      { page: 'misc', group: 'bar', type: 'range', key: 'barOpacity', label: '底边栏不透明度', hint: '数值越低越通透', min: 0.05, max: 0.9, step: 0.01, fmt: (v) => `${Math.round(v * 100)}%` },
      { page: 'misc', group: 'cover', type: 'range', key: 'barBlur', label: '底边栏模糊强度', hint: 'backdrop-filter 模糊半径', min: 0, max: 60, step: 1, fmt: (v) => `${Math.round(v)}px` },
      { page: 'misc', group: 'cover', type: 'range', key: 'barCover', label: '封面映射强度', hint: '底边栏透出专辑封面', min: 0, max: 0.9, step: 0.01, fmt: (v) => `${Math.round(v * 100)}%` },

      /* 调试 */
      { page: 'debug', group: 'main', type: 'debug', key: 'state' },
    ];
  }

  openSettings() {
    this.closeWindow();
    const wrap = document.createElement('div');
    wrap.id = 'soda-amll-win';
    wrap.innerHTML = `
      <div class="sa-window">
        <div class="sa-titlebar">
          <div class="sa-lights">
            <span class="sa-light sa-close" data-act="close" title="关闭"></span>
            <span class="sa-light sa-min" data-act="min" title="最小化"></span>
            <span class="sa-light sa-zoom" data-act="zoom" title="缩放"></span>
          </div>
          <div class="sa-title"></div>
        </div>
        <div class="sa-winbody">
          <div class="sa-side"></div>
          <div class="sa-vdiv"></div>
          <div class="sa-pane"></div>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    this.winEl = wrap;

    const side = wrap.querySelector('.sa-side');
    for (const item of this.settingsNav()) {
      const el = document.createElement('div');
      el.className = 'sa-side-item' + (item.id === this.settingsPage ? ' sa-on' : '');
      el.textContent = item.name;
      el.dataset.page = item.id;
      el.addEventListener('click', () => {
        this.settingsPage = item.id;
        for (const other of side.querySelectorAll('.sa-side-item')) other.classList.toggle('sa-on', other === el);
        this.renderSettingsPane();
      });
      side.appendChild(el);
    }
    const foot = document.createElement('div');
    foot.className = 'sa-side-foot';
    foot.textContent = '关于 Apple Music-like lyrics';
    foot.addEventListener('click', () => {
      this.settingsPage = 'about';
      for (const other of side.querySelectorAll('.sa-side-item')) other.classList.remove('sa-on');
      this.renderSettingsPane();
    });
    side.appendChild(foot);

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) {
        this.closeWindow();
        return;
      }
      const act = e.target.dataset && e.target.dataset.act;
      if (act === 'close') this.closeWindow();
      else if (act === 'min' || act === 'zoom') this.closeWindow();
    });

    this.renderSettingsPane();
    requestAnimationFrame(() => wrap.classList.add('sa-show'));
  }

  closeWindow() {
    if (this.winEl) {
      this.winEl.remove();
      this.winEl = null;
    }
  }

  renderSettingsPane() {
    if (!this.winEl) return;
    const pane = this.winEl.querySelector('.sa-pane');
    pane.innerHTML = '';
    if (this.settingsPage === 'about') {
      pane.innerHTML = `
        <div class="sa-about">
          <h3>Apple Music-like Lyrics 插件</h3>
          <p>版本 v2.0 · 汽水音乐歌词美化插件</p>
          <p>歌词渲染基于开源项目 Apple Music-like Lyrics（AMLL），提供逐字高亮、模糊与缩放等 Apple Music 风格的歌词动画。</p>
          <p>界面参考网易云音乐「类苹果歌词」插件的交互与布局，快捷键 <b>Ctrl + Alt + L</b> 开关歌词页，<b>Esc</b> 退出。</p>
        </div>`;
      return;
    }
    let box = null;
    let group = null;
    for (const def of this.settingsSchema()) {
      if (def.page !== this.settingsPage) continue;
      const g = def.group || 'main';
      if (!box || g !== group) {
        group = g;
        box = document.createElement('div');
        box.className = 'sa-box';
        pane.appendChild(box);
      }
      this.renderWinRow(box, def);
    }
  }

  renderWinRow(host, def) {
    if (def.type === 'debug') {
      const kv = document.createElement('div');
      kv.className = 'sa-kv';
      const rows = this.debugRows(def.key);
      kv.innerHTML = rows.map(([k, v]) => `<b>${k}</b><span>${String(v)}</span>`).join('');
      host.appendChild(kv);
      return;
    }
    if (def.type === 'info') {
      const note = document.createElement('div');
      note.className = 'sa-note';
      note.textContent = def.hint || '';
      host.appendChild(note);
      return;
    }

    const row = document.createElement('div');
    row.className = 'sa-row';
    const label = document.createElement('div');
    label.className = 'sa-row-label';
    const b = document.createElement('b');
    b.textContent = def.label;
    label.appendChild(b);
    if (def.hint) {
      const span = document.createElement('span');
      span.textContent = def.hint;
      label.appendChild(span);
    }
    const ctl = document.createElement('div');
    ctl.className = 'sa-row-ctl';
    row.appendChild(label);
    row.appendChild(ctl);
    host.appendChild(row);

    const commit = () => {
      this.commitSettings();
      this.refreshAppSettings();
      if (def.type === 'debug' || def.key === 'src' || def.key === 'state') this.renderSettingsPane();
    };

    if (def.type === 'switch') {
      const sw = document.createElement('div');
      sw.className = 'sa-sw' + (this.settings[def.key] ? ' sa-on' : '');
      sw.innerHTML = '<i></i>';
      sw.addEventListener('click', () => {
        this.settings[def.key] = !this.settings[def.key];
        sw.classList.toggle('sa-on', !!this.settings[def.key]);
        commit();
      });
      ctl.appendChild(sw);
    } else if (def.type === 'select') {
      const sel = document.createElement('div');
      sel.className = 'sa-sel';
      const cur = def.options.find((o) => o[0] === this.settings[def.key]) || def.options[0];
      sel.innerHTML = `<span>${cur[1]}</span><span class="sa-sel-step">${ICON.chevron}</span>`;
      sel.addEventListener('click', (e) => {
        e.stopPropagation();
        const r = sel.getBoundingClientRect();
        const m = document.createElement('div');
        m.className = 'sa-menu sa-checkbox';
        m.innerHTML = this.menuGroup(def.options.map((o) => this.menuItem(o[1], o[0], { checked: o[0] === this.settings[def.key] })));
        this.mountMenu(m, r.left, r.bottom + 4, (raw) => {
          /* menu items carry their value in a data attribute, so numbers come back as strings */
          const val = def.numeric ? Number(raw) : raw;
          this.settings[def.key] = val;
          sel.querySelector('span').textContent = (def.options.find((o) => o[0] === val) || def.options[0])[1];
          commit();
        });
      });
      ctl.appendChild(sel);
    } else if (def.type === 'range') {
      const input = document.createElement('input');
      input.type = 'range';
      input.className = 'sa-slider';
      input.min = String(def.min);
      input.max = String(def.max);
      input.step = String(def.step);
      input.value = String(this.settings[def.key]);
      const val = document.createElement('span');
      val.className = 'sa-val';
      val.textContent = def.fmt(this.settings[def.key]);
      input.addEventListener('input', () => {
        this.settings[def.key] = Number(input.value);
        val.textContent = def.fmt(this.settings[def.key]);
        this.applySettings();
      });
      input.addEventListener('change', commit);
      ctl.appendChild(input);
      ctl.appendChild(val);
    }
  }

  debugRows(kind) {
    const md = (this.state && this.state.mediaDetail) || {};
    const pl = md.playable || {};
    const ly = md.lyrics || {};
    if (kind === 'src') {
      return [
        ['歌词类型', ly.type || '未知'],
        ['逐字歌词', ly.content && /^\[\d+,/.test(ly.content) ? 'KRC' : 'LRC'],
        ['翻译语言', Object.keys(ly.translations || {}).join(', ') || '无'],
        ['贡献者', (ly.lyric_contributor && ly.lyric_contributor.nickname) || '未知'],
      ];
    }
    return [
      ['歌曲', pl.name || '未播放'],
      ['歌手', (pl.artists || []).map((a) => a.name).join(' / ') || '-'],
      ['专辑', (pl.album && pl.album.name) || '-'],
      ['播放状态', this.playing ? '播放中' : '已暂停'],
      ['进度', `${fmtTime(this.baseMs / 1000)} / ${fmtTime(this.durationMs / 1000)}`],
      ['音量', this.volume == null ? '-' : `${Math.round(this.volume * 100)}%`],
      ['播放模式', this.playOrder == null ? '未获取' : String(this.playOrder)],
      ['歌词行数', this.player ? String((this.player.dataManager.getProcessedLines() || []).length) : '0'],
    ];
  }

  /* ---- settings plumbing ---- */
  resetSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS);
    saveSettings(this.settings);
    this.applySettings();
    this.rebuildLyrics();
    if (this.winEl) this.renderSettingsPane();
    this.refreshAppSettings();
  }

  commitSettings() {
    saveSettings(this.settings);
    this.applySettings();
  }

  applyFontScale() {
    if (!this.player) return;
    const el = this.player.getElement();
    if (!el) return;
    const scale = this.settings.lyricFontScale;
    el.style.setProperty('--amll-lp-font-size', `calc(max(max(5vh, 2.5vw), 12px) * ${scale})`);
  }

  applyBarCover() {
    document.documentElement.style.setProperty('--sa-bar-cover', cssUrl(this.cover));
  }

  applySettings() {
    const s = this.settings;
    const html = document.documentElement;
    injectStyle('soda-amll-fontcss', FONT_CSS);
    injectStyle('soda-amll-barcss', BAR_CSS);
    injectStyle('soda-amll-appcss', APP_CSS);
    if (s.barStyle === 'off') html.removeAttribute('data-sa-bar');
    else html.setAttribute('data-sa-bar', s.barStyle);
    html.setAttribute('data-sa-font', s.lyricFont);
    html.style.setProperty('--sa-bar-a', String(s.barOpacity));
    html.style.setProperty('--sa-bar-blur', `${Math.round(s.barBlur)}px`);
    html.style.setProperty('--sa-bar-cover-a', String(s.barCover));
    html.style.setProperty('--sa-lyric-weight', String(s.lyricWeight));
    html.style.setProperty('--sa-word-bright', String(s.wordBright));

    if (this.root) {
      this.root.classList.toggle('sa-noanim', !s.lyricTransition);
      this.root.classList.toggle('sa-fps-on', !!s.showFps);
      const cover = this.root.querySelector('.sa-cover-wrap');
      if (cover) cover.classList.toggle('sa-nocursor', !!s.coverHideCursor);
      const bg = this.root.querySelector('.sa-bg');
      if (bg) {
        bg.style.display = s.bgEnabled ? '' : 'none';
        bg.style.filter = `blur(${Math.round(s.bgBlur)}px) saturate(${s.bgSaturate.toFixed(2)}) brightness(${s.bgBrightness.toFixed(2)})`;
      }
      const tint = this.root.querySelector('.sa-tint');
      if (tint) tint.style.display = s.bgEnabled ? '' : 'none';
      const vig = this.root.querySelector('.sa-vignette');
      if (vig) vig.style.display = s.bgEnabled ? '' : 'none';
    }
    if (this.player) {
      this.player.setEnableBlur(s.lyricBlur);
      this.player.setEnableScale(s.lyricScale);
      this.player.setWordFadeWidth(s.wordFade);
      this.player.setHidePassedLines(s.hidePassed);
    }
    this.applyFontScale();
    this.applyBarCover();
    this.paintTheme();
    this.paintMeta();
  }

  /* ---- "插件" section inside the host settings page ---- */
  mountAppSettings() {
    const st = document.querySelector('.setting');
    if (!st) return;
    const menu = st.querySelector('.menu');
    const nav = st.querySelector('.nav');
    if (!menu) return;
    /* the host can re-render while the form is being built, leaving it short;
       compare against the expected row count and rebuild when it came out incomplete */
    const existing = document.getElementById('sa-plugin-host');
    if (existing) {
      const want = this.settingsNav().reduce(
        (n, p) => n + this.settingsSchema().filter((d) => d.page === p.id && d.type !== 'debug' && d.type !== 'info').length,
        0
      );
      if (existing.querySelectorAll('.setting-menu-item').length !== want) this.buildAppForm(existing);
      return;
    }

    const sampleItem = menu.querySelector('.menu-item');
    const sampleCard = menu.querySelector('.menu-item .card');
    const sampleSMI = menu.querySelector('.setting-menu-item');
    const sampleSwitch = menu.querySelector('.switch');
    this.__samples = {
      item: sampleItem,
      card: sampleCard,
      smi: sampleSMI,
      smiLeft: sampleSMI && sampleSMI.querySelector('.left'),
      smiTitle: sampleSMI && sampleSMI.querySelector('.left .title'),
      smiRight: sampleSMI && sampleSMI.querySelector('.right'),
      switch: sampleSwitch,
      switchNode: sampleSwitch && sampleSwitch.querySelector('.node'),
      nav: nav && nav.querySelector('.nav-item'),
    };

    const sec = document.createElement('div');
    sec.id = 'sa-plugin-section';
    sec.className = 'menu-item';
    scopedAttrs(sampleItem, sec);
    const title = document.createElement('span');
    title.className = 'title';
    scopedAttrs(sampleItem, title);
    title.textContent = '插件';
    const card = document.createElement('div');
    card.className = 'card';
    scopedAttrs(sampleCard, card);
    const host = document.createElement('div');
    host.id = 'sa-plugin-host';
    card.appendChild(host);
    sec.appendChild(title);
    sec.appendChild(card);
    menu.appendChild(sec);
    this.buildAppForm(host);

    if (nav && this.__samples.nav && !nav.querySelector('#sa-plugin-nav')) {
      const ni = document.createElement('div');
      ni.id = 'sa-plugin-nav';
      ni.className = 'nav-item';
      scopedAttrs(this.__samples.nav, ni);
      ni.textContent = '插件';
      ni.addEventListener('click', () => {
        for (const other of nav.querySelectorAll('.nav-item')) other.classList.toggle('active', other === ni);
        menu.scrollTo({ top: sec.offsetTop - 24, behavior: 'smooth' });
      });
      nav.appendChild(ni);
    }
  }

  buildAppForm(host) {
    const s = this.settings;
    host.innerHTML = '';
    const commit = () => {
      this.commitSettings();
      if (this.winEl) this.renderSettingsPane();
    };
    const makeRow = (labelText, hintText) => {
      const row = document.createElement('div');
      row.className = 'setting-menu-item';
      scopedAttrs(this.__samples && this.__samples.smi, row);
      const left = document.createElement('div');
      left.className = 'left';
      scopedAttrs(this.__samples && this.__samples.smiLeft, left);
      const title = document.createElement('span');
      title.className = 'title';
      scopedAttrs(this.__samples && this.__samples.smiTitle, title);
      title.textContent = labelText;
      left.appendChild(title);
      if (hintText) {
        const hint = document.createElement('div');
        hint.className = 'sa-hint';
        hint.textContent = hintText;
        left.appendChild(hint);
      }
      const right = document.createElement('div');
      right.className = 'right';
      scopedAttrs(this.__samples && this.__samples.smiRight, right);
      row.appendChild(left);
      row.appendChild(right);
      host.appendChild(row);
      return right;
    };

    for (const navItem of this.settingsNav()) {
      const defs = this.settingsSchema().filter((d) => d.page === navItem.id && d.type !== 'debug' && d.type !== 'info');
      if (!defs.length) continue;
      const gt = document.createElement('div');
      gt.className = 'sa-group-title';
      gt.textContent = navItem.name;
      host.appendChild(gt);

      for (const def of defs) {
        const ctl = makeRow(def.label, def.hint);
        if (def.type === 'switch') {
          let sw;
          if (this.__samples && this.__samples.switch) {
            sw = document.createElement('div');
            sw.className = 'switch';
            scopedAttrs(this.__samples.switch, sw);
            sw.setAttribute('role', 'switch');
            const node = document.createElement('div');
            node.className = 'node';
            scopedAttrs(this.__samples.switchNode, node);
            sw.appendChild(node);
          } else {
            sw = document.createElement('div');
            sw.className = 'sa-sw';
            sw.innerHTML = '<i></i>';
          }
          const sync = () => {
            const on = !!s[def.key];
            sw.classList.toggle('switch-on', on);
            sw.setAttribute('aria-checked', String(on));
            const node = sw.querySelector('.node');
            if (node) node.classList.toggle('node-on', on);
          };
          sw.addEventListener('click', () => {
            s[def.key] = !s[def.key];
            sync();
            commit();
          });
          sync();
          ctl.appendChild(sw);
        } else if (def.type === 'select') {
          const box = document.createElement('div');
          box.className = 'sa-seg';
          for (const [val, text] of def.options) {
            const b = document.createElement('button');
            b.className = 'sa-seg-btn' + (s[def.key] === val ? ' sa-on' : '');
            b.textContent = text;
            b.addEventListener('click', () => {
              s[def.key] = val;
              for (const other of box.querySelectorAll('.sa-seg-btn')) other.classList.toggle('sa-on', other === b);
              commit();
            });
            box.appendChild(b);
          }
          ctl.appendChild(box);
        } else {
          const wrap = document.createElement('div');
          wrap.className = 'sa-ctl';
          const input = document.createElement('input');
          input.type = 'range';
          input.min = String(def.min);
          input.max = String(def.max);
          input.step = String(def.step);
          input.value = String(s[def.key]);
          const val = document.createElement('span');
          val.className = 'sa-num';
          val.textContent = def.fmt(s[def.key]);
          input.addEventListener('input', () => {
            s[def.key] = Number(input.value);
            val.textContent = def.fmt(s[def.key]);
            this.applySettings();
          });
          input.addEventListener('change', commit);
          wrap.appendChild(input);
          wrap.appendChild(val);
          ctl.appendChild(wrap);
        }
      }
    }

    const foot = document.createElement('div');
    foot.className = 'sa-reset';
    const b = document.createElement('button');
    b.textContent = '恢复默认设置';
    b.addEventListener('click', () => {
      this.resetSettings();
      this.toast('已恢复默认设置');
    });
    foot.appendChild(b);
    host.appendChild(foot);
  }

  refreshAppSettings() {
    const host = document.getElementById('sa-plugin-host');
    if (host) this.buildAppForm(host);
  }

  watchSettingsPage() {
    const check = () => {
      if (location.hash.indexOf('setting') < 0) return;
      this.mountAppSettings();
    };
    window.addEventListener('hashchange', () => {
      setTimeout(check, 350);
      setTimeout(check, 1200);
    });
    this.__settingsTimer = setInterval(check, 1500);
    check();
  }
}

/* ------------------------------------------------------------------ */
/* bootstrap                                                           */
/* ------------------------------------------------------------------ */

if (window[GLOBAL_KEY]) {
  LOG('already installed');
} else {
  const inst = new SodaAmll();
  window[GLOBAL_KEY] = inst;
  inst.hookTransport();
  LOG('boot @', Math.round(performance.now()));
  const boot = () => {
    inst.applySettings();
    inst.watchSettingsPage();
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape' && (inst.open || inst.winEl)) {
          if (inst.winEl) inst.closeWindow();
          else if (inst.menuEl) inst.closeMenu();
          else inst.hide();
        } else if (e.ctrlKey && e.altKey && (e.key === 'l' || e.key === 'L')) {
          e.preventDefault();
          inst.toggle();
        }
      },
      true
    );
    LOG('ready');
  };
  if (document.body) boot();
  else document.addEventListener('DOMContentLoaded', boot);
}
