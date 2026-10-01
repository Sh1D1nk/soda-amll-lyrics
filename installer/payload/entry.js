/* Replacement for resources/app.asar!/entry.js.
   Wraps the original entry.node and adds the two hooks the lyric overlay needs.
   Contains no debug bridge: this file ships to end users. */
const __amllFs = require('fs');
const __amllPath = require('path');
const __amllElectron = require('electron');
const __amllOrig = require('./entry.node');

/* The host writes its renderer preload to <temp>/sodamusic-preloads/<id>.js at
   window-creation time. That preload exposes window.transportPort with a
   single-slot receiveTransport, so whoever registers last wins. Append a
   fan-out there so the app and the lyric overlay both keep receiving state. */
(function __patchPreload() {
  const FANOUT = `
;(function () {
  var tp = window.transportPort;
  if (!tp || typeof tp.receiveTransport !== 'function' || tp.__amllFanout) return;
  var orig = tp.receiveTransport;
  var cbs = [];
  var installed = false;
  tp.receiveTransport = function (cb) {
    if (typeof cb !== 'function' || cbs.indexOf(cb) >= 0) return;
    cbs.push(cb);
    if (!installed) {
      installed = true;
      orig(function (msg) {
        for (var i = 0; i < cbs.length; i++) { try { cbs[i](msg); } catch (e) {} }
        return msg;
      });
    }
  };
  tp.__amllFanout = true;
})();
`;
  const isPreload = (p) => typeof p === 'string' && p.indexOf('sodamusic-preloads') >= 0 && /\.js$/i.test(p);
  const augment = (data) => {
    if (typeof data === 'string') return data + FANOUT;
    if (Buffer.isBuffer(data)) return Buffer.concat([data, Buffer.from(FANOUT, 'utf8')]);
    return data;
  };

  const origSync = __amllFs.writeFileSync;
  __amllFs.writeFileSync = function (p, data, ...rest) {
    if (isPreload(p)) data = augment(data);
    return origSync.call(this, p, data, ...rest);
  };

  const origAsync = __amllFs.writeFile;
  __amllFs.writeFile = function (p, data, ...rest) {
    if (isPreload(p)) data = augment(data);
    return origAsync.call(this, p, data, ...rest);
  };
})();

/* ---- auto inject the AMLL lyric overlay into every renderer ---- */
(function __amllAutoInject() {
  let src = null;
  try {
    src = __amllFs.readFileSync(
      __amllPath.join(process.resourcesPath, 'amll', 'soda-amll.js'),
      'utf8'
    );
  } catch (e) {
    src = null;
  }
  if (!src) return;

  const inject = (wc) => {
    if (!wc || wc.isDestroyed()) return;
    wc.executeJavaScript('!!window.__SODA_AMLL__', true)
      .then((already) => {
        if (already) return null;
        return wc.executeJavaScript(src, true);
      })
      .catch(() => {});
  };

  const injectSoon = (wc) => {
    setTimeout(() => inject(wc), 1500);
  };

  const app = __amllElectron.app;
  app.on('browser-window-created', (_e, win) => {
    try {
      win.webContents.on('did-finish-load', () => injectSoon(win.webContents));
    } catch (e) {}
  });

  app.on('ready', () => {
    setTimeout(() => {
      try {
        for (const w of __amllElectron.BrowserWindow.getAllWindows()) injectSoon(w.webContents);
      } catch (e) {}
    }, 2500);
  });
})();

module.exports = __amllOrig.entry({ exports, require, module, __filename, __dirname });
