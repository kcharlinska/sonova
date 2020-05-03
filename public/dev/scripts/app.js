(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoints = [
    {
        name: 'small',
        shortName: 'xs',
        value: 0
    },
    {
        name: 'mobile',
        shortName: 'sm',
        value: 576
    },
    {
        name: 'fablet',
        shortName: 'md',
        value: 768
    },
    {
        name: 'tablet',
        shortName: 'lg',
        value: 992
    },
    {
        name: 'desktop',
        shortName: 'xl',
        value: 1200
    },
    {
        name: 'desktop-hd',
        shortName: 'hd',
        value: 1366
    },
    {
        name: 'desktop-wide',
        shortName: 'whd',
        value: 1440
    }
];
exports.breakpointsSpecial = {
    burgerShow: {
        cssValue: 'screen and (max-width: 767px)',
        value: 767
    },
    burgerHide: {
        cssValue: 'screen and (min-width: 768px)',
        value: 768
    }
};
exports.headerHeight = {
    'desktop-hd': 70,
    desktop: 70,
    fablet: 70,
    tablet: 70,
    mobile: 70
};

},{}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],3:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vhCheck = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    // don't know a better way to get the size of a CSS 100vh…
    function createTestElement() {
        var testElement = document.createElement('div');
        testElement.style.cssText =
            'position: fixed; top: 0; height: 100vh; pointer-events: none;';
        document.documentElement.insertBefore(testElement, document.documentElement.firstChild);
        return testElement;
    }
    function removeTestElement(element) {
        document.documentElement.removeChild(element);
    }
    //  in some browsers this will be bigger than window.innerHeight
    function checkSizes() {
        var vhTest = createTestElement();
        var windowHeight = window.innerHeight;
        var vh = vhTest.offsetHeight;
        var offset = vh - windowHeight;
        removeTestElement(vhTest);
        return {
            vh: vh,
            windowHeight: windowHeight,
            offset: offset,
            isNeeded: offset !== 0,
            value: 0,
        };
    }
    // export
    function noop() { }
    function computeDifference() {
        var sizes = checkSizes();
        sizes.value = sizes.offset;
        return sizes;
    }
    function redefineVhUnit() {
        var sizes = checkSizes();
        sizes.value = sizes.windowHeight * 0.01;
        return sizes;
    }

    var methods = /*#__PURE__*/Object.freeze({
        noop: noop,
        computeDifference: computeDifference,
        redefineVhUnit: redefineVhUnit
    });

    function isString(text) {
        return typeof text === "string" && text.length > 0;
    }
    function isFunction(f) {
        return typeof f === "function";
    }
    var defaultOptions = Object.freeze({
        cssVarName: 'vh-offset',
        redefineVh: false,
        method: computeDifference,
        force: false,
        bind: true,
        updateOnTouch: false,
        onUpdate: noop,
    });
    function getOptions(options) {
        // old options handling: only redefine the CSS var name
        if (isString(options)) {
            return __assign({}, defaultOptions, { cssVarName: options });
        }
        // be sure to have a configuration object
        if (typeof options !== 'object')
            return defaultOptions;
        // make sure we have the right options to start with
        var finalOptions = {
            force: options.force === true,
            bind: options.bind !== false,
            updateOnTouch: options.updateOnTouch === true,
            onUpdate: isFunction(options.onUpdate) ? options.onUpdate : noop,
        };
        // method change
        var redefineVh = options.redefineVh === true;
        finalOptions.method =
            methods[redefineVh ? 'redefineVhUnit' : 'computeDifference'];
        finalOptions.cssVarName = isString(options.cssVarName)
            ? options.cssVarName
            : redefineVh
                ? /*
                  when redefining vh unit we follow this article name convention
                  https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
                */
                    'vh'
                : defaultOptions.cssVarName;
        return finalOptions;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
    var passiveSupported = false;
    var eventListeners = [];
    /* istanbul ignore next */
    try {
        var options = Object.defineProperty({}, "passive", {
            get: function () {
                passiveSupported = true;
            },
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
    function addListener(eventName, callback) {
        eventListeners.push({
            eventName: eventName,
            callback: callback,
        });
        window.addEventListener(eventName, callback, 
        /* istanbul ignore next */
        passiveSupported ? { passive: true } : false);
    }
    function removeAll() {
        eventListeners.forEach(function (config) {
            window.removeEventListener(config.eventName, config.callback);
        });
        eventListeners = [];
    }

    function updateCssVar(cssVarName, result) {
        document.documentElement.style.setProperty("--" + cssVarName, result.value + "px");
    }
    function formatResult(sizes, options) {
        return __assign({}, sizes, { unbind: removeAll, recompute: options.method });
    }
    function vhCheck(options) {
        var config = Object.freeze(getOptions(options));
        var result = formatResult(config.method(), config);
        // usefulness check
        if (!result.isNeeded && !config.force) {
            return result;
        }
        updateCssVar(config.cssVarName, result);
        config.onUpdate(result);
        // enabled by default
        if (!config.bind)
            return result;
        function onWindowChange() {
            window.requestAnimationFrame(function () {
                var sizes = config.method();
                updateCssVar(config.cssVarName, sizes);
                config.onUpdate(formatResult(sizes, config));
            });
        }
        // be sure we don't duplicates events listeners
        result.unbind();
        // listen for orientation change
        // - this can't be configured
        // - because it's convenient and not a real performance bottleneck
        addListener('orientationchange', onWindowChange);
        // listen to touch move for scrolling
        // – disabled by default
        // - listening to scrolling can be expansive…
        if (config.updateOnTouch) {
            addListener('touchmove', onWindowChange);
        }
        return result;
    }

    return vhCheck;

})));

},{}],4:[function(require,module,exports){
"use strict";
/*!
 * FrontBox 1.3.0
 * Copyright Bartosz Piwek
 * https://github.com/BartoszPiwek/FrontBox
 */
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("./bootstrap/browser");
var burger_1 = require("./bootstrap/burger");
var cookie_1 = require("./bootstrap/cookie");
var elements_1 = require("./bootstrap/elements");
var input_counter_1 = require("./bootstrap/input-counter");
var protect_email_1 = require("./bootstrap/protect-email");
var scroll_1 = require("./bootstrap/scroll");
var sticky_1 = require("./bootstrap/sticky");
var wcag_1 = require("./bootstrap/wcag");
exports.scroll = new scroll_1.Scroll();
exports.browser = new browser_1.Browser();
window.onload = function () {
    new burger_1.Burger({
        button: document.getElementById("burger-button"),
        container: document.getElementById("header"),
        overlay: document.getElementById("burger-overlay")
    });
    new sticky_1.Sticky({
        element: document.getElementById("header-content")
    });
    new protect_email_1.ProtectEmail({
        elements: document.querySelectorAll(".js_email")
    });
    /* Forms */
    new input_counter_1.InputCounter({
        cssClass: {
            wrap: "[data-bind=\"input-counter\"]",
            input: ".input-counter__input",
            button: ".input-counter__btn",
            disable: "--disable"
        }
    });
    /* Information's */
    new cookie_1.CookieInformation({
        templateUrl: "partials/cookies.html"
    });
    new wcag_1.Wcag();
    // const placeholder = new ElementPlaceholder();
    // placeholder.create(document.getElementById('header'));
    /* Inform stylesheet to remove style fallback for JavaScript elements */
    elements_1.html.classList.remove("js_disabled");
};

},{"./bootstrap/browser":6,"./bootstrap/burger":7,"./bootstrap/cookie":9,"./bootstrap/elements":10,"./bootstrap/input-counter":12,"./bootstrap/protect-email":13,"./bootstrap/scroll":14,"./bootstrap/sticky":15,"./bootstrap/wcag":16}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)
exports.vh = require('vh-check')();

},{"vh-check":3}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var elements_1 = require("./elements");
var breakpoints_1 = require("../../../config/breakpoints");
/**
 * @class Browser
 */
