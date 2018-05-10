/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"babel-runtime/core-js/object/get-prototype-of\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"babel-runtime/helpers/classCallCheck\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"babel-runtime/helpers/createClass\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"babel-runtime/helpers/possibleConstructorReturn\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"babel-runtime/helpers/inherits\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _routes = __webpack_require__(/*! ./routes */ \"./src/routes/index.js\");\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nvar _store = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n\nvar _store2 = _interopRequireDefault(_store);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar store = (0, _store2.default)(\"server\" === \"browser\" && window._INITIAL_STATE_ || {});\n\nvar App = function (_Component) {\n  (0, _inherits3.default)(App, _Component);\n\n  function App() {\n    (0, _classCallCheck3.default)(this, App);\n    return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));\n  }\n\n  (0, _createClass3.default)(App, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        _reactRedux.Provider,\n        { store: store },\n        _react2.default.createElement(\n          'div',\n          { id: 'app-container' },\n          _react2.default.createElement(\n            _reactRouterDom.Link,\n            { to: '/' },\n            '/'\n          ),\n          _react2.default.createElement('br', null),\n          _react2.default.createElement(\n            _reactRouterDom.Link,\n            { to: '/home' },\n            '/home'\n          ),\n          _react2.default.createElement('br', null),\n          (0, _routes2.default)()\n        )\n      );\n    }\n  }]);\n  return App;\n}(_react.Component);\n\nexports.default = App;\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/actions/about.js":
/*!******************************!*\
  !*** ./src/actions/about.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.showMoveAreaAction = undefined;\n\nvar _actionTypes = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nvar showMoveAreaAction = function showMoveAreaAction(left, display, focusKey, device) {\n  type: _actionTypes.SHOW_MOVE_AREA, left, display, focusKey, device;\n};\n\nexports.showMoveAreaAction = showMoveAreaAction;\n\n//# sourceURL=webpack:///./src/actions/about.js?");

/***/ }),

/***/ "./src/actions/article.js":
/*!********************************!*\
  !*** ./src/actions/article.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.loadAlbumAction = exports.loadTagToArticleAction = exports.loadThisPageAction = exports.loadAction = undefined;\n\nvar _actionTypes = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nvar loadAction = function loadAction(data) {\n  type: _actionTypes.LOADING, data;\n};\nvar loadThisPageAction = function loadThisPageAction(pN) {\n  type: _actionTypes.LOAD_THIS_PAGE, pN;\n};\nvar loadTagToArticleAction = function loadTagToArticleAction(tag) {\n  type: _actionTypes.LOAD_THIS_PAGE, tag;\n};\nvar loadAlbumAction = function loadAlbumAction() {\n  type: _actionTypes.LOAD_ALBUM;\n};\n\nexports.loadAction = loadAction;\nexports.loadThisPageAction = loadThisPageAction;\nexports.loadTagToArticleAction = loadTagToArticleAction;\nexports.loadAlbumAction = loadAlbumAction;\n\n//# sourceURL=webpack:///./src/actions/article.js?");

/***/ }),

/***/ "./src/actions/index.js":
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ \"babel-runtime/core-js/object/assign\");\n\nvar _assign2 = _interopRequireDefault(_assign);\n\nvar _about = __webpack_require__(/*! ./about */ \"./src/actions/about.js\");\n\nvar _about2 = _interopRequireDefault(_about);\n\nvar _article = __webpack_require__(/*! ./article */ \"./src/actions/article.js\");\n\nvar _article2 = _interopRequireDefault(_article);\n\nvar _photo = __webpack_require__(/*! ./photo */ \"./src/actions/photo.js\");\n\nvar _photo2 = _interopRequireDefault(_photo);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar actions = (0, _assign2.default)({}, _about2.default, _article2.default, _photo2.default);\n\nexports.default = actions;\n\n//# sourceURL=webpack:///./src/actions/index.js?");

/***/ }),

/***/ "./src/actions/photo.js":
/*!******************************!*\
  !*** ./src/actions/photo.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.closePhotoAction = exports.showThisPhotoAction = exports.showPhotoAction = undefined;\n\nvar _actionTypes = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nvar showPhotoAction = function showPhotoAction(device, boxDisplay, url, index, count, desc, imgs, descs) {\n  type: SHOW_PHOTO, boxDisplay, device, url, index, count, desc, imgs, descs;\n};\n\nvar closePhotoAction = function closePhotoAction(device, boxDisplay) {\n  type: _actionTypes.CLOSE_PHOTO, boxDisplay, device;\n};\n\nvar showThisPhotoAction = function showThisPhotoAction(device, boxDisplay, index) {\n  type: _actionTypes.SHOW_THIS_PHOTO, boxDisplay, device, index;\n};\n\nexports.showPhotoAction = showPhotoAction;\nexports.showThisPhotoAction = showThisPhotoAction;\nexports.closePhotoAction = closePhotoAction;\n\n//# sourceURL=webpack:///./src/actions/photo.js?");

/***/ }),

