(() => {
  // ../amll/node_modules/gl-matrix/dist/esm/common.js
  var EPSILON = 1e-6;
  var DEG_TO_RAD = Math.PI / 180;
  var RAD_TO_DEG = 180 / Math.PI;

  // ../amll/node_modules/gl-matrix/dist/esm/mat4.js
  var IDENTITY_4X4 = new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ]);
  var Mat4 = class _Mat4 extends Float32Array {
    /**
     * The number of bytes in a {@link Mat4}.
     */
    static BYTE_LENGTH = 16 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Mat4}.
     */
    constructor(...values) {
      switch (values.length) {
        case 16:
          super(values);
          break;
        case 2:
          super(values[0], values[1], 16);
          break;
        case 1:
          const v = values[0];
          if (typeof v === "number") {
            super([
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v,
              v
            ]);
          } else {
            super(v, 0, 16);
          }
          break;
        default:
          super(IDENTITY_4X4);
          break;
      }
    }
    //============
    // Attributes
    //============
    /**
     * A string representation of `this`
     * Equivalent to `Mat4.str(this);`
     */
    get str() {
      return _Mat4.str(this);
    }
    //===================
    // Instance methods
    //===================
    /**
     * Copy the values from another {@link Mat4} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
      this.set(a);
      return this;
    }
    /**
     * Set `this` to the identity matrix
     * Equivalent to Mat4.identity(this)
     *
     * @returns `this`
     */
    identity() {
      this.set(IDENTITY_4X4);
      return this;
    }
    /**
     * Multiplies this {@link Mat4} against another one
     * Equivalent to `Mat4.multiply(this, this, b);`
     *
     * @param out - The receiving Matrix
     * @param a - The first operand
     * @param b - The second operand
     * @returns `this`
     */
    multiply(b) {
      return _Mat4.multiply(this, this, b);
    }
    /**
     * Alias for {@link Mat4.multiply}
     */
    mul(b) {
      return this;
    }
    /**
     * Transpose this {@link Mat4}
     * Equivalent to `Mat4.transpose(this, this);`
     *
     * @returns `this`
     */
    transpose() {
      return _Mat4.transpose(this, this);
    }
    /**
     * Inverts this {@link Mat4}
     * Equivalent to `Mat4.invert(this, this);`
     *
     * @returns `this`
     */
    invert() {
      return _Mat4.invert(this, this);
    }
    /**
     * Translate this {@link Mat4} by the given vector
     * Equivalent to `Mat4.translate(this, this, v);`
     *
     * @param v - The {@link Vec3} to translate by
     * @returns `this`
     */
    translate(v) {
      return _Mat4.translate(this, this, v);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the given axis
     * Equivalent to `Mat4.rotate(this, this, rad, axis);`
     *
     * @param rad - the angle to rotate the matrix by
     * @param axis - the axis to rotate around
     * @returns `out`
     */
    rotate(rad, axis) {
      return _Mat4.rotate(this, this, rad, axis);
    }
    /**
     * Scales this {@link Mat4} by the dimensions in the given vec3 not using vectorization
     * Equivalent to `Mat4.scale(this, this, v);`
     *
     * @param v - The {@link Vec3} to scale the matrix by
     * @returns `this`
     */
    scale(v) {
      return _Mat4.scale(this, this, v);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the X axis
     * Equivalent to `Mat4.rotateX(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `this`
     */
    rotateX(rad) {
      return _Mat4.rotateX(this, this, rad);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the Y axis
     * Equivalent to `Mat4.rotateY(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `this`
     */
    rotateY(rad) {
      return _Mat4.rotateY(this, this, rad);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the Z axis
     * Equivalent to `Mat4.rotateZ(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `this`
     */
    rotateZ(rad) {
      return _Mat4.rotateZ(this, this, rad);
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * Equivalent to `Mat4.perspectiveNO(this, fovy, aspect, near, far);`
     *
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `this`
     */
    perspectiveNO(fovy, aspect, near, far) {
      return _Mat4.perspectiveNO(this, fovy, aspect, near, far);
    }
    /**
     * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * Equivalent to `Mat4.perspectiveZO(this, fovy, aspect, near, far);`
     *
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `this`
     */
    perspectiveZO(fovy, aspect, near, far) {
      return _Mat4.perspectiveZO(this, fovy, aspect, near, far);
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Equivalent to `Mat4.orthoNO(this, left, right, bottom, top, near, far);`
     *
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `this`
     */
    orthoNO(left, right, bottom, top, near, far) {
      return _Mat4.orthoNO(this, left, right, bottom, top, near, far);
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Equivalent to `Mat4.orthoZO(this, left, right, bottom, top, near, far);`
     *
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `this`
     */
    orthoZO(left, right, bottom, top, near, far) {
      return _Mat4.orthoZO(this, left, right, bottom, top, near, far);
    }
    //================
    // Static methods
    //================
    /**
     * Creates a new, identity {@link Mat4}
     * @category Static
     *
     * @returns A new {@link Mat4}
     */
    static create() {
      return new _Mat4();
    }
    /**
     * Creates a new {@link Mat4} initialized with values from an existing matrix
     * @category Static
     *
     * @param a - Matrix to clone
     * @returns A new {@link Mat4}
     */
    static clone(a) {
      return new _Mat4(a);
    }
    /**
     * Copy the values from one {@link Mat4} to another
     * @category Static
     *
     * @param out - The receiving Matrix
     * @param a - Matrix to copy
     * @returns `out`
     */
    static copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    /**
     * Create a new mat4 with the given values
     * @category Static
     *
     * @param values - Matrix components
     * @returns A new {@link Mat4}
     */
    static fromValues(...values) {
      return new _Mat4(...values);
    }
    /**
     * Set the components of a mat4 to the given values
     * @category Static
     *
     * @param out - The receiving matrix
     * @param values - Matrix components
     * @returns `out`
     */
    static set(out, ...values) {
      out[0] = values[0];
      out[1] = values[1];
      out[2] = values[2];
      out[3] = values[3];
      out[4] = values[4];
      out[5] = values[5];
      out[6] = values[6];
      out[7] = values[7];
      out[8] = values[8];
      out[9] = values[9];
      out[10] = values[10];
      out[11] = values[11];
      out[12] = values[12];
      out[13] = values[13];
      out[14] = values[14];
      out[15] = values[15];
      return out;
    }
    /**
     * Set a {@link Mat4} to the identity matrix
     * @category Static
     *
     * @param out - The receiving Matrix
     * @returns `out`
     */
    static identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Transpose the values of a {@link Mat4}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static transpose(out, a) {
      if (out === a) {
        const a01 = a[1], a02 = a[2], a03 = a[3];
        const a12 = a[6], a13 = a[7];
        const a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
      } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
      }
      return out;
    }
    /**
     * Inverts a {@link Mat4}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out` or `null` if the matrix is not invertable
     */
    static invert(out, a) {
      const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      const b00 = a00 * a11 - a01 * a10;
      const b01 = a00 * a12 - a02 * a10;
      const b02 = a00 * a13 - a03 * a10;
      const b03 = a01 * a12 - a02 * a11;
      const b04 = a01 * a13 - a03 * a11;
      const b05 = a02 * a13 - a03 * a12;
      const b06 = a20 * a31 - a21 * a30;
      const b07 = a20 * a32 - a22 * a30;
      const b08 = a20 * a33 - a23 * a30;
      const b09 = a21 * a32 - a22 * a31;
      const b10 = a21 * a33 - a23 * a31;
      const b11 = a22 * a33 - a23 * a32;
      let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    }
    /**
     * Calculates the adjugate of a {@link Mat4}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static adjoint(out, a) {
      const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      const b00 = a00 * a11 - a01 * a10;
      const b01 = a00 * a12 - a02 * a10;
      const b02 = a00 * a13 - a03 * a10;
      const b03 = a01 * a12 - a02 * a11;
      const b04 = a01 * a13 - a03 * a11;
      const b05 = a02 * a13 - a03 * a12;
      const b06 = a20 * a31 - a21 * a30;
      const b07 = a20 * a32 - a22 * a30;
      const b08 = a20 * a33 - a23 * a30;
      const b09 = a21 * a32 - a22 * a31;
      const b10 = a21 * a33 - a23 * a31;
      const b11 = a22 * a33 - a23 * a32;
      out[0] = a11 * b11 - a12 * b10 + a13 * b09;
      out[1] = a02 * b10 - a01 * b11 - a03 * b09;
      out[2] = a31 * b05 - a32 * b04 + a33 * b03;
      out[3] = a22 * b04 - a21 * b05 - a23 * b03;
      out[4] = a12 * b08 - a10 * b11 - a13 * b07;
      out[5] = a00 * b11 - a02 * b08 + a03 * b07;
      out[6] = a32 * b02 - a30 * b05 - a33 * b01;
      out[7] = a20 * b05 - a22 * b02 + a23 * b01;
      out[8] = a10 * b10 - a11 * b08 + a13 * b06;
      out[9] = a01 * b08 - a00 * b10 - a03 * b06;
      out[10] = a30 * b04 - a31 * b02 + a33 * b00;
      out[11] = a21 * b02 - a20 * b04 - a23 * b00;
      out[12] = a11 * b07 - a10 * b09 - a12 * b06;
      out[13] = a00 * b09 - a01 * b07 + a02 * b06;
      out[14] = a31 * b01 - a30 * b03 - a32 * b00;
      out[15] = a20 * b03 - a21 * b01 + a22 * b00;
      return out;
    }
    /**
     * Calculates the determinant of a {@link Mat4}
     * @category Static
     *
     * @param a - the source matrix
     * @returns determinant of a
     */
    static determinant(a) {
      const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      const b0 = a00 * a11 - a01 * a10;
      const b1 = a00 * a12 - a02 * a10;
      const b2 = a01 * a12 - a02 * a11;
      const b3 = a20 * a31 - a21 * a30;
      const b4 = a20 * a32 - a22 * a30;
      const b5 = a21 * a32 - a22 * a31;
      const b6 = a00 * b5 - a01 * b4 + a02 * b3;
      const b7 = a10 * b5 - a11 * b4 + a12 * b3;
      const b8 = a20 * b2 - a21 * b1 + a22 * b0;
      const b9 = a30 * b2 - a31 * b1 + a32 * b0;
      return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
    }
    /**
     * Multiplies two {@link Mat4}s
     * @category Static
     *
     * @param out - The receiving Matrix
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
      const a00 = a[0];
      const a01 = a[1];
      const a02 = a[2];
      const a03 = a[3];
      const a10 = a[4];
      const a11 = a[5];
      const a12 = a[6];
      const a13 = a[7];
      const a20 = a[8];
      const a21 = a[9];
      const a22 = a[10];
      const a23 = a[11];
      const a30 = a[12];
      const a31 = a[13];
      const a32 = a[14];
      const a33 = a[15];
      let b0 = b[0];
      let b1 = b[1];
      let b2 = b[2];
      let b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[4];
      b1 = b[5];
      b2 = b[6];
      b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[8];
      b1 = b[9];
      b2 = b[10];
      b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[12];
      b1 = b[13];
      b2 = b[14];
      b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    }
    /**
     * Alias for {@link Mat4.multiply}
     * @category Static
     */
    static mul(out, a, b) {
      return out;
    }
    /**
     * Translate a {@link Mat4} by the given vector
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to translate
     * @param v - vector to translate by
     * @returns `out`
     */
    static translate(out, a, v) {
      const x = v[0];
      const y = v[1];
      const z = v[2];
      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4];
        const a11 = a[5];
        const a12 = a[6];
        const a13 = a[7];
        const a20 = a[8];
        const a21 = a[9];
        const a22 = a[10];
        const a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }
      return out;
    }
    /**
     * Scales the {@link Mat4} by the dimensions in the given {@link Vec3} not using vectorization
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to scale
     * @param v - the {@link Vec3} to scale the matrix by
     * @returns `out`
     **/
    static scale(out, a, v) {
      const x = v[0];
      const y = v[1];
      const z = v[2];
      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    /**
     * Rotates a {@link Mat4} by the given angle around the given axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @param axis - the axis to rotate around
     * @returns `out` or `null` if axis has a length of 0
     */
    static rotate(out, a, rad, axis) {
      let x = axis[0];
      let y = axis[1];
      let z = axis[2];
      let len = Math.sqrt(x * x + y * y + z * z);
      if (len < EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const t = 1 - c;
      const a00 = a[0];
      const a01 = a[1];
      const a02 = a[2];
      const a03 = a[3];
      const a10 = a[4];
      const a11 = a[5];
      const a12 = a[6];
      const a13 = a[7];
      const a20 = a[8];
      const a21 = a[9];
      const a22 = a[10];
      const a23 = a[11];
      const b00 = x * x * t + c;
      const b01 = y * x * t + z * s;
      const b02 = z * x * t - y * s;
      const b10 = x * y * t - z * s;
      const b11 = y * y * t + c;
      const b12 = z * y * t + x * s;
      const b20 = x * z * t + y * s;
      const b21 = y * z * t - x * s;
      const b22 = z * z * t + c;
      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;
      if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      return out;
    }
    /**
     * Rotates a matrix by the given angle around the X axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotateX(out, a, rad) {
      let s = Math.sin(rad);
      let c = Math.cos(rad);
      let a10 = a[4];
      let a11 = a[5];
      let a12 = a[6];
      let a13 = a[7];
      let a20 = a[8];
      let a21 = a[9];
      let a22 = a[10];
      let a23 = a[11];
      if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[4] = a10 * c + a20 * s;
      out[5] = a11 * c + a21 * s;
      out[6] = a12 * c + a22 * s;
      out[7] = a13 * c + a23 * s;
      out[8] = a20 * c - a10 * s;
      out[9] = a21 * c - a11 * s;
      out[10] = a22 * c - a12 * s;
      out[11] = a23 * c - a13 * s;
      return out;
    }
    /**
     * Rotates a matrix by the given angle around the Y axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotateY(out, a, rad) {
      let s = Math.sin(rad);
      let c = Math.cos(rad);
      let a00 = a[0];
      let a01 = a[1];
      let a02 = a[2];
      let a03 = a[3];
      let a20 = a[8];
      let a21 = a[9];
      let a22 = a[10];
      let a23 = a[11];
      if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c - a20 * s;
      out[1] = a01 * c - a21 * s;
      out[2] = a02 * c - a22 * s;
      out[3] = a03 * c - a23 * s;
      out[8] = a00 * s + a20 * c;
      out[9] = a01 * s + a21 * c;
      out[10] = a02 * s + a22 * c;
      out[11] = a03 * s + a23 * c;
      return out;
    }
    /**
     * Rotates a matrix by the given angle around the Z axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotateZ(out, a, rad) {
      let s = Math.sin(rad);
      let c = Math.cos(rad);
      let a00 = a[0];
      let a01 = a[1];
      let a02 = a[2];
      let a03 = a[3];
      let a10 = a[4];
      let a11 = a[5];
      let a12 = a[6];
      let a13 = a[7];
      if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c + a10 * s;
      out[1] = a01 * c + a11 * s;
      out[2] = a02 * c + a12 * s;
      out[3] = a03 * c + a13 * s;
      out[4] = a10 * c - a00 * s;
      out[5] = a11 * c - a01 * s;
      out[6] = a12 * c - a02 * s;
      out[7] = a13 * c - a03 * s;
      return out;
    }
    /**
     * Creates a {@link Mat4} from a vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, dest, vec);
     * @category Static
     *
     * @param out - {@link Mat4} receiving operation result
     * @param v - Translation vector
     * @returns `out`
     */
    static fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    /**
     * Creates a {@link Mat4} from a vector scaling
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.scale(dest, dest, vec);
     * @category Static
     *
     * @param out - {@link Mat4} receiving operation result
     * @param v - Scaling vector
     * @returns `out`
     */
    static fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = v[1];
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = v[2];
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a {@link Mat4} from a given angle around a given axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotate(dest, dest, rad, axis);
     * @category Static
     *
     * @param out - {@link Mat4} receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @param axis - the axis to rotate around
     * @returns `out` or `null` if `axis` has a length of 0
     */
    static fromRotation(out, rad, axis) {
      let x = axis[0];
      let y = axis[1];
      let z = axis[2];
      let len = Math.sqrt(x * x + y * y + z * z);
      if (len < EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const t = 1 - c;
      out[0] = x * x * t + c;
      out[1] = y * x * t + z * s;
      out[2] = z * x * t - y * s;
      out[3] = 0;
      out[4] = x * y * t - z * s;
      out[5] = y * y * t + c;
      out[6] = z * y * t + x * s;
      out[7] = 0;
      out[8] = x * z * t + y * s;
      out[9] = y * z * t - x * s;
      out[10] = z * z * t + c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from the given angle around the X axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateX(dest, dest, rad);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromXRotation(out, rad) {
      let s = Math.sin(rad);
      let c = Math.cos(rad);
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = c;
      out[6] = s;
      out[7] = 0;
      out[8] = 0;
      out[9] = -s;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from the given angle around the Y axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateY(dest, dest, rad);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromYRotation(out, rad) {
      let s = Math.sin(rad);
      let c = Math.cos(rad);
      out[0] = c;
      out[1] = 0;
      out[2] = -s;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = s;
      out[9] = 0;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from the given angle around the Z axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateZ(dest, dest, rad);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromZRotation(out, rad) {
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = 0;
      out[4] = -s;
      out[5] = c;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from a quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Rotation quaternion
     * @param v - Translation vector
     * @returns `out`
     */
    static fromRotationTranslation(out, q, v) {
      const x = q[0];
      const y = q[1];
      const z = q[2];
      const w = q[3];
      const x2 = x + x;
      const y2 = y + y;
      const z2 = z + z;
      const xx = x * x2;
      const xy = x * y2;
      const xz = x * z2;
      const yy = y * y2;
      const yz = y * z2;
      const zz = z * z2;
      const wx = w * x2;
      const wy = w * y2;
      const wz = w * z2;
      out[0] = 1 - (yy + zz);
      out[1] = xy + wz;
      out[2] = xz - wy;
      out[3] = 0;
      out[4] = xy - wz;
      out[5] = 1 - (xx + zz);
      out[6] = yz + wx;
      out[7] = 0;
      out[8] = xz + wy;
      out[9] = yz - wx;
      out[10] = 1 - (xx + yy);
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    /**
     * Sets a {@link Mat4} from a {@link Quat2}.
     * @category Static
     *
     * @param out - Matrix
     * @param a - Dual Quaternion
     * @returns `out`
     */
    static fromQuat2(out, a) {
      const bx = -a[0];
      const by = -a[1];
      const bz = -a[2];
      const bw = a[3];
      const ax = a[4];
      const ay = a[5];
      const az = a[6];
      const aw = a[7];
      let magnitude = bx * bx + by * by + bz * bz + bw * bw;
      if (magnitude > 0) {
        tmpVec3[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
        tmpVec3[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
        tmpVec3[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
      } else {
        tmpVec3[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
        tmpVec3[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
        tmpVec3[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      }
      _Mat4.fromRotationTranslation(out, a, tmpVec3);
      return out;
    }
    /**
     * Calculates a {@link Mat4} normal matrix (transpose inverse) from a {@link Mat4}
     * @category Static
     *
     * @param out - Matrix receiving operation result
     * @param a - Mat4 to derive the normal matrix from
     * @returns `out` or `null` if the matrix is not invertable
     */
    static normalFromMat4(out, a) {
      const a00 = a[0];
      const a01 = a[1];
      const a02 = a[2];
      const a03 = a[3];
      const a10 = a[4];
      const a11 = a[5];
      const a12 = a[6];
      const a13 = a[7];
      const a20 = a[8];
      const a21 = a[9];
      const a22 = a[10];
      const a23 = a[11];
      const a30 = a[12];
      const a31 = a[13];
      const a32 = a[14];
      const a33 = a[15];
      const b00 = a00 * a11 - a01 * a10;
      const b01 = a00 * a12 - a02 * a10;
      const b02 = a00 * a13 - a03 * a10;
      const b03 = a01 * a12 - a02 * a11;
      const b04 = a01 * a13 - a03 * a11;
      const b05 = a02 * a13 - a03 * a12;
      const b06 = a20 * a31 - a21 * a30;
      const b07 = a20 * a32 - a22 * a30;
      const b08 = a20 * a33 - a23 * a30;
      const b09 = a21 * a32 - a22 * a31;
      const b10 = a21 * a33 - a23 * a31;
      const b11 = a22 * a33 - a23 * a32;
      let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[3] = 0;
      out[4] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[7] = 0;
      out[8] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[9] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Calculates a {@link Mat4} normal matrix (transpose inverse) from a {@link Mat4}
     * This version omits the calculation of the constant factor (1/determinant), so
     * any normals transformed with it will need to be renormalized.
     * From https://stackoverflow.com/a/27616419/25968
     * @category Static
     *
     * @param out - Matrix receiving operation result
     * @param a - Mat4 to derive the normal matrix from
     * @returns `out`
     */
    static normalFromMat4Fast(out, a) {
      const ax = a[0];
      const ay = a[1];
      const az = a[2];
      const bx = a[4];
      const by = a[5];
      const bz = a[6];
      const cx = a[8];
      const cy = a[9];
      const cz = a[10];
      out[0] = by * cz - cz * cy;
      out[1] = bz * cx - cx * cz;
      out[2] = bx * cy - cy * cx;
      out[3] = 0;
      out[4] = cy * az - cz * ay;
      out[5] = cz * ax - cx * az;
      out[6] = cx * ay - cy * ax;
      out[7] = 0;
      out[8] = ay * bz - az * by;
      out[9] = az * bx - ax * bz;
      out[10] = ax * by - ay * bx;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Returns the translation vector component of a transformation
     * matrix. If a matrix is built with fromRotationTranslation,
     * the returned vector will be the same as the translation vector
     * originally supplied.
     * @category Static
     *
     * @param  {vec3} out Vector to receive translation component
     * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {vec3} out
     */
    static getTranslation(out, mat) {
      out[0] = mat[12];
      out[1] = mat[13];
      out[2] = mat[14];
      return out;
    }
    /**
     * Returns the scaling factor component of a transformation
     * matrix. If a matrix is built with fromRotationTranslationScale
     * with a normalized Quaternion parameter, the returned vector will be
     * the same as the scaling vector
     * originally supplied.
     * @category Static
     *
     * @param  {vec3} out Vector to receive scaling factor component
     * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {vec3} out
     */
    static getScaling(out, mat) {
      const m11 = mat[0];
      const m12 = mat[1];
      const m13 = mat[2];
      const m21 = mat[4];
      const m22 = mat[5];
      const m23 = mat[6];
      const m31 = mat[8];
      const m32 = mat[9];
      const m33 = mat[10];
      out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
      out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
      out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
      return out;
    }
    /**
     * Returns a quaternion representing the rotational component
     * of a transformation matrix. If a matrix is built with
     * fromRotationTranslation, the returned quaternion will be the
     * same as the quaternion originally supplied.
     * @category Static
     *
     * @param out - Quaternion to receive the rotation component
     * @param mat - Matrix to be decomposed (input)
     * @return `out`
     */
    static getRotation(out, mat) {
      _Mat4.getScaling(tmpVec3, mat);
      const is1 = 1 / tmpVec3[0];
      const is2 = 1 / tmpVec3[1];
      const is3 = 1 / tmpVec3[2];
      const sm11 = mat[0] * is1;
      const sm12 = mat[1] * is2;
      const sm13 = mat[2] * is3;
      const sm21 = mat[4] * is1;
      const sm22 = mat[5] * is2;
      const sm23 = mat[6] * is3;
      const sm31 = mat[8] * is1;
      const sm32 = mat[9] * is2;
      const sm33 = mat[10] * is3;
      const trace = sm11 + sm22 + sm33;
      let S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }
      return out;
    }
    /**
     * Decomposes a transformation matrix into its rotation, translation
     * and scale components. Returns only the rotation component
     * @category Static
     *
     * @param out_r - Quaternion to receive the rotation component
     * @param out_t - Vector to receive the translation vector
     * @param out_s - Vector to receive the scaling factor
     * @param mat - Matrix to be decomposed (input)
     * @returns `out_r`
     */
    static decompose(out_r, out_t, out_s, mat) {
      out_t[0] = mat[12];
      out_t[1] = mat[13];
      out_t[2] = mat[14];
      const m11 = mat[0];
      const m12 = mat[1];
      const m13 = mat[2];
      const m21 = mat[4];
      const m22 = mat[5];
      const m23 = mat[6];
      const m31 = mat[8];
      const m32 = mat[9];
      const m33 = mat[10];
      out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
      out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
      out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
      const is1 = 1 / out_s[0];
      const is2 = 1 / out_s[1];
      const is3 = 1 / out_s[2];
      const sm11 = m11 * is1;
      const sm12 = m12 * is2;
      const sm13 = m13 * is3;
      const sm21 = m21 * is1;
      const sm22 = m22 * is2;
      const sm23 = m23 * is3;
      const sm31 = m31 * is1;
      const sm32 = m32 * is2;
      const sm33 = m33 * is3;
      const trace = sm11 + sm22 + sm33;
      let S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out_r[3] = 0.25 * S;
        out_r[0] = (sm23 - sm32) / S;
        out_r[1] = (sm31 - sm13) / S;
        out_r[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out_r[3] = (sm23 - sm32) / S;
        out_r[0] = 0.25 * S;
        out_r[1] = (sm12 + sm21) / S;
        out_r[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out_r[3] = (sm31 - sm13) / S;
        out_r[0] = (sm12 + sm21) / S;
        out_r[1] = 0.25 * S;
        out_r[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out_r[3] = (sm12 - sm21) / S;
        out_r[0] = (sm31 + sm13) / S;
        out_r[1] = (sm23 + sm32) / S;
        out_r[2] = 0.25 * S;
      }
      return out_r;
    }
    /**
     * Creates a matrix from a quaternion rotation, vector translation and vector scale
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Rotation quaternion
     * @param v - Translation vector
     * @param s - Scaling vector
     * @returns `out`
     */
    static fromRotationTranslationScale(out, q, v, s) {
      const x = q[0];
      const y = q[1];
      const z = q[2];
      const w = q[3];
      const x2 = x + x;
      const y2 = y + y;
      const z2 = z + z;
      const xx = x * x2;
      const xy = x * y2;
      const xz = x * z2;
      const yy = y * y2;
      const yz = y * z2;
      const zz = z * z2;
      const wx = w * x2;
      const wy = w * y2;
      const wz = w * z2;
      const sx = s[0];
      const sy = s[1];
      const sz = s[2];
      out[0] = (1 - (yy + zz)) * sx;
      out[1] = (xy + wz) * sx;
      out[2] = (xz - wy) * sx;
      out[3] = 0;
      out[4] = (xy - wz) * sy;
      out[5] = (1 - (xx + zz)) * sy;
      out[6] = (yz + wx) * sy;
      out[7] = 0;
      out[8] = (xz + wy) * sz;
      out[9] = (yz - wx) * sz;
      out[10] = (1 - (xx + yy)) * sz;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     mat4.translate(dest, origin);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale)
     *     mat4.translate(dest, negativeOrigin);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Rotation quaternion
     * @param v - Translation vector
     * @param s - Scaling vector
     * @param o - The origin vector around which to scale and rotate
     * @returns `out`
     */
    static fromRotationTranslationScaleOrigin(out, q, v, s, o) {
      const x = q[0];
      const y = q[1];
      const z = q[2];
      const w = q[3];
      const x2 = x + x;
      const y2 = y + y;
      const z2 = z + z;
      const xx = x * x2;
      const xy = x * y2;
      const xz = x * z2;
      const yy = y * y2;
      const yz = y * z2;
      const zz = z * z2;
      const wx = w * x2;
      const wy = w * y2;
      const wz = w * z2;
      const sx = s[0];
      const sy = s[1];
      const sz = s[2];
      const ox = o[0];
      const oy = o[1];
      const oz = o[2];
      const out0 = (1 - (yy + zz)) * sx;
      const out1 = (xy + wz) * sx;
      const out2 = (xz - wy) * sx;
      const out4 = (xy - wz) * sy;
      const out5 = (1 - (xx + zz)) * sy;
      const out6 = (yz + wx) * sy;
      const out8 = (xz + wy) * sz;
      const out9 = (yz - wx) * sz;
      const out10 = (1 - (xx + yy)) * sz;
      out[0] = out0;
      out[1] = out1;
      out[2] = out2;
      out[3] = 0;
      out[4] = out4;
      out[5] = out5;
      out[6] = out6;
      out[7] = 0;
      out[8] = out8;
      out[9] = out9;
      out[10] = out10;
      out[11] = 0;
      out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
      out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
      out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
      out[15] = 1;
      return out;
    }
    /**
     * Calculates a 4x4 matrix from the given quaternion
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Quaternion to create matrix from
     * @returns `out`
     */
    static fromQuat(out, q) {
      const x = q[0];
      const y = q[1];
      const z = q[2];
      const w = q[3];
      const x2 = x + x;
      const y2 = y + y;
      const z2 = z + z;
      const xx = x * x2;
      const yx = y * x2;
      const yy = y * y2;
      const zx = z * x2;
      const zy = z * y2;
      const zz = z * z2;
      const wx = w * x2;
      const wy = w * y2;
      const wz = w * z2;
      out[0] = 1 - yy - zz;
      out[1] = yx + wz;
      out[2] = zx - wy;
      out[3] = 0;
      out[4] = yx - wz;
      out[5] = 1 - xx - zz;
      out[6] = zy + wx;
      out[7] = 0;
      out[8] = zx + wy;
      out[9] = zy - wx;
      out[10] = 1 - xx - yy;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Generates a frustum matrix with the given bounds
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far -  Far bound of the frustum, can be null or Infinity
     * @returns `out`
     */
    static frustumNO(out, left, right, bottom, top, near, far = Infinity) {
      const rl = 1 / (right - left);
      const tb = 1 / (top - bottom);
      out[0] = near * 2 * rl;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = near * 2 * tb;
      out[6] = 0;
      out[7] = 0;
      out[8] = (right + left) * rl;
      out[9] = (top + bottom) * tb;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        const nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }
      return out;
    }
    /**
     * Alias for {@link Mat4.frustumNO}
     * @category Static
     * @deprecated Use {@link Mat4.frustumNO} or {@link Mat4.frustumZO} explicitly
     */
    static frustum(out, left, right, bottom, top, near, far = Infinity) {
      return out;
    }
    /**
     * Generates a frustum matrix with the given bounds
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `out`
     */
    static frustumZO(out, left, right, bottom, top, near, far = Infinity) {
      const rl = 1 / (right - left);
      const tb = 1 / (top - bottom);
      out[0] = near * 2 * rl;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = near * 2 * tb;
      out[6] = 0;
      out[7] = 0;
      out[8] = (right + left) * rl;
      out[9] = (top + bottom) * tb;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        const nf = 1 / (near - far);
        out[10] = far * nf;
        out[14] = far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -near;
      }
      return out;
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `out`
     */
    static perspectiveNO(out, fovy, aspect, near, far = Infinity) {
      const f = 1 / Math.tan(fovy / 2);
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        const nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }
      return out;
    }
    /**
     * Alias for {@link Mat4.perspectiveNO}
     * @category Static
     * @deprecated Use {@link Mat4.perspectiveNO} or {@link Mat4.perspectiveZO} explicitly
     */
    static perspective(out, fovy, aspect, near, far = Infinity) {
      return out;
    }
    /**
     * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `out`
     */
    static perspectiveZO(out, fovy, aspect, near, far = Infinity) {
      const f = 1 / Math.tan(fovy / 2);
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        const nf = 1 / (near - far);
        out[10] = far * nf;
        out[14] = far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -near;
      }
      return out;
    }
    /**
     * Generates a perspective projection matrix with the given field of view.
     * This is primarily useful for generating projection matrices to be used
     * with the still experiemental WebVR API.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param fov - Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     * @deprecated
     */
    static perspectiveFromFieldOfView(out, fov, near, far) {
      const upTan = Math.tan(fov.upDegrees * Math.PI / 180);
      const downTan = Math.tan(fov.downDegrees * Math.PI / 180);
      const leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
      const rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
      const xScale = 2 / (leftTan + rightTan);
      const yScale = 2 / (upTan + downTan);
      out[0] = xScale;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = yScale;
      out[6] = 0;
      out[7] = 0;
      out[8] = -((leftTan - rightTan) * xScale * 0.5);
      out[9] = (upTan - downTan) * yScale * 0.5;
      out[10] = far / (near - far);
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near / (near - far);
      out[15] = 0;
      return out;
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     */
    static orthoNO(out, left, right, bottom, top, near, far) {
      const lr = 1 / (left - right);
      const bt = 1 / (bottom - top);
      const nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 2 * nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = (far + near) * nf;
      out[15] = 1;
      return out;
    }
    /**
     * Alias for {@link Mat4.orthoNO}
     * @category Static
     * @deprecated Use {@link Mat4.orthoNO} or {@link Mat4.orthoZO} explicitly
     */
    static ortho(out, left, right, bottom, top, near, far) {
      return out;
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     */
    static orthoZO(out, left, right, bottom, top, near, far) {
      const lr = 1 / (left - right);
      const bt = 1 / (bottom - top);
      const nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = near * nf;
      out[15] = 1;
      return out;
    }
    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis.
     * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param eye - Position of the viewer
     * @param center - Point the viewer is looking at
     * @param up - vec3 pointing up
     * @returns `out`
     */
    static lookAt(out, eye, center, up) {
      const eyex = eye[0];
      const eyey = eye[1];
      const eyez = eye[2];
      const upx = up[0];
      const upy = up[1];
      const upz = up[2];
      const centerx = center[0];
      const centery = center[1];
      const centerz = center[2];
      if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
        return _Mat4.identity(out);
      }
      let z0 = eyex - centerx;
      let z1 = eyey - centery;
      let z2 = eyez - centerz;
      let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
      let x0 = upy * z2 - upz * z1;
      let x1 = upz * z0 - upx * z2;
      let x2 = upx * z1 - upy * z0;
      len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
      if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      let y0 = z1 * x2 - z2 * x1;
      let y1 = z2 * x0 - z0 * x2;
      let y2 = z0 * x1 - z1 * x0;
      len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
      if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
      }
      out[0] = x0;
      out[1] = y0;
      out[2] = z0;
      out[3] = 0;
      out[4] = x1;
      out[5] = y1;
      out[6] = z1;
      out[7] = 0;
      out[8] = x2;
      out[9] = y2;
      out[10] = z2;
      out[11] = 0;
      out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      out[15] = 1;
      return out;
    }
    /**
     * Generates a matrix that makes something look at something else.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param eye - Position of the viewer
     * @param target - Point the viewer is looking at
     * @param up - vec3 pointing up
     * @returns `out`
     */
    static targetTo(out, eye, target, up) {
      const eyex = eye[0];
      const eyey = eye[1];
      const eyez = eye[2];
      const upx = up[0];
      const upy = up[1];
      const upz = up[2];
      let z0 = eyex - target[0];
      let z1 = eyey - target[1];
      let z2 = eyez - target[2];
      let len = z0 * z0 + z1 * z1 + z2 * z2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
      }
      let x0 = upy * z2 - upz * z1;
      let x1 = upz * z0 - upx * z2;
      let x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      out[0] = x0;
      out[1] = x1;
      out[2] = x2;
      out[3] = 0;
      out[4] = z1 * x2 - z2 * x1;
      out[5] = z2 * x0 - z0 * x2;
      out[6] = z0 * x1 - z1 * x0;
      out[7] = 0;
      out[8] = z0;
      out[9] = z1;
      out[10] = z2;
      out[11] = 0;
      out[12] = eyex;
      out[13] = eyey;
      out[14] = eyez;
      out[15] = 1;
      return out;
    }
    /**
     * Returns Frobenius norm of a {@link Mat4}
     * @category Static
     *
     * @param a - the matrix to calculate Frobenius norm of
     * @returns Frobenius norm
     */
    static frob(a) {
      return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8] + a[9] * a[9] + a[10] * a[10] + a[11] * a[11] + a[12] * a[12] + a[13] * a[13] + a[14] * a[14] + a[15] * a[15]);
    }
    /**
     * Adds two {@link Mat4}'s
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      out[9] = a[9] + b[9];
      out[10] = a[10] + b[10];
      out[11] = a[11] + b[11];
      out[12] = a[12] + b[12];
      out[13] = a[13] + b[13];
      out[14] = a[14] + b[14];
      out[15] = a[15] + b[15];
      return out;
    }
    /**
     * Subtracts matrix b from matrix a
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      out[9] = a[9] - b[9];
      out[10] = a[10] - b[10];
      out[11] = a[11] - b[11];
      out[12] = a[12] - b[12];
      out[13] = a[13] - b[13];
      out[14] = a[14] - b[14];
      out[15] = a[15] - b[15];
      return out;
    }
    /**
     * Alias for {@link Mat4.subtract}
     * @category Static
     */
    static sub(out, a, b) {
      return out;
    }
    /**
     * Multiply each element of the matrix by a scalar.
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to scale
     * @param b - amount to scale the matrix's elements by
     * @returns `out`
     */
    static multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      out[9] = a[9] * b;
      out[10] = a[10] * b;
      out[11] = a[11] * b;
      out[12] = a[12] * b;
      out[13] = a[13] * b;
      out[14] = a[14] * b;
      out[15] = a[15] * b;
      return out;
    }
    /**
     * Adds two mat4's after multiplying each element of the second operand by a scalar value.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b's elements by before adding
     * @returns `out`
     */
    static multiplyScalarAndAdd(out, a, b, scale) {
      out[0] = a[0] + b[0] * scale;
      out[1] = a[1] + b[1] * scale;
      out[2] = a[2] + b[2] * scale;
      out[3] = a[3] + b[3] * scale;
      out[4] = a[4] + b[4] * scale;
      out[5] = a[5] + b[5] * scale;
      out[6] = a[6] + b[6] * scale;
      out[7] = a[7] + b[7] * scale;
      out[8] = a[8] + b[8] * scale;
      out[9] = a[9] + b[9] * scale;
      out[10] = a[10] + b[10] * scale;
      out[11] = a[11] + b[11] * scale;
      out[12] = a[12] + b[12] * scale;
      out[13] = a[13] + b[13] * scale;
      out[14] = a[14] + b[14] * scale;
      out[15] = a[15] + b[15] * scale;
      return out;
    }
    /**
     * Returns whether or not two {@link Mat4}s have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @returns True if the matrices are equal, false otherwise.
     */
    static exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
    }
    /**
     * Returns whether or not two {@link Mat4}s have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @returns True if the matrices are equal, false otherwise.
     */
    static equals(a, b) {
      const a0 = a[0];
      const a1 = a[1];
      const a2 = a[2];
      const a3 = a[3];
      const a4 = a[4];
      const a5 = a[5];
      const a6 = a[6];
      const a7 = a[7];
      const a8 = a[8];
      const a9 = a[9];
      const a10 = a[10];
      const a11 = a[11];
      const a12 = a[12];
      const a13 = a[13];
      const a14 = a[14];
      const a15 = a[15];
      const b0 = b[0];
      const b1 = b[1];
      const b2 = b[2];
      const b3 = b[3];
      const b4 = b[4];
      const b5 = b[5];
      const b6 = b[6];
      const b7 = b[7];
      const b8 = b[8];
      const b9 = b[9];
      const b10 = b[10];
      const b11 = b[11];
      const b12 = b[12];
      const b13 = b[13];
      const b14 = b[14];
      const b15 = b[15];
      return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
    }
    /**
     * Returns a string representation of a {@link Mat4}
     * @category Static
     *
     * @param a - matrix to represent as a string
     * @returns string representation of the matrix
     */
    static str(a) {
      return `Mat4(${a.join(", ")})`;
    }
  };
  var tmpVec3 = new Float32Array(3);
  Mat4.prototype.mul = Mat4.prototype.multiply;
  Mat4.sub = Mat4.subtract;
  Mat4.mul = Mat4.multiply;
  Mat4.frustum = Mat4.frustumNO;
  Mat4.perspective = Mat4.perspectiveNO;
  Mat4.ortho = Mat4.orthoNO;

  // ../amll/node_modules/gl-matrix/dist/esm/vec3.js
  var Vec3 = class _Vec3 extends Float32Array {
    /**
    * The number of bytes in a {@link Vec3}.
    */
    static BYTE_LENGTH = 3 * Float32Array.BYTES_PER_ELEMENT;
    /**
    * Create a {@link Vec3}.
    */
    constructor(...values) {
      switch (values.length) {
        case 3:
          super(values);
          break;
        case 2:
          super(values[0], values[1], 3);
          break;
        case 1: {
          const v = values[0];
          if (typeof v === "number") {
            super([v, v, v]);
          } else {
            super(v, 0, 3);
          }
          break;
        }
        default:
          super(3);
          break;
      }
    }
    //============
    // Attributes
    //============
    // Getters and setters to make component access read better.
    // These are likely to be a little bit slower than direct array access.
    /**
     * The x component of the vector. Equivalent to `this[0];`
     * @category Vector components
     */
    get x() {
      return this[0];
    }
    set x(value) {
      this[0] = value;
    }
    /**
     * The y component of the vector. Equivalent to `this[1];`
     * @category Vector components
     */
    get y() {
      return this[1];
    }
    set y(value) {
      this[1] = value;
    }
    /**
     * The z component of the vector. Equivalent to `this[2];`
     * @category Vector components
     */
    get z() {
      return this[2];
    }
    set z(value) {
      this[2] = value;
    }
    // Alternate set of getters and setters in case this is being used to define
    // a color.
    /**
     * The r component of the vector. Equivalent to `this[0];`
     * @category Color components
     */
    get r() {
      return this[0];
    }
    set r(value) {
      this[0] = value;
    }
    /**
     * The g component of the vector. Equivalent to `this[1];`
     * @category Color components
     */
    get g() {
      return this[1];
    }
    set g(value) {
      this[1] = value;
    }
    /**
     * The b component of the vector. Equivalent to `this[2];`
     * @category Color components
     */
    get b() {
      return this[2];
    }
    set b(value) {
      this[2] = value;
    }
    /**
     * The magnitude (length) of this.
     * Equivalent to `Vec3.magnitude(this);`
     *
     * Magnitude is used because the `length` attribute is already defined by
     * TypedArrays to mean the number of elements in the array.
     */
    get magnitude() {
      const x = this[0];
      const y = this[1];
      const z = this[2];
      return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Alias for {@link Vec3.magnitude}
     */
    get mag() {
      return this.magnitude;
    }
    /**
     * The squared magnitude (length) of `this`.
     * Equivalent to `Vec3.squaredMagnitude(this);`
     */
    get squaredMagnitude() {
      const x = this[0];
      const y = this[1];
      const z = this[2];
      return x * x + y * y + z * z;
    }
    /**
     * Alias for {@link Vec3.squaredMagnitude}
     */
    get sqrMag() {
      return this.squaredMagnitude;
    }
    /**
     * A string representation of `this`
     * Equivalent to `Vec3.str(this);`
     */
    get str() {
      return _Vec3.str(this);
    }
    //===================
    // Instances methods
    //===================
    /**
     * Copy the values from another {@link Vec3} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
      this.set(a);
      return this;
    }
    /**
     * Adds a {@link Vec3} to `this`.
     * Equivalent to `Vec3.add(this, this, b);`
     *
     * @param b - The vector to add to `this`
     * @returns `this`
     */
    add(b) {
      this[0] += b[0];
      this[1] += b[1];
      this[2] += b[2];
      return this;
    }
    /**
     * Subtracts a {@link Vec3} from `this`.
     * Equivalent to `Vec3.subtract(this, this, b);`
     *
     * @param b - The vector to subtract from `this`
     * @returns `this`
     */
    subtract(b) {
      this[0] -= b[0];
      this[1] -= b[1];
      this[2] -= b[2];
      return this;
    }
    /**
     * Alias for {@link Vec3.subtract}
     */
    sub(b) {
      return this;
    }
    /**
     * Multiplies `this` by a {@link Vec3}.
     * Equivalent to `Vec3.multiply(this, this, b);`
     *
     * @param b - The vector to multiply `this` by
     * @returns `this`
     */
    multiply(b) {
      this[0] *= b[0];
      this[1] *= b[1];
      this[2] *= b[2];
      return this;
    }
    /**
     * Alias for {@link Vec3.multiply}
     */
    mul(b) {
      return this;
    }
    /**
     * Divides `this` by a {@link Vec3}.
     * Equivalent to `Vec3.divide(this, this, b);`
     *
     * @param b - The vector to divide `this` by
     * @returns `this`
     */
    divide(b) {
      this[0] /= b[0];
      this[1] /= b[1];
      this[2] /= b[2];
      return this;
    }
    /**
     * Alias for {@link Vec3.divide}
     */
    div(b) {
      return this;
    }
    /**
     * Scales `this` by a scalar number.
     * Equivalent to `Vec3.scale(this, this, b);`
     *
     * @param b - Amount to scale `this` by
     * @returns `this`
     */
    scale(b) {
      this[0] *= b;
      this[1] *= b;
      this[2] *= b;
      return this;
    }
    /**
     * Calculates `this` scaled by a scalar value then adds the result to `this`.
     * Equivalent to `Vec3.scaleAndAdd(this, this, b, scale);`
     *
     * @param b - The vector to add to `this`
     * @param scale - The amount to scale `b` by before adding
     * @returns `this`
     */
    scaleAndAdd(b, scale) {
      this[0] += b[0] * scale;
      this[1] += b[1] * scale;
      this[2] += b[2] * scale;
      return this;
    }
    /**
     * Calculates the euclidian distance between another {@link Vec3} and `this`.
     * Equivalent to `Vec3.distance(this, b);`
     *
     * @param b - The vector to calculate the distance to
     * @returns Distance between `this` and `b`
     */
    distance(b) {
      return _Vec3.distance(this, b);
    }
    /**
     * Alias for {@link Vec3.distance}
     */
    dist(b) {
      return 0;
    }
    /**
     * Calculates the squared euclidian distance between another {@link Vec3} and `this`.
     * Equivalent to `Vec3.squaredDistance(this, b);`
     *
     * @param b The vector to calculate the squared distance to
     * @returns Squared distance between `this` and `b`
     */
    squaredDistance(b) {
      return _Vec3.squaredDistance(this, b);
    }
    /**
     * Alias for {@link Vec3.squaredDistance}
     */
    sqrDist(b) {
      return 0;
    }
    /**
     * Negates the components of `this`.
     * Equivalent to `Vec3.negate(this, this);`
     *
     * @returns `this`
     */
    negate() {
      this[0] *= -1;
      this[1] *= -1;
      this[2] *= -1;
      return this;
    }
    /**
     * Inverts the components of `this`.
     * Equivalent to `Vec3.inverse(this, this);`
     *
     * @returns `this`
     */
    invert() {
      this[0] = 1 / this[0];
      this[1] = 1 / this[1];
      this[2] = 1 / this[2];
      return this;
    }
    /**
     * Sets each component of `this` to it's absolute value.
     * Equivalent to `Vec3.abs(this, this);`
     *
     * @returns `this`
     */
    abs() {
      this[0] = Math.abs(this[0]);
      this[1] = Math.abs(this[1]);
      this[2] = Math.abs(this[2]);
      return this;
    }
    /**
     * Calculates the dot product of this and another {@link Vec3}.
     * Equivalent to `Vec3.dot(this, b);`
     *
     * @param b - The second operand
     * @returns Dot product of `this` and `b`
     */
    dot(b) {
      return this[0] * b[0] + this[1] * b[1] + this[2] * b[2];
    }
    /**
     * Normalize `this`.
     * Equivalent to `Vec3.normalize(this, this);`
     *
     * @returns `this`
     */
    normalize() {
      return _Vec3.normalize(this, this);
    }
    //================
    // Static methods
    //================
    /**
     * Creates a new, empty vec3
     * @category Static
     *
     * @returns a new 3D vector
     */
    static create() {
      return new _Vec3();
    }
    /**
     * Creates a new vec3 initialized with values from an existing vector
     * @category Static
     *
     * @param a - vector to clone
     * @returns a new 3D vector
     */
    static clone(a) {
      return new _Vec3(a);
    }
    /**
     * Calculates the magnitude (length) of a {@link Vec3}
     * @category Static
     *
     * @param a - Vector to calculate magnitude of
     * @returns Magnitude of a
     */
    static magnitude(a) {
      let x = a[0];
      let y = a[1];
      let z = a[2];
      return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Alias for {@link Vec3.magnitude}
     * @category Static
     */
    static mag(a) {
      return 0;
    }
    /**
     * Alias for {@link Vec3.magnitude}
     * @category Static
     * @deprecated Use {@link Vec3.magnitude} to avoid conflicts with builtin `length` methods/attribs
     *
     * @param a - vector to calculate length of
     * @returns length of a
     */
    // @ts-ignore: Length conflicts with Function.length
    static length(a) {
      return 0;
    }
    /**
     * Alias for {@link Vec3.magnitude}
     * @category Static
     * @deprecated Use {@link Vec3.mag}
     */
    static len(a) {
      return 0;
    }
    /**
     * Creates a new vec3 initialized with the given values
     * @category Static
     *
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @returns a new 3D vector
     */
    static fromValues(x, y, z) {
      return new _Vec3(x, y, z);
    }
    /**
     * Copy the values from one vec3 to another
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the source vector
     * @returns `out`
     */
    static copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    /**
     * Set the components of a vec3 to the given values
     * @category Static
     *
     * @param out - the receiving vector
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @returns `out`
     */
    static set(out, x, y, z) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    /**
     * Adds two {@link Vec3}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      return out;
    }
    /**
     * Subtracts vector b from vector a
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      return out;
    }
    /**
     * Alias for {@link Vec3.subtract}
     * @category Static
     */
    static sub(out, a, b) {
      return [0, 0, 0];
    }
    /**
     * Multiplies two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      return out;
    }
    /**
     * Alias for {@link Vec3.multiply}
     * @category Static
     */
    static mul(out, a, b) {
      return [0, 0, 0];
    }
    /**
     * Divides two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      return out;
    }
    /**
     * Alias for {@link Vec3.divide}
     * @category Static
     */
    static div(out, a, b) {
      return [0, 0, 0];
    }
    /**
     * Math.ceil the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to ceil
     * @returns `out`
     */
    static ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      return out;
    }
    /**
     * Math.floor the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to floor
     * @returns `out`
     */
    static floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      return out;
    }
    /**
     * Returns the minimum of two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      return out;
    }
    /**
     * Returns the maximum of two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      return out;
    }
    /**
     * symmetric round the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to round
     * @returns `out`
     */
    /*static round(out: Vec3Like, a: Readonly<Vec3Like>): Vec3Like {
      out[0] = glMatrix.round(a[0]);
      out[1] = glMatrix.round(a[1]);
      out[2] = glMatrix.round(a[2]);
      return out;
    }*/
    /**
     * Scales a vec3 by a scalar number
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to scale
     * @param scale - amount to scale the vector by
     * @returns `out`
     */
    static scale(out, a, scale) {
      out[0] = a[0] * scale;
      out[1] = a[1] * scale;
      out[2] = a[2] * scale;
      return out;
    }
    /**
     * Adds two vec3's after scaling the second operand by a scalar value
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b by before adding
     * @returns `out`
     */
    static scaleAndAdd(out, a, b, scale) {
      out[0] = a[0] + b[0] * scale;
      out[1] = a[1] + b[1] * scale;
      out[2] = a[2] + b[2] * scale;
      return out;
    }
    /**
     * Calculates the euclidian distance between two vec3's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns distance between a and b
     */
    static distance(a, b) {
      const x = b[0] - a[0];
      const y = b[1] - a[1];
      const z = b[2] - a[2];
      return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Alias for {@link Vec3.distance}
     */
    static dist(a, b) {
      return 0;
    }
    /**
     * Calculates the squared euclidian distance between two vec3's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns squared distance between a and b
     */
    static squaredDistance(a, b) {
      const x = b[0] - a[0];
      const y = b[1] - a[1];
      const z = b[2] - a[2];
      return x * x + y * y + z * z;
    }
    /**
     * Alias for {@link Vec3.squaredDistance}
     */
    static sqrDist(a, b) {
      return 0;
    }
    /**
     * Calculates the squared length of a vec3
     * @category Static
     *
     * @param a - vector to calculate squared length of
     * @returns squared length of a
     */
    static squaredLength(a) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      return x * x + y * y + z * z;
    }
    /**
     * Alias for {@link Vec3.squaredLength}
     */
    static sqrLen(a, b) {
      return 0;
    }
    /**
     * Negates the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to negate
     * @returns `out`
     */
    static negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      return out;
    }
    /**
     * Returns the inverse of the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to invert
     * @returns `out`
     */
    static inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      return out;
    }
    /**
     * Returns the absolute value of the components of a {@link Vec3}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to compute the absolute values of
     * @returns `out`
     */
    static abs(out, a) {
      out[0] = Math.abs(a[0]);
      out[1] = Math.abs(a[1]);
      out[2] = Math.abs(a[2]);
      return out;
    }
    /**
     * Normalize a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to normalize
     * @returns `out`
     */
    static normalize(out, a) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      let len = x * x + y * y + z * z;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
      }
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
      return out;
    }
    /**
     * Calculates the dot product of two vec3's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns dot product of a and b
     */
    static dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    /**
     * Computes the cross product of two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static cross(out, a, b) {
      const ax = a[0], ay = a[1], az = a[2];
      const bx = b[0], by = b[1], bz = b[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
    }
    /**
     * Performs a linear interpolation between two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static lerp(out, a, b, t) {
      const ax = a[0];
      const ay = a[1];
      const az = a[2];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      return out;
    }
    /**
     * Performs a spherical linear interpolation between two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static slerp(out, a, b, t) {
      const angle = Math.acos(Math.min(Math.max(_Vec3.dot(a, b), -1), 1));
      const sinTotal = Math.sin(angle);
      const ratioA = Math.sin((1 - t) * angle) / sinTotal;
      const ratioB = Math.sin(t * angle) / sinTotal;
      out[0] = ratioA * a[0] + ratioB * b[0];
      out[1] = ratioA * a[1] + ratioB * b[1];
      out[2] = ratioA * a[2] + ratioB * b[2];
      return out;
    }
    /**
     * Performs a hermite interpolation with two control points
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param c - the third operand
     * @param d - the fourth operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static hermite(out, a, b, c, d, t) {
      const factorTimes2 = t * t;
      const factor1 = factorTimes2 * (2 * t - 3) + 1;
      const factor2 = factorTimes2 * (t - 2) + t;
      const factor3 = factorTimes2 * (t - 1);
      const factor4 = factorTimes2 * (3 - 2 * t);
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    /**
     * Performs a bezier interpolation with two control points
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param c - the third operand
     * @param d - the fourth operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static bezier(out, a, b, c, d, t) {
      const inverseFactor = 1 - t;
      const inverseFactorTimesTwo = inverseFactor * inverseFactor;
      const factorTimes2 = t * t;
      const factor1 = inverseFactorTimesTwo * inverseFactor;
      const factor2 = 3 * t * inverseFactorTimesTwo;
      const factor3 = 3 * factorTimes2 * inverseFactor;
      const factor4 = factorTimes2 * t;
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    /**
     * Generates a random vector with the given scale
     * @category Static
     *
     * @param out - the receiving vector
     * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
     * @returns `out`
     */
    /*static random(out: Vec3Like, scale) {
        scale = scale === undefined ? 1.0 : scale;
    
        let r = glMatrix.RANDOM() * 2.0 * Math.PI;
        let z = glMatrix.RANDOM() * 2.0 - 1.0;
        let zScale = Math.sqrt(1.0 - z * z) * scale;
    
        out[0] = Math.cos(r) * zScale;
        out[1] = Math.sin(r) * zScale;
        out[2] = z * scale;
        return out;
      }*/
    /**
     * Transforms the vec3 with a mat4.
     * 4th vector component is implicitly '1'
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param m - matrix to transform with
     * @returns `out`
     */
    static transformMat4(out, a, m) {
      const x = a[0], y = a[1], z = a[2];
      const w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
      out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
      out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
      out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
      return out;
    }
    /**
     * Transforms the vec3 with a mat3.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param m - the 3x3 matrix to transform with
     * @returns `out`
     */
    static transformMat3(out, a, m) {
      let x = a[0], y = a[1], z = a[2];
      out[0] = x * m[0] + y * m[3] + z * m[6];
      out[1] = x * m[1] + y * m[4] + z * m[7];
      out[2] = x * m[2] + y * m[5] + z * m[8];
      return out;
    }
    /**
     * Transforms the vec3 with a quat
     * Can also be used for dual quaternions. (Multiply it with the real part)
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param q - quaternion to transform with
     * @returns `out`
     */
    static transformQuat(out, a, q) {
      const qx = q[0];
      const qy = q[1];
      const qz = q[2];
      const w2 = q[3] * 2;
      const x = a[0];
      const y = a[1];
      const z = a[2];
      const uvx = qy * z - qz * y;
      const uvy = qz * x - qx * z;
      const uvz = qx * y - qy * x;
      const uuvx = (qy * uvz - qz * uvy) * 2;
      const uuvy = (qz * uvx - qx * uvz) * 2;
      const uuvz = (qx * uvy - qy * uvx) * 2;
      out[0] = x + uvx * w2 + uuvx;
      out[1] = y + uvy * w2 + uuvy;
      out[2] = z + uvz * w2 + uuvz;
      return out;
    }
    /**
     * Rotate a 3D vector around the x-axis
     * @param out - The receiving vec3
     * @param a - The vec3 point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotateX(out, a, b, rad) {
      const by = b[1];
      const bz = b[2];
      const py = a[1] - by;
      const pz = a[2] - bz;
      out[0] = a[0];
      out[1] = py * Math.cos(rad) - pz * Math.sin(rad) + by;
      out[2] = py * Math.sin(rad) + pz * Math.cos(rad) + bz;
      return out;
    }
    /**
     * Rotate a 3D vector around the y-axis
     * @param out - The receiving vec3
     * @param a - The vec3 point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotateY(out, a, b, rad) {
      const bx = b[0];
      const bz = b[2];
      const px = a[0] - bx;
      const pz = a[2] - bz;
      out[0] = pz * Math.sin(rad) + px * Math.cos(rad) + bx;
      out[1] = a[1];
      out[2] = pz * Math.cos(rad) - px * Math.sin(rad) + bz;
      return out;
    }
    /**
     * Rotate a 3D vector around the z-axis
     * @param out - The receiving vec3
     * @param a - The vec3 point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotateZ(out, a, b, rad) {
      const bx = b[0];
      const by = b[1];
      const px = a[0] - bx;
      const py = a[1] - by;
      out[0] = px * Math.cos(rad) - py * Math.sin(rad) + bx;
      out[1] = px * Math.sin(rad) + py * Math.cos(rad) + by;
      out[2] = b[2];
      return out;
    }
    /**
     * Get the angle between two 3D vectors
     * @param a - The first operand
     * @param b - The second operand
     * @returns The angle in radians
     */
    static angle(a, b) {
      const ax = a[0];
      const ay = a[1];
      const az = a[2];
      const bx = b[0];
      const by = b[1];
      const bz = b[2];
      const mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz));
      const cosine = mag && _Vec3.dot(a, b) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    /**
     * Set the components of a vec3 to zero
     * @category Static
     *
     * @param out - the receiving vector
     * @returns `out`
     */
    static zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      return out;
    }
    /**
     * Returns a string representation of a vector
     * @category Static
     *
     * @param a - vector to represent as a string
     * @returns string representation of the vector
     */
    static str(a) {
      return `Vec3(${a.join(", ")})`;
    }
    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static equals(a, b) {
      const a0 = a[0];
      const a1 = a[1];
      const a2 = a[2];
      const b0 = b[0];
      const b1 = b[1];
      const b2 = b[2];
      return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
    }
  };
  Vec3.prototype.sub = Vec3.prototype.subtract;
  Vec3.prototype.mul = Vec3.prototype.multiply;
  Vec3.prototype.div = Vec3.prototype.divide;
  Vec3.prototype.dist = Vec3.prototype.distance;
  Vec3.prototype.sqrDist = Vec3.prototype.squaredDistance;
  Vec3.sub = Vec3.subtract;
  Vec3.mul = Vec3.multiply;
  Vec3.div = Vec3.divide;
  Vec3.dist = Vec3.distance;
  Vec3.sqrDist = Vec3.squaredDistance;
  Vec3.sqrLen = Vec3.squaredLength;
  Vec3.mag = Vec3.magnitude;
  Vec3.length = Vec3.magnitude;
  Vec3.len = Vec3.magnitude;

  // ../amll/node_modules/gl-matrix/dist/esm/vec4.js
  var Vec4 = class _Vec4 extends Float32Array {
    /**
     * The number of bytes in a {@link Vec4}.
     */
    static BYTE_LENGTH = 4 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Vec4}.
     */
    constructor(...values) {
      switch (values.length) {
        case 4:
          super(values);
          break;
        case 2:
          super(values[0], values[1], 4);
          break;
        case 1: {
          const v = values[0];
          if (typeof v === "number") {
            super([v, v, v, v]);
          } else {
            super(v, 0, 4);
          }
          break;
        }
        default:
          super(4);
          break;
      }
    }
    //============
    // Attributes
    //============
    // Getters and setters to make component access read better.
    // These are likely to be a little bit slower than direct array access.
    /**
     * The x component of the vector. Equivalent to `this[0];`
     * @category Vector components
     */
    get x() {
      return this[0];
    }
    set x(value) {
      this[0] = value;
    }
    /**
     * The y component of the vector. Equivalent to `this[1];`
     * @category Vector components
     */
    get y() {
      return this[1];
    }
    set y(value) {
      this[1] = value;
    }
    /**
     * The z component of the vector. Equivalent to `this[2];`
     * @category Vector components
     */
    get z() {
      return this[2];
    }
    set z(value) {
      this[2] = value;
    }
    /**
     * The w component of the vector. Equivalent to `this[3];`
     * @category Vector components
     */
    get w() {
      return this[3];
    }
    set w(value) {
      this[3] = value;
    }
    // Alternate set of getters and setters in case this is being used to define
    // a color.
    /**
     * The r component of the vector. Equivalent to `this[0];`
     * @category Color components
     */
    get r() {
      return this[0];
    }
    set r(value) {
      this[0] = value;
    }
    /**
     * The g component of the vector. Equivalent to `this[1];`
     * @category Color components
     */
    get g() {
      return this[1];
    }
    set g(value) {
      this[1] = value;
    }
    /**
     * The b component of the vector. Equivalent to `this[2];`
     * @category Color components
     */
    get b() {
      return this[2];
    }
    set b(value) {
      this[2] = value;
    }
    /**
     * The a component of the vector. Equivalent to `this[3];`
     * @category Color components
     */
    get a() {
      return this[3];
    }
    set a(value) {
      this[3] = value;
    }
    /**
     * The magnitude (length) of this.
     * Equivalent to `Vec4.magnitude(this);`
     *
     * Magnitude is used because the `length` attribute is already defined by
     * TypedArrays to mean the number of elements in the array.
     */
    get magnitude() {
      const x = this[0];
      const y = this[1];
      const z = this[2];
      const w = this[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Alias for {@link Vec4.magnitude}
     */
    get mag() {
      return this.magnitude;
    }
    /**
     * A string representation of `this`
     * Equivalent to `Vec4.str(this);`
     */
    get str() {
      return _Vec4.str(this);
    }
    //===================
    // Instances methods
    //===================
    /**
     * Copy the values from another {@link Vec4} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
      super.set(a);
      return this;
    }
    /**
     * Adds a {@link Vec4} to `this`.
     * Equivalent to `Vec4.add(this, this, b);`
     *
     * @param b - The vector to add to `this`
     * @returns `this`
     */
    add(b) {
      this[0] += b[0];
      this[1] += b[1];
      this[2] += b[2];
      this[3] += b[3];
      return this;
    }
    /**
     * Subtracts a {@link Vec4} from `this`.
     * Equivalent to `Vec4.subtract(this, this, b);`
     *
     * @param b - The vector to subtract from `this`
     * @returns `this`
     */
    subtract(b) {
      this[0] -= b[0];
      this[1] -= b[1];
      this[2] -= b[2];
      this[3] -= b[3];
      return this;
    }
    /**
     * Alias for {@link Vec4.subtract}
     */
    sub(b) {
      return this;
    }
    /**
     * Multiplies `this` by a {@link Vec4}.
     * Equivalent to `Vec4.multiply(this, this, b);`
     *
     * @param b - The vector to multiply `this` by
     * @returns `this`
     */
    multiply(b) {
      this[0] *= b[0];
      this[1] *= b[1];
      this[2] *= b[2];
      this[3] *= b[3];
      return this;
    }
    /**
     * Alias for {@link Vec4.multiply}
     */
    mul(b) {
      return this;
    }
    /**
     * Divides `this` by a {@link Vec4}.
     * Equivalent to `Vec4.divide(this, this, b);`
     *
     * @param b - The vector to divide `this` by
     * @returns `this`
     */
    divide(b) {
      this[0] /= b[0];
      this[1] /= b[1];
      this[2] /= b[2];
      this[3] /= b[3];
      return this;
    }
    /**
     * Alias for {@link Vec4.divide}
     */
    div(b) {
      return this;
    }
    /**
     * Scales `this` by a scalar number.
     * Equivalent to `Vec4.scale(this, this, b);`
     *
     * @param b - Amount to scale `this` by
     * @returns `this`
     */
    scale(b) {
      this[0] *= b;
      this[1] *= b;
      this[2] *= b;
      this[3] *= b;
      return this;
    }
    /**
     * Calculates `this` scaled by a scalar value then adds the result to `this`.
     * Equivalent to `Vec4.scaleAndAdd(this, this, b, scale);`
     *
     * @param b - The vector to add to `this`
     * @param scale - The amount to scale `b` by before adding
     * @returns `this`
     */
    scaleAndAdd(b, scale) {
      this[0] += b[0] * scale;
      this[1] += b[1] * scale;
      this[2] += b[2] * scale;
      this[3] += b[3] * scale;
      return this;
    }
    /**
     * Calculates the euclidian distance between another {@link Vec4} and `this`.
     * Equivalent to `Vec4.distance(this, b);`
     *
     * @param b - The vector to calculate the distance to
     * @returns Distance between `this` and `b`
     */
    distance(b) {
      return _Vec4.distance(this, b);
    }
    /**
     * Alias for {@link Vec4.distance}
     */
    dist(b) {
      return 0;
    }
    /**
     * Calculates the squared euclidian distance between another {@link Vec4} and `this`.
     * Equivalent to `Vec4.squaredDistance(this, b);`
     *
     * @param b The vector to calculate the squared distance to
     * @returns Squared distance between `this` and `b`
     */
    squaredDistance(b) {
      return _Vec4.squaredDistance(this, b);
    }
    /**
     * Alias for {@link Vec4.squaredDistance}
     */
    sqrDist(b) {
      return 0;
    }
    /**
     * Negates the components of `this`.
     * Equivalent to `Vec4.negate(this, this);`
     *
     * @returns `this`
     */
    negate() {
      this[0] *= -1;
      this[1] *= -1;
      this[2] *= -1;
      this[3] *= -1;
      return this;
    }
    /**
     * Inverts the components of `this`.
     * Equivalent to `Vec4.inverse(this, this);`
     *
     * @returns `this`
     */
    invert() {
      this[0] = 1 / this[0];
      this[1] = 1 / this[1];
      this[2] = 1 / this[2];
      this[3] = 1 / this[3];
      return this;
    }
    /**
     * Sets each component of `this` to it's absolute value.
     * Equivalent to `Vec4.abs(this, this);`
     *
     * @returns `this`
     */
    abs() {
      this[0] = Math.abs(this[0]);
      this[1] = Math.abs(this[1]);
      this[2] = Math.abs(this[2]);
      this[3] = Math.abs(this[3]);
      return this;
    }
    /**
     * Calculates the dot product of this and another {@link Vec4}.
     * Equivalent to `Vec4.dot(this, b);`
     *
     * @param b - The second operand
     * @returns Dot product of `this` and `b`
     */
    dot(b) {
      return this[0] * b[0] + this[1] * b[1] + this[2] * b[2] + this[3] * b[3];
    }
    /**
     * Normalize `this`.
     * Equivalent to `Vec4.normalize(this, this);`
     *
     * @returns `this`
     */
    normalize() {
      return _Vec4.normalize(this, this);
    }
    //===================
    // Static methods
    //===================
    /**
     * Creates a new, empty {@link Vec4}
     * @category Static
     *
     * @returns a new 4D vector
     */
    static create() {
      return new _Vec4();
    }
    /**
     * Creates a new {@link Vec4} initialized with values from an existing vector
     * @category Static
     *
     * @param a - vector to clone
     * @returns a new 4D vector
     */
    static clone(a) {
      return new _Vec4(a);
    }
    /**
     * Creates a new {@link Vec4} initialized with the given values
     * @category Static
     *
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @param w - W component
     * @returns a new 4D vector
     */
    static fromValues(x, y, z, w) {
      return new _Vec4(x, y, z, w);
    }
    /**
     * Copy the values from one {@link Vec4} to another
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the source vector
     * @returns `out`
     */
    static copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    /**
     * Set the components of a {@link Vec4} to the given values
     * @category Static
     *
     * @param out - the receiving vector
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @param w - W component
     * @returns `out`
     */
    static set(out, x, y, z, w) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    /**
     * Adds two {@link Vec4}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    /**
     * Subtracts vector b from vector a
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    /**
     * Alias for {@link Vec4.subtract}
     * @category Static
     */
    static sub(out, a, b) {
      return out;
    }
    /**
     * Multiplies two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      out[3] = a[3] * b[3];
      return out;
    }
    /**
     * Alias for {@link Vec4.multiply}
     * @category Static
     */
    static mul(out, a, b) {
      return out;
    }
    /**
     * Divides two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      out[3] = a[3] / b[3];
      return out;
    }
    /**
     * Alias for {@link Vec4.divide}
     * @category Static
     */
    static div(out, a, b) {
      return out;
    }
    /**
     * Math.ceil the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to ceil
     * @returns `out`
     */
    static ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      out[3] = Math.ceil(a[3]);
      return out;
    }
    /**
     * Math.floor the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to floor
     * @returns `out`
     */
    static floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      out[3] = Math.floor(a[3]);
      return out;
    }
    /**
     * Returns the minimum of two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      out[3] = Math.min(a[3], b[3]);
      return out;
    }
    /**
     * Returns the maximum of two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      out[3] = Math.max(a[3], b[3]);
      return out;
    }
    /**
     * Math.round the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to round
     * @returns `out`
     */
    static round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      out[2] = Math.round(a[2]);
      out[3] = Math.round(a[3]);
      return out;
    }
    /**
     * Scales a {@link Vec4} by a scalar number
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to scale
     * @param scale - amount to scale the vector by
     * @returns `out`
     */
    static scale(out, a, scale) {
      out[0] = a[0] * scale;
      out[1] = a[1] * scale;
      out[2] = a[2] * scale;
      out[3] = a[3] * scale;
      return out;
    }
    /**
     * Adds two {@link Vec4}'s after scaling the second operand by a scalar value
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b by before adding
     * @returns `out`
     */
    static scaleAndAdd(out, a, b, scale) {
      out[0] = a[0] + b[0] * scale;
      out[1] = a[1] + b[1] * scale;
      out[2] = a[2] + b[2] * scale;
      out[3] = a[3] + b[3] * scale;
      return out;
    }
    /**
     * Calculates the euclidian distance between two {@link Vec4}'s
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns distance between a and b
     */
    static distance(a, b) {
      const x = b[0] - a[0];
      const y = b[1] - a[1];
      const z = b[2] - a[2];
      const w = b[3] - a[3];
      return Math.hypot(x, y, z, w);
    }
    /**
     * Alias for {@link Vec4.distance}
     * @category Static
     */
    static dist(a, b) {
      return 0;
    }
    /**
     * Calculates the squared euclidian distance between two {@link Vec4}'s
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns squared distance between a and b
     */
    static squaredDistance(a, b) {
      const x = b[0] - a[0];
      const y = b[1] - a[1];
      const z = b[2] - a[2];
      const w = b[3] - a[3];
      return x * x + y * y + z * z + w * w;
    }
    /**
     * Alias for {@link Vec4.squaredDistance}
     * @category Static
     */
    static sqrDist(a, b) {
      return 0;
    }
    /**
     * Calculates the magnitude (length) of a {@link Vec4}
     * @category Static
     *
     * @param a - vector to calculate length of
     * @returns length of `a`
     */
    static magnitude(a) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      const w = a[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Alias for {@link Vec4.magnitude}
     * @category Static
     */
    static mag(a) {
      return 0;
    }
    /**
     * Alias for {@link Vec4.magnitude}
     * @category Static
     * @deprecated Use {@link Vec4.magnitude} to avoid conflicts with builtin `length` methods/attribs
     */
    // @ts-ignore: Length conflicts with Function.length
    static length(a) {
      return 0;
    }
    /**
     * Alias for {@link Vec4.magnitude}
     * @category Static
     * @deprecated Use {@link Vec4.mag}
     */
    static len(a) {
      return 0;
    }
    /**
     * Calculates the squared length of a {@link Vec4}
     * @category Static
     *
     * @param a - vector to calculate squared length of
     * @returns squared length of a
     */
    static squaredLength(a) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      const w = a[3];
      return x * x + y * y + z * z + w * w;
    }
    /**
     * Alias for {@link Vec4.squaredLength}
     * @category Static
     */
    static sqrLen(a) {
      return 0;
    }
    /**
     * Negates the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to negate
     * @returns `out`
     */
    static negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = -a[3];
      return out;
    }
    /**
     * Returns the inverse of the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to invert
     * @returns `out`
     */
    static inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      out[3] = 1 / a[3];
      return out;
    }
    /**
     * Returns the absolute value of the components of a {@link Vec4}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to compute the absolute values of
     * @returns `out`
     */
    static abs(out, a) {
      out[0] = Math.abs(a[0]);
      out[1] = Math.abs(a[1]);
      out[2] = Math.abs(a[2]);
      out[3] = Math.abs(a[3]);
      return out;
    }
    /**
     * Normalize a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to normalize
     * @returns `out`
     */
    static normalize(out, a) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      const w = a[3];
      let len = x * x + y * y + z * z + w * w;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
      }
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
      return out;
    }
    /**
     * Calculates the dot product of two {@link Vec4}'s
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns dot product of a and b
     */
    static dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    /**
     * Returns the cross-product of three vectors in a 4-dimensional space
     * @category Static
     *
     * @param out the receiving vector
     * @param u - the first vector
     * @param v - the second vector
     * @param w - the third vector
     * @returns result
     */
    static cross(out, u, v, w) {
      const a = v[0] * w[1] - v[1] * w[0];
      const b = v[0] * w[2] - v[2] * w[0];
      const c = v[0] * w[3] - v[3] * w[0];
      const d = v[1] * w[2] - v[2] * w[1];
      const e = v[1] * w[3] - v[3] * w[1];
      const f = v[2] * w[3] - v[3] * w[2];
      const g = u[0];
      const h = u[1];
      const i = u[2];
      const j = u[3];
      out[0] = h * f - i * e + j * d;
      out[1] = -(g * f) + i * c - j * b;
      out[2] = g * e - h * c + j * a;
      out[3] = -(g * d) + h * b - i * a;
      return out;
    }
    /**
     * Performs a linear interpolation between two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static lerp(out, a, b, t) {
      const ax = a[0];
      const ay = a[1];
      const az = a[2];
      const aw = a[3];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      out[3] = aw + t * (b[3] - aw);
      return out;
    }
    /**
     * Generates a random vector with the given scale
     * @category Static
     *
     * @param out - the receiving vector
     * @param [scale] - Length of the resulting vector. If ommitted, a unit vector will be returned
     * @returns `out`
     */
    /*static random(out: Vec4Like, scale): Vec4Like {
        scale = scale || 1.0;
    
        // Marsaglia, George. Choosing a Point from the Surface of a
        // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
        // http://projecteuclid.org/euclid.aoms/1177692644;
        var v1, v2, v3, v4;
        var s1, s2;
        do {
          v1 = glMatrix.RANDOM() * 2 - 1;
          v2 = glMatrix.RANDOM() * 2 - 1;
          s1 = v1 * v1 + v2 * v2;
        } while (s1 >= 1);
        do {
          v3 = glMatrix.RANDOM() * 2 - 1;
          v4 = glMatrix.RANDOM() * 2 - 1;
          s2 = v3 * v3 + v4 * v4;
        } while (s2 >= 1);
    
        var d = Math.sqrt((1 - s1) / s2);
        out[0] = scale * v1;
        out[1] = scale * v2;
        out[2] = scale * v3 * d;
        out[3] = scale * v4 * d;
        return out;
      }*/
    /**
     * Transforms the {@link Vec4} with a {@link Mat4}.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param m - matrix to transform with
     * @returns `out`
     */
    static transformMat4(out, a, m) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      const w = a[3];
      out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
      out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
      out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
      out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
      return out;
    }
    /**
     * Transforms the {@link Vec4} with a {@link Quat}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param q - quaternion to transform with
     * @returns `out`
     */
    static transformQuat(out, a, q) {
      const x = a[0];
      const y = a[1];
      const z = a[2];
      const qx = q[0];
      const qy = q[1];
      const qz = q[2];
      const qw = q[3];
      const ix = qw * x + qy * z - qz * y;
      const iy = qw * y + qz * x - qx * z;
      const iz = qw * z + qx * y - qy * x;
      const iw = -qx * x - qy * y - qz * z;
      out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      out[3] = a[3];
      return out;
    }
    /**
     * Set the components of a {@link Vec4} to zero
     * @category Static
     *
     * @param out - the receiving vector
     * @returns `out`
     */
    static zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      return out;
    }
    /**
     * Returns a string representation of a {@link Vec4}
     * @category Static
     *
     * @param a - vector to represent as a string
     * @returns string representation of the vector
     */
    static str(a) {
      return `Vec4(${a.join(", ")})`;
    }
    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static equals(a, b) {
      const a0 = a[0];
      const a1 = a[1];
      const a2 = a[2];
      const a3 = a[3];
      const b0 = b[0];
      const b1 = b[1];
      const b2 = b[2];
      const b3 = b[3];
      return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
  };
  Vec4.prototype.sub = Vec4.prototype.subtract;
  Vec4.prototype.mul = Vec4.prototype.multiply;
  Vec4.prototype.div = Vec4.prototype.divide;
  Vec4.prototype.dist = Vec4.prototype.distance;
  Vec4.prototype.sqrDist = Vec4.prototype.squaredDistance;
  Vec4.sub = Vec4.subtract;
  Vec4.mul = Vec4.multiply;
  Vec4.div = Vec4.divide;
  Vec4.dist = Vec4.distance;
  Vec4.sqrDist = Vec4.squaredDistance;
  Vec4.sqrLen = Vec4.squaredLength;
  Vec4.mag = Vec4.magnitude;
  Vec4.length = Vec4.magnitude;
  Vec4.len = Vec4.magnitude;

  // ../amll/node_modules/gl-matrix/dist/esm/vec2.js
  var Vec2 = class _Vec2 extends Float32Array {
    /**
     * The number of bytes in a {@link Vec2}.
     */
    static BYTE_LENGTH = 2 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Vec2}.
     */
    constructor(...values) {
      switch (values.length) {
        case 2: {
          const v = values[0];
          if (typeof v === "number") {
            super([v, values[1]]);
          } else {
            super(v, values[1], 2);
          }
          break;
        }
        case 1: {
          const v = values[0];
          if (typeof v === "number") {
            super([v, v]);
          } else {
            super(v, 0, 2);
          }
          break;
        }
        default:
          super(2);
          break;
      }
    }
    //============
    // Attributes
    //============
    // Getters and setters to make component access read better.
    // These are likely to be a little bit slower than direct array access.
    /**
     * The x component of the vector. Equivalent to `this[0];`
     * @category Vector components
     */
    get x() {
      return this[0];
    }
    set x(value) {
      this[0] = value;
    }
    /**
     * The y component of the vector. Equivalent to `this[1];`
     * @category Vector components
     */
    get y() {
      return this[1];
    }
    set y(value) {
      this[1] = value;
    }
    // Alternate set of getters and setters in case this is being used to define
    // a color.
    /**
     * The r component of the vector. Equivalent to `this[0];`
     * @category Color components
     */
    get r() {
      return this[0];
    }
    set r(value) {
      this[0] = value;
    }
    /**
     * The g component of the vector. Equivalent to `this[1];`
     * @category Color components
     */
    get g() {
      return this[1];
    }
    set g(value) {
      this[1] = value;
    }
    /**
     * The magnitude (length) of this.
     * Equivalent to `Vec2.magnitude(this);`
     *
     * Magnitude is used because the `length` attribute is already defined by
     * TypedArrays to mean the number of elements in the array.
     */
    get magnitude() {
      return Math.hypot(this[0], this[1]);
    }
    /**
     * Alias for {@link Vec2.magnitude}
     */
    get mag() {
      return this.magnitude;
    }
    /**
     * The squared magnitude (length) of `this`.
     * Equivalent to `Vec2.squaredMagnitude(this);`
     */
    get squaredMagnitude() {
      const x = this[0];
      const y = this[1];
      return x * x + y * y;
    }
    /**
     * Alias for {@link Vec2.squaredMagnitude}
     */
    get sqrMag() {
      return this.squaredMagnitude;
    }
    /**
     * A string representation of `this`
     * Equivalent to `Vec2.str(this);`
     */
    get str() {
      return _Vec2.str(this);
    }
    //===================
    // Instances methods
    //===================
    /**
     * Copy the values from another {@link Vec2} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
      this.set(a);
      return this;
    }
    // Instead of zero(), use a.fill(0) for instances;
    /**
     * Adds a {@link Vec2} to `this`.
     * Equivalent to `Vec2.add(this, this, b);`
     *
     * @param b - The vector to add to `this`
     * @returns `this`
     */
    add(b) {
      this[0] += b[0];
      this[1] += b[1];
      return this;
    }
    /**
     * Subtracts a {@link Vec2} from `this`.
     * Equivalent to `Vec2.subtract(this, this, b);`
     *
     * @param b - The vector to subtract from `this`
     * @returns `this`
     */
    subtract(b) {
      this[0] -= b[0];
      this[1] -= b[1];
      return this;
    }
    /**
     * Alias for {@link Vec2.subtract}
     */
    sub(b) {
      return this;
    }
    /**
     * Multiplies `this` by a {@link Vec2}.
     * Equivalent to `Vec2.multiply(this, this, b);`
     *
     * @param b - The vector to multiply `this` by
     * @returns `this`
     */
    multiply(b) {
      this[0] *= b[0];
      this[1] *= b[1];
      return this;
    }
    /**
     * Alias for {@link Vec2.multiply}
     */
    mul(b) {
      return this;
    }
    /**
     * Divides `this` by a {@link Vec2}.
     * Equivalent to `Vec2.divide(this, this, b);`
     *
     * @param b - The vector to divide `this` by
     * @returns {Vec2} `this`
     */
    divide(b) {
      this[0] /= b[0];
      this[1] /= b[1];
      return this;
    }
    /**
     * Alias for {@link Vec2.divide}
     */
    div(b) {
      return this;
    }
    /**
     * Scales `this` by a scalar number.
     * Equivalent to `Vec2.scale(this, this, b);`
     *
     * @param b - Amount to scale `this` by
     * @returns `this`
     */
    scale(b) {
      this[0] *= b;
      this[1] *= b;
      return this;
    }
    /**
     * Calculates `this` scaled by a scalar value then adds the result to `this`.
     * Equivalent to `Vec2.scaleAndAdd(this, this, b, scale);`
     *
     * @param b - The vector to add to `this`
     * @param scale - The amount to scale `b` by before adding
     * @returns `this`
     */
    scaleAndAdd(b, scale) {
      this[0] += b[0] * scale;
      this[1] += b[1] * scale;
      return this;
    }
    /**
     * Calculates the euclidian distance between another {@link Vec2} and `this`.
     * Equivalent to `Vec2.distance(this, b);`
     *
     * @param b - The vector to calculate the distance to
     * @returns Distance between `this` and `b`
     */
    distance(b) {
      return _Vec2.distance(this, b);
    }
    /**
     * Alias for {@link Vec2.distance}
     */
    dist(b) {
      return 0;
    }
    /**
     * Calculates the squared euclidian distance between another {@link Vec2} and `this`.
     * Equivalent to `Vec2.squaredDistance(this, b);`
     *
     * @param b The vector to calculate the squared distance to
     * @returns Squared distance between `this` and `b`
     */
    squaredDistance(b) {
      return _Vec2.squaredDistance(this, b);
    }
    /**
     * Alias for {@link Vec2.squaredDistance}
     */
    sqrDist(b) {
      return 0;
    }
    /**
     * Negates the components of `this`.
     * Equivalent to `Vec2.negate(this, this);`
     *
     * @returns `this`
     */
    negate() {
      this[0] *= -1;
      this[1] *= -1;
      return this;
    }
    /**
     * Inverts the components of `this`.
     * Equivalent to `Vec2.inverse(this, this);`
     *
     * @returns `this`
     */
    invert() {
      this[0] = 1 / this[0];
      this[1] = 1 / this[1];
      return this;
    }
    /**
     * Sets each component of `this` to it's absolute value.
     * Equivalent to `Vec2.abs(this, this);`
     *
     * @returns `this`
     */
    abs() {
      this[0] = Math.abs(this[0]);
      this[1] = Math.abs(this[1]);
      return this;
    }
    /**
     * Calculates the dot product of this and another {@link Vec2}.
     * Equivalent to `Vec2.dot(this, b);`
     *
     * @param b - The second operand
     * @returns Dot product of `this` and `b`
     */
    dot(b) {
      return this[0] * b[0] + this[1] * b[1];
    }
    /**
     * Normalize `this`.
     * Equivalent to `Vec2.normalize(this, this);`
     *
     * @returns `this`
     */
    normalize() {
      return _Vec2.normalize(this, this);
    }
    //================
    // Static methods
    //================
    /**
     * Creates a new, empty {@link Vec2}
     * @category Static
     *
     * @returns A new 2D vector
     */
    static create() {
      return new _Vec2();
    }
    /**
     * Creates a new {@link Vec2} initialized with values from an existing vector
     * @category Static
     *
     * @param a - Vector to clone
     * @returns A new 2D vector
     */
    static clone(a) {
      return new _Vec2(a);
    }
    /**
     * Creates a new {@link Vec2} initialized with the given values
     * @category Static
     *
     * @param x - X component
     * @param y - Y component
     * @returns A new 2D vector
     */
    static fromValues(x, y) {
      return new _Vec2(x, y);
    }
    /**
     * Copy the values from one {@link Vec2} to another
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - The source vector
     * @returns `out`
     */
    static copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    /**
     * Set the components of a {@link Vec2} to the given values
     * @category Static
     *
     * @param out - The receiving vector
     * @param x - X component
     * @param y - Y component
     * @returns `out`
     */
    static set(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    }
    /**
     * Adds two {@link Vec2}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      return out;
    }
    /**
     * Subtracts vector b from vector a
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      return out;
    }
    /**
     * Alias for {@link Vec2.subtract}
     * @category Static
     */
    static sub(out, a, b) {
      return [0, 0];
    }
    /**
     * Multiplies two {@link Vec2}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      return out;
    }
    /**
     * Alias for {@link Vec2.multiply}
     * @category Static
     */
    static mul(out, a, b) {
      return [0, 0];
    }
    /**
     * Divides two {@link Vec2}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      return out;
    }
    /**
     * Alias for {@link Vec2.divide}
     * @category Static
     */
    static div(out, a, b) {
      return [0, 0];
    }
    /**
     * Math.ceil the components of a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to ceil
     * @returns `out`
     */
    static ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      return out;
    }
    /**
     * Math.floor the components of a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to floor
     * @returns `out`
     */
    static floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      return out;
    }
    /**
     * Returns the minimum of two {@link Vec2}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      return out;
    }
    /**
     * Returns the maximum of two {@link Vec2}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      return out;
    }
    /**
     * Math.round the components of a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to round
     * @returns `out`
     */
    static round(out, a) {
      out[0] = Math.round(a[0]);
      out[1] = Math.round(a[1]);
      return out;
    }
    /**
     * Scales a {@link Vec2} by a scalar number
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The vector to scale
     * @param b - Amount to scale the vector by
     * @returns `out`
     */
    static scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      return out;
    }
    /**
     * Adds two Vec2's after scaling the second operand by a scalar value
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @param scale - The amount to scale b by before adding
     * @returns `out`
     */
    static scaleAndAdd(out, a, b, scale) {
      out[0] = a[0] + b[0] * scale;
      out[1] = a[1] + b[1] * scale;
      return out;
    }
    /**
     * Calculates the euclidian distance between two {@link Vec2}s
     * @category Static
     *
     * @param a - The first operand
     * @param b - The second operand
     * @returns distance between `a` and `b`
     */
    static distance(a, b) {
      return Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    /**
     * Alias for {@link Vec2.distance}
     * @category Static
     */
    static dist(a, b) {
      return 0;
    }
    /**
     * Calculates the squared euclidian distance between two {@link Vec2}s
     * @category Static
     *
     * @param a - The first operand
     * @param b - The second operand
     * @returns Squared distance between `a` and `b`
     */
    static squaredDistance(a, b) {
      const x = b[0] - a[0];
      const y = b[1] - a[1];
      return x * x + y * y;
    }
    /**
     * Alias for {@link Vec2.distance}
     * @category Static
     */
    static sqrDist(a, b) {
      return 0;
    }
    /**
     * Calculates the magnitude (length) of a {@link Vec2}
     * @category Static
     *
     * @param a - Vector to calculate magnitude of
     * @returns Magnitude of a
     */
    static magnitude(a) {
      let x = a[0];
      let y = a[1];
      return Math.sqrt(x * x + y * y);
    }
    /**
     * Alias for {@link Vec2.magnitude}
     * @category Static
     */
    static mag(a) {
      return 0;
    }
    /**
     * Alias for {@link Vec2.magnitude}
     * @category Static
     * @deprecated Use {@link Vec2.magnitude} to avoid conflicts with builtin `length` methods/attribs
     *
     * @param a - vector to calculate length of
     * @returns length of a
     */
    // @ts-ignore: Length conflicts with Function.length
    static length(a) {
      return 0;
    }
    /**
     * Alias for {@link Vec2.magnitude}
     * @category Static
     * @deprecated Use {@link Vec2.mag}
     */
    static len(a) {
      return 0;
    }
    /**
     * Calculates the squared length of a {@link Vec2}
     * @category Static
     *
     * @param a - Vector to calculate squared length of
     * @returns Squared length of a
     */
    static squaredLength(a) {
      const x = a[0];
      const y = a[1];
      return x * x + y * y;
    }
    /**
     * Alias for {@link Vec2.squaredLength}
     */
    static sqrLen(a, b) {
      return 0;
    }
    /**
     * Negates the components of a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to negate
     * @returns `out`
     */
    static negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      return out;
    }
    /**
     * Returns the inverse of the components of a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to invert
     * @returns `out`
     */
    static inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      return out;
    }
    /**
     * Returns the absolute value of the components of a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to compute the absolute values of
     * @returns `out`
     */
    static abs(out, a) {
      out[0] = Math.abs(a[0]);
      out[1] = Math.abs(a[1]);
      return out;
    }
    /**
     * Normalize a {@link Vec2}
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - Vector to normalize
     * @returns `out`
     */
    static normalize(out, a) {
      const x = a[0];
      const y = a[1];
      let len = x * x + y * y;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
      }
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      return out;
    }
    /**
     * Calculates the dot product of two {@link Vec2}s
     * @category Static
     *
     * @param a - The first operand
     * @param b - The second operand
     * @returns Dot product of `a` and `b`
     */
    static dot(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }
    /**
     * Computes the cross product of two {@link Vec2}s
     * Note that the cross product must by definition produce a 3D vector.
     * For this reason there is also not instance equivalent for this function.
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static cross(out, a, b) {
      const z = a[0] * b[1] - a[1] * b[0];
      out[0] = out[1] = 0;
      out[2] = z;
      return out;
    }
    /**
     * Performs a linear interpolation between two {@link Vec2}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @param t - Interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static lerp(out, a, b, t) {
      const ax = a[0];
      const ay = a[1];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      return out;
    }
    /**
     * Transforms the {@link Vec2} with a {@link Mat2}
     *
     * @param out - The receiving vector
     * @param a - The vector to transform
     * @param m - Matrix to transform with
     * @returns `out`
     */
    static transformMat2(out, a, m) {
      const x = a[0];
      const y = a[1];
      out[0] = m[0] * x + m[2] * y;
      out[1] = m[1] * x + m[3] * y;
      return out;
    }
    /**
     * Transforms the {@link Vec2} with a {@link Mat2d}
     *
     * @param out - The receiving vector
     * @param a - The vector to transform
     * @param m - Matrix to transform with
     * @returns `out`
     */
    static transformMat2d(out, a, m) {
      const x = a[0];
      const y = a[1];
      out[0] = m[0] * x + m[2] * y + m[4];
      out[1] = m[1] * x + m[3] * y + m[5];
      return out;
    }
    /**
     * Transforms the {@link Vec2} with a {@link Mat3}
     * 3rd vector component is implicitly '1'
     *
     * @param out - The receiving vector
     * @param a - The vector to transform
     * @param m - Matrix to transform with
     * @returns `out`
     */
    static transformMat3(out, a, m) {
      const x = a[0];
      const y = a[1];
      out[0] = m[0] * x + m[3] * y + m[6];
      out[1] = m[1] * x + m[4] * y + m[7];
      return out;
    }
    /**
     * Transforms the {@link Vec2} with a {@link Mat4}
     * 3rd vector component is implicitly '0'
     * 4th vector component is implicitly '1'
     *
     * @param out - The receiving vector
     * @param a - The vector to transform
     * @param m - Matrix to transform with
     * @returns `out`
     */
    static transformMat4(out, a, m) {
      const x = a[0];
      const y = a[1];
      out[0] = m[0] * x + m[4] * y + m[12];
      out[1] = m[1] * x + m[5] * y + m[13];
      return out;
    }
    /**
     * Rotate a 2D vector
     * @category Static
     *
     * @param out - The receiving {@link Vec2}
     * @param a - The {@link Vec2} point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotate(out, a, b, rad) {
      const p0 = a[0] - b[0];
      const p1 = a[1] - b[1];
      const sinC = Math.sin(rad);
      const cosC = Math.cos(rad);
      out[0] = p0 * cosC - p1 * sinC + b[0];
      out[1] = p0 * sinC + p1 * cosC + b[1];
      return out;
    }
    /**
     * Get the angle between two 2D vectors
     * @category Static
     *
     * @param a - The first operand
     * @param b - The second operand
     * @returns The angle in radians
     */
    static angle(a, b) {
      const x1 = a[0];
      const y1 = a[1];
      const x2 = b[0];
      const y2 = b[1];
      const mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2);
      const cosine = mag && (x1 * x2 + y1 * y2) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    /**
     * Set the components of a {@link Vec2} to zero
     * @category Static
     *
     * @param out - The receiving vector
     * @returns `out`
     */
    static zero(out) {
      out[0] = 0;
      out[1] = 0;
      return out;
    }
    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns `true` if the vectors components are ===, `false` otherwise.
     */
    static exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1];
    }
    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns `true` if the vectors are approximately equal, `false` otherwise.
     */
    static equals(a, b) {
      const a0 = a[0];
      const a1 = a[1];
      const b0 = b[0];
      const b1 = b[1];
      return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
    }
    /**
     * Returns a string representation of a vector
     * @category Static
     *
     * @param a - Vector to represent as a string
     * @returns String representation of the vector
     */
    static str(a) {
      return `Vec2(${a.join(", ")})`;
    }
  };
  Vec2.prototype.sub = Vec2.prototype.subtract;
  Vec2.prototype.mul = Vec2.prototype.multiply;
  Vec2.prototype.div = Vec2.prototype.divide;
  Vec2.prototype.dist = Vec2.prototype.distance;
  Vec2.prototype.sqrDist = Vec2.prototype.squaredDistance;
  Vec2.sub = Vec2.subtract;
  Vec2.mul = Vec2.multiply;
  Vec2.div = Vec2.divide;
  Vec2.dist = Vec2.distance;
  Vec2.sqrDist = Vec2.squaredDistance;
  Vec2.sqrLen = Vec2.squaredLength;
  Vec2.mag = Vec2.magnitude;
  Vec2.length = Vec2.magnitude;
  Vec2.len = Vec2.magnitude;

  // ../amll/node_modules/@ungap/structured-clone/esm/types.js
  var VOID = -1;
  var PRIMITIVE = 0;
  var ARRAY = 1;
  var OBJECT = 2;
  var DATE = 3;
  var REGEXP = 4;
  var MAP = 5;
  var SET = 6;
  var ERROR = 7;
  var BIGINT = 8;

  // ../amll/node_modules/@ungap/structured-clone/esm/deserialize.js
  var { defineProperty } = Object;
  var env = typeof self === "object" ? self : globalThis;
  var guard = (name, init) => {
    switch (name) {
      case "Function":
      case "SharedWorker":
      case "Worker":
      case "eval":
      case "setInterval":
      case "setTimeout":
        throw new TypeError("unable to deserialize " + name);
    }
    return new env[name](init);
  };
  var deserializer = ($, _) => {
    const as = (out, index) => {
      $.set(index, out);
      return out;
    };
    const unpair = (index) => {
      if ($.has(index))
        return $.get(index);
      const [type, value] = _[index];
      switch (type) {
        case PRIMITIVE:
        case VOID:
          return as(value, index);
        case ARRAY: {
          const arr = as([], index);
          for (const index2 of value)
            arr.push(unpair(index2));
          return arr;
        }
        case OBJECT: {
          const object = as({}, index);
          for (const [key, index2] of value) {
            const k = unpair(key), value2 = unpair(index2);
            if (k === "__proto__") defineProperty(object, k, {
              value: value2,
              configurable: true,
              enumerable: true,
              writable: true
            });
            else object[k] = value2;
          }
          return object;
        }
        case DATE:
          return as(new Date(value), index);
        case REGEXP: {
          const { source, flags } = value;
          return as(new RegExp(source, flags), index);
        }
        case MAP: {
          const map = as(/* @__PURE__ */ new Map(), index);
          for (const [key, index2] of value)
            map.set(unpair(key), unpair(index2));
          return map;
        }
        case SET: {
          const set = as(/* @__PURE__ */ new Set(), index);
          for (const index2 of value)
            set.add(unpair(index2));
          return set;
        }
        case ERROR: {
          const { name, message } = value;
          return as(
            typeof env[name] === "function" ? guard(name, message) : new Error(message),
            index
          );
        }
        case BIGINT:
          return as(BigInt(value), index);
        case "BigInt":
          return as(Object(BigInt(value)), index);
        case "ArrayBuffer":
          return as(new Uint8Array(value).buffer, value);
        case "DataView": {
          const { buffer } = new Uint8Array(value);
          return as(new DataView(buffer), value);
        }
        case "-0":
          return -0;
      }
      return as(guard(type, value), index);
    };
    return unpair;
  };
  var deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);

  // ../amll/node_modules/@ungap/structured-clone/esm/serialize.js
  var EMPTY = "";
  var { toString } = {};
  var { keys, is } = Object;
  var typeOf = (value) => {
    const type = typeof value;
    if (type !== "object" || !value)
      return [PRIMITIVE, type];
    const asString = toString.call(value).slice(8, -1);
    switch (asString) {
      case "Array":
        return [ARRAY, EMPTY];
      case "Object":
        return [OBJECT, EMPTY];
      case "Date":
        return [DATE, EMPTY];
      case "RegExp":
        return [REGEXP, EMPTY];
      case "Map":
        return [MAP, EMPTY];
      case "Set":
        return [SET, EMPTY];
      case "DataView":
        return [ARRAY, asString];
    }
    if (asString.includes("Array"))
      return [ARRAY, asString];
    if (value instanceof Error)
      return [ERROR, value.name || "Error"];
    return [OBJECT, asString];
  };
  var shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
  var serializer = (strict, json, $, _) => {
    const as = (out, value) => {
      const index = _.push(out) - 1;
      $.set(value, index);
      return index;
    };
    const pair = (value) => {
      if ($.has(value))
        return $.get(value);
      let [TYPE, type] = typeOf(value);
      switch (TYPE) {
        case PRIMITIVE: {
          let entry = value;
          switch (type) {
            case "bigint":
              TYPE = BIGINT;
              entry = value.toString();
              break;
            case "number":
              if (!value && is(value, -0))
                return _.push(["-0"]) - 1;
              break;
            case "function":
            case "symbol":
              if (strict)
                throw new TypeError("unable to serialize " + type);
              entry = null;
              break;
            case "undefined":
              return as([VOID], value);
          }
          return as([TYPE, entry], value);
        }
        case ARRAY: {
          if (type) {
            let spread = value;
            if (type === "DataView") {
              spread = new Uint8Array(value.buffer);
            } else if (type === "ArrayBuffer") {
              spread = new Uint8Array(value);
            }
            return as([type, [...spread]], value);
          }
          const arr = [];
          const index = as([TYPE, arr], value);
          for (const entry of value)
            arr.push(pair(entry));
          return index;
        }
        case OBJECT: {
          if (type) {
            switch (type) {
              case "BigInt":
                return as([type, value.toString()], value);
              case "Boolean":
              case "Number":
              case "String":
                return as([type, value.valueOf()], value);
            }
          }
          if (json && "toJSON" in value)
            return pair(value.toJSON());
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const key of keys(value)) {
            if (strict || !shouldSkip(typeOf(value[key])))
              entries.push([pair(key), pair(value[key])]);
          }
          return index;
        }
        case DATE:
          return as([TYPE, isNaN(value.getTime()) ? EMPTY : value.toISOString()], value);
        case REGEXP: {
          const { source, flags } = value;
          return as([TYPE, { source, flags }], value);
        }
        case MAP: {
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const [key, entry] of value) {
            if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
              entries.push([pair(key), pair(entry)]);
          }
          return index;
        }
        case SET: {
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const entry of value) {
            if (strict || !shouldSkip(typeOf(entry)))
              entries.push(pair(entry));
          }
          return index;
        }
      }
      const { message } = value;
      return as([TYPE, { name: type, message }], value);
    };
    return pair;
  };
  var serialize = (value, { json, lossy } = {}) => {
    const _ = [];
    return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
  };

  // ../amll/node_modules/@ungap/structured-clone/esm/index.js
  var esm_default = typeof structuredClone === "function" ? (
    /* c8 ignore start */
    (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any)
  ) : (any, options) => deserialize(serialize(any, options));

  // ../amll/node_modules/bezier-easing/src/index.js
  function LinearEasing(x) {
    return x;
  }
  var { cbrt, sqrt, PI: \u03C0 } = Math;
  var x2t = (x, a, b, c, d) => {
    const q = a + b * x;
    const s = q ** 2 + c;
    if (s > 0) {
      const root = sqrt(s);
      return cbrt(q + root) + cbrt(q - root) - d;
    }
    const l = cbrt(sqrt(-c));
    const angle = q ? Math.atan(sqrt(-s) / q) : -\u03C0 / 2;
    let \u03C6;
    if (b < 0) {
      \u03C6 = (q > 0 ? 2 * \u03C0 : \u03C0) - angle;
    } else if (d < 0) {
      \u03C6 = (q > 0 ? 2 * \u03C0 : -3 * \u03C0) + angle;
    } else {
      \u03C6 = (q > 0 ? 0 : \u03C0) + angle;
    }
    return 2 * l * Math.cos(\u03C6 / 3) - d;
  };
  var Y = (t, ay, by, cy) => ((ay * t + 3 * by) * t + cy) * t;
  function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      throw new Error("bezier x values must be in [0, 1] range");
    }
    if (mX1 === mY1 && mX2 === mY2) {
      return LinearEasing;
    }
    const a = 6 * (3 * mX1 - 3 * mX2 + 1);
    const b = 6 * (mX2 - 2 * mX1);
    const c = 3 * mX1;
    const a2 = a * a;
    const b2 = b * b;
    const d = b / a;
    const e = 3 * b * c / a2 - b2 * b / (a2 * a);
    const w1 = 2 * c / a - b2 / a2;
    const w = w1 * w1 * w1;
    const o = 3 / a;
    const ay = 3 * mY1 - 3 * mY2 + 1;
    const by = mY2 - 2 * mY1;
    const cy = 3 * mY1;
    const X2T = a ? x2t : LinearEasing;
    return function BezierEasing(x) {
      if (x === 0 || x === 1) {
        return x;
      }
      return Y(X2T(x, e, o, w, d), ay, by, cy);
    };
  }

  // ../amll/node_modules/@applemusic-like-lyrics/core/dist/amll-core.mjs
  var AbstractBaseRenderer = class {
  };
  function clamp1(x) {
    return Math.max(1, x);
  }
  var BaseRenderer = class extends AbstractBaseRenderer {
    canvas;
    observer;
    flowSpeed = 1;
    currerntRenderScale = 0.75;
    constructor(canvas) {
      super();
      this.canvas = canvas;
      this.observer = new ResizeObserver(() => {
        const width = clamp1(canvas.clientWidth * window.devicePixelRatio * this.currerntRenderScale);
        const height = clamp1(canvas.clientHeight * window.devicePixelRatio * this.currerntRenderScale);
        this.onResize(width, height);
      });
      this.observer.observe(canvas);
    }
    setRenderScale(scale) {
      this.currerntRenderScale = scale;
      this.onResize(this.canvas.clientWidth * window.devicePixelRatio * this.currerntRenderScale, this.canvas.clientHeight * window.devicePixelRatio * this.currerntRenderScale);
    }
    /**
    * 当画板元素大小发生变化时此函数会被调用
    * 可以在此处重设和渲染器相关的尺寸设置
    * 考虑到初始化的时候元素不一定在文档中或出于某些特殊样式状态，尺寸长宽有可能会为 0，请注意进行特判处理
    * @param width 画板元素实际的物理像素宽度，有可能为 0
    * @param height 画板元素实际的物理像素高度，有可能为 0
    */
    onResize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    /**
    * 修改背景的流动速度，数字越大越快，默认为 1
    * @param speed 背景的流动速度，默认为 1
    */
    setFlowSpeed(speed) {
      this.flowSpeed = speed;
    }
    /** 停止监听画板尺寸，供构造失败等尚未接管画板所有权的路径清理 */
    disconnectResizeObserver() {
      this.observer.disconnect();
    }
    dispose() {
      this.disconnectResizeObserver();
      this.canvas.remove();
    }
    getElement() {
      return this.canvas;
    }
  };
  var GLProgram = class {
    label;
    gl;
    program;
    vertexShader;
    fragmentShader;
    attrs;
    uniformLocations = /* @__PURE__ */ new Map();
    constructor(gl, vertexShaderSource, fragmentShaderSource, label = "unknown") {
      this.label = label;
      this.gl = gl;
      const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
      let fragmentShader;
      try {
        fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this.createProgram(vertexShader, fragmentShader);
      } catch (error) {
        gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
        throw error;
      }
      this.vertexShader = vertexShader;
      this.fragmentShader = fragmentShader;
      const num = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
      const attrs = {};
      for (let i = 0; i < num; i++) {
        const info = gl.getActiveAttrib(this.program, i);
        if (!info) continue;
        const location2 = gl.getAttribLocation(this.program, info.name);
        if (location2 === -1) continue;
        attrs[info.name] = location2;
      }
      this.attrs = attrs;
    }
    createShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Failed to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = /* @__PURE__ */ new Error(`Failed to compile shader for type ${type} "${this.label}": ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        throw error;
      }
      return shader;
    }
    createProgram(vertexShader, fragmentShader) {
      const gl = this.gl;
      const program = gl.createProgram();
      if (!program) throw new Error("Failed to create program");
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const errLog = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(`Failed to link program "${this.label}": ${errLog}`);
      }
      return program;
    }
    use() {
      this.gl.useProgram(this.program);
    }
    notFoundUniforms = /* @__PURE__ */ new Set();
    warnUniformNotFound(name) {
      if (this.notFoundUniforms.has(name)) return;
      this.notFoundUniforms.add(name);
      console.warn(`Failed to get uniform location for program "${this.label}": ${name}`);
    }
    /**
    * 取 uniform 位置并缓存。逐帧设置几十个 uniform 时，省下的
    * `getUniformLocation` 调用相当可观。
    */
    getUniformLocation(name) {
      let location2 = this.uniformLocations.get(name);
      if (location2 === void 0) {
        location2 = this.gl.getUniformLocation(this.program, name);
        this.uniformLocations.set(name, location2);
      }
      if (location2 === null) this.warnUniformNotFound(name);
      return location2;
    }
    setUniform1f(name, value) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform1f(location2, value);
    }
    setUniform2f(name, value1, value2) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform2f(location2, value1, value2);
    }
    setUniform3f(name, value1, value2, value3) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform3f(location2, value1, value2, value3);
    }
    setUniform4f(name, value1, value2, value3, value4) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform4f(location2, value1, value2, value3, value4);
    }
    setUniform1i(name, value) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform1i(location2, value);
    }
    setUniform1fv(name, value) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform1fv(location2, value);
    }
    setUniform3fv(name, value) {
      const location2 = this.getUniformLocation(name);
      if (location2 !== null) this.gl.uniform3fv(location2, value);
    }
    dispose() {
      const gl = this.gl;
      gl.deleteShader(this.vertexShader);
      gl.deleteShader(this.fragmentShader);
      gl.deleteProgram(this.program);
      this.uniformLocations.clear();
    }
  };
  function loadImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageUrl;
      img.crossOrigin = "anonymous";
      img.loading = "eager";
    });
  }
  function loadVideo(videoUrl) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      let playing = false;
      let timeupdate = false;
      let rejected = false;
      video.addEventListener("playing", () => {
        playing = true;
        checkReady();
      }, true);
      video.addEventListener("timeupdate", () => {
        timeupdate = true;
        checkReady();
      }, true);
      video.addEventListener("error", (err) => {
        rejected = true;
        reject(err);
      }, true);
      function checkReady() {
        if (playing && timeupdate && !rejected) resolve(video);
      }
      video.src = videoUrl;
      video.playsInline = true;
      video.crossOrigin = "anonymous";
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.play();
    });
  }
  function loadResourceFromUrl(url, isVideo = false) {
    return isVideo ? loadVideo(url) : loadImage(url);
  }
  function loadResourceFromElement(element) {
    return new Promise((resolve, reject) => {
      if (element instanceof HTMLImageElement ? element.complete : element.readyState >= 3) resolve(element);
      else {
        element.onload = () => resolve(element);
        element.onerror = reject;
      }
    });
  }
  function rgbToXyz(rgb) {
    const [red, green, blue] = rgb;
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;
    return [
      r * 0.4124 + g * 0.3576 + b * 0.1805,
      r * 0.2126 + g * 0.7152 + b * 0.0722,
      r * 0.0193 + g * 0.1192 + b * 0.9505
    ];
  }
  function xyzToRgb(xyz) {
    const [x, y, z] = xyz;
    return [
      (x * 3.2406 - y * 1.5372 - z * 0.4986) * 255,
      (-x * 0.9689 + y * 1.8758 + z * 0.0415) * 255,
      (x * 0.0557 - y * 0.204 + z * 1.057) * 255
    ];
  }
  var D65 = {
    x: 0.95047,
    y: 1,
    z: 1.0883
  };
  function fxyz(t) {
    return t > 8856e-6 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  }
  function xyzToLab(xyz) {
    const [x, y, z] = xyz;
    return [
      116 * fxyz(y / D65.y) - 16,
      500 * (fxyz(x / D65.x) - fxyz(y / D65.y)),
      200 * (fxyz(y / D65.y) - fxyz(z / D65.z))
    ];
  }
  function labToXyz(lab) {
    const delta = 6 / 29;
    const [l, a, b] = lab;
    const fy = (l + 16) / 116;
    const fx = fy + a / 500;
    const fz = fy - b / 200;
    return [
      fx > delta ? D65.x * fx * fx * fx : (fx - 16 / 116) * 3 * delta * delta * D65.x,
      fy > delta ? D65.y * fy * fy * fy : (fy - 16 / 116) * 3 * delta * delta * D65.y,
      fz > delta ? D65.z * fz * fz * fz : (fz - 16 / 116) * 3 * delta * delta * D65.z
    ];
  }
  function rgbToLab(rgb) {
    return xyzToLab(rgbToXyz(rgb));
  }
  function labToRgb(lab) {
    return xyzToRgb(labToXyz(lab));
  }
  function channelToLinear(value) {
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }
  function srgbToOkLab(rgb) {
    const [red, green, blue] = rgb;
    const linearRed = channelToLinear(red);
    const linearGreen = channelToLinear(green);
    const linearBlue = channelToLinear(blue);
    const l = Math.cbrt(0.4122214708 * linearRed + 0.5363325363 * linearGreen + 0.0514459929 * linearBlue);
    const m = Math.cbrt(0.2119034982 * linearRed + 0.6806995451 * linearGreen + 0.1073969566 * linearBlue);
    const s = Math.cbrt(0.0883024619 * linearRed + 0.2817188376 * linearGreen + 0.6299787005 * linearBlue);
    return [
      0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    ];
  }
  function yToLStar(y) {
    if (y <= 216 / 24389) return y * (24389 / 27);
    return Math.cbrt(y) * 116 - 16;
  }
  function lStar(rgb) {
    const [r, g, b] = rgb;
    return yToLStar(0.2126 * channelToLinear(r / 255) + 0.7152 * channelToLinear(g / 255) + 0.0722 * channelToLinear(b / 255));
  }
  function paletteRgbLStarIsDark(rgb) {
    return lStar(rgb) <= 40;
  }
  function paletteRgbLStarIsLight(rgb) {
    return lStar(rgb) >= 60;
  }
  function rgbLStarIsDark(rgb) {
    return lStar(rgb) <= 50;
  }
  function distanceSquared(a, b) {
    const [ax, ay, az] = a;
    const [bx, by, bz] = b;
    const dx = ax - bx;
    const dy = ay - by;
    const dz = az - bz;
    return dx * dx + dy * dy + dz * dz;
  }
  function createRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state = state + 1831565813 >>> 0;
      let t = state;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function seedFromHistogram(entries) {
    let hash = 2166136261;
    for (const { color, count } of entries) for (const value of [...color, count]) {
      hash ^= Math.round(value) & 65535;
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return hash >>> 0;
  }
  function isNotNearWhite(color) {
    return color.some((channel) => channel <= 250);
  }
  function filterOrFallback(entries, predicate) {
    const filtered = entries.filter(predicate);
    return filtered.length > 0 ? filtered : [...entries];
  }
  function clampRgb(color) {
    return color.map((channel) => Math.min(255, Math.max(0, channel)));
  }
  function groupColors(entries) {
    const grouped = /* @__PURE__ */ new Map();
    for (const entry of entries) {
      const key = `${entry.color[0]},${entry.color[1]},${entry.color[2]}`;
      const existing = grouped.get(key);
      if (existing) existing.count += entry.count;
      else grouped.set(key, {
        color: [...entry.color],
        count: entry.count
      });
    }
    return [...grouped.values()];
  }
  function toLabEntries(entries) {
    return entries.map((entry) => ({
      color: rgbToLab(entry.color),
      count: entry.count
    }));
  }
  function colorsEqual(a, b) {
    return a.every((value, i) => value === b[i]);
  }
  function findNearestCenterIndex(color, centers) {
    let nearestIndex = 0;
    let minDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < centers.length; i++) {
      const dist = distanceSquared(color, centers[i]);
      if (dist < minDist) {
        nearestIndex = i;
        minDist = dist;
      }
    }
    return nearestIndex;
  }
  function findFarthestColor(entries, centers) {
    let farthest = [
      0,
      0,
      0
    ];
    let maxDistance = Number.NEGATIVE_INFINITY;
    for (const { color } of entries) {
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (const center of centers) {
        const dist = distanceSquared(color, center);
        if (dist < nearestDistance) nearestDistance = dist;
      }
      if (nearestDistance > maxDistance) {
        maxDistance = nearestDistance;
        farthest = color;
      }
    }
    return farthest;
  }
  function kMeansPlusPlusCenters(entries, clusterCount, random) {
    const firstIndex = Math.floor(random() * entries.length);
    const selectedIndices = /* @__PURE__ */ new Set([firstIndex]);
    const centers = [entries[firstIndex].color];
    for (let i = 1; i < clusterCount; i++) {
      let accumulated = 0;
      const accDistances = new Float64Array(entries.length);
      for (let vectorId = 0; vectorId < entries.length; vectorId++) {
        const target = entries[vectorId].color;
        let minDistanceSquared = distanceSquared(centers[0], target);
        for (let clusterIdx = 1; clusterIdx < i; clusterIdx++) {
          const current = distanceSquared(centers[clusterIdx], target);
          if (current < minDistanceSquared) minDistanceSquared = current;
        }
        accumulated += minDistanceSquared * entries[vectorId].count;
        accDistances[vectorId] = accumulated;
      }
      if (accumulated <= Number.EPSILON) {
        const nextIndex = entries.findIndex((_, index) => !selectedIndices.has(index));
        if (nextIndex < 0) break;
        selectedIndices.add(nextIndex);
        centers.push(entries[nextIndex].color);
        continue;
      }
      const targetPoint = random() * accumulated;
      for (let vectorId = 0; vectorId < entries.length; vectorId++) if (!selectedIndices.has(vectorId) && accDistances[vectorId] >= targetPoint) {
        selectedIndices.add(vectorId);
        centers.push(entries[vectorId].color);
        break;
      }
      if (centers.length === i) {
        const nextIndex = entries.findIndex((_, index) => !selectedIndices.has(index));
        if (nextIndex < 0) break;
        selectedIndices.add(nextIndex);
        centers.push(entries[nextIndex].color);
      }
    }
    return centers;
  }
  function kMeansCluster(entries, numClusters, useKMeansPP, random) {
    const clusterCount = Math.min(numClusters, entries.length);
    if (clusterCount <= 0) return [];
    let centers;
    if (useKMeansPP) centers = kMeansPlusPlusCenters(entries, clusterCount, random);
    else {
      const shuffled = entries.map((entry) => entry.color);
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      centers = shuffled.slice(0, clusterCount);
    }
    const assignments = new Int32Array(entries.length);
    let changed = true;
    let iterations = 0;
    while (changed && iterations < 250) {
      changed = false;
      iterations++;
      for (let i = 0; i < entries.length; i++) assignments[i] = findNearestCenterIndex(entries[i].color, centers);
      for (let i = 0; i < clusterCount; i++) {
        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;
        let weight = 0;
        for (let e = 0; e < entries.length; e++) {
          if (assignments[e] !== i) continue;
          const { color, count } = entries[e];
          sumX += color[0] * count;
          sumY += color[1] * count;
          sumZ += color[2] * count;
          weight += count;
        }
        if (weight === 0) {
          centers[i] = findFarthestColor(entries, centers);
          changed = true;
          continue;
        }
        const newCenter = [
          sumX / weight,
          sumY / weight,
          sumZ / weight
        ];
        if (!colorsEqual(newCenter, centers[i])) {
          centers[i] = newCenter;
          changed = true;
        }
      }
    }
    return centers;
  }
  function createThemeColor(sourceColors, ignoreWhite = false, toLab = false, random = createRandom(seedFromHistogram(sourceColors))) {
    let entries = [...sourceColors];
    if (ignoreWhite && entries.length > 1) entries = filterOrFallback(entries, (entry) => isNotNearWhite(entry.color));
    if (toLab) entries = toLabEntries(entries);
    entries = groupColors(entries);
    const first = kMeansCluster(entries, 1, false, random)[0] ?? [
      0,
      0,
      0
    ];
    const color = clampRgb(toLab ? labToRgb(first) : first);
    return {
      color,
      colorIsDark: rgbLStarIsDark(color)
    };
  }
  function createKMeansPalette(sourceColors, clusterCount, themeColor, ignoreWhite = false, toLab = false, useKMeansPP = false, intent = "accent", random = createRandom(seedFromHistogram(sourceColors))) {
    let effectiveIgnoreWhite = ignoreWhite;
    let effectiveUseKMeansPP = useKMeansPP;
    if (sourceColors.length === 1) {
      effectiveIgnoreWhite = false;
      effectiveUseKMeansPP = false;
    }
    const colorIsDark = themeColor.colorIsDark;
    let entries = filterOrFallback(sourceColors, (entry) => {
      if (intent === "dominant") return !effectiveIgnoreWhite || isNotNearWhite(entry.color);
      if (colorIsDark) return paletteRgbLStarIsDark(entry.color);
      if (!effectiveIgnoreWhite) return paletteRgbLStarIsLight(entry.color);
      return paletteRgbLStarIsLight(entry.color) && isNotNearWhite(entry.color);
    });
    if (toLab) entries = toLabEntries(entries);
    entries = groupColors(entries);
    const dominantColors = kMeansCluster(entries, clusterCount, effectiveUseKMeansPP, random).map((center) => clampRgb(toLab ? labToRgb(center) : center));
    const palette = [];
    for (let i = 0; i < clusterCount; i++) palette.push(dominantColors.length > 0 ? [...dominantColors[i % dominantColors.length]] : [
      0,
      0,
      0
    ]);
    return {
      palette,
      paletteIsDark: colorIsDark,
      themeColor
    };
  }
  var MAX_COLOR_DEPTH = 8;
  var OctreeNode = class OctreeNode2 {
    owner;
    parentNode;
    indexInParent;
    children = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    childCount = 0;
    leafNodeCount = 0;
    sampleCount = 0;
    redSum = 0;
    greenSum = 0;
    blueSum = 0;
    constructor(owner, parentNode, indexInParent) {
      this.owner = owner;
      this.parentNode = parentNode;
      this.indexInParent = indexInParent;
    }
    get averageColor() {
      if (this.sampleCount === 0) return [
        0,
        0,
        0
      ];
      return [
        this.redSum / this.sampleCount,
        this.greenSum / this.sampleCount,
        this.blueSum / this.sampleCount
      ];
    }
    addColor(red, green, blue, depth, sampleCount) {
      this.sampleCount += sampleCount;
      this.redSum += red * sampleCount;
      this.greenSum += green * sampleCount;
      this.blueSum += blue * sampleCount;
      if (depth === MAX_COLOR_DEPTH) {
        if (this.leafNodeCount === 0) this.leafNodeCount = 1;
        return;
      }
      const bitShift = 7 - depth;
      const childIndex = (red >> bitShift & 1) << 2 | (green >> bitShift & 1) << 1 | blue >> bitShift & 1;
      let childNode = this.children[childIndex];
      if (!childNode) {
        childNode = new OctreeNode2(this.owner, this, childIndex);
        this.children[childIndex] = childNode;
        this.childCount++;
        this.owner.registerNodeAtDepth(childNode, depth);
      }
      const previousLeafNodeCount = childNode.leafNodeCount;
      childNode.addColor(red, green, blue, depth + 1, sampleCount);
      this.leafNodeCount += childNode.leafNodeCount - previousLeafNodeCount;
    }
    collectPaletteColors(result) {
      if (this.leafNodeCount === 0) return;
      if (this.childCount === 0) {
        result.push({
          color: this.averageColor,
          sampleCount: this.sampleCount
        });
        return;
      }
      for (const child of this.children) child?.collectPaletteColors(result);
    }
    mergeChildrenIntoThisNode() {
      if (this.childCount === 0 || this.leafNodeCount <= 1) return;
      const previousLeafNodeCount = this.leafNodeCount;
      this.children.fill(null);
      this.childCount = 0;
      this.leafNodeCount = this.sampleCount > 0 ? 1 : 0;
      const leafReduction = previousLeafNodeCount - this.leafNodeCount;
      let parentNode = this.parentNode;
      while (parentNode) {
        parentNode.leafNodeCount -= leafReduction;
        parentNode = parentNode.parentNode;
      }
    }
    /** 合并会把整棵子树摘掉，被摘掉的节点仍留在深度索引里，需要显式排除。 */
    isAttachedToRoot() {
      let currentNode = this;
      while (currentNode.parentNode) {
        if (currentNode.parentNode.children[currentNode.indexInParent] !== currentNode) return false;
        currentNode = currentNode.parentNode;
      }
      return true;
    }
  };
  var OctreePaletteQuantizer = class {
    rootNode = new OctreeNode(this, null, -1);
    nodesByDepth = Array.from({ length: MAX_COLOR_DEPTH }, () => []);
    registerNodeAtDepth(node, depth) {
      this.nodesByDepth[depth].push(node);
    }
    addColor(color, sampleCount) {
      if (sampleCount <= 0) return;
      this.rootNode.addColor(color[0] & 255, color[1] & 255, color[2] & 255, 0, sampleCount);
    }
    getPalette(maxColorCount) {
      if (maxColorCount <= 0 || this.rootNode.leafNodeCount === 0) return [];
      const paletteColors = [];
      this.rootNode.collectPaletteColors(paletteColors);
      if (paletteColors.length <= maxColorCount) return paletteColors.map((entry) => entry.color);
      paletteColors.sort((left, right) => {
        const bySampleCount = right.sampleCount - left.sampleCount;
        if (bySampleCount !== 0) return bySampleCount;
        if (left.color[0] !== right.color[0]) return left.color[0] - right.color[0];
        if (left.color[1] !== right.color[1]) return left.color[1] - right.color[1];
        return left.color[2] - right.color[2];
      });
      return paletteColors.slice(0, Math.min(maxColorCount, paletteColors.length)).map((entry) => entry.color);
    }
    reduceToColorCount(targetColorCount) {
      if (targetColorCount <= 0) return;
      let remainingLeafReduction = this.rootNode.leafNodeCount - targetColorCount;
      if (remainingLeafReduction <= 0) return;
      for (let depth = 6; depth >= 0 && remainingLeafReduction > 0; depth--) {
        const nodesAtDepth = this.nodesByDepth[depth];
        nodesAtDepth.sort((left, right) => {
          const byLeafCount = left.leafNodeCount - right.leafNodeCount;
          if (byLeafCount !== 0) return byLeafCount;
          return left.sampleCount - right.sampleCount;
        });
        for (let i = 0; i < nodesAtDepth.length && remainingLeafReduction > 0; i++) {
          const candidate = nodesAtDepth[i];
          if (candidate.childCount === 0) continue;
          const leafReduction = candidate.leafNodeCount - 1;
          if (leafReduction <= 0) continue;
          if (leafReduction > remainingLeafReduction) continue;
          remainingLeafReduction -= leafReduction;
          candidate.mergeChildrenIntoThisNode();
        }
      }
      while (this.rootNode.leafNodeCount > targetColorCount) {
        const candidate = this.findBestMergeCandidate();
        if (!candidate) break;
        candidate.mergeChildrenIntoThisNode();
      }
    }
    findBestMergeCandidate() {
      let bestCandidate = null;
      let bestLeafReduction = Number.POSITIVE_INFINITY;
      let bestSampleCount = Number.POSITIVE_INFINITY;
      for (let depth = 6; depth >= 0; depth--) for (const candidate of this.nodesByDepth[depth]) {
        if (!candidate.isAttachedToRoot()) continue;
        if (candidate.childCount === 0) continue;
        const leafReduction = candidate.leafNodeCount - 1;
        if (leafReduction <= 0) continue;
        if (leafReduction < bestLeafReduction || leafReduction === bestLeafReduction && candidate.sampleCount < bestSampleCount) {
          bestCandidate = candidate;
          bestLeafReduction = leafReduction;
          bestSampleCount = candidate.sampleCount;
        }
      }
      return bestCandidate;
    }
  };
  function createOctTreePalette(sourceColors, clusterCount, themeColor = createThemeColor(sourceColors, false, true), ignoreWhite = false, intent = "accent") {
    const quantizer = new OctreePaletteQuantizer();
    const effectiveIgnoreWhite = sourceColors.length === 1 ? false : ignoreWhite;
    const filteredEntries = sourceColors.filter((entry) => {
      const [r, g, b] = entry.color;
      if (effectiveIgnoreWhite && r > 250 && g > 250 && b > 250) return false;
      if (intent === "dominant") return true;
      return themeColor.colorIsDark ? paletteRgbLStarIsDark(entry.color) : paletteRgbLStarIsLight(entry.color);
    });
    const entries = filteredEntries.length > 0 ? filteredEntries : sourceColors;
    for (const entry of entries) quantizer.addColor(entry.color, entry.count);
    quantizer.reduceToColorCount(clusterCount);
    const quantizeResult = quantizer.getPalette(clusterCount);
    let palette;
    if (quantizeResult.length < clusterCount) {
      palette = [];
      for (let i = 0; i < clusterCount; i++) palette.push(quantizeResult.length > 0 ? [...quantizeResult[i % quantizeResult.length]] : [
        0,
        0,
        0
      ]);
    } else palette = quantizeResult;
    return {
      palette,
      paletteIsDark: themeColor.colorIsDark,
      themeColor
    };
  }
  function calculateSpatialDiversity(palette) {
    if (palette.length === 0) return 0;
    const labVectors = palette.map(rgbToLab);
    let centroidL = 0;
    let centroidA = 0;
    let centroidB = 0;
    for (const [l, a, b] of labVectors) {
      centroidL += l;
      centroidA += a;
      centroidB += b;
    }
    centroidL /= labVectors.length;
    centroidA /= labVectors.length;
    centroidB /= labVectors.length;
    let sumSquaredDistances = 0;
    for (const [l, a, b] of labVectors) {
      const dl = l - centroidL;
      const da = a - centroidA;
      const db = b - centroidB;
      sumSquaredDistances += dl * dl + da * da + db * db;
    }
    return sumSquaredDistances / labVectors.length;
  }
  function countDistinctColors(palette) {
    return new Set(palette.map((color) => color.join(","))).size;
  }
  function createAutoPalette(sourceColors, clusterCount, ignoreWhite = false, toLab = false, useKMeansPP = false, intent = "accent") {
    const random = createRandom(seedFromHistogram(sourceColors));
    const themeColor = createThemeColor(sourceColors, ignoreWhite, toLab, random);
    const kmeansResult = createKMeansPalette(sourceColors, clusterCount, themeColor, ignoreWhite, toLab, useKMeansPP, intent, random);
    const octTreeResult = createOctTreePalette(sourceColors, clusterCount, themeColor, ignoreWhite, intent);
    const kMeansDistinct = countDistinctColors(kmeansResult.palette);
    const octTreeDistinct = countDistinctColors(octTreeResult.palette);
    if (kMeansDistinct !== octTreeDistinct) return kMeansDistinct > octTreeDistinct ? kmeansResult : octTreeResult;
    const kMeansDiversity = calculateSpatialDiversity(kmeansResult.palette);
    const octTreeDiversity = calculateSpatialDiversity(octTreeResult.palette);
    if (intent === "dominant" || kmeansResult.paletteIsDark) return kMeansDiversity >= octTreeDiversity ? kmeansResult : octTreeResult;
    return kMeansDiversity <= octTreeDiversity || octTreeDiversity === 0 ? kmeansResult : octTreeResult;
  }
  function createOffscreenCanvas(width, height) {
    if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  var DEFAULT_SAMPLE_SIZE = 64;
  function toImageData(source, sampleSize) {
    if (source instanceof ImageData) return source;
    const [sourceWidth, sourceHeight] = source instanceof HTMLVideoElement ? [source.videoWidth, source.videoHeight] : source instanceof HTMLImageElement ? [source.naturalWidth, source.naturalHeight] : [source.width, source.height];
    if (sourceWidth <= 0 || sourceHeight <= 0) return null;
    const scale = Math.min(1, Math.max(1, Math.floor(sampleSize)) / Math.max(sourceWidth, sourceHeight));
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));
    const ctx = createOffscreenCanvas(width, height).getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(source, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
  }
  function buildColorHistogram(source, sampleSize = DEFAULT_SAMPLE_SIZE) {
    const imageData = toImageData(source, sampleSize);
    if (!imageData) return [];
    const { data } = imageData;
    const counts = /* @__PURE__ */ new Map();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;
      const key = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts, ([key, count]) => {
      return {
        color: [
          key >> 16 & 255,
          key >> 8 & 255,
          key & 255
        ],
        count
      };
    });
  }
  function createPaletteFromImage(source, clusterCount, options = {}) {
    const normalizedClusterCount = Math.max(0, Math.floor(clusterCount));
    const { algorithm = "auto", ignoreWhite = false, toLab = false, useKMeansPP = false, intent = "accent", sampleSize } = options;
    const entries = buildColorHistogram(source, sampleSize);
    if (entries.length === 0) return {
      palette: Array.from({ length: normalizedClusterCount }, () => [
        0,
        0,
        0
      ]),
      paletteIsDark: true,
      themeColor: {
        color: [
          0,
          0,
          0
        ],
        colorIsDark: true
      }
    };
    switch (algorithm) {
      case "kmeans":
        return createKMeansPalette(entries, normalizedClusterCount, createThemeColor(entries, ignoreWhite, toLab), ignoreWhite, toLab, useKMeansPP, intent);
      case "octtree":
        return createOctTreePalette(entries, normalizedClusterCount, createThemeColor(entries, ignoreWhite, true), ignoreWhite, intent);
      default:
        return createAutoPalette(entries, normalizedClusterCount, ignoreWhite, toLab, useKMeansPP, intent);
    }
  }
  var webgl1Support;
  var highpFragmentSupport;
  function withProbeContext(contextId, probe = () => true) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const gl = canvas.getContext(contextId);
      if (!gl) return false;
      try {
        return probe(gl);
      } finally {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    } catch {
      return false;
    }
  }
  function isWebGL1Supported() {
    if (webgl1Support === void 0) webgl1Support = withProbeContext("webgl");
    return webgl1Support;
  }
  function isHighpFragmentSupported() {
    if (highpFragmentSupport === void 0) highpFragmentSupport = withProbeContext("webgl", (gl) => {
      return (gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)?.precision ?? 0) > 0;
    });
    return highpFragmentSupport;
  }
  var isolation_frag_default = "// WebGL1 port of Storyteller-Studios/Cirrus' IsolationEffect.\n// The random values and flow parameters are re-rolled per album by\n// IsolationRenderer, so a cover gets a stable composition while different\n// covers do not share a layout.\n//\n// Everything that is constant for a whole draw call -- the sRGB to OkLab\n// conversion of the four colors, and the randomised flow parameters -- is\n// computed on the CPU and uploaded as uniforms instead of being recomputed per\n// fragment.\n//\n// highp is required rather than optional: u_time grows without bound and the\n// noise hash amplifies it by ~44000, which mediump's 10 significant bits cannot\n// carry. IsolationRenderer.isSupported() refuses environments without highp\n// fragment precision, so this shader simply fails to compile there instead of\n// silently rendering a broken picture.\nprecision highp float;\n\nuniform vec2 u_resolution;\nuniform float u_time;\n// The four gradient colors, already converted to OkLab by the CPU.\nuniform vec3 u_colors[4];\nuniform vec3 u_random;\n// x = ripple frequency, y = ripple amplitude divisor,\n// z = flow speed (sign carries the direction), w = gradient axis tilt in radians\nuniform vec4 u_flowParams;\n// Extra jitter added to the noise-driven gradient angle, in radians.\nuniform float u_angleJitter;\nuniform bool u_enableLightWave;\nuniform bool u_enableDithering;\n\nconst float PI = 3.141592653589793;\n\nvec2 rotatePoint(vec2 point, float angle) {\n	float sine = sin(angle);\n	float cosine = cos(angle);\n	return vec2(\n		point.x * cosine - point.y * sine,\n		point.x * sine + point.y * cosine\n	);\n}\n\nvec2 gradientHash(vec2 point) {\n	return fract(\n		sin(\n			vec2(\n				dot(point, vec2(127.1, 311.7)),\n				dot(point, vec2(269.5, 183.3))\n			)\n		) * 43758.5453\n	);\n}\n\nfloat gradientNoise(vec2 point) {\n	vec2 cell = floor(point);\n	vec2 offset = fract(point);\n	vec2 eased = offset * offset * (3.0 - 2.0 * offset);\n	float lower = mix(\n		dot(-1.0 + 2.0 * gradientHash(cell), offset),\n		dot(-1.0 + 2.0 * gradientHash(cell + vec2(1.0, 0.0)), offset - vec2(1.0, 0.0)),\n		eased.x\n	);\n	float upper = mix(\n		dot(-1.0 + 2.0 * gradientHash(cell + vec2(0.0, 1.0)), offset - vec2(0.0, 1.0)),\n		dot(-1.0 + 2.0 * gradientHash(cell + vec2(1.0, 1.0)), offset - vec2(1.0, 1.0)),\n		eased.x\n	);\n	return 0.5 + 0.5 * mix(lower, upper, eased.y);\n}\n\nfloat encodeSrgb(float channel) {\n	return channel <= 0.0031308\n		? 12.92 * channel\n		: 1.055 * pow(max(channel, 0.0), 1.0 / 2.4) - 0.055;\n}\n\nvec3 okLabToSrgb(vec3 color) {\n	float lRoot = color.x + 0.3963377774 * color.y + 0.2158037573 * color.z;\n	float mRoot = color.x - 0.1055613458 * color.y - 0.0638541728 * color.z;\n	float sRoot = color.x - 0.0894841775 * color.y - 1.2914855480 * color.z;\n	float l = lRoot * lRoot * lRoot;\n	float m = mRoot * mRoot * mRoot;\n	float s = sRoot * sRoot * sRoot;\n	vec3 linearColor = vec3(\n		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,\n		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,\n		-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s\n	);\n	return vec3(\n		encodeSrgb(linearColor.r),\n		encodeSrgb(linearColor.g),\n		encodeSrgb(linearColor.b)\n	);\n}\n\nvec3 applyLightWave(vec3 okLabColor, vec2 uv) {\n	vec2 point = -1.0 + 1.5 * uv;\n	float x = point.x;\n	float y = point.y;\n	float time = u_time * 0.2;\n	float yPhase = y / 0.3;\n	float xPhase = x / 0.2;\n	float timeWarp = cos(sin(time) * 2.0) * 0.1;\n	float movement = (x + y) * 0.001 + timeWarp + sin(x * 0.01);\n	float wave1 =\n		sin(yPhase + 2.0 * time + u_random.x) * 0.5 -\n		yPhase -\n		xPhase * 0.5;\n	float wave2 = cos(\n		wave1 +\n			sin(movement + time) +\n			sin(y * 0.025 + time) +\n			sin((x + y) * 0.01) * 3.0 +\n			u_random.y\n	);\n	float wave3 = abs(\n		sin(\n			wave2 +\n				cos(yPhase + time + xPhase + wave2) +\n				cos(xPhase) +\n				sin(x * 0.001) +\n				u_random.z\n		)\n	);\n	// \u53D6\u8272\u4E0D\u518D\u538B\u6697\uFF0C\u7EAF\u767D\u5C01\u9762\u7684 L \u80FD\u5230 1.0\uFF0C\u4E58\u5B8C\u5FC5\u987B\u94B3\u4F4F\uFF1A\u8BA9 L \u6EA2\u51FA\u518D\u9760\u672B\u5C3E\u7684\n	// RGB \u94B3\u4F4D\u6536\u573A\u4F1A\u9010\u901A\u9053\u524A\u9876\uFF0C\u628A\u8272\u76F8\u4E5F\u4E00\u8D77\u6539\u6389\n	okLabColor.x = clamp(okLabColor.x * (1.1 - 0.1 * wave3), 0.0, 1.0);\n	return okLabToSrgb(okLabColor);\n}\n\nfloat interleavedGradientNoise(vec2 position) {\n	return fract(\n		52.9829189 * fract(dot(position, vec2(0.06711056, 0.00583715)))\n	);\n}\n\nvec3 screenSpaceDither(vec2 screenPosition) {\n	vec2 position = screenPosition + u_random.xy * 97.0;\n	vec3 noise = vec3(\n		interleavedGradientNoise(position),\n		interleavedGradientNoise(position + vec2(17.0, 59.0)),\n		interleavedGradientNoise(position + vec2(71.0, 23.0))\n	);\n	return (noise - 0.5) / 255.0;\n}\n\nvoid main() {\n	vec2 uv = gl_FragCoord.xy / u_resolution;\n	vec2 gradientPoint = uv - 0.5;\n	float degree = gradientNoise(\n		vec2(\n			u_time * 0.1 + u_random.x * 0.07,\n			gradientPoint.x * gradientPoint.y + u_random.y * 0.07\n		)\n	);\n	float noiseAngle = ((degree - 0.5) * 720.0 + 180.0) * PI / 180.0;\n	gradientPoint = rotatePoint(gradientPoint, noiseAngle + u_angleJitter);\n\n	float frequency = u_flowParams.x;\n	float amplitude = u_flowParams.y;\n	float speed = u_time * u_flowParams.z;\n	gradientPoint.x += sin(gradientPoint.y * frequency + speed) / amplitude;\n	gradientPoint.y +=\n		sin(gradientPoint.x * frequency * 1.5 + speed) / (amplitude * 0.5);\n\n	float rotatedX = rotatePoint(gradientPoint, u_flowParams.w).x;\n	float horizontal = smoothstep(-0.3, 0.2, rotatedX);\n	vec3 okLabColor = mix(\n		mix(u_colors[0], u_colors[1], horizontal),\n		mix(u_colors[2], u_colors[3], horizontal),\n		1.0 - smoothstep(-0.3, 0.5, gradientPoint.y)\n	);\n	vec3 color = u_enableLightWave\n		? applyLightWave(okLabColor, uv)\n		: okLabToSrgb(okLabColor);\n\n	if (u_enableDithering) {\n		color += screenSpaceDither(gl_FragCoord.xy);\n	}\n\n	gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);\n}\n";
  var isolation_vert_default = "attribute vec2 a_position;\n\nvoid main() {\n	gl_Position = vec4(a_position, 0.0, 1.0);\n}\n";
  var PALETTE_TRANSITION_MS = 1e3;
  var TAU = Math.PI * 2;
  var DEG_TO_RAD2 = Math.PI / 180;
  var COLOR_COUNT = 4;
  var ALBUM_RETRY_TIMES = 5;
  var DEFAULT_COLORS = [
    [
      0.09,
      0.09,
      0.11
    ],
    [
      0.13,
      0.13,
      0.16
    ],
    [
      0.07,
      0.07,
      0.09
    ],
    [
      0.11,
      0.11,
      0.13
    ]
  ];
  function lerp(from, to, amount) {
    return from + (to - from) * amount;
  }
  var DEFAULT_OKLAB_COLORS = new Float32Array(DEFAULT_COLORS.flatMap(srgbToOkLab));
  var IsolationRenderer = class IsolationRenderer2 extends BaseRenderer {
    /**
    * 新建实例时采用的默认选项。
    *
    * 该对象也可作为配置界面的初始值；实例创建后的调整统一走
    * {@link setOptions}。
    */
    static defaultOptions = {
      lightWave: false,
      dithering: true,
      paletteAlgorithm: "auto"
    };
    /** 当前环境是否支持该渲染器，选择渲染器前应先问一句。 */
    static isSupported() {
      return isWebGL1Supported() && isHighpFragmentSupported();
    }
    gl;
    program;
    quadBuffer;
    contextLost = false;
    _disposed = false;
    options = { ...IsolationRenderer2.defaultOptions };
    tickHandle = 0;
    lastTickTime = 0;
    lastFrameTime = 0;
    frameTime = 0;
    maxFPS = 30;
    paused = false;
    staticMode = false;
    targetWidth = 0;
    targetHeight = 0;
    currentWidth = 0;
    currentHeight = 0;
    albumRequestId = 0;
    albumSource;
    /**
    * 调色板过渡已经过的毫秒数。
    *
    * 这里刻意不用 `performance.now()`：过渡必须和渲染时钟走同一套时间，否则
    * 暂停、静态模式或限帧的时候过渡进度会和画面对不上。
    */
    paletteTransitionElapsed = PALETTE_TRANSITION_MS;
    /** 过渡起点、终点与当前帧的颜色，均为 OkLab，四个颜色首尾相接。 */
    fromColors = new Float32Array(DEFAULT_OKLAB_COLORS);
    toColors = new Float32Array(DEFAULT_OKLAB_COLORS);
    colorBuffer = new Float32Array(DEFAULT_OKLAB_COLORS);
    /** 取色结果的暂存区，避免每次换封面都新建数组。 */
    nextColors = /* @__PURE__ */ new Float32Array(12);
    randomValues = /* @__PURE__ */ new Float32Array(3);
    /**
    * 渐变流动参数，依次是波纹频率、波纹幅度、流动速度（已含方向）与渐变轴倾角
    * （弧度）。原实现是在片元着色器里用随机哈希现算的，但它们对整个 draw call
    * 都是常量，挪到 CPU 上由 {@link rollRandomParameters} 随机一次即可 —— 这里
    * 含随机量，若真的逐帧重算，画面会逐帧剧烈跳变。
    */
    flowParams = /* @__PURE__ */ new Float32Array(4);
    /** 渐变轴叠加在噪声角度上的抖动，单位弧度，同样是整帧常量。 */
    angleJitter = 0;
    paletteOrder = new Uint8Array(COLOR_COUNT);
    constructor(canvas) {
      super(canvas);
      const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power"
      });
      if (!gl) {
        this.disconnectResizeObserver();
        throw new Error("WebGL not supported");
      }
      this.gl = gl;
      try {
        this.rollRandomParameters();
        this.initializeGLResources();
      } catch (e) {
        this.program?.dispose();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        this.disconnectResizeObserver();
        throw e;
      }
      canvas.addEventListener("webglcontextlost", this.onContextLost);
      canvas.addEventListener("webglcontextrestored", this.onContextRestored);
      this.requestTick();
    }
    initializeGLResources() {
      const gl = this.gl;
      this.program = new GLProgram(gl, isolation_vert_default, isolation_frag_default, "isolation");
      const buffer = gl.createBuffer();
      if (!buffer) throw new Error("Failed to create quad buffer");
      this.quadBuffer = buffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1,
        1
      ]), gl.STATIC_DRAW);
      const position = this.program.attrs.a_position;
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    }
    onContextLost = (event) => {
      event.preventDefault();
      this.contextLost = true;
      if (this.tickHandle) {
        cancelAnimationFrame(this.tickHandle);
        this.tickHandle = 0;
      }
    };
    onContextRestored = () => {
      if (this._disposed) return;
      try {
        this.initializeGLResources();
      } catch (e) {
        this.program?.dispose();
        console.error("Failed to restore WebGL resources", e);
        return;
      }
      this.contextLost = false;
      this.currentWidth = 0;
      this.currentHeight = 0;
      this.resetFrameClock();
      this.requestTick();
    };
    /** 重掷整张封面期间保持不变的随机参数，避免画面逐帧跳变。 */
    rollRandomParameters() {
      for (let i = 0; i < this.randomValues.length; i++) this.randomValues[i] = Math.random() * TAU;
      const direction = Math.random() < 0.5 ? -1 : 1;
      this.flowParams[0] = lerp(4.5, 5.5, Math.random());
      this.flowParams[1] = lerp(22, 29, Math.random());
      this.flowParams[2] = lerp(0.65, 0.85, Math.random()) * direction;
      this.flowParams[3] = (-5 + (Math.random() - 0.5) * 12) * DEG_TO_RAD2;
      this.angleJitter = (Math.random() - 0.5) * 0.3;
      for (let i = 0; i < this.paletteOrder.length; i++) this.paletteOrder[i] = i;
      for (let i = this.paletteOrder.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
        [this.paletteOrder[i], this.paletteOrder[swapIndex]] = [this.paletteOrder[swapIndex], this.paletteOrder[i]];
      }
    }
    /** 调整渲染器选项，会立即生效。 */
    setOptions(patch) {
      const previous = this.options;
      const next = {
        lightWave: patch.lightWave ?? previous.lightWave,
        dithering: patch.dithering ?? previous.dithering,
        paletteAlgorithm: patch.paletteAlgorithm ?? previous.paletteAlgorithm
      };
      const algorithmChanged = next.paletteAlgorithm !== previous.paletteAlgorithm;
      this.options = next;
      if (algorithmChanged && this.albumSource) this.updatePaletteFromSource(this.albumSource, true);
      this.requestTick();
    }
    updatePaletteFromSource(source, immediate = false) {
      let palette;
      try {
        palette = createPaletteFromImage(source, COLOR_COUNT, {
          algorithm: this.options.paletteAlgorithm,
          intent: "dominant"
        }).palette;
      } catch (err) {
        console.warn("Failed to extract palette from album", err);
        return;
      }
      for (let i = 0; i < COLOR_COUNT; i++) {
        const [red, green, blue] = palette[this.paletteOrder[i]];
        this.nextColors.set(srgbToOkLab([
          red / 255,
          green / 255,
          blue / 255
        ]), i * 3);
      }
      this.transitionToColors(this.nextColors, immediate);
      this.requestTick();
    }
    transitionToColors(next, immediate) {
      if (immediate) this.fromColors.set(next);
      else {
        this.updateColorBuffer();
        this.fromColors.set(this.colorBuffer);
      }
      this.toColors.set(next);
      this.paletteTransitionElapsed = immediate ? PALETTE_TRANSITION_MS : 0;
    }
    /** 按当前过渡进度就地更新 {@link colorBuffer}，不产生任何中间数组。 */
    updateColorBuffer() {
      if (this.paletteTransitionElapsed >= PALETTE_TRANSITION_MS) {
        this.colorBuffer.set(this.toColors);
        return;
      }
      const progress = this.paletteTransitionElapsed / PALETTE_TRANSITION_MS;
      const eased = progress * progress * (3 - 2 * progress);
      for (let i = 0; i < this.colorBuffer.length; i++) this.colorBuffer[i] = lerp(this.fromColors[i], this.toColors[i], eased);
    }
    checkIfResize() {
      if (this.targetWidth === this.currentWidth && this.targetHeight === this.currentHeight) return;
      super.onResize(this.targetWidth, this.targetHeight);
      this.currentWidth = this.targetWidth;
      this.currentHeight = this.targetHeight;
      this.gl.viewport(0, 0, this.targetWidth, this.targetHeight);
    }
    onRedraw(frameTime, frameDelta) {
      this.checkIfResize();
      if (this.currentWidth <= 0 || this.currentHeight <= 0) return false;
      if (this.paletteTransitionElapsed < PALETTE_TRANSITION_MS) this.paletteTransitionElapsed += frameDelta;
      this.updateColorBuffer();
      this.program.use();
      this.program.setUniform2f("u_resolution", this.currentWidth, this.currentHeight);
      this.program.setUniform1f("u_time", frameTime / 1e3);
      this.program.setUniform3fv("u_colors[0]", this.colorBuffer);
      this.program.setUniform3fv("u_random", this.randomValues);
      this.program.setUniform4f("u_flowParams", this.flowParams[0], this.flowParams[1], this.flowParams[2], this.flowParams[3]);
      this.program.setUniform1f("u_angleJitter", this.angleJitter);
      this.program.setUniform1i("u_enableLightWave", this.options.lightWave ? 1 : 0);
      this.program.setUniform1i("u_enableDithering", this.options.dithering ? 1 : 0);
      const gl = this.gl;
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      return this.paletteTransitionElapsed >= PALETTE_TRANSITION_MS;
    }
    onTick(tickTime) {
      this.tickHandle = 0;
      if (this.paused || this._disposed || this.contextLost) return;
      const interval = 1e3 / this.maxFPS;
      const delta = tickTime - this.lastTickTime;
      if (delta < interval) {
        this.requestTick();
        return;
      }
      if (Number.isNaN(this.lastFrameTime)) this.lastFrameTime = tickTime;
      const frameDelta = Math.min(tickTime - this.lastFrameTime, 250);
      this.lastFrameTime = tickTime;
      this.lastTickTime = tickTime - delta % interval;
      this.frameTime += frameDelta * this.flowSpeed;
      if (!(this.onRedraw(this.frameTime, frameDelta) && this.staticMode)) this.requestTick();
      else this.lastFrameTime = NaN;
    }
    onTickBinded = this.onTick.bind(this);
    requestTick() {
      if (this._disposed || this.paused || this.contextLost) return;
      if (!(this.maxFPS > 0)) return;
      if (this.tickHandle === 0) this.tickHandle = requestAnimationFrame(this.onTickBinded);
    }
    onResize(width, height) {
      this.targetWidth = Math.ceil(width);
      this.targetHeight = Math.ceil(height);
      this.requestTick();
    }
    setStaticMode(enable) {
      this.staticMode = enable;
      this.resetFrameClock();
      this.requestTick();
    }
    setFPS(fps) {
      this.maxFPS = fps;
      this.resetFrameClock();
      this.requestTick();
    }
    pause() {
      if (this.tickHandle) {
        cancelAnimationFrame(this.tickHandle);
        this.tickHandle = 0;
      }
      this.paused = true;
    }
    resume() {
      this.paused = false;
      this.resetFrameClock();
      this.requestTick();
    }
    resetFrameClock() {
      const now = performance.now();
      this.lastFrameTime = now;
      this.lastTickTime = now;
    }
    /**
    * 该次 `setAlbum` 是否还是最新的一次。
    *
    * 与 `MeshGradientRenderer` 不同，这里不看 `contextLost`：取色全在 CPU
    * 上做，上下文丢了也照样能把调色板算完存着，等上下文恢复直接就能画。
    */
    isCurrentAlbumRequest(requestId) {
      return !this._disposed && requestId === this.albumRequestId;
    }
    async setAlbum(albumSource, isVideo) {
      const requestId = ++this.albumRequestId;
      if (albumSource === void 0 || typeof albumSource === "string" && albumSource.trim().length === 0) {
        this.albumSource = void 0;
        this.transitionToColors(DEFAULT_OKLAB_COLORS, false);
        this.requestTick();
        return;
      }
      let source = null;
      let remainRetryTimes = ALBUM_RETRY_TIMES;
      while (!source && remainRetryTimes > 0) try {
        source = typeof albumSource === "string" ? await loadResourceFromUrl(albumSource, isVideo) : await loadResourceFromElement(albumSource);
      } catch (error) {
        if (!this.isCurrentAlbumRequest(requestId)) return;
        remainRetryTimes--;
        console.warn(`failed on loading album resource, retrying (${remainRetryTimes})`, {
          albumSource,
          error
        });
      }
      if (!this.isCurrentAlbumRequest(requestId)) return;
      if (!source) {
        console.error("Failed to load album resource", albumSource);
        return;
      }
      this.albumSource = source;
      this.rollRandomParameters();
      this.updatePaletteFromSource(source);
    }
    setLowFreqVolume(_volume) {
    }
    setHasLyric(_hasLyric) {
    }
    dispose() {
      if (this._disposed) return;
      this._disposed = true;
      if (this.tickHandle) {
        cancelAnimationFrame(this.tickHandle);
        this.tickHandle = 0;
      }
      this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
      this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
      this.program.dispose();
      this.gl.deleteBuffer(this.quadBuffer);
      this.gl.getExtension("WEBGL_lose_context")?.loseContext();
      super.dispose();
    }
  };
  function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
  }
  function clamp01(x) {
    return clamp(x, 0, 1);
  }
  function clampPositive(x) {
    return Math.max(0, x);
  }
  function blurImage(imageData, radius, quality) {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    let rsum;
    let gsum;
    let bsum;
    let asum;
    let x;
    let y;
    let i;
    let p2;
    let p1;
    let p22;
    let yp;
    let yi;
    let yw;
    const wm = width - 1;
    const hm = height - 1;
    const rad1x = radius + 1;
    const divx = radius + rad1x;
    const rad1y = radius + 1;
    const div2 = 1 / (divx * (radius + rad1y));
    const r = [];
    const g = [];
    const b = [];
    const a = [];
    const vmin = [];
    const vmax = [];
    while (quality-- > 0) {
      yw = yi = 0;
      for (y = 0; y < height; y++) {
        rsum = pixels[yw] * rad1x;
        gsum = pixels[yw + 1] * rad1x;
        bsum = pixels[yw + 2] * rad1x;
        asum = pixels[yw + 3] * rad1x;
        for (i = 1; i <= radius; i++) {
          p2 = yw + ((i > wm ? wm : i) << 2);
          rsum += pixels[p2++];
          gsum += pixels[p2++];
          bsum += pixels[p2++];
          asum += pixels[p2];
        }
        for (x = 0; x < width; x++) {
          r[yi] = rsum;
          g[yi] = gsum;
          b[yi] = bsum;
          a[yi] = asum;
          if (y === 0) {
            vmin[x] = Math.min(x + rad1x, wm) << 2;
            vmax[x] = Math.max(x - radius, 0) << 2;
          }
          p1 = yw + vmin[x];
          p22 = yw + vmax[x];
          rsum += pixels[p1++] - pixels[p22++];
          gsum += pixels[p1++] - pixels[p22++];
          bsum += pixels[p1++] - pixels[p22++];
          asum += pixels[p1] - pixels[p22];
          yi++;
        }
        yw += width << 2;
      }
      for (x = 0; x < width; x++) {
        yp = x;
        rsum = r[yp] * rad1y;
        gsum = g[yp] * rad1y;
        bsum = b[yp] * rad1y;
        asum = a[yp] * rad1y;
        for (i = 1; i <= radius; i++) {
          yp += i > hm ? 0 : width;
          rsum += r[yp];
          gsum += g[yp];
          bsum += b[yp];
          asum += a[yp];
        }
        yi = x << 2;
        for (y = 0; y < height; y++) {
          pixels[yi] = rsum * div2 + 0.5 | 0;
          pixels[yi + 1] = gsum * div2 + 0.5 | 0;
          pixels[yi + 2] = bsum * div2 + 0.5 | 0;
          pixels[yi + 3] = asum * div2 + 0.5 | 0;
          if (x === 0) {
            vmin[y] = Math.min(y + rad1y, hm) * width;
            vmax[y] = Math.max(y - radius, 0) * width;
          }
          p1 = x + vmin[y];
          p22 = x + vmax[y];
          rsum += r[p1] - r[p22];
          gsum += g[p1] - g[p22];
          bsum += b[p1] - b[p22];
          asum += a[p1] - a[p22];
          yi += width << 2;
        }
      }
    }
  }
  var p = (cx, cy, x, y, ur = 0, vr = 0, up = 1, vp = 1) => Object.freeze({
    cx,
    cy,
    x,
    y,
    ur,
    vr,
    up,
    vp
  });
  var preset = (width, height, conf) => Object.freeze({
    width,
    height,
    conf
  });
  var CONTROL_POINT_PRESETS = [
    preset(5, 5, [
      p(0, 0, -1, -1, 0, 0, 1, 1),
      p(1, 0, -0.5, -1, 0, 0, 1, 1),
      p(2, 0, 0, -1, 0, 0, 1, 1),
      p(3, 0, 0.5, -1, 0, 0, 1, 1),
      p(4, 0, 1, -1, 0, 0, 1, 1),
      p(0, 1, -1, -0.5, 0, 0, 1, 1),
      p(1, 1, -0.5, -0.5, 0, 0, 1, 1),
      p(2, 1, -0.0052029684413368305, -0.6131420587090777, 0, 0, 1, 1),
      p(3, 1, 0.5884227308309977, -0.3990805107556692, 0, 0, 1, 1),
      p(4, 1, 1, -0.5, 0, 0, 1, 1),
      p(0, 2, -1, 0, 0, 0, 1, 1),
      p(1, 2, -0.4210024670505933, -0.11895058380429502, 0, 0, 1, 1),
      p(2, 2, -0.1019613423315412, -0.023812118047224606, 0, -47, 0.629, 0.849),
      p(3, 2, 0.40275125660925437, -0.06345314544600389, 0, 0, 1, 1),
      p(4, 2, 1, 0, 0, 0, 1, 1),
      p(0, 3, -1, 0.5, 0, 0, 1, 1),
      p(1, 3, 0.06801958477287173, 0.5205913248960121, -31, -45, 1, 1),
      p(2, 3, 0.21446469120128908, 0.29331610114301043, 6, -56, 0.566, 1.321),
      p(3, 3, 0.5, 0.5, 0, 0, 1, 1),
      p(4, 3, 1, 0.5, 0, 0, 1, 1),
      p(0, 4, -1, 1, 0, 0, 1, 1),
      p(1, 4, -0.31378372841550195, 1, 0, 0, 1, 1),
      p(2, 4, 0.26153633255328046, 1, 0, 0, 1, 1),
      p(3, 4, 0.5, 1, 0, 0, 1, 1),
      p(4, 4, 1, 1, 0, 0, 1, 1)
    ]),
    preset(4, 4, [
      p(0, 0, -1, -1, 0, 0, 1, 1),
      p(1, 0, -0.33333333333333337, -1, 0, 0, 1, 1),
      p(2, 0, 0.33333333333333326, -1, 0, 0, 1, 1),
      p(3, 0, 1, -1, 0, 0, 1, 1),
      p(0, 1, -1, -0.04495399932657351, 0, 0, 1, 1),
      p(1, 1, -0.24056117520129328, -0.22465999020104, 0, 0, 1, 1),
      p(2, 1, 0.334758885767489, -0.00531297192779423, 0, 0, 1, 1),
      p(3, 1, 0.9989920470678106, -0.3382976020775408, 8, 0, 0.566, 1.792),
      p(0, 2, -1, 0.33333333333333326, 0, 0, 1, 1),
      p(1, 2, -0.3425497314639411, -27501607956947893e-21, 0, 0, 1, 1),
      p(2, 2, 0.3321437945812673, 0.1981776353859399, 0, 0, 1, 1),
      p(3, 2, 1, 0.0766118180296832, 0, 0, 1, 1),
      p(0, 3, -1, 1, 0, 0, 1, 1),
      p(1, 3, -0.33333333333333337, 1, 0, 0, 1, 1),
      p(2, 3, 0.33333333333333326, 1, 0, 0, 1, 1),
      p(3, 3, 1, 1, 0, 0, 1, 1)
    ]),
    preset(4, 4, [
      p(0, 0, -1, -1, 0, 0, 1, 2.075),
      p(1, 0, -0.33333333333333337, -1, 0, 0, 1, 1),
      p(2, 0, 0.33333333333333326, -1, 0, 0, 1, 1),
      p(3, 0, 1, -1, 0, 0, 1, 1),
      p(0, 1, -1, -0.4545779491139603, 0, 0, 1, 1),
      p(1, 1, -0.33333333333333337, -0.33333333333333337, 0, 0, 1, 1),
      p(2, 1, 0.0889403142626457, -0.6025711180694033, -32, 45, 1, 1),
      p(3, 1, 1, -0.33333333333333337, 0, 0, 1, 1),
      p(0, 2, -1, -0.07402408608567845, 1, 0, 1, 0.094),
      p(1, 2, -0.2719422694359541, 0.09775369930903222, 25, -18, 1.321, 0),
      p(2, 2, 0.19877414408395877, 0.4307383294587789, 48, -40, 0.755, 0.975),
      p(3, 2, 1, 0.33333333333333326, -37, 0, 1, 1),
      p(0, 3, -1, 1, 0, 0, 1, 1),
      p(1, 3, -0.33333333333333337, 1, 0, 0, 1, 1),
      p(2, 3, 0.5125850864305672, 1, -20, -18, 0, 1.604),
      p(3, 3, 1, 1, 0, 0, 1, 1)
    ]),
    preset(5, 5, [
      p(0, 0, -1, -1, 0, 0, 1, 1),
      p(1, 0, -0.4501953125, -1, 0, 55, 1, 2.075),
      p(2, 0, 0.1953125, -1, 0, 0, 1, 1),
      p(3, 0, 0.4580078125, -1, 0, -25, 1, 1),
      p(4, 0, 1, -1, 0, 0, 1, 1),
      p(0, 1, -1, -0.2514475377525607, -16, 0, 2.327, 0.943),
      p(1, 1, -0.55859375, -0.6609325945787148, 47, 0, 2.358, 0.377),
      p(2, 1, 0.232421875, -0.5244375756366635, -66, -25, 1.855, 1.164),
      p(3, 1, 0.685546875, -0.3753706470552125, 0, 0, 1, 1),
      p(4, 1, 1, -0.6699125300354287, 0, 0, 1, 1),
      p(0, 2, -1, 0.035910396862284255, 0, 0, 1, 1),
      p(1, 2, -0.4921875, 0.005378616309457018, 90, 23, 1, 1.981),
      p(2, 2, 0.021484375, -0.1365043639066228, 0, 42, 1, 1),
      p(3, 2, 0.4765625, 0.05925822904974043, -30, 0, 1.95, 0.44),
      p(4, 2, 1, 0.251428847823418, 0, 0, 1, 1),
      p(0, 3, -1, 0.6968336464764276, -68, 0, 1, 0.786),
      p(1, 3, -0.6904296875, 0.5890744209958608, -68, 0, 1, 1),
      p(2, 3, 0.1845703125, 0.3879238667654693, 61, 0, 1, 1),
      p(3, 3, 0.60546875, 0.4633553246018661, -47, -59, 0.849, 1.73),
      p(4, 3, 1, 0.6214021886400309, -33, 0, 0.377, 1.604),
      p(0, 4, -1, 1, 0, 0, 1, 1),
      p(1, 4, -0.5, 1, 0, -73, 1, 1),
      p(2, 4, -0.3271484375, 1, 0, -24, 0.314, 2.704),
      p(3, 4, 0.5, 1, 0, 0, 1, 1),
      p(4, 4, 1, 1, 0, 0, 1, 1)
    ]),
    preset(5, 5, [
      p(0, 0, -1, -1),
      p(1, 0, -0.6393, -1, 0, 0, 1, 2.3884),
      p(2, 0, 0, -1),
      p(3, 0, 0.5, -1),
      p(4, 0, 1, -1),
      p(0, 1, -1, -0.2301),
      p(1, 1, -0.6934, -0.331, 0, -0.7188, 1, 1.063),
      p(2, 1, -82e-4, -0.6814, -0.2583, 0, 1.0964, 1),
      p(3, 1, 0.5836, -0.531, 0.7029, 0, 1.5466, 1),
      p(4, 1, 1, -0.6407),
      p(0, 2, -1, 0.2973, 0, 0, 1.8352, 1),
      p(1, 2, -0.4082, 0.0602),
      p(2, 2, -0.1803, -0.3646, -0.2998, 0, 1.1513, 1),
      p(3, 2, 0.477, -0.1027, 0.8903, -0.1882, 1.0807, 0.8551),
      p(4, 2, 1, -0.2973),
      p(0, 3, -1, 0.7628, 0, 0, 2.3868, 1),
      p(1, 3, -0.2525, 0.4814, -0.8406, -1.6199, 1.4093, 1.2215),
      p(2, 3, 0.3607, 0.2814, -1.0713, -0.0529, 1.0025, 0.7611),
      p(3, 3, 0.4885, 0.623, 0, 0.8184, 1, 1.2876),
      p(4, 3, 1, 0.5),
      p(0, 4, -1, 1),
      p(1, 4, -0.4033, 1),
      p(2, 4, 0.2672, 1),
      p(3, 4, 0.5967, 1),
      p(4, 4, 1, 1)
    ]),
    preset(5, 5, [
      p(0, 0, -1, -1),
      p(1, 0, -0.2197, -1),
      p(2, 0, 0.0197, -1),
      p(3, 0, 0.8033, -1),
      p(4, 0, 1, -1),
      p(0, 1, -1, -0.5451),
      p(1, 1, -0.4885, -0.4035, -1.0246, -0.2268, 1.1936, 0.8005),
      p(2, 1, -0.1213, -0.2867, 0, -0.6981, 1, 0.809),
      p(3, 1, 0.3246, -0.5628, 0, -1.2188, 1, 1.044),
      p(4, 1, 1, -0.3292),
      p(0, 2, -1, 0.1416),
      p(1, 2, -0.341, -0.0142, 0, -0.4004, 1, 1.1293),
      p(2, 2, -0.0393, -0.023, 0.2915, -0.373, 1.044, 0.9879),
      p(3, 2, 0.3148, -0.0673, -0.7853, -0.8962, 1.4709, 1.0247),
      p(4, 2, 1, 0.1912),
      p(0, 3, -1, 0.5),
      p(1, 3, -0.2689, 0.2743, 0.3404, -0.5248, 1.0184, 0.4391),
      p(2, 3, 0.0721, 0.269, 0.5302, 0.1244, 0.6723, 0.3225),
      p(3, 3, 0.4148, 0.3894, -0.6977, -0.6783, 0.8094, 0.9247),
      p(4, 3, 1, 0.446),
      p(0, 4, -1, 1),
      p(1, 4, -0.7311, 1),
      p(2, 4, 0.323, 1),
      p(3, 4, 0.6393, 1),
      p(4, 4, 1, 1)
    ])
  ];
  var randomRange = (min, max) => Math.random() * (max - min) + min;
  function smoothstep(edge0, edge1, x) {
    const t = clamp01((x - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
  }
  function smoothifyControlPoints(conf, w, h, iterations = 2, factor = 0.5, factorIterationModifier = 0.1) {
    let grid = [];
    let f = factor;
    for (let j = 0; j < h; j++) {
      grid[j] = [];
      for (let i = 0; i < w; i++) grid[j][i] = conf[j * w + i];
    }
    const kernel = [
      [
        1,
        2,
        1
      ],
      [
        2,
        4,
        2
      ],
      [
        1,
        2,
        1
      ]
    ];
    const kernelSum = 16;
    for (let iter = 0; iter < iterations; iter++) {
      const newGrid = [];
      for (let j = 0; j < h; j++) {
        newGrid[j] = [];
        for (let i = 0; i < w; i++) {
          if (i === 0 || i === w - 1 || j === 0 || j === h - 1) {
            newGrid[j][i] = grid[j][i];
            continue;
          }
          let sumX = 0;
          let sumY = 0;
          let sumUR = 0;
          let sumVR = 0;
          let sumUP = 0;
          let sumVP = 0;
          for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
            const weight = kernel[dj + 1][di + 1];
            const nb = grid[j + dj][i + di];
            sumX += nb.x * weight;
            sumY += nb.y * weight;
            sumUR += nb.ur * weight;
            sumVR += nb.vr * weight;
            sumUP += nb.up * weight;
            sumVP += nb.vp * weight;
          }
          const avgX = sumX / kernelSum;
          const avgY = sumY / kernelSum;
          const avgUR = sumUR / kernelSum;
          const avgVR = sumVR / kernelSum;
          const avgUP = sumUP / kernelSum;
          const avgVP = sumVP / kernelSum;
          const cur = grid[j][i];
          const newX = cur.x * (1 - f) + avgX * f;
          const newY = cur.y * (1 - f) + avgY * f;
          const newUR = cur.ur * (1 - f) + avgUR * f;
          const newVR = cur.vr * (1 - f) + avgVR * f;
          const newUP = cur.up * (1 - f) + avgUP * f;
          const newVP = cur.vp * (1 - f) + avgVP * f;
          newGrid[j][i] = p(i, j, newX, newY, newUR, newVR, newUP, newVP);
        }
      }
      grid = newGrid;
      f = clamp01(f + factorIterationModifier);
    }
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) conf[j * w + i] = grid[j][i];
  }
  function noise(x, y) {
    return fract(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453);
  }
  function fract(x) {
    return x - Math.floor(x);
  }
  function smoothNoise(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    const xf = x - x0;
    const yf = y - y0;
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const n00 = noise(x0, y0);
    const n10 = noise(x1, y0);
    const n01 = noise(x0, y1);
    const n11 = noise(x1, y1);
    const nx0 = n00 * (1 - u) + n10 * u;
    const nx1 = n01 * (1 - u) + n11 * u;
    return nx0 * (1 - v) + nx1 * v;
  }
  function computeNoiseGradient(perlinFn, x, y, epsilon = 1e-3) {
    const n1 = perlinFn(x + epsilon, y);
    const n2 = perlinFn(x - epsilon, y);
    const n3 = perlinFn(x, y + epsilon);
    const n4 = perlinFn(x, y - epsilon);
    const dx = (n1 - n2) / (2 * epsilon);
    const dy = (n3 - n4) / (2 * epsilon);
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return [dx / len, dy / len];
  }
  function generateControlPoints(width, height, variationFraction = randomRange(0.4, 0.6), normalOffset = randomRange(0.3, 0.6), blendFactor = 0.8, smoothIters = Math.floor(randomRange(3, 5)), smoothFactor = randomRange(0.2, 0.3), smoothModifier = randomRange(-0.1, -0.05)) {
    const w = width ?? Math.floor(randomRange(3, 6));
    const h = height ?? Math.floor(randomRange(3, 6));
    const conf = [];
    const dx = w === 1 ? 0 : 2 / (w - 1);
    const dy = h === 1 ? 0 : 2 / (h - 1);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const baseX = (w === 1 ? 0 : i / (w - 1)) * 2 - 1;
      const baseY = (h === 1 ? 0 : j / (h - 1)) * 2 - 1;
      const isBorder = i === 0 || i === w - 1 || j === 0 || j === h - 1;
      const pertX = isBorder ? 0 : randomRange(-variationFraction * dx, variationFraction * dx);
      const pertY = isBorder ? 0 : randomRange(-variationFraction * dy, variationFraction * dy);
      let x = baseX + pertX;
      let y = baseY + pertY;
      const ur = isBorder ? 0 : randomRange(-60, 60);
      const vr = isBorder ? 0 : randomRange(-60, 60);
      const up = isBorder ? 1 : randomRange(0.8, 1.2);
      const vp = isBorder ? 1 : randomRange(0.8, 1.2);
      if (!isBorder) {
        const uNorm = (baseX + 1) / 2;
        const vNorm = (baseY + 1) / 2;
        const [nx, ny] = computeNoiseGradient(smoothNoise, uNorm, vNorm, 1e-3);
        let offsetX = nx * normalOffset;
        let offsetY = ny * normalOffset;
        const weight = smoothstep(0, 1, Math.min(uNorm, 1 - uNorm, vNorm, 1 - vNorm));
        offsetX *= weight;
        offsetY *= weight;
        x = x * (1 - blendFactor) + (x + offsetX) * blendFactor;
        y = y * (1 - blendFactor) + (y + offsetY) * blendFactor;
      }
      conf.push(p(i, j, x, y, ur, vr, up, vp));
    }
    smoothifyControlPoints(conf, w, h, smoothIters, smoothFactor, smoothModifier);
    return preset(w, h, conf);
  }
  var mesh_frag_default = "precision mediump float;\n\nvarying vec3 v_color;\nvarying vec2 v_uv;\nuniform sampler2D u_texture;\nuniform float u_volume;\nuniform float u_alpha;\nuniform float u_sinAngle;\nuniform float u_cosAngle;\n\n// \u9884\u8BA1\u7B97\u5E38\u91CF\nconst float INV_255 = 1.0 / 255.0;\nconst float HALF_INV_255 = 0.5 / 255.0;\nconst float GRADIENT_NOISE_A = 52.9829189;\nconst vec2 GRADIENT_NOISE_B = vec2(0.06711056, 0.00583715);\n\nfloat gradientNoise(in vec2 uv) {\n    return fract(GRADIENT_NOISE_A * fract(dot(uv, GRADIENT_NOISE_B)));\n}\n\nvoid main() {\n    float volumeEffect = u_volume * 2.0;\n\n    float dither = INV_255 * gradientNoise(gl_FragCoord.xy) - HALF_INV_255;\n\n    vec2 centeredUV = v_uv - vec2(0.2);\n\n    vec2 rotatedUV = vec2(\n        u_cosAngle * centeredUV.x - u_sinAngle * centeredUV.y,\n        u_sinAngle * centeredUV.x + u_cosAngle * centeredUV.y\n    );\n\n    vec2 finalUV = rotatedUV * max(0.001, 1.0 - volumeEffect) + vec2(0.5);\n    \n    vec4 result = texture2D(u_texture, finalUV);\n    \n    float alphaVolumeFactor = u_alpha * max(0.5, 1.0 - u_volume * 0.5);\n    result.rgb *= v_color * alphaVolumeFactor;\n    result.a *= alphaVolumeFactor;\n    \n    result.rgb += vec3(dither);\n    \n    float dist = distance(v_uv, vec2(0.5));\n    float vignette = smoothstep(0.8, 0.3, dist);\n    float mask = 0.6 + vignette * 0.4;\n    result.rgb *= mask;\n    \n    gl_FragColor = result;\n}\n";
  var mesh_vert_default = "precision mediump float;\n\nattribute vec2 a_pos;\nattribute vec3 a_color;\nattribute vec2 a_uv;\nvarying vec3 v_color;\nvarying vec2 v_uv;\n\nuniform float u_aspect;\n\nvoid main() {\n    v_color = a_color;\n    v_uv = a_uv;\n    vec2 pos = a_pos;\n    if (u_aspect > 1.0) {\n        pos.y *= u_aspect;\n    } else {\n        pos.x /= u_aspect;\n    }\n    gl_Position = vec4(pos, 0.0, 1.0);\n}\n";
  var quadVertShader = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
    v_uv = a_pos * 0.5 + 0.5;
}
`;
  var quadFragShader = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_texture;
uniform float u_alpha;
void main() {
    vec4 color = texture2D(u_texture, v_uv);
    gl_FragColor = vec4(color.rgb, color.a * u_alpha);
}
`;
  function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
  var Mesh = class {
    gl;
    attrPos;
    attrColor;
    attrUV;
    vertexWidth = 0;
    vertexHeight = 0;
    vertexBuffer;
    indexBuffer;
    vertexData;
    indexData;
    vertexIndexLength = 0;
    wireFrame = false;
    constructor(gl, attrPos, attrColor, attrUV) {
      this.gl = gl;
      this.attrPos = attrPos;
      this.attrColor = attrColor;
      this.attrUV = attrUV;
      const vertexBuf = gl.createBuffer();
      if (!vertexBuf) throw new Error("Failed to create vertex buffer");
      this.vertexBuffer = vertexBuf;
      const indexBuf = gl.createBuffer();
      if (!indexBuf) throw new Error("Failed to create index buffer");
      this.indexBuffer = indexBuf;
      this.bind();
      this.vertexData = /* @__PURE__ */ new Float32Array(0);
      this.indexData = /* @__PURE__ */ new Uint16Array(0);
      this.resize(2, 2);
      this.update();
    }
    setWireFrame(enable) {
      this.wireFrame = enable;
      this.resize(this.vertexWidth, this.vertexHeight);
    }
    setVertexPos(vx, vy, x, y) {
      const idx = (vx + vy * this.vertexWidth) * 7;
      if (idx >= this.vertexData.length - 1) {
        console.warn("Vertex position out of range", idx, this.vertexData.length);
        return;
      }
      this.vertexData[idx] = x;
      this.vertexData[idx + 1] = y;
    }
    setVertexColor(vx, vy, r, g, b) {
      const idx = (vx + vy * this.vertexWidth) * 7 + 2;
      if (idx >= this.vertexData.length - 2) {
        console.warn("Vertex color out of range", idx, this.vertexData.length);
        return;
      }
      this.vertexData[idx] = r;
      this.vertexData[idx + 1] = g;
      this.vertexData[idx + 2] = b;
    }
    setVertexUV(vx, vy, x, y) {
      const idx = (vx + vy * this.vertexWidth) * 7 + 5;
      if (idx >= this.vertexData.length - 1) {
        console.warn("Vertex UV out of range", idx, this.vertexData.length);
        return;
      }
      this.vertexData[idx] = x;
      this.vertexData[idx + 1] = y;
    }
    setVertexData(vx, vy, x, y, r, g, b, u, v) {
      const idx = (vx + vy * this.vertexWidth) * 7;
      if (idx >= this.vertexData.length - 6) {
        console.warn("Vertex data out of range", idx, this.vertexData.length);
        return;
      }
      const data = this.vertexData;
      data[idx] = x;
      data[idx + 1] = y;
      data[idx + 2] = r;
      data[idx + 3] = g;
      data[idx + 4] = b;
      data[idx + 5] = u;
      data[idx + 6] = v;
    }
    getVertexIndexLength() {
      return this.vertexIndexLength;
    }
    draw() {
      const gl = this.gl;
      if (this.wireFrame) gl.drawElements(gl.LINES, this.vertexIndexLength, gl.UNSIGNED_SHORT, 0);
      else gl.drawElements(gl.TRIANGLES, this.vertexIndexLength, gl.UNSIGNED_SHORT, 0);
    }
    resize(vertexWidth, vertexHeight) {
      this.vertexWidth = vertexWidth;
      this.vertexHeight = vertexHeight;
      this.vertexIndexLength = vertexWidth * vertexHeight * 6;
      if (this.wireFrame) this.vertexIndexLength = vertexWidth * vertexHeight * 10;
      const vertexData = new Float32Array(vertexWidth * vertexHeight * 7);
      const indexData = new Uint16Array(this.vertexIndexLength);
      this.vertexData = vertexData;
      this.indexData = indexData;
      for (let y = 0; y < vertexHeight; y++) for (let x = 0; x < vertexWidth; x++) {
        const px = x / (vertexWidth - 1) * 2 - 1;
        const py = y / (vertexHeight - 1) * 2 - 1;
        this.setVertexPos(x, y, px || 0, py || 0);
        this.setVertexColor(x, y, 1, 1, 1);
        this.setVertexUV(x, y, x / (vertexWidth - 1), y / (vertexHeight - 1));
      }
      for (let y = 0; y < vertexHeight - 1; y++) for (let x = 0; x < vertexWidth - 1; x++) if (this.wireFrame) {
        const idx = (y * vertexWidth + x) * 10;
        indexData[idx] = y * vertexWidth + x;
        indexData[idx + 1] = y * vertexWidth + x + 1;
        indexData[idx + 2] = y * vertexWidth + x + 1;
        indexData[idx + 3] = (y + 1) * vertexWidth + x;
        indexData[idx + 4] = (y + 1) * vertexWidth + x;
        indexData[idx + 5] = (y + 1) * vertexWidth + x + 1;
        indexData[idx + 6] = (y + 1) * vertexWidth + x + 1;
        indexData[idx + 7] = y * vertexWidth + x + 1;
        indexData[idx + 8] = y * vertexWidth + x;
        indexData[idx + 9] = (y + 1) * vertexWidth + x;
      } else {
        const idx = (y * vertexWidth + x) * 6;
        indexData[idx] = y * vertexWidth + x;
        indexData[idx + 1] = y * vertexWidth + x + 1;
        indexData[idx + 2] = (y + 1) * vertexWidth + x;
        indexData[idx + 3] = y * vertexWidth + x + 1;
        indexData[idx + 4] = (y + 1) * vertexWidth + x + 1;
        indexData[idx + 5] = (y + 1) * vertexWidth + x;
      }
      const gl = this.gl;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexData, gl.STATIC_DRAW);
    }
    bind() {
      const gl = this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      if (this.attrPos !== void 0) {
        gl.vertexAttribPointer(this.attrPos, 2, gl.FLOAT, false, 28, 0);
        gl.enableVertexAttribArray(this.attrPos);
      }
      if (this.attrColor !== void 0) {
        gl.vertexAttribPointer(this.attrColor, 3, gl.FLOAT, false, 28, 8);
        gl.enableVertexAttribArray(this.attrColor);
      }
      if (this.attrUV !== void 0) {
        gl.vertexAttribPointer(this.attrUV, 2, gl.FLOAT, false, 28, 20);
        gl.enableVertexAttribArray(this.attrUV);
      }
    }
    update() {
      const gl = this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertexData, gl.DYNAMIC_DRAW);
    }
    dispose() {
      this.gl.deleteBuffer(this.vertexBuffer);
      this.gl.deleteBuffer(this.indexBuffer);
    }
  };
  var ControlPoint = class {
    color = Vec3.fromValues(1, 1, 1);
    location = Vec2.fromValues(0, 0);
    uTangent = Vec2.fromValues(0, 0);
    vTangent = Vec2.fromValues(0, 0);
    _uRot = 0;
    _vRot = 0;
    _uScale = 1;
    _vScale = 1;
    constructor() {
      Object.seal(this);
    }
    get uRot() {
      return this._uRot;
    }
    get vRot() {
      return this._vRot;
    }
    set uRot(value) {
      this._uRot = value;
      this.updateUTangent();
    }
    set vRot(value) {
      this._vRot = value;
      this.updateVTangent();
    }
    get uScale() {
      return this._uScale;
    }
    get vScale() {
      return this._vScale;
    }
    set uScale(value) {
      this._uScale = value;
      this.updateUTangent();
    }
    set vScale(value) {
      this._vScale = value;
      this.updateVTangent();
    }
    updateUTangent() {
      this.uTangent[0] = Math.cos(this._uRot) * this._uScale;
      this.uTangent[1] = Math.sin(this._uRot) * this._uScale;
    }
    updateVTangent() {
      this.vTangent[0] = -Math.sin(this._vRot) * this._vScale;
      this.vTangent[1] = Math.cos(this._vRot) * this._vScale;
    }
  };
  var H = Mat4.fromValues(2, -2, 1, 1, -3, 3, -2, -1, 0, 0, 1, 0, 1, 0, 0, 0);
  var H_T = Mat4.clone(H).transpose();
  function meshCoefficients(p00, p01, p10, p11, axis, output = Mat4.create()) {
    const l = (p2) => p2.location[axis];
    const u = (p2) => p2.uTangent[axis];
    const v = (p2) => p2.vTangent[axis];
    output[0] = l(p00);
    output[1] = l(p01);
    output[2] = v(p00);
    output[3] = v(p01);
    output[4] = l(p10);
    output[5] = l(p11);
    output[6] = v(p10);
    output[7] = v(p11);
    output[8] = u(p00);
    output[9] = u(p01);
    output[10] = 0;
    output[11] = 0;
    output[12] = u(p10);
    output[13] = u(p11);
    output[14] = 0;
    output[15] = 0;
    return output;
  }
  function colorCoefficients(p00, p01, p10, p11, axis, output = Mat4.create()) {
    const c = (p2) => p2.color[axis];
    output.fill(0);
    output[0] = c(p00);
    output[1] = c(p01);
    output[4] = c(p10);
    output[5] = c(p11);
    return output;
  }
  var Map2D = class {
    _width = 0;
    _height = 0;
    _data = [];
    constructor(width, height) {
      this.resize(width, height);
      Object.seal(this);
    }
    resize(width, height) {
      this._width = width;
      this._height = height;
      this._data = new Array(width * height).fill(0);
    }
    set(x, y, value) {
      this._data[x + y * this._width] = value;
    }
    get(x, y) {
      return this._data[x + y * this._width];
    }
    get width() {
      return this._width;
    }
    get height() {
      return this._height;
    }
  };
  var BHPMesh = class extends Mesh {
    /**
    * 细分级别，越大曲线越平滑，但是性能消耗也越大
    */
    _subDivisions = 10;
    _controlPoints = new Map2D(3, 3);
    constructor(gl, attrPos, attrColor, attrUV) {
      super(gl, attrPos, attrColor, attrUV);
      this.resizeControlPoints(3, 3);
      Object.seal(this);
    }
    setWireFrame(enable) {
      super.setWireFrame(enable);
      this.updateMesh();
    }
    /**
    * 以当前的控制点矩阵大小和细分级别为参考重新设置细分级别，此操作不会重设控制点数据
    * @param subDivisions 细分级别
    */
    resetSubdivition(subDivisions) {
      this._subDivisions = subDivisions;
      super.resize((this._controlPoints.width - 1) * subDivisions, (this._controlPoints.height - 1) * subDivisions);
    }
    /**
    * 重设控制点矩阵尺寸，将会重置所有控制点的颜色和坐标数据
    * 请在调用此方法后重新设置颜色和坐标，并调用 updateMesh 方法更新网格
    * @param width 控制点宽度数量，必须大于等于 2
    * @param height 控制点高度数量，必须大于等于 2
    */
    resizeControlPoints(width, height) {
      if (!(width >= 2 && height >= 2)) throw new Error("Control points must be larger than 3x3 or equal");
      this._controlPoints.resize(width, height);
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const point = new ControlPoint();
        point.location.x = x / (width - 1) * 2 - 1;
        point.location.y = y / (height - 1) * 2 - 1;
        point.uTangent.x = 2 / (width - 1);
        point.vTangent.y = 2 / (height - 1);
        this._controlPoints.set(x, y, point);
      }
      this.resetSubdivition(this._subDivisions);
    }
    /**
    * 获取指定位置的控制点，然后可以设置颜色和坐标属性
    * 留意颜色属性和坐标属性的值范围均参考 WebGL 的定义
    * 即颜色各个组件取值 [0-1]，坐标取值 [-1, 1]
    * 点的位置以画面左下角为原点 (0,0)
    * @param x 需要获取的控制点的 x 坐标
    * @param y 需要获取的控制点的 y 坐标
    * @returns 控制点对象
    */
    getControlPoint(x, y) {
      return this._controlPoints.get(x, y);
    }
    tempX = Mat4.create();
    tempY = Mat4.create();
    tempR = Mat4.create();
    tempG = Mat4.create();
    tempB = Mat4.create();
    tempXAcc = Mat4.create();
    tempYAcc = Mat4.create();
    tempRAcc = Mat4.create();
    tempGAcc = Mat4.create();
    tempBAcc = Mat4.create();
    tempUx = Vec4.create();
    tempUy = Vec4.create();
    tempUr = Vec4.create();
    tempUg = Vec4.create();
    tempUb = Vec4.create();
    precomputeMatrix(M, output) {
      output.copy(M).transpose();
      Mat4.mul(output, output, H);
      Mat4.mul(output, H_T, output);
      return output;
    }
    /**
    * 更新最终呈现的网格数据，此方法应在所有控制点或细分参数的操作完成后调用
    */
    updateMesh() {
      const subDivM1 = this._subDivisions - 1;
      const tW = subDivM1 * (this._controlPoints.height - 1);
      const tH = subDivM1 * (this._controlPoints.width - 1);
      const controlPointsWidth = this._controlPoints.width;
      const controlPointsHeight = this._controlPoints.height;
      const subDivisions = this._subDivisions;
      const invSubDivM1 = 1 / subDivM1;
      const invTH = 1 / tH;
      const invTW = 1 / tW;
      const normPowers = new Float32Array(subDivisions * 4);
      for (let i = 0; i < subDivisions; i++) {
        const norm = i * invSubDivM1;
        const idx = i * 4;
        normPowers[idx] = norm ** 3;
        normPowers[idx + 1] = norm ** 2;
        normPowers[idx + 2] = norm;
        normPowers[idx + 3] = 1;
      }
      for (let x = 0; x < controlPointsWidth - 1; x++) for (let y = 0; y < controlPointsHeight - 1; y++) {
        const p00 = this._controlPoints.get(x, y);
        const p01 = this._controlPoints.get(x, y + 1);
        const p10 = this._controlPoints.get(x + 1, y);
        const p11 = this._controlPoints.get(x + 1, y + 1);
        meshCoefficients(p00, p01, p10, p11, "x", this.tempX);
        meshCoefficients(p00, p01, p10, p11, "y", this.tempY);
        colorCoefficients(p00, p01, p10, p11, "r", this.tempR);
        colorCoefficients(p00, p01, p10, p11, "g", this.tempG);
        colorCoefficients(p00, p01, p10, p11, "b", this.tempB);
        this.precomputeMatrix(this.tempX, this.tempXAcc);
        this.precomputeMatrix(this.tempY, this.tempYAcc);
        this.precomputeMatrix(this.tempR, this.tempRAcc);
        this.precomputeMatrix(this.tempG, this.tempGAcc);
        this.precomputeMatrix(this.tempB, this.tempBAcc);
        const sX = x / (controlPointsWidth - 1);
        const sY = y / (controlPointsHeight - 1);
        const baseVx = y * subDivisions;
        const baseVy = x * subDivisions;
        for (let u = 0; u < subDivisions; u++) {
          const vxOffset = baseVx + u;
          const uIdx = u * 4;
          this.tempUx[0] = normPowers[uIdx];
          this.tempUx[1] = normPowers[uIdx + 1];
          this.tempUx[2] = normPowers[uIdx + 2];
          this.tempUx[3] = normPowers[uIdx + 3];
          Vec4.transformMat4(this.tempUx, this.tempUx, this.tempXAcc);
          this.tempUy[0] = normPowers[uIdx];
          this.tempUy[1] = normPowers[uIdx + 1];
          this.tempUy[2] = normPowers[uIdx + 2];
          this.tempUy[3] = normPowers[uIdx + 3];
          Vec4.transformMat4(this.tempUy, this.tempUy, this.tempYAcc);
          this.tempUr[0] = normPowers[uIdx];
          this.tempUr[1] = normPowers[uIdx + 1];
          this.tempUr[2] = normPowers[uIdx + 2];
          this.tempUr[3] = normPowers[uIdx + 3];
          Vec4.transformMat4(this.tempUr, this.tempUr, this.tempRAcc);
          this.tempUg[0] = normPowers[uIdx];
          this.tempUg[1] = normPowers[uIdx + 1];
          this.tempUg[2] = normPowers[uIdx + 2];
          this.tempUg[3] = normPowers[uIdx + 3];
          Vec4.transformMat4(this.tempUg, this.tempUg, this.tempGAcc);
          this.tempUb[0] = normPowers[uIdx];
          this.tempUb[1] = normPowers[uIdx + 1];
          this.tempUb[2] = normPowers[uIdx + 2];
          this.tempUb[3] = normPowers[uIdx + 3];
          Vec4.transformMat4(this.tempUb, this.tempUb, this.tempBAcc);
          for (let v = 0; v < subDivisions; v++) {
            const vy = baseVy + v;
            const vIdx = v * 4;
            const v0 = normPowers[vIdx];
            const v1 = normPowers[vIdx + 1];
            const v2 = normPowers[vIdx + 2];
            const v3 = normPowers[vIdx + 3];
            const px = v0 * this.tempUx[0] + v1 * this.tempUx[1] + v2 * this.tempUx[2] + v3 * this.tempUx[3];
            const py = v0 * this.tempUy[0] + v1 * this.tempUy[1] + v2 * this.tempUy[2] + v3 * this.tempUy[3];
            const pr = v0 * this.tempUr[0] + v1 * this.tempUr[1] + v2 * this.tempUr[2] + v3 * this.tempUr[3];
            const pg = v0 * this.tempUg[0] + v1 * this.tempUg[1] + v2 * this.tempUg[2] + v3 * this.tempUg[3];
            const pb = v0 * this.tempUb[0] + v1 * this.tempUb[1] + v2 * this.tempUb[2] + v3 * this.tempUb[3];
            const uvX = sX + v * invTH;
            const uvY = 1 - sY - u * invTW;
            this.setVertexData(vxOffset, vy, px, py, pr, pg, pb, uvX, uvY);
          }
        }
      }
      this.update();
    }
  };
  var GLTexture = class {
    gl;
    tex;
    constructor(gl, albumImageData) {
      this.gl = gl;
      const albumTexture = gl.createTexture();
      if (!albumTexture) throw new Error("Failed to create texture");
      this.tex = albumTexture;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, albumTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, albumImageData);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    }
    bind() {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex);
    }
    dispose() {
      this.gl.deleteTexture(this.tex);
    }
  };
  var MeshGradientRenderer = class extends BaseRenderer {
    /**
    * 当前环境是否支持此渲染器
    */
    static isSupported() {
      return isWebGL1Supported();
    }
    gl;
    contextLost = false;
    albumRequestId = 0;
    albumLoadController;
    lastImageData;
    lastFrameTime = 0;
    frameTime = 0;
    lastTickTime = 0;
    smoothedVolume = 0;
    volume = 0;
    tickHandle = 0;
    maxFPS = 60;
    paused = false;
    staticMode = false;
    mainProgram;
    quadProgram;
    quadBuffer;
    fbo = null;
    fboTexture = null;
    manualControl = false;
    reduceImageSizeCanvas = createOffscreenCanvas(32, 32);
    targetSize = Vec2.fromValues(0, 0);
    currentSize = Vec2.fromValues(0, 0);
    isNoCover = true;
    meshStates = [];
    _disposed = false;
    frameCount = 0;
    lastFPSUpdate = 0;
    currentFPS = 0;
    enablePerformanceMonitoring = false;
    isCurrentAlbumRequest(requestId) {
      return !this._disposed && !this.contextLost && requestId === this.albumRequestId;
    }
    initializeGLResources() {
      const gl = this.gl;
      if (!gl.getExtension("EXT_color_buffer_float")) console.warn("EXT_color_buffer_float not supported");
      if (!gl.getExtension("EXT_float_blend")) console.warn("EXT_float_blend not supported");
      if (!gl.getExtension("OES_texture_float_linear")) console.warn("OES_texture_float_linear not supported");
      if (!gl.getExtension("OES_texture_float")) console.warn("OES_texture_float not supported");
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.ALWAYS);
      this.mainProgram = new GLProgram(gl, mesh_vert_default, mesh_frag_default, "main-program-mg");
      this.quadProgram = new GLProgram(gl, quadVertShader, quadFragShader, "quad-program");
      const quadBuffer = gl.createBuffer();
      if (!quadBuffer) throw new Error("Failed to create quad buffer");
      this.quadBuffer = quadBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1,
        1
      ]), gl.STATIC_DRAW);
    }
    createMeshState(imageData) {
      const newMesh = new BHPMesh(this.gl, this.mainProgram.attrs.a_pos, this.mainProgram.attrs.a_color, this.mainProgram.attrs.a_uv);
      newMesh.resetSubdivition(50);
      const chosenPreset = Math.random() > 0.8 ? generateControlPoints(6, 6) : CONTROL_POINT_PRESETS[Math.floor(Math.random() * CONTROL_POINT_PRESETS.length)];
      newMesh.resizeControlPoints(chosenPreset.width, chosenPreset.height);
      const uPower = 2 / (chosenPreset.width - 1);
      const vPower = 2 / (chosenPreset.height - 1);
      for (const cp of chosenPreset.conf) {
        const p2 = newMesh.getControlPoint(cp.cx, cp.cy);
        p2.location.x = cp.x;
        p2.location.y = cp.y;
        p2.uRot = cp.ur * Math.PI / 180;
        p2.vRot = cp.vr * Math.PI / 180;
        p2.uScale = uPower * cp.up;
        p2.vScale = vPower * cp.vp;
      }
      newMesh.updateMesh();
      return {
        mesh: newMesh,
        texture: new GLTexture(this.gl, imageData),
        alpha: 0
      };
    }
    onContextLost = (event) => {
      event.preventDefault();
      this.contextLost = true;
      this.albumLoadController?.abort();
      if (this.tickHandle) {
        cancelAnimationFrame(this.tickHandle);
        this.tickHandle = 0;
      }
    };
    onContextRestored = () => {
      if (this._disposed) return;
      this.contextLost = false;
      this.meshStates = [];
      this.fbo = null;
      this.fboTexture = null;
      this.currentSize = Vec2.fromValues(0, 0);
      this.initializeGLResources();
      this.lastFrameTime = performance.now();
      this.isNoCover = !this.lastImageData;
      if (this.lastImageData) this.meshStates.push(this.createMeshState(this.lastImageData));
      this.requestTick();
    };
    setManualControl(enable) {
      this.manualControl = enable;
    }
    setWireFrame(enable) {
      for (const state of this.meshStates) state.mesh.setWireFrame(enable);
    }
    getControlPoint(x, y) {
      return this.meshStates[this.meshStates.length - 1]?.mesh?.getControlPoint(x, y);
    }
    resizeControlPoints(width, height) {
      this.meshStates[this.meshStates.length - 1]?.mesh?.resizeControlPoints(width, height);
    }
    resetSubdivition(subDivisions) {
      this.meshStates[this.meshStates.length - 1]?.mesh?.resetSubdivition(subDivisions);
    }
    onTick(tickTime) {
      this.tickHandle = 0;
      if (this.paused) return;
      if (this._disposed) return;
      if (this.contextLost) return;
      this.updatePerformanceStats(tickTime);
      const interval = 1e3 / this.maxFPS;
      const delta = tickTime - this.lastTickTime;
      if (delta < interval) {
        this.requestTick();
        return;
      }
      if (Number.isNaN(this.lastFrameTime)) this.lastFrameTime = tickTime;
      const frameDelta = tickTime - this.lastFrameTime;
      this.lastFrameTime = tickTime;
      this.lastTickTime = tickTime - delta % interval;
      this.frameTime += frameDelta * this.flowSpeed;
      if (!(this.onRedraw(this.frameTime, frameDelta) && this.staticMode)) this.requestTick();
      else if (this.staticMode) this.lastFrameTime = NaN;
    }
    checkIfResize() {
      const [tW, tH] = [this.targetSize.x, this.targetSize.y];
      const [cW, cH] = [this.currentSize.x, this.currentSize.y];
      if (tW !== cW || tH !== cH) {
        super.onResize(tW, tH);
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, tW, tH);
        this.currentSize.x = tW;
        this.currentSize.y = tH;
        if (tW > 0 && tH > 0) this.updateFBO(tW, tH);
      }
    }
    updateFBO(width, height) {
      const gl = this.gl;
      if (this.fbo) gl.deleteFramebuffer(this.fbo);
      if (this.fboTexture) gl.deleteTexture(this.fboTexture);
      this.fboTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.fboTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      this.fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.fboTexture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    onRedraw(tickTime, delta) {
      const latestMeshState = this.meshStates[this.meshStates.length - 1];
      let canBeStatic = false;
      const deltaFactor = delta / 500;
      if (latestMeshState) {
        latestMeshState.mesh.bind();
        if (this.manualControl) latestMeshState.mesh.updateMesh();
        if (this.isNoCover) {
          let hasActiveStates = false;
          for (let i = this.meshStates.length - 1; i >= 0; i--) {
            const state = this.meshStates[i];
            if (state.alpha <= -0.1) {
              state.mesh.dispose();
              state.texture.dispose();
              this.meshStates.splice(i, 1);
            } else {
              state.alpha = Math.max(-0.1, state.alpha - deltaFactor);
              hasActiveStates = true;
            }
          }
          canBeStatic = !hasActiveStates;
        } else {
          if (latestMeshState.alpha >= 1.1) {
            const deleted = this.meshStates.splice(0, this.meshStates.length - 1);
            for (const state of deleted) {
              state.mesh.dispose();
              state.texture.dispose();
            }
          } else latestMeshState.alpha = Math.min(1.1, latestMeshState.alpha + deltaFactor);
          canBeStatic = this.meshStates.length === 1 && latestMeshState.alpha >= 1.1;
        }
      }
      const gl = this.gl;
      this.checkIfResize();
      if (!this.fbo) return canBeStatic;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const lerpFactor = Math.min(1, delta / 100);
      this.smoothedVolume += (this.volume - this.smoothedVolume) * lerpFactor;
      for (const state of this.meshStates) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.disable(gl.BLEND);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.mainProgram.use();
        gl.activeTexture(gl.TEXTURE0);
        const uTime = tickTime / 1e4;
        this.mainProgram.setUniform1f("u_aspect", this.manualControl ? 1 : this.canvas.width / this.canvas.height);
        this.mainProgram.setUniform1i("u_texture", 0);
        this.mainProgram.setUniform1f("u_volume", this.volume);
        this.mainProgram.setUniform1f("u_alpha", 1);
        const angle = (uTime + this.volume) * 2;
        this.mainProgram.setUniform1f("u_sinAngle", Math.sin(angle));
        this.mainProgram.setUniform1f("u_cosAngle", Math.cos(angle));
        state.texture.bind();
        state.mesh.bind();
        state.mesh.draw();
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this.quadProgram.use();
        this.quadProgram.setUniform1i("u_texture", 0);
        this.quadProgram.setUniform1f("u_alpha", easeInOutSine(clamp01(state.alpha)));
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.fboTexture);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        const a_pos = this.quadProgram.attrs.a_pos;
        gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_pos);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.disableVertexAttribArray(a_pos);
      }
      gl.flush();
      return canBeStatic;
    }
    onTickBinded = this.onTick.bind(this);
    requestTick() {
      if (this._disposed) return;
      if (this.tickHandle === 0) this.tickHandle = requestAnimationFrame(this.onTickBinded);
    }
    constructor(canvas) {
      super(canvas);
      const gl = canvas.getContext("webgl", { antialias: true });
      if (!gl) throw new Error("WebGL not supported");
      this.gl = gl;
      this.initializeGLResources();
      canvas.addEventListener("webglcontextlost", this.onContextLost);
      canvas.addEventListener("webglcontextrestored", this.onContextRestored);
      this.requestTick();
    }
    onResize(width, height) {
      this.targetSize.x = Math.ceil(width);
      this.targetSize.y = Math.ceil(height);
      this.requestTick();
    }
    setStaticMode(enable) {
      this.staticMode = enable;
      this.lastFrameTime = performance.now();
      this.requestTick();
    }
    setFPS(fps) {
      this.maxFPS = fps;
    }
    pause() {
      if (this.tickHandle) {
        cancelAnimationFrame(this.tickHandle);
        this.tickHandle = 0;
      }
      this.paused = true;
    }
    resume() {
      this.paused = false;
      this.requestTick();
    }
    async setAlbum(albumSource, isVideo) {
      const requestId = ++this.albumRequestId;
      this.albumLoadController?.abort();
      const loadController = new AbortController();
      this.albumLoadController = loadController;
      if (albumSource === void 0 || typeof albumSource === "string" && albumSource.trim().length === 0) {
        this.isNoCover = true;
        this.lastImageData = void 0;
        return;
      }
      let res = null;
      let blob = null;
      let objectUrl;
      let remainRetryTimes = 5;
      while (!res && remainRetryTimes > 0) try {
        if (typeof albumSource === "string") {
          if (!isVideo && "createImageBitmap" in window) {
            blob = await (await fetch(albumSource, { signal: loadController.signal })).blob();
            if (!this.isCurrentAlbumRequest(requestId)) return;
            objectUrl = URL.createObjectURL(blob);
            res = await loadResourceFromUrl(objectUrl, false);
          } else res = await loadResourceFromUrl(albumSource, isVideo);
        } else res = await loadResourceFromElement(albumSource);
        if (!this.isCurrentAlbumRequest(requestId)) {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          return;
        }
      } catch (error) {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = void 0;
        }
        if (!this.isCurrentAlbumRequest(requestId)) return;
        console.warn(`failed on loading album resource, retrying (${remainRetryTimes})`, {
          albumSource,
          error
        });
        remainRetryTimes--;
      }
      if (!res) {
        if (!this.isCurrentAlbumRequest(requestId)) return;
        console.error("Failed to load album resource", albumSource);
        return;
      }
      const c = this.reduceImageSizeCanvas;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Failed to create canvas context");
      ctx.clearRect(0, 0, c.width, c.height);
      const imgw = res instanceof HTMLVideoElement ? res.videoWidth : res.naturalWidth;
      const imgh = res instanceof HTMLVideoElement ? res.videoHeight : res.naturalHeight;
      if (imgw * imgh === 0) throw new Error("Invalid image size");
      let bitmap = null;
      try {
        if ("createImageBitmap" in window) {
          if (blob) bitmap = await createImageBitmap(blob, {
            resizeWidth: c.width,
            resizeHeight: c.height,
            resizeQuality: "low"
          });
          else bitmap = await createImageBitmap(res, {
            resizeWidth: c.width,
            resizeHeight: c.height,
            resizeQuality: "low"
          });
        }
      } catch (e) {
        console.warn("createImageBitmap failed", e);
      }
      if (!this.isCurrentAlbumRequest(requestId)) {
        bitmap?.close();
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        return;
      }
      if (bitmap) {
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();
      } else ctx.drawImage(res, 0, 0, imgw, imgh, 0, 0, c.width, c.height);
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        r = (r - 128) * 0.4 + 128;
        g = (g - 128) * 0.4 + 128;
        b = (b - 128) * 0.4 + 128;
        const gray = r * 0.3 + g * 0.59 + b * 0.11;
        r = gray * -2 + r * 3;
        g = gray * -2 + g * 3;
        b = gray * -2 + b * 3;
        r = (r - 128) * 1.7 + 128;
        g = (g - 128) * 1.7 + 128;
        b = (b - 128) * 1.7 + 128;
        pixels[i] = r * 0.75;
        pixels[i + 1] = g * 0.75;
        pixels[i + 2] = b * 0.75;
      }
      blurImage(imageData, 2, 4);
      if (this.manualControl && this.meshStates.length > 0) {
        this.meshStates[0].texture.dispose();
        this.meshStates[0].texture = new GLTexture(this.gl, imageData);
      } else this.meshStates.push(this.createMeshState(imageData));
      this.isNoCover = false;
      this.lastImageData = imageData;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      this.requestTick();
    }
    setLowFreqVolume(volume) {
      this.volume = volume / 10;
    }
    setHasLyric(_hasLyric) {
    }
    dispose() {
      super.dispose();
      this.albumLoadController?.abort();
      this.canvas.removeEventListener("webglcontextlost", this.onContextLost);
      this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored);
      if (this.tickHandle) {
        cancelAnimationFrame(this.tickHandle);
        this.tickHandle = 0;
      }
      this._disposed = true;
      this.mainProgram.dispose();
      this.quadProgram.dispose();
      this.gl.deleteBuffer(this.quadBuffer);
      if (this.fbo) this.gl.deleteFramebuffer(this.fbo);
      if (this.fboTexture) this.gl.deleteTexture(this.fboTexture);
      for (const state of this.meshStates) {
        state.mesh.dispose();
        state.texture.dispose();
      }
    }
    enablePerformanceMonitor(enable) {
      this.enablePerformanceMonitoring = enable;
      if (enable) {
        this.frameCount = 0;
        this.lastFPSUpdate = performance.now();
      }
    }
    getCurrentFPS() {
      return this.currentFPS;
    }
    updatePerformanceStats(tickTime) {
      if (!this.enablePerformanceMonitoring) return;
      this.frameCount++;
      if (tickTime - this.lastFPSUpdate > 1e3) {
        this.currentFPS = this.frameCount;
        this.frameCount = 0;
        this.lastFPSUpdate = tickTime;
      }
    }
  };
  var BackgroundRender = class BackgroundRender2 {
    element;
    renderer;
    constructor(renderer, canvas) {
      this.renderer = renderer;
      this.element = canvas;
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "-1";
      canvas.style.contain = "strict";
    }
    /**
    * 获取被包装的渲染器实例。
    *
    * 各个渲染器有自己特有的可调项（例如 {@link IsolationRenderer.setOptions}），
    * 这些项没法通过统一的 `AbstractBaseRenderer` 接口下发，需要拿到实例本体。
    */
    getRenderer() {
      return this.renderer;
    }
    static new(type) {
      const newCanvas = document.createElement("canvas");
      return new BackgroundRender2(new type(newCanvas), newCanvas);
    }
    setRenderScale(scale) {
      this.renderer.setRenderScale(scale);
    }
    setFlowSpeed(speed) {
      this.renderer.setFlowSpeed(speed);
    }
    setStaticMode(enable) {
      this.renderer.setStaticMode(enable);
    }
    setFPS(fps) {
      this.renderer.setFPS(fps);
    }
    pause() {
      this.renderer.pause();
    }
    resume() {
      this.renderer.resume();
    }
    setLowFreqVolume(volume) {
      this.renderer.setLowFreqVolume(volume);
    }
    setHasLyric(hasLyric) {
      this.renderer.setHasLyric(hasLyric);
    }
    setAlbum(albumSource, isVideo) {
      return this.renderer.setAlbum(albumSource, isVideo);
    }
    getElement() {
      return this.element;
    }
    dispose() {
      this.renderer.dispose();
      this.element.remove();
    }
  };
  var toD = (ms) => ms;
  var toM = (ms) => ms;
  var toNum = (t) => t;
  var Duration = {
    ZERO: toD(0),
    fromMillis: (ms) => toD(ms),
    fromSecs: (s) => toD(s * 1e3),
    asMillis: (d) => toNum(d),
    asSecsF64: (d) => toNum(d) / 1e3,
    add: (a, b) => toD(toNum(a) + toNum(b)),
    sub: (a, b) => toD(toNum(a) - toNum(b)),
    saturatingSub: (a, b) => toD(Math.max(0, toNum(a) - toNum(b))),
    mulF64: (d, factor) => toD(toNum(d) * factor),
    divDuration: (a, b) => toNum(a) / toNum(b),
    min: (a, b) => a < b ? a : b,
    max: (a, b) => a > b ? a : b,
    clampPositive: (d) => toD(Math.max(0, toNum(d))),
    isZero: (d) => toNum(d) === 0,
    isFinite: (d) => Number.isFinite(toNum(d))
  };
  var MediaTime = {
    ZERO: toM(0),
    fromMillis: (ms) => toM(ms),
    asMillis: (t) => toNum(t),
    since: (a, b) => toD(toNum(a) - toNum(b)),
    saturatingSince: (a, b) => toD(Math.max(0, toNum(a) - toNum(b))),
    add: (t, d) => toM(toNum(t) + toNum(d)),
    sub: (t, d) => toM(toNum(t) - toNum(d)),
    min: (a, b) => a < b ? a : b,
    max: (a, b) => a > b ? a : b,
    cmp: (a, b) => toNum(a) - toNum(b),
    round: (t) => toM(Math.round(toNum(t)))
  };
  var MaskObsceneWordsMode = {
    /** 禁用任何不雅用语掩码 */
    Disabled: "",
    /** 完全掩码所有不雅用语 */
    FullMask: "full-mask",
    /** 保留首尾字符，屏蔽中间字符 */
    PartialMask: "partial-mask"
  };
  var LyricLineRenderMode = {
    SOLID: 0,
    GRADIENT: 1
  };
  var LayoutAlignAnchor = {
    Top: "top",
    Center: "center",
    Bottom: "bottom"
  };
  var LayoutReason = {
    /** 正常播放时间推进 */
    PlaybackTick: "playback-tick",
    /** 容器或窗口尺寸调整 */
    Resize: "resize",
    /** 用户交互挂起开始（触摸/滚轮触发） */
    InteractionStart: "interaction-start",
    /** 连续高频滚动（手指触摸滑动或松手后的 RAF 惯性滑动） */
    ContinuousScroll: "continuous-scroll",
    /** 离散单步滚动（鼠标滚轮单次滚动） */
    DiscreteScroll: "discrete-scroll",
    /** 跳转播放进度 */
    Seek: "seek",
    /** 重新构建歌词视图 */
    RebuildView: "rebuild-view",
    /** 视图结构或样式配置改变 */
    ConfigChange: "config-change"
  };
  var LayoutReasonStrategyMap = {
    [LayoutReason.PlaybackTick]: {
      disableStagger: false,
      resetInterlude: false,
      snapPosY: false
    },
    [LayoutReason.ContinuousScroll]: {
      disableStagger: true,
      resetInterlude: false,
      snapPosY: true
    },
    [LayoutReason.DiscreteScroll]: {
      disableStagger: true,
      resetInterlude: false,
      snapPosY: false
    },
    [LayoutReason.InteractionStart]: {
      disableStagger: true,
      resetInterlude: false,
      snapPosY: false
    },
    [LayoutReason.Seek]: {
      disableStagger: true,
      resetInterlude: true,
      snapPosY: false
    },
    [LayoutReason.RebuildView]: {
      disableStagger: true,
      resetInterlude: true,
      snapPosY: false
    },
    [LayoutReason.Resize]: {
      disableStagger: true,
      resetInterlude: false,
      snapPosY: false
    },
    [LayoutReason.ConfigChange]: {
      disableStagger: true,
      resetInterlude: false,
      snapPosY: false
    }
  };
  var MAX_FRAME_DELTA = Duration.fromMillis(100);
  var lyric_player_module_default = {
    "active": "FmKaba_active",
    "bgWrapper": "FmKaba_bgWrapper",
    "bgWrapperActive": "FmKaba_bgWrapperActive",
    "bgWrapperHidden": "FmKaba_bgWrapperHidden",
    "bgWrapperTop": "FmKaba_bgWrapperTop",
    "bottomLine": "FmKaba_bottomLine",
    "bottomLineWrapper": "FmKaba_bottomLineWrapper",
    "disableSpring": "FmKaba_disableSpring",
    "emphasize": "FmKaba_emphasize",
    "emphasizeWrapper": "FmKaba_emphasizeWrapper",
    "gradientMask": "FmKaba_gradientMask",
    "hasDuetLine": "FmKaba_hasDuetLine",
    "interludeDots": "FmKaba_interludeDots",
    "isDuetWrapper": "FmKaba_isDuetWrapper",
    "lyricBgLine": "FmKaba_lyricBgLine",
    "lyricDuetLine": "FmKaba_lyricDuetLine",
    "lyricLine": "FmKaba_lyricLine",
    "lyricLineWrapper": "FmKaba_lyricLineWrapper",
    "lyricMainLine": "FmKaba_lyricMainLine",
    "lyricSubLine": "FmKaba_lyricSubLine",
    "playing": "FmKaba_playing",
    "romanWord": "FmKaba_romanWord",
    "rubyBaseWord": "FmKaba_rubyBaseWord",
    "rubyWord": "FmKaba_rubyWord",
    "tmpDisableTransition": "FmKaba_tmpDisableTransition",
    "wordBody": "FmKaba_wordBody",
    "wordWithRuby": "FmKaba_wordWithRuby"
  };
  var DEFAULT_OPTIMIZE_OPTIONS = {
    normalizeSpaces: true,
    resetLineTimestamps: true,
    syncMainAndBackgroundLines: true,
    cleanUnintentionalOverlaps: true,
    tryAdvanceStartTime: true
  };
  function normalizeSpaces(lines) {
    for (const line of lines) for (const word of line.words) word.word = word.word.replace(/\s+/g, " ");
  }
  function resetLineTimestamps(lines) {
    for (const line of lines) if (line.words.length === 1 && line.words[0].startTime === 0 && line.words[0].endTime === 0 && (line.startTime !== 0 || line.endTime !== 0)) {
      line.words[0].startTime = line.startTime;
      line.words[0].endTime = line.endTime;
    } else if (line.words.length > 0) {
      const firstWord = line.words[0];
      const lastWord = line.words[line.words.length - 1];
      line.startTime = firstWord.startTime;
      line.endTime = lastWord.endTime;
    }
  }
  function convertExcessiveBackgroundLines(lines) {
    let consecutiveBgCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.isBG) {
        consecutiveBgCount++;
        if (i === 0 || consecutiveBgCount > 1) line.isBG = false;
      } else consecutiveBgCount = 0;
    }
  }
  function syncMainAndBackgroundLines(lines) {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (line.isBG) continue;
      const nextLine = lines[i + 1];
      if (nextLine?.isBG) {
        const allWords = [...line.words, ...nextLine.words].filter((w) => w.word.trim().length > 0);
        const finalStart = Math.min(line.startTime, nextLine.startTime, ...allWords.map((w) => w.startTime));
        const finalEnd = Math.max(line.endTime, nextLine.endTime, ...allWords.map((w) => w.endTime));
        line.startTime = finalStart;
        line.endTime = finalEnd;
        nextLine.startTime = finalStart;
        nextLine.endTime = finalEnd;
      }
    }
  }
  function sortLyricLines(lines) {
    const groups = [];
    for (let i = 0; i < lines.length; i++) {
      const mainLine = lines[i];
      const groupLines = [mainLine];
      if (!mainLine.isBG && lines[i + 1]?.isBG) groupLines.push(lines[++i]);
      groups.push({
        lines: groupLines,
        startTime: mainLine.startTime,
        originalIndex: groups.length
      });
    }
    groups.sort((a, b) => {
      return a.startTime - b.startTime || a.originalIndex - b.originalIndex;
    });
    let lineIndex = 0;
    for (const group of groups) for (const line of group.lines) lines[lineIndex++] = line;
  }
  function cleanUnintentionalOverlaps(lines, syncBackgroundLines) {
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i];
      if (line.isBG) continue;
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j];
        if (nextLine.isBG) continue;
        const overlap = line.endTime - nextLine.startTime;
        if (overlap <= 0) break;
        const percentageThreshold = (nextLine.endTime - nextLine.startTime) * 0.1;
        if (!(overlap >= 500 || overlap > 100 && overlap > percentageThreshold)) {
          line.endTime = nextLine.startTime;
          const attachedBgLine = lines[i + 1];
          if (syncBackgroundLines && attachedBgLine?.isBG) attachedBgLine.endTime = nextLine.startTime;
          break;
        }
      }
    }
  }
  function tryAdvanceStartTime(lines, syncBackgroundLines) {
    const defaultAdvanceAmount = 600;
    const fallbackAdvanceAmount = 400;
    const fallbackAdvanceRatio = 0.7;
    let prevLineStartTime = 0;
    let prevLineEndTime = 0;
    let prevMainGroupStartTime = 0;
    let prevMainGroupEndTime = 0;
    let hasPrevLine = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.isBG) continue;
      const originalStartTime = line.startTime;
      const originalEndTime = line.endTime;
      let targetAdvanceAmount = 0;
      let safeBoundary = 0;
      if (hasPrevLine) {
        if (originalStartTime >= prevLineEndTime) {
          targetAdvanceAmount = defaultAdvanceAmount;
          safeBoundary = prevMainGroupEndTime;
        } else {
          const overlapDuration = prevLineEndTime - originalStartTime;
          if (overlapDuration < fallbackAdvanceAmount) targetAdvanceAmount = overlapDuration * fallbackAdvanceRatio;
          else targetAdvanceAmount = fallbackAdvanceAmount;
          safeBoundary = prevLineStartTime;
        }
      } else {
        targetAdvanceAmount = defaultAdvanceAmount;
        safeBoundary = 0;
      }
      const targetTime = line.startTime - targetAdvanceAmount;
      const newStartTime = Math.max(safeBoundary, targetTime);
      if (newStartTime < line.startTime) line.startTime = newStartTime;
      const nextLine = lines[i + 1];
      if (syncBackgroundLines && nextLine?.isBG) nextLine.startTime = line.startTime;
      if (hasPrevLine) {
        if (originalStartTime < prevMainGroupEndTime && originalEndTime > prevMainGroupStartTime) {
          prevMainGroupStartTime = Math.min(prevMainGroupStartTime, originalStartTime);
          prevMainGroupEndTime = Math.max(prevMainGroupEndTime, originalEndTime);
        } else {
          prevMainGroupStartTime = originalStartTime;
          prevMainGroupEndTime = originalEndTime;
        }
      } else {
        prevMainGroupStartTime = originalStartTime;
        prevMainGroupEndTime = originalEndTime;
      }
      prevLineStartTime = line.startTime;
      prevLineEndTime = originalEndTime;
      hasPrevLine = true;
    }
  }
  function areOptimizeOptionsEqual(a = {}, b = {}) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) if (a[key] !== b[key]) return false;
    return true;
  }
  function optimizeLyricLines(lines, options) {
    const config = {
      ...DEFAULT_OPTIMIZE_OPTIONS,
      ...options
    };
    const syncBackgroundLines = config.syncMainAndBackgroundLines ?? true;
    if (config.normalizeSpaces) normalizeSpaces(lines);
    if (config.resetLineTimestamps) resetLineTimestamps(lines);
    convertExcessiveBackgroundLines(lines);
    if (syncBackgroundLines) syncMainAndBackgroundLines(lines);
    sortLyricLines(lines);
    if (config.cleanUnintentionalOverlaps) cleanUnintentionalOverlaps(lines, syncBackgroundLines);
    if (config.tryAdvanceStartTime) tryAdvanceStartTime(lines, syncBackgroundLines);
  }
  var FocusController = class {
    target = {
      type: "line",
      index: 0
    };
    /**
    * 推导本帧的对齐焦点，并将其记录为新的冻结目标
    * @param snapshot 当前帧的时间线快照
    * @param lineCount 当前歌词行总数
    * @param flags 播放器的交互状态
    */
    resolve(snapshot, lineCount, flags) {
      const nextTarget = flags.isAutoAlignSuspended ? this.resolveSuspendedTarget(snapshot, lineCount, flags) : this.resolveActiveTarget(snapshot, lineCount, flags);
      this.target = nextTarget;
      return nextTarget;
    }
    /**
    * 用户滚动挂起期间的焦点解析（维持上一帧目标或在间奏结束/不可用时顺延）
    */
    resolveSuspendedTarget(snapshot, lineCount, flags) {
      const target = this.target;
      switch (target.type) {
        case "line":
          return {
            type: "line",
            index: this.clampLineIndex(target.index, lineCount)
          };
        case "interlude":
          if (!(snapshot.isFocusOnInterlude && !!snapshot.activeInterlude && flags.canDisplayInterlude)) return {
            type: "line",
            index: this.clampLineIndex(target.anchorIndex + 1, lineCount)
          };
          return target;
        case "bottom":
          return target;
      }
    }
    /**
    * 正常播放状态下的自动焦点解析
    */
    resolveActiveTarget(snapshot, lineCount, flags) {
      if (snapshot.isFocusOnInterlude && snapshot.activeInterlude) {
        if (!flags.canDisplayInterlude) return {
          type: "line",
          index: this.clampLineIndex(snapshot.activeInterlude.anchorLineIndex + 1, lineCount)
        };
        return {
          type: "interlude",
          anchorIndex: snapshot.activeInterlude.anchorLineIndex
        };
      }
      if (snapshot.isEndOfSong) {
        if (flags.hasBottomContent) return { type: "bottom" };
        return {
          type: "line",
          index: this.clampLineIndex(lineCount - 1, lineCount)
        };
      }
      return {
        type: "line",
        index: this.clampLineIndex(snapshot.scrollToIndex, lineCount)
      };
    }
    /**
    * 将歌词行索引钳制到当前歌词范围内
    */
    clampLineIndex(index, lineCount) {
      if (lineCount <= 0) return 0;
      return Math.min(Math.max(0, index), lineCount - 1);
    }
    /**
    * 重置焦点至首行
    *
    * 一般在载入新歌词、重建歌词视图时调用
    */
    reset() {
      this.target = {
        type: "line",
        index: 0
      };
    }
  };
  var LayoutCalculator = class {
    /**
    * 前缀和缓存
    *
    * 长度为歌词行数 + 1
    *
    * prefixSums[i] 存储的是第 0 行到第 i-1 行的总高度，不包含间奏点
    */
    prefixSums = /* @__PURE__ */ new Float64Array(0);
    heights = /* @__PURE__ */ new Float64Array(0);
    /**
    * 使用 Uint8Array 作为掩码，1 表示该行经历了真实测量，0 表示该行在使用 fallback 高度
    */
    isMeasured = /* @__PURE__ */ new Uint8Array(0);
    /**
    * 渲染指令对象池
    *
    * 长度永远只会增加不会减少，避免 GC
    */
    instructionPool = [];
    isPrefixSumDirty = true;
    resolvedMetrics = {
      isValid: false,
      focalTopY: 0,
      anchorOffset: 0,
      interludeTotalHeight: 0,
      activeInterludeAnchor: void 0
    };
    /**
    * 全局唯一复用的返回结果实例
    */
    layoutResult = {
      lineCount: 0,
      lineInstructions: this.instructionPool,
      bottomLineY: 0,
      isBottomLineInViewport: false,
      hasInterlude: false,
      interludeY: 0
    };
    /**
    * 缓存的歌词行数
    */
    lyricCount = 0;
    /**
    * 缓存的所有歌词总高度
    */
    totalLyricHeight = 0;
    /**
    * 初始化排版空间结构与高度缓存
    *
    * 在加载新歌词时调用
    *
    * @param count 歌词总行数
    * @param defaultHeight 尚未渲染/测量的行的默认回退高度
    */
    initHeights(count, defaultHeight) {
      this.lyricCount = count;
      this.resetLayoutResult();
      if (this.prefixSums.length < count + 1) {
        this.prefixSums = new Float64Array(count + 1);
        this.heights = new Float64Array(count);
        this.isMeasured = new Uint8Array(count);
      } else this.prefixSums.fill(0);
      for (let i = 0; i < count; i++) {
        this.heights[i] = defaultHeight;
        this.isMeasured[i] = 0;
      }
      this.isPrefixSumDirty = true;
      const currentPoolSize = this.instructionPool.length;
      if (count > currentPoolSize) for (let i = currentPoolSize; i < count; i++) this.instructionPool.push({
        y: 0,
        height: 0,
        isInViewport: false
      });
    }
    /**
    * 获取指定索引歌词行的计算高度
    * @remarks 可能为测量值或估算值
    * @param index 歌词行索引
    */
    getLineHeight(index) {
      if (index < 0 || index >= this.lyricCount) return 0;
      this.ensurePrefixSums();
      return this.prefixSums[index + 1] - this.prefixSums[index];
    }
    /**
    * 设置单行歌词的真实测量高度
    * @param index 歌词行索引
    * @param height 真实测量的高度
    */
    setLineHeight(index, height) {
      if (index < 0 || index >= this.lyricCount) return;
      if (this.heights[index] !== height || this.isMeasured[index] === 0) {
        this.heights[index] = height;
        this.isMeasured[index] = 1;
        this.isPrefixSumDirty = true;
      }
    }
    /**
    * 批量更新所有未测量行的回退高度
    *
    * 仅在容器 Resize 等会导致回退基准（如 containerHeight / 5）发生变化时调用。
    * 已被真实测量的行不受影响。
    *
    * @param defaultHeight 新的默认回退高度
    */
    updateUnmeasuredHeights(defaultHeight) {
      let changed = false;
      for (let i = 0; i < this.lyricCount; i++) if (this.isMeasured[i] === 0 && this.heights[i] !== defaultHeight) {
        this.heights[i] = defaultHeight;
        changed = true;
      }
      if (changed) this.isPrefixSumDirty = true;
    }
    /**
    * 解析焦点度量并计算物理滚动边界
    *
    * 返回滚动安全闭区间 `{ min, max }` 以及此帧的生命周期会话句柄 {@link LayoutFrameSession}
    * 供后续使用 `ScrollInteractionEngine.updateBoundary` 钳制 `scrollOffset` 后传给 {@link commit}
    *
    * @param ctx 动态帧上下文，包含当前容器尺寸、焦点目标与底栏高度
    * @param config 布局静态配置，包含对齐锚点、相对位置与 Overscan 容差
    */
    beginFrame(ctx, config) {
      this.ensurePrefixSums();
      const metrics = this.resolveLayoutMetrics(ctx, config);
      const session = {
        ...metrics,
        containerHeight: ctx.containerHeight,
        alignPosition: config.alignPosition,
        overscanPx: config.overscanPx,
        bottomLineHeight: ctx.bottomLineHeight
      };
      if (!metrics.isValid) return {
        bounds: {
          min: 0,
          max: 0
        },
        session
      };
      const { focalTopY, anchorOffset, interludeTotalHeight, activeInterludeAnchor } = metrics;
      const minOffset = Math.min(0, -focalTopY);
      const basePosWithoutScroll = -focalTopY + ctx.containerHeight * config.alignPosition - anchorOffset;
      let totalContentHeight = this.totalLyricHeight;
      if (activeInterludeAnchor !== void 0) totalContentHeight += interludeTotalHeight;
      const rawMaxOffset = basePosWithoutScroll + totalContentHeight - ctx.containerHeight / 2;
      return {
        bounds: {
          min: minOffset,
          max: Math.max(0, rawMaxOffset)
        },
        session
      };
    }
    /**
    * 基于已钳制的 `scrollOffset` 和第一阶段的 {@link LayoutFrameSession} 提交排版并生成指令
    *
    * @param session 由 {@link beginFrame} 生成的单帧排版会话
    * @param scrollOffset 经过边界钳制后的安全滚动偏移量
    *
    * @returns 复用的排版结果实例 {@link LayoutResult}
    */
    commit(session, scrollOffset) {
      this.ensurePrefixSums();
      if (!session.isValid) return this.resetLayoutResult();
      this.layoutResult.lineCount = this.lyricCount;
      const { focalTopY, anchorOffset, interludeTotalHeight, activeInterludeAnchor, containerHeight, alignPosition, overscanPx, bottomLineHeight } = session;
      const viewportStartY = containerHeight * alignPosition - anchorOffset - scrollOffset - focalTopY;
      const motionBuffer = containerHeight * 0.4;
      const viewportTopBound = -overscanPx - motionBuffer;
      const viewportBottomBound = containerHeight + overscanPx + motionBuffer;
      for (let i = 0; i < this.lyricCount; i++) {
        const instruction = this.instructionPool[i];
        let lineY = viewportStartY + this.prefixSums[i];
        const lineH = this.prefixSums[i + 1] - this.prefixSums[i];
        if (activeInterludeAnchor !== void 0 && i > activeInterludeAnchor) lineY += interludeTotalHeight;
        instruction.y = lineY;
        instruction.height = lineH;
        instruction.isInViewport = lineY <= viewportBottomBound && lineY + lineH >= viewportTopBound;
      }
      if (activeInterludeAnchor !== void 0) {
        this.layoutResult.hasInterlude = true;
        this.layoutResult.interludeY = viewportStartY + this.prefixSums[activeInterludeAnchor + 1];
      } else {
        this.layoutResult.hasInterlude = false;
        this.layoutResult.interludeY = 0;
      }
      let bottomY = viewportStartY + this.totalLyricHeight;
      if (activeInterludeAnchor !== void 0) bottomY += interludeTotalHeight;
      this.layoutResult.bottomLineY = bottomY;
      this.layoutResult.isBottomLineInViewport = bottomY <= viewportBottomBound && bottomY + bottomLineHeight >= viewportTopBound;
      return this.layoutResult;
    }
    /**
    * 解析当前排版帧所对应的间奏点挂载锚点行索引
    *
    * @param interlude 当前时间线处于激活状态的间奏点信息
    * @param focalTarget 当前帧对齐的物理焦点
    */
    static resolveInterludeAnchorIndex(interlude, focalTarget) {
      if (interlude) return interlude.anchorLineIndex;
      if (focalTarget.type === "interlude") return focalTarget.anchorIndex;
    }
    /**
    * 如果高度发生过改变，则重新计算前缀和
    */
    ensurePrefixSums() {
      if (!this.isPrefixSumDirty) return;
      let sum = 0;
      this.prefixSums[0] = 0;
      for (let i = 0; i < this.lyricCount; i++) {
        sum += this.heights[i];
        this.prefixSums[i + 1] = sum;
      }
      this.totalLyricHeight = sum;
      this.isPrefixSumDirty = false;
    }
    /**
    * 公共的焦点度量与范围校验逻辑
    */
    resolveLayoutMetrics(ctx, config) {
      const interludeTotalHeight = ctx.interlude?.totalHeight ?? 0;
      const activeInterludeAnchor = ctx.interlude?.anchorIndex;
      this.resolvedMetrics.interludeTotalHeight = interludeTotalHeight;
      this.resolvedMetrics.activeInterludeAnchor = activeInterludeAnchor;
      if (this.lyricCount === 0 || ctx.target.type === "line" && (ctx.target.index < 0 || ctx.target.index >= this.lyricCount) || ctx.target.type === "interlude" && (ctx.target.anchorIndex < -1 || ctx.target.anchorIndex >= this.lyricCount - 1)) {
        this.resolvedMetrics.isValid = false;
        this.resolvedMetrics.focalTopY = 0;
        this.resolvedMetrics.anchorOffset = 0;
        return this.resolvedMetrics;
      }
      this.updateFocalMetrics(ctx.target, interludeTotalHeight, activeInterludeAnchor, ctx.bottomLineHeight, config);
      this.resolvedMetrics.isValid = true;
      return this.resolvedMetrics;
    }
    /**
    * 测量对齐目标的几何信息
    */
    updateFocalMetrics(target, interludeTotalHeight, activeInterludeAnchor, bottomLineHeight, config) {
      let focalTopY = 0;
      let targetHeight = 0;
      if (target.type === "line") {
        focalTopY = this.prefixSums[target.index];
        if (activeInterludeAnchor !== void 0 && target.index > activeInterludeAnchor) focalTopY += interludeTotalHeight;
        targetHeight = this.prefixSums[target.index + 1] - this.prefixSums[target.index];
      } else if (target.type === "interlude") {
        focalTopY = this.prefixSums[target.anchorIndex + 1];
        targetHeight = interludeTotalHeight;
      } else if (target.type === "bottom") {
        focalTopY = this.totalLyricHeight;
        if (activeInterludeAnchor !== void 0) focalTopY += interludeTotalHeight;
        targetHeight = bottomLineHeight;
      }
      this.resolvedMetrics.focalTopY = focalTopY;
      this.resolvedMetrics.anchorOffset = this.calculateAnchorOffset(config.alignAnchor, targetHeight);
    }
    /**
    * 根据锚点与目标高度计算内部相对偏移
    */
    calculateAnchorOffset(alignAnchor, targetHeight) {
      if (targetHeight <= 0) return 0;
      switch (alignAnchor) {
        case LayoutAlignAnchor.Top:
          return 0;
        case LayoutAlignAnchor.Center:
          return targetHeight / 2;
        case LayoutAlignAnchor.Bottom:
          return targetHeight;
      }
      return alignAnchor;
    }
    /**
    * 重置排版结果为安全干净的状态（全部不可见/无底栏）
    */
    resetLayoutResult() {
      this.layoutResult.lineCount = 0;
      this.layoutResult.hasInterlude = false;
      this.layoutResult.interludeY = 0;
      this.layoutResult.bottomLineY = 0;
      this.layoutResult.isBottomLineInViewport = false;
      for (let i = 0; i < this.instructionPool.length; i++) {
        this.instructionPool[i].isInViewport = false;
        this.instructionPool[i].y = 0;
        this.instructionPool[i].height = 0;
      }
      return this.layoutResult;
    }
  };
  function formatValue(value) {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  }
  function assertTimestamp(value, path) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) throw new TypeError(`Invalid lyric timestamp at ${path}: ${formatValue(value)}`);
  }
  function assertTimestampRange(value, path) {
    const startTime = value.startTime;
    const endTime = value.endTime;
    assertTimestamp(startTime, `${path}.startTime`);
    assertTimestamp(endTime, `${path}.endTime`);
    if (startTime > endTime) throw new RangeError(`Invalid lyric timestamp range at ${path}: startTime ${startTime} is greater than endTime ${endTime}`);
  }
  function assertValidLyricTimestamps(lines) {
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const linePath = `lines[${lineIndex}]`;
      assertTimestampRange(line, linePath);
      for (let wordIndex = 0; wordIndex < line.words.length; wordIndex++) {
        const word = line.words[wordIndex];
        const wordPath = `${linePath}.words[${wordIndex}]`;
        assertTimestampRange(word, wordPath);
        if (word.ruby) for (let rubyIndex = 0; rubyIndex < word.ruby.length; rubyIndex++) assertTimestampRange(word.ruby[rubyIndex], `${wordPath}.ruby[${rubyIndex}]`);
      }
    }
  }
  var LyricDataManager = class {
    /**
    * 原始的歌词行数组
    */
    rawLines = [];
    /**
    * 经过处理后的歌词行数组
    */
    processedLines = [];
    /**
    * 当前处理好的 processedLines 是否已经失效
    */
    isDirty = true;
    optimizeOpts = {};
    maskMode = MaskObsceneWordsMode.Disabled;
    maskChar = "*";
    isNonDynamic = false;
    hasDuetLine = false;
    setOriginalLines(lines) {
      assertValidLyricTimestamps(lines);
      this.rawLines = esm_default(lines);
      this.isDirty = true;
    }
    setConfig(config) {
      if (config.optimizeOptions) this.optimizeOpts = {
        ...this.optimizeOpts,
        ...config.optimizeOptions
      };
      this.maskMode = config.maskMode ?? this.maskMode;
      this.maskChar = config.maskChar?.charAt(0) ?? this.maskChar;
      this.isDirty = true;
    }
    /**
    * 获取用户设置的原始歌词行数组，未经过优化和掩码
    * @returns 原始歌词行数组
    */
    getRawLines() {
      return this.rawLines;
    }
    /**
    * 获取对原始歌词行数组处理过的的歌词行数组
    * @returns 经过处理的歌词行数组
    */
    getProcessedLines() {
      this.ensurePipeline();
      return this.processedLines;
    }
    /**
    * 歌词是否为非动态歌词，又称为逐行歌词
    */
    getIsNonDynamic() {
      this.ensurePipeline();
      return this.isNonDynamic;
    }
    /**
    * 歌词是否包含对唱歌词
    */
    getHasDuetLine() {
      this.ensurePipeline();
      return this.hasDuetLine;
    }
    getOptimizeOptions() {
      return this.optimizeOpts;
    }
    getMaskMode() {
      return this.maskMode;
    }
    getMaskChar() {
      return this.maskChar;
    }
    ensurePipeline() {
      if (!this.isDirty) return;
      this.processPipeline();
      this.isDirty = false;
    }
    processPipeline() {
      this.processedLines = esm_default(this.rawLines);
      optimizeLyricLines(this.processedLines, this.optimizeOpts);
      let checkNonDynamic = true;
      let checkDuet = false;
      for (const line of this.processedLines) {
        if (line.words.length > 1) checkNonDynamic = false;
        if (line.isDuet) checkDuet = true;
        for (const word of line.words) this.applyMask(word);
      }
      this.isNonDynamic = checkNonDynamic && this.processedLines.length > 0;
      this.hasDuetLine = checkDuet;
    }
    applyMask(word) {
      if (!word.obscene || this.maskMode === MaskObsceneWordsMode.Disabled) return;
      const text = word.word;
      const maskChar = this.maskChar;
      if (this.maskMode === MaskObsceneWordsMode.FullMask) word.word = text.replace(/\S/g, maskChar);
      else if (this.maskMode === MaskObsceneWordsMode.PartialMask) {
        const trimmed = text.trim();
        if (trimmed.length <= 2) word.word = text.replace(/\S/g, maskChar);
        else {
          const startPos = text.indexOf(trimmed);
          const endPos = startPos + trimmed.length - 1;
          word.word = text.slice(0, startPos + 1) + text.slice(startPos + 1, endPos).replace(/\S/g, maskChar) + text.slice(endPos);
        }
      }
    }
  };
  var AUTO_ALIGN_RESUME_DELAY_MS = 500;
  var WHEEL_IDLE_TIMEOUT_MS = 150;
  var BASE_FRAME_DURATION = Duration.fromMillis(1e3 / 60);
  var MAX_INERTIA_FRAME_DELTA_MS = 100;
  var ScrollInteractionEngine = class {
    container;
    hooks;
    offset = 0;
    minOffset = 0;
    maxOffset = 0;
    touchState = {
      startY: 0,
      startX: 0,
      lastY: 0,
      startOffset: 0,
      speed: 0,
      lastTimestamp: 0,
      /**
      * 是否已经突破 10px 意图阈值
      */
      isIntentConfirmed: false
    };
    /**
    * 记录 Touch 开始时被打断的既有状态
    */
    interruptedState = {
      hadInertia: false,
      hadTimer: false,
      wasInteracting: false
    };
    inertiaRafId = 0;
    scrollEndTime;
    isInteracting = false;
    wheelEndTimeoutId = 0;
    abortController = new AbortController();
    constructor(container, hooks) {
      this.container = container;
      this.hooks = hooks;
      const signal = this.abortController.signal;
      this.container.addEventListener("touchstart", this.onTouchStart, {
        passive: false,
        signal
      });
      this.container.addEventListener("touchmove", this.onTouchMove, {
        passive: false,
        signal
      });
      this.container.addEventListener("touchend", this.onTouchEnd, {
        passive: false,
        signal
      });
      this.container.addEventListener("touchcancel", this.onTouchCancel, {
        passive: false,
        signal
      });
      this.container.addEventListener("wheel", this.onWheel, {
        passive: false,
        signal
      });
    }
    startInteraction(type) {
      this.scrollEndTime = void 0;
      if (!this.isInteracting) {
        this.isInteracting = true;
        this.hooks.onInteractionStart(type);
      }
    }
    endInteraction() {
      this.isInteracting = false;
      this.clearTimers();
      this.scrollEndTime = performance.now();
    }
    onTouchStart = (evt) => {
      if (evt.touches.length > 1) {
        const touch2 = evt.touches[0];
        const state2 = this.touchState;
        state2.startY = touch2.screenY;
        state2.startX = touch2.screenX;
        state2.lastY = touch2.screenY;
        state2.startOffset = this.offset;
        state2.lastTimestamp = performance.now();
        state2.speed = 0;
        return;
      }
      this.interruptedState.hadInertia = this.inertiaRafId !== 0;
      this.interruptedState.hadTimer = this.wheelEndTimeoutId !== 0;
      this.interruptedState.wasInteracting = this.isInteracting;
      this.clearTimers();
      const touch = evt.touches[0];
      const state = this.touchState;
      state.startY = touch.screenY;
      state.startX = touch.screenX;
      state.lastY = touch.screenY;
      state.startOffset = this.offset;
      state.lastTimestamp = performance.now();
      state.speed = 0;
      state.isIntentConfirmed = false;
    };
    onTouchMove = (evt) => {
      const touch = evt.touches[0];
      const state = this.touchState;
      const deltaY = touch.screenY - state.startY;
      const deltaX = touch.screenX - state.startX;
      if (!state.isIntentConfirmed) {
        if (Math.abs(deltaY) > 10 || Math.abs(deltaX) > 10) {
          state.isIntentConfirmed = true;
          this.startInteraction("touch");
        } else return;
      }
      if (evt.cancelable) evt.preventDefault();
      const currentY = touch.screenY;
      this.offset = this.clampOffset(state.startOffset - (currentY - state.startY));
      const now = performance.now();
      const dt = Duration.fromMillis(now - state.lastTimestamp);
      const dtMs = Duration.asMillis(dt);
      if (dtMs > 0) state.speed = (currentY - state.lastY) / dtMs;
      state.lastY = currentY;
      state.lastTimestamp = now;
      this.hooks.onScrollUpdate(true);
    };
    onTouchCancel = (_evt) => {
      const state = this.touchState;
      if (!state.isIntentConfirmed) {
        const { hadInertia, hadTimer, wasInteracting } = this.interruptedState;
        if (hadInertia || hadTimer || wasInteracting) this.endInteraction();
        return;
      }
      state.speed = 0;
      state.startY = 0;
      this.endInteraction();
    };
    onTouchEnd = (evt) => {
      const state = this.touchState;
      if (evt.touches.length > 0) {
        const remainingTouch = evt.touches[0];
        state.startY = remainingTouch.screenY;
        state.startX = remainingTouch.screenX;
        state.lastY = remainingTouch.screenY;
        state.startOffset = this.offset;
        state.lastTimestamp = performance.now();
        state.speed = 0;
        return;
      }
      if (!state.isIntentConfirmed) {
        const { hadInertia, hadTimer, wasInteracting } = this.interruptedState;
        if (hadInertia || hadTimer || wasInteracting) this.endInteraction();
        return;
      }
      state.isIntentConfirmed = false;
      if (evt.cancelable) evt.preventDefault();
      state.startY = 0;
      if (this.inertiaRafId) {
        cancelAnimationFrame(this.inertiaRafId);
        this.inertiaRafId = 0;
      }
      if (Math.abs(state.speed) < 0.1) state.speed = 0;
      if (Math.abs(state.speed) > 0.05) {
        let lastFrameTime = performance.now();
        const onScrollFrame = (time) => {
          const dt = Duration.fromMillis(time - lastFrameTime);
          lastFrameTime = time;
          const dtMs = Duration.asMillis(dt);
          if (dtMs <= 0 || dtMs > MAX_INERTIA_FRAME_DELTA_MS) {
            this.inertiaRafId = requestAnimationFrame(onScrollFrame);
            return;
          }
          if (Math.abs(state.speed) > 0.05) {
            this.offset -= state.speed * dtMs;
            this.offset = this.clampOffset(this.offset);
            const steps = Duration.divDuration(dt, BASE_FRAME_DURATION);
            state.speed *= 0.95 ** steps;
            this.hooks.onScrollUpdate(true);
            this.inertiaRafId = requestAnimationFrame(onScrollFrame);
          } else {
            this.inertiaRafId = 0;
            this.endInteraction();
          }
        };
        this.inertiaRafId = requestAnimationFrame(onScrollFrame);
      } else this.endInteraction();
    };
    onWheel = (evt) => {
      this.clearTimers();
      this.startInteraction("wheel");
      if (evt.cancelable) evt.preventDefault();
      if (evt.deltaMode === WheelEvent.DOM_DELTA_PIXEL) this.offset += evt.deltaY;
      else this.offset += evt.deltaY * 50;
      this.offset = this.clampOffset(this.offset);
      this.hooks.onScrollUpdate(false);
      this.wheelEndTimeoutId = window.setTimeout(() => {
        this.wheelEndTimeoutId = 0;
        this.endInteraction();
      }, WHEEL_IDLE_TIMEOUT_MS);
    };
    /**
    * 将给定的偏移量限制在当前的 [minOffset, maxOffset] 边界内
    */
    clampOffset(val) {
      const min = Math.min(this.minOffset, this.maxOffset);
      const max = Math.max(this.minOffset, this.maxOffset);
      return Math.min(Math.max(val, min), max);
    }
    /**
    * 滚动结束是否已超过 {@link AUTO_ALIGN_RESUME_DELAY_MS}
    */
    get canResumeAutoAlign() {
      return this.scrollEndTime !== void 0 && performance.now() - this.scrollEndTime >= AUTO_ALIGN_RESUME_DELAY_MS;
    }
    /**
    * 更新允许的滚动边界，并返回钳制后的实际 offset
    *
    * @description
    * 在歌词发生排版变化，如页面 `resize`、加载了新歌词、展开背景歌词、歌词行高度改变时，
    * 计算出当前视口内允许滚动的上限与下限，通过此方法传给滚动引擎以确保滚动不会越界
    */
    updateBoundary(min, max) {
      this.minOffset = Math.min(0, min);
      this.maxOffset = Math.max(0, max);
      this.offset = this.clampOffset(this.offset);
      return this.offset;
    }
    /**
    * 覆盖当前的滚动偏移量并终止正在进行的惯性动画或等待状态
    *
    * @description
    * 当需要清空全部用户手势带来的临时滚动状态时，例如，用户点击了某行歌词触发了
    * Seek、歌曲切歌、或者焦点切换时恢复自动对齐，调用此方法重置滚动引擎
    */
    resetScroll(targetOffset = 0) {
      this.clearTimers();
      this.scrollEndTime = void 0;
      this.isInteracting = false;
      this.touchState.isIntentConfirmed = false;
      this.touchState.speed = 0;
      this.touchState.startY = 0;
      this.touchState.lastY = 0;
      this.touchState.lastTimestamp = 0;
      this.offset = this.clampOffset(targetOffset);
    }
    clearTimers() {
      if (this.inertiaRafId) {
        cancelAnimationFrame(this.inertiaRafId);
        this.inertiaRafId = 0;
      }
      if (this.wheelEndTimeoutId) {
        window.clearTimeout(this.wheelEndTimeoutId);
        this.wheelEndTimeoutId = 0;
      }
    }
    dispose() {
      this.abortController.abort();
      this.clearTimers();
      this.scrollEndTime = void 0;
    }
  };
  var JITTER_TOLERANCE = Duration.fromMillis(150);
  var DRIFT_SLACK = 0.5;
  var MAX_TRUSTED_GAP = Duration.fromMillis(800);
  var SeekDetector = class {
    now;
    lastMediaTime = MediaTime.ZERO;
    lastWallTime = 0;
    hasBaseline = false;
    /**
    * @param now 物理时钟读取函数，默认为 `performance.now`
    */
    constructor(now = () => performance.now()) {
      this.now = now;
    }
    /**
    * 推导本次进度变化是否为跳转
    *
    * @param time 下游推送的当前播放进度
    * @param isPlaying 当前是否在播放，决定本次推送应有的推进量与容差
    * @returns 是否应当按跳转处理
    */
    detect(time, isPlaying) {
      const wall = this.now();
      if (!this.hasBaseline) {
        this.rebase(time, wall);
        this.hasBaseline = true;
        return false;
      }
      if (time < this.lastMediaTime) {
        this.rebase(time, wall);
        return true;
      }
      const mediaDelta = MediaTime.since(time, this.lastMediaTime);
      const elapsed = Duration.clampPositive(Duration.fromMillis(wall - this.lastWallTime));
      const wallDelta = Duration.min(elapsed, MAX_TRUSTED_GAP);
      this.rebase(time, wall);
      const expected = isPlaying ? wallDelta : Duration.ZERO;
      const tolerance = isPlaying ? Duration.max(JITTER_TOLERANCE, Duration.mulF64(wallDelta, DRIFT_SLACK)) : JITTER_TOLERANCE;
      return Duration.sub(mediaDelta, expected) > tolerance;
    }
    reset() {
      this.hasBaseline = false;
      this.lastMediaTime = MediaTime.ZERO;
      this.lastWallTime = 0;
    }
    rebase(time, wall) {
      this.lastMediaTime = time;
      this.lastWallTime = wall;
    }
  };
  var SLOW_STIFFNESS = 90;
  var SLOW_DAMPING = 15;
  var MEDIUM_STIFFNESS = 140;
  var MEDIUM_DAMPING = 22;
  var MIN_INTERVAL = 100;
  var MAX_INTERVAL = 800;
  var MIN_STIFFNESS = 170;
  var DAMPING_MULTIPLIER = 2.2;
  var INTERVAL_EXPONENT = 0.2;
  function getPosYSpringPolicy(isSeeking, isInterludeActive, intervalMs, isEndOfSong = false) {
    if (isSeeking || isInterludeActive) return {
      stiffness: SLOW_STIFFNESS,
      damping: SLOW_DAMPING
    };
    if (isEndOfSong) return {
      stiffness: MEDIUM_STIFFNESS,
      damping: MEDIUM_DAMPING
    };
    if (intervalMs == null) return {
      stiffness: SLOW_STIFFNESS,
      damping: SLOW_DAMPING
    };
    let ratio = 1 - (Math.min(Math.max(intervalMs, MIN_INTERVAL), MAX_INTERVAL) - MIN_INTERVAL) / 700;
    ratio = ratio ** INTERVAL_EXPONENT;
    const targetStiffness = MIN_STIFFNESS + ratio * 50;
    return {
      stiffness: targetStiffness,
      damping: Math.sqrt(targetStiffness) * DAMPING_MULTIPLIER
    };
  }
  var MIN_INTERLUDE_GAP = Duration.fromMillis(7e3);
  var TimelineController = class {
    lyricBounds = [];
    /**
    * 全部歌词行中最晚的结束时间，用于判定歌曲是否播放完毕
    */
    maxEndTime = MediaTime.ZERO;
    /**
    * 预先计算的间奏区域
    */
    precalculatedInterludes = [];
    /**
    * 保存上次顺序扫描停止的位置，用于避免每次都从头遍历所有歌词，提高性能
    */
    playbackCursor = 0;
    interludeCursor = 0;
    playingGroupsSet = /* @__PURE__ */ new Set();
    highlightedGroupsSet = /* @__PURE__ */ new Set();
    nextPlayingSet = /* @__PURE__ */ new Set();
    nextHighlightedSet = /* @__PURE__ */ new Set();
    addedPlayingIds = [];
    removedPlayingIds = [];
    addedHighlightedIds = [];
    removedHighlightedIds = [];
    expiredHighlightedIds = [];
    snapshot = {
      currentTime: MediaTime.ZERO,
      playingGroups: this.playingGroupsSet,
      highlightedGroups: this.highlightedGroupsSet,
      scrollToIndex: 0,
      latestHighlightedIndex: void 0,
      isEndOfSong: false,
      activeInterlude: void 0,
      isFocusOnInterlude: false
    };
    diff = {
      hasChanged: false,
      isTimeJumped: false,
      addedPlaying: this.addedPlayingIds,
      removedPlaying: this.removedPlayingIds,
      addedHighlighted: this.addedHighlightedIds,
      removedHighlighted: this.removedHighlightedIds,
      isInterludeChanged: false,
      isScrollToChanged: false,
      isEndOfSongChanged: false
    };
    /**
    * 提前设置好歌词的时间数据，内部会根据此数据来进行时间线推导，同时预计算间奏区间
    *
    * @param bounds 歌词行的时间边界，**必须按 `startTime` 升序排列**，不按 `startTime`
    * 排列可能会导致时间推导出现意外情况
    */
    setTimeBounds(bounds) {
      this.lyricBounds = bounds;
      this.precalculatedInterludes = this.calculateInterludes(bounds);
      let maxEnd = MediaTime.ZERO;
      for (const bound of bounds) maxEnd = MediaTime.max(maxEnd, bound.endTime);
      this.maxEndTime = maxEnd;
      this.reset();
    }
    /**
    * 获取当前播放时间线状态的只读快照
    *
    * 用于给 UI 执行排版和计算各种歌词行的效果
    *
    * @remarks 在获取快照后，必须在同一帧内消费完毕，切勿保留其引用，因为下一帧就会被原地覆写
    * @returns 时间线快照
    */
    getSnapshot() {
      return this.snapshot;
    }
    /**
    * 将播放进度推进到指定时间，并返回相对上一帧的增量变化
    *
    * @remarks
    * 歌词行的高亮生命周期为：
    * * 命中 `[startTime, endTime)` 时高亮
    * * 唱完后不会自行熄灭，而是继续保持高亮
    *
    * 直到出现下列任一情况：
    *
    * 1. 有新的歌词行开始播放，此时已唱完的行被一起熄灭
    * 2. 进入间奏区间，此时清空全部高亮并把焦点交给间奏点
    * 3. 歌曲播放完毕，此时清空全部高亮并设置 {@link TimelineSnapshot.isEndOfSong} 为 true
    * 4. 发生跳转，此时按跳转后的时间重新推导
    *
    * @param time 当前播放时间
    * @param forceSeek 这次时间变化是否由跳转触发
    * @returns 相对上一帧的增量变化
    */
    sync(time, forceSeek = false) {
      this.addedPlayingIds.length = 0;
      this.removedPlayingIds.length = 0;
      this.addedHighlightedIds.length = 0;
      this.removedHighlightedIds.length = 0;
      const prevInterlude = this.snapshot.activeInterlude;
      const prevFocusOnInterlude = this.snapshot.isFocusOnInterlude;
      const prevScrollToIndex = this.snapshot.scrollToIndex;
      const prevEndOfSong = this.snapshot.isEndOfSong;
      const isTimeRetreating = time < this.snapshot.currentTime;
      const isJump = forceSeek || isTimeRetreating;
      const activeInterlude = this.resolveActiveInterlude(time, isJump);
      this.snapshot.activeInterlude = activeInterlude;
      const isPastLastLine = this.lyricBounds.length > 0 && time >= this.maxEndTime;
      if (isJump) this.performSeek(time, !!activeInterlude || isPastLastLine);
      else this.performPlayback(time);
      if (activeInterlude && this.playingGroupsSet.size === 0) this.flushAllHighlighted();
      if (isPastLastLine) this.flushAllHighlighted();
      this.updateInterludeFocus(activeInterlude);
      const isInterludeChanged = prevInterlude !== activeInterlude;
      const isFocusChanged = prevFocusOnInterlude !== this.snapshot.isFocusOnInterlude;
      const isScrollToChanged = prevScrollToIndex !== this.snapshot.scrollToIndex;
      const isEndOfSongChanged = isPastLastLine !== prevEndOfSong;
      const hasChanged = isJump || this.addedPlayingIds.length > 0 || this.removedPlayingIds.length > 0 || this.addedHighlightedIds.length > 0 || this.removedHighlightedIds.length > 0 || isInterludeChanged || isFocusChanged || isScrollToChanged || isEndOfSongChanged;
      this.snapshot.currentTime = time;
      if (this.highlightedGroupsSet.size > 0) {
        let maxIndex = -1;
        for (const id of this.highlightedGroupsSet) if (id > maxIndex) maxIndex = id;
        this.snapshot.latestHighlightedIndex = maxIndex;
      } else this.snapshot.latestHighlightedIndex = void 0;
      this.snapshot.isEndOfSong = isPastLastLine;
      this.diff.hasChanged = hasChanged;
      this.diff.isTimeJumped = isJump;
      this.diff.isInterludeChanged = isInterludeChanged;
      this.diff.isScrollToChanged = isScrollToChanged;
      this.diff.isEndOfSongChanged = isEndOfSongChanged;
      return this.diff;
    }
    /**
    * 处理正常播放时的时间线推导
    */
    performPlayback(time) {
      for (const lastPlayingId of this.playingGroupsSet) {
        const bound = this.lyricBounds[lastPlayingId];
        if (!bound || time < bound.startTime || bound.endTime <= time) {
          this.playingGroupsSet.delete(lastPlayingId);
          this.removedPlayingIds.push(lastPlayingId);
        }
      }
      let cursor = Math.max(0, this.playbackCursor);
      const len = this.lyricBounds.length;
      while (cursor < len) {
        const bound = this.lyricBounds[cursor];
        if (bound.startTime > time) break;
        if (bound.startTime <= time && bound.endTime > time && !this.playingGroupsSet.has(cursor)) {
          this.playingGroupsSet.add(cursor);
          this.addedPlayingIds.push(cursor);
        }
        cursor++;
      }
      this.playbackCursor = cursor;
      this.expiredHighlightedIds.length = 0;
      for (const id of this.highlightedGroupsSet) if (!this.playingGroupsSet.has(id)) this.expiredHighlightedIds.push(id);
      const addedPlayingCount = this.addedPlayingIds.length;
      const expiredCount = this.expiredHighlightedIds.length;
      for (let i = 0; i < addedPlayingCount; i++) {
        const id = this.addedPlayingIds[i];
        this.highlightedGroupsSet.add(id);
        this.addedHighlightedIds.push(id);
      }
      if (addedPlayingCount > 0) {
        for (let i = 0; i < expiredCount; i++) {
          const id = this.expiredHighlightedIds[i];
          this.highlightedGroupsSet.delete(id);
          this.removedHighlightedIds.push(id);
        }
        let minHighlighted = Number.POSITIVE_INFINITY;
        for (const id of this.highlightedGroupsSet) if (id < minHighlighted) minHighlighted = id;
        this.snapshot.scrollToIndex = minHighlighted;
      }
    }
    /**
    * 处理 Seek 时的时间线推导
    *
    * 直接按目标时间重建播放与高亮行集合，结果与正常播放到该时刻时一致
    *
    * @param time 跳转到的时间
    * @param dropLingeringWhenIdle 在没有任何行正在播放时，是否丢弃那些已经唱完、
    * 但在正常播放中仍会保持高亮的行，用于在间奏和播放完时清空高亮行
    */
    performSeek(time, dropLingeringWhenIdle) {
      const nextPlaying = this.nextPlayingSet;
      const nextHighlighted = this.nextHighlightedSet;
      nextPlaying.clear();
      nextHighlighted.clear();
      let left = 0;
      let right = this.lyricBounds.length - 1;
      let firstGreater = this.lyricBounds.length;
      while (left <= right) {
        const mid = left + right >> 1;
        if (this.lyricBounds[mid].startTime > time) {
          firstGreater = mid;
          right = mid - 1;
        } else left = mid + 1;
      }
      let anchorIndex = -1;
      for (let i = firstGreater - 1; i >= 0; i--) {
        const bound = this.lyricBounds[i];
        if (bound.endTime > bound.startTime) {
          anchorIndex = i;
          break;
        }
      }
      if (anchorIndex === -1) {
        this.playbackCursor = firstGreater;
        this.snapshot.scrollToIndex = 0;
        this.commitSeekDiff();
        return;
      }
      const anchorStart = this.lyricBounds[anchorIndex].startTime;
      let minPlaying = -1;
      let minHighlighted = -1;
      for (let i = anchorIndex; i >= 0; i--) {
        const bound = this.lyricBounds[i];
        if (bound.endTime <= anchorStart) continue;
        if (bound.startTime <= time && bound.endTime > time) {
          nextPlaying.add(i);
          minPlaying = i;
        }
        nextHighlighted.add(i);
        minHighlighted = i;
      }
      if (dropLingeringWhenIdle && nextPlaying.size === 0) nextHighlighted.clear();
      this.playbackCursor = minPlaying === -1 ? firstGreater : minPlaying;
      this.snapshot.scrollToIndex = minHighlighted;
      this.commitSeekDiff();
    }
    /**
    * 把 Seek 重建出的目标集合与上一帧的集合求对称差，输出发生变化的部分
    */
    commitSeekDiff() {
      for (const id of this.playingGroupsSet) if (!this.nextPlayingSet.has(id)) {
        this.playingGroupsSet.delete(id);
        this.removedPlayingIds.push(id);
      }
      for (const id of this.nextPlayingSet) if (!this.playingGroupsSet.has(id)) {
        this.playingGroupsSet.add(id);
        this.addedPlayingIds.push(id);
      }
      for (const id of this.highlightedGroupsSet) if (!this.nextHighlightedSet.has(id)) {
        this.highlightedGroupsSet.delete(id);
        this.removedHighlightedIds.push(id);
      }
      for (const id of this.nextHighlightedSet) if (!this.highlightedGroupsSet.has(id)) {
        this.highlightedGroupsSet.add(id);
        this.addedHighlightedIds.push(id);
      }
    }
    /**
    * 立即熄灭当前全部高亮歌词行
    *
    * 用于间奏与曲末这两个没有下一行接续、但必须清空高亮的场景
    */
    flushAllHighlighted() {
      if (this.highlightedGroupsSet.size === 0) return;
      for (const id of this.highlightedGroupsSet) this.removedHighlightedIds.push(id);
      this.highlightedGroupsSet.clear();
    }
    /**
    * 预计算全部间奏区间
    * @param bounds 按 `startTime` 升序排列的歌词时间边界
    * @returns 按时间升序排列、互不重叠的间奏区间，供二分查找与游标推进使用
    */
    calculateInterludes(bounds) {
      const interludes = [];
      let maxEnd = MediaTime.ZERO;
      for (let i = -1; i < bounds.length - 1; i++) {
        if (i >= 0) maxEnd = MediaTime.max(maxEnd, bounds[i].endTime);
        const gapEnd = MediaTime.max(maxEnd, bounds[i + 1].startTime);
        if (MediaTime.since(gapEnd, maxEnd) >= MIN_INTERLUDE_GAP) interludes.push({
          startTime: maxEnd,
          endTime: gapEnd,
          anchorLineIndex: i
        });
      }
      return interludes;
    }
    /**
    * 查找当前时间命中的间奏区间，并顺带推进或重定位间奏游标
    * @param time 当前播放时间
    * @param isSeek 当前帧是否为跳转
    * @returns 命中的间奏区间，未命中时为 undefined
    */
    resolveActiveInterlude(time, isSeek) {
      if (this.precalculatedInterludes.length === 0) return void 0;
      if (isSeek) {
        let cursor = this.precalculatedInterludes.length;
        let left = 0;
        let right = this.precalculatedInterludes.length - 1;
        while (left <= right) {
          const mid = left + right >> 1;
          if (this.precalculatedInterludes[mid].endTime > time) {
            cursor = mid;
            right = mid - 1;
          } else left = mid + 1;
        }
        this.interludeCursor = cursor;
        if (cursor < this.precalculatedInterludes.length) {
          const inter = this.precalculatedInterludes[cursor];
          if (time >= inter.startTime && time < inter.endTime) return inter;
        }
        return;
      }
      while (this.interludeCursor < this.precalculatedInterludes.length) {
        const inter = this.precalculatedInterludes[this.interludeCursor];
        if (time >= inter.startTime && time < inter.endTime) return inter;
        if (time >= inter.endTime) this.interludeCursor++;
        else break;
      }
    }
    /**
    * 根据间奏命中情况和当前高亮状态推导是否应当聚焦间奏点
    *
    * 处于间奏区域且没有任何歌词高亮时聚焦间奏点，否则交还给歌词行
    *
    * @param activeInterlude 当前命中的间奏区间
    */
    updateInterludeFocus(activeInterlude) {
      this.snapshot.isFocusOnInterlude = !!activeInterlude && this.highlightedGroupsSet.size === 0;
    }
    /**
    * 清空全部推导状态，回到时间原点
    */
    reset() {
      this.playbackCursor = 0;
      this.interludeCursor = 0;
      this.playingGroupsSet.clear();
      this.highlightedGroupsSet.clear();
      this.nextPlayingSet.clear();
      this.nextHighlightedSet.clear();
      this.snapshot.currentTime = MediaTime.ZERO;
      this.snapshot.scrollToIndex = 0;
      this.snapshot.latestHighlightedIndex = void 0;
      this.snapshot.isEndOfSong = false;
      this.snapshot.activeInterlude = void 0;
      this.snapshot.isFocusOnInterlude = false;
    }
  };
  function getEntrySize(entry) {
    if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
      const borderBox = entry.borderBoxSize[0];
      return [borderBox.inlineSize, borderBox.blockSize];
    }
    const el = entry.target;
    return [el.offsetWidth || entry.contentRect.width, el.offsetHeight || entry.contentRect.height];
  }
  var LyricPlayerBase = class extends EventTarget {
    element = document.createElement("div");
    isPlaying = false;
    timelineController = new TimelineController();
    seekDetector = new SeekDetector();
    enableAutoSeekDetection = true;
    hasBottomContent = false;
    bottomLineObserver;
    /** @internal */
    lyricGroupElementMap = /* @__PURE__ */ new WeakMap();
    lyricLinesIndexes = /* @__PURE__ */ new WeakMap();
    disableSpring = false;
    dataManager = new LyricDataManager();
    get processedLines() {
      return this.dataManager.getProcessedLines();
    }
    get isNonDynamic() {
      return this.dataManager.getIsNonDynamic();
    }
    get hasDuetLine() {
      return this.dataManager.getHasDuetLine();
    }
    layoutState = { interludeDotsSize: [0, 0] };
    layoutConfig = {
      alignAnchor: LayoutAlignAnchor.Center,
      alignPosition: 0.35,
      overscanPx: 300
    };
    /** LayoutCalculator 所使用的排版上下文状态 */
    frameContext = {
      containerHeight: 0,
      scrollOffset: 0,
      target: {
        index: 0,
        type: "line"
      },
      bottomLineHeight: 0,
      interlude: void 0
    };
    /**
    * 逐帧刷新的视觉推导派生值
    *
    * 存放会在逐行循环内被反复求值的量，避免逐行重算
    */
    visualFrame = {
      /** 最靠后的高亮行，无高亮时回退到 `scrollToIndex` */
      latestIndex: 0,
      /** 已播放行的分界，`hidePassedLines` 启用时此行之前的歌词被隐藏 */
      passedBoundary: 0,
      /** 是否为窄视口，窄视口下模糊强度打折 */
      isNarrowViewport: false
    };
    interludeDots;
    bottomLine;
    enableBlur = true;
    enableScale = true;
    hidePassedLines = false;
    scrollEngine;
    scrollState = {
      isAutoAlignSuspended: false,
      isTouchScrolled: false
    };
    layoutCalculator = new LayoutCalculator();
    focusController = new FocusController();
    currentLyricGroups = [];
    lyricGroupSize = /* @__PURE__ */ new WeakMap();
    size = [0, 0];
    isPageVisible = true;
    /** 默认/回退单行歌词估算高度基准 (containerHeight / 5) */
    get defaultLineHeight() {
      return this.size[1] / 5;
    }
    /**
    * 获取指定索引歌词行的高度
    * @remarks 可能为测量值或估算值
    */
    getLineHeight(index) {
      return this.layoutCalculator.getLineHeight(index);
    }
    /** 是否强制让背景人声行始终后置（即始终在主歌词下方显示，不前置背景人声） */
    alwaysPostpositionBackground = false;
    posXSpringParams = {
      mass: 1,
      damping: 10,
      stiffness: 100
    };
    posYSpringParams = {
      mass: 0.9,
      damping: 15,
      stiffness: 90
    };
    scaleSpringParams = {
      mass: 2,
      damping: 25,
      stiffness: 100
    };
    scaleForBGSpringParams = {
      mass: 1,
      damping: 20,
      stiffness: 50
    };
    lyricGroupIndexMap = /* @__PURE__ */ new WeakMap();
    onPageShow = () => {
      this.isPageVisible = true;
      this.setCurrentTime(this.getCurrentTime(), true);
    };
    onPageHide = () => {
      this.isPageVisible = false;
    };
    onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      this.seekDetector.reset();
    };
    /** @internal */
    resizeObserver = new ResizeObserver(((entries) => {
      let shouldRelayout = false;
      let shouldRebuildPlayerStyle = false;
      let shouldUpdateFallback = false;
      for (const entry of entries) if (entry.target === this.element) {
        const rect = entry.contentRect;
        this.size[0] = rect.width;
        this.size[1] = rect.height;
        shouldRebuildPlayerStyle = true;
        shouldUpdateFallback = true;
      } else if (entry.target === this.interludeDots.getElement()) {
        const size = getEntrySize(entry);
        this.layoutState.interludeDotsSize[0] = size[0];
        this.layoutState.interludeDotsSize[1] = size[1];
        shouldRelayout = true;
      } else if (entry.target === this.bottomLine.getElement()) {
        const newSize = getEntrySize(entry);
        const oldSize = this.bottomLine.lineSize;
        if (newSize[0] !== oldSize[0] || newSize[1] !== oldSize[1]) {
          this.bottomLine.lineSize = newSize;
          shouldRelayout = true;
        }
      } else {
        const groupObj = this.lyricGroupElementMap.get(entry.target);
        if (groupObj) {
          const newSize = getEntrySize(entry);
          if (entry.target === groupObj.getElement()) {
            const oldSize = this.lyricGroupSize.get(groupObj) ?? [0, 0];
            if (newSize[0] !== oldSize[0] || newSize[1] !== oldSize[1]) {
              this.lyricGroupSize.set(groupObj, newSize);
              groupObj.onLineSizeChange(newSize);
              const index = this.lyricGroupIndexMap.get(groupObj) ?? -1;
              if (index !== -1) this.layoutCalculator.setLineHeight(index, newSize[1]);
              shouldRelayout = true;
            }
          } else groupObj.onBgSizeChange?.(newSize);
        }
      }
      if (shouldUpdateFallback) {
        this.layoutCalculator.updateUnmeasuredHeights(this.defaultLineHeight);
        shouldRelayout = true;
      }
      if (shouldRelayout) this.calcLayout(LayoutReason.Resize);
      if (shouldRebuildPlayerStyle) this.onResize();
    }));
    wordFadeWidth = 0.5;
    constructor(element) {
      super();
      if (element) this.element = element;
      this.element.classList.add("amll-lyric-player");
      this.interludeDots = this.createInterludeDots();
      this.bottomLine = this.createBottomLine();
      this.resizeObserver.observe(this.element);
      this.resizeObserver.observe(this.interludeDots.getElement());
      this.resizeObserver.observe(this.bottomLine.getElement());
      this.element.appendChild(this.interludeDots.getElement());
      this.element.appendChild(this.bottomLine.getElement());
      this.interludeDots.setTransform(0, 200);
      this.bottomLineObserver = new MutationObserver(() => {
        const newHasBottomContent = this.getBottomLineElement().innerHTML.trim().length > 0;
        if (this.hasBottomContent !== newHasBottomContent) {
          if (newHasBottomContent) this.bottomLine.resetPosition();
          this.hasBottomContent = newHasBottomContent;
          this.calcLayout(LayoutReason.ConfigChange);
        }
      });
      this.bottomLineObserver.observe(this.getBottomLineElement(), {
        childList: true,
        characterData: true,
        subtree: true
      });
      window.addEventListener("pageshow", this.onPageShow);
      window.addEventListener("pagehide", this.onPageHide);
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      this.scrollEngine = new ScrollInteractionEngine(this.element, {
        onScrollUpdate: (isContinuous) => {
          this.calcLayout(isContinuous ? LayoutReason.ContinuousScroll : LayoutReason.DiscreteScroll);
        },
        onInteractionStart: (type) => {
          this.scrollState.isAutoAlignSuspended = true;
          this.scrollState.isTouchScrolled = type === "touch";
          this.calcLayout(LayoutReason.InteractionStart);
        }
      });
    }
    /**
    * 设置文字动画的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位，默认为 0.5，即一个全角字符的一半宽度
    *
    * 如果要模拟 Apple Music for Android 的效果，可以设置为 1
    *
    * 如果要模拟 Apple Music for iPad 的效果，可以设置为 0.5
    *
    * 如果想要近乎禁用渐变效果，可以设置成非常接近 0 的小数（例如 `0.0001` ），但是**不可以为 0**
    *
    * @param value 需要设置的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位，默认为 0.5
    */
    setWordFadeWidth(value = 0.5) {
      this.wordFadeWidth = Math.max(1e-4, value);
    }
    /**
    * 是否启用歌词行缩放效果，默认启用
    *
    * 如果启用，非选中的歌词行会轻微缩小以凸显当前播放歌词行效果
    *
    * 此效果对性能影响微乎其微，推荐启用
    * @param enable 是否启用歌词行缩放效果
    */
    setEnableScale(enable = true) {
      this.enableScale = enable;
      this.calcLayout(LayoutReason.ConfigChange);
    }
    /**
    * 获取当前是否启用了歌词行缩放效果
    * @returns 是否启用歌词行缩放效果
    */
    getEnableScale() {
      return this.enableScale;
    }
    /**
    * 获取当前文字动画的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位
    * @returns 当前文字动画的渐变宽度，单位以歌词行的主文字字体大小的倍数为单位
    */
    getWordFadeWidth() {
      return this.wordFadeWidth;
    }
    /**
    * 设置持续性的跳转状态
    *
    * @deprecated 此方法已无实际作用，调用它不会产生任何效果，仅为兼容保留，将在未来移除
    *
    * 跳转状态现在由每次进度推送逐帧推导，不再存在需要外部显式解除的持续状态
    *
    * 跳转会通过以下三条途径被识别，三者同时生效：
    *
    * - {@link setCurrentTime} 的 `isSeek` 参数，由调用方明确告知某次进度变化是跳转
    * - 进度倒退，由内部无条件识别，不受任何开关控制
    * - 自动推导，由内部比对进度的实际推进量与它应有的推进量识别超量前进，默认启用，
    *   可通过 {@link setEnableAutoSeekDetection} 关闭
    */
    setIsSeeking(_isSeeking) {
    }
    /**
    * 设置是否自动推导跳转状态，默认启用
    *
    * 启用后，即使调用 {@link setCurrentTime} 时没有传入 `isSeek`，
    * 内部也会在进度前进时比较它的实际推进量与应有的推进量，超量前进即视为跳转
    *
    * 应有的推进量取决于当前的播放状态，因此请按 {@link pause} 与 {@link resume}
    * 的文档正确同步播放状态：
    * - 播放时以物理时钟的推进量为准，容差随之按比例放宽，以容纳倍速播放与不均匀的推送节奏
    * - 暂停时进度本不该前进，应有的推进量是零，因此任何超出抖动幅度的前进都会被视为跳转
    *
    * 这意味着进度信息的粒度粗于推送间隔时，粒度跳变的那一帧会因超量前进被视为跳转，
    * 此时应当改善进度来源的精度，或关闭此开关
    *
    * 较小的向前跳转可能无法被识别，但一般影响不大
    *
    * 此开关只控制上述超量前进的判定。进度倒退不受它控制，无论是否启用推导都会被视为跳转；
    * 进度保持不变则既不前进也不后退，不会被推导视为跳转
    *
    * 推导只会额外识别出跳转，不会否决已显式传入的跳转标志，因此如果你已经在正确传入
    * 跳转标志了，则一般无需关心此开关。若你的进度来源精度很差而导致超量前进被频繁误判，
    * 可以选择关闭
    *
    * @param enable 是否启用自动推导
    */
    setEnableAutoSeekDetection(enable = true) {
      if (this.enableAutoSeekDetection === enable) return;
      this.enableAutoSeekDetection = enable;
      this.seekDetector.reset();
    }
    /**
    * 获取当前是否启用了跳转状态的自动推导
    * @returns 是否启用自动推导
    */
    getEnableAutoSeekDetection() {
      return this.enableAutoSeekDetection;
    }
    /**
    * 设置是否隐藏已经播放过的歌词行，默认不隐藏
    * @param hide 是否隐藏已经播放过的歌词行，默认不隐藏
    */
    setHidePassedLines(hide) {
      this.hidePassedLines = hide;
      this.calcLayout(LayoutReason.ConfigChange);
    }
    /**
    * 设置是否启用歌词行的模糊效果
    * @param enable 是否启用
    */
    setEnableBlur(enable) {
      if (this.enableBlur === enable) return;
      this.enableBlur = enable;
      this.calcLayout(LayoutReason.ConfigChange);
    }
    /**
    * 批量更新歌词处理配置，包括优化和掩码设置
    *
    * @remarks
    * 此方法不会自动重建歌词行和刷新视图，
    * 适用于在渲染前预设配置、批量初始化，或需要手动控制 DOM 刷新时机的场景
    * @param config 需要更新的配置集合
    * @see {@link LyricDataConfig}
    */
    setLyricProcessConfig(config) {
      this.dataManager.setConfig(config);
    }
    /**
    * 批量更新歌词处理配置，包括优化和掩码设置
    *
    * 可以调用此方法以避免多次单独设置处理配置导致的多次刷新开销
    * @remarks 在设置完成后会自动重建歌词行和刷新视图
    * @param config 需要更新的配置集合
    * @see {@link LyricDataConfig}
    */
    updateLyricProcessConfig(config) {
      const currentOptimize = this.dataManager.getOptimizeOptions();
      const currentMaskMode = this.dataManager.getMaskMode();
      const currentMaskChar = this.dataManager.getMaskChar();
      const newOptimize = config.optimizeOptions !== void 0 ? config.optimizeOptions : currentOptimize;
      const newMaskMode = config.maskMode !== void 0 ? config.maskMode : currentMaskMode;
      const newMaskChar = config.maskChar !== void 0 ? config.maskChar : currentMaskChar;
      if (newMaskMode === currentMaskMode && newMaskChar === currentMaskChar && areOptimizeOptionsEqual(newOptimize, currentOptimize)) return;
      this.dataManager.setConfig({
        optimizeOptions: newOptimize,
        maskMode: newMaskMode,
        maskChar: newMaskChar
      });
      if (this.dataManager.getRawLines().length > 0) {
        this.rebuildLyricView(this.getCurrentTime());
        this.calcLayout(LayoutReason.ConfigChange);
      }
    }
    /**
    * 设置歌词中不雅用语的掩码模式
    * @remarks 在设置完成后会自动重建歌词行和刷新视图
    * @param mode 掩码模式
    * @see {@link MaskObsceneWordsMode}
    */
    setMaskObsceneWords(mode) {
      this.updateLyricProcessConfig({ maskMode: mode });
    }
    /**
    * 设置不雅用语掩码使用的字符，默认为 `*`
    * @remarks 在设置完成后会自动重建歌词行和刷新视图
    * @param char 单个字符，用于替换不雅用语中的字符
    */
    setMaskObsceneWordChar(char) {
      const c = char.charAt(0) || "*";
      this.updateLyricProcessConfig({ maskChar: c });
    }
    /**
    * 设置歌词的优化配置项，这些配置项默认全部开启
    * @remarks 在设置完成后会自动重建歌词行和刷新视图
    * @param options 优化配置选项
    * @see {@link OptimizeLyricOptions}
    */
    setOptimizeOptions(options) {
      const currentOpts = this.dataManager.getOptimizeOptions();
      this.updateLyricProcessConfig({ optimizeOptions: {
        ...currentOpts,
        ...options
      } });
    }
    rebuildLyricLines() {
      for (const group of this.currentLyricGroups) group.rebuildAllLines();
    }
    /**
    * 设置目标歌词行的对齐方式，默认为 `center`
    *
    * - 设置成 `top` 的话将会向目标歌词行的顶部对齐
    * - 设置成 `bottom` 的话将会向目标歌词行的底部对齐
    * - 设置成 `center` 的话将会向目标歌词行的垂直中心对齐
    * @param alignAnchor 歌词行对齐方式，详情见函数说明
    */
    setAlignAnchor(alignAnchor) {
      this.layoutConfig.alignAnchor = alignAnchor;
    }
    /**
    * 设置默认的歌词行对齐位置，相对于整个歌词播放组件的大小位置，默认为 `0.5`
    * @param alignPosition 一个 `[0.0-1.0]` 之间的任意数字，代表组件高度由上到下的比例位置
    */
    setAlignPosition(alignPosition) {
      this.layoutConfig.alignPosition = alignPosition;
    }
    /**
    * 设置 overscan（视图上下额外缓冲渲染区）距离，单位：像素。
    * @param px 像素值，默认 300
    */
    setOverscanPx(px) {
      this.layoutConfig.overscanPx = clampPositive(px | 0);
    }
    /** 获取当前 overscan 像素距离 */
    getOverscanPx() {
      return this.layoutConfig.overscanPx;
    }
    /**
    * 设置是否使用物理弹簧算法实现歌词动画效果，默认启用
    *
    * 如果启用，则会通过弹簧算法实时处理歌词位置，但是需要性能足够强劲的电脑方可流畅运行
    *
    * 如果不启用，则会回退到基于 `transition` 的过渡效果，对低性能的机器比较友好，但是效果会比较单一
    */
    setEnableSpring(enable = true) {
      this.disableSpring = !enable;
      if (enable) this.element.classList.remove(lyric_player_module_default.disableSpring);
      else this.element.classList.add(lyric_player_module_default.disableSpring);
      this.calcLayout(LayoutReason.ConfigChange);
    }
    /**
    * 获取当前是否启用了物理弹簧
    * @returns 是否启用物理弹簧
    */
    getEnableSpring() {
      return !this.disableSpring;
    }
    /**
    * 设置当前播放歌词，要注意传入后这个数组内的信息不得修改，否则会发生错误
    * @param lines 歌词数组
    * @param initialTime 初始时间，默认为 0
    * @throws {TypeError} 歌词时间戳不是有限的非负数字
    * @throws {RangeError} 任一行、单词或注音的开始时间晚于结束时间
    */
    setLyricLines(lines, initialTime = 0) {
      if (true) console.log("\u8BBE\u7F6E\u6B4C\u8BCD\u884C", lines, initialTime);
      this.dataManager.setOriginalLines(lines);
      this.rebuildLyricView(initialTime);
    }
    /**
    * 获取当前是否在播放
    * @returns 当前是否在播放
    */
    getIsPlaying() {
      return this.isPlaying;
    }
    /**
    * 设置当前播放进度，此时将会更新内部的歌词进度信息。
    *
    * 内部会根据调用间隔和播放进度自动决定应如何滚动和显示歌词，所以此方法的调用频率越快越准确越好。
    * 调用频率较低或进度细度过粗可能会导致歌词显示延迟或导致自动跳转推导错误。
    * 调用完成后，应每帧调用 {@link update} 方法来执行歌词动画效果。此函数本身不会触发动画效果。
    *
    * 当 `isSeek` 为 `true` 时，将强制按跳转处理，并在下次调用 {@link update} 时触发一系列的行为变更，
    * 具体请参考 <https://amll.dev/guides/component/seeking>，因此请只在真正跳转时设为 `true`
    *
    * @param time 当前播放进度，单位为毫秒，非有限值会被静默忽略
    * @param isSeek 是否强制按跳转处理，默认交由内部推导
    * @see {@link setEnableAutoSeekDetection} 自动推导跳转状态的文档
    * @see https://amll.dev/guides/component/sequence#播放进度
    */
    setCurrentTime(time, isSeek = false) {
      if (!Number.isFinite(time)) return;
      const mediaTime = MediaTime.round(MediaTime.fromMillis(time));
      const isDetectedSeek = this.enableAutoSeekDetection ? this.seekDetector.detect(mediaTime, this.isPlaying) : false;
      this.syncTime(mediaTime, isSeek || isDetectedSeek);
    }
    /**
    * 推进时间线并把增量变化应用到视图上
    * @param mediaTime 当前播放进度
    * @param isSeek 这次进度变化是否为跳转
    */
    syncTime(mediaTime, isSeek) {
      const wasFocusOnInterlude = this.timelineController.getSnapshot().isFocusOnInterlude;
      const diff = this.timelineController.sync(mediaTime, isSeek);
      this.interludeDots.syncClock(mediaTime);
      if (!diff.hasChanged) return;
      const isTimeJumped = diff.isTimeJumped;
      const snapshot = this.timelineController.getSnapshot();
      for (let i = 0; i < diff.removedHighlighted.length; i++) this.currentLyricGroups[diff.removedHighlighted[i]]?.disable();
      if (isTimeJumped) for (const index of snapshot.highlightedGroups) this.currentLyricGroups[index]?.enable();
      else for (let i = 0; i < diff.addedHighlighted.length; i++) this.currentLyricGroups[diff.addedHighlighted[i]]?.enable();
      if (isTimeJumped) {
        if (!this.scrollState.isTouchScrolled) this.resetScroll();
      } else if ((diff.isScrollToChanged || wasFocusOnInterlude) && !snapshot.isFocusOnInterlude && snapshot.playingGroups.has(snapshot.scrollToIndex) && this.scrollState.isAutoAlignSuspended && this.scrollEngine.canResumeAutoAlign && this.currentLyricGroups[snapshot.scrollToIndex]?.isInRenderRange(false)) this.resetScroll();
      if (diff.isInterludeChanged || diff.isScrollToChanged || diff.isEndOfSongChanged || isTimeJumped) this.updateSpringParams(!!snapshot.activeInterlude, isTimeJumped, snapshot.isEndOfSong);
      this.calcLayout(isTimeJumped ? LayoutReason.Seek : LayoutReason.PlaybackTick);
    }
    /**
    * 重新构建歌词行和时间状态
    *
    * 一般用于在调用 {@link setLyricProcessConfig} 更新配置后手动刷新视图，
    * 或在外部样式/DOM 结构发生改变后重置歌词视图
    *
    * @param initialTime 重建后对齐的初始时间（毫秒），默认使用当前播放进度
    */
    rebuildLyricView(initialTime = this.getCurrentTime()) {
      this.resetScroll();
      this.focusController.reset();
      if (this.getBottomLineElement().innerHTML.trim().length > 0) this.bottomLine.resetPosition();
      for (const group of this.currentLyricGroups) group.dispose();
      this.currentLyricGroups = [];
      this.interludeDots.clearInterlude(true);
      this.buildLyricGroups();
      this.currentLyricGroups.sort((a, b) => MediaTime.cmp(a.startTime, b.startTime));
      for (let i = 0; i < this.currentLyricGroups.length; i++) this.lyricGroupIndexMap.set(this.currentLyricGroups[i], i);
      const bounds = this.currentLyricGroups.map((group) => ({
        startTime: group.startTime,
        endTime: group.endTime
      }));
      this.timelineController.setTimeBounds(bounds);
      this.layoutCalculator.initHeights(this.currentLyricGroups.length, this.defaultLineHeight);
      this.seekDetector.reset();
      this.setCurrentTime(initialTime, true);
      this.calcLayout(LayoutReason.RebuildView);
      if (true) console.log("\u6B4C\u8BCD\u89C6\u56FE\u91CD\u5EFA\u5B8C\u6210", this);
    }
    /**
    * 更新歌词纵向滚动动画的弹簧参数。
    *
    * 其策略为：
    * - seeking 或间奏时使用更稳定的固定参数
    * - 普通播放时根据相邻歌词的时间间隔动态调整 stiffness / damping
    * - 播放完毕时使用中速弹簧参数
    *
    * @param isInterludeActive 当前是否命中间奏区间
    * @param isSeeking 本次同步的时间轴是否发生了跳转
    * @param isEndOfSong 歌曲是否播放完毕
    */
    updateSpringParams(isInterludeActive, isSeeking, isEndOfSong) {
      if (!this.getEnableSpring() || this.currentLyricGroups.length === 0) return;
      const { scrollToIndex } = this.timelineController.getSnapshot();
      const currentGroup = this.currentLyricGroups[scrollToIndex];
      const prevGroup = this.currentLyricGroups[scrollToIndex - 1];
      let interval;
      if (currentGroup && prevGroup) interval = Duration.asMillis(MediaTime.since(currentGroup.startTime, prevGroup.startTime));
      const policy = getPosYSpringPolicy(isSeeking, isInterludeActive, interval, isEndOfSong);
      this.setLinePosYSpringParams(policy);
    }
    /**
    * 重新计算歌词行的几何排版坐标与视觉状态
    *
    * 此方法不会触发 DOM 强制重排
    *
    * 计算完成后，在每一帧调用 `update()` / `commitChanges()` 即可让歌词平滑移动至目标位置
    *
    * @internal 仅供内部和绑定包使用
    * @param reason 触发排版布局更新的原因场景
    */
    calcLayout(reason) {
      const strategy = LayoutReasonStrategyMap[reason];
      const snapshot = this.timelineController.getSnapshot();
      const interlude = snapshot.activeInterlude;
      let canDisplayInterlude = false;
      if (interlude) canDisplayInterlude = this.interludeDots.setInterlude([interlude.startTime, interlude.endTime], snapshot.currentTime, strategy.resetInterlude, interlude.anchorLineIndex);
      else this.interludeDots.clearInterlude();
      const focalTarget = this.focusController.resolve(snapshot, this.currentLyricGroups.length, {
        isAutoAlignSuspended: this.scrollState.isAutoAlignSuspended,
        hasBottomContent: this.hasBottomContent,
        canDisplayInterlude
      });
      const dotMargin = (this.baseFontSize || 24) * 0.4;
      const totalInterludeHeight = this.layoutState.interludeDotsSize[1] + dotMargin * 2;
      const ctx = this.frameContext;
      ctx.containerHeight = this.size[1];
      ctx.target = focalTarget;
      ctx.bottomLineHeight = this.bottomLine.lineSize[1] || 0;
      const activeInterludeForLayout = canDisplayInterlude ? interlude : void 0;
      const interludeAnchorIndex = LayoutCalculator.resolveInterludeAnchorIndex(activeInterludeForLayout, focalTarget);
      if (interludeAnchorIndex !== void 0) {
        ctx.interlude = ctx.interlude || {
          totalHeight: 0,
          anchorIndex: 0
        };
        ctx.interlude.totalHeight = totalInterludeHeight;
        ctx.interlude.anchorIndex = interludeAnchorIndex;
      } else ctx.interlude = void 0;
      const { bounds, session } = this.layoutCalculator.beginFrame(ctx, this.layoutConfig);
      ctx.scrollOffset = this.scrollEngine.updateBoundary(bounds.min, bounds.max);
      const result = this.layoutCalculator.commit(session, ctx.scrollOffset);
      if (result.hasInterlude && canDisplayInterlude && interlude) {
        const nextLineIndex = interlude.anchorLineIndex + 1;
        const targetX = this.currentLyricGroups[nextLineIndex]?.mainLine.getLine().isDuet ?? false ? this.size[0] - this.layoutState.interludeDotsSize[0] : 0;
        this.interludeDots.setTransform(targetX, result.interludeY + dotMargin, strategy.snapPosY || !this.getEnableSpring());
      }
      const visual = this.visualFrame;
      visual.latestIndex = snapshot.latestHighlightedIndex ?? snapshot.scrollToIndex;
      visual.passedBoundary = interlude ? interlude.anchorLineIndex + 1 : snapshot.scrollToIndex;
      visual.isNarrowViewport = window.innerWidth <= 1024;
      const activeCount = result.lineCount;
      let delay = Duration.ZERO;
      let baseDelay = strategy.disableStagger ? Duration.ZERO : Duration.fromSecs(0.05);
      for (let i = 0; i < activeCount; i++) {
        const group = this.currentLyricGroups[i];
        const instruction = result.lineInstructions[i];
        const curPos = instruction.y;
        const isInViewport = instruction.isInViewport;
        const isActive = this.resolveIsActive(i, snapshot);
        group.setTransform(curPos, strategy.snapPosY, delay, isActive, this.resolveOpacity(i, isInViewport, snapshot), this.resolveBlurLevel(i, isActive, isInViewport, snapshot));
        if (curPos + instruction.height >= 0) {
          delay = Duration.add(delay, baseDelay);
          if (i >= snapshot.scrollToIndex) baseDelay = Duration.mulF64(baseDelay, 1 / 1.05);
        }
      }
      const isBottomFocused = focalTarget.type === "bottom";
      this.bottomLine.setFocused(isBottomFocused);
      this.bottomLine.setTransform(result.bottomLineY, this.resolveBlurLevel(activeCount, isBottomFocused, result.isBottomLineInViewport, snapshot), strategy.snapPosY, delay);
    }
    /**
    * 推导某一行是否处于激活状态
    * @param index 歌词行索引
    * @param snapshot 当前帧的时间线快照
    */
    resolveIsActive(index, snapshot) {
      return snapshot.highlightedGroups.has(index) || index >= snapshot.scrollToIndex && index < this.visualFrame.latestIndex;
    }
    /**
    * 推导一行的目标透明度
    * @param index 歌词行索引
    * @param isInViewport 该行是否在可视区域内
    * @param snapshot 当前帧的时间线快照
    */
    resolveOpacity(index, isInViewport, snapshot) {
      if (!isInViewport) return 0;
      if (this.hidePassedLines && this.isPlaying && index < this.visualFrame.passedBoundary) return 1e-4;
      if (snapshot.highlightedGroups.has(index)) return 0.85;
      return this.isNonDynamic ? 0.2 : 1;
    }
    /**
    * 按距焦点的行距推导模糊档位
    * @param index 歌词行索引，底栏传入歌词总行数
    * @param isFocused 该目标是否为当前焦点，歌词行传 `isActive`，底栏传是否聚焦底栏
    * @param isInViewport 该目标是否在可视区域内
    * @param snapshot 当前帧的时间线快照
    */
    resolveBlurLevel(index, isFocused, isInViewport, snapshot) {
      if (!this.enableBlur) return 0;
      if (!isInViewport) return 5;
      if (this.scrollState.isTouchScrolled || isFocused) return 0;
      const scrollToIndex = snapshot.scrollToIndex;
      const level = 1 + (index < scrollToIndex ? Math.abs(scrollToIndex - index) + 1 : Math.abs(index - this.visualFrame.latestIndex));
      return this.visualFrame.isNarrowViewport ? level * 0.8 : level;
    }
    /**
    * 设置所有歌词行、底栏和间奏点在横坐标上的弹簧属性，包括重量、弹力和阻力。
    *
    * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
    * @deprecated 考虑到横向弹簧效果并不常见，所以这个函数将会在未来的版本中移除
    */
    setLinePosXSpringParams(_params = {}) {
    }
    /**
    * 设置所有歌词行、底栏和间奏点在​纵坐标上的弹簧属性，包括重量、弹力和阻力。
    *
    * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
    */
    setLinePosYSpringParams(params = {}) {
      this.posYSpringParams = {
        ...this.posYSpringParams,
        ...params
      };
      this.bottomLine.lineTransforms.posY.updateParams(this.posYSpringParams);
      this.interludeDots.posY.updateParams(this.posYSpringParams);
      for (const group of this.currentLyricGroups) {
        group.posY.updateParams(this.posYSpringParams);
        group.bgSlideY.updateParams(this.posYSpringParams);
      }
    }
    /**
    * 设置所有歌词行在​缩放大小上的弹簧属性，包括重量、弹力和阻力。
    *
    * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
    */
    setLineScaleSpringParams(params = {}) {
      this.scaleSpringParams = {
        ...this.scaleSpringParams,
        ...params
      };
      this.scaleForBGSpringParams = {
        ...this.scaleForBGSpringParams,
        ...params
      };
      for (const group of this.currentLyricGroups) {
        group.mainLine.lineTransforms.scale.updateParams(this.scaleSpringParams);
        group.bgLine?.lineTransforms.scale.updateParams(this.scaleForBGSpringParams);
      }
    }
    /**
    * 暂停部分效果演出，目前会暂停播放间奏点的动画，且将背景歌词显示出来
    */
    pause() {
      this.interludeDots.pause();
      if (this.isPlaying) {
        this.isPlaying = false;
        this.calcLayout(LayoutReason.ConfigChange);
      }
    }
    /**
    * 恢复部分效果演出，目前会恢复播放间奏点的动画
    */
    resume() {
      this.interludeDots.resume();
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.calcLayout(LayoutReason.ConfigChange);
      }
    }
    /**
    * 更新动画，这个函数应该被逐帧调用或者在以下情况下调用一次：
    *
    * 1. 刚刚调用完设置歌词函数的时候
    * @param delta 距离上一次被调用到现在的时长，单位为毫秒（可为浮点数）
    */
    update(delta = 0) {
      const d = Duration.min(Duration.fromMillis(delta), MAX_FRAME_DELTA);
      this.bottomLine.update(d);
      this.interludeDots.update(d);
    }
    onResize() {
    }
    /**
    * 获取一个特殊的底栏元素，默认是空白的，可以往内部添加任意元素
    *
    * 这个元素始终在歌词的底部，可以用于显示歌曲创作者等信息
    *
    * 但是请勿删除该元素，只能在内部存放元素
    *
    * @returns 一个元素，可以往内部添加任意元素
    */
    getBottomLineElement() {
      return this.bottomLine.getContentElement?.() ?? this.bottomLine.getElement();
    }
    /**
    * 重置用户滚动状态并恢复自动对齐
    *
    * 一个典型的使用场景是在用户滚动完毕、但歌词未自动归位时立刻归位
    */
    resetScroll() {
      this.scrollEngine.resetScroll(0);
      this.scrollState.isAutoAlignSuspended = false;
      this.scrollState.isTouchScrolled = false;
    }
    /**
    * 获取当前播放的、未经过优化和掩码处理的歌词数组
    *
    * 一般和最后调用 `setLyricLines` 给予的参数一样
    * @returns 当前歌词数组
    */
    getLyricLines() {
      return this.dataManager.getRawLines();
    }
    /**
    * 获取当前歌词的播放位置
    *
    * 一般和最后调用 `setCurrentTime` 给予的参数一样
    * @returns 当前播放位置
    */
    getCurrentTime() {
      return MediaTime.asMillis(this.timelineController.getSnapshot().currentTime);
    }
    /**
    * 设置是否让背景人声行始终后置显示
    *
    * 默认情况下，如果背景歌词开始时间早于主歌词，会在主歌词上方展示；
    * 如果设置为 `true`，则无论时间顺序如何，背景歌词都会始终在主歌词下方展示
    * @param enable 是否启用始终后置
    */
    setAlwaysPostpositionBackground(enable) {
      if (this.alwaysPostpositionBackground === enable) return;
      this.alwaysPostpositionBackground = enable;
      this.rebuildLyricLines();
      this.calcLayout(LayoutReason.ConfigChange);
    }
    /** 获取当前是否设置了让背景人声行始终后置显示 */
    getAlwaysPostpositionBackground() {
      return this.alwaysPostpositionBackground;
    }
    getElement() {
      return this.element;
    }
    dispose() {
      this.scrollEngine.dispose();
      this.element.remove();
      this.bottomLineObserver.disconnect();
      this.interludeDots.dispose();
      this.bottomLine.dispose();
      window.removeEventListener("pageshow", this.onPageShow);
      window.removeEventListener("pagehide", this.onPageHide);
      document.removeEventListener("visibilitychange", this.onVisibilityChange);
    }
  };
  function derivative(f) {
    const h = 1e-3;
    return (x) => (f(x + h) - f(x - h)) / (2 * h);
  }
  function getVelocity(f) {
    return derivative(f);
  }
  var Spring = class {
    currentPosition = 0;
    targetPosition = 0;
    currentTime = 0;
    params = {};
    currentSolver;
    getV;
    getV2;
    queueParams;
    queuePosition;
    constructor(currentPosition = 0) {
      this.targetPosition = currentPosition;
      this.currentPosition = this.targetPosition;
      this.currentSolver = () => this.targetPosition;
      this.getV = () => 0;
      this.getV2 = () => 0;
    }
    resetSolver() {
      const curV = this.getV(this.currentTime);
      this.currentTime = 0;
      this.currentSolver = solveSpring(this.currentPosition, curV, this.targetPosition, 0, this.params);
      this.getV = getVelocity(this.currentSolver);
      this.getV2 = getVelocity(this.getV);
    }
    arrived() {
      return Math.abs(this.targetPosition - this.currentPosition) < 0.01 && Math.abs(this.getV(this.currentTime)) < 0.01 && Math.abs(this.getV2(this.currentTime)) < 0.01 && this.queueParams === void 0 && this.queuePosition === void 0;
    }
    setPosition(targetPosition) {
      this.targetPosition = targetPosition;
      this.currentPosition = targetPosition;
      this.currentSolver = () => this.targetPosition;
      this.getV = () => 0;
      this.getV2 = () => 0;
    }
    update(delta = Duration.ZERO) {
      const dt = Duration.asSecsF64(delta);
      this.currentTime += dt;
      this.currentPosition = this.currentSolver(this.currentTime);
      if (this.queueParams) {
        this.queueParams.time -= dt;
        if (this.queueParams.time <= 0) this.updateParams({ ...this.queueParams });
      }
      if (this.queuePosition) {
        this.queuePosition.time -= dt;
        if (this.queuePosition.time <= 0) this.setTargetPosition(this.queuePosition.position);
      }
      if (this.arrived()) this.setPosition(this.targetPosition);
    }
    updateParams(params, delay = Duration.ZERO) {
      const delaySecs = Duration.asSecsF64(delay);
      if (delaySecs > 0) this.queueParams = {
        ...this.queuePosition ?? {},
        ...params,
        time: delaySecs
      };
      else {
        this.queuePosition = void 0;
        this.params = {
          ...this.params,
          ...params
        };
        this.resetSolver();
      }
    }
    setTargetPosition(targetPosition, delay = Duration.ZERO) {
      const delaySecs = Duration.asSecsF64(delay);
      if (delaySecs <= 0 && Math.abs(this.targetPosition - targetPosition) < 1e-3) {
        this.queuePosition = void 0;
        return;
      }
      if (delaySecs > 0) this.queuePosition = {
        ...this.queuePosition ?? {},
        position: targetPosition,
        time: delaySecs
      };
      else {
        this.queuePosition = void 0;
        this.targetPosition = targetPosition;
        this.resetSolver();
      }
    }
    getCurrentPosition() {
      return this.currentPosition;
    }
  };
  function solveSpring(from, velocity, to, delay = 0, params) {
    const soft = params?.soft ?? false;
    const stiffness = params?.stiffness ?? 100;
    const damping = params?.damping ?? 10;
    const mass = params?.mass ?? 1;
    const delta = to - from;
    if (soft || 1 <= damping / (2 * Math.sqrt(stiffness * mass))) {
      const angular_frequency = -Math.sqrt(stiffness / mass);
      const leftover2 = -angular_frequency * delta - velocity;
      return (t) => {
        t -= delay;
        if (t < 0) return from;
        return to - (delta + t * leftover2) * Math.E ** (t * angular_frequency);
      };
    }
    const damping_frequency = Math.sqrt(4 * mass * stiffness - damping ** 2);
    const leftover = (damping * delta - 2 * mass * velocity) / damping_frequency;
    const dfm = 0.5 * damping_frequency / mass;
    const dm = -(0.5 * damping) / mass;
    return (t) => {
      t -= delay;
      if (t < 0) return from;
      return to - (Math.cos(t * dfm) * delta + Math.sin(t * dfm) * leftover) * Math.E ** (t * dm);
    };
  }
  var BottomLineEl = class {
    lyricPlayer;
    element = document.createElement("div");
    contentElement = document.createElement("div");
    top = 0;
    isFocused = false;
    blur = 0;
    lastTransformStyle = "";
    lastFilterStyle = "";
    lineTransforms = { posY: new Spring(0) };
    /**
    * 底栏当前测量得到的尺寸
    *
    * 由播放器的 ResizeObserver 回调写入
    */
    lineSize = [0, 0];
    constructor(lyricPlayer) {
      this.lyricPlayer = lyricPlayer;
      this.element.setAttribute("class", `${lyric_player_module_default.lyricLineWrapper} ${lyric_player_module_default.bottomLineWrapper}`);
      this.contentElement.setAttribute("class", `${lyric_player_module_default.lyricLine} ${lyric_player_module_default.bottomLine}`);
      this.contentElement.dataset.bottomLine = "true";
      this.element.appendChild(this.contentElement);
      this.rebuildStyle();
    }
    getElement() {
      return this.element;
    }
    getContentElement() {
      return this.contentElement;
    }
    resetPosition() {
      this.lineTransforms.posY.setPosition(window.innerHeight * 2);
      this.rebuildStyle();
    }
    /**
    * 设置底栏是否处于聚焦状态
    *
    * 一般在歌曲播放完毕且底栏有内容时聚焦到底栏并设为 true
    */
    setFocused(focused) {
      if (this.isFocused !== focused) {
        this.isFocused = focused;
        this.contentElement.classList.toggle(lyric_player_module_default.gradientMask, focused);
        if (focused) this.element.dataset.focused = "true";
        else delete this.element.dataset.focused;
      }
    }
    setTransform(top = this.top, blur = 0, immediate = false, delay = Duration.ZERO) {
      this.top = top;
      if (immediate || !this.lyricPlayer.getEnableSpring()) {
        this.blur = Math.min(32, blur);
        if (immediate) this.element.classList.add(lyric_player_module_default.tmpDisableTransition);
        this.lineTransforms.posY.setPosition(top);
        this.rebuildStyle();
        if (immediate) requestAnimationFrame(() => {
          this.element.classList.remove(lyric_player_module_default.tmpDisableTransition);
        });
      } else {
        this.blur = Math.min(5, blur);
        this.lineTransforms.posY.setTargetPosition(top, delay);
      }
    }
    /**
    * 逐帧推进弹簧动画并应用样式
    * @param delta 距离上一次调用的时长
    */
    update(delta = Duration.ZERO) {
      if (!this.lyricPlayer.getEnableSpring()) return;
      this.lineTransforms.posY.update(delta);
      this.rebuildStyle();
    }
    /**
    * 将弹簧当前位置与模糊值写入内联样式
    */
    rebuildStyle() {
      const style = this.element.style;
      const transformStr = `translate(0px, ${this.lineTransforms.posY.getCurrentPosition().toFixed(2)}px)`;
      if (this.lastTransformStyle !== transformStr) {
        this.lastTransformStyle = transformStr;
        style.transform = transformStr;
      }
      const blurVal = Math.min(5, this.blur);
      const filterStr = blurVal > 0.01 ? `blur(${blurVal.toFixed(2)}px)` : "none";
      if (this.lastFilterStyle !== filterStr) {
        this.lastFilterStyle = filterStr;
        style.filter = filterStr;
      }
    }
    dispose() {
      this.element.remove();
    }
  };
  var DOT3_TRAILING_MS = 750;
  var EXIT_PHASE1_MS = 750;
  var EXIT_PHASE2_MS = 250;
  var EXIT_TOTAL_MS = 1e3;
  var EXIT_FADE_MS = 250;
  var DISMISS_FADE_MS = 150;
  var ENTER_HOLD_MS = 500;
  var ENTER_FADE_MS = 180;
  var DOT_ENTER_FADE_MS = 750;
  var DOT_ENTER_STAGGER_MS = 80;
  var DOT_ENTER_TOTAL_MS = 910;
  var BREATHE_BASE_PERIOD_MS = 4e3;
  var FALLBACK_HOLD_THRESHOLD_MS = 3e3;
  var BREATHE_MAX_SCALE = 1.25;
  var DOT_INACTIVE_OPACITY = 0.2;
  var DOT_COUNT = 3;
  var lightingEasing = bezier(0.56, 0.01, 0.45, 1);
  var enterFadeEasing = bezier(0.59, 0.02, 0.07, 1);
  var exitPhase1Easing = bezier(0.14, 0.06, 0.25, 1);
  var exitPhase2Easing = bezier(0.29, 0.03, 1, 0.38);
  var exitFadeEasing = bezier(0.43, 0.08, 0.83, 0.31);
  var HIDDEN_SNAPSHOT = {
    isActive: false,
    dotOpacities: [
      0,
      0,
      0
    ],
    scale: 1,
    opacity: 0
  };
  var InterludeDotsBase = class {
    left = 0;
    top = 0;
    posY = new Spring(0);
    /**
    * 下一次设置变换位置时是否直接吸附到目标位置
    *
    * 演出重建或位置跳变时新旧坐标可能相距很远，走弹簧会看到间奏点从旧位置滑入的残影
    */
    shouldSnapPosY = true;
    currentTime = MediaTime.ZERO;
    playing = true;
    phase = "idle";
    mode = "breathe";
    fadeElapsedMs = 0;
    fadeInitialOpacity = 0;
    startTime = MediaTime.ZERO;
    endTime = MediaTime.ZERO;
    anchorTime = MediaTime.ZERO;
    delayEndMs = 0;
    bodyEndMs = 0;
    totalEndMs = 0;
    breathePeriodMs = BREATHE_BASE_PERIOD_MS;
    segmentMs = 0;
    dot3DurationMs = 0;
    dot3Target = 0;
    mutDotOpacities = [
      0,
      0,
      0
    ];
    snapshot = {
      isActive: true,
      dotOpacities: this.mutDotOpacities,
      scale: 1,
      opacity: 0
    };
    /**
    * 设置间奏区间并锚定演出时间
    *
    * @param interlude 间奏起止时间
    * @param currentTime 当前播放时间，用于把演出重锚到该时刻；未传入时使用间奏起点
    * @param forceReset 是否强制重建演出，如跳转播放进度或重建歌词视图时
    * @param anchorLineIndex 间奏锚定的歌词行索引
    * @returns 本次间奏是否有足够时长显示间奏点
    */
    setInterlude(interlude, currentTime, forceReset = false, anchorLineIndex = 0) {
      const [startTime, endTime] = interlude;
      const isSameInterlude = this.startTime === startTime && this.endTime === endTime;
      if (!forceReset && isSameInterlude && this.phase !== "fading") return this.phase === "performing";
      this.cancelFadeOut();
      this.startTime = startTime;
      this.endTime = endTime;
      this.currentTime = currentTime ?? startTime;
      if (forceReset) {
        this.anchorTime = this.currentTime;
        this.delayEndMs = ENTER_HOLD_MS;
      } else {
        this.anchorTime = startTime;
        this.delayEndMs = anchorLineIndex === -1 ? 0 : ENTER_HOLD_MS;
      }
      const bodyMs = Math.max(0, Duration.asMillis(MediaTime.since(endTime, this.anchorTime))) - this.delayEndMs - EXIT_TOTAL_MS;
      if (bodyMs < DOT_ENTER_TOTAL_MS) {
        this.hidePerformance();
        return false;
      }
      this.bodyEndMs = this.delayEndMs + bodyMs;
      this.totalEndMs = this.bodyEndMs + EXIT_TOTAL_MS;
      let mode;
      if (bodyMs < FALLBACK_HOLD_THRESHOLD_MS) {
        mode = "fallback-hold";
        this.dot3Target = 1;
      } else {
        mode = "breathe";
        const breatheCycles = Math.max(1, Math.floor(bodyMs / BREATHE_BASE_PERIOD_MS));
        this.breathePeriodMs = bodyMs / breatheCycles;
        this.segmentMs = Math.round((bodyMs + DOT3_TRAILING_MS) / DOT_COUNT);
        this.dot3DurationMs = bodyMs - this.segmentMs * 2;
        this.dot3Target = this.dot3DurationMs / this.segmentMs;
      }
      this.enterPerforming(mode);
      return true;
    }
    /**
    * 清空间奏区间并终止当前演出
    *
    * 与 {@link dismiss} 的区别在于本方法会一并抹去区间状态，
    * 使此后重新进入同一间奏区间时能够重新演出
    *
    * @param immediate 是否立即隐藏而非淡出
    */
    clearInterlude(immediate = false) {
      this.startTime = MediaTime.ZERO;
      this.endTime = MediaTime.ZERO;
      this.dismiss(immediate);
    }
    /**
    * 结束间奏点演出，默认使用 150ms 淡出
    * @param immediate 是否立即隐藏
    */
    dismiss(immediate = false) {
      if (this.phase === "idle") return;
      if (immediate || !this.playing) {
        this.cancelFadeOut();
        this.hidePerformance();
        return;
      }
      if (this.phase === "fading") return;
      if (this.snapshot.opacity <= 0) {
        this.hidePerformance();
        return;
      }
      this.enterFading();
    }
    /**
    * 设置间奏点的变换位置并立即刷新一次
    * @param left 横向位置
    * @param top 纵向位置
    * @param immediate 是否绕过弹簧直接跳转到目标位置，用于触摸拖动等需要跟手的场景
    */
    setTransform(left = this.left, top = this.top, immediate = false) {
      this.left = left;
      this.top = top;
      if (!immediate && this.phase !== "idle" && !this.shouldSnapPosY) this.posY.setTargetPosition(top);
      else {
        this.shouldSnapPosY = false;
        this.posY.setPosition(top);
      }
      this.update();
    }
    pause() {
      this.playing = false;
      if (this.phase === "fading") this.hidePerformance();
    }
    resume() {
      this.playing = true;
    }
    /**
    * 把演出时钟对齐到指定的媒体时间，由宿主每次推送播放进度时调用
    */
    syncClock(time) {
      this.currentTime = time;
    }
    /**
    * 逐帧推进演出并把当前帧交给子类渲染
    * @param delta 距离上一次调用的物理时长
    */
    update(delta = Duration.ZERO) {
      if (this.phase === "idle") return;
      if (this.phase === "fading") {
        this.updateFadeOut(delta);
        return;
      }
      if (this.playing) this.currentTime = MediaTime.add(this.currentTime, delta);
      const elapsed = Duration.max(Duration.ZERO, MediaTime.since(this.currentTime, this.anchorTime));
      const snapshot = this.resolveSnapshot(elapsed);
      this.posY.update(delta);
      this.render(snapshot, this.left, this.posY.getCurrentPosition());
      if (!snapshot.isActive) this.enterIdle();
    }
    /**
    * 释放演出状态
    */
    dispose() {
      this.dismiss(true);
    }
    /**
    * 进入演出阶段并确定编排方式
    *
    * 演出重建后的第一帧位置由外部重新给出，不参与弹簧过渡，
    * 因此一并重置 {@link shouldSnapPosY}
    */
    enterPerforming(mode) {
      this.mode = mode;
      this.phase = "performing";
      this.shouldSnapPosY = true;
    }
    /**
    * 进入淡出阶段，冻结当前帧的不透明度作为衰减起点
    */
    enterFading() {
      this.fadeElapsedMs = 0;
      this.fadeInitialOpacity = this.snapshot.opacity;
      this.phase = "fading";
    }
    /**
    * 结束演出，回到既不推进时钟也不渲染的静止状态
    */
    enterIdle() {
      this.phase = "idle";
    }
    /**
    * 取消正在进行的淡出
    *
    * 只清掉淡出阶段，演出阶段保持原样，随后的收尾仍需据此判断
    * 是否有可见内容要派发隐藏快照
    */
    cancelFadeOut() {
      if (this.phase === "fading") this.enterIdle();
    }
    /**
    * 演出被取消时立即隐藏渲染物并清空演出状态
    */
    hidePerformance() {
      const wasActive = this.phase !== "idle";
      this.enterIdle();
      if (wasActive) this.render(HIDDEN_SNAPSHOT, this.left, this.posY.getCurrentPosition());
    }
    /**
    * 写入三颗圆点当前帧的不透明度
    *
    * 最终不透明度由点亮分数映射的透明度与各圆点的错峰入场系数相乘得到
    *
    * @param internalMs 距演出开始的经过时间
    * @param fractions 三颗圆点各自的点亮分数（0~1）
    */
    writeDotOpacities(internalMs, fractions) {
      this.mutDotOpacities[0] = dotOpacity(fractions[0]) * dotEnterAlpha(0, internalMs);
      this.mutDotOpacities[1] = dotOpacity(fractions[1]) * dotEnterAlpha(1, internalMs);
      this.mutDotOpacities[2] = dotOpacity(fractions[2]) * dotEnterAlpha(2, internalMs);
    }
    /**
    * 物理淡出步进器
    */
    updateFadeOut(delta) {
      this.fadeElapsedMs += Duration.asMillis(delta);
      const progress = clamp01(this.fadeElapsedMs / DISMISS_FADE_MS);
      if (progress >= 1) {
        this.hidePerformance();
        return;
      }
      this.snapshot.opacity = this.fadeInitialOpacity * (1 - exitFadeEasing(progress));
      this.snapshot.isActive = true;
      this.posY.update(delta);
      this.render(this.snapshot, this.left, this.posY.getCurrentPosition());
    }
    /**
    * 按经过时间求出该时刻的视觉状态
    *
    * @remarks 返回的快照对象是内部复用的同一引用，必须在当前帧内消费完毕
    * @param elapsed 距离本次演出时间锚点的经过时间
    */
    resolveSnapshot(elapsed) {
      const elapsedMs = Duration.asMillis(elapsed);
      if (elapsedMs >= this.totalEndMs) {
        this.snapshot.isActive = false;
        this.snapshot.scale = 1;
        this.snapshot.opacity = 0;
        this.mutDotOpacities[0] = 0;
        this.mutDotOpacities[1] = 0;
        this.mutDotOpacities[2] = 0;
        return this.snapshot;
      }
      this.snapshot.isActive = true;
      if (elapsedMs < this.delayEndMs) {
        this.snapshot.opacity = 0;
        this.snapshot.scale = 1;
        this.mutDotOpacities[0] = 0;
        this.mutDotOpacities[1] = 0;
        this.mutDotOpacities[2] = 0;
        return this.snapshot;
      }
      const internalMs = elapsedMs - this.delayEndMs;
      const fractionAt = (startDelay, duration, target) => computeDotFraction(startDelay, duration, internalMs, target);
      if (elapsedMs >= this.bodyEndMs) {
        const exitElapsedMs = elapsedMs - this.bodyEndMs;
        const fadeT = clamp01((exitElapsedMs - 750) / EXIT_FADE_MS);
        this.snapshot.opacity = enterOpacity(internalMs) * (1 - exitFadeEasing(fadeT));
        if (exitElapsedMs < EXIT_PHASE1_MS) this.snapshot.scale = 1 + exitPhase1Easing(exitElapsedMs / EXIT_PHASE1_MS) * 0.25;
        else {
          const phase2T = clamp01((exitElapsedMs - EXIT_PHASE1_MS) / EXIT_PHASE2_MS);
          this.snapshot.scale = BREATHE_MAX_SCALE - exitPhase2Easing(phase2T) * 0.85;
        }
        const trailing = clamp01(exitElapsedMs / DOT3_TRAILING_MS);
        this.writeDotOpacities(internalMs, [
          1,
          1,
          this.dot3Target + (1 - this.dot3Target) * trailing
        ]);
        return this.snapshot;
      }
      this.snapshot.opacity = enterOpacity(internalMs);
      if (this.mode === "fallback-hold") {
        this.snapshot.scale = 1;
        this.writeDotOpacities(internalMs, [
          1,
          1,
          1
        ]);
        return this.snapshot;
      }
      const progress = breathingProgress(internalMs % this.breathePeriodMs / this.breathePeriodMs);
      this.snapshot.scale = progress <= 0.5 ? 1 + progress / 0.5 * 0.25 : BREATHE_MAX_SCALE - (progress - 0.5) / 0.5 * 0.25;
      this.writeDotOpacities(internalMs, [
        fractionAt(0, this.segmentMs, 1),
        fractionAt(this.segmentMs, this.segmentMs, 1),
        fractionAt(this.segmentMs * 2, this.dot3DurationMs, this.dot3Target)
      ]);
      return this.snapshot;
    }
  };
  function breathingProgress(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    const angle = 4 * Math.PI * t;
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return t - 0.084 * s + 8e-3 * (1 - c) + 46e-4 * s * (c - s);
  }
  function dotOpacity(fraction) {
    return DOT_INACTIVE_OPACITY + 0.7 * clamp01(fraction);
  }
  function enterOpacity(internalMs) {
    return enterFadeEasing(clamp01(internalMs / ENTER_FADE_MS));
  }
  function dotEnterAlpha(index, internalMs) {
    const t = clamp01((internalMs - index * DOT_ENTER_STAGGER_MS) / DOT_ENTER_FADE_MS);
    return t * t;
  }
  function computeDotFraction(startDelay, duration, internalMs, target) {
    if (internalMs <= startDelay) return 0;
    const localT = (internalMs - startDelay) / duration;
    return lightingEasing(clamp01(localT)) * target;
  }
  var InterludeDotsEl = class extends InterludeDotsBase {
    element = document.createElement("div");
    dot0 = document.createElement("span");
    dot1 = document.createElement("span");
    dot2 = document.createElement("span");
    lastStyle = "";
    constructor() {
      super();
      this.element.className = lyric_player_module_default.interludeDots;
      this.element.appendChild(this.dot0);
      this.element.appendChild(this.dot1);
      this.element.appendChild(this.dot2);
      this.element.style.opacity = "0";
    }
    getElement() {
      return this.element;
    }
    render(snapshot, left, top) {
      const curStyle = `transform:translate(${left.toFixed(2)}px, ${top.toFixed(2)}px) scale(${snapshot.scale.toFixed(4)});opacity:${snapshot.opacity.toFixed(3)}`;
      this.dot0.style.opacity = snapshot.dotOpacities[0].toFixed(3);
      this.dot1.style.opacity = snapshot.dotOpacities[1].toFixed(3);
      this.dot2.style.opacity = snapshot.dotOpacities[2].toFixed(3);
      if (this.lastStyle !== curStyle) {
        this.element.setAttribute("style", curStyle);
        this.lastStyle = curStyle;
      }
    }
    dispose() {
      super.dispose();
      this.element.remove();
    }
  };
  var LyricLineGroupBase = class {
    mainLine;
    bgLine;
    posY = new Spring(0);
    bgSlideY = new Spring(-80);
    top = 0;
    delay = Duration.ZERO;
    isActive = false;
    opacity = 1;
    blur = 0;
    isBgFirst = false;
    isUiDirty = true;
    constructor(mainLine, bgLine) {
      this.mainLine = mainLine;
      this.bgLine = bgLine;
    }
    get startTime() {
      return MediaTime.fromMillis(this.mainLine.getLine().startTime);
    }
    get endTime() {
      return MediaTime.fromMillis(this.mainLine.getLine().endTime);
    }
    onLineSizeChange(size) {
      this.mainLine.onLineSizeChange(size);
      this.bgLine?.onLineSizeChange(size);
    }
    setTransform(top, immediate, delay, isActive, opacity, blur) {
      this.top = top;
      this.delay = delay;
      this.isActive = isActive;
      this.opacity = opacity;
      this.blur = blur;
      this.setLineTransformations(delay);
      const enableSpring = this.lyricPlayer.getEnableSpring();
      const hiddenSlideY = (this.lyricPlayer.getAlwaysPostpositionBackground() ? false : this.isBgFirst) ? 80 : -80;
      const isPlaying = this.lyricPlayer.getIsPlaying();
      const targetBgSlideY = isActive || !isPlaying ? 0 : hiddenSlideY;
      if (immediate || !enableSpring) {
        this.posY.setPosition(top);
        this.bgSlideY.setPosition(targetBgSlideY);
      } else {
        this.posY.setTargetPosition(top, delay);
        this.bgSlideY.setTargetPosition(targetBgSlideY, delay);
      }
      this.isUiDirty = true;
    }
    setLineTransformations(delay) {
      const enableScale = this.lyricPlayer.getEnableScale();
      const isPlaying = this.lyricPlayer.getIsPlaying();
      const renderMode = this.isActive ? LyricLineRenderMode.GRADIENT : LyricLineRenderMode.SOLID;
      const SCALE_ASPECT = enableScale ? 97 : 100;
      let mainScale = 100;
      if (!this.isActive && isPlaying) mainScale = SCALE_ASPECT;
      this.mainLine.setTransform(mainScale, 1, 0, delay, renderMode);
      let bgScale = 100;
      if (!this.isActive && isPlaying) bgScale = 75;
      this.bgLine?.setTransform(bgScale, 1, 0, delay, renderMode);
    }
    update(delta = Duration.ZERO) {
      if (this.lyricPlayer.getEnableSpring()) {
        const posMoving = !this.posY.arrived();
        const bgMoving = !this.bgSlideY.arrived();
        this.posY.update(delta);
        this.bgSlideY.update(delta);
        if (posMoving || bgMoving) this.isUiDirty = true;
      }
      this.mainLine.update(delta);
      this.bgLine?.update(delta);
    }
    commitChanges() {
      if (!this.isInRenderRange()) return;
      if (this.isUiDirty) {
        this.renderStyles();
        this.isUiDirty = false;
      }
      this.mainLine.commitChanges();
      this.bgLine?.commitChanges();
    }
    rebuildAllLines() {
      this.mainLine.rebuildElement();
      this.bgLine?.rebuildElement();
    }
    enable(time, shouldPlay) {
      this.mainLine.enable(time, shouldPlay);
      this.bgLine?.enable(time, shouldPlay);
    }
    disable() {
      this.mainLine.disable();
      this.bgLine?.disable();
    }
    dispose() {
      this.mainLine.dispose();
      this.bgLine?.dispose();
    }
  };
  var LyricLineGroup = class extends LyricLineGroupBase {
    lyricPlayer;
    element;
    bgWrapper;
    lastIsActive;
    lastBgHeight = 0;
    lastBgIsHidden;
    lastYNum = -9999;
    lastOpacityNum = -1;
    lastBlurNum = -1;
    lastBgSlideYNum = -9999;
    constructor(lyricPlayer, mainLine) {
      super(mainLine);
      this.lyricPlayer = lyricPlayer;
      this.element = document.createElement("div");
      this.element.className = lyric_player_module_default.lyricLineWrapper;
      if (mainLine.getLine().isDuet) this.element.classList.add(lyric_player_module_default.isDuetWrapper);
      this.element.appendChild(mainLine.getElement());
      this.posY.setPosition(window.innerHeight * 2);
      lyricPlayer.resizeObserver.observe(this.element);
    }
    getElement() {
      return this.element;
    }
    isInRenderRange(includeOverscan = true) {
      const top = this.posY.getCurrentPosition();
      const index = this.lyricPlayer.currentLyricGroups.indexOf(this);
      const height = index !== -1 ? this.lyricPlayer.getLineHeight(index) : this.lyricPlayer.defaultLineHeight;
      const viewportHeight = this.lyricPlayer.size[1];
      if (viewportHeight <= 0 || height <= 0) return false;
      const overscan = includeOverscan ? this.lyricPlayer.getOverscanPx() : 0;
      return top < viewportHeight + overscan && top + height > -overscan;
    }
    show() {
      if (!this.element.parentElement) {
        const playerEl = this.lyricPlayer.getElement();
        const groups = this.lyricPlayer.currentLyricGroups;
        const myIndex = groups.indexOf(this);
        let referenceNode = null;
        if (myIndex !== -1) {
          for (let i = myIndex + 1; i < groups.length; i++) if (groups[i].element.parentElement === playerEl) {
            referenceNode = groups[i].element;
            break;
          }
        }
        playerEl.insertBefore(this.element, referenceNode);
        this.lyricPlayer.resizeObserver.observe(this.element);
        if (this.bgWrapper) this.lyricPlayer.resizeObserver.observe(this.bgWrapper);
      }
      this.mainLine.show();
      this.bgLine?.show();
    }
    hide() {
      if (this.element.parentElement) {
        this.lyricPlayer.resizeObserver.unobserve(this.element);
        if (this.bgWrapper) this.lyricPlayer.resizeObserver.unobserve(this.bgWrapper);
        this.element.remove();
      }
    }
    update(delta = Duration.ZERO) {
      super.update(delta);
    }
    commitChanges() {
      if (this.isInRenderRange()) {
        this.show();
        super.commitChanges();
      } else this.hide();
    }
    onBgSizeChange(size) {
      if (this.bgWrapper && this.lastBgHeight !== size[1]) {
        this.lastBgHeight = size[1];
        this.lastBgSlideYNum = -9999;
        this.isUiDirty = true;
      }
    }
    addBgLine(bgLine) {
      if (this.bgLine) this.bgLine.dispose();
      if (this.bgWrapper) this.bgWrapper.remove();
      this.bgLine = bgLine;
      const bgStartTime = bgLine.getLine().words[0]?.startTime ?? bgLine.getLine().startTime;
      const mainStartTime = this.mainLine.getLine().words[0]?.startTime ?? this.mainLine.getLine().startTime;
      this.isBgFirst = bgStartTime < mainStartTime;
      if (this.mainLine.getLine().isDuet) {
        bgLine.getElement().classList.add(lyric_player_module_default.lyricDuetLine);
        this.element.classList.add(lyric_player_module_default.isDuetWrapper);
      }
      this.bgWrapper = document.createElement("div");
      this.bgWrapper.className = lyric_player_module_default.bgWrapper;
      this.bgWrapper.appendChild(bgLine.getElement());
      if (!this.lyricPlayer.getAlwaysPostpositionBackground() && this.isBgFirst) {
        this.bgWrapper.classList.add(lyric_player_module_default.bgWrapperTop);
        this.element.insertBefore(this.bgWrapper, this.mainLine.getElement());
        this.bgSlideY.setPosition(80);
      } else this.element.appendChild(this.bgWrapper);
      this.lyricPlayer.lyricGroupElementMap.set(this.bgWrapper, this);
      if (this.element.parentElement) this.lyricPlayer.resizeObserver.observe(this.bgWrapper);
      this.lastBgHeight = this.bgWrapper.clientHeight || 0;
    }
    renderStyles() {
      const style = this.element.style;
      const currentY = this.posY.getCurrentPosition();
      if (Math.abs(currentY - this.lastYNum) >= 1e-3) {
        this.lastYNum = currentY;
        style.transform = `translateY(${currentY.toFixed(1)}px)`;
      }
      if (Math.abs(this.opacity - this.lastOpacityNum) >= 0.05) {
        this.lastOpacityNum = this.opacity;
        style.opacity = String(this.opacity);
      }
      const blurVal = Math.min(5, this.blur);
      if (Math.abs(blurVal - this.lastBlurNum) >= 0.05) {
        this.lastBlurNum = blurVal;
        style.filter = blurVal > 0.01 ? `blur(${blurVal.toFixed(2)}px)` : "none";
      }
      if (this.bgWrapper) {
        if (this.lastIsActive !== this.isActive) {
          this.lastIsActive = this.isActive;
          this.bgWrapper.classList.toggle(lyric_player_module_default.bgWrapperActive, this.isActive);
        }
        const bgStyle = this.bgWrapper.style;
        const slideY = this.bgSlideY.getCurrentPosition();
        if (Math.abs(slideY - this.lastBgSlideYNum) >= 1e-3) {
          this.lastBgSlideYNum = slideY;
          const activeProgress = clamp01(1 - Math.abs(slideY) / 80);
          const scaleStr = (0.8 + activeProgress * 0.2).toFixed(3);
          const shouldBgFirst = !this.lyricPlayer.getAlwaysPostpositionBackground() && this.isBgFirst;
          const translateYPx = slideY / 100 * this.lastBgHeight;
          if (shouldBgFirst) bgStyle.marginTop = `${(-this.lastBgHeight * (1 - activeProgress)).toFixed(1)}px`;
          else bgStyle.marginTop = "";
          bgStyle.transform = `translateY(${translateYPx.toFixed(1)}px) scale(${scaleStr})`;
          const isHidden = Math.abs(slideY - (shouldBgFirst ? 80 : -80)) < 0.1 && !this.isActive;
          if (this.lastBgIsHidden !== isHidden) {
            this.lastBgIsHidden = isHidden;
            this.bgWrapper.classList.toggle(lyric_player_module_default.bgWrapperHidden, isHidden);
          }
        }
      }
    }
    dispose() {
      super.dispose();
      this.lyricPlayer.resizeObserver.unobserve(this.element);
      if (this.bgWrapper) {
        this.lyricPlayer.lyricGroupElementMap.delete(this.bgWrapper);
        this.lyricPlayer.resizeObserver.unobserve(this.bgWrapper);
      }
      this.element.remove();
    }
  };
  var isCJK = (char) => {
    return /^[\p{Unified_Ideograph}\u0800-\u9FFC]+$/u.test(char);
  };
  var LyricLineBase = class extends EventTarget {
    top = 0;
    scale = 1;
    blur = 0;
    opacity = 1;
    delay = Duration.ZERO;
    isUiDirty = true;
    lineTransforms = { scale: new Spring(100) };
    /**
    * 用于 CJK 词语边界检测的分词器
    */
    static wordSegmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "word" }) : null;
    /**
    * Unicode 标准的全局 Grapheme Cluster 分词器
    * 用于正确处理 emoji、复合字符等
    */
    static graphemeSegmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null;
    setTransform(scale = this.scale, opacity = this.opacity, blur = this.blur, delay = Duration.ZERO, _mode = LyricLineRenderMode.SOLID) {
      this.scale = scale;
      this.opacity = opacity;
      this.blur = blur;
      this.delay = delay;
      this.isUiDirty = true;
    }
    rebuildElement() {
    }
    /**
    * 判定歌词是否可以应用强调辉光效果
    *
    * 果子在对辉光效果的解释是一种强调（emphasized）效果
    *
    * 条件是一个单词时长大于等于 1s 且长度小于等于 7
    *
    * @param word 单词
    * @returns 是否可以应用强调辉光效果
    */
    static shouldEmphasize(word) {
      if (isCJK(word.word)) return word.endTime - word.startTime >= 1e3;
      return word.endTime - word.startTime >= 1e3 && word.word.trim().length <= 7 && word.word.trim().length > 1;
    }
    dispose() {
    }
  };
  var OVERFLOW_PENALTY_MULTIPLIER = 1e3;
  var CJK_BREAK_PENALTY_RATIO = 0.15;
  var NORMAL_BREAK_PENALTY_RATIO = 0.5;
  var SPACE_BREAK_REWARD_RATIO = 0.4;
  var PUNCTUATION_BREAK_REWARD_RATIO = 0.6;
  var PUNCTUATION_REGEX = /[,.;:!?，。；：！？、）】》」』’”)[\]}>~…]$/;
  function calcBalancedBreaks(children, containerWidth, fullText, segmenter) {
    const n = children.length;
    if (n === 0 || containerWidth <= 0) return [];
    const cjkBoundaries = /* @__PURE__ */ new Set();
    let offset = 0;
    for (const { segment, isWordLike } of segmenter.segment(fullText)) {
      if (offset > 0 && isWordLike) {
        if ([...segment].some((ch) => isCJK(ch))) cjkBoundaries.add(offset);
      }
      offset += segment.length;
    }
    const charOffsets = new Int32Array(n + 1);
    const prefixWidth = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
      charOffsets[i + 1] = charOffsets[i] + children[i].text.length;
      prefixWidth[i + 1] = prefixWidth[i] + children[i].width;
    }
    if (prefixWidth[n] <= containerWidth) return [];
    const dp = new Float64Array(n + 1).fill(Number.POSITIVE_INFINITY);
    const nextBreak = new Int32Array(n + 1).fill(-1);
    dp[n] = 0;
    const PENALTY_CJK = (containerWidth * CJK_BREAK_PENALTY_RATIO) ** 2;
    const PENALTY_NORMAL = (containerWidth * NORMAL_BREAK_PENALTY_RATIO) ** 2;
    for (let i = n - 1; i >= 0; i--) for (let j = i + 1; j <= n; j++) {
      const w = prefixWidth[j] - prefixWidth[i];
      let lineCost = 0;
      if (w > containerWidth) {
        if (j === i + 1) lineCost = (w - containerWidth) ** 2 * OVERFLOW_PENALTY_MULTIPLIER;
        else continue;
      } else lineCost = (containerWidth - w) ** 2;
      let breakPenalty = 0;
      if (j < n) {
        const prevChild = children[j - 1];
        if (PUNCTUATION_REGEX.test(prevChild.text)) breakPenalty = -((containerWidth * PUNCTUATION_BREAK_REWARD_RATIO) ** 2);
        else if (prevChild.isSpace) breakPenalty = -((containerWidth * SPACE_BREAK_REWARD_RATIO) ** 2);
        else if (cjkBoundaries.has(charOffsets[j])) breakPenalty = PENALTY_CJK;
        else breakPenalty = PENALTY_NORMAL;
      }
      const totalCost = lineCost + breakPenalty + dp[j];
      if (totalCost < dp[i]) {
        dp[i] = totalCost;
        nextBreak[i] = j;
      }
    }
    const breaks = [];
    let curr = 0;
    while (curr < n) {
      curr = nextBreak[curr];
      if (curr > 0 && curr < n) breaks.push(curr);
    }
    return breaks;
  }
  var sharedCanvasCtx = null;
  function getMeasurementContext() {
    if (!sharedCanvasCtx) sharedCanvasCtx = document.createElement("canvas").getContext("2d");
    return sharedCanvasCtx;
  }
  var LineBalancer = class {
    mainElement;
    isBalancing = false;
    lastBalancedContainerWidth = -1;
    constructor(mainElement) {
      this.mainElement = mainElement;
    }
    balanceLineBreaks(isNonDynamic, hasSplittedWords, wordSegmenter) {
      if (this.isBalancing || !this.mainElement) return;
      const computedStyle = getComputedStyle(this.mainElement);
      const paddingLeft = Number.parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = Number.parseFloat(computedStyle.paddingRight) || 0;
      const containerWidth = this.mainElement.clientWidth - paddingLeft - paddingRight;
      if (containerWidth <= 0) return;
      if (isNonDynamic) {
        this.balanceNonDynamicLineBreaks(containerWidth, computedStyle, wordSegmenter);
        return;
      }
      if (!hasSplittedWords) return;
      this.balanceDynamicLineBreaks(containerWidth, wordSegmenter);
    }
    reset() {
      this.lastBalancedContainerWidth = -1;
    }
    executeLineBalance(containerWidth, adapter, wordSegmenter) {
      const existingBrs = this.mainElement.querySelectorAll("br");
      if (containerWidth === this.lastBalancedContainerWidth && existingBrs.length > 0) return;
      adapter.resetDOM();
      const prevWhiteSpace = this.mainElement.style.whiteSpace;
      this.mainElement.style.whiteSpace = "nowrap";
      const parentElement = this.mainElement.parentElement;
      let prevTransform = "";
      let transformChanged = false;
      if (parentElement) {
        prevTransform = parentElement.style.transform;
        if (prevTransform && prevTransform !== "none") {
          parentElement.style.transform = "none";
          transformChanged = true;
        }
      }
      let lockAcquired = false;
      try {
        const { childInfos, fullText } = adapter.buildChildInfos();
        let layoutWidth = childInfos.reduce((sum, c) => sum + c.width, 0);
        if (adapter.needsCalibration) {
          const range = document.createRange();
          range.selectNodeContents(this.mainElement);
          const visualWidth = range.getBoundingClientRect().width;
          if (layoutWidth > 0 && visualWidth > 0) {
            const scale = visualWidth / layoutWidth;
            for (const info of childInfos) info.width *= scale;
          }
          layoutWidth = visualWidth;
        }
        const safeContainerWidth = Math.max(1, containerWidth);
        if (layoutWidth <= safeContainerWidth) {
          this.lastBalancedContainerWidth = containerWidth;
          return;
        }
        const breaks = calcBalancedBreaks(childInfos, safeContainerWidth, fullText, wordSegmenter);
        if (breaks.length === 0) {
          this.lastBalancedContainerWidth = containerWidth;
          return;
        }
        this.isBalancing = true;
        lockAcquired = true;
        adapter.applyBreaks(breaks, childInfos);
        this.lastBalancedContainerWidth = containerWidth;
        this.isBalancing = false;
      } finally {
        this.mainElement.style.whiteSpace = prevWhiteSpace;
        if (transformChanged && parentElement) parentElement.style.transform = prevTransform;
        if (lockAcquired) this.isBalancing = false;
      }
    }
    balanceDynamicLineBreaks(containerWidth, wordSegmenter) {
      const infoToNode = [];
      this.executeLineBalance(containerWidth, {
        resetDOM: () => {
          this.mainElement.querySelectorAll("br").forEach((br) => {
            br.remove();
          });
        },
        buildChildInfos: () => {
          infoToNode.length = 0;
          const childNodes = Array.from(this.mainElement.childNodes);
          const childInfos = [];
          const range = document.createRange();
          for (const node of childNodes) if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? "";
            if (text.length === 0) continue;
            range.selectNodeContents(node);
            childInfos.push({
              width: range.getBoundingClientRect().width,
              text,
              isSpace: text.trim().length === 0
            });
            infoToNode.push(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node;
            const rect = el.getBoundingClientRect();
            const elStyle = getComputedStyle(el);
            const marginLeft = Number.parseFloat(elStyle.marginLeft) || 0;
            const marginRight = Number.parseFloat(elStyle.marginRight) || 0;
            childInfos.push({
              width: clampPositive(rect.width + marginLeft + marginRight),
              text: el.textContent ?? "",
              isSpace: false
            });
            infoToNode.push(node);
          }
          return {
            childInfos,
            fullText: childInfos.map((c) => c.text).join("")
          };
        },
        applyBreaks: (breaks) => {
          for (let i = breaks.length - 1; i >= 0; i--) {
            const breakIndex = breaks[i];
            if (breakIndex >= 0 && breakIndex < infoToNode.length) this.mainElement.insertBefore(document.createElement("br"), infoToNode[breakIndex]);
          }
        },
        needsCalibration: false
      }, wordSegmenter);
    }
    balanceNonDynamicLineBreaks(containerWidth, computedStyle, wordSegmenter) {
      const fullText = this.mainElement.textContent ?? "";
      if (fullText.trim().length === 0) return;
      this.executeLineBalance(containerWidth, {
        resetDOM: () => {
          this.mainElement.innerHTML = "";
          this.mainElement.textContent = fullText;
        },
        buildChildInfos: () => {
          const ctx = getMeasurementContext();
          if (!ctx) {
            console.debug("Canvas 2D context is not supported, skipping line balancing");
            return {
              childInfos: [],
              fullText
            };
          }
          ctx.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
          if ("letterSpacing" in ctx) ctx.letterSpacing = computedStyle.letterSpacing !== "normal" ? computedStyle.letterSpacing : "0px";
          if ("wordSpacing" in ctx) ctx.wordSpacing = computedStyle.wordSpacing !== "normal" ? computedStyle.wordSpacing : "0px";
          const childInfos = [];
          for (const { segment } of wordSegmenter.segment(fullText)) childInfos.push({
            width: ctx.measureText(segment).width,
            text: segment,
            isSpace: segment.trim().length === 0
          });
          return {
            childInfos,
            fullText
          };
        },
        applyBreaks: (breaks, childInfos) => {
          this.mainElement.innerHTML = "";
          const breakSet = new Set(breaks);
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < childInfos.length; i++) {
            if (breakSet.has(i)) fragment.appendChild(document.createElement("br"));
            fragment.appendChild(document.createTextNode(childInfos[i].text));
          }
          this.mainElement.appendChild(fragment);
        },
        needsCalibration: true
      }, wordSegmenter);
    }
  };
  var SPLIT_WHITESPACE_RE = /(\s+)/;
  var WHITESPACE_RE = /\s/g;
  function chunkAndSplitLyricWords(words) {
    const result = [];
    let currentGroup = [];
    const flushGroup = () => {
      if (currentGroup.length > 0) {
        result.push(currentGroup.length === 1 ? currentGroup[0] : [...currentGroup]);
        currentGroup = [];
      }
    };
    const processAtom = (atom) => {
      const isSpace = atom.word.trim().length === 0;
      const hasRuby = (atom.ruby?.length ?? 0) > 0;
      const isCJKChar = isCJK(atom.word);
      if (!isSpace && !hasRuby && !isCJKChar) currentGroup.push(atom);
      else {
        flushGroup();
        result.push(atom);
      }
    };
    for (const w of words) {
      const content = w.word.trim();
      const isSpace = content.length === 0;
      const romanWord = w.romanWord ?? "";
      const obscene = w.obscene ?? false;
      const hasRuby = (w.ruby?.length ?? 0) > 0;
      if (isSpace) {
        processAtom({
          ...w,
          obscene
        });
        continue;
      }
      if (hasRuby) {
        const leadingSpaceMatch = w.word.match(/^\s+/);
        const trailingSpaceMatch = w.word.match(/\s+$/);
        const leadingSpace = leadingSpaceMatch ? leadingSpaceMatch[0] : "";
        const trailingSpace = trailingSpaceMatch ? trailingSpaceMatch[0] : "";
        if (leadingSpace) processAtom({
          word: leadingSpace,
          romanWord: "",
          startTime: w.startTime,
          endTime: w.startTime,
          obscene
        });
        processAtom({
          ...w,
          word: content,
          obscene
        });
        if (trailingSpace) processAtom({
          word: trailingSpace,
          romanWord: "",
          startTime: w.endTime,
          endTime: w.endTime,
          obscene
        });
        continue;
      }
      const parts = w.word.split(SPLIT_WHITESPACE_RE).filter((p2) => p2.length > 0);
      const totalLength = w.word.replace(WHITESPACE_RE, "").length || 1;
      const timePerUnit = (w.endTime - w.startTime) / totalLength;
      const wordParts = w.word.trim().split(/\s+/).filter((p2) => p2.length > 0);
      const romanTrimmed = romanWord.trim();
      const romanParts = romanTrimmed.length > 0 ? romanTrimmed.split(/\s+/).filter((p2) => p2.length > 0) : [];
      const isMatched = wordParts.length > 0 && wordParts.length === romanParts.length;
      let currentOffset = 0;
      let nonSpaceIndex = 0;
      for (const part of parts) {
        if (!part.trim()) {
          const startTime = w.startTime + currentOffset * timePerUnit;
          processAtom({
            word: part,
            romanWord: "",
            startTime,
            endTime: startTime,
            obscene
          });
          continue;
        }
        let partRomanWord = "";
        if (romanParts.length > 0) {
          if (isMatched) partRomanWord = romanParts[nonSpaceIndex] ?? "";
          else if (nonSpaceIndex === 0) partRomanWord = romanWord;
        }
        nonSpaceIndex++;
        if (isCJK(part) && part.length > 1 && romanTrimmed.length === 0) {
          const chars = part.split("");
          for (const char of chars) {
            const startTime = w.startTime + currentOffset * timePerUnit;
            processAtom({
              word: char,
              romanWord: "",
              startTime,
              endTime: startTime + timePerUnit,
              obscene
            });
            currentOffset += 1;
          }
        } else {
          const partRealLen = part.length;
          const startTime = w.startTime + currentOffset * timePerUnit;
          const duration = partRealLen * timePerUnit;
          processAtom({
            word: part,
            romanWord: partRomanWord,
            startTime,
            endTime: startTime + duration,
            obscene
          });
          currentOffset += partRealLen;
        }
      }
    }
    flushGroup();
    return result;
  }
  function createMatrix4() {
    return [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
  }
  function scaleMatrix4(m, scale = 1, origin = {
    x: 0,
    y: 0
  }) {
    const [ox, oy] = [origin.x, origin.y];
    return [
      m[0] * scale,
      m[1] * scale,
      m[2] * scale,
      m[3],
      m[4] * scale,
      m[5] * scale,
      m[6] * scale,
      m[7],
      m[8] * scale,
      m[9] * scale,
      m[10] * scale,
      m[11],
      m[12] - ox * scale + ox,
      m[13] - oy * scale + oy,
      m[14],
      m[15]
    ];
  }
  function matrix4ToCSS(m, fractionDigits = 4) {
    const format = (n, _) => n.toFixed(fractionDigits);
    return `matrix3d(${m.map(format).join(", ")})`;
  }
  var ANIMATION_FRAME_QUANTITY = 32;
  var norNum = (min, max) => (x) => clamp01((x - min) / (max - min));
  var EMP_EASING_MID = 0.5;
  var beginNum = norNum(0, EMP_EASING_MID);
  var endNum = norNum(EMP_EASING_MID, 1);
  var bezIn = bezier(0.2, 0.4, 0.58, 1);
  var bezOut = bezier(0.3, 0, 0.58, 1);
  var makeEmpEasing = (mid) => {
    return (x) => x < mid ? bezIn(beginNum(x)) : 1 - bezOut(endNum(x));
  };
  var empEasing = makeEmpEasing(EMP_EASING_MID);
  function createEmphasizeAnimation(options) {
    const params = calculateEmphasizeParams(options);
    const totalChars = options.characterElements.length;
    const result = [];
    options.characterElements.forEach((el, i) => {
      const wordDe = params.de + params.du / 2.5 / params.anchorCharCount * i;
      result.push(createCharGlowAnimation(el, i, totalChars, wordDe, params));
      result.push(createCharFloatAnimation(el, wordDe, options.isBG, params));
    });
    return result;
  }
  function calculateEmphasizeParams(options) {
    const { duration, delay, rubyCharCount, characterElements, isLastWord } = options;
    const de = clampPositive(delay);
    let du = Math.max(1e3, duration);
    const anchorCharCount = rubyCharCount > 0 ? rubyCharCount : Math.max(1, characterElements.length);
    let amount = du / 2e3;
    amount = amount > 1 ? Math.sqrt(amount) : amount ** 3;
    let blur = du / 3e3;
    blur = blur > 1 ? Math.sqrt(blur) : blur ** 3;
    amount *= 0.6;
    blur *= 0.5;
    if (isLastWord) {
      amount *= 1.6;
      blur *= 1.5;
      du *= 1.2;
    }
    amount = Math.min(1.2, amount);
    blur = Math.min(0.8, blur);
    return {
      amount,
      blur,
      du,
      de,
      anchorCharCount,
      animateDu: Number.isFinite(du) ? du : 0
    };
  }
  function generateGlowKeyframes(charIndex, totalChars, amount, blur) {
    return new Array(ANIMATION_FRAME_QUANTITY).fill(0).map((_, j) => {
      const x = (j + 1) / ANIMATION_FRAME_QUANTITY;
      const transX = empEasing(x);
      const glowLevel = transX * blur;
      const mat = scaleMatrix4(createMatrix4(), 1 + transX * 0.1 * amount);
      const offsetX = -transX * 0.03 * amount * (totalChars / 2 - charIndex);
      const offsetY = -transX * 0.025 * amount;
      return {
        offset: x,
        transform: `${matrix4ToCSS(mat, 4)} translate(${offsetX}em, ${offsetY}em)`,
        textShadow: `0 0 ${Math.min(0.3, blur * 0.3)}em rgba(255, 255, 255, ${glowLevel})`
      };
    });
  }
  function generateFloatKeyframes(isBG) {
    return new Array(ANIMATION_FRAME_QUANTITY).fill(0).map((_, j) => {
      const x = (j + 1) / ANIMATION_FRAME_QUANTITY;
      let y = Math.sin(x * Math.PI);
      if (isBG) y *= 2;
      return {
        offset: x,
        transform: `translateY(${-y * 0.05}em)`
      };
    });
  }
  function createCharGlowAnimation(el, charIndex, totalChars, wordDelay, params) {
    const frames = generateGlowKeyframes(charIndex, totalChars, params.amount, params.blur);
    const glow = el.animate(frames, {
      duration: params.animateDu,
      delay: Number.isFinite(wordDelay) ? wordDelay : 0,
      id: `emphasize-word-${el.textContent}-${charIndex}`,
      iterations: 1,
      composite: "replace",
      fill: "both"
    });
    glow.onfinish = () => glow.pause();
    glow.pause();
    return glow;
  }
  function createCharFloatAnimation(el, wordDelay, isBG, params) {
    const frames = generateFloatKeyframes(isBG);
    const float = el.animate(frames, {
      duration: params.animateDu * 1.4,
      delay: Number.isFinite(wordDelay) ? wordDelay - 400 : 0,
      id: "emphasize-word-float",
      iterations: 1,
      composite: "add",
      fill: "both"
    });
    float.onfinish = () => float.pause();
    float.pause();
    return float;
  }
  function createFloatAnimation(wordEl, options) {
    const { word, lineStartTime, isBG } = options;
    const delay = word.startTime - lineStartTime;
    const duration = Math.max(1e3, word.endTime - word.startTime);
    let up = 0.05;
    if (isBG) up *= 2;
    const a = wordEl.animate([{ transform: "translateY(0px)" }, { transform: `translateY(${-up}em)` }], {
      duration: Number.isFinite(duration) ? duration : 0,
      delay: Number.isFinite(delay) ? delay : 0,
      id: "float-word",
      composite: "add",
      fill: "both",
      easing: "ease-out"
    });
    a.pause();
    return a;
  }
  var bright = "rgb(0 0 0 / var(--bright-mask-alpha, 1))";
  var dark = "rgb(0 0 0 / var(--dark-mask-alpha, 1))";
  function generateFadeGradient(width) {
    const totalAspect = 2 + width;
    const halfFadePercent = width / totalAspect * 50;
    const leftPercent = 50 - halfFadePercent;
    const rightPercent = 50 + halfFadePercent;
    return [`linear-gradient(to right, ${bright} ${leftPercent}%, ${dark} ${rightPercent}%)`, totalAspect];
  }
  var CalcMaskAnimator = class {
    words;
    context;
    constructor(words, context) {
      this.words = words;
      this.context = context;
    }
    apply() {
      for (const word of this.words) {
        const { mainElement: wordEl, width: textWidth, padding: paddingLeft, height, startTime, endTime } = word;
        const totalWordWidth = textWidth + paddingLeft * 2;
        const fadeWidth = height * this.context.wordFadeWidth;
        const [maskImage, totalAspect] = generateFadeGradient(fadeWidth / totalWordWidth);
        const totalAspectStr = `${totalAspect * 100}% 100%`;
        const speed = textWidth / Math.max(Math.abs(endTime - startTime), 1);
        const startPos = paddingLeft - totalWordWidth - fadeWidth / 2;
        const maskPos = `clamp(${-totalWordWidth - fadeWidth}px, ${startPos}px + (var(--amll-player-time) - ${startTime}) * ${speed}px, 0px) 0px`;
        Object.assign(wordEl.style, {
          maskImage,
          webkitMaskImage: maskImage,
          maskRepeat: "no-repeat",
          webkitMaskRepeat: "no-repeat",
          maskSize: totalAspectStr,
          webkitMaskSize: totalAspectStr,
          maskPosition: maskPos,
          webkitMaskPosition: maskPos
        });
      }
    }
    setCurrentTime(_timeRelative, _isPlaying) {
    }
    pause() {
    }
    resume() {
    }
    dispose() {
      for (const word of this.words) {
        const wordEl = word.mainElement;
        if (wordEl) ["mask", "-webkit-mask"].forEach((prop) => {
          wordEl.style.removeProperty(prop);
        });
      }
    }
  };
  var WebMaskAnimator = class {
    words;
    context;
    animations = [];
    totalFadeDuration;
    constructor(words, context) {
      this.words = words;
      this.context = context;
      this.totalFadeDuration = this.context.lineEndTime - this.context.lineStartTime;
    }
    apply() {
      this.buildAnimations();
    }
    setCurrentTime(timeRelative, isPlaying) {
      const t = Math.min(this.totalFadeDuration, Math.max(0, timeRelative));
      for (const a of this.animations) {
        a.currentTime = t;
        a.playbackRate = 1;
        const endTime = this.getAnimationEndTime(a);
        if (isPlaying && t < endTime) a.play();
        else a.pause();
      }
    }
    pause() {
      for (const a of this.animations) a.pause();
    }
    resume() {
      for (const a of this.animations) {
        const endTime = this.getAnimationEndTime(a);
        const currentTime = Number(a.currentTime ?? 0);
        if (a.playState !== "finished" && currentTime < endTime) a.play();
      }
    }
    buildAnimations() {
      for (const [i, word] of this.words.entries()) {
        const wordEl = word.mainElement;
        if (!wordEl) continue;
        const fadeWidth = word.height * this.context.wordFadeWidth;
        this.updateWordMaskStyles(wordEl, word, fadeWidth);
        const frames = this.generateWordKeyframes(word, i, fadeWidth);
        try {
          const ani = wordEl.animate(frames, {
            duration: Math.max(this.totalFadeDuration, 1),
            id: `fade-word-${word.word}-${i}`,
            fill: "both"
          });
          ani.pause();
          this.animations.push(ani);
        } catch (err) {
          console.warn("\u5E94\u7528\u6E10\u53D8\u52A8\u753B\u53D1\u751F\u9519\u8BEF", frames, this.totalFadeDuration, err);
        }
      }
    }
    /**
    * 为单个单词 DOM 元素配置 CSS 渐变遮罩样式
    */
    updateWordMaskStyles(wordEl, word, fadeWidth) {
      const [maskImage, totalAspect] = generateFadeGradient(fadeWidth / (word.width + word.padding * 2));
      Object.assign(wordEl.style, {
        maskImage,
        maskRepeat: "no-repeat",
        maskSize: `${totalAspect * 100}% 100%`
      });
    }
    /**
    * 推导时间轴并生成单个单词在播放周期内的所有遮罩关键帧
    */
    generateWordKeyframes(targetWord, targetIndex, fadeWidth) {
      const widthBeforeSelf = this.words.slice(0, targetIndex).reduce((a, b) => a + b.width, 0) + (this.words[0] ? fadeWidth : 0);
      const minOffset = -(targetWord.width + targetWord.padding * 2 + fadeWidth);
      const initialPos = -widthBeforeSelf - targetWord.width - targetWord.padding - fadeWidth;
      const config = {
        minOffset,
        fadeWidth
      };
      const cursor = {
        curPos: initialPos,
        lastPos: initialPos,
        timeOffset: 0,
        lastTime: 0,
        lastTimeStamp: 0,
        frames: []
      };
      this.pushClampedKeyframe(cursor, config.minOffset);
      for (const [j, otherWord] of this.words.entries()) {
        this.advancePauseTimeline(cursor, otherWord.startTime, config);
        const rubySegments = otherWord.ruby?.filter((r) => Boolean(r?.word?.trim())) ?? [];
        if (rubySegments.length > 0) this.advanceRubyWordTimeline(cursor, otherWord, rubySegments, config, j);
        else this.advancePlainWordTimeline(cursor, otherWord, config, j);
      }
      return cursor.frames;
    }
    advancePauseTimeline(cursor, targetStartTime, config) {
      const curTimeStamp = targetStartTime - this.context.lineStartTime;
      const staticDuration = curTimeStamp - cursor.lastTimeStamp;
      if (staticDuration > 0) this.advanceTimelineStep(cursor, config, staticDuration, 0);
      cursor.lastTimeStamp = curTimeStamp;
    }
    /**
    * 推导带有 Ruby 注音的多音节单词时间线
    *
    * 原理是把每个主音节的总宽度均分给 ruby 片段总数，并应用每个 ruby 片段的时间给主音节
    *
    * 此功能具有诸多缺陷，如下所示：
    * 1. 汉字是一个紧凑的表意单位，内部由形旁、声旁或笔画构成，与读音之间不存在从左到右的序列关系，
    *    像是一个多音节英语单词按连字符分开时间轴和停顿这才有语义
    * 2. 在主音节中间分时间和停顿会导致用户必须将视线焦点从主音节上移到上方的 ruby
    *    注音，以寻找音节锚点，显然破坏用户预期
    * 3. ruby 的注音功能已由逐字音译承担
    *
    * 但考虑到功能已进入生产环境，因此保留此功能
    */
    advanceRubyWordTimeline(cursor, otherWord, rubySegments, config, wordIndex) {
      const rubyCharCount = rubySegments.reduce((sum, r) => sum + r.word.length, 0);
      const widthPerChar = otherWord.width / rubyCharCount;
      let charIndex = 0;
      for (const ruby of rubySegments) {
        const rubyStart = Math.max(ruby.startTime, otherWord.startTime);
        const rubyEnd = Math.min(Math.max(ruby.endTime, rubyStart), otherWord.endTime);
        const rubyStartStamp = rubyStart - this.context.lineStartTime;
        const rubyStaticDuration = rubyStartStamp - cursor.lastTimeStamp;
        if (rubyStaticDuration > 0) this.advanceTimelineStep(cursor, config, rubyStaticDuration, 0);
        cursor.lastTimeStamp = rubyStartStamp;
        const perCharDuration = Math.max(0, rubyEnd - rubyStart) / ruby.word.length;
        for (let i = 0; i < ruby.word.length; i++) {
          let movePx = widthPerChar;
          if (wordIndex === 0 && charIndex === 0) movePx += config.fadeWidth * 1.5;
          if (wordIndex === this.words.length - 1 && charIndex === rubyCharCount - 1) movePx += config.fadeWidth * 0.5;
          this.advanceTimelineStep(cursor, config, perCharDuration, movePx);
          cursor.lastTimeStamp += perCharDuration;
          charIndex++;
        }
      }
      const wordEndStamp = Math.max(otherWord.endTime - this.context.lineStartTime, cursor.lastTimeStamp);
      const wordTailDuration = wordEndStamp - cursor.lastTimeStamp;
      if (wordTailDuration > 0) this.advanceTimelineStep(cursor, config, wordTailDuration, 0);
      cursor.lastTimeStamp = wordEndStamp;
    }
    advancePlainWordTimeline(cursor, otherWord, config, wordIndex) {
      const { startTime, endTime, width } = otherWord;
      const fadeDuration = Math.max(0, endTime - startTime);
      let movePx = width;
      if (wordIndex === 0) movePx += config.fadeWidth * 1.5;
      if (wordIndex === this.words.length - 1) movePx += config.fadeWidth * 0.5;
      this.advanceTimelineStep(cursor, config, fadeDuration, movePx);
      cursor.lastTimeStamp += fadeDuration;
    }
    advanceTimelineStep(cursor, config, duration, movePx) {
      cursor.timeOffset += duration / this.totalFadeDuration;
      cursor.curPos += movePx;
      if (duration > 0) this.pushClampedKeyframe(cursor, config.minOffset);
    }
    pushClampedKeyframe(cursor, minOffset) {
      const moveOffset = cursor.curPos - cursor.lastPos;
      const time = Math.min(1, Math.max(0, cursor.timeOffset));
      const duration = time - cursor.lastTime;
      const msPerPixel = moveOffset !== 0 ? Math.abs(duration / moveOffset) : 0;
      if (cursor.curPos > minOffset && cursor.lastPos < minOffset) {
        const staticTime = Math.abs(cursor.lastPos - minOffset) * msPerPixel;
        cursor.frames.push({
          offset: cursor.lastTime + staticTime,
          maskPosition: `${Math.min(Math.max(cursor.lastPos, minOffset), 0)}px 0`
        });
      }
      if (cursor.curPos > 0 && cursor.lastPos < 0) {
        const staticTime = Math.abs(cursor.lastPos) * msPerPixel;
        cursor.frames.push({
          offset: cursor.lastTime + staticTime,
          maskPosition: `${Math.min(Math.max(cursor.curPos, minOffset), 0)}px 0`
        });
      }
      cursor.frames.push({
        offset: time,
        maskPosition: `${Math.min(Math.max(cursor.curPos, minOffset), 0)}px 0`
      });
      cursor.lastPos = cursor.curPos;
      cursor.lastTime = time;
    }
    getAnimationEndTime(animation) {
      const timing = animation.effect?.getComputedTiming();
      return Number(timing?.delay ?? 0) + Number(timing?.duration ?? 0);
    }
    dispose() {
      for (const a of this.animations) a.cancel();
      this.animations.length = 0;
      for (const word of this.words) {
        const wordEl = word.mainElement;
        if (wordEl) wordEl.style.removeProperty("mask");
      }
    }
  };
  function createLineMaskAnimator(words, context) {
    if (context.supportMaskImage) return new WebMaskAnimator(words, context);
    else return new CalcMaskAnimator(words, context);
  }
  var LyricLineEl = class extends LyricLineBase {
    lyricPlayer;
    lyricLine;
    element = document.createElement("div");
    splittedWords = [];
    built = false;
    renderMode = LyricLineRenderMode.SOLID;
    maskAnimator;
    lastScaleNum = -1;
    lineHasRubyWords;
    lineHasRomanWords;
    /**
    * 用于平衡换行、尽量减少各行长度差异的类
    */
    balancer;
    constructor(lyricPlayer, lyricLine = {
      words: [],
      translatedLyric: "",
      romanLyric: "",
      startTime: 0,
      endTime: 0,
      isBG: false,
      isDuet: false
    }) {
      super();
      this.lyricPlayer = lyricPlayer;
      this.lyricLine = lyricLine;
      this.lineHasRubyWords = this.lyricLine.words.some((word) => (word.ruby?.length ?? 0) > 0);
      this.lineHasRomanWords = this.lyricLine.words.some((word) => (word.romanWord?.trim().length ?? 0) > 0);
      this.element.setAttribute("class", lyric_player_module_default.lyricLine);
      if (this.lyricLine.isBG) this.element.classList.add(lyric_player_module_default.lyricBgLine);
      if (this.lyricLine.isDuet) this.element.classList.add(lyric_player_module_default.lyricDuetLine);
      this.element.appendChild(document.createElement("div"));
      this.element.appendChild(document.createElement("div"));
      this.element.appendChild(document.createElement("div"));
      const main = this.element.children[0];
      const trans = this.element.children[1];
      const roman = this.element.children[2];
      main.setAttribute("class", lyric_player_module_default.lyricMainLine);
      trans.setAttribute("class", lyric_player_module_default.lyricSubLine);
      roman.setAttribute("class", lyric_player_module_default.lyricSubLine);
      if (LyricLineBase.wordSegmenter) this.balancer = new LineBalancer(main);
      this.rebuildStyle();
    }
    isEnabled = false;
    async enable(maskAnimationTime = this.lyricPlayer.getCurrentTime(), shouldPlay = this.lyricPlayer.getIsPlaying()) {
      this.isEnabled = true;
      this.element.classList.add(lyric_player_module_default.active);
      const main = this.element.children[0];
      const relativeTime = clampPositive(maskAnimationTime - this.lyricLine.startTime);
      for (const word of this.splittedWords) for (const a of word.elementAnimations) {
        a.currentTime = relativeTime;
        a.playbackRate = 1;
        const timing = a.effect?.getComputedTiming();
        const endTime = Number(timing?.delay ?? 0) + Number(timing?.duration ?? 0);
        if (shouldPlay && relativeTime < endTime) a.play();
        else a.pause();
      }
      this.maskAnimator?.setCurrentTime(relativeTime, shouldPlay);
      main.classList.add(lyric_player_module_default.active);
    }
    disable() {
      this.isEnabled = false;
      this.element.classList.remove(lyric_player_module_default.active);
      this.setRenderMode(LyricLineRenderMode.SOLID);
      const main = this.element.children[0];
      for (const word of this.splittedWords) for (const a of word.elementAnimations) if (a.id === "float-word" || a.id.includes("emphasize-word-float-only")) {
        a.playbackRate = -1;
        a.play();
      }
      this.maskAnimator?.pause();
      main.classList.remove(lyric_player_module_default.active);
    }
    lastWord;
    async resume() {
      if (!this.isEnabled) return;
      for (const word of this.splittedWords) for (const a of word.elementAnimations) if (!this.lastWord || this.splittedWords.indexOf(this.lastWord) < this.splittedWords.indexOf(word)) {
        const timing = a.effect?.getComputedTiming();
        const endTime = Number(timing?.delay ?? 0) + Number(timing?.duration ?? 0);
        if (a.playState !== "finished" && (a.currentTime || 0) < endTime) a.play();
      }
      this.maskAnimator?.resume();
    }
    async pause() {
      if (!this.isEnabled) return;
      for (const word of this.splittedWords) for (const a of word.elementAnimations) a.pause();
      this.maskAnimator?.pause();
    }
    getLine() {
      return this.lyricLine;
    }
    show() {
      if (!this.built) {
        this.rebuildElement();
        this.built = true;
        this.updateMaskImageSync();
      }
    }
    rebuildStyle() {
      const style = this.element.style;
      const currentScale = this.lineTransforms.scale.getCurrentPosition() / 100;
      if (Math.abs(currentScale - this.lastScaleNum) >= 1e-4) {
        this.lastScaleNum = currentScale;
        style.transform = `scale(${currentScale.toFixed(3)})`;
      }
    }
    rebuildElement() {
      this.disposeElements();
      const main = this.element.children[0];
      const trans = this.element.children[1];
      const roman = this.element.children[2];
      if (this.lyricPlayer._getIsNonDynamic()) {
        main.textContent = this.lyricLine.words.map((w) => w.word).join("");
        this.setSubLinesText(trans, roman);
        return;
      }
      const chunkedWords = chunkAndSplitLyricWords(this.lyricLine.words);
      main.innerHTML = "";
      for (const chunk of chunkedWords) this.buildWord(chunk, main);
      this.setSubLinesText(trans, roman);
    }
    /** 设置翻译与音译行文本 */
    setSubLinesText(trans, roman) {
      trans.textContent = this.lyricLine.translatedLyric;
      roman.textContent = this.lyricLine.romanLyric;
    }
    getRubyCharCount(word) {
      return (word.ruby ?? []).reduce((total, ruby) => total + ruby.word.length, 0);
    }
    getRubySegments(word) {
      return (word.ruby ?? []).filter((ruby) => (ruby?.word?.trim().length ?? 0) > 0);
    }
    createWord(word, shouldEmphasize) {
      const mainWordEl = document.createElement("span");
      const subElements = [];
      const romanWord = word.romanWord?.trim() ?? "";
      const wordContainer = this.lineHasRubyWords ? document.createElement("span") : mainWordEl;
      const wordTextContainer = this.lineHasRubyWords ? document.createElement("span") : wordContainer;
      if (this.lineHasRubyWords) {
        const rubyWordEl = document.createElement("span");
        const rubySegments = this.getRubySegments(word);
        for (const ruby of rubySegments) {
          const rubyPartEl = document.createElement("span");
          rubyPartEl.textContent = ruby.word;
          rubyPartEl.dataset.startTime = String(ruby.startTime);
          rubyPartEl.dataset.endTime = String(ruby.endTime);
          rubyWordEl.appendChild(rubyPartEl);
        }
        rubyWordEl.classList.add(lyric_player_module_default.rubyWord);
        mainWordEl.classList.add(lyric_player_module_default.wordWithRuby);
        wordContainer.classList.add(lyric_player_module_default.wordBody);
        wordTextContainer.classList.add(lyric_player_module_default.rubyBaseWord);
        wordContainer.appendChild(wordTextContainer);
        mainWordEl.appendChild(rubyWordEl);
        mainWordEl.appendChild(wordContainer);
      }
      const displayWord = word.word;
      if (shouldEmphasize) {
        mainWordEl.classList.add(lyric_player_module_default.emphasize);
        const trimmedWord = displayWord.trim();
        if (LyricLineBase.graphemeSegmenter) for (const { segment } of LyricLineBase.graphemeSegmenter.segment(trimmedWord)) {
          const charEl = document.createElement("span");
          charEl.textContent = segment;
          subElements.push(charEl);
          wordTextContainer.appendChild(charEl);
        }
        else for (const segment of Array.from(trimmedWord)) {
          const charEl = document.createElement("span");
          charEl.textContent = segment;
          subElements.push(charEl);
          wordTextContainer.appendChild(charEl);
        }
      } else if (this.lineHasRomanWords) {
        const wordEl = document.createElement("span");
        wordEl.textContent = displayWord.trim();
        wordTextContainer.appendChild(wordEl);
      } else if (romanWord.length === 0) wordTextContainer.textContent = displayWord.trim();
      if (this.lineHasRomanWords) {
        const romanWordEl = document.createElement("span");
        romanWordEl.textContent = romanWord.length > 0 ? romanWord : "\xA0";
        romanWordEl.classList.add(lyric_player_module_default.romanWord);
        wordContainer.appendChild(romanWordEl);
      }
      return {
        ...word,
        mainElement: mainWordEl,
        subElements,
        elementAnimations: [createFloatAnimation(mainWordEl, {
          word,
          lineStartTime: this.lyricLine.startTime,
          isBG: this.lyricLine.isBG
        })],
        width: 0,
        height: 0,
        padding: 0,
        shouldEmphasize
      };
    }
    buildWord(input, main) {
      const chunk = Array.isArray(input) ? input : [input];
      if (chunk.length === 0) return;
      if (chunk.every((w) => !w.word.trim())) {
        const textContent = chunk.map((w) => w.word).join("");
        main.appendChild(document.createTextNode(textContent));
        return;
      }
      const merged = chunk.reduce((a, b) => {
        a.endTime = Math.max(a.endTime, b.endTime);
        a.startTime = Math.min(a.startTime, b.startTime);
        a.word += b.word;
        return a;
      }, {
        word: "",
        romanWord: "",
        startTime: Number.POSITIVE_INFINITY,
        endTime: Number.NEGATIVE_INFINITY,
        wordType: "normal",
        obscene: false
      });
      let emp = chunk.some((word) => LyricLineBase.shouldEmphasize(word));
      if (!isCJK(merged.word)) emp = emp || LyricLineBase.shouldEmphasize(merged);
      const wrapperWordEl = document.createElement("span");
      wrapperWordEl.classList.add(lyric_player_module_default.emphasizeWrapper);
      const characterElements = [];
      for (const word of chunk) {
        if (!word.word.trim()) {
          wrapperWordEl.appendChild(document.createTextNode(word.word));
          continue;
        }
        const realWord = this.createWord(word, emp);
        if (emp) characterElements.push(...realWord.subElements);
        this.splittedWords.push(realWord);
        wrapperWordEl.appendChild(realWord.mainElement);
      }
      if (emp && this.splittedWords.length > 0) {
        const lastWordOfChunk = this.splittedWords[this.splittedWords.length - 1];
        const rubyCharCount = chunk.reduce((total, word) => total + this.getRubyCharCount(word), 0);
        const lineWords = this.lyricLine.words;
        const isLastWord = lineWords.length > 0 && merged.word.includes(lineWords[lineWords.length - 1].word);
        lastWordOfChunk.elementAnimations.push(...createEmphasizeAnimation({
          word: merged,
          characterElements,
          duration: merged.endTime - merged.startTime,
          delay: merged.startTime - this.lyricLine.startTime,
          rubyCharCount,
          isBG: this.lyricLine.isBG,
          isLastWord
        }));
      }
      main.appendChild(wrapperWordEl);
    }
    onLineSizeChange(_size) {
      this.updateMaskImageSync();
    }
    updateMaskImageSync() {
      for (const word of this.splittedWords) {
        const el = word.mainElement;
        if (el) {
          word.padding = Number.parseFloat(getComputedStyle(el).paddingLeft);
          word.width = el.clientWidth - word.padding * 2;
          word.height = el.clientHeight - word.padding * 2;
        } else {
          word.width = 0;
          word.height = 0;
          word.padding = 0;
        }
      }
      if (this.balancer && LyricLineBase.wordSegmenter) this.balancer.balanceLineBreaks(this.lyricPlayer._getIsNonDynamic(), this.splittedWords.length > 0, LyricLineBase.wordSegmenter);
      this.maskAnimator?.dispose();
      const maxEndTime = Math.max(0, ...this.splittedWords.map((w) => w.endTime), this.lyricLine.endTime);
      this.maskAnimator = createLineMaskAnimator(this.splittedWords, {
        lineStartTime: this.lyricLine.startTime,
        lineEndTime: maxEndTime,
        wordFadeWidth: this.lyricPlayer.getWordFadeWidth(),
        supportMaskImage: this.lyricPlayer.supportMaskImage
      });
      this.maskAnimator.apply();
      if (this.isEnabled) {
        const isPlayerRunning = this.lyricPlayer.getIsPlaying?.() ?? true;
        this.enable(this.lyricPlayer.getCurrentTime(), isPlayerRunning);
      }
    }
    getElement() {
      return this.element;
    }
    setRenderMode(mode) {
      if (this.renderMode === mode) return;
      this.renderMode = mode;
      this.element.classList.toggle(lyric_player_module_default.gradientMask, mode === LyricLineRenderMode.GRADIENT);
    }
    setTransform(scale = this.scale, opacity = this.opacity, blur = 0, delay = Duration.ZERO, mode = LyricLineRenderMode.SOLID) {
      super.setTransform(scale, opacity, blur, delay);
      this.setRenderMode(mode);
      this.top = 0;
      this.scale = scale;
      this.delay = delay;
      if (this.lyricPlayer.getEnableSpring()) this.lineTransforms.scale.setTargetPosition(scale);
      else this.lineTransforms.scale.setPosition(scale);
    }
    update(delta = Duration.ZERO) {
      if (!this.lyricPlayer.getEnableSpring()) return;
      const scaleMoving = !this.lineTransforms.scale.arrived();
      this.lineTransforms.scale.update(delta);
      if (scaleMoving) this.isUiDirty = true;
    }
    commitChanges() {
      if (this.isUiDirty) {
        this.rebuildStyle();
        this.isUiDirty = false;
      }
    }
    /** @internal */
    _getDebugTargetPos() {
      return `[\u4F4D\u79FB: ${this.top}; \u7F29\u653E: ${this.scale}; \u5EF6\u65F6: ${this.delay}]`;
    }
    disposeElements() {
      this.balancer?.reset();
      this.maskAnimator?.dispose();
      this.maskAnimator = void 0;
      for (const realWord of this.splittedWords) {
        for (const a of realWord.elementAnimations) a.cancel();
        for (const sub of realWord.subElements) {
          sub.remove();
          sub.parentNode?.removeChild(sub);
        }
        realWord.elementAnimations = [];
        realWord.subElements = [];
        if (realWord.mainElement?.parentNode) realWord.mainElement.parentNode.removeChild(realWord.mainElement);
      }
      this.splittedWords = [];
      const main = this.element.children[0];
      const trans = this.element.children[1];
      const roman = this.element.children[2];
      if (main) main.innerHTML = "";
      if (trans) trans.innerHTML = "";
      if (roman) roman.innerHTML = "";
    }
    dispose() {
      this.disposeElements();
      this.lyricPlayer.resizeObserver.unobserve(this.element);
      this.element.remove();
    }
  };
  var LyricLineMouseEvent = class extends MouseEvent {
    lineIndex;
    line;
    bgLine;
    /**
    * 自定义标志位，用于记录外部是否调用了 `stopPropagation`
    */
    isPropagationStopped = false;
    constructor(lineIndex, line, bgLine, event) {
      super(`line-${event.type}`, event);
      this.lineIndex = lineIndex;
      this.line = line;
      this.bgLine = bgLine;
    }
    stopPropagation() {
      this.isPropagationStopped = true;
      super.stopPropagation();
    }
    stopImmediatePropagation() {
      this.isPropagationStopped = true;
      super.stopImmediatePropagation();
    }
  };
  var DomLyricPlayer = class extends LyricPlayerBase {
    abortController = new AbortController();
    currentLyricGroups = [];
    onResize() {
      const computedStyles = getComputedStyle(this.element);
      this._baseFontSize = Number.parseFloat(computedStyles.fontSize);
      this.rebuildStyle();
    }
    supportPlusLighter = CSS.supports("mix-blend-mode", "plus-lighter");
    supportMaskImage = CSS.supports("mask-image", "none");
    innerSize = [0, 0];
    onMouseEventHandler = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const groupEl = target.closest(`.${lyric_player_module_default.lyricLineWrapper}`);
      if (!groupEl) return;
      const group = this.lyricGroupElementMap.get(groupEl);
      if (!group) return;
      const mainLine = group.mainLine;
      const bgLine = group.bgLine;
      const evt = new LyricLineMouseEvent(this.lyricLinesIndexes.get(mainLine) ?? -1, mainLine, bgLine, e);
      if (!this.dispatchEvent(evt) || evt.defaultPrevented) e.preventDefault();
      if (evt.isPropagationStopped) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };
    /**
    * 是否为非逐词歌词
    * @internal
    */
    _getIsNonDynamic() {
      return this.isNonDynamic;
    }
    _baseFontSize = Number.parseFloat(getComputedStyle(this.element).fontSize);
    get baseFontSize() {
      return this._baseFontSize;
    }
    constructor() {
      super();
      this.onResize();
      this.element.classList.add("amll-lyric-player", "dom");
      if (this.disableSpring) this.element.classList.add(lyric_player_module_default.disableSpring);
      this.element.addEventListener("click", this.onMouseEventHandler, { signal: this.abortController.signal });
      this.element.addEventListener("contextmenu", this.onMouseEventHandler, { signal: this.abortController.signal });
    }
    rebuildStyle() {
    }
    setWordFadeWidth(value = 0.5) {
      super.setWordFadeWidth(value);
      for (const group of this.currentLyricGroups) {
        group.mainLine.updateMaskImageSync();
        group.bgLine?.updateMaskImageSync();
      }
    }
    createInterludeDots() {
      return new InterludeDotsEl();
    }
    createBottomLine() {
      return new BottomLineEl(this);
    }
    /**
    * 重新构建歌词行和时间状态
    *
    * 一般用于在调用 {@link setLyricProcessConfig} 更新配置后手动刷新视图，
    * 或在外部样式/DOM 结构发生改变后重置歌词视图
    *
    * @param initialTime 重建后对齐的初始时间（毫秒），默认使用当前播放进度
    */
    buildLyricGroups() {
      if (this.hasDuetLine) this.element.classList.add(lyric_player_module_default.hasDuetLine);
      else this.element.classList.remove(lyric_player_module_default.hasDuetLine);
      let currentGroup = null;
      for (let i = 0; i < this.processedLines.length; i++) {
        const line = this.processedLines[i];
        const lineEl = new LyricLineEl(this, line);
        this.lyricLinesIndexes.set(lineEl, i);
        if (!line.isBG || !currentGroup) {
          currentGroup = new LyricLineGroup(this, lineEl);
          this.currentLyricGroups.push(currentGroup);
          this.lyricGroupElementMap.set(currentGroup.element, currentGroup);
        } else currentGroup.addBgLine(lineEl);
      }
    }
    rebuildLyricView(initialTime = this.getCurrentTime()) {
      super.rebuildLyricView(initialTime);
      this.setLinePosXSpringParams({});
      this.setLinePosYSpringParams({});
      this.setLineScaleSpringParams({});
      this.update(0);
    }
    pause() {
      super.pause();
      this.element.classList.remove(lyric_player_module_default.playing);
      for (const group of this.currentLyricGroups) {
        group.mainLine.pause();
        group.bgLine?.pause();
      }
    }
    resume() {
      super.resume();
      this.element.classList.add(lyric_player_module_default.playing);
      for (const group of this.currentLyricGroups) {
        group.mainLine.resume();
        group.bgLine?.resume();
      }
    }
    update(delta = 0) {
      const d = Duration.min(Duration.fromMillis(delta), MAX_FRAME_DELTA);
      super.update(Duration.asMillis(d));
      if (!this.supportMaskImage) this.element.style.setProperty("--amll-player-time", `${this.getCurrentTime()}`);
      if (!this.isPageVisible) return;
      for (const group of this.currentLyricGroups) group.update(d);
      for (const group of this.currentLyricGroups) group.commitChanges();
    }
    dispose() {
      super.dispose();
      this.abortController.abort();
      this.element.remove();
      for (const group of this.currentLyricGroups) group.dispose();
    }
  };

  // ../amll/node_modules/@applemusic-like-lyrics/core/dist/style.css
  var style_default = '.amll-lyric-player {\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  color: var(--amll-lp-color, white);\n  contain: strict;\n  mix-blend-mode: plus-lighter;\n  font-size: var(--amll-lp-font-size, max(max(5vh, 2.5vw), 12px));\n  overflow: hidden;\n\n  @media screen and (width <= 768px) {\n    font-size: var(--amll-lp-font-size, max(8vw, 12px));\n  }\n\n  &.dom {\n    --amll-lp-line-width-aspect: .8;\n    --amll-lp-line-padding-x: 1em;\n    --amll-lp-bg-line-scale: .7;\n    user-select: none;\n    box-sizing: content-box;\n    z-index: 1;\n    line-height: 1.2;\n  }\n}\n\n@media screen and (width <= 768px) {\n  .amll-lyric-player {\n    --amll-lp-line-width-aspect: 1;\n    --amll-lp-line-padding-x: 0;\n  }\n}\n@property --bright-mask-alpha {\n  syntax: "<number>";\n  inherits: true;\n  initial-value: 1;\n}\n\n@property --dark-mask-alpha {\n  syntax: "<number>";\n  inherits: true;\n  initial-value: .2;\n}\n\n.FmKaba_lyricLineWrapper {\n  box-sizing: border-box;\n  width: 100%;\n  padding: .4em var(--lyric-line-padding-x);\n  will-change: transform;\n  border-radius: .25em;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: .3em;\n  transition: opacity .4s, filter .4s, background-color .25s;\n  display: flex;\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  &:not(.FmKaba_bottomLineWrapper):hover {\n    background-color: var(--amll-lp-hover-bg-color, #fff1);\n  }\n\n  &:not(.FmKaba_bottomLineWrapper):active {\n    background-color: var(--amll-lp-hover-bg-color, #ffffff05);\n  }\n}\n\n.FmKaba_lyricLine {\n  box-sizing: border-box;\n  width: var(--amll-lp-width, 100%);\n  min-width: var(--amll-lp-width, 100%);\n  max-width: var(--amll-lp-width, 100%);\n  contain: layout style paint;\n  content-visibility: auto;\n  contain-intrinsic-size: auto 40px;\n  backface-visibility: hidden;\n  transform-origin: 0;\n  --mask-alpha-duration: .45s;\n  --bright-mask-alpha: .2;\n  --dark-mask-alpha: .2;\n  height: fit-content;\n  transition: box-shadow .25s,\n		--bright-mask-alpha var(--mask-alpha-duration) ease-out,\n		--dark-mask-alpha var(--mask-alpha-duration) ease-out;\n  margin: -.2em;\n  padding: .2em;\n  position: relative;\n\n  &.FmKaba_gradientMask {\n    --mask-alpha-duration: .3s;\n    --bright-mask-alpha: 1;\n    --dark-mask-alpha: .4;\n  }\n}\n\n.FmKaba_lyricDuetLine {\n  text-align: right;\n  transform-origin: 100%;\n}\n\n.FmKaba_lyricMainLine {\n  contain: layout style;\n  margin: -1em;\n  padding: 1em;\n  transition: opacity .3s .1s;\n\n  & span {\n    text-align: start;\n    vertical-align: bottom;\n    display: inline-block;\n  }\n\n  & .FmKaba_romanWord {\n    padding-inline-end: .3em;\n    font-size: .5em;\n    line-height: 1em;\n    display: flex;\n  }\n\n  & .FmKaba_rubyWord {\n    justify-content: center;\n    min-height: 1em;\n    font-size: .5em;\n    line-height: 1em;\n    display: flex;\n  }\n\n  & .FmKaba_wordWithRuby {\n    vertical-align: bottom;\n    flex-direction: column;\n    align-items: center;\n    display: inline-flex;\n  }\n\n  & .FmKaba_wordBody {\n    flex-direction: column;\n    display: flex;\n  }\n\n  & .FmKaba_rubyBaseWord {\n    white-space: nowrap;\n    flex-wrap: nowrap;\n    justify-content: center;\n    display: inline-flex;\n  }\n\n  & > span, & span.FmKaba_emphasizeWrapper {\n    white-space: pre-wrap;\n    vertical-align: bottom;\n    contain: layout style;\n    margin: -1em;\n    padding: 1em;\n    display: inline-block;\n\n    & > span {\n      margin: -1em;\n      padding: 1em;\n    }\n\n    &.FmKaba_emphasize, & span.FmKaba_emphasize {\n      backface-visibility: hidden;\n\n      & > span {\n        backface-visibility: hidden;\n        margin: -1em;\n        padding: 1em;\n      }\n    }\n  }\n}\n\n.FmKaba_lyricBgLine {\n  opacity: .4;\n  font-size: max(calc(1em * var(--amll-lp-bg-line-scale, .7)), 10px);\n  transition: background-color .25s,\n		box-shadow .25s,\n		--bright-mask-alpha var(--mask-alpha-duration) ease-out,\n		--dark-mask-alpha var(--mask-alpha-duration) ease-out;\n\n  & .FmKaba_lyricMainLine {\n    padding: 1.2em 1em;\n  }\n\n  &.FmKaba_active {\n    opacity: .4;\n    transition: background-color .25s,\n			box-shadow .25s,\n			--bright-mask-alpha var(--mask-alpha-duration) ease-out,\n			--dark-mask-alpha var(--mask-alpha-duration) ease-out;\n  }\n}\n\n.FmKaba_lyricSubLine {\n  opacity: .3;\n  font-size: max(.5em, 10px);\n  line-height: 1.5em;\n  transition: opacity .2s .25s;\n\n  @supports (mix-blend-mode: plus-lighter) {\n    opacity: .3;\n  }\n}\n\n.FmKaba_bottomLine {\n  font-size: var(--amll-lp-bottom-line-font-size, max(.7em, 10px));\n  cursor: default;\n  opacity: .2;\n  padding-top: 0;\n  padding-bottom: 0;\n  line-height: 1.8em;\n  transition: opacity .4s;\n\n  &.FmKaba_gradientMask {\n    opacity: .85;\n  }\n\n  &:empty {\n    height: 0;\n    margin: 0;\n    padding: 0;\n    display: none;\n  }\n}\n\n.FmKaba_bgWrapper {\n  top: 100%;\n  left: var(--lyric-line-padding-x);\n  z-index: -1;\n  align-items: inherit;\n  width: calc(100% - var(--lyric-line-padding-x) * 2);\n  visibility: visible;\n  pointer-events: auto;\n  opacity: 0;\n  transform-origin: 0 0;\n  flex-direction: column;\n  transition: opacity .3s;\n  display: flex;\n  position: absolute;\n}\n\n.FmKaba_bgWrapperTop {\n  transform-origin: 0 100%;\n  width: 100%;\n  position: relative;\n  top: auto;\n  bottom: auto;\n  left: 0;\n}\n\n.FmKaba_bgWrapperActive {\n  opacity: 1;\n  width: 100%;\n  position: relative;\n  top: auto;\n  bottom: auto;\n  left: 0;\n}\n\n.FmKaba_bgWrapperHidden {\n  visibility: hidden;\n  pointer-events: none;\n}\n\n.FmKaba_interludeDots {\n  width: fit-content;\n  height: clamp(.5em, 1vh, 3em);\n  padding: .4em var(--lyric-line-padding-x);\n  transform-origin: center;\n  align-items: center;\n  gap: .18em;\n  display: flex;\n  position: absolute;\n  left: 0;\n\n  & > * {\n    background-color: var(--amll-lp-color, white);\n    aspect-ratio: 1;\n    border-radius: 50%;\n    width: .3em;\n    height: .3em;\n    display: inline-block;\n  }\n}\n\n.FmKaba_disableSpring > *, .FmKaba_disableSpring .FmKaba_lyricLine {\n  transition: filter .25s, transform .5s, background-color .25s, box-shadow .25s;\n}\n\n.FmKaba_tmpDisableTransition {\n  transition: none !important;\n}\n\n.amll-lyric-player {\n  --lyric-line-padding-x: 1em;\n  touch-action: pan-x;\n\n  @media screen and (width <= 500px) {\n    --lyric-line-padding-x: 20px;\n  }\n\n  &:hover .FmKaba_lyricLine, &:hover .FmKaba_lyricLineWrapper {\n    filter: unset !important;\n  }\n\n  &:not(.FmKaba_playing) .FmKaba_bgWrapper {\n    opacity: 1;\n    width: 100%;\n    position: relative;\n    top: auto;\n    bottom: auto;\n    left: 0;\n  }\n\n  &.FmKaba_hasDuetLine {\n    & .FmKaba_lyricLine:not(.FmKaba_lyricDuetLine) {\n      padding-right: 15%;\n    }\n\n    & .FmKaba_lyricDuetLine {\n      padding-left: 15%;\n    }\n\n    & .FmKaba_isDuetWrapper {\n      align-items: flex-end;\n\n      & .FmKaba_bgWrapper {\n        transform-origin: 100% 0;\n      }\n\n      & .FmKaba_bgWrapperTop {\n        transform-origin: 100% 100%;\n      }\n    }\n  }\n}\n';

  // src/inject.js
  var GLOBAL_KEY = "__SODA_AMLL__";
  var LOG = (...a) => console.log("[soda-amll]", ...a);
  var SETTINGS_KEY = "soda-amll-settings-v1";
  var DEFAULT_SETTINGS = {
    /* bottom bar skin */
    barStyle: "blur",
    // 'off' | 'blur'
    barOpacity: 0.42,
    barBlur: 26,
    barCover: 0.45,
    /* lyric page */
    lyricTransition: true,
    lyricClickSeek: true,
    lyricFont: "pingfang",
    // 'pingfang' | 'system'
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
    bgType: "flow",
    // 'flow' | 'blur' | 'solid'
    bgFlowSpeed: 1,
    bgRenderScale: 0.5,
    bgFps: 30,
    bgBlur: 100,
    bgBrightness: 0.55,
    bgSaturate: 1.9,
    /* low-spec preset: caps the background's resolution/frame rate and turns off
       the heaviest lyric effects, for machines that cannot hold 60fps */
    bgPerf: false,
    /* lyric player */
    lyricBlur: true,
    lyricScale: true,
    wordFade: 0.7,
    hidePassed: false,
    /* song info */
    showAlbum: false
  };
  function clamp2(v, lo, hi) {
    if (!isFinite(v)) return lo;
    return Math.min(hi, Math.max(lo, v));
  }
  function loadSettings() {
    let raw = {};
    try {
      raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (e) {
      raw = {};
    }
    const s = Object.assign({}, DEFAULT_SETTINGS, raw);
    if (raw.__v !== 2) s.showAlbum = DEFAULT_SETTINGS.showAlbum;
    if (raw.__v !== 3) s.bgType = DEFAULT_SETTINGS.bgType;
    s.__v = 3;
    if (["off", "blur"].indexOf(s.barStyle) < 0) s.barStyle = DEFAULT_SETTINGS.barStyle;
    if (["pingfang", "system"].indexOf(s.lyricFont) < 0) s.lyricFont = DEFAULT_SETTINGS.lyricFont;
    if (["flow", "blur", "solid"].indexOf(s.bgType) < 0) s.bgType = DEFAULT_SETTINGS.bgType;
    s.barOpacity = clamp2(Number(s.barOpacity), 0.05, 0.95);
    s.barBlur = clamp2(Number(s.barBlur), 0, 60);
    s.barCover = clamp2(Number(s.barCover), 0, 0.9);
    s.lyricFontScale = clamp2(Number(s.lyricFontScale), 0.6, 2);
    s.lyricWeight = clamp2(Math.round(Number(s.lyricWeight) / 100) * 100, 200, 900);
    s.wordBright = clamp2(Number(s.wordBright), 0.3, 1.4);
    s.bgFlowSpeed = clamp2(Number(s.bgFlowSpeed), 0.1, 4);
    s.bgRenderScale = clamp2(Number(s.bgRenderScale), 0.2, 1);
    s.bgFps = clamp2(Math.round(Number(s.bgFps)), 0, 60);
    s.bgBlur = clamp2(Number(s.bgBlur), 0, 200);
    s.bgBrightness = clamp2(Number(s.bgBrightness), 0.15, 1.2);
    s.bgSaturate = clamp2(Number(s.bgSaturate), 0.5, 3);
    s.bgPerf = !!s.bgPerf;
    s.wordFade = clamp2(Number(s.wordFade), 1e-4, 1.5);
    return s;
  }
  function saveSettings(s) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    } catch (e) {
    }
  }
  function buildTranslationMap(cnLrc) {
    const map = /* @__PURE__ */ new Map();
    if (!cnLrc) return map;
    for (const raw of cnLrc.split("\n")) {
      const line = raw.trim();
      const m = /^\[(\d+):(\d+)(?:[.:](\d+))?\](.*)$/.exec(line);
      if (!m) continue;
      const ms = Number(m[1]) * 6e4 + Number(m[2]) * 1e3 + Number((m[3] || "0").padEnd(3, "0").slice(0, 3));
      map.set(ms, m[4].trim());
    }
    return map;
  }
  function parseKrcBody(body, lineStart) {
    const words = [];
    const segments = body.split("<").filter((s) => s.indexOf(">") >= 0);
    for (const seg of segments) {
      const gt = seg.indexOf(">");
      const head = seg.slice(0, gt).split(",");
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
    const startTime = Number(m[1]) * 6e4 + Number(m[2]) * 1e3 + Number((m[3] || "0").padEnd(3, "0").slice(0, 3));
    const text = m[4].trim();
    let endTime = startTime + 1e4;
    if (nextLine) {
      const n = /^\[(\d+):(\d+)(?:[.:](\d+))?\]/.exec(nextLine.trim());
      if (n) endTime = Number(n[1]) * 6e4 + Number(n[2]) * 1e3 + Number((n[3] || "0").padEnd(3, "0").slice(0, 3));
    }
    return { text, startTime, endTime };
  }
  function toAmllLines(lyrics, opts) {
    if (!lyrics || !lyrics.content) return [];
    const showTranslation = !opts || opts.showTranslation !== false;
    const showRoman = !opts || opts.showRoman !== false;
    const content = lyrics.content;
    const tr = lyrics.translations || {};
    const cnMap = buildTranslationMap(tr.cn);
    const romaMap = buildTranslationMap(tr.roma || tr.romalrc || tr.roman);
    const raw = content.split("\n").map((l) => l.trim()).filter(Boolean);
    const isKrc = raw.some((l) => /^\[\d+,/.test(l));
    const out = [];
    const push = (words, startTime, endTime) => {
      out.push({
        words,
        translatedLyric: showTranslation ? cnMap.get(startTime) || "" : "",
        romanLyric: showRoman ? romaMap.get(startTime) || "" : "",
        startTime,
        endTime,
        isBG: false,
        isDuet: false
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
      for (const p2 of parsed) push([{ word: p2.text, startTime: p2.startTime, endTime: p2.endTime }], p2.startTime, p2.endTime);
    }
    out.sort((a, b) => a.startTime - b.startTime);
    return out;
  }
  function ensureTransportFanout() {
    const tp = window.transportPort;
    if (!tp || typeof tp.receiveTransport !== "function") return false;
    if (tp.__amllFanout) return true;
    const orig = tp.receiveTransport;
    const cbs = [];
    let installed = false;
    tp.receiveTransport = function(cb) {
      if (typeof cb !== "function" || cbs.indexOf(cb) >= 0) return;
      cbs.push(cb);
      if (!installed) {
        installed = true;
        orig(function(msg) {
          for (let i = 0; i < cbs.length; i++) {
            try {
              cbs[i](msg);
            } catch (e) {
            }
          }
          return msg;
        });
      }
    };
    tp.__amllFanout = true;
    return true;
  }
  function coverUrl(cover) {
    if (!cover) return "";
    if (typeof cover === "string") return cover;
    if (!cover.uri) return cover.urls && cover.urls[0] || "";
    const tpl = cover.template_prefix ? `${cover.template_prefix}-crop-center:600:600.jpg` : "c5_600x600.jpg";
    return `${cover.urls && cover.urls[0] || ""}${cover.uri}~${tpl}`;
  }
  function cssUrl(u) {
    return u ? `url("${String(u).replace(/["\\]/g, "")}")` : "none";
  }
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
      if (a.name.indexOf("data-v-") === 0) toEl.setAttribute(a.name, a.value);
    }
  }
  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const total = Math.floor(sec);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  function copyText(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      return true;
    } catch (e) {
      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text);
          return true;
        }
      } catch (e2) {
      }
      return false;
    }
  }
  var FONT_CSS = `
@font-face{font-family:"SA PingFang";src:local("PingFang SC Regular");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Light");font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Medium");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Bold");font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:"SA PingFang";src:local("PingFang SC Bold");font-weight:700;font-style:normal;font-display:swap}
`;
  var SA_FONT_PINGFANG = `"SA PingFang","PingFang SC","PingFang SC Regular","Microsoft YaHei",system-ui,sans-serif`;
  var SA_FONT_SYSTEM = `-apple-system,"Segoe UI","Microsoft YaHei","PingFang SC",system-ui,sans-serif`;
  var ICON = {
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.5 3.5 21 8l-4.5 4.5"/><path d="M3 20 21 8"/><path d="M16.5 12.5 21 17l-4.5 4.5"/><path d="M3 4l5.2 3.5"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5.2a1.2 1.2 0 0 1 1.2 1.2v11.2a1.2 1.2 0 0 1-2.4 0V6.4A1.2 1.2 0 0 1 7 5.2Z"/><path d="M19.05 5.62c.93-.6 2.15.07 2.15 1.16v10.44c0 1.09-1.22 1.76-2.15 1.16l-8.1-5.22a1.37 1.37 0 0 1 0-2.32l8.1-5.22Z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 5.2a1.2 1.2 0 0 1 1.2 1.2v11.2a1.2 1.2 0 0 1-2.4 0V6.4A1.2 1.2 0 0 1 17 5.2Z"/><path d="M4.95 5.62c-.93-.6-2.15.07-2.15 1.16v10.44c0 1.09 1.22 1.76 2.15 1.16l8.1-5.22a1.37 1.37 0 0 0 0-2.32l-8.1-5.22Z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.4 4.86c0-1.07 1.17-1.73 2.08-1.17l10.3 6.2a1.37 1.37 0 0 1 0 2.34l-10.3 6.2c-.91.56-2.08-.1-2.08-1.17V4.86Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="4.3" width="3.9" height="15.4" rx="1.3"/><rect x="13.6" y="4.3" width="3.9" height="15.4" rx="1.3"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12.5V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 11.5V14a4 4 0 0 1-4 4h-13"/></svg>',
    repeatOne: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12.5V10a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 11.5V14a4 4 0 0 1-4 4h-13"/><path d="M11.2 10.6h1.1v4.4" stroke-width="1.7"/></svg>',
    volLow: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.6 4.3c.83-.58 1.99.02 1.99 1.03v13.34c0 1.01-1.16 1.61-1.99 1.03L6.4 16.5H3.7A1.7 1.7 0 0 1 2 14.8V9.2a1.7 1.7 0 0 1 1.7-1.7h2.7l5.2-3.2Z"/></svg>',
    volHigh: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.6 4.3c.83-.58 1.99.02 1.99 1.03v13.34c0 1.01-1.16 1.61-1.99 1.03L6.4 16.5H3.7A1.7 1.7 0 0 1 2 14.8V9.2a1.7 1.7 0 0 1 1.7-1.7h2.7l5.2-3.2Z"/><path d="M16.1 8.7a1 1 0 0 1 1.41 0 4.9 4.9 0 0 1 0 6.9 1 1 0 1 1-1.41-1.42 2.9 2.9 0 0 0 0-4.07 1 1 0 0 1 0-1.41Z"/><path d="M18.6 6.2a1 1 0 0 1 1.42 0 8.4 8.4 0 0 1 0 11.8 1 1 0 0 1-1.42-1.41 6.4 6.4 0 0 0 0-8.98 1 1 0 0 1 0-1.41Z"/></svg>',
    volOff: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.6 4.3c.83-.58 1.99.02 1.99 1.03v13.34c0 1.01-1.16 1.61-1.99 1.03L6.4 16.5H3.7A1.7 1.7 0 0 1 2 14.8V9.2a1.7 1.7 0 0 1 1.7-1.7h2.7l5.2-3.2Z"/><path d="M16.3 9.3a1 1 0 0 1 1.4 0l1.3 1.3 1.3-1.3a1 1 0 1 1 1.4 1.42L20.4 12l1.3 1.28a1 1 0 0 1-1.4 1.42L19 13.42l-1.3 1.28a1 1 0 0 1-1.4-1.42L17.6 12l-1.3-1.28a1 1 0 0 1 0-1.42Z"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.2" cy="12" r="1.85"/><circle cx="12" cy="12" r="1.85"/><circle cx="18.8" cy="12" r="1.85"/></svg>',
    check: '<svg viewBox="0 0 13 14" fill="none" aria-hidden="true"><path d="M3 8l2.25 2.5L9.5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4.2 4.2 19.8 19.8"/><path d="M19.8 4.2 4.2 19.8"/></svg>'
  };
  var OVERLAY_CSS = `
#soda-amll-overlay{position:fixed;inset:0;z-index:2147483600;overflow:hidden;color:#fff;font-family:${SA_FONT_PINGFANG};font-size:clamp(13px,2.17vh,26px);background:#14140f;border-radius:16px 16px 0 0;transform:translateY(100%);transition:transform .55s cubic-bezier(.8,0,.1,1),border-radius .3s ease-in-out;will-change:transform}
#soda-amll-overlay.sa-open{transform:none;border-radius:0}
#soda-amll-overlay.sa-noanim{transition:none!important}
html[data-sa-font="system"] #soda-amll-overlay,html[data-sa-font="system"] #soda-amll-menu,html[data-sa-font="system"] #soda-amll-win{font-family:${SA_FONT_SYSTEM}}

.sa-bg{position:absolute;inset:-18%;background:radial-gradient(120% 90% at 30% 20%,#3a4030,#0e0e0c 70%);transform:scale(1.1);pointer-events:none;opacity:0;transition:opacity .8s ease,transform 1.6s cubic-bezier(.16,1,.3,1)}
#soda-amll-overlay.sa-open .sa-bg{opacity:1;transform:scale(1.22)}
.sa-bg-layer{position:absolute;inset:0;background-size:cover;background-position:center;background-repeat:no-repeat;opacity:0;transition:opacity .9s cubic-bezier(.4,0,.2,1)}
.sa-bg-layer.sa-on{opacity:1}
.sa-bg.sa-solid .sa-bg-layer{display:none}
.sa-bg.sa-mode-blur .sa-bg-layer{filter:blur(var(--sa-bg-blur,100px)) saturate(var(--sa-bg-sat,1.9)) brightness(var(--sa-bg-bright,.55))}
/* fluid background: AMLL's mesh gradient renderer paints into this canvas and
   keeps it alive on its own rAF loop, so it lives in its own layer. */
.sa-flow{position:absolute;inset:0;z-index:0;pointer-events:none;display:none;opacity:0;transition:opacity .8s ease}
.sa-flow.sa-on{display:block}
#soda-amll-overlay.sa-open .sa-flow{opacity:1}
.sa-flow canvas{position:absolute;inset:0;width:100%;height:100%;display:block;filter:saturate(var(--sa-bg-sat,1.9)) brightness(var(--sa-bg-bright,.55))}
.sa-tint{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,.14) 40%,rgba(0,0,0,.4))}
.sa-vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(130% 110% at 25% 10%,rgba(255,255,255,.06),rgba(0,0,0,.5) 78%)}

.sa-stage{position:absolute;inset:0;display:flex}
.sa-left{flex:1 1 50%;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;height:100%;transition:transform .55s cubic-bezier(.4,0,.2,1);will-change:transform}
/* No lyric data: the left column (cover + meta) glides to the middle while the
   empty lyric column slides off to the right. Both are compositor-only
   transforms on purpose \u2014 animating the column width instead would force the
   AMLL player to re-layout on every frame, which is what made the fold-in
   stutter while the fold-out stayed smooth. */
#soda-amll-overlay.sa-nolyric .sa-left{transform:translateX(50%)}
#soda-amll-overlay.sa-nolyric .sa-lyric{transform:translateX(100%);opacity:0;pointer-events:none}

/* the little bar is a close button: hovering morphs it into a rounded square
   with an X, and it trails the pointer on a spring until it snaps back. */
.sa-close{position:relative;display:flex;align-items:center;justify-content:center;width:clamp(44px,6vh,66px);height:clamp(28px,4.2vh,46px);margin-bottom:2.6vh;padding:0;border:0;background:transparent;cursor:none;touch-action:none;transition:transform .22s cubic-bezier(.22,1.2,.36,1);will-change:transform}
.sa-close .sa-chip{position:relative;display:flex;align-items:center;justify-content:center;width:clamp(40px,5.6vh,64px);height:clamp(7px,1.05vh,12px);border-radius:100px;background:rgba(255,255,255,.32);transition:width .36s cubic-bezier(.34,1.4,.5,1),height .36s cubic-bezier(.34,1.4,.5,1),border-radius .36s cubic-bezier(.34,1.4,.5,1),background-color .3s ease}
.sa-close.sa-expand .sa-chip{width:clamp(24px,3.4vh,40px);height:clamp(24px,3.4vh,40px);border-radius:clamp(6px,.9vh,11px);background:rgba(255,255,255,.2)}
/* the host app styles bare <button> globally, which would otherwise repaint the
   X, so the glyph colour is pinned here. */
.sa-close .sa-x{position:absolute;width:57%;height:57%;color:#0d0d0d;opacity:0;transform:scale(.4) rotate(-60deg);transition:opacity .22s ease,transform .36s cubic-bezier(.34,1.4,.5,1);pointer-events:none}
.sa-close .sa-x svg{display:block;width:100%;height:100%}
.sa-close.sa-expand .sa-x{opacity:.95;transform:none}

.sa-cover-wrap{position:relative;width:min(52vh,37vw);height:min(52vh,37vw);border-radius:3%;box-shadow:0 16px 24px rgba(0,0,0,.25),0 32px 64px rgba(0,0,0,.2);transform:scale(.84);transition:box-shadow .5s ease,transform .72s cubic-bezier(.34,1.56,.64,1)}
.sa-cover-wrap.sa-playing{transform:scale(1.03)}
.sa-cover-wrap.sa-nocursor{cursor:none}
.sa-cover{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:3%;background:rgba(255,255,255,.06);-webkit-user-drag:none}
.sa-cover-ghost{z-index:2;opacity:0;pointer-events:none}

.sa-info{width:min(52vh,37vw);max-width:100%;min-width:0;display:flex;flex-direction:column;margin-top:4.4vh}

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
.sa-progress-fill{height:100%;width:100%;transform:scaleX(0);transform-origin:left center;background:#fff;opacity:.4;transition:opacity .2s;will-change:transform}
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

.sa-lyric{position:relative;flex:1 1 50%;min-width:0;height:100%;padding-right:8%;box-sizing:border-box;transition:transform .55s cubic-bezier(.4,0,.2,1),opacity .4s cubic-bezier(.4,0,.2,1);will-change:transform;overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,transparent 2%,#000 14%,#000 86%,transparent 98%);mask-image:linear-gradient(to bottom,transparent 2%,#000 14%,#000 86%,transparent 98%)}
#soda-amll-overlay.sa-noanim .sa-left,#soda-amll-overlay.sa-noanim .sa-lyric{transition:none}
.sa-lyric .amll-lyric-player{width:100%;height:100%;--amll-lp-color:rgba(255,255,255,.96);font-weight:var(--sa-lyric-weight,600);contain:layout style}
.sa-lyric .amll-lyric-player .FmKaba_lyricLineWrapper{cursor:pointer}
/* AMLL only exposes the sung-region highlight opacity through a class rule, so
   the brightness control has to out-specify .FmKaba_lyricLine.FmKaba_gradientMask. */
.sa-lyric .amll-lyric-player .FmKaba_lyricLine.FmKaba_gradientMask{--bright-mask-alpha:var(--sa-word-bright,1)!important}
.sa-empty{display:none;margin-top:3vh;color:rgba(255,255,255,.4);font-size:1.05em;line-height:1.5;text-align:center;max-width:80%;pointer-events:none}

#soda-amll-fab{position:fixed;right:22px;bottom:104px;z-index:2147483500;appearance:none;border:0;height:34px;padding:0 14px;border-radius:17px;cursor:pointer;background:rgba(24,24,28,.86);color:#fff;font-size:12.5px;font-family:${SA_FONT_PINGFANG};letter-spacing:.04em;box-shadow:0 6px 18px rgba(0,0,0,.4);display:flex;align-items:center;gap:7px;backdrop-filter:blur(8px);transition:transform .15s,background .15s}
#soda-amll-fab:hover{background:rgba(48,48,56,.94);transform:translateY(-1px)}
#soda-amll-fab i{width:6px;height:6px;border-radius:50%;background:#7ee787;display:block}
`;
  var MENU_CSS = `
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
  var WIN_CSS = `
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
  var BAR_CSS = `
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
  var APP_CSS = `
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
      s = document.createElement("style");
      s.id = id;
      document.head.appendChild(s);
    }
    if (s.__text !== text) {
      s.textContent = text;
      s.__text = text;
    }
    return s;
  }
  var SodaAmll = class {
    constructor() {
      this.open = false;
      this.root = null;
      this.el = null;
      this.player = null;
      this.raf = 0;
      this.baseMs = 0;
      this.baseAt = 0;
      this.durationMs = 0;
      this.playing = false;
      this.trackKey = null;
      this.cover = "";
      this.__coverUrl = "";
      this.__trackGen = 0;
      this.flowActive = false;
      this.hasLyric = false;
      this.state = null;
      this.hooked = false;
      this.hookTimer = 0;
      this.visible = false;
      this.fabDone = false;
      this.settings = loadSettings();
      this.menuEl = null;
      this.winEl = null;
      this.settingsPage = "lyric";
      this.hideTimer = 0;
      this.lastTick = 0;
      this.volume = null;
      this.volBeforeMute = 0.5;
      this.volDragging = false;
      this.seekDragging = false;
      this.dragState = null;
      this.playOrder = null;
      this.queueApi = void 0;
    }
    /* ---- data feed ---- */
    hookTransport() {
      if (this.hooked) return;
      const tp = window.transportPort;
      if (!tp || typeof tp.receiveTransport !== "function" || !ensureTransportFanout()) {
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
          if (!msg || msg.serviceId !== "sharedState" || !msg.arguments) return msg;
          const s = msg.arguments[0];
          if (s && typeof s.progressSeconds === "number" && "mediaDetail" in s) this.onState(s);
        } catch (e) {
          LOG("transport handler error", e);
        }
        return msg;
      });
      LOG("transport hooked");
    }
    onState(s) {
      const now = performance.now();
      const est = this.playing ? this.baseMs + (now - this.baseAt) : this.baseMs;
      this.durationMs = (s.durationSeconds || 0) * 1e3;
      const raw = (s.progressSeconds || 0) * 1e3;
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
        const wrap = this.el && this.el.coverWrap;
        if (wrap) wrap.classList.toggle("sa-playing", this.playing);
      }
      if (typeof s.volume === "number" && !this.volDragging) {
        this.volume = s.isMuted ? 0 : clamp2(s.volume, 0, 1);
        if (this.volume > 1e-3) this.volBeforeMute = this.volume;
        this.paintVolume();
      }
      const md = s.mediaDetail;
      const key = md && md.playable ? md.playable.key || md.playable.id : null;
      const trackChanged = !!(key && key !== this.trackKey);
      if (trackChanged) this.trackKey = key;
      this.state = s;
      if (trackChanged) {
        this.applyTrack(md, Math.abs(ms - est) > 400);
        if (performance.now() - (this.lastTransportAt || 0) > 1200) this.pulseTransport("both");
      } else if (this.player && Math.abs(ms - est) > 900) {
        this.player.setCurrentTime(ms, true);
      }
      if (this.open) {
        if (!trackChanged) this.paintMeta();
        this.paintProgress();
      }
    }
    applyTrack(md, seek) {
      const pl = md && md.playable || {};
      this.__trackGen = (this.__trackGen || 0) + 1;
      const cover = coverUrl(pl.cover_url);
      if (cover) this.applyCover(cover);
      const lines = toAmllLines(md && md.lyrics, this.settings);
      this.hasLyric = lines.length > 0;
      this.__lines = lines;
      LOG("track", pl.name, "lines", lines.length);
      this.fab();
      this.applyBarCover();
      if (!this.player) return;
      if (this.open) {
        this.pushLyricLines(lines, seek);
        this.paintMeta();
        this.paintTheme();
      } else {
        this.__linesDirty = true;
      }
    }
    /* hands parsed lines to the player; kept apart from applyTrack so the DOM cost
       can be deferred to the moment the page is actually visible. */
    pushLyricLines(lines, seek) {
      this.__linesDirty = false;
      this.__pushed = true;
      this.player.setLyricLines(lines, this.baseMs);
      if (seek) this.player.setCurrentTime(this.baseMs, true);
      try {
        this.player.update(16);
        if (this.el && this.el.lyric) void this.el.lyric.offsetHeight;
      } catch (e) {
      }
    }
    rebuildLyrics() {
      if (!this.player || !this.state || !this.state.mediaDetail) return;
      const t = this.playing ? this.baseMs + (performance.now() - this.baseAt) : this.baseMs;
      const lines = toAmllLines(this.state.mediaDetail.lyrics, this.settings);
      this.hasLyric = lines.length > 0;
      this.__lines = lines;
      if (!this.open) {
        this.__linesDirty = true;
        return;
      }
      this.__linesDirty = false;
      this.__pushed = true;
      this.player.setLyricLines(lines, t);
      this.paintMeta();
    }
    /* ---- ui ---- */
    ensureDom() {
      if (this.root) return;
      injectStyle("soda-amll-css", style_default + "\n" + OVERLAY_CSS + "\n" + MENU_CSS + "\n" + WIN_CSS);
      const root = document.createElement("div");
      root.id = "soda-amll-overlay";
      root.innerHTML = `
      <div class="sa-bg"><div class="sa-bg-layer sa-bg-l0"></div><div class="sa-bg-layer sa-bg-l1"></div></div>
      <div class="sa-flow"></div>
      <div class="sa-tint"></div>
      <div class="sa-vignette"></div>
      <div class="sa-stage">
        <div class="sa-left">
          <button class="sa-close" title="\u5173\u95ED\u6B4C\u8BCD\u9875\u9762"><span class="sa-chip"><span class="sa-x">${ICON.close}</span></span></button>
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
              <button class="sa-more" title="\u66F4\u591A">${ICON.more}</button>
            </div>
            <div class="sa-progress">
              <div class="sa-progress-inner"><div class="sa-progress-fill"></div></div>
            </div>
            <div class="sa-times"><span class="sa-t-cur">0:00</span><span class="sa-t-dur">-0:00</span></div>
            <div class="sa-controls">
              <button class="sa-cbtn sa-mode sa-shuffle" title="\u968F\u673A\u64AD\u653E">${ICON.shuffle}</button>
              <button class="sa-cbtn sa-prev" title="\u4E0A\u4E00\u9996">${ICON.prev}</button>
              <button class="sa-cbtn sa-play" title="\u64AD\u653E / \u6682\u505C">${ICON.play}</button>
              <button class="sa-cbtn sa-next" title="\u4E0B\u4E00\u9996">${ICON.next}</button>
              <button class="sa-cbtn sa-mode sa-repeat" title="\u5FAA\u73AF\u64AD\u653E">${ICON.repeat}</button>
            </div>
            <div class="sa-volume">
              <button class="sa-vicon sa-vlow" title="\u9759\u97F3 / \u53D6\u6D88\u9759\u97F3">${ICON.volLow}</button>
              <div class="sa-vtrack"><div class="sa-vfill"></div></div>
              <span class="sa-vicon sa-plain" title="\u97F3\u91CF">${ICON.volHigh}</span>
            </div>
          </div>
          <div class="sa-empty">\u7B49\u5F85\u64AD\u653E\u4FE1\u606F\u2026</div>
        </div>
        <div class="sa-lyric"></div>
      </div>
      <div class="sa-fps">-- FPS</div>`;
      document.body.appendChild(root);
      this.root = root;
      this.emptyEl = root.querySelector(".sa-empty");
      this.fpsEl = root.querySelector(".sa-fps");
      this.el = {
        left: root.querySelector(".sa-left"),
        lyric: root.querySelector(".sa-lyric"),
        bg: root.querySelector(".sa-bg"),
        bgLayers: root.querySelectorAll(".sa-bg-layer"),
        flow: root.querySelector(".sa-flow"),
        tint: root.querySelector(".sa-tint"),
        vignette: root.querySelector(".sa-vignette"),
        cover: root.querySelector(".sa-cover"),
        ghost: root.querySelector(".sa-cover-ghost"),
        coverWrap: root.querySelector(".sa-cover-wrap"),
        name: root.querySelector(".sa-name"),
        artist: root.querySelector(".sa-artist"),
        album: root.querySelector(".sa-album"),
        progressFill: root.querySelector(".sa-progress-fill"),
        tCur: root.querySelector(".sa-t-cur"),
        tDur: root.querySelector(".sa-t-dur"),
        play: root.querySelector(".sa-play"),
        vfill: root.querySelector(".sa-vfill"),
        vlow: root.querySelector(".sa-vlow")
      };
      this.player = new DomLyricPlayer();
      root.querySelector(".sa-lyric").appendChild(this.player.getElement());
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
      this.root.querySelector(".sa-more").addEventListener("click", (e) => {
        e.stopPropagation();
        const r = e.currentTarget.getBoundingClientRect();
        this.openMenu(r.right - 210, r.bottom + 6);
      });
    }
    /* ---- close button (bar -> square -> spring) ---- */
    bindClose() {
      const btn = this.root.querySelector(".sa-close");
      if (!btn) return;
      const FOLLOW = 0.24;
      const LIMIT = 52;
      let origin = null;
      let expanded = false;
      let released = false;
      const collapse = () => {
        expanded = false;
        btn.classList.remove("sa-expand");
        btn.style.transform = "";
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
      btn.addEventListener("pointerenter", (e) => {
        if (released) return;
        const r = btn.getBoundingClientRect();
        origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        expanded = true;
        btn.classList.add("sa-expand");
        onMove(e);
      });
      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", reset);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hide();
      });
    }
    /* AMLL re-dispatches a native `click` as `line-click` on the player instance
       (an EventTarget), not on its DOM element. It has no equivalent for
       right-click, so the line menu is driven from the DOM below. */
    bindLyricEvents(target) {
      target.addEventListener("line-click", (e) => {
        if (!this.settings.lyricClickSeek) return;
        const t = this.lineStartTime(e);
        if (t != null) this.seekTo(t);
      });
      const host = this.root.querySelector(".sa-lyric");
      host.addEventListener("contextmenu", (e) => {
        let wrap = e.target;
        while (wrap && wrap !== host && !/linewrapper/i.test(String(wrap.className || ""))) {
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
          if (!line) return "";
          return (line.words || []).map((w) => w.word).join("");
        } catch (err) {
          return "";
        }
      };
      try {
        const group = this.player.lyricGroupElementMap.get(wrap);
        if (group) return { text: read(group.mainLine), sub: read(group.bgLine) };
      } catch (err) {
      }
      return { text: (wrap.textContent || "").trim(), sub: "" };
    }
    lineStartTime(e) {
      try {
        const line = e.line && e.line.getLine ? e.line.getLine() : null;
        if (line && typeof line.startTime === "number") return line.startTime;
        const lines = this.player.dataManager.getProcessedLines();
        const idx = e.lineIndex;
        if (lines && idx >= 0 && lines[idx] && typeof lines[idx].startTime === "number") return lines[idx].startTime;
      } catch (err) {
      }
      return null;
    }
    /* the host only seeks through its own slider, so drive that with the same
       synthetic pointer sequence a real drag would produce. */
    seekTo(ms) {
      if (!this.durationMs) return;
      const ratio = clamp2(ms / this.durationMs, 0, 1);
      const sl = document.querySelector(".bottom-player .progress .slider") || document.querySelector(".bottom-player .slider");
      this.baseMs = clamp2(ms, 0, this.durationMs);
      this.baseAt = performance.now();
      if (this.player) this.player.setCurrentTime(this.baseMs, true);
      this.paintProgress();
      if (!sl) return;
      const r = sl.getBoundingClientRect();
      if (!r.width) return;
      const x = r.left + r.width * ratio;
      const y = r.top + r.height / 2;
      const mk = (type, Ctor, extra) => new Ctor(type, Object.assign({ bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: 1 }, extra));
      sl.dispatchEvent(mk("pointerover", PointerEvent));
      sl.dispatchEvent(mk("pointerenter", PointerEvent));
      sl.dispatchEvent(mk("pointerdown", PointerEvent));
      sl.dispatchEvent(mk("mousedown", MouseEvent));
      window.dispatchEvent(mk("pointermove", PointerEvent));
      document.dispatchEvent(mk("pointermove", PointerEvent));
      window.dispatchEvent(mk("pointerup", PointerEvent, { buttons: 0 }));
      document.dispatchEvent(mk("mouseup", MouseEvent, { buttons: 0 }));
    }
    /* ---- progress bar ---- */
    bindProgress() {
      const bar = this.root.querySelector(".sa-progress");
      const ratioAt = (e) => {
        const r = bar.getBoundingClientRect();
        if (!r.width) return null;
        return clamp2((e.clientX - r.left) / r.width, 0, 1);
      };
      const preview = (ratio) => {
        if (ratio == null) return;
        this.baseMs = ratio * this.durationMs;
        this.baseAt = performance.now();
        if (this.player) this.player.setCurrentTime(this.baseMs, true);
        this.paintProgress();
      };
      bar.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.seekDragging = true;
        bar.classList.add("sa-active");
        try {
          bar.setPointerCapture(e.pointerId);
        } catch (err) {
        }
        preview(ratioAt(e));
      });
      bar.addEventListener("pointermove", (e) => {
        if (this.seekDragging) preview(ratioAt(e));
      });
      const end = (e) => {
        if (!this.seekDragging) return;
        this.seekDragging = false;
        bar.classList.remove("sa-active");
        const r = ratioAt(e);
        if (r != null && this.durationMs) this.seekTo(r * this.durationMs);
      };
      bar.addEventListener("pointerup", end);
      bar.addEventListener("pointercancel", () => {
        this.seekDragging = false;
        bar.classList.remove("sa-active");
      });
    }
    /* ---- transport / volume ---- */
    bindControls() {
      const q = (s) => this.root.querySelector(s);
      q(".sa-prev").addEventListener("click", () => this.hostTransport("prev"));
      q(".sa-play").addEventListener("click", () => this.hostTransport("playpause"));
      q(".sa-next").addEventListener("click", () => this.hostTransport("next"));
      q(".sa-shuffle").addEventListener("click", () => this.toggleShuffle());
      q(".sa-repeat").addEventListener("click", () => this.toggleRepeat());
      q(".sa-vlow").addEventListener("click", () => this.toggleMute());
      this.bindVolumeTrack();
      this.paintPlayIcon();
      this.paintVolume();
      this.refreshPlayOrder();
    }
    hostCenterButtons() {
      const c = document.querySelector(".bottom-player .controls.center");
      if (!c) return null;
      const b = [...c.querySelectorAll(":scope > .button")];
      return b.length >= 3 ? b : null;
    }
    hostClick(el) {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const o = { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 1, pointerType: "mouse", isPrimary: true };
      el.dispatchEvent(new PointerEvent("pointerdown", Object.assign({}, o, { button: 0, buttons: 1 })));
      el.dispatchEvent(new MouseEvent("mousedown", Object.assign({}, o, { button: 0, buttons: 1 })));
      el.dispatchEvent(new PointerEvent("pointerup", Object.assign({}, o, { button: 0, buttons: 0 })));
      el.dispatchEvent(new MouseEvent("mouseup", Object.assign({}, o, { button: 0, buttons: 0 })));
      el.dispatchEvent(new MouseEvent("click", Object.assign({}, o, { button: 0, buttons: 0 })));
      return true;
    }
    hostTransport(action) {
      const b = this.hostCenterButtons();
      if (!b) return;
      const idx = { prev: 0, playpause: 1, next: 2 }[action];
      if (idx == null) return;
      if (action === "prev" || action === "next") {
        this.lastTransportAt = performance.now();
        this.pulseTransport(action);
      }
      this.hostClick(b[idx]);
      this.paintPlayIcon();
    }
    /* replay the push animation on the transport buttons */
    pulseTransport(dir) {
      if (!this.root || !this.settings.btnAnim) return;
      const pick = { prev: [".sa-prev", "sa-push-l"], next: [".sa-next", "sa-push-r"] };
      const jobs = dir === "both" ? [pick.prev, pick.next] : [pick[dir]];
      for (const [sel, cls] of jobs) {
        if (!cls) continue;
        const el = this.root.querySelector(sel);
        if (!el) continue;
        el.classList.remove("sa-push-l", "sa-push-r", "sa-push-c");
        void el.offsetWidth;
        el.classList.add(cls);
      }
    }
    hostActionButton(match) {
      const bp = document.querySelector(".bottom-player");
      if (!bp) return null;
      const list = [...bp.querySelectorAll(".controls.actions > .button")];
      for (const b of list) {
        const p2 = b.querySelector("svg path");
        const d = p2 && p2.getAttribute("d");
        if (d && d.indexOf(match) === 0) return b;
      }
      return null;
    }
    hostLikeButton() {
      const bp = document.querySelector(".bottom-player");
      if (!bp) return null;
      const list = [...bp.querySelectorAll(".controls.actions-left > .button")];
      return list[2] || null;
    }
    /* the volume popover only mounts while the speaker button is hovered */
    hoverHostVolume(el) {
      const r = el.getBoundingClientRect();
      const o = { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, pointerId: 1, pointerType: "mouse", isPrimary: true };
      for (const t of ["pointerover", "pointerenter", "mouseover", "mouseenter", "mousemove", "pointermove"]) {
        el.dispatchEvent(new (t.indexOf("pointer") === 0 ? PointerEvent : MouseEvent)(t, o));
      }
    }
    hostVolumeSlider() {
      const box = document.querySelector(".volume-box-wrapper");
      return box && box.querySelector(".slider");
    }
    /* the host volume slider is vertical and reversed: 0 sits at the bottom */
    applyHostVolume(v) {
      const btn = this.hostActionButton("M22.2 3.6") || this.hostVolumeButton();
      if (!btn) return;
      const target = clamp2(v, 0, 1);
      let tries = 0;
      const attempt = () => {
        this.hoverHostVolume(btn);
        const slider = this.hostVolumeSlider();
        if (!slider) {
          if (++tries < 6) setTimeout(attempt, 55);
          return;
        }
        const track = slider.querySelector(".slider-track") || slider;
        const r = track.getBoundingClientRect();
        if (!r.height) return;
        const o = { bubbles: true, cancelable: true, composed: true, clientX: r.left + r.width / 2, clientY: r.bottom - target * r.height, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: 1 };
        slider.dispatchEvent(new PointerEvent("pointerdown", o));
        document.dispatchEvent(new PointerEvent("pointermove", o));
        slider.dispatchEvent(new PointerEvent("pointerup", Object.assign({}, o, { buttons: 0 })));
      };
      attempt();
    }
    hostVolumeButton() {
      const bp = document.querySelector(".bottom-player");
      if (!bp) return null;
      const list = [...bp.querySelectorAll(".controls.actions > .button")];
      if (!list.length) return null;
      for (const b of list) {
        const p2 = b.querySelector("svg path");
        const d = p2 && p2.getAttribute("d");
        if (d && d.indexOf("M22.2 3.6") === 0) return b;
      }
      return list[list.length - 2] || null;
    }
    bindVolumeTrack() {
      const track = this.root.querySelector(".sa-vtrack");
      const valueAt = (e) => {
        const r = track.getBoundingClientRect();
        if (!r.width) return null;
        return clamp2((e.clientX - r.left) / r.width, 0, 1);
      };
      track.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.volDragging = true;
        track.classList.add("sa-active");
        try {
          track.setPointerCapture(e.pointerId);
        } catch (err) {
        }
        const v = valueAt(e);
        if (v != null) this.setVolume(v);
      });
      track.addEventListener("pointermove", (e) => {
        if (!this.volDragging) return;
        const v = valueAt(e);
        if (v != null) this.setVolume(v);
      });
      const end = () => {
        this.volDragging = false;
        track.classList.remove("sa-active");
      };
      track.addEventListener("pointerup", end);
      track.addEventListener("pointercancel", end);
    }
    setVolume(v) {
      this.volume = clamp2(v, 0, 1);
      if (this.volume > 1e-3) this.volBeforeMute = this.volume;
      this.paintVolume();
      this.applyHostVolume(this.volume);
    }
    toggleMute() {
      if (this.volume == null) this.volume = 0.5;
      this.setVolume(this.volume > 1e-3 ? 0 : this.volBeforeMute || 0.5);
    }
    paintVolume() {
      const el = this.el;
      if (!el) return;
      const v = this.volume == null ? 0.3 : this.volume;
      const pct = `${Math.round(v * 100)}%`;
      if (pct !== this.__volPct) {
        this.__volPct = pct;
        el.vfill.style.width = pct;
      }
      const muted = v <= 1e-3;
      if (muted !== this.__volMuted) {
        this.__volMuted = muted;
        el.vlow.innerHTML = muted ? ICON.volOff : ICON.volLow;
      }
    }
    paintPlayIcon() {
      const el = this.el;
      if (!el || !el.play) return;
      if (this.__playIcon === this.playing) return;
      this.__playIcon = this.playing;
      el.play.innerHTML = this.playing ? ICON.pause : ICON.play;
    }
    /* runs on every animation frame: resolve nothing, and only touch the DOM when
       a value actually changed — the countdown labels only move once a second. */
    paintProgress() {
      const el = this.el;
      if (!el || !el.progressFill) return;
      const now = performance.now();
      const t = this.playing ? this.baseMs + (now - this.baseAt) : this.baseMs;
      const ms = this.durationMs ? clamp2(t, 0, this.durationMs) : t;
      const ratio = this.durationMs ? ms / this.durationMs : 0;
      const pct = ratio.toFixed(4);
      if (pct !== this.__pct) {
        this.__pct = pct;
        el.progressFill.style.transform = `scaleX(${pct})`;
      }
      const cur = fmtTime(ms / 1e3);
      if (cur !== this.__tCur) {
        this.__tCur = cur;
        el.tCur.textContent = cur;
      }
      const dur = this.durationMs ? `-${fmtTime((this.durationMs - ms) / 1e3)}` : "-0:00";
      if (dur !== this.__tDur) {
        this.__tDur = dur;
        el.tDur.textContent = dur;
      }
    }
    /* Single funnel for artwork changes. The display <img>, the blurred layers
       and the fluid background each keep their own copy of the cover, and they
       used to be updated from different call sites: the background ones only ran
       on a track change, while the artwork itself can arrive a message later. The
       result was a background that stayed one track behind — including turning
       into the *previous* cover's colours when you went back. Everything now
       reads this.cover through here so they cannot drift apart. */
    applyCover(url) {
      url = url || "";
      if (url !== this.__coverUrl) {
        this.__coverUrl = url;
        this.cover = url;
        this.setCover(url);
        this.setBg(url);
        this.applyBarCover();
      }
      if (this.flowActive) this.setFlowAlbum(this.cover);
    }
    /* crossfade the artwork: the new cover fades in on a ghost layer sitting on
       top of the committed one, which is swapped in once the fade is done.
       Every call claims a token so a slow preload from a track the user already
       skipped past can never paint over the current one. */
    setCover(url) {
      const el = this.el;
      if (!el) return;
      const img = el.cover;
      const ghost = el.ghost;
      if (!img || !ghost) return;
      url = url || "";
      const current = img.getAttribute("src") || "";
      if (url === current || url === (ghost.getAttribute("src") || "")) return;
      const token = this.__coverToken = (this.__coverToken || 0) + 1;
      const live = () => token === this.__coverToken;
      const commit = () => {
        if (!live()) return;
        if (url) img.src = url;
        ghost.style.transition = "none";
        ghost.style.opacity = "0";
      };
      if (!this.settings.mediaAnim || !current || !url) {
        clearTimeout(this.__coverTimer);
        commit();
        return;
      }
      const start = () => {
        if (!live()) return;
        ghost.src = url;
        ghost.style.transition = "none";
        ghost.style.opacity = "0";
        void ghost.offsetWidth;
        ghost.style.transition = "opacity .3s cubic-bezier(.4,0,.2,1)";
        ghost.style.opacity = "1";
        clearTimeout(this.__coverTimer);
        this.__coverTimer = setTimeout(commit, 320);
      };
      let settled = false;
      const finish = (ready) => {
        if (settled || !live()) return;
        settled = true;
        clearTimeout(cap);
        if (ready) start();
        else commit();
      };
      const cap = setTimeout(() => finish(false), 2500);
      const probe = new Image();
      probe.onload = () => finish(true);
      probe.onerror = () => finish(false);
      probe.src = url;
    }
    setBg(url) {
      const layers = this.el && this.el.bgLayers;
      if (!layers || layers.length < 2) return;
      const cur = this.bgLayer || 0;
      const u = url || "";
      if (!u || (layers[cur].dataset.url || "") === u) return;
      const token = this.__bgToken = (this.__bgToken || 0) + 1;
      const apply = () => {
        if (token !== this.__bgToken) return;
        const from = this.bgLayer || 0;
        const to = 1 - from;
        layers[to].style.backgroundImage = u ? `url("${u}")` : "none";
        layers[to].dataset.url = u;
        layers[to].classList.add("sa-on");
        layers[from].classList.remove("sa-on");
        this.bgLayer = to;
      };
      if (!this.settings.mediaAnim || !layers[cur].dataset.url) {
        apply();
        return;
      }
      preload(u).then(apply);
    }
    /* runs on every transport message, so every write is guarded by a change
       check — assigning textContent/style unconditionally would invalidate style
       and layout several times a second for no visual difference. */
    paintMeta() {
      const el = this.el;
      if (!el) return;
      const md = this.state && this.state.mediaDetail || {};
      const pl = md.playable || {};
      const cover = coverUrl(pl.cover_url);
      if (cover) this.applyCover(cover);
      const name = pl.name || "";
      if (name !== this.__name) {
        this.__name = name;
        el.name.textContent = name;
      }
      const artist = (pl.artists || []).map((a) => a.name).join(" / ");
      if (artist !== this.__artist) {
        this.__artist = artist;
        el.artist.textContent = artist;
      }
      const album = this.settings.showAlbum ? pl.album && pl.album.name || "" : "";
      if (album !== this.__album) {
        this.__album = album;
        el.album.textContent = album;
      }
      const albumShown = !!(this.settings.showAlbum && pl.album);
      if (albumShown !== this.__albumShown) {
        this.__albumShown = albumShown;
        el.album.style.display = albumShown ? "" : "none";
      }
      const emptyShown = !name;
      if (emptyShown !== this.__emptyShown) {
        this.__emptyShown = emptyShown;
        this.emptyEl.style.display = emptyShown ? "block" : "none";
      }
      const nolyric = !this.hasLyric;
      if (nolyric !== this.__nolyric) {
        this.__nolyric = nolyric;
        const root = this.root;
        const token = this.__foldToken = (this.__foldToken || 0) + 1;
        if (nolyric) {
          root.classList.add("sa-nolyric");
        } else {
          void root.offsetHeight;
          requestAnimationFrame(() => {
            if (token !== this.__foldToken) return;
            root.classList.remove("sa-nolyric");
          });
        }
      }
    }
    paintTheme() {
      const el = this.el;
      if (!this.root || !el) return;
      const s = this.settings;
      const bg = el.bg;
      if (!bg) return;
      const flowHost = el.flow;
      let mode = s.bgEnabled ? s.bgType : "solid";
      if (mode === "flow" && !this.ensureFlowBg()) mode = "blur";
      this.flowActive = mode === "flow";
      if (this.flowActive) {
        if (flowHost) flowHost.classList.add("sa-on");
        this.applyFlowSettings();
        this.setFlowAlbum(this.cover);
        if (this.open) this.flowBg.resume();
      } else {
        if (flowHost) flowHost.classList.remove("sa-on");
        if (this.flowBg) this.flowBg.pause();
      }
      bg.classList.toggle("sa-mode-flow", mode === "flow");
      bg.classList.toggle("sa-mode-blur", mode === "blur");
      bg.classList.toggle("sa-solid", mode === "solid");
      this.setBg(this.cover);
    }
    /* ---- fluid background (AMLL IsolationRenderer) ----
       Isolation is the WebGL port of Cirrus' IsolationEffect: four palette
       colours blended by a noise-driven gradient. The older MeshGradientRenderer
       lays a Bezier patch mesh over the artwork, whose patch seams show up as a
       stray bright S-shaped band, so it is only kept as a fallback. */
    ensureFlowBg() {
      if (this.flowBg) return this.flowBg;
      if (this.flowBgFailed || !this.root) return null;
      const host = this.root.querySelector(".sa-flow");
      if (!host) return null;
      try {
        let render = null;
        if (IsolationRenderer.isSupported()) {
          render = BackgroundRender.new(IsolationRenderer);
          try {
            render.getRenderer().setOptions({
              lightWave: false,
              dithering: !this.settings.bgPerf
            });
          } catch (e) {
          }
        } else if (MeshGradientRenderer.isSupported()) {
          render = BackgroundRender.new(MeshGradientRenderer);
        }
        if (!render) throw new Error("WebGL unavailable");
        const el = render.getElement();
        el.style.zIndex = "";
        el.style.contain = "";
        el.style.pointerEvents = "";
        host.appendChild(el);
        this.flowBg = render;
        this.__flowOpts = null;
        if (!this.open) render.pause();
        LOG("flow background ready");
      } catch (e) {
        this.flowBgFailed = true;
        LOG("flow background unavailable", e && e.message);
      }
      return this.flowBg || null;
    }
    applyFlowSettings() {
      const render = this.flowBg;
      if (!render) return;
      const s = this.settings;
      const perf = !!s.bgPerf;
      const scale = clamp2(Number(s.bgRenderScale) || 0.5, 0.2, 1);
      const fps = clamp2(Math.round(Number(s.bgFps)) || 0, 0, 60);
      const effScale = perf ? Math.min(scale, 0.35) : scale;
      const speed = clamp2(Number(s.bgFlowSpeed) || 1, 0.1, 4);
      const base = fps > 0 ? fps : 30;
      const effFps = perf ? Math.min(base, 24) : base;
      const staticMode = fps <= 0;
      const dithering = !perf;
      const cur = this.__flowOpts || (this.__flowOpts = {});
      if (cur.scale !== effScale) {
        cur.scale = effScale;
        render.setRenderScale(effScale);
      }
      if (cur.speed !== speed) {
        cur.speed = speed;
        render.setFlowSpeed(speed);
      }
      if (cur.fps !== effFps) {
        cur.fps = effFps;
        render.setFPS(effFps);
      }
      if (cur.staticMode !== staticMode) {
        cur.staticMode = staticMode;
        render.setStaticMode(staticMode);
      }
      if (cur.dithering !== dithering) {
        cur.dithering = dithering;
        try {
          const inner = render.getRenderer();
          if (inner && typeof inner.setOptions === "function") {
            inner.setOptions({ lightWave: false, dithering });
          }
        } catch (e) {
        }
      }
    }
    /* The renderer wants a CORS-clean image for its WebGL texture, so the cover is
       re-fetched with crossOrigin rather than reusing the display <img>.
       The palette belongs to the *track*, not merely to the artwork url, and two
       things used to go wrong because of it:
         - a url that failed to load once was blacklisted for the whole session, so
           that track kept showing the previous track's palette — and coming back to
           it kept showing the one you had just left;
         - a slow request started for a track you had already skipped past stayed
           "wanted" (the artwork url does not change on the way back), so it tinted
           the background with the wrong cover when it finally landed.
       Every track change bumps `__trackGen`: a request only lands while it still
       belongs to the current generation, and a failure is remembered per
       generation so the next visit — or a short delayed retry — tries again. */
    setFlowAlbum(url) {
      const render = this.flowBg;
      if (!render) return;
      const u = url || "";
      const gen = this.__trackGen || 0;
      if (!u) {
        this.flowAlbumWant = "";
        this.flowAlbumGen = gen;
        return;
      }
      if (this.flowAlbumApplied === u && this.flowAlbumGen === gen) return;
      if (this.flowAlbumWant === u && this.flowAlbumGen === gen) return;
      if (this.flowAlbumBadUrl === u && this.flowAlbumBadGen === gen) return;
      this.flowAlbumWant = u;
      this.flowAlbumGen = gen;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (this.flowBg !== render || this.flowAlbumWant !== u || this.flowAlbumGen !== gen) return;
        this.flowAlbumApplied = u;
        this.flowAlbumErrors = 0;
        this.flowAlbumRetries = 0;
        render.setAlbum(img);
      };
      img.onerror = () => {
        if (this.flowBg !== render || this.flowAlbumWant !== u || this.flowAlbumGen !== gen) return;
        this.flowAlbumWant = "";
        this.flowAlbumBadUrl = u;
        this.flowAlbumBadGen = gen;
        if (this.flowAlbumApplied) {
          LOG("flow background: cover not readable, keeping previous palette", u);
          this.retryFlowAlbum(u, gen);
          return;
        }
        this.flowAlbumErrors = (this.flowAlbumErrors || 0) + 1;
        LOG("flow background: cover not readable, attempt", this.flowAlbumErrors);
        if (this.flowAlbumErrors < 3) {
          this.retryFlowAlbum(u, gen);
          return;
        }
        this.flowBgFailed = true;
        this.flowBg = null;
        this.flowAlbumBadUrl = "";
        this.flowAlbumBadGen = -1;
        try {
          render.dispose();
        } catch (e) {
        }
        this.paintTheme();
      };
      img.src = u;
    }
    /* a single delayed retry for a cover that failed while its track was current,
       so a transient hiccup heals itself instead of leaving the previous track's
       palette up until the user happens to switch away and back. */
    retryFlowAlbum(url, gen) {
      if (this.flowAlbumRetryGen !== gen) {
        this.flowAlbumRetryGen = gen;
        this.flowAlbumRetries = 0;
      }
      if (this.flowAlbumRetries >= 2) return;
      this.flowAlbumRetries += 1;
      clearTimeout(this.flowAlbumRetryTimer);
      this.flowAlbumRetryTimer = setTimeout(() => {
        if ((this.__trackGen || 0) !== gen || !this.flowActive) return;
        if (this.flowAlbumApplied === url) return;
        this.flowAlbumBadUrl = "";
        this.flowAlbumBadGen = -1;
        this.setFlowAlbum(url);
      }, 1500);
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
        if (this.hasLyric && !this.__nolyric) this.player.update(delta);
      }
      if (this.settings.showFps && this.fpsEl) {
        this.__fpsFrames = (this.__fpsFrames || 0) + 1;
        if (!this.__fpsAt) this.__fpsAt = now;
        if (now - this.__fpsAt >= 500) {
          const fps = this.__fpsFrames * 1e3 / (now - this.__fpsAt);
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
      this.root.style.display = "";
      this.visible = true;
      this.open = true;
      this.applySettings();
      this.__nolyric = !this.hasLyric;
      this.__foldToken = (this.__foldToken || 0) + 1;
      this.root.classList.toggle("sa-nolyric", this.__nolyric);
      this.root.classList.remove("sa-open");
      void this.root.offsetWidth;
      this.root.classList.add("sa-open");
      this.paintMeta();
      this.paintTheme();
      this.paintPlayIcon();
      this.paintVolume();
      this.paintProgress();
      this.refreshPlayOrder();
      if (this.player) {
        if (this.__linesDirty || !this.__pushed) this.pushLyricLines(this.__lines || [], true);
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
      if (this.__resetClose) this.__resetClose();
      root.classList.remove("sa-open");
      root.style.transform = "";
      root.style.opacity = "";
      root.style.borderRadius = "";
      if (this.settings.lyricTransition) {
        this.hideTimer = setTimeout(() => {
          root.style.display = "none";
          this.hideTimer = 0;
        }, 600);
      } else {
        root.classList.add("sa-noanim");
        root.style.display = "none";
        setTimeout(() => root.classList.remove("sa-noanim"), 30);
      }
      this.visible = false;
      if (this.player) this.player.pause();
      if (this.flowBg) this.flowBg.pause();
    }
    toggle() {
      if (this.open) this.hide();
      else this.show();
    }
    fab() {
      if (this.fabDone || !document.body) return;
      if (document.getElementById("soda-amll-fab")) {
        this.fabDone = true;
        return;
      }
      injectStyle("soda-amll-css", style_default + "\n" + OVERLAY_CSS + "\n" + MENU_CSS + "\n" + WIN_CSS);
      const b = document.createElement("button");
      b.id = "soda-amll-fab";
      b.innerHTML = "<i></i><span>AMLL \u6B4C\u8BCD</span>";
      b.addEventListener("click", () => this.toggle());
      document.body.appendChild(b);
      this.fabDone = true;
    }
    /* ---- menus ---- */
    bindContextMenu() {
      if (this.root.__saCtx) return;
      this.root.__saCtx = true;
      this.root.addEventListener("contextmenu", (e) => {
        if (e.target.closest(".sa-menu")) return;
        e.preventDefault();
        this.openMenu(e.clientX, e.clientY);
      });
    }
    placeMenu(m, x, y) {
      const r = m.getBoundingClientRect();
      m.style.left = `${clamp2(x, 8, window.innerWidth - r.width - 8)}px`;
      m.style.top = `${clamp2(y, 8, window.innerHeight - r.height - 8)}px`;
    }
    mountMenu(m, x, y, onClick) {
      this.closeMenu();
      document.body.appendChild(m);
      this.menuEl = m;
      this.placeMenu(m, x, y);
      requestAnimationFrame(() => m.classList.add("sa-show"));
      if (onClick) {
        m.addEventListener("click", (e) => {
          const item = e.target.closest(".sa-mi");
          if (!item) return;
          const act = item.dataset.act;
          if (item.dataset.keep !== "1") this.closeMenu();
          onClick(act, item, e);
        });
      }
      setTimeout(() => {
        this.__menuOff = (ev) => {
          if (this.menuEl && !this.menuEl.contains(ev.target)) this.closeMenu();
        };
        document.addEventListener("mousedown", this.__menuOff, true);
        document.addEventListener("wheel", this.__menuOff, true);
      }, 0);
    }
    closeMenu() {
      if (this.__menuOff) {
        document.removeEventListener("mousedown", this.__menuOff, true);
        document.removeEventListener("wheel", this.__menuOff, true);
        this.__menuOff = null;
      }
      if (this.menuEl) {
        this.menuEl.remove();
        this.menuEl = null;
      }
    }
    menuGroup(items) {
      return `<div class="sa-menu-group">${items.join("")}</div>`;
    }
    menuItem(label, act, opts) {
      const o = opts || {};
      const cls = ["sa-mi"];
      if (o.checked) cls.push("sa-checked");
      if (o.danger) cls.push("sa-danger");
      const sub = o.sub ? `<span class="sa-mi-sub">${o.sub}</span>` : "";
      return `<div class="${cls.join(" ")}" data-act="${act}">${ICON.check.replace("<svg", '<svg class="sa-tick"')}${label}${sub}</div>`;
    }
    openMenu(x, y) {
      const md = this.state && this.state.mediaDetail || {};
      const pl = md.playable || {};
      const artist = (pl.artists || []).map((a) => a.name).join(" / ") || "\u672A\u77E5\u6B4C\u624B";
      const album = pl.album && pl.album.name || "\u672A\u77E5\u4E13\u8F91";
      const m = document.createElement("div");
      m.className = "sa-menu sa-checkbox";
      m.innerHTML = this.menuGroup([this.menuItem("\u559C\u6B22\u6B4C\u66F2", "like"), this.menuItem("\u6536\u85CF\u6B4C\u66F2", "collect")]) + this.menuGroup([this.menuItem(`\u67E5\u770B\u6B4C\u624B\uFF1A${artist}`, "goArtist"), this.menuItem(`\u67E5\u770B\u4E13\u8F91\uFF1A${album}`, "goAlbum")]) + this.menuGroup([this.menuItem("\u590D\u5236\u97F3\u4E50\u6570\u636E...", "copyData"), this.menuItem("\u7F16\u8F91\u97F3\u4E50\u6570\u636E", "editData")]) + this.menuGroup([this.menuItem("\u663E\u793A\u7FFB\u8BD1\u6B4C\u8BCD", "tglTranslation", { checked: this.settings.showTranslation }), this.menuItem("\u663E\u793A\u97F3\u8BD1\u6B4C\u8BCD", "tglRoman", { checked: this.settings.showRoman })]) + this.menuGroup([this.menuItem("\u5207\u6362\u5168\u5C4F\u6A21\u5F0F", "fullscreen")]) + this.menuGroup([this.menuItem("Apple Music-like Lyrics \u63D2\u4EF6\u8BBE\u7F6E...", "settings"), this.menuItem("\u9000\u51FA\u6B4C\u8BCD\u9875\u9762", "close", { danger: true })]);
      this.mountMenu(m, x, y, (act) => this.runMenuAction(act, pl));
    }
    runMenuAction(act, pl) {
      switch (act) {
        case "like":
          this.hostLike();
          break;
        case "collect":
          this.toast("\u5DF2\u6536\u85CF\u5230\u300C\u6211\u559C\u6B22\u7684\u97F3\u4E50\u300D");
          break;
        case "goArtist":
          this.toast(`\u6B4C\u624B\uFF1A${(pl.artists || []).map((a) => a.name).join(" / ") || "\u672A\u77E5"}`);
          break;
        case "goAlbum":
          this.toast(`\u4E13\u8F91\uFF1A${pl.album && pl.album.name || "\u672A\u77E5"}`);
          break;
        case "copyData":
          copyText(JSON.stringify(this.state && this.state.mediaDetail, null, 2));
          this.toast("\u5DF2\u590D\u5236\u97F3\u4E50\u6570\u636E\u5230\u526A\u8D34\u677F");
          break;
        case "editData":
          this.toast("\u7F16\u8F91\u97F3\u4E50\u6570\u636E\u8BF7\u4F7F\u7528\u5BA2\u6237\u7AEF\u81EA\u5E26\u5165\u53E3");
          break;
        case "tglTranslation":
          this.settings.showTranslation = !this.settings.showTranslation;
          this.commitSettings();
          this.toast(`\u5DF2${this.settings.showTranslation ? "\u663E\u793A" : "\u9690\u85CF"}\u7FFB\u8BD1\u6B4C\u8BCD`);
          break;
        case "tglRoman":
          this.settings.showRoman = !this.settings.showRoman;
          this.commitSettings();
          this.toast(this.settings.showRoman ? "\u5DF2\u5F00\u542F\u97F3\u8BD1\u6B4C\u8BCD\uFF08\u5F53\u524D\u6B4C\u66F2\u65E0\u97F3\u8BD1\u6570\u636E\uFF09" : "\u5DF2\u9690\u85CF\u97F3\u8BD1\u6B4C\u8BCD");
          break;
        case "fullscreen":
          this.toggleFullscreen();
          break;
        case "settings":
          this.openSettings();
          break;
        case "close":
          this.hide();
          break;
        default:
          break;
      }
    }
    openLineMenu(x, y, text, sub) {
      const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
      const main = (text || "").trim();
      const label = esc(main.slice(0, 40)) || "\uFF08\u7A7A\u884C\uFF09";
      const m = document.createElement("div");
      m.className = "sa-menu";
      m.style.fontSize = "12px";
      m.innerHTML = this.menuGroup([this.menuItem(`\u590D\u5236\u539F\u6B4C\u8BCD\uFF1A${label}`, "copyLine")]) + this.menuGroup([this.menuItem("\u590D\u5236\u6574\u884C\u6B4C\u8BCD", "copyLineOnly")]);
      this.mountMenu(m, x, y, (act) => {
        if (act === "copyLine") {
          copyText(main);
          this.toast("\u5DF2\u590D\u5236\u8BE5\u884C\u6B4C\u8BCD");
        } else if (act === "copyLineOnly") {
          copyText([main, (sub || "").trim()].filter(Boolean).join("\n"));
          this.toast("\u5DF2\u590D\u5236\u6574\u884C\u6B4C\u8BCD");
        }
      });
    }
    hostLike() {
      const btn = this.hostLikeButton();
      if (!btn) {
        this.toast("\u672A\u627E\u5230\u559C\u6B22\u6309\u94AE");
        return;
      }
      const before = String(btn.className);
      this.hostClick(btn);
      setTimeout(() => {
        const changed = String(btn.className) !== before || !!btn.querySelector(".active");
        this.toast(changed ? "\u5DF2\u559C\u6B22\u8FD9\u9996\u6B4C\u66F2" : "\u5DF2\u53D1\u9001\u559C\u6B22\u8BF7\u6C42");
      }, 260);
    }
    toggleFullscreen() {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      } catch (e) {
        this.toast("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5168\u5C4F\u5207\u6362");
      }
    }
    /* ---- play order ---- */
    findQueueApi() {
      if (this.queueApi !== void 0) return this.queueApi;
      this.queueApi = null;
      try {
        const seen = /* @__PURE__ */ new Set();
        const stack = [{ v: window, d: 0 }];
        let n = 0;
        while (stack.length && n < 2e4) {
          const { v, d } = stack.pop();
          if (!v || typeof v !== "object" || seen.has(v) || d > 3) continue;
          seen.add(v);
          n++;
          let keys2;
          try {
            keys2 = Object.getOwnPropertyNames(v);
          } catch (e) {
            continue;
          }
          for (const k of keys2) {
            if (/^(window|self|top|parent|frames|document|location|navigator|localStorage|sessionStorage|indexedDB|caches|performance|console|crypto|history|screen)$/.test(k)) continue;
            let val;
            try {
              val = v[k];
            } catch (e) {
              continue;
            }
            if (!val || typeof val !== "object") continue;
            if (typeof val.setPlayOrder === "function" && Array.isArray(val.supportPlayOrder)) {
              this.queueApi = val;
              LOG("queue api found at depth", d, k, val.supportPlayOrder);
              return val;
            }
            if (d < 3) stack.push({ v: val, d: d + 1 });
          }
        }
      } catch (e) {
      }
      LOG("queue api not found");
      return null;
    }
    currentPlayOrder() {
      const q = this.findQueueApi();
      try {
        const st = q && q.state && q.state.value;
        if (st && st.playback && typeof st.playback.playOrder === "number") return st.playback.playOrder;
      } catch (e) {
      }
      return null;
    }
    refreshPlayOrder() {
      this.playOrder = this.currentPlayOrder();
      this.paintPlayOrder();
    }
    paintPlayOrder() {
      if (!this.root) return;
      const order = this.playOrder;
      const shuffle = this.root.querySelector(".sa-shuffle");
      const repeat = this.root.querySelector(".sa-repeat");
      if (!shuffle || !repeat) return;
      const isShuffle = order === 2;
      const isSingle = order === 1;
      shuffle.classList.toggle("sa-on", isShuffle);
      repeat.classList.toggle("sa-on", isSingle);
      const html = isSingle ? ICON.repeatOne : ICON.repeat;
      if (repeat.innerHTML !== html) repeat.innerHTML = html;
    }
    toggleShuffle() {
      const q = this.findQueueApi();
      const order = this.currentPlayOrder();
      if (q && order != null) {
        const next = order === 2 ? 0 : 2;
        if (Array.isArray(q.supportPlayOrder) && q.supportPlayOrder.indexOf(next) < 0) {
          this.toast("\u5F53\u524D\u961F\u5217\u4E0D\u652F\u6301\u968F\u673A\u64AD\u653E");
          return;
        }
        q.setPlayOrder(next);
        setTimeout(() => this.refreshPlayOrder(), 120);
        this.toast(next === 2 ? "\u5DF2\u5207\u6362\u4E3A\u968F\u673A\u64AD\u653E" : "\u5DF2\u5207\u6362\u4E3A\u5217\u8868\u5FAA\u73AF");
        return;
      }
      this.toast("\u672A\u627E\u5230\u64AD\u653E\u961F\u5217\uFF0C\u65E0\u6CD5\u5207\u6362\u64AD\u653E\u6A21\u5F0F");
    }
    toggleRepeat() {
      const q = this.findQueueApi();
      const order = this.currentPlayOrder();
      if (q && order != null) {
        const next = order === 1 ? 0 : 1;
        if (Array.isArray(q.supportPlayOrder) && q.supportPlayOrder.indexOf(next) < 0) {
          this.toast("\u5F53\u524D\u961F\u5217\u4E0D\u652F\u6301\u5355\u66F2\u5FAA\u73AF");
          return;
        }
        q.setPlayOrder(next);
        setTimeout(() => this.refreshPlayOrder(), 120);
        this.toast(next === 1 ? "\u5DF2\u5207\u6362\u4E3A\u5355\u66F2\u5FAA\u73AF" : "\u5DF2\u5207\u6362\u4E3A\u5217\u8868\u5FAA\u73AF");
        return;
      }
      this.toast("\u672A\u627E\u5230\u64AD\u653E\u961F\u5217\uFF0C\u65E0\u6CD5\u5207\u6362\u64AD\u653E\u6A21\u5F0F");
    }
    about() {
      this.toast("AMLL \u6B4C\u8BCD\u63D2\u4EF6 v2.0 \xB7 \u57FA\u4E8E\u5F00\u6E90\u9879\u76EE Apple Music-like Lyrics");
    }
    toast(text) {
      let t = document.getElementById("soda-amll-toast");
      if (!t) {
        t = document.createElement("div");
        t.id = "soda-amll-toast";
        t.style.cssText = `position:fixed;left:50%;bottom:132px;transform:translateX(-50%);z-index:2147483647;padding:10px 18px;border-radius:10px;background:rgba(28,28,32,.94);color:#fff;font-size:13px;font-family:${SA_FONT_PINGFANG};box-shadow:0 10px 30px rgba(0,0,0,.5);transition:opacity .25s;backdrop-filter:blur(16px);pointer-events:none`;
        document.body.appendChild(t);
      }
      t.textContent = text;
      t.style.opacity = "1";
      clearTimeout(this.__toastTimer);
      this.__toastTimer = setTimeout(() => {
        t.style.opacity = "0";
      }, 2200);
    }
    /* ---- settings window ---- */
    settingsNav() {
      return [
        { id: "lyric", name: "\u6B4C\u8BCD" },
        { id: "song", name: "\u6B4C\u66F2\u4FE1\u606F" },
        { id: "bg", name: "\u80CC\u666F" },
        { id: "source", name: "\u6B4C\u8BCD\u6E90" },
        { id: "player", name: "\u6B4C\u8BCD\u64AD\u653E\u5668" },
        { id: "misc", name: "\u6742\u9879" },
        { id: "debug", name: "\u8C03\u8BD5" }
      ];
    }
    settingsSchema() {
      return [
        /* 歌词 */
        { page: "lyric", group: "type", type: "select", key: "lyricFont", label: "\u6B4C\u8BCD\u5B57\u4F53", hint: "\u4F18\u5148\u4F7F\u7528\u672C\u673A\u82F9\u65B9\u5B57\u4F53", options: [["pingfang", "\u82F9\u65B9"], ["system", "\u8DDF\u968F\u7CFB\u7EDF"]] },
        { page: "lyric", group: "type", type: "range", key: "lyricFontScale", label: "\u5B57\u53F7\u5927\u5C0F", hint: "\u9010\u5B57\u6B4C\u8BCD\u7684\u57FA\u51C6\u5B57\u53F7\u500D\u6570", min: 0.6, max: 2, step: 0.05, fmt: (v) => `${v.toFixed(2)}x` },
        {
          page: "lyric",
          group: "type",
          type: "select",
          key: "lyricWeight",
          label: "\u5B57\u53F7\u7C97\u7EC6",
          hint: "\u6B4C\u8BCD\u6587\u5B57\u7684\u7B14\u753B\u7C97\u7EC6",
          numeric: true,
          options: [[300, "\u7EC6"], [400, "\u5E38\u89C4"], [500, "\u4E2D\u9ED1"], [600, "\u534A\u7C97"], [700, "\u7C97"]]
        },
        { page: "lyric", group: "display", type: "switch", key: "lyricClickSeek", label: "\u70B9\u51FB\u6B4C\u8BCD\u8DF3\u8F6C", hint: "\u70B9\u51FB\u6B4C\u8BCD\u884C\u8DF3\u5230\u5BF9\u5E94\u64AD\u653E\u4F4D\u7F6E" },
        { page: "lyric", group: "display", type: "switch", key: "showTranslation", label: "\u663E\u793A\u7FFB\u8BD1\u6B4C\u8BCD", hint: "\u4F18\u5148\u4F7F\u7528\u6B4C\u66F2\u81EA\u5E26\u7684\u7FFB\u8BD1" },
        { page: "lyric", group: "display", type: "switch", key: "showRoman", label: "\u663E\u793A\u97F3\u8BD1\u6B4C\u8BCD", hint: "\u6B4C\u66F2\u65E0\u97F3\u8BD1\u6570\u636E\u65F6\u4E0D\u663E\u793A" },
        /* 歌曲信息 */
        { page: "song", group: "main", type: "switch", key: "showAlbum", label: "\u663E\u793A\u4E13\u8F91\u540D", hint: "\u5728\u6B4C\u624B\u4E0B\u65B9\u663E\u793A\u6240\u5C5E\u4E13\u8F91" },
        { page: "song", group: "main", type: "switch", key: "coverHideCursor", label: "\u5C01\u9762\u60AC\u505C\u9690\u85CF\u9F20\u6807", hint: "\u9F20\u6807\u79FB\u5230\u4E13\u8F91\u5C01\u9762\u4E0A\u65F6\u9690\u85CF\u6307\u9488" },
        /* 背景 */
        { page: "bg", group: "type", type: "switch", key: "bgEnabled", label: "\u663E\u793A\u6B4C\u8BCD\u80CC\u666F", hint: "\u4F7F\u7528\u5F53\u524D\u4E13\u8F91\u5C01\u9762\u4F5C\u4E3A\u80CC\u666F" },
        { page: "bg", group: "type", type: "select", key: "bgType", label: "\u80CC\u666F\u7C7B\u578B", hint: "\u6D41\u4F53\u53D6\u8272 / \u6A21\u7CCA\u5C01\u9762 / \u6DF1\u8272\u6E10\u53D8", options: [["flow", "\u6D41\u4F53\u80CC\u666F"], ["blur", "\u6A21\u7CCA\u5C01\u9762"], ["solid", "\u6DF1\u8272\u6E10\u53D8"]] },
        { page: "bg", group: "flow", type: "range", key: "bgFlowSpeed", label: "\u6D41\u4F53\u901F\u5EA6", hint: "\u989C\u8272\u6D41\u52A8\u7684\u5FEB\u6162\uFF0C\u9ED8\u8BA4 1.00", min: 0.1, max: 4, step: 0.05, fmt: (v) => v.toFixed(2) },
        { page: "bg", group: "flow", type: "range", key: "bgRenderScale", label: "\u6E32\u67D3\u7CBE\u5EA6", hint: "\u6D41\u4F53\u80CC\u666F\u7684\u6E32\u67D3\u6BD4\u4F8B\uFF0C\u8D8A\u4F4E\u8D8A\u7701\u6027\u80FD", min: 0.2, max: 1, step: 0.05, fmt: (v) => `${Math.round(v * 100)}%` },
        { page: "bg", group: "flow", type: "range", key: "bgFps", label: "\u6E32\u67D3\u5E27\u7387", hint: "\u6D41\u4F53\u80CC\u666F\u52A8\u753B\u5E27\u7387\uFF0C0 \u4E3A\u9759\u6B62", min: 0, max: 60, step: 1, fmt: (v) => v ? `${Math.round(v)} FPS` : "\u9759\u6B62" },
        { page: "bg", group: "flow", type: "switch", key: "bgPerf", label: "\u6027\u80FD\u6A21\u5F0F", hint: "\u964D\u4F4E\u80CC\u666F\u5206\u8FA8\u7387\u4E0E\u5E27\u7387\uFF0C\u5E76\u5173\u95ED\u6B4C\u8BCD\u6A21\u7CCA\u3001\u7F29\u653E\u4E0E\u5F39\u7C27\u52A8\u753B\uFF0C\u8001\u673A\u578B\u66F4\u6D41\u7545" },
        { page: "bg", group: "tune", type: "range", key: "bgBlur", label: "\u80CC\u666F\u6A21\u7CCA", hint: "\u6A21\u7CCA\u5C01\u9762\u6A21\u5F0F\u4E0B\u7684\u67D4\u548C\u7A0B\u5EA6", min: 0, max: 200, step: 2, fmt: (v) => `${Math.round(v)}px` },
        { page: "bg", group: "tune", type: "range", key: "bgBrightness", label: "\u80CC\u666F\u4EAE\u5EA6", hint: "\u9ED8\u8BA4 0.55", min: 0.15, max: 1.2, step: 0.01, fmt: (v) => v.toFixed(2) },
        { page: "bg", group: "tune", type: "range", key: "bgSaturate", label: "\u80CC\u666F\u9971\u548C\u5EA6", hint: "\u9ED8\u8BA4 1.90", min: 0.5, max: 3, step: 0.05, fmt: (v) => v.toFixed(2) },
        /* 歌词源 */
        { page: "source", group: "main", type: "info", label: "\u6B4C\u8BCD\u6765\u6E90", hint: "\u7531\u5BA2\u6237\u7AEF\u5F53\u524D\u6B4C\u66F2\u8FD4\u56DE\uFF0C\u652F\u6301 KRC \u9010\u5B57\u6B4C\u8BCD\u4E0E LRC" },
        { page: "source", group: "main", type: "debug", key: "src" },
        /* 歌词播放器 */
        { page: "player", group: "anim", type: "switch", key: "lyricTransition", label: "\u6B4C\u8BCD\u754C\u9762\u8FC7\u6E21\u52A8\u753B", hint: "\u8FDB\u5165 / \u9000\u51FA\u65F6\u7684\u4E0B\u62C9\u4E0E\u6DE1\u5165\u7F13\u52A8" },
        { page: "player", group: "anim", type: "switch", key: "btnAnim", label: "\u5207\u6B4C\u6309\u94AE\u52A8\u753B", hint: "\u4E0A\u4E00\u9996 / \u4E0B\u4E00\u9996\u6309\u94AE\u7684\u6309\u538B\u52A8\u753B" },
        { page: "player", group: "anim", type: "switch", key: "mediaAnim", label: "\u5C01\u9762\u4E0E\u80CC\u666F\u8FC7\u6E21", hint: "\u5207\u6B4C\u65F6\u5C01\u9762\u4E0E\u80CC\u666F\u4EA4\u53C9\u6DE1\u5165" },
        { page: "player", group: "render", type: "range", key: "wordBright", label: "\u6587\u5B57\u9AD8\u5149\u4EAE\u5EA6", hint: "\u5F53\u524D\u884C\u5DF2\u5531\u90E8\u5206\u7684\u9AD8\u5149\u5F3A\u5EA6", min: 0.3, max: 1.4, step: 0.02, fmt: (v) => v.toFixed(2) },
        { page: "player", group: "diag", type: "switch", key: "showFps", label: "\u663E\u793A\u5E27\u7387", hint: "\u5728\u6B4C\u8BCD\u9875\u53F3\u4E0A\u89D2\u663E\u793A\u5B9E\u65F6\u5E27\u7387" },
        { page: "player", group: "render", type: "switch", key: "lyricBlur", label: "\u6B4C\u8BCD\u6A21\u7CCA\u6548\u679C", hint: "\u975E\u5F53\u524D\u884C\u6A21\u7CCA\u5904\u7406\uFF08AMLL\uFF09" },
        { page: "player", group: "render", type: "switch", key: "lyricScale", label: "\u6B4C\u8BCD\u7F29\u653E\u6548\u679C", hint: "\u975E\u5F53\u524D\u884C\u8F7B\u5FAE\u7F29\u5C0F\uFF08AMLL\uFF09" },
        { page: "player", group: "render", type: "range", key: "wordFade", label: "\u9010\u5B57\u6E10\u53D8\u5BBD\u5EA6", hint: "\u9ED8\u8BA4\u4E3A 0.7\uFF0C\u6A21\u62DF Apple Music \u9010\u5B57\u6548\u679C", min: 1e-4, max: 1.5, step: 0.05, fmt: (v) => v.toFixed(2) },
        { page: "player", group: "render", type: "switch", key: "hidePassed", label: "\u9690\u85CF\u5DF2\u64AD\u653E\u6B4C\u8BCD", hint: "\u5DF2\u64AD\u653E\u7684\u6B4C\u8BCD\u884C\u6DE1\u51FA\u9690\u85CF" },
        /* 杂项 */
        { page: "misc", group: "bar", type: "select", key: "barStyle", label: "\u5E95\u8FB9\u680F\u6837\u5F0F", hint: "\u64AD\u653E\u680F\u534A\u900F\u660E\u6548\u679C", options: [["off", "\u5173\u95ED"], ["blur", "\u6A21\u7CCA"]] },
        { page: "misc", group: "bar", type: "range", key: "barOpacity", label: "\u5E95\u8FB9\u680F\u4E0D\u900F\u660E\u5EA6", hint: "\u6570\u503C\u8D8A\u4F4E\u8D8A\u901A\u900F", min: 0.05, max: 0.9, step: 0.01, fmt: (v) => `${Math.round(v * 100)}%` },
        { page: "misc", group: "cover", type: "range", key: "barBlur", label: "\u5E95\u8FB9\u680F\u6A21\u7CCA\u5F3A\u5EA6", hint: "backdrop-filter \u6A21\u7CCA\u534A\u5F84", min: 0, max: 60, step: 1, fmt: (v) => `${Math.round(v)}px` },
        { page: "misc", group: "cover", type: "range", key: "barCover", label: "\u5C01\u9762\u6620\u5C04\u5F3A\u5EA6", hint: "\u5E95\u8FB9\u680F\u900F\u51FA\u4E13\u8F91\u5C01\u9762", min: 0, max: 0.9, step: 0.01, fmt: (v) => `${Math.round(v * 100)}%` },
        /* 调试 */
        { page: "debug", group: "main", type: "debug", key: "state" }
      ];
    }
    openSettings() {
      this.closeWindow();
      const wrap = document.createElement("div");
      wrap.id = "soda-amll-win";
      wrap.innerHTML = `
      <div class="sa-window">
        <div class="sa-titlebar">
          <div class="sa-lights">
            <span class="sa-light sa-close" data-act="close" title="\u5173\u95ED"></span>
            <span class="sa-light sa-min" data-act="min" title="\u6700\u5C0F\u5316"></span>
            <span class="sa-light sa-zoom" data-act="zoom" title="\u7F29\u653E"></span>
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
      const side = wrap.querySelector(".sa-side");
      for (const item of this.settingsNav()) {
        const el = document.createElement("div");
        el.className = "sa-side-item" + (item.id === this.settingsPage ? " sa-on" : "");
        el.textContent = item.name;
        el.dataset.page = item.id;
        el.addEventListener("click", () => {
          this.settingsPage = item.id;
          for (const other of side.querySelectorAll(".sa-side-item")) other.classList.toggle("sa-on", other === el);
          this.renderSettingsPane();
        });
        side.appendChild(el);
      }
      const foot = document.createElement("div");
      foot.className = "sa-side-foot";
      foot.textContent = "\u5173\u4E8E Apple Music-like lyrics";
      foot.addEventListener("click", () => {
        this.settingsPage = "about";
        for (const other of side.querySelectorAll(".sa-side-item")) other.classList.remove("sa-on");
        this.renderSettingsPane();
      });
      side.appendChild(foot);
      wrap.addEventListener("click", (e) => {
        if (e.target === wrap) {
          this.closeWindow();
          return;
        }
        const act = e.target.dataset && e.target.dataset.act;
        if (act === "close") this.closeWindow();
        else if (act === "min" || act === "zoom") this.closeWindow();
      });
      this.renderSettingsPane();
      requestAnimationFrame(() => wrap.classList.add("sa-show"));
    }
    closeWindow() {
      if (this.winEl) {
        this.winEl.remove();
        this.winEl = null;
      }
    }
    renderSettingsPane() {
      if (!this.winEl) return;
      const pane = this.winEl.querySelector(".sa-pane");
      pane.innerHTML = "";
      if (this.settingsPage === "about") {
        pane.innerHTML = `
        <div class="sa-about">
          <h3>Apple Music-like Lyrics \u63D2\u4EF6</h3>
          <p>\u7248\u672C v2.0 \xB7 \u6C7D\u6C34\u97F3\u4E50\u6B4C\u8BCD\u7F8E\u5316\u63D2\u4EF6</p>
          <p>\u6B4C\u8BCD\u6E32\u67D3\u57FA\u4E8E\u5F00\u6E90\u9879\u76EE Apple Music-like Lyrics\uFF08AMLL\uFF09\uFF0C\u63D0\u4F9B\u9010\u5B57\u9AD8\u4EAE\u3001\u6A21\u7CCA\u4E0E\u7F29\u653E\u7B49 Apple Music \u98CE\u683C\u7684\u6B4C\u8BCD\u52A8\u753B\u3002</p>
          <p>\u754C\u9762\u53C2\u8003\u7F51\u6613\u4E91\u97F3\u4E50\u300C\u7C7B\u82F9\u679C\u6B4C\u8BCD\u300D\u63D2\u4EF6\u7684\u4EA4\u4E92\u4E0E\u5E03\u5C40\uFF0C\u5FEB\u6377\u952E <b>Ctrl + Alt + L</b> \u5F00\u5173\u6B4C\u8BCD\u9875\uFF0C<b>Esc</b> \u9000\u51FA\u3002</p>
        </div>`;
        return;
      }
      let box = null;
      let group = null;
      for (const def of this.settingsSchema()) {
        if (def.page !== this.settingsPage) continue;
        const g = def.group || "main";
        if (!box || g !== group) {
          group = g;
          box = document.createElement("div");
          box.className = "sa-box";
          pane.appendChild(box);
        }
        this.renderWinRow(box, def);
      }
    }
    renderWinRow(host, def) {
      if (def.type === "debug") {
        const kv = document.createElement("div");
        kv.className = "sa-kv";
        const rows = this.debugRows(def.key);
        kv.innerHTML = rows.map(([k, v]) => `<b>${k}</b><span>${String(v)}</span>`).join("");
        host.appendChild(kv);
        return;
      }
      if (def.type === "info") {
        const note = document.createElement("div");
        note.className = "sa-note";
        note.textContent = def.hint || "";
        host.appendChild(note);
        return;
      }
      const row = document.createElement("div");
      row.className = "sa-row";
      const label = document.createElement("div");
      label.className = "sa-row-label";
      const b = document.createElement("b");
      b.textContent = def.label;
      label.appendChild(b);
      if (def.hint) {
        const span = document.createElement("span");
        span.textContent = def.hint;
        label.appendChild(span);
      }
      const ctl = document.createElement("div");
      ctl.className = "sa-row-ctl";
      row.appendChild(label);
      row.appendChild(ctl);
      host.appendChild(row);
      const commit = () => {
        this.commitSettings();
        this.refreshAppSettings();
        if (def.type === "debug" || def.key === "src" || def.key === "state") this.renderSettingsPane();
      };
      if (def.type === "switch") {
        const sw = document.createElement("div");
        sw.className = "sa-sw" + (this.settings[def.key] ? " sa-on" : "");
        sw.innerHTML = "<i></i>";
        sw.addEventListener("click", () => {
          this.settings[def.key] = !this.settings[def.key];
          sw.classList.toggle("sa-on", !!this.settings[def.key]);
          commit();
        });
        ctl.appendChild(sw);
      } else if (def.type === "select") {
        const sel = document.createElement("div");
        sel.className = "sa-sel";
        const cur = def.options.find((o) => o[0] === this.settings[def.key]) || def.options[0];
        sel.innerHTML = `<span>${cur[1]}</span><span class="sa-sel-step">${ICON.chevron}</span>`;
        sel.addEventListener("click", (e) => {
          e.stopPropagation();
          const r = sel.getBoundingClientRect();
          const m = document.createElement("div");
          m.className = "sa-menu sa-checkbox";
          m.innerHTML = this.menuGroup(def.options.map((o) => this.menuItem(o[1], o[0], { checked: o[0] === this.settings[def.key] })));
          this.mountMenu(m, r.left, r.bottom + 4, (raw) => {
            const val = def.numeric ? Number(raw) : raw;
            this.settings[def.key] = val;
            sel.querySelector("span").textContent = (def.options.find((o) => o[0] === val) || def.options[0])[1];
            commit();
          });
        });
        ctl.appendChild(sel);
      } else if (def.type === "range") {
        const input = document.createElement("input");
        input.type = "range";
        input.className = "sa-slider";
        input.min = String(def.min);
        input.max = String(def.max);
        input.step = String(def.step);
        input.value = String(this.settings[def.key]);
        const val = document.createElement("span");
        val.className = "sa-val";
        val.textContent = def.fmt(this.settings[def.key]);
        input.addEventListener("input", () => {
          this.settings[def.key] = Number(input.value);
          val.textContent = def.fmt(this.settings[def.key]);
          this.applySettings();
        });
        input.addEventListener("change", commit);
        ctl.appendChild(input);
        ctl.appendChild(val);
      }
    }
    debugRows(kind) {
      const md = this.state && this.state.mediaDetail || {};
      const pl = md.playable || {};
      const ly = md.lyrics || {};
      if (kind === "src") {
        return [
          ["\u6B4C\u8BCD\u7C7B\u578B", ly.type || "\u672A\u77E5"],
          ["\u9010\u5B57\u6B4C\u8BCD", ly.content && /^\[\d+,/.test(ly.content) ? "KRC" : "LRC"],
          ["\u7FFB\u8BD1\u8BED\u8A00", Object.keys(ly.translations || {}).join(", ") || "\u65E0"],
          ["\u8D21\u732E\u8005", ly.lyric_contributor && ly.lyric_contributor.nickname || "\u672A\u77E5"]
        ];
      }
      return [
        ["\u6B4C\u66F2", pl.name || "\u672A\u64AD\u653E"],
        ["\u6B4C\u624B", (pl.artists || []).map((a) => a.name).join(" / ") || "-"],
        ["\u4E13\u8F91", pl.album && pl.album.name || "-"],
        ["\u64AD\u653E\u72B6\u6001", this.playing ? "\u64AD\u653E\u4E2D" : "\u5DF2\u6682\u505C"],
        ["\u8FDB\u5EA6", `${fmtTime(this.baseMs / 1e3)} / ${fmtTime(this.durationMs / 1e3)}`],
        ["\u97F3\u91CF", this.volume == null ? "-" : `${Math.round(this.volume * 100)}%`],
        ["\u64AD\u653E\u6A21\u5F0F", this.playOrder == null ? "\u672A\u83B7\u53D6" : String(this.playOrder)],
        ["\u6B4C\u8BCD\u884C\u6570", this.player ? String((this.player.dataManager.getProcessedLines() || []).length) : "0"]
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
    /* applySettings runs on every slider `input` event, so a var is only pushed
       when its value really moved. Rewriting an unchanged one is not free: the
       lyric weight/size vars re-lay-out the whole lyric view, and the background
       vars re-composite a full-screen blur, so dragging an unrelated slider used
       to stutter. */
    setVar(prop, value) {
      const vars = this.__cssVars || (this.__cssVars = {});
      if (vars[prop] === value) return;
      vars[prop] = value;
      document.documentElement.style.setProperty(prop, value);
    }
    applyFontScale() {
      if (!this.player) return;
      const el = this.player.getElement();
      if (!el) return;
      const scale = this.settings.lyricFontScale;
      const value = `calc(max(max(5vh, 2.5vw), 12px) * ${scale})`;
      if (this.__fontScale === value) return;
      this.__fontScale = value;
      el.style.setProperty("--amll-lp-font-size", value);
    }
    applyBarCover() {
      this.setVar("--sa-bar-cover", cssUrl(this.cover));
    }
    applySettings() {
      const s = this.settings;
      const html = document.documentElement;
      injectStyle("soda-amll-fontcss", FONT_CSS);
      injectStyle("soda-amll-barcss", BAR_CSS);
      injectStyle("soda-amll-appcss", APP_CSS);
      if (s.barStyle === "off") html.removeAttribute("data-sa-bar");
      else html.setAttribute("data-sa-bar", s.barStyle);
      html.setAttribute("data-sa-font", s.lyricFont);
      this.setVar("--sa-bar-a", String(s.barOpacity));
      this.setVar("--sa-bar-blur", `${Math.round(s.barBlur)}px`);
      this.setVar("--sa-bar-cover-a", String(s.barCover));
      this.setVar("--sa-lyric-weight", String(s.lyricWeight));
      this.setVar("--sa-word-bright", String(s.wordBright));
      this.setVar("--sa-bg-blur", `${Math.round(s.bgBlur)}px`);
      this.setVar("--sa-bg-sat", s.bgSaturate.toFixed(2));
      this.setVar("--sa-bg-bright", s.bgBrightness.toFixed(2));
      if (this.root && this.el) {
        this.root.classList.toggle("sa-noanim", !s.lyricTransition);
        this.root.classList.toggle("sa-fps-on", !!s.showFps);
        const cover = this.el.coverWrap;
        if (cover) cover.classList.toggle("sa-nocursor", !!s.coverHideCursor);
        const show = s.bgEnabled ? "" : "none";
        for (const node of [this.el.bg, this.el.flow, this.el.tint, this.el.vignette]) {
          if (node) node.style.display = show;
        }
      }
      if (this.player) {
        const perf = !!s.bgPerf;
        const want = {
          blur: perf ? false : !!s.lyricBlur,
          scale: perf ? false : !!s.lyricScale,
          wordFade: s.wordFade,
          hidePassed: !!s.hidePassed,
          /* spring physics walks every line on every frame; the CSS-transition
             fallback is markedly cheaper and is exactly what this preset is for */
          springs: !perf
        };
        const cur = this.__playerOpts || (this.__playerOpts = {});
        if (cur.blur !== want.blur) {
          cur.blur = want.blur;
          this.player.setEnableBlur(want.blur);
        }
        if (cur.scale !== want.scale) {
          cur.scale = want.scale;
          this.player.setEnableScale(want.scale);
        }
        if (cur.wordFade !== want.wordFade) {
          cur.wordFade = want.wordFade;
          this.player.setWordFadeWidth(want.wordFade);
        }
        if (cur.hidePassed !== want.hidePassed) {
          cur.hidePassed = want.hidePassed;
          this.player.setHidePassedLines(want.hidePassed);
        }
        if (cur.springs !== want.springs) {
          cur.springs = want.springs;
          this.player.setEnableSpring(want.springs);
        }
      }
      this.applyFontScale();
      this.applyBarCover();
      this.paintTheme();
      this.paintMeta();
    }
    /* ---- "插件" section inside the host settings page ---- */
    mountAppSettings() {
      const st = document.querySelector(".setting");
      if (!st) return;
      const menu = st.querySelector(".menu");
      const nav = st.querySelector(".nav");
      if (!menu) return;
      const existing = document.getElementById("sa-plugin-host");
      if (existing) {
        const want = this.settingsNav().reduce(
          (n, p2) => n + this.settingsSchema().filter((d) => d.page === p2.id && d.type !== "debug" && d.type !== "info").length,
          0
        );
        if (existing.querySelectorAll(".setting-menu-item").length !== want) this.buildAppForm(existing);
        return;
      }
      const sampleItem = menu.querySelector(".menu-item");
      const sampleCard = menu.querySelector(".menu-item .card");
      const sampleSMI = menu.querySelector(".setting-menu-item");
      const sampleSwitch = menu.querySelector(".switch");
      this.__samples = {
        item: sampleItem,
        card: sampleCard,
        smi: sampleSMI,
        smiLeft: sampleSMI && sampleSMI.querySelector(".left"),
        smiTitle: sampleSMI && sampleSMI.querySelector(".left .title"),
        smiRight: sampleSMI && sampleSMI.querySelector(".right"),
        switch: sampleSwitch,
        switchNode: sampleSwitch && sampleSwitch.querySelector(".node"),
        nav: nav && nav.querySelector(".nav-item")
      };
      const sec = document.createElement("div");
      sec.id = "sa-plugin-section";
      sec.className = "menu-item";
      scopedAttrs(sampleItem, sec);
      const title = document.createElement("span");
      title.className = "title";
      scopedAttrs(sampleItem, title);
      title.textContent = "\u63D2\u4EF6";
      const card = document.createElement("div");
      card.className = "card";
      scopedAttrs(sampleCard, card);
      const host = document.createElement("div");
      host.id = "sa-plugin-host";
      card.appendChild(host);
      sec.appendChild(title);
      sec.appendChild(card);
      menu.appendChild(sec);
      this.buildAppForm(host);
      if (nav && this.__samples.nav && !nav.querySelector("#sa-plugin-nav")) {
        const ni = document.createElement("div");
        ni.id = "sa-plugin-nav";
        ni.className = "nav-item";
        scopedAttrs(this.__samples.nav, ni);
        ni.textContent = "\u63D2\u4EF6";
        ni.addEventListener("click", () => {
          for (const other of nav.querySelectorAll(".nav-item")) other.classList.toggle("active", other === ni);
          menu.scrollTo({ top: sec.offsetTop - 24, behavior: "smooth" });
        });
        nav.appendChild(ni);
      }
    }
    buildAppForm(host) {
      const s = this.settings;
      host.innerHTML = "";
      const commit = () => {
        this.commitSettings();
        if (this.winEl) this.renderSettingsPane();
      };
      const makeRow = (labelText, hintText) => {
        const row = document.createElement("div");
        row.className = "setting-menu-item";
        scopedAttrs(this.__samples && this.__samples.smi, row);
        const left = document.createElement("div");
        left.className = "left";
        scopedAttrs(this.__samples && this.__samples.smiLeft, left);
        const title = document.createElement("span");
        title.className = "title";
        scopedAttrs(this.__samples && this.__samples.smiTitle, title);
        title.textContent = labelText;
        left.appendChild(title);
        if (hintText) {
          const hint = document.createElement("div");
          hint.className = "sa-hint";
          hint.textContent = hintText;
          left.appendChild(hint);
        }
        const right = document.createElement("div");
        right.className = "right";
        scopedAttrs(this.__samples && this.__samples.smiRight, right);
        row.appendChild(left);
        row.appendChild(right);
        host.appendChild(row);
        return right;
      };
      for (const navItem of this.settingsNav()) {
        const defs = this.settingsSchema().filter((d) => d.page === navItem.id && d.type !== "debug" && d.type !== "info");
        if (!defs.length) continue;
        const gt = document.createElement("div");
        gt.className = "sa-group-title";
        gt.textContent = navItem.name;
        host.appendChild(gt);
        for (const def of defs) {
          const ctl = makeRow(def.label, def.hint);
          if (def.type === "switch") {
            let sw;
            if (this.__samples && this.__samples.switch) {
              sw = document.createElement("div");
              sw.className = "switch";
              scopedAttrs(this.__samples.switch, sw);
              sw.setAttribute("role", "switch");
              const node = document.createElement("div");
              node.className = "node";
              scopedAttrs(this.__samples.switchNode, node);
              sw.appendChild(node);
            } else {
              sw = document.createElement("div");
              sw.className = "sa-sw";
              sw.innerHTML = "<i></i>";
            }
            const sync = () => {
              const on = !!s[def.key];
              sw.classList.toggle("switch-on", on);
              sw.setAttribute("aria-checked", String(on));
              const node = sw.querySelector(".node");
              if (node) node.classList.toggle("node-on", on);
            };
            sw.addEventListener("click", () => {
              s[def.key] = !s[def.key];
              sync();
              commit();
            });
            sync();
            ctl.appendChild(sw);
          } else if (def.type === "select") {
            const box = document.createElement("div");
            box.className = "sa-seg";
            for (const [val, text] of def.options) {
              const b2 = document.createElement("button");
              b2.className = "sa-seg-btn" + (s[def.key] === val ? " sa-on" : "");
              b2.textContent = text;
              b2.addEventListener("click", () => {
                s[def.key] = val;
                for (const other of box.querySelectorAll(".sa-seg-btn")) other.classList.toggle("sa-on", other === b2);
                commit();
              });
              box.appendChild(b2);
            }
            ctl.appendChild(box);
          } else {
            const wrap = document.createElement("div");
            wrap.className = "sa-ctl";
            const input = document.createElement("input");
            input.type = "range";
            input.min = String(def.min);
            input.max = String(def.max);
            input.step = String(def.step);
            input.value = String(s[def.key]);
            const val = document.createElement("span");
            val.className = "sa-num";
            val.textContent = def.fmt(s[def.key]);
            input.addEventListener("input", () => {
              s[def.key] = Number(input.value);
              val.textContent = def.fmt(s[def.key]);
              this.applySettings();
            });
            input.addEventListener("change", commit);
            wrap.appendChild(input);
            wrap.appendChild(val);
            ctl.appendChild(wrap);
          }
        }
      }
      const foot = document.createElement("div");
      foot.className = "sa-reset";
      const b = document.createElement("button");
      b.textContent = "\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E";
      b.addEventListener("click", () => {
        this.resetSettings();
        this.toast("\u5DF2\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E");
      });
      foot.appendChild(b);
      host.appendChild(foot);
    }
    refreshAppSettings() {
      const host = document.getElementById("sa-plugin-host");
      if (host) this.buildAppForm(host);
    }
    watchSettingsPage() {
      const check = () => {
        if (location.hash.indexOf("setting") < 0) return;
        this.mountAppSettings();
      };
      window.addEventListener("hashchange", () => {
        setTimeout(check, 350);
        setTimeout(check, 1200);
      });
      this.__settingsTimer = setInterval(check, 1500);
      check();
    }
  };
  if (window[GLOBAL_KEY]) {
    LOG("already installed");
  } else {
    const inst = new SodaAmll();
    window[GLOBAL_KEY] = inst;
    inst.hookTransport();
    LOG("boot @", Math.round(performance.now()));
    const boot = () => {
      inst.applySettings();
      inst.watchSettingsPage();
      window.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape" && (inst.open || inst.winEl)) {
            if (inst.winEl) inst.closeWindow();
            else if (inst.menuEl) inst.closeMenu();
            else inst.hide();
          } else if (e.ctrlKey && e.altKey && (e.key === "l" || e.key === "L")) {
            e.preventDefault();
            inst.toggle();
          }
        },
        true
      );
      LOG("ready");
    };
    if (document.body) boot();
    else document.addEventListener("DOMContentLoaded", boot);
  }
})();
