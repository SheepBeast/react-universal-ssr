!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=45)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("babel-runtime/helpers/inherits")},function(e,t){e.exports=require("babel-runtime/helpers/possibleConstructorReturn")},function(e,t){e.exports=require("babel-runtime/helpers/createClass")},function(e,t){e.exports=require("babel-runtime/helpers/classCallCheck")},function(e,t){e.exports=require("babel-runtime/core-js/object/get-prototype-of")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SHOW_MOVE_AREA="SHOW_MOVE_AREA",t.SHOW_PHOTO="SHOW_PHOTO",t.SHOW_THIS_PHOTO="SHOW_THIS_PHOTO",t.LOADING="LOADING",t.LOAD_THIS_PAGE="LOAD_THIS_PAGE",t.LOAD_TAG_TO_ARTICLE="LOAD_TAG_TO_ARTICLE",t.LOAD_ALBUM="LOAD_ALBUM"},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",a=e[3];if(!a)return n;if(t&&"function"==typeof btoa){var o=(i=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),r=a.sources.map(function(e){return"/*# sourceURL="+a.sourceRoot+e+" */"});return[n].concat(r).concat([o]).join("\n")}var i;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var a={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(a[r]=!0)}for(o=0;o<e.length;o++){var i=e[o];"number"==typeof i[0]&&a[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LeftArea=t.Home=t.AList=void 0;var a=i(n(33)),o=i(n(31)),r=i(n(20));function i(e){return e&&e.__esModule?e:{default:e}}t.AList=a.default,t.Home=o.default,t.LeftArea=r.default},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports="data:image/png;base64,"},function(e,t){e.exports=require("react-router")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(15)),o=l(n(24)),r=l(n(23)),i=l(n(22));function l(e){return e&&e.__esModule?e:{default:e}}var u=(0,a.default)({},o.default,r.default,i.default);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ArticleTag=t.AboutMe=void 0;var a=r(n(30)),o=r(n(26));function r(e){return e&&e.__esModule?e:{default:e}}t.AboutMe=a.default,t.ArticleTag=o.default},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("babel-runtime/core-js/object/assign")},function(e,t){e.exports=require("redux")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.createStore)(r.default,e,(0,a.applyMiddleware)(o.default))};var a=n(16),o=i(n(41)),r=i(n(40));function i(e){return e&&e.__esModule?e:{default:e}}},function(e,t){e.exports=require("axios")},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,"::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n::-webkit-scrollbar-thumb {\n  border-radius: 8px;\n  background-color: rgba(0, 0, 0, 0.2);\n}\n",""])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=f(n(5)),o=f(n(4)),r=f(n(3)),i=f(n(2)),l=f(n(1)),u=n(0),c=f(u),s=n(13),d=n(8);n(12),n(9);function f(e){return e&&e.__esModule?e:{default:e}}n(19);var p=function(e){function t(e){(0,o.default)(this,t);var n=(0,i.default)(this,(t.__proto__||(0,a.default)(t)).call(this,e));return n.state={focusKey:""},n}return(0,l.default)(t,e),(0,r.default)(t,[{key:"handleClick",value:function(){alert("leftA1rea1")}},{key:"render",value:function(){var e=this.props.articles;return console.log("render left area --\x3e"),e?c.default.createElement("div",{className:"container"},"LeftArea2",c.default.createElement(s.AboutMe,{setKey:this.setKey.bind(this)}),c.default.createElement(d.MoveArea,{setKey:this.setKey.bind(this),focusKey:this.state.focusKey,articles:e}),this.props.children):c.default.createElement("div",{className:"container"},c.default.createElement("span",{onClick:this.handleClick.bind(this)},"Main"))}},{key:"setKey",value:function(e){this.setState({focusKey:e})}}]),t}(u.Component);t.default=p},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,".right-area {\n  position: absolute;\n  right: 0;\n  min-height: 100%;\n  left: 300px;\n  width: auto;\n  height: auto;\n  background: #eaeaea;\n  transition: all 0.5s;\n  -moz-transition: all 0.5s;\n  -webkit-transition: all 0.5s;\n  -o-transition: all 0.5s;\n}\n",""])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.closePhotoAction=t.showThisPhotoAction=t.showPhotoAction=void 0;var a=n(6);t.showPhotoAction=function(e,t,n,a,o,r,i,l){SHOW_PHOTO},t.showThisPhotoAction=function(e,t,n){a.SHOW_THIS_PHOTO},t.closePhotoAction=function(e,t){a.CLOSE_PHOTO}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.loadAlbumAction=t.loadTagToArticleAction=t.loadThisPageAction=t.loadAction=void 0;var a=n(6);t.loadAction=function(e){a.LOADING},t.loadThisPageAction=function(e){a.LOAD_THIS_PAGE},t.loadTagToArticleAction=function(e){a.LOAD_THIS_PAGE},t.loadAlbumAction=function(){a.LOAD_ALBUM}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.showMoveAreaAction=void 0;var a=n(6);t.showMoveAreaAction=function(e,t,n,o){a.SHOW_MOVE_AREA}},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,'.article-tag {\n  float: left;\n}\n.article-tag:before {\n  color: #999;\n  content: "\\F02C";\n  font: 20px FontAwesome;\n  float: left;\n  margin-left: 5px;\n  margin-right: 10px;\n  margin-top: 2px;\n}\n.article-tag .article-tag-list {\n  float: left;\n  list-style: none;\n  margin-top: -2px;\n}\n.article-tag .article-tag-list li {\n  float: left;\n}\n.article-tag .article-tag-list li:hover {\n  opacity: 0.8;\n}\n.article-tag .article-tag-list li .color3 {\n  background: #ba8f6c;\n}\n.article-tag .article-tag-list li .color3:before {\n  border-right-color: #ba8f6c;\n}\n.article-tag .article-tag-list li a {\n  display: inline-block;\n  text-decoration: none;\n  font-weight: normal;\n  color: #fff;\n  height: 18px;\n  line-height: 18px;\n  float: left;\n  padding: 0px 5px 0px 10px;\n  position: relative;\n  border-radius: 0 5px 5px 0;\n  margin: 5px 9px 5px 8px;\n  font-family: Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace;\n  font-size: 12px;\n}\n.article-tag .article-tag-list li a:before {\n  content: " ";\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  top: 0;\n  left: -18px;\n  border: 9px solid transparent;\n}\n.article-tag .article-tag-list li a:after {\n  content: " ";\n  width: 4px;\n  height: 4px;\n  background: #fff;\n  border-radius: 4px;\n  -webkit-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);\n  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);\n  position: absolute;\n  top: 7px;\n  left: 2px;\n}\n',""])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=d(n(5)),o=d(n(4)),r=d(n(3)),i=d(n(2)),l=d(n(1)),u=n(0),c=d(u),s=n(11);function d(e){return e&&e.__esModule?e:{default:e}}n(25);var f=function(e){function t(){return(0,o.default)(this,t),(0,i.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,l.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this.props.tags.map(function(e,t){return c.default.createElement("li",{className:"article-tag-list-item",key:t},c.default.createElement(s.Link,{className:"color3",to:"/"},e))});return c.default.createElement("div",{className:"article-tag tagcloud"},c.default.createElement("ul",{className:"article-tag-list"},e))}}]),t}(u.Component);t.default=f},function(e,t){e.exports="data:image/png;base64,"},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,'.about-me-box {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 3;\n  width: 300px;\n  height: 100%;\n  background: #fff;\n}\n.about-me-top {\n  position: absolute;\n  width: 100%;\n  height: 180px;\n  background: #000;\n  opacity: 0.7;\n}\n.about-me-content {\n  margin: 112px auto 0;\n  width: 76%;\n  text-align: center;\n}\n.about-me-content .about-me {\n  width: 100%;\n}\n.about-me-content .about-me .about-me-pic {\n  position: relative;\n  display: block;\n  margin: 0 auto;\n  width: 118px;\n  height: 118px;\n  border: 5px solid #fff;\n  overflow: hidden;\n  background: #88acdb;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n}\n.about-me-content .about-me .about-me-pic img {\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  border-radius: 50%;\n  -webkit-border-radius: 50%;\n}\n.about-me-content .about-me hgroup {\n  display: block;\n}\n.about-me-content .about-me hgroup a {\n  display: block;\n  margin: 31px 0px;\n  width: auto;\n  font-family: Roboto, "Roboto", serif;\n  text-align: center;\n  font-size: 30px;\n  color: #696969;\n  text-decoration: none;\n  outline: none;\n}\n.about-me-content .about-me hgroup a:hover {\n  color: #b0a0aa;\n}\n.about-me-message {\n  text-align: center;\n  color: #999;\n  font-size: 14px;\n  line-height: 27px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-family: lucida grande, lucida sans unicode, lucida, helvetica, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;\n}\n.about-me-menu {\n  position: relative;\n  margin-top: 42px;\n  width: 100%;\n  min-height: 60px;\n  overflow: hidden;\n}\n.menu-area {\n  float: none;\n  display: block;\n  margin-left: -12px;\n  height: 60px;\n  font-weight: 300;\n  line-height: 31px;\n  cursor: pointer;\n  text-transform: uppercase;\n  text-align: center;\n}\n.menu-area ul {\n  list-style: none;\n}\n.menu-area ul li {\n  cursor: default;\n}\n.menu-area ul li a {\n  font-size: 14px;\n  min-width: 300px;\n  color: #696969;\n  text-decoration: none;\n  font-family: lucida grande, lucida sans unicode, lucida, helvetica, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;\n}\n.menu-area ul li a:hover {\n  color: #b0a0aa;\n}\n.about-me-keys {\n  position: relative;\n  margin-top: 46px;\n  width: 100%;\n  min-height: 20px;\n  overflow: hidden;\n  text-align: center;\n}\n.about-me-keys .key-area {\n  height: 20px;\n}\n.about-me-keys .key-area span {\n  letter-spacing: 0.5px;\n  color: #696969;\n  font-size: 12px;\n  font-family: lucida grande, lucida sans unicode, lucida, helvetica, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;\n  cursor: pointer;\n}\n.about-me-keys .key-area span:hover {\n  color: #b0a0aa;\n}\n.about-me-connect {\n  position: relative;\n  margin-top: 33px;\n  width: 100%;\n  min-height: 30px;\n  overflow: hidden;\n}\n.about-me-connect .connect-area {\n  margin-left: 18px;\n  height: 30px;\n}\n.about-me-connect .connect-area span {\n  margin-right: 21px;\n}\n.about-me-connect .connect-area span img {\n  width: 28px;\n  height: 28px;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  opacity: 0.7;\n}\n.about-me-connect .connect-area span img:hover {\n  opacity: 1;\n}\n',""])},function(e,t){e.exports=require("react-dom")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=d(n(5)),o=d(n(4)),r=d(n(3)),i=d(n(2)),l=d(n(1)),u=n(0),c=d(u),s=(n(29),n(11));function d(e){return e&&e.__esModule?e:{default:e}}n(28);var f=function(e){function t(){return(0,o.default)(this,t),(0,i.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,l.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"about-me-box"},c.default.createElement("div",{className:"about-me-top"}),c.default.createElement("div",{className:"about-me-content"},c.default.createElement("div",{className:"about-me"},c.default.createElement(s.Link,{to:"/",className:"about-me-pic"},c.default.createElement("img",{src:n(27)})),c.default.createElement("hgroup",null,c.default.createElement(s.Link,{to:"/"},"Sharlly")),c.default.createElement("p",{className:"about-me-message"},"心有余而力不足的减肥Coder"),c.default.createElement("div",{className:"about-me-menu"},c.default.createElement("nav",{className:"menu-area"},c.default.createElement("ul",null,c.default.createElement("li",{key:"home"},c.default.createElement(s.Link,{to:"/"},"主页")),c.default.createElement("li",{key:"albums"},c.default.createElement(s.Link,{to:"/tags"},"相册"))))),c.default.createElement("div",{className:"about-me-keys"},c.default.createElement("nav",{className:"key-area",onClick:this.showMoveArea},c.default.createElement("span",{"data-key":"menu-article"},"所有文章/"),c.default.createElement("span",{"data-key":"menu-tag"},"标签/"),c.default.createElement("span",{"data-key":"menu-me"},"关于我"))),c.default.createElement("div",{className:"about-me-connect"},c.default.createElement("nav",{className:"connect-area"},c.default.createElement("span",null,c.default.createElement("a",{href:"https://github.com/yxy19950717",target:"_blank"},c.default.createElement("img",{src:n(10)}))),c.default.createElement("span",null,c.default.createElement("a",{href:"https://github.com/yxy19950717",target:"_blank"},c.default.createElement("img",{src:n(10)}))),c.default.createElement("span",null,c.default.createElement("a",{href:"https://github.com/yxy19950717",target:"_blank"},c.default.createElement("img",{src:n(10)}))))))))}},{key:"shouldComponentUpdate",value:function(e,t){return!1}},{key:"showMoveArea",value:function(e){this.showTheBox(),this.showTheFocus(e)}},{key:"showTheBox",value:function(){var e=document.getElementById("move-area"),t=document.getElementById("right-area");e.style.left="300px",t&&(t.style.left="600px")}},{key:"showTheFocus",value:function(e){document.getElementById("menu-"+e.target.dataset.key);this.props.setKey(e.target.dataset.key)}}]),t}(u.Component);t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=f(n(5)),o=f(n(4)),r=f(n(3)),i=f(n(2)),l=f(n(1)),u=n(0),c=f(u),s=(n(8),n(13)),d=n(12);n(9);function f(e){return e&&e.__esModule?e:{default:e}}n(21);var p=function(e){function t(e){(0,o.default)(this,t);var n=(0,i.default)(this,(t.__proto__||(0,a.default)(t)).call(this,e));return n.EVENT_LISTEN=!0,n.NOW_PAGE=1,n.MAX_PAGE=Math.ceil(n.props.articleLen/5),n.handleClick=n.handleClick.bind(n),n}return(0,l.default)(t,e),(0,r.default)(t,[{key:"handleClick",value:function(){alert("home")}},{key:"render",value:function(){var e=this.props,t=e.articles;e.articleLen,e.dispatch;return console.log("render home --\x3e"),t?c.default.createElement("div",{className:"right-area",id:"right-area",ref:"loader",onWheel:this.loadMoreArticles.bind(this)},c.default.createElement("div",{className:"right-area-wrap"},c.default.createElement("div",{onClick:this.handleClick},"home1"),c.default.createElement("br",null),c.default.createElement("ul",null,["hello"," ","world"].map(function(e,t){return c.default.createElement("li",{key:t},e)}))),c.default.createElement(s.Footer,null)):c.default.createElement("div",null,c.default.createElement("div",{onClick:this.handleClick},"Index"))}},{key:"loadMoreArticles",value:function(e){if(this.EVENT_LISTEN&&this.NOW_PAGE){var t=this.refs.loader,n=document.body,a=this.props.dispatch;t.scrollHeight-n.scrollTop<=window.innerHeight+200&&(this.EVENT_LISTEN=!1,a((0,d.loadThisPageAction)(++this.NOW_PAGE)),this.EVENT_LISTEN=!0)}}},{key:"componentDidMount",value:function(){document.body.scrollTop=0}}]),t}(u.Component);t.default=p},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,".menu-article-content {\n  position: absolute;\n  z-index: 100;\n  width: 100%;\n  height: 100%;\n  padding-top: 30px;\n  overflow-x: auto;\n  transition: all 0.3s;\n  -moz-transition: all 0.3s;\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n}\n",""])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=d(n(5)),o=d(n(4)),r=d(n(3)),i=d(n(2)),l=d(n(1)),u=n(0),c=d(u),s=n(8);function d(e){return e&&e.__esModule?e:{default:e}}n(32);var f=function(e){function t(){return(0,o.default)(this,t),(0,i.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,l.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){var e=this.props.articles,t=e.length,n=e.map(function(e,n){return c.default.createElement(s.A,{key:n,isLast:n+1==t,article:e})});return c.default.createElement("div",{className:"menu-article-content",id:"menu-article-content"},n)}},{key:"shouldComponentUpdate",value:function(e,t){return!1}}]),t}(u.Component);t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return r.default.createElement("div",null,r.default.createElement(i.Route,{exact:!0,path:"/",component:s}),r.default.createElement(i.Route,{path:"/home",component:c}))};var a,o=n(0),r=(a=o)&&a.__esModule?a:{default:a},i=n(11),l=n(14),u=n(8);var c=(0,l.connect)(function(e){return{articles:e.articleReducer.articles,articleLen:0}})(u.Home),s=(0,l.connect)(function(e){return{articles:e.articleReducer.allArticles,tags:e.articleReducer.tags,tagToArticleArr:e.articleReducer.tagToArticleArr,musicData:e.articleReducer.musicData,moveAreaLeft:e.aboutReducer.moveAreaLeft,menuBackDisplay:e.aboutReducer.menuBackDisplay,focusKey:e.aboutReducer.focusKey,device:e.aboutReducer.device}})(u.LeftArea)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=p(n(5)),o=p(n(4)),r=p(n(3)),i=p(n(2)),l=p(n(1)),u=n(0),c=p(u),s=n(9),d=n(14),f=p(n(34));function p(e){return e&&e.__esModule?e:{default:e}}var m=(0,p(n(17)).default)({}),h=function(e){function t(){return(0,o.default)(this,t),(0,i.default)(this,(t.__proto__||(0,a.default)(t)).apply(this,arguments))}return(0,l.default)(t,e),(0,r.default)(t,[{key:"render",value:function(){return c.default.createElement(d.Provider,{store:m},c.default.createElement("div",{id:"app-container"},c.default.createElement(s.Link,{to:"/"},"/"),c.default.createElement("br",null),c.default.createElement(s.Link,{to:"/home"},"/home"),c.default.createElement("br",null),(0,f.default)()))}}]),t}(u.Component);t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.photoReducer=void 0;var a=n(6);t.photoReducer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{boxDisplay:"none",device:"none",url:"",index:"",count:"",desc:"",imgs:[],descs:[]},t=arguments[1];switch(t.type){case a.SHOW_PHOTO:case a.SHOW_THIS_PHOTO:return t;default:return e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.aboutReducer=void 0;var a=n(6);t.aboutReducer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{moveAreaLeft:"none",menuBackDisplay:"none",focusKey:"none",device:"none"},t=arguments[1];switch(t.type){case a.SHOW_MOVE_AREA:return{moveAreaLeft:t.left,menuBackDisplay:t.display,focusKey:t.focusKey,device:t.device};default:return e}}},function(e,t){e.exports=require("babel-runtime/core-js/object/keys")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.articleReducer=void 0;var a=i(n(15)),o=i(n(38)),r=n(6);function i(e){return e&&e.__esModule?e:{default:e}}t.articleReducer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];switch(t.type){case r.LOADING:var n=(0,o.default)(t.data.tagToActicle);return(0,a.default)({},n,t.data);case r.LOAD_THIS_PAGE:return e;case r.LOAD_TAG_TO_ARTICLE:for(var i=e.tagToArticle[t.tag],l=[],u=0;u<i.length;u++)l.push(e.allArticles[e.allArticles.length-i[u]]);return(0,a.default)({},e,i,l);default:return e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(16),o=n(39),r=n(37),i=n(36),l=(0,a.combineReducers)({articleReducer:o.articleReducer,aboutReducer:r.aboutReducer,photoReducer:i.photoReducer});t.default=l},function(e,t){e.exports=require("redux-thunk")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";var a=n(44),o=(n(18),n(43)),r=n(0),i=n(42).renderToString,l=n(9).StaticRouter,u=(n(18),n(17).default),c=n(35).default,s=o();s.set("views","C:\\github\\react-universal-ssr\\dist\\views"),s.set("view engine","ejs");var d={".js":"text/javascript",".css":"text/css",".html":"text/html",".png":"image/png",".jpg":"image/jpg"};s.use("/assets",o.static("C:\\github\\react-universal-ssr\\dist\\assets",{dotfiles:"ignore",etag:!0,extensions:["html","css","png","jpg","js"],maxAge:"3600000",redirect:!0,setHeaders:function(e,t,n){e.set("x-timestamp",Date.now()),e.set("Vary","Accept-Encoding"),e.set("Cache-Control","assets, max-age=3600");var o=a.extname(t);e.set("Content-Type",d[o])}})),s.get("/",function(e,t){var n=i(r.createElement(l,{location:e.url,context:{}},r.createElement(c,null))),a=u();t.render("index",{html:n,state:a.getState()})}),s.get("/home",function(e,t){var n=u(),a=i(r.createElement(l,{location:e.url,context:{}},r.createElement(c,null)));t.render("index",{html:a,state:n.getState()})});s.listen(1501,function(){console.log("Listenning on port: 1501")})}]);