/***/ "./src/components/AboutMe/github.png":
/*!*******************************************!*\
  !*** ./src/components/AboutMe/github.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,\"\n\n//# sourceURL=webpack:///./src/components/AboutMe/github.png?");

/***/ }),

/***/ "./src/components/AboutMe/index.js":
/*!*****************************************!*\
  !*** ./src/components/AboutMe/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"babel-runtime/core-js/object/get-prototype-of\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"babel-runtime/helpers/classCallCheck\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"babel-runtime/helpers/createClass\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"babel-runtime/helpers/possibleConstructorReturn\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"babel-runtime/helpers/inherits\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactRouter = __webpack_require__(/*! react-router */ \"react-router\");\n\n__webpack_require__(/*! ./index.less */ \"./src/components/AboutMe/index.less\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar AboutMe = function (_Component) {\n  (0, _inherits3.default)(AboutMe, _Component);\n\n  function AboutMe() {\n    (0, _classCallCheck3.default)(this, AboutMe);\n    return (0, _possibleConstructorReturn3.default)(this, (AboutMe.__proto__ || (0, _getPrototypeOf2.default)(AboutMe)).apply(this, arguments));\n  }\n\n  (0, _createClass3.default)(AboutMe, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        { className: 'about-me-box' },\n        _react2.default.createElement('div', { className: 'about-me-top' }),\n        _react2.default.createElement(\n          'div',\n          { className: 'about-me-content' },\n          _react2.default.createElement(\n            'div',\n            { className: 'about-me' },\n            _react2.default.createElement(\n              _reactRouter.Link,\n              { to: '/', className: 'about-me-pic' },\n              _react2.default.createElement('img', { src: __webpack_require__(/*! ./sharlly.png */ \"./src/components/AboutMe/sharlly.png\") })\n            ),\n            _react2.default.createElement(\n              'hgroup',\n              null,\n              _react2.default.createElement(\n                _reactRouter.Link,\n                { to: '/' },\n                'Sharlly'\n              )\n            ),\n            _react2.default.createElement(\n              'p',\n              { className: 'about-me-message' },\n              '\\u5FC3\\u6709\\u4F59\\u800C\\u529B\\u4E0D\\u8DB3\\u7684\\u51CF\\u80A5Coder'\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'about-me-menu' },\n              _react2.default.createElement(\n                'nav',\n                { className: 'menu-area' },\n                _react2.default.createElement(\n                  'ul',\n                  null,\n                  _react2.default.createElement(\n                    'li',\n                    { key: 'home' },\n                    _react2.default.createElement(\n                      _reactRouter.Link,\n                      { to: '/' },\n                      '\\u4E3B\\u9875'\n                    )\n                  ),\n                  _react2.default.createElement(\n                    'li',\n                    { key: 'albums' },\n                    _react2.default.createElement(\n                      _reactRouter.Link,\n                      { to: '/tags' },\n                      '\\u76F8\\u518C'\n                    )\n                  )\n                )\n              )\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'about-me-keys' },\n              _react2.default.createElement(\n                'nav',\n                { className: 'key-area', onClick: this.showMoveArea },\n                _react2.default.createElement(\n                  'span',\n                  { 'data-key': 'menu-article' },\n                  '\\u6240\\u6709\\u6587\\u7AE0/'\n                ),\n                _react2.default.createElement(\n                  'span',\n                  { 'data-key': 'menu-tag' },\n                  '\\u6807\\u7B7E/'\n                ),\n                _react2.default.createElement(\n                  'span',\n                  { 'data-key': 'menu-me' },\n                  '\\u5173\\u4E8E\\u6211'\n                )\n              )\n            ),\n            _react2.default.createElement(\n              'div',\n              { className: 'about-me-connect' },\n              _react2.default.createElement(\n                'nav',\n                { className: 'connect-area' },\n                _react2.default.createElement(\n                  'span',\n                  null,\n                  _react2.default.createElement(\n                    'a',\n                    { href: 'https://github.com/yxy19950717', target: '_blank' },\n                    _react2.default.createElement('img', { src: __webpack_require__(/*! ./github.png */ \"./src/components/AboutMe/github.png\") })\n                  )\n                ),\n                _react2.default.createElement(\n                  'span',\n                  null,\n                  _react2.default.createElement(\n                    'a',\n                    { href: 'https://github.com/yxy19950717', target: '_blank' },\n                    _react2.default.createElement('img', { src: __webpack_require__(/*! ./github.png */ \"./src/components/AboutMe/github.png\") })\n                  )\n                ),\n                _react2.default.createElement(\n                  'span',\n                  null,\n                  _react2.default.createElement(\n                    'a',\n                    { href: 'https://github.com/yxy19950717', target: '_blank' },\n                    _react2.default.createElement('img', { src: __webpack_require__(/*! ./github.png */ \"./src/components/AboutMe/github.png\") })\n                  )\n                )\n              )\n            )\n          )\n        )\n      );\n    }\n  }, {\n    key: 'shouldComponentUpdate',\n    value: function shouldComponentUpdate(nextProps, nextState) {\n      return false;\n    }\n  }, {\n    key: 'showMoveArea',\n    value: function showMoveArea(e) {\n      this.showTheBox();\n      this.showTheFocus(e);\n    }\n  }, {\n    key: 'showTheBox',\n    value: function showTheBox() {\n      var box = document.getElementById('move-area');\n      var rightBox = document.getElementById('right-area');\n      box.style.left = '300px';\n      if (rightBox) {\n        rightBox.style.left = '600px';\n      }\n    }\n  }, {\n    key: 'showTheFocus',\n    value: function showTheFocus(e) {\n      var focus = document.getElementById('menu-' + e.target.dataset.key);\n      this.props.setKey(e.target.dataset.key);\n    }\n  }]);\n  return AboutMe;\n}(_react.Component);\n\nexports.default = AboutMe;\n\n//# sourceURL=webpack:///./src/components/AboutMe/index.js?");

