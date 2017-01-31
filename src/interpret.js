require("./util/polyfill");

const LanguageLoader = require("./language-loader");
const InterpretElement = require("./interpret-element");

const Config = require("./config");

function createForElement (element) {
  console.log("Interpret JS");
  return new InterpretElement(element);
}

function reloadLanguageFiles (callback) {
  return LanguageLoader.reload(callback);
}

module.exports = {
  get config () { return Config; },
  get langs () { return LanguageLoader.langs; },

  createForElement: createForElement,
  reloadLanguageFiles: reloadLanguageFiles
};
