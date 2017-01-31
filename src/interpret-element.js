const Promise = require("promise");

const LanguageLoader = require("./language-loader");

const Config = require("./config");

module.exports = (class InterpretElement {
  constructor (rootElement) {
    this.rootElement = rootElement;
    this._currentLangCode = null;
  }

  get currentLangCode () {
    return this._currentLangCode;
  }

  load (opts = {}, callback) {
    let {
      langCode = Config.defaultLanguage,
      reload = false
    } = opts;

    let chain;
    if (!LanguageLoader.hasLoaded || reload)
      chain = LanguageLoader.reload();
    else
      chain = Promise.resolve();
    return chain.then(() => {
      if (!LanguageLoader.isLangCodeAvailable(langCode))
        return Promise.reject(new Error(`Language code ${langCode} is not available!`));
      
      let rootLangObj = LanguageLoader.langs[langCode];
      let targetElements = this.rootElement.querySelectorAll("[interpret], [data-interpret]");

      for (let element of targetElements) {
        let key;
        if (element.hasAttribute("interpret"))
          key = element.getAttribute("interpret");
        else
          key = element.getAttribute("data-interpret");

        try {
          let lang = key.split(".").reduce((obj,i) => obj[i], rootLangObj);
          if (lang == null)
            lang = key;
          element.innerHTML = lang;
        } catch (err) {
          console.warn(`"${lang}" key not found on "${langCode}"`);
        }
      }

      this._currentLangCode = langCode;

      return Promise.resolve();
    }).nodeify(callback);
  }
});