/***/ }),

/***/ "./src/components/AboutMe/index.less":
/*!*******************************************!*\
  !*** ./src/components/AboutMe/index.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".about-me-box {\\n  position: fixed;\\n  top: 0px;\\n  left: 0px;\\n  z-index: 3;\\n  width: 300px;\\n  height: 100%;\\n  background: #fff;\\n}\\n.about-me-top {\\n  position: absolute;\\n  width: 100%;\\n  height: 180px;\\n  background: #000;\\n  opacity: 0.7;\\n}\\n.about-me-content {\\n  margin: 112px auto 0;\\n  width: 76%;\\n  text-align: center;\\n}\\n.about-me-content .about-me {\\n  width: 100%;\\n}\\n.about-me-content .about-me .about-me-pic {\\n  position: relative;\\n  display: block;\\n  margin: 0 auto;\\n  width: 118px;\\n  height: 118px;\\n  border: 5px solid #fff;\\n  overflow: hidden;\\n  background: #88acdb;\\n  border-radius: 50%;\\n  -webkit-border-radius: 50%;\\n}\\n.about-me-content .about-me .about-me-pic img {\\n  width: 100%;\\n  height: 100%;\\n  opacity: 1;\\n  border-radius: 50%;\\n  -webkit-border-radius: 50%;\\n}\\n.about-me-content .about-me hgroup {\\n  display: block;\\n}\\n.about-me-content .about-me hgroup a {\\n  display: block;\\n  margin: 31px 0px;\\n  width: auto;\\n  font-family: Roboto, \\\"Roboto\\\", serif;\\n  text-align: center;\\n  font-size: 30px;\\n  color: #696969;\\n  text-decoration: none;\\n  outline: none;\\n}\\n.about-me-content .about-me hgroup a:hover {\\n  color: #b0a0aa;\\n}\\n.about-me-message {\\n  text-align: center;\\n  color: #999;\\n  font-size: 14px;\\n  line-height: 27px;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n  font-family: lucida grande, lucida sans unicode, lucida, helvetica, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;\\n}\\n.about-me-menu {\\n  position: relative;\\n  margin-top: 42px;\\n  width: 100%;\\n  min-height: 60px;\\n  overflow: hidden;\\n}\\n.menu-area {\\n  float: none;\\n  display: block;\\n  margin-left: -12px;\\n  height: 60px;\\n  font-weight: 300;\\n  line-height: 31px;\\n  cursor: pointer;\\n  text-transform: uppercase;\\n  text-align: center;\\n}\\n.menu-area ul {\\n  list-style: none;\\n}\\n.menu-area ul li {\\n  cursor: default;\\n}\\n.menu-area ul li a {\\n  font-size: 14px;\\n  min-width: 300px;\\n  color: #696969;\\n  text-decoration: none;\\n  font-family: lucida grande, lucida sans unicode, lucida, helvetica, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;\\n}\\n.menu-area ul li a:hover {\\n  color: #b0a0aa;\\n}\\n.about-me-keys {\\n  position: relative;\\n  margin-top: 46px;\\n  width: 100%;\\n  min-height: 20px;\\n  overflow: hidden;\\n  text-align: center;\\n}\\n.about-me-keys .key-area {\\n  height: 20px;\\n}\\n.about-me-keys .key-area span {\\n  letter-spacing: 0.5px;\\n  color: #696969;\\n  font-size: 12px;\\n  font-family: lucida grande, lucida sans unicode, lucida, helvetica, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;\\n  cursor: pointer;\\n}\\n.about-me-keys .key-area span:hover {\\n  color: #b0a0aa;\\n}\\n.about-me-connect {\\n  position: relative;\\n  margin-top: 33px;\\n  width: 100%;\\n  min-height: 30px;\\n  overflow: hidden;\\n}\\n.about-me-connect .connect-area {\\n  margin-left: 18px;\\n  height: 30px;\\n}\\n.about-me-connect .connect-area span {\\n  margin-right: 21px;\\n}\\n.about-me-connect .connect-area span img {\\n  width: 28px;\\n  height: 28px;\\n  cursor: pointer;\\n  -webkit-transition: all .3s;\\n  transition: all .3s;\\n  opacity: 0.7;\\n}\\n.about-me-connect .connect-area span img:hover {\\n  opacity: 1;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/AboutMe/index.less?");

/***/ }),

