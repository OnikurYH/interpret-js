const Promise = require("promise");
const deepmerge = require("deepmerge");

const HTTPUtil = require("./util/http");

const Config = require("./config");

module.exports = new (class LanguageLoader {
  constructor () {
    this._langs = null;
  }

  get hasLoaded () {
    return this._langs != null;
  }

  get langs () {
    return this._langs;
  }

  setLangsFromObject (obj, callback) {
    this._langs = obj;
    return this._mergeLangObjs().nodeify(callback);
  }

  isLangCodeAvailable (targetLangCode) {
    return this._langs.hasOwnProperty(targetLangCode);
  }

  reloadFromFile (callback) {
    this._langs = {};

    let loadChain = Promise.resolve();
    for (let langCode of Config.langs) {
      loadChain = loadChain.then(() => this._loadByCode(langCode));
    }
    return loadChain
    .then(() => this._mergeLangObjs()).nodeify(callback);
  }

  _mergeLangObjs () {
    if (!this._langs.hasOwnProperty(Config.defaultLanguage))
      return Promise.resolve();

    let defaultLangObj = this._langs[Config.defaultLanguage];
    for (let langCode in this._langs) {
      if (langCode === Config.defaultLanguage)
        continue;

      this._langs[langCode] = deepmerge(defaultLangObj, this._langs[langCode], { clone: true });
    }

    return Promise.resolve();
  }

  _loadByCode (langCode) {
    return HTTPUtil.ajax({
      url: `${Config.languageFilesRoot}/${langCode}.json`,
      method: "GET"
    })
    .then((langStr) => {
      this._langs[langCode] = JSON.parse(langStr);
      return Promise.resolve();
    })
    .catch((err) => {
      console.warn(`"${langCode}" cannot be load, maybe missing the file or invalid`, err);
      return Promise.resolve();
    });
  }
})();