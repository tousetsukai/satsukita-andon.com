export default class OrdInt {
  /**
   * @param {number} n
   * @return {OrdInt}
   */
  constructor(n) {
    this._num = n;
  }

  static regexp = /^(\d+)(th|st|nd|rd)$/;

  /**
   * @param {string} str
   * @return {OrdInt}
   */
  static parse(str) {
    const match = OrdInt.regexp.exec(str);
    const ordint = new OrdInt(+match[1]);
    if (ordint.toString() === str) {
      return ordint;
    } else {
      throw new Error(`ParseError: OrdInt.parse(${str})`);
    }
  }

  /**
   * @return {string}
   */
  toString() {
    switch (this._num % 10) {
    case 1:
      return this._num + 'st';
    case 2:
      return this._num + 'nd';
    case 3:
      return this._num + 'rd';
    default:
      return this._num + 'th';
    }
  }

  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }

  /**
   * @return {number}
   */
  get raw() {
    return this._num;
  }
}