/***/ "./src/components/AboutMe/sharlly.png":
/*!********************************************!*\
  !*** ./src/components/AboutMe/sharlly.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,\"\n\n//# sourceURL=webpack:///./src/components/AboutMe/sharlly.png?");

/***/ }),

/***/ "./src/components/ArticleTag/index.js":
/*!********************************************!*\
  !*** ./src/components/ArticleTag/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"babel-runtime/core-js/object/get-prototype-of\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"babel-runtime/helpers/classCallCheck\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"babel-runtime/helpers/createClass\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"babel-runtime/helpers/possibleConstructorReturn\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"babel-runtime/helpers/inherits\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(/*! react-router */ \"react-router\");\n\n__webpack_require__(/*! ./index.less */ \"./src/components/ArticleTag/index.less\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ArticleTag = function (_Component) {\n  (0, _inherits3.default)(ArticleTag, _Component);\n\n  function ArticleTag() {\n    (0, _classCallCheck3.default)(this, ArticleTag);\n    return (0, _possibleConstructorReturn3.default)(this, (ArticleTag.__proto__ || (0, _getPrototypeOf2.default)(ArticleTag)).apply(this, arguments));\n  }\n\n  (0, _createClass3.default)(ArticleTag, [{\n    key: 'render',\n    value: function render() {\n      var tagList = this.props.tags.map(function (tag, idx) {\n        return _react2.default.createElement(\n          'li',\n          { className: 'article-tag-list-item', key: idx },\n          _react2.default.createElement(\n            _reactRouter.Link,\n            { className: 'color3', to: '/' },\n            tag\n          )\n        );\n      });\n      return _react2.default.createElement(\n        'div',\n        { className: 'article-tag tagcloud' },\n        _react2.default.createElement(\n          'ul',\n          { className: 'article-tag-list' },\n          tagList\n        )\n      );\n    }\n  }]);\n  return ArticleTag;\n}(_react.Component);\n\nexports.default = ArticleTag;\n\n//# sourceURL=webpack:///./src/components/ArticleTag/index.js?");

/***/ }),

/***/ "./src/components/ArticleTag/index.less":
/*!**********************************************!*\
  !*** ./src/components/ArticleTag/index.less ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".article-tag {\\n  float: left;\\n}\\n.article-tag:before {\\n  color: #999;\\n  content: \\\"\\\\F02C\\\";\\n  font: 20px FontAwesome;\\n  float: left;\\n  margin-left: 5px;\\n  margin-right: 10px;\\n  margin-top: 2px;\\n}\\n.article-tag .article-tag-list {\\n  float: left;\\n  list-style: none;\\n  margin-top: -2px;\\n}\\n.article-tag .article-tag-list li {\\n  float: left;\\n}\\n.article-tag .article-tag-list li:hover {\\n  opacity: 0.8;\\n}\\n.article-tag .article-tag-list li .color3 {\\n  background: #ba8f6c;\\n}\\n.article-tag .article-tag-list li .color3:before {\\n  border-right-color: #ba8f6c;\\n}\\n.article-tag .article-tag-list li a {\\n  display: inline-block;\\n  text-decoration: none;\\n  font-weight: normal;\\n  color: #fff;\\n  height: 18px;\\n  line-height: 18px;\\n  float: left;\\n  padding: 0px 5px 0px 10px;\\n  position: relative;\\n  border-radius: 0 5px 5px 0;\\n  margin: 5px 9px 5px 8px;\\n  font-family: Menlo, Monaco, \\\"Andale Mono\\\", \\\"lucida console\\\", \\\"Courier New\\\", monospace;\\n  font-size: 12px;\\n}\\n.article-tag .article-tag-list li a:before {\\n  content: \\\" \\\";\\n  width: 0px;\\n  height: 0px;\\n  position: absolute;\\n  top: 0;\\n  left: -18px;\\n  border: 9px solid transparent;\\n}\\n.article-tag .article-tag-list li a:after {\\n  content: \\\" \\\";\\n  width: 4px;\\n  height: 4px;\\n  background: #fff;\\n  border-radius: 4px;\\n  -webkit-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);\\n  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);\\n  position: absolute;\\n  top: 7px;\\n  left: 2px;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/components/ArticleTag/index.less?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ArticleTag = exports.AboutMe = undefined;\n\nvar _AboutMe = __webpack_require__(/*! ./AboutMe */ \"./src/components/AboutMe/index.js\");\n\nvar _AboutMe2 = _interopRequireDefault(_AboutMe);\n\nvar _ArticleTag = __webpack_require__(/*! ./ArticleTag */ \"./src/components/ArticleTag/index.js\");\n\nvar _ArticleTag2 = _interopRequireDefault(_ArticleTag);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.AboutMe = _AboutMe2.default;\nexports.ArticleTag = _ArticleTag2.default;\n\n//# sourceURL=webpack:///./src/components/index.js?");

/***/ }),

