export default class OrdInt {
  /**
   * @param {number} n
   * @return {OrdInt}
   */
  constructor(n) {
    this._num = n;
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
   * @return {number}
   */
  raw() {
    return this._num;
  }
}
