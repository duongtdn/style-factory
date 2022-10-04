"use strict"

export default class StyleFactory {

  _styleRules = [];
  _cleanRules = [];

  /***
   * @param pattern: can be string or regular expression
   *           ex: 'error' it will match 'error', 'xxXerrorXxx'
   *               /\serror\s/ it will macth ' error ' only
   * @param style: object define inline style for the words that match with pattern
   * @return: this. This function can be chained
   */
  useStyle(pattern, style) {
    this._styleRules.push({
      pattern: pattern.source? pattern.source : pattern,
      style
    });
    return this;
  }

  /***
   *  @param pattern: can be string or regular expression
   * @return: this. This function can be chained
   */
  useCleaner(pattern) {
    this._cleanRules.push({ pattern: pattern.source? pattern.source : pattern });
    return this;
  }

  /***
   * @param text: clear text string to be parsed
   * @return: array of objects containing texts and their styles if any
   *          ex: [
   *                {
   *                  text: 'Test'
   *                },
   *                {
   *                  text: ' error ',
   *                  style: { color: 'red' }
   *                },
   *                {
   *                  text: 'pattern.'
   *                }
   *              ]
   */
  create(text) {
    const styles = this.createStyle(text);
    return this.clean(styles);
  }

  createStyle(text) {
    if (this._styleRules.length === 0) {
      return [{text}];
    }
    const pattern = this.buildStylePatternString();
    const re = new RegExp(pattern);
    const clearTexts = text.split(re).filter(txt => txt && txt.length > 0).reduce(mergeSpaceElements, []);
    return clearTexts.map(text => {
      const rule = { text };
      for (const {pattern, style} of this._styleRules) {
        const re = new RegExp(pattern, 'g');
        if (text.match(re)) {
          rule.style = rule.style? {...rule.style, ...style} : style;
        }
      }
      return rule;
    });
  }

  clean(styles) {
    if (this._cleanRules.length === 0) {
      return styles;
    }
    const pattern = this.buildCleanPatternString();
    const re = new RegExp(pattern, 'g');
    return styles.map(({text, style}) => ({
      text: text.replace(re,''),
      style,
    }));
  }

  buildStylePatternString() {
    let str = '(';
    this._styleRules.forEach(rule => str += rule.pattern + '|');
    return str.replace(/\|$/,')');
  }

  buildCleanPatternString() {
    let str = '(';
    this._cleanRules.forEach(rule => str += rule.pattern + '|');
    return str.replace(/\|$/,')');
  }

}

function mergeSpaceElements(last, current, currentIndex, arr) {
  if (/^\s+$/.test(current)) {
    return last;
  }
  const element = (currentIndex > 0 && /^\s+$/.test(arr[currentIndex - 1]))? arr[currentIndex - 1] + current : current;
  last.push(element);
  return last;
}