/***/ "./src/constants/action-types.js":
/*!***************************************!*\
  !*** ./src/constants/action-types.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar SHOW_MOVE_AREA = 'SHOW_MOVE_AREA';\nvar SHOW_PHOTO = 'SHOW_PHOTO';\nvar SHOW_THIS_PHOTO = 'SHOW_THIS_PHOTO';\nvar LOADING = 'LOADING';\nvar LOAD_THIS_PAGE = 'LOAD_THIS_PAGE';\nvar LOAD_TAG_TO_ARTICLE = 'LOAD_TAG_TO_ARTICLE';\nvar LOAD_ALBUM = 'LOAD_ALBUM';\n\nexports.SHOW_MOVE_AREA = SHOW_MOVE_AREA;\nexports.SHOW_PHOTO = SHOW_PHOTO;\nexports.SHOW_THIS_PHOTO = SHOW_THIS_PHOTO;\nexports.LOADING = LOADING;\nexports.LOAD_THIS_PAGE = LOAD_THIS_PAGE;\nexports.LOAD_TAG_TO_ARTICLE = LOAD_TAG_TO_ARTICLE;\nexports.LOAD_ALBUM = LOAD_ALBUM;\n\n//# sourceURL=webpack:///./src/constants/action-types.js?");

/***/ }),

/***/ "./src/containers/AList/index.js":
/*!***************************************!*\
  !*** ./src/containers/AList/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"babel-runtime/core-js/object/get-prototype-of\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"babel-runtime/helpers/classCallCheck\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"babel-runtime/helpers/createClass\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"babel-runtime/helpers/possibleConstructorReturn\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"babel-runtime/helpers/inherits\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _index = __webpack_require__(/*! ../index.js */ \"./src/containers/index.js\");\n\n__webpack_require__(/*! ./index.less */ \"./src/containers/AList/index.less\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar AList = function (_Component) {\n  (0, _inherits3.default)(AList, _Component);\n\n  function AList() {\n    (0, _classCallCheck3.default)(this, AList);\n    return (0, _possibleConstructorReturn3.default)(this, (AList.__proto__ || (0, _getPrototypeOf2.default)(AList)).apply(this, arguments));\n  }\n\n  (0, _createClass3.default)(AList, [{\n    key: 'render',\n    value: function render() {\n      var articles = this.props.articles;\n\n      var len = articles.length;\n      var articleList = articles.map(function (article, idx) {\n        return _react2.default.createElement(_index.A, { key: idx, isLast: idx + 1 == len ? true : false, article: article });\n      });\n\n      return _react2.default.createElement(\n        'div',\n        { className: 'menu-article-content', id: 'menu-article-content' },\n        articleList\n      );\n    }\n  }, {\n    key: 'shouldComponentUpdate',\n    value: function shouldComponentUpdate(nextProps, nextState) {\n      return false;\n    }\n  }]);\n  return AList;\n}(_react.Component);\n\nexports.default = AList;\n\n//# sourceURL=webpack:///./src/containers/AList/index.js?");

/***/ }),

/***/ "./src/containers/AList/index.less":
/*!*****************************************!*\
  !*** ./src/containers/AList/index.less ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".menu-article-content {\\n  position: absolute;\\n  z-index: 100;\\n  width: 100%;\\n  height: 100%;\\n  padding-top: 30px;\\n  overflow-x: auto;\\n  transition: all 0.3s;\\n  -moz-transition: all 0.3s;\\n  -webkit-transition: all 0.3s;\\n  -o-transition: all 0.3s;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/containers/AList/index.less?");

/***/ }),

/***/ "./src/containers/Home/index.js":
/*!**************************************!*\
  !*** ./src/containers/Home/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"babel-runtime/core-js/object/get-prototype-of\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"babel-runtime/helpers/classCallCheck\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"babel-runtime/helpers/createClass\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"babel-runtime/helpers/possibleConstructorReturn\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"babel-runtime/helpers/inherits\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _index = __webpack_require__(/*! ../index */ \"./src/containers/index.js\");\n\nvar _index2 = __webpack_require__(/*! ../../components/index */ \"./src/components/index.js\");\n\nvar _actions = __webpack_require__(/*! ../../actions */ \"./src/actions/index.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\n__webpack_require__(/*! ./index.less */ \"./src/containers/Home/index.less\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Home = function (_Component) {\n  (0, _inherits3.default)(Home, _Component);\n\n  function Home(props) {\n    (0, _classCallCheck3.default)(this, Home);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));\n\n    _this.EVENT_LISTEN = true;\n    _this.NOW_PAGE = 1;\n    _this.MAX_PAGE = Math.ceil(_this.props.articleLen / 5);\n    _this.handleClick = _this.handleClick.bind(_this);\n    return _this;\n  }\n\n  (0, _createClass3.default)(Home, [{\n    key: 'handleClick',\n    value: function handleClick() {\n      alert('home');\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _props = this.props,\n          articles = _props.articles,\n          articleLen = _props.articleLen,\n          dispatch = _props.dispatch;\n\n      var msg = ['hello', ' ', 'world'];\n      console.log('render home -->');\n      if (articles) {\n        return _react2.default.createElement(\n          'div',\n          { className: 'right-area', id: 'right-area', ref: 'loader', onWheel: this.loadMoreArticles.bind(this) },\n          _react2.default.createElement(\n            'div',\n            { className: 'right-area-wrap' },\n            _react2.default.createElement(\n              'div',\n              { onClick: this.handleClick },\n              'home1'\n            ),\n            _react2.default.createElement('br', null),\n            _react2.default.createElement(\n              'ul',\n              null,\n              msg.map(function (m, idx) {\n                return _react2.default.createElement(\n                  'li',\n                  { key: idx },\n                  m\n                );\n              })\n            )\n          ),\n          _react2.default.createElement(_index2.Footer, null)\n        );\n      } else {\n        return _react2.default.createElement(\n          'div',\n          null,\n          _react2.default.createElement(\n            'div',\n            { onClick: this.handleClick },\n            'Index'\n          )\n        );\n      }\n    }\n  }, {\n    key: 'loadMoreArticles',\n    value: function loadMoreArticles(event) {\n      if (this.EVENT_LISTEN && this.NOW_PAGE) {\n        var loader = this.refs['loader'];\n        var body = document.body;\n        var dispatch = this.props.dispatch;\n\n        if (loader.scrollHeight - body.scrollTop <= window.innerHeight + 200) {\n          this.EVENT_LISTEN = false;\n          dispatch((0, _actions.loadThisPageAction)(++this.NOW_PAGE));\n          this.EVENT_LISTEN = true;\n        }\n      }\n    }\n  }, {\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      document.body.scrollTop = 0;\n    }\n  }]);\n  return Home;\n}(_react.Component);\n\nexports.default = Home;\n\n//# sourceURL=webpack:///./src/containers/Home/index.js?");

