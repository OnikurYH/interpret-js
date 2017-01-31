# InterpretJS
Interpret / Translate text on JavaScript
- - -

InterpretJS is easy to use and very fast to translate your webpage on web browser, it also implements by native JavaScript

Note: Current this library only support web browser, npm only for CommenJS

## Features
* Interpret / Translate full page or a element
* Use JSON to store the language file
* Auto merge missing fields from default langauage file
* Support Promise and callback style! (Use "promisejs" for basic and compatible with BlueBirdJS, Q and other promise library)

## Example & Demo
You can find example demo on the "docs" and "docs/examples" folder

If you want live demo, you can command `npm run test` on the project folder, then it will pop up a browser view for the demo

## Installation
Method    | Description
-----------|------------
Script tag | `<script type="text/javascript" src="./path/to/interpret.min.js"></script>`
NPM        | npm i -S interpret-js
JSPM       | jspm npm:interpret-js
Bower      | bower install --save interpret-js

## Usage

### CommonJS
```javascript
const InterpretJS = require("interpret-js");
```

### Global varable
```javascript
<script type="text/javascript" src="./path/to/interpret.min.js"></script>
<script type="text/javascript">
// Here you can use the InterpretJS library varable
</script>
```

### Interpret "body" with langauage code zh-HK (Traditional Chinese)
#### Script (index.js)
```javascript
// Any config should be on the top
// Push zh-HK to config
InterpretJS.config.langs.push("zh-HK");
// Create a interpret element for interpret later
var interpretElement = InterpretJS.createForElement(document.body);
// Interpret body with language code "zh-HK"
// Default InterpretJS will load the json file from currentFolder/langs/<langCode>.json
interpretElement.load({ langCode: "zh-HK" }, function (err) {
  if (err)
    return console.error(err);
  console.log("Finished!");
});
```

#### Language file
##### langs/en.json (Default language file for merge missing fields)
```json
{
  "hello": "hello",
  "thisFieldOnlyInEnglish": "This field only in English"
}
```
##### langs/zh-HK.json
```json
{
  "hello": "你好"
}
```

#### HTML
```html
<html>
  <head><!-- ... --></head>
  <body>
    <!-- Add data-interpret= or interpret= for key -->
    <p>
      <span style="color: #FA0;" data-interpret="hello"></span>
      <span data-interpret="thisFieldOnlyInEnglish"></span>
    </p>

    <script type="text/javascript" src="./lib/interpret.min.js"></script>
    <!-- File content on the below -->
    <script type="text/javascript" src="./js/index.js"></script>
  </body>
</html>
```

## Set langauages from object
```javascript
var langs = {
  en: {
    hello: "hello",
    thisFieldOnlyInEnglish: "This field only in English"
  },
  // We can also use "_" instance of "-" /
  zh_HK: {
    hello: "你好"
  }
};

var interpretElement = InterpretJS.createForElement(document.body);

InterpretJS.setLangsFromObject(langs)
.then(function () {
  return interpretElement.load({ langCode: "zh_HK" });
})
.then(function () {
  console.log("Finished");
})
.catch(function (err) {
  console.error(err);
});
```

### Set default langauage file to "zh-HK"
```javascript
InterpretJS.config.defaultLanguage = "zh-HK";
```

### Set where the language files to load
```javascript
InterpretJS.config.languageFilesRoot = "./other/path/langs"
```

### Set other available languages
```javascript
InterpretJS.config.langs.push("zh-HK", "jp-JP", "fr");
// Then here should contain en.json, zh-HK.json, jp-JP.json and, fr.json
```

### Interpret nested key
#### HTML
```html
<div data-interpret="nested.object.key"></div>
```
#### Lanaguage file
```json
{
  nested: {
    object: {
      key: "The nested object key!"
    }
  }
}
```

## API

### InterpretJS.config -> Object
Get / Set configs
```javascript
InterpretJS.config = {
  languageFilesRoot: "./langs",
  defaultLanguage: "en",
  langs: [
    "en"
  ]
}
```

### InterpretJS. -> Object
Get current langauage from object or file
```javascript
console.log(InterpretJS.langs);
/*
{
  en: {
     // ...
  },
  "zh-HK": {
     // ...
  },
  // Maybe more ...
}
*/
```

### InterpretJS.createForElement(HTMLElement) -> InterpretElement
Create a InterpretElement for interpret later
```javascript
var interpretElement = InterpretJS.createForElement(document.body);
// Or
var interpretElement = InterpretJS.createForElement(document.getElementById("myElement"));
// Or
var interpretElement = InterpretJS.createForElement(document.querySelector("#myElement > h1.title"));
```

### InterpretJS.reloadLanguageFiles(callback) -> Promise
Reload languages from file
```javascript
InterpretJS.reloadLanguageFiles(function (err) { /*...*/ });
// Or
InterpretJS.reloadLanguageFiles()
.then(function () {
  /* ... */
})
.catch(function (err) {
  console.error(err);
});
```

### InterpretJS.setLangsFromObject(obj, callback) -> Promise
Set languages from object

Note: `InterpretJS.reloadLanguageFiles` will replace the langauage object set via `InterpretJS.setLangsFromObject`

```javascript
var langs = {
  en: {
    hello: "hello",
    thisFieldOnlyInEnglish: "This field only in English"
  },
  // We can also use "_" instance of "-" /
  zh_HK: {
    hello: "你好"
  }
};

InterpretJS.setLangsFromObject(langs, function (err) {
  /* ... */
});

// Or

InterpretJS.setLangsFromObject(langs)
.then(function () {
  /* ... */
})
.catch(function (err) {
  console.error(err);
});
```

### InterpretElement#currentLangCode -> String
Get last `InterpretElement#load` loaded langCode
```javascript
console.log(interpretElement.currentLangCode);
// en
```

### InterpretElement#load(opts, callback) -> Promise
```javascript
interpretElement.load({}, function (err) {
  /* ... */
});
// Or
interpretElement.load({ langCode: "zh-HK" })
.then(function () {
  /* ... */
})
.catch(function (err) {
  console.error(err);
});
```

#### Options (opts)
```javascript
{
  // Which langauage you want to load
  langCode = Config.defaultLanguage
}
```

## Build

### Pre-build requirements
* git
* nodejs >= 6.0
* eslint (Optional)

Open cmd (Windows) or Terminal (Mac OS X / Linux)
```bash
cd /where/you/want/to/clone/into
git https://github.com/OnikurYH/interpret-js.git
cd interpret-js
npm install
npm run build
```

The script will be build on "dist/" and "docs/lib" folders

- - -
Develop by OnikurYH

License: MIT
