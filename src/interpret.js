/*!
 * InterpretJS
 * Interpret / translate text on Javascript
 * @author OnikurYH
 * @license MIT
 */

require("./util/polyfill");

const LanguageLoader = require("./language-loader");
const InterpretElement = require("./interpret-element");

const Config = require("./config");

function createForElement (element) {
  return new InterpretElement(element);
}

function reloadLanguageFiles (callback) {
  return LanguageLoader.reloadFromFile(callback);
}

function setLangsFromObject (obj, callback) {
  return LanguageLoader.setLangsFromObject(obj, callback);
}

module.exports = {
  get config () { return Config; },
  get langs () { return LanguageLoader.langs; },

  createForElement: createForElement,
  reloadLanguageFiles: reloadLanguageFiles,
  setLangsFromObject: setLangsFromObject
};