/***/ }),

/***/ "./src/containers/Home/index.less":
/*!****************************************!*\
  !*** ./src/containers/Home/index.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".right-area {\\n  position: absolute;\\n  right: 0;\\n  min-height: 100%;\\n  left: 300px;\\n  width: auto;\\n  height: auto;\\n  background: #eaeaea;\\n  transition: all 0.5s;\\n  -moz-transition: all 0.5s;\\n  -webkit-transition: all 0.5s;\\n  -o-transition: all 0.5s;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/containers/Home/index.less?");

/***/ }),

/***/ "./src/containers/LeftArea/index.js":
/*!******************************************!*\
  !*** ./src/containers/LeftArea/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"babel-runtime/core-js/object/get-prototype-of\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"babel-runtime/helpers/classCallCheck\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"babel-runtime/helpers/createClass\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"babel-runtime/helpers/possibleConstructorReturn\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"babel-runtime/helpers/inherits\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _index = __webpack_require__(/*! ../../components/index.js */ \"./src/components/index.js\");\n\nvar _index2 = __webpack_require__(/*! ../index.js */ \"./src/containers/index.js\");\n\nvar _index3 = __webpack_require__(/*! ../../actions/index.js */ \"./src/actions/index.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\n__webpack_require__(/*! ./index.less */ \"./src/containers/LeftArea/index.less\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LeftArea = function (_Component) {\n\t(0, _inherits3.default)(LeftArea, _Component);\n\n\tfunction LeftArea(props) {\n\t\t(0, _classCallCheck3.default)(this, LeftArea);\n\n\t\tvar _this = (0, _possibleConstructorReturn3.default)(this, (LeftArea.__proto__ || (0, _getPrototypeOf2.default)(LeftArea)).call(this, props));\n\n\t\t_this.state = {\n\t\t\tfocusKey: ''\n\t\t};\n\t\treturn _this;\n\t}\n\n\t(0, _createClass3.default)(LeftArea, [{\n\t\tkey: 'handleClick',\n\t\tvalue: function handleClick() {\n\t\t\talert('leftA1rea1');\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar articles = this.props.articles;\n\n\t\t\tvar msg = ['hel2l3o2323113232', ' ', 'world'];\n\t\t\tconsole.log('render left area -->');\n\t\t\tif (!articles) {\n\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'container' },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'span',\n\t\t\t\t\t\t{ onClick: this.handleClick.bind(this) },\n\t\t\t\t\t\t'Main'\n\t\t\t\t\t)\n\t\t\t\t);\n\t\t\t} else {\n\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'container' },\n\t\t\t\t\t'LeftArea2',\n\t\t\t\t\t_react2.default.createElement(_index.AboutMe, { setKey: this.setKey.bind(this) }),\n\t\t\t\t\t_react2.default.createElement(_index2.MoveArea, { setKey: this.setKey.bind(this), focusKey: this.state.focusKey, articles: articles }),\n\t\t\t\t\tthis.props.children\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'setKey',\n\t\tvalue: function setKey(key) {\n\t\t\tthis.setState({\n\t\t\t\tfocusKey: key\n\t\t\t});\n\t\t}\n\t}]);\n\treturn LeftArea;\n}(_react.Component);\n\nexports.default = LeftArea;\n\n//# sourceURL=webpack:///./src/containers/LeftArea/index.js?");

/***/ }),