var Browser = /** @class */ (function (_super) {
    __extends(Browser, _super);
    function Browser() {
        return _super.call(this) || this;
    }
    Browser.prototype.onResize = function () {
        this.calculatePage();
    };
    Browser.prototype.onScroll = function () {
        /* Check last center */
        var lastTop = 0;
        if (this.scroll) {
            lastTop = this.scroll.top;
        }
        /* Prepare variables */
        var direction;
        var top = this.scrollPosition;
        var bottom = top + this.height;
        var speed = Math.abs(lastTop - top);
        /* Check scroll direction */
        if (top < lastTop) {
            direction = "up";
        }
        else {
            direction = "down";
        }
        this.scroll = {
            top: top,
            bottom: bottom,
            speed: speed,
            direction: direction
        };
    };
    Object.defineProperty(Browser.prototype, "scrollbarWidth", {
        get: function () {
            if (!this._scrollbarWidth) {
                var scrollbar = document.getElementById("js_check-scrollbar");
                var content = scrollbar.children.item(0);
                this._scrollbarWidth = scrollbar.offsetWidth - content.clientWidth;
                scrollbar.parentNode.removeChild(scrollbar);
            }
            return this._scrollbarWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "transitionEvent", {
        get: function () {
            if (!this._transitionEvent) {
                var element = document.createElement("getTransitionEvent");
                var transitions = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
                for (var key in transitions) {
                    if (element.style[key] !== undefined) {
                        this._transitionEvent = transitions[key];
                        break;
                    }
                }
            }
            return this._transitionEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "orientation", {
        get: function () {
            if (window.matchMedia("(orientation: portrait)").matches) {
                return "portrait";
            }
            else {
                return "landscape";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "responsive", {
        get: function () {
            for (var _i = 0, _a = breakpoints_1.breakpoints.reverse(); _i < _a.length; _i++) {
                var element = _a[_i];
                if (window.matchMedia("(min-width: " + element.value + "px)").matches) {
                    return element.name;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "scrollPosition", {
        get: function () {
            return window.pageYOffset || elements_1.html.scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "isScrollbar", {
        get: function () {
            return window.innerWidth != document.documentElement.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Browser.prototype.calculatePage = function () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        var body = document.body, html = document.documentElement;
        this.documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    };
    return Browser;
}(component_1.Component));
exports.Browser = Browser;

},{"../../../config/breakpoints":1,"./component":8,"./elements":10}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var component_1 = require("./component");
var breakpoints_1 = require("../../../config/breakpoints");
var Burger = /** @class */ (function (_super) {
    __extends(Burger, _super);
    function Burger(param) {
        var _this = _super.call(this, param) || this;
        _this.active = false;
        _this.running = false;
        _this.expandTime = 200;
        _this.cssClassActive = 'js_burger-active';
        return _this;
    }
    Burger.prototype.onInit = function () {
        var _this = this;
        this.button.onclick = function () {
            _this.toggle();
        };
        if (this.overlay) {
            this.overlay.onclick = function () {
                _this.toggle();
            };
        }
    };
    Burger.prototype.onResize = function () {
        if (this.active && app_1.browser.width > breakpoints_1.breakpointsSpecial.burgerShow.value) {
            this.toggle();
        }
    };
    Burger.prototype.toggle = function () {
        var _this = this;
        if (this.running) {
            return false;
        }
        this.running = true;
        this.active = !this.active;
        app_1.scroll.change(this.active);
        this.container.classList.toggle(this.cssClassActive);
        window.setTimeout(function () {
            _this.running = false;
        }, this.expandTime);
    };
    return Burger;
}(component_1.Component));
exports.Burger = Burger;

},{"../../../config/breakpoints":1,"../app":4,"./component":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var polyfill_1 = require("../app/polyfill");
var Component = /** @class */ (function () {
    function Component(param) {
        var _this = this;
        if (param) {
            Object.assign(this, param);
        }
        /* Run function after initialization */
        if (this.afterInit) {
            this.afterInit();
        }
        /* Run function on resize */
        if (this.onResize) {
            this.lastWidth = window.innerWidth;
            this.lastHeight = polyfill_1.vh.windowHeight;
            window.addEventListener("resize", function () {
                if ((polyfill_1.vh.isNeed && _this.lastHeight !== polyfill_1.vh.windowHeight) ||
                    !polyfill_1.vh.isNeed) {
                    _this.lastWidth = window.innerWidth;
                    _this.lastHeight = polyfill_1.vh.windowHeight;
                    _this.onResize();
                }
            }, false);
            this.onResize();
        }
        /* Run function on scroll */
        if (this.onScroll) {
            window.addEventListener("scroll", function () {
                _this.onScroll();
            });
            this.onScroll();
        }
        if (this.onInit) {
            this.onInit();
        }
    }
    return Component;
}());
exports.Component = Component;

},{"../app/polyfill":5}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cookies = require("js-cookie");
var component_1 = require("./component");
var frontbox_1 = require("./frontbox");
var CookieInformation = /** @class */ (function (_super) {
    __extends(CookieInformation, _super);
    function CookieInformation(param) {
        return _super.call(this, param) || this;
    }
    CookieInformation.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentHTML, cookie, accept;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Cookies.get('cookie-accept')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, frontbox_1.getFile(this.templateUrl)];
                    case 1:
                        contentHTML = _a.sent();
                        document.body.insertAdjacentHTML('beforeend', contentHTML);
                        cookie = document.getElementById('js_cookies-information');
                        accept = document.querySelectorAll('.js_cookies-close');
                        accept.forEach(function (item) {
                            item.addEventListener('click', function () {
                                Cookies.set('cookie-accept', 1);
                                cookie.classList.add('js_cookies-information--hide');
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return CookieInformation;
}(component_1.Component));
exports.CookieInformation = CookieInformation;

},{"./component":8,"./frontbox":11,"js-cookie":2}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = document.body;
exports.html = document.documentElement;
exports.CSS = window.getComputedStyle(exports.html);

},{}],11:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function getFile(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onload = function () {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(xhr.response);
                        }
                        else {
                            reject(xhr.statusText);
                        }
                    };
                    xhr.onerror = function () { return reject(xhr.statusText); };
                    xhr.send();
                })];
        });
    });
}
exports.getFile = getFile;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputCounter = /** @class */ (function () {
    function InputCounter(data) {
        this.database = [];
        this.active = false;
        this.cssClass = data.cssClass;
        this.refresh();
        this.active = true;
    }
    InputCounter.prototype.changeValue = function () {
    };
    InputCounter.prototype.bind = function () {
    };
    InputCounter.prototype.unbind = function () {
    };
    InputCounter.prototype.loopElement = function () { };
    InputCounter.prototype.add = function (wrap) {
        var input, button, value, max, min;
        input = wrap.querySelector('.input-counter__input');
        button = wrap.querySelectorAll('.input-counter__btn');
        value = Number(input.value);
        min = Number(input.min);
        max = Number(input.max);
        this.database.push({
            wrap: wrap,
            input: input,
            button: button,
            value: value,
            max: max,
            min: min,
        });
        // Bind input change
        input.onfocus = function () {
            input.select();
        };
        input.oninput = function () {
            var valueNew = Number(input.value);
            if (!valueNew) {
                input.value = String(value);
                return false;
            }
            value = valueNew;
            if (valueNew >= max) {
                value = max;
                console.log("max");
            }
            else if (valueNew <= min) {
                value = min;
                console.log("min");
            }
            input.value = String(value);
            input.select();
        };
    };
    InputCounter.prototype.refresh = function () {
        var _this = this;
        /* Off previous bind clicks */
        if (this.active) {
            // this.$input.off("click");
            // this.$button.off("input");
            this.active = false;
        }
        ;
        /* Get elements wrap */
        var wrap = document.querySelectorAll("[data-bind=\"input-counter\"]");
        /* Fill database */
        wrap.forEach(function (item) {
            _this.add(item);
        });
        console.log(this.database);
        this.active = true;
    };
    return InputCounter;
}());
exports.InputCounter = InputCounter;

},{}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var ProtectEmail = /** @class */ (function (_super) {
    __extends(ProtectEmail, _super);
    function ProtectEmail(param) {
        return _super.call(this, param) || this;
    }
    ProtectEmail.prototype.onInit = function () {
        var _this = this;
        this.elements.forEach(function (item) {
            item.addEventListener('click', _this.onClick);
        });
    };
    ProtectEmail.prototype.onClick = function (e) {
        var link = this;
        var email = link.children[0].textContent
            .split('')
            .reverse()
            .join('');
        link.setAttribute('href', "mailto:" + email);
        link.classList.remove('js_email');
        link.textContent = email;
        link.parentNode.replaceChild(link.cloneNode(true), link);
        link.click();
        return;
    };
    return ProtectEmail;
}(component_1.Component));
exports.ProtectEmail = ProtectEmail;

},{"./component":8}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./elements");
var app_1 = require("../app");
var transition_1 = require("../tools/transition");
var breakpoints_1 = require("../../../config/breakpoints");
var Scroll = /** @class */ (function () {
    function Scroll() {
        this._state = false;
        this.cssActiveClass = 'js_scroll-lock';
        this.cssActiveScrollbar = 'js_scrollbar-active';
    }
    Object.defineProperty(Scroll.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Scroll.prototype.on = function () {
        this.positionTop = app_1.browser.scrollPosition;
        elements_1.body.style.top = "-" + this.positionTop + "px";
        if (app_1.browser.isScrollbar) {
            elements_1.html.classList.add(this.cssActiveScrollbar);
        }
        elements_1.html.classList.add(this.cssActiveClass);
        this._state = true;
    };
    Scroll.prototype.off = function () {
        elements_1.html.classList.remove(this.cssActiveClass, this.cssActiveScrollbar);
        window.scrollTo(0, this.positionTop);
        elements_1.body.style.top = '';
        this.positionTop = 0;
        this._state = false;
    };
    Scroll.prototype.change = function (state) {
        if (this._state === state) {
            return;
        }
        if (state === true) {
            this.on();
        }
        else {
            this.off();
        }
    };
    Scroll.prototype.to = function (param) {
        var _this = this;
        this.change(true);
        var offset = param.offset ? param.offset : 0;
        var start = this.positionTop;
        var change = param.element.offsetTop - start - breakpoints_1.headerHeight[app_1.browser.responsive] - offset;
        var increment = 20;
        var currentTime = 0;
        if (change - start > app_1.browser.documentHeight - app_1.browser.height) {
            change = app_1.browser.documentHeight - app_1.browser.height;
        }
        var animateScroll = function () {
            currentTime += increment;
            var val = transition_1.easeInOutQuad(currentTime, start, change, param.time);
            elements_1.body.style.top = "-" + val + "px";
            if (currentTime < param.time) {
                setTimeout(animateScroll, increment);
            }
            else {
                _this.positionTop = change;
                _this.change(false);
                if (param.callbackAfter) {
                    param.callbackAfter();
                }
            }
        };
        animateScroll();
    };
    return Scroll;
}());
exports.Scroll = Scroll;

},{"../../../config/breakpoints":1,"../app":4,"../tools/transition":17,"./elements":10}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var app_1 = require("../app");
var Sticky = /** @class */ (function (_super) {
    __extends(Sticky, _super);
    function Sticky(param) {
        return _super.call(this, param) || this;
    }
    Sticky.prototype.onResize = function () {
        this.offset = this.element.parentElement.offsetTop;
    };
    Sticky.prototype.onScroll = function () {
        /* Don't run detection when scroll is on */
        if (!app_1.scroll.state) {
            if (app_1.browser.scroll.top > this.offset) {
                if (!this.active) {
                    this.active = true;
                    this.element.parentElement.classList.add("js_sticky");
                }
            }
            else if (this.active) {
                this.active = false;
                this.element.parentElement.classList.remove("js_sticky");
            }
        }
    };
    return Sticky;
}(component_1.Component));
exports.Sticky = Sticky;

},{"../app":4,"./component":8}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wcag = /** @class */ (function () {
    function Wcag() {
        this.active = false;
        document.documentElement.addEventListener('keydown', (this._keydown = function (e) {
            document.body.classList.add('js_wcag');
        }));
        document.documentElement.addEventListener('mousedown', function (e) {
            document.body.classList.remove('js_wcag');
        });
    }
    return Wcag;
}());
exports.Wcag = Wcag;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1)
        return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}
exports.easeInOutQuad = easeInOutQuad;

},{}]},{},[4])

//# sourceMappingURL=app.js.map