/***/ "./src/containers/LeftArea/index.less":
/*!********************************************!*\
  !*** ./src/containers/LeftArea/index.less ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"::-webkit-scrollbar {\\n  width: 10px;\\n  height: 10px;\\n}\\n::-webkit-scrollbar-thumb {\\n  border-radius: 8px;\\n  background-color: rgba(0, 0, 0, 0.2);\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/containers/LeftArea/index.less?");

/***/ }),

/***/ "./src/containers/index.js":
/*!*********************************!*\
  !*** ./src/containers/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.LeftArea = exports.Home = exports.AList = undefined;\n\nvar _AList = __webpack_require__(/*! ./AList */ \"./src/containers/AList/index.js\");\n\nvar _AList2 = _interopRequireDefault(_AList);\n\nvar _Home = __webpack_require__(/*! ./Home */ \"./src/containers/Home/index.js\");\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nvar _LeftArea = __webpack_require__(/*! ./LeftArea */ \"./src/containers/LeftArea/index.js\");\n\nvar _LeftArea2 = _interopRequireDefault(_LeftArea);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.AList = _AList2.default;\nexports.Home = _Home2.default;\nexports.LeftArea = _LeftArea2.default;\n\n//# sourceURL=webpack:///./src/containers/index.js?");

/***/ }),

/***/ "./src/reducers/about.js":
/*!*******************************!*\
  !*** ./src/reducers/about.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.aboutReducer = undefined;\n\nvar _actionTypes = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nvar aboutReducer = function aboutReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    moveAreaLeft: 'none',\n    menuBackDisplay: 'none',\n    focusKey: 'none',\n    device: 'none'\n  };\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _actionTypes.SHOW_MOVE_AREA:\n      return {\n        moveAreaLeft: action.left,\n        menuBackDisplay: action.display,\n        focusKey: action.focusKey,\n        device: action.device\n      };\n    default:\n      return state;\n  }\n};\n\nexports.aboutReducer = aboutReducer;\n\n//# sourceURL=webpack:///./src/reducers/about.js?");

/***/ }),

/***/ "./src/reducers/article.js":
/*!*********************************!*\
  !*** ./src/reducers/article.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.articleReducer = undefined;\n\nvar _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ \"babel-runtime/core-js/object/assign\");\n\nvar _assign2 = _interopRequireDefault(_assign);\n\nvar _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ \"babel-runtime/core-js/object/keys\");\n\nvar _keys2 = _interopRequireDefault(_keys);\n\nvar _actionTypes = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar articleReducer = function articleReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _actionTypes.LOADING:\n      var tags = (0, _keys2.default)(action.data.tagToActicle);\n      return (0, _assign2.default)({}, tags, action.data);\n\n    case _actionTypes.LOAD_THIS_PAGE:\n      return state;\n\n    case _actionTypes.LOAD_TAG_TO_ARTICLE:\n      var articleNumArr = state.tagToArticle[action.tag];\n      var articleArr = [];\n      for (var i = 0; i < articleNumArr.length; i++) {\n        articleArr.push(state.allArticles[state.allArticles.length - articleNumArr[i]]);\n      }\n      return (0, _assign2.default)({}, state, articleNumArr, articleArr);\n\n    default:\n      return state;\n  }\n};\n\nexports.articleReducer = articleReducer;\n\n//# sourceURL=webpack:///./src/reducers/article.js?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _article = __webpack_require__(/*! ./article */ \"./src/reducers/article.js\");\n\nvar _about = __webpack_require__(/*! ./about */ \"./src/reducers/about.js\");\n\nvar _photo = __webpack_require__(/*! ./photo */ \"./src/reducers/photo.js\");\n\nvar reducers = (0, _redux.combineReducers)({\n  articleReducer: _article.articleReducer,\n  aboutReducer: _about.aboutReducer,\n  photoReducer: _photo.photoReducer\n});\n\nexports.default = reducers;\n\n//# sourceURL=webpack:///./src/reducers/index.js?");

/***/ }),

/***/ "./src/reducers/photo.js":
/*!*******************************!*\
  !*** ./src/reducers/photo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.photoReducer = undefined;\n\nvar _actionTypes = __webpack_require__(/*! ../constants/action-types */ \"./src/constants/action-types.js\");\n\nvar photoReducer = function photoReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    boxDisplay: 'none',\n    device: 'none',\n    url: '',\n    index: '',\n    count: '',\n    desc: '',\n    imgs: [],\n    descs: []\n  };\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _actionTypes.SHOW_PHOTO:\n      return action;\n    case _actionTypes.SHOW_THIS_PHOTO:\n      return action;\n    default:\n      return state;\n  }\n};\n\nexports.photoReducer = photoReducer;\n\n//# sourceURL=webpack:///./src/reducers/photo.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getRoutes;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(/*! react-router */ \"react-router\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _containers = __webpack_require__(/*! ../containers */ \"./src/containers/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar HomeApp = (0, _reactRedux.connect)(function (state) {\n  return {\n    articles: state.articleReducer.articles,\n    articleLen: 0\n  };\n})(_containers.Home);\n\nvar LeftAreaApp = (0, _reactRedux.connect)(function (state) {\n  return {\n    articles: state.articleReducer.allArticles,\n    tags: state.articleReducer.tags,\n    tagToArticleArr: state.articleReducer.tagToArticleArr,\n    musicData: state.articleReducer.musicData,\n    moveAreaLeft: state.aboutReducer.moveAreaLeft,\n    menuBackDisplay: state.aboutReducer.menuBackDisplay,\n    focusKey: state.aboutReducer.focusKey,\n    device: state.aboutReducer.device\n  };\n})(_containers.LeftArea);\n\nfunction getRoutes() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: LeftAreaApp }),\n    _react2.default.createElement(_reactRouter.Route, { path: '/home', component: HomeApp })\n  );\n}\n\n//# sourceURL=webpack:///./src/routes/index.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar axios = __webpack_require__(/*! axios */ \"axios\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar React = __webpack_require__(/*! react */ \"react\");\n\nvar _require = __webpack_require__(/*! react-dom/server */ \"react-dom/server\"),\n    renderToString = _require.renderToString;\n\nvar _require2 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\"),\n    StaticRouter = _require2.StaticRouter;\n\nvar axios = __webpack_require__(/*! axios */ \"axios\");\n\nvar configureStore = __webpack_require__(/*! ../store */ \"./src/store/index.js\").default;\nvar App = __webpack_require__(/*! ../App */ \"./src/App.js\").default;\n\nvar server = express();\n\nserver.set('views', \"C:\\\\github\\\\react-universal-ssr\\\\dist\\\\views\");\nserver.set('view engine', 'ejs');\n\nvar contentTypes = {\n  '.js': 'text/javascript',\n  '.css': 'text/css',\n  '.html': 'text/html',\n  '.png': 'image/png',\n  '.jpg': 'image/jpg'\n};\n\nserver.use('/assets', express.static(\"C:\\\\github\\\\react-universal-ssr\\\\dist\\\\assets\", {\n  dotfiles: 'ignore',\n  etag: true,\n  extensions: ['html', 'css', 'png', 'jpg', 'js'],\n  maxAge: '3600000',\n  redirect: true,\n  setHeaders: function setHeaders(res, pathname, stat) {\n    res.set('x-timestamp', Date.now());\n    res.set('Vary', 'Accept-Encoding');\n    res.set('Cache-Control', 'assets, max-age=3600');\n\n    var ext = path.extname(pathname);\n    res.set('Content-Type', contentTypes[ext]);\n  }\n}));\n\nserver.get('/', function (req, res) {\n  var html = renderToString(React.createElement(\n    StaticRouter,\n    { location: req.url, context: {} },\n    React.createElement(App, null)\n  ));\n  var store = configureStore();\n\n  res.render('index', { html: html, state: store.getState() });\n});\n\nserver.get('/home', function (req, res) {\n  var store = configureStore();\n  var html = renderToString(React.createElement(\n    StaticRouter,\n    { location: req.url, context: {} },\n    React.createElement(App, null)\n  ));\n\n  res.render('index', { html: html, state: store.getState() });\n});\n\nvar port =  true ? 1501 : undefined;\n\nserver.listen(port, function () {\n  console.log('Listenning on port:' + port);\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = configureStore;\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _reduxThunk = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n\nvar _reduxThunk2 = _interopRequireDefault(_reduxThunk);\n\nvar _reducers = __webpack_require__(/*! ../reducers */ \"./src/reducers/index.js\");\n\nvar _reducers2 = _interopRequireDefault(_reducers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Apply middleware here\n// ...\n\n/* start redux-devtools */\n// const enhancer = compose(\n// \tDevTools.instrument(),\n// \tpersistState(\n// \t\twindow.location.href.match(\n// \t\t\t/[?&]debug_session=([^&#]+)\\b/\n// \t\t)\n// \t)\n// );\n\n// import { persistState } from 'redux-devtools';\n// import { DevTools } from './containers/index.js';\nfunction configureStore() {\n  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));\n\n  if (false) {}\n\n  return store;\n}\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/object/assign\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/object/assign%22?");

/***/ }),

/***/ "babel-runtime/core-js/object/get-prototype-of":
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-prototype-of" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/object/get-prototype-of\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/object/get-prototype-of%22?");

/***/ }),

/***/ "babel-runtime/core-js/object/keys":
/*!****************************************************!*\
  !*** external "babel-runtime/core-js/object/keys" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/object/keys\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/object/keys%22?");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/classCallCheck\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/helpers/classCallCheck%22?");

/***/ }),

/***/ "babel-runtime/helpers/createClass":
/*!****************************************************!*\
  !*** external "babel-runtime/helpers/createClass" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/createClass\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/helpers/createClass%22?");

/***/ }),

/***/ "babel-runtime/helpers/inherits":
/*!*************************************************!*\
  !*** external "babel-runtime/helpers/inherits" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/inherits\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/helpers/inherits%22?");

/***/ }),

/***/ "babel-runtime/helpers/possibleConstructorReturn":
/*!******************************************************************!*\
  !*** external "babel-runtime/helpers/possibleConstructorReturn" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/possibleConstructorReturn\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/helpers/possibleConstructorReturn%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ })

/******/ });