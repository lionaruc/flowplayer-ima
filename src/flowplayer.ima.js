/**
 * IMA SDK integration plugin for Flowplayer HTML5.
 * For more information see https://www.github.com/angelfish-io/flowplayer-ima
 *
 * Copyright (C) 2015 Angelfish AS - Istanbul
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Author : frkcn - Angelfish AS
 * Web : http://angelfish.io
 */

function ClassList(n) {
    function r(n, r) {
        if (n.indexOf)return n.indexOf(r);
        for (var t = 0; t < n.length; ++t)if (n[t] === r)return t;
        return -1
    }

    function t(n) {
        var t = o();
        r(t, n) > -1 || (t.push(n), l(t))
    }

    function e(n) {
        var t = o(), e = r(t, n);
        -1 !== e && (t.splice(e, 1), l(t))
    }

    function i(n) {
        return r(o(), n) > -1
    }

    function u(n) {
        return i(n) ? (e(n), !1) : (t(n), !0)
    }

    function f() {
        return n.className
    }

    function a(n) {
        var r = o();
        return r[n] || null
    }

    function o() {
        var r = n.className;
        return filter(r.split(" "), isTruthy)
    }

    function l(r) {
        var t = r.length;
        n.className = r.join(" "), c.length = t;
        for (var e = 0; e < r.length; e++)c[e] = r[e];
        delete r[t]
    }

    var s = n.classList;
    if (s)return s;
    var c = {add: t, remove: e, contains: i, toggle: u, toString: f, length: 0, item: a};
    return c
}
function filter(n, r) {
    for (var t = [], e = 0; e < n.length; e++)r(n[e]) && t.push(n[e]);
    return t
}
function isTruthy(n) {
    return !!n
}
function computedStyle(a, b, c, d) {
    return c = window.getComputedStyle, d = c ? c(a) : a.currentStyle, d ? d[b.replace(/-(\w)/gi, function (a, b) {
        return b.toUpperCase()
    })] : void 0
}
function extend(obj) {
    var arr = [];
    var each = arr.forEach;
    var slice = arr.slice;
    each.call(slice.call(arguments, 1), function (source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};
(function (e, t, n) {
    typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define(n) : t[e] = n()
})("bean", this, function (e, t) {
    e = e || "bean", t = t || this;
    var n = window, r = t[e], i = /[^\.]*(?=\..*)\.|.*/, s = /\..*/, o = "addEventListener", u = "removeEventListener", a = document || {}, f = a.documentElement || {}, l = f[o], c = l ? o : "attachEvent", h = {}, p = Array.prototype.slice, d = function (e, t) {
        return e.split(t || " ")
    }, v = function (e) {
        return typeof e == "string"
    }, m = function (e) {
        return typeof e == "function"
    }, g = "click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ", y = "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinput readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ", b = function (e, t, n) {
        for (n = 0; n < t.length; n++)t[n] && (e[t[n]] = 1);
        return e
    }({}, d(g + (l ? y : ""))), w = function () {
        var e = "compareDocumentPosition"in f ? function (e, t) {
            return t.compareDocumentPosition && (t.compareDocumentPosition(e) & 16) === 16
        } : "contains"in f ? function (e, t) {
            return t = t.nodeType === 9 || t === window ? f : t, t !== e && t.contains(e)
        } : function (e, t) {
            while (e = e.parentNode)if (e === t)return 1;
            return 0
        }, t = function (t) {
            var n = t.relatedTarget;
            return n ? n !== this && n.prefix !== "xul" && !/document/.test(this.toString()) && !e(n, this) : n == null
        };
        return {
            mouseenter: {base: "mouseover", condition: t},
            mouseleave: {base: "mouseout", condition: t},
            mousewheel: {base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"}
        }
    }(), E = function () {
        var e = d("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"), t = e.concat(d("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")), r = t.concat(d("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")), i = e.concat(d("char charCode key keyCode keyIdentifier keyLocation location")), s = e.concat(d("data")), o = e.concat(d("touches targetTouches changedTouches scale rotation")), u = e.concat(d("data origin source")), l = e.concat(d("state")), c = /over|out/, h = [{
            reg: /key/i,
            fix: function (e, t) {
                return t.keyCode = e.keyCode || e.which, i
            }
        }, {
            reg: /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i, fix: function (e, n, r) {
                n.rightClick = e.which === 3 || e.button === 2, n.pos = {x: 0, y: 0};
                if (e.pageX || e.pageY)n.clientX = e.pageX, n.clientY = e.pageY; else if (e.clientX || e.clientY)n.clientX = e.clientX + a.body.scrollLeft + f.scrollLeft, n.clientY = e.clientY + a.body.scrollTop + f.scrollTop;
                return c.test(r) && (n.relatedTarget = e.relatedTarget || e[(r == "mouseover" ? "from" : "to") + "Element"]), t
            }
        }, {
            reg: /mouse.*(wheel|scroll)/i, fix: function () {
                return r
            }
        }, {
            reg: /^text/i, fix: function () {
                return s
            }
        }, {
            reg: /^touch|^gesture/i, fix: function () {
                return o
            }
        }, {
            reg: /^message$/i, fix: function () {
                return u
            }
        }, {
            reg: /^popstate$/i, fix: function () {
                return l
            }
        }, {
            reg: /.*/, fix: function () {
                return e
            }
        }], p = {}, v = function (e, t, r) {
            if (!arguments.length)return;
            e = e || ((t.ownerDocument || t.document || t).parentWindow || n).event, this.originalEvent = e, this.isNative = r, this.isBean = !0;
            if (!e)return;
            var i = e.type, s = e.target || e.srcElement, o, u, a, f, l;
            this.target = s && s.nodeType === 3 ? s.parentNode : s;
            if (r) {
                l = p[i];
                if (!l)for (o = 0, u = h.length; o < u; o++)if (h[o].reg.test(i)) {
                    p[i] = l = h[o].fix;
                    break
                }
                f = l(e, this, i);
                for (o = f.length; o--;)!((a = f[o])in this) && a in e && (this[a] = e[a])
            }
        };
        return v.prototype.preventDefault = function () {
            this.originalEvent.preventDefault ? this.originalEvent.preventDefault() : this.originalEvent.returnValue = !1
        }, v.prototype.stopPropagation = function () {
            this.originalEvent.stopPropagation ? this.originalEvent.stopPropagation() : this.originalEvent.cancelBubble = !0
        }, v.prototype.stop = function () {
            this.preventDefault(), this.stopPropagation(), this.stopped = !0
        }, v.prototype.stopImmediatePropagation = function () {
            this.originalEvent.stopImmediatePropagation && this.originalEvent.stopImmediatePropagation(), this.isImmediatePropagationStopped = function () {
                return !0
            }
        }, v.prototype.isImmediatePropagationStopped = function () {
            return this.originalEvent.isImmediatePropagationStopped && this.originalEvent.isImmediatePropagationStopped()
        }, v.prototype.clone = function (e) {
            var t = new v(this, this.element, this.isNative);
            return t.currentTarget = e, t
        }, v
    }(), S = function (e, t) {
        return !l && !t && (e === a || e === n) ? f : e
    }, x = function () {
        var e = function (e, t, n, r) {
            var i = function (n, i) {
                return t.apply(e, r ? p.call(i, n ? 0 : 1).concat(r) : i)
            }, s = function (n, r) {
                return t.__beanDel ? t.__beanDel.ft(n.target, e) : r
            }, o = n ? function (e) {
                var t = s(e, this);
                if (n.apply(t, arguments))return e && (e.currentTarget = t), i(e, arguments)
            } : function (e) {
                return t.__beanDel && (e = e.clone(s(e))), i(e, arguments)
            };
            return o.__beanDel = t.__beanDel, o
        }, t = function (t, n, r, i, s, o, u) {
            var a = w[n], f;
            n == "unload" && (r = A(O, t, n, r, i)), a && (a.condition && (r = e(t, r, a.condition, o)), n = a.base || n), this.isNative = f = b[n] && !!t[c], this.customType = !l && !f && n, this.element = t, this.type = n, this.original = i, this.namespaces = s, this.eventType = l || f ? n : "propertychange", this.target = S(t, f), this[c] = !!this.target[c], this.root = u, this.handler = e(t, r, null, o)
        };
        return t.prototype.inNamespaces = function (e) {
            var t, n, r = 0;
            if (!e)return !0;
            if (!this.namespaces)return !1;
            for (t = e.length; t--;)for (n = this.namespaces.length; n--;)e[t] == this.namespaces[n] && r++;
            return e.length === r
        }, t.prototype.matches = function (e, t, n) {
            return this.element === e && (!t || this.original === t) && (!n || this.handler === n)
        }, t
    }(), T = function () {
        var e = {}, t = function (n, r, i, s, o, u) {
            var a = o ? "r" : "$";
            if (!r || r == "*")for (var f in e)f.charAt(0) == a && t(n, f.substr(1), i, s, o, u); else {
                var l = 0, c, h = e[a + r], p = n == "*";
                if (!h)return;
                for (c = h.length; l < c; l++)if ((p || h[l].matches(n, i, s)) && !u(h[l], h, l, r))return
            }
        }, n = function (t, n, r, i) {
            var s, o = e[(i ? "r" : "$") + n];
            if (o)for (s = o.length; s--;)if (!o[s].root && o[s].matches(t, r, null))return !0;
            return !1
        }, r = function (e, n, r, i) {
            var s = [];
            return t(e, n, r, null, i, function (e) {
                return s.push(e)
            }), s
        }, i = function (t) {
            var n = !t.root && !this.has(t.element, t.type, null, !1), r = (t.root ? "r" : "$") + t.type;
            return (e[r] || (e[r] = [])).push(t), n
        }, s = function (n) {
            t(n.element, n.type, null, n.handler, n.root, function (t, n, r) {
                return n.splice(r, 1), t.removed = !0, n.length === 0 && delete e[(t.root ? "r" : "$") + t.type], !1
            })
        }, o = function () {
            var t, n = [];
            for (t in e)t.charAt(0) == "$" && (n = n.concat(e[t]));
            return n
        };
        return {has: n, get: r, put: i, del: s, entries: o}
    }(), N, C = function (e) {
        arguments.length ? N = e : N = a.querySelectorAll ? function (e, t) {
            return t.querySelectorAll(e)
        } : function () {
            throw new Error("Bean: No selector engine installed")
        }
    }, k = function (e, t) {
        if (!l && t && e && e.propertyName != "_on" + t)return;
        var n = T.get(this, t || e.type, null, !1), r = n.length, i = 0;
        e = new E(e, this, !0), t && (e.type = t);
        for (; i < r && !e.isImmediatePropagationStopped(); i++)n[i].removed || n[i].handler.call(this, e)
    }, L = l ? function (e, t, n) {
        e[n ? o : u](t, k, !1)
    } : function (e, t, n, r) {
        var i;
        n ? (T.put(i = new x(e, r || t, function (t) {
            k.call(e, t, r)
        }, k, null, null, !0)), r && e["_on" + r] == null && (e["_on" + r] = 0), i.target.attachEvent("on" + i.eventType, i.handler)) : (i = T.get(e, r || t, k, !0)[0], i && (i.target.detachEvent("on" + i.eventType, i.handler), T.del(i)))
    }, A = function (e, t, n, r, i) {
        return function () {
            r.apply(this, arguments), e(t, n, i)
        }
    }, O = function (e, t, n, r) {
        var i = t && t.replace(s, ""), o = T.get(e, i, null, !1), u = {}, a, f;
        for (a = 0, f = o.length; a < f; a++)(!n || o[a].original === n) && o[a].inNamespaces(r) && (T.del(o[a]), !u[o[a].eventType] && o[a][c] && (u[o[a].eventType] = {
            t: o[a].eventType,
            c: o[a].type
        }));
        for (a in u)T.has(e, u[a].t, null, !1) || L(e, u[a].t, !1, u[a].c)
    }, M = function (e, t) {
        var n = function (t, n) {
            var r, i = v(e) ? N(e, n) : e;
            for (; t && t !== n; t = t.parentNode)for (r = i.length; r--;)if (i[r] === t)return t
        }, r = function (e) {
            var r = n(e.target, this);
            r && t.apply(r, arguments)
        };
        return r.__beanDel = {ft: n, selector: e}, r
    }, _ = l ? function (e, t, r) {
        var i = a.createEvent(e ? "HTMLEvents" : "UIEvents");
        i[e ? "initEvent" : "initUIEvent"](t, !0, !0, n, 1), r.dispatchEvent(i)
    } : function (e, t, n) {
        n = S(n, e), e ? n.fireEvent("on" + t, a.createEventObject()) : n["_on" + t]++
    }, D = function (e, t, n) {
        var r = v(t), o, u, a, f;
        if (r && t.indexOf(" ") > 0) {
            t = d(t);
            for (f = t.length; f--;)D(e, t[f], n);
            return e
        }
        u = r && t.replace(s, ""), u && w[u] && (u = w[u].base);
        if (!t || r) {
            if (a = r && t.replace(i, ""))a = d(a, ".");
            O(e, u, n, a)
        } else if (m(t))O(e, null, t); else for (o in t)t.hasOwnProperty(o) && D(e, o, t[o]);
        return e
    }, P = function (e, t, n, r) {
        var o, u, a, f, l, v, g;
        if (n === undefined && typeof t == "object") {
            for (u in t)t.hasOwnProperty(u) && P.call(this, e, u, t[u]);
            return
        }
        m(n) ? (l = p.call(arguments, 3), r = o = n) : (o = r, l = p.call(arguments, 4), r = M(n, o, N)), a = d(t), this === h && (r = A(D, e, t, r, o));
        for (f = a.length; f--;)g = T.put(v = new x(e, a[f].replace(s, ""), r, o, d(a[f].replace(i, ""), "."), l, !1)), v[c] && g && L(e, v.eventType, !0, v.customType);
        return e
    }, H = function (e, t, n, r) {
        return P.apply(null, v(n) ? [e, n, t, r].concat(arguments.length > 3 ? p.call(arguments, 5) : []) : p.call(arguments))
    }, B = function () {
        return P.apply(h, arguments)
    }, j = function (e, t, n) {
        var r = d(t), o, u, a, f, l;
        for (o = r.length; o--;) {
            t = r[o].replace(s, "");
            if (f = r[o].replace(i, ""))f = d(f, ".");
            if (!f && !n && e[c])_(b[t], t, e); else {
                l = T.get(e, t, null, !1), n = [!1].concat(n);
                for (u = 0, a = l.length; u < a; u++)l[u].inNamespaces(f) && l[u].handler.apply(e, n)
            }
        }
        return e
    }, F = function (e, t, n) {
        var r = T.get(t, n, null, !1), i = r.length, s = 0, o, u;
        for (; s < i; s++)r[s].original && (o = [e, r[s].type], (u = r[s].handler.__beanDel) && o.push(u.selector), o.push(r[s].original), P.apply(null, o));
        return e
    }, I = {
        on: P,
        add: H,
        one: B,
        off: D,
        remove: D,
        clone: F,
        fire: j,
        Event: E,
        setSelectorEngine: C,
        noConflict: function () {
            return t[e] = r, this
        }
    };
    if (n.attachEvent) {
        var q = function () {
            var e, t = T.entries();
            for (e in t)t[e].type && t[e].type !== "unload" && D(t[e].element, t[e].type);
            n.detachEvent("onunload", q), n.CollectGarbage && n.CollectGarbage()
        };
        n.attachEvent("onunload", q)
    }
    return C(), I
});

var angVideo = function(conf){
    var VIDEO = document.createElement('video');

    var EVENTS = {

        // fired
        ended: 'finish',
        pause: 'pause',
        play: 'resume',
        progress: 'buffer',
        timeupdate: 'progress',
        volumechange: 'volume',
        ratechange: 'speed',
        //seeking: 'beforeseek',
        seeked: 'seek',
        // abort: 'resume',

        // not fired
        loadeddata: 'ready',
        // loadedmetadata: 0,
        // canplay: 0,

        // error events
        // load: 0,
        // emptied: 0,
        // empty: 0,
        error: 'error',
        dataunavailable: 'error',
        webkitendfullscreen: !flowplayer.support.inlineVideo && 'unload'

    };

    function round(val, per) {
        per = per || 100;
        return Math.round(val * per) / per;
    }
    function findFromSourcesByType(sources, type) {
        var arr = sources.filter(function(s) {
            return s.type === type;
        });
        return arr.length ? arr[0] : null;
    }
    function getType(type) {
        return /mpegurl/i.test(type) ? "application/x-mpegurl" : type;
    }
    function canPlay(type) {
        if (!/^(video|application)/i.test(type))
            type = getType(type);
        return !!VIDEO.canPlayType(type).replace("no", '');
    }
    var videoTagCache;
    var createVideoTag = function(video, autoplay, preload, useCache) {
        if (typeof autoplay === 'undefined') autoplay = true;
        if (typeof preload === 'undefined') preload = 'none';
        if (typeof useCache === 'undefined') useCache = true;
        if (useCache && videoTagCache) {
            videoTagCache.type = getType(video.type);
            videoTagCache.src = video.src;
            return videoTagCache;
        }
        var el  = document.createElement('video');
        el.src = video.src;
        el.type = getType(video.type);
        el.className = 'fp-engine';
        el.autoplay = autoplay ? 'autoplay' : false;
        el.preload = preload;
        el.setAttribute('x-webkit-airplay', 'allow');
        if (useCache) videoTagCache = el;
        return el;
    };
    var common = {
        find: function (query, ctx) {
            if ($) return $(query, ctx).toArray();
            ctx = ctx || document;
            return Array.prototype.map.call(ctx.querySelectorAll(query), function(el) { return el; });
        },
        prepend: function(par, child) {
            par.insertBefore(child, par.firstChild);
        },
        attr: function(el, key, val) {
            if (key === 'class') key = 'className';
            if (common.hasOwnOrPrototypeProperty(el, key)) {
                try {
                    el[key] = val;
                } catch (e) { // Most likely IE not letting set property
                    if ($) {
                        $(el).attr(key, val);
                    } else {
                        throw e;
                    }
                }
            } else {
                if (val === false) {
                    el.removeAttribute(key);
                } else {
                    el.setAttribute(key, val);
                }
            }
            return el;
        },
        hasOwnOrPrototypeProperty: function(obj, prop) {
            var o = obj;
            while (o) {
                if (Object.prototype.hasOwnProperty.call(o, prop)) return true;
                o = common.getPrototype(o);
            }
            return false;
        },
        getPrototype: function(el) {
            /* jshint proto:true */
            if (!Object.getPrototypeOf) return el.__proto__;
            return Object.getPrototypeOf(el);
        },
        css: function(el, property, value) {
            if (typeof property === 'object') {
                return Object.keys(property).forEach(function(key) {
                    common.css(el, key, property[key]);
                });
            }
            if (typeof value !== 'undefined') {
                if (value === '') return el ? el.style.removeProperty(property)  : undefined;
                return el ? el.style.setProperty(property, value) : undefined;
            }
            return el ? computedStyle(el, property) : undefined;
        },
        noop: function() {
            //nope
        },
        prop: function(el, key, val) {
            if (typeof val === 'undefined') {
                return el && el[key];
            }
            el[key] = val;
        },
        removeNode: function(el) {
            if (!el || !el.parentNode) return;
            el.parentNode.removeChild(el);
        },
        findDirect: function(query, ctx) {
            return common.find(query, ctx).filter(function(node) {
                return node.parentNode === ctx;
            });
        }
    };

    var imaPlugin = {};
    /**
     * ima plugin for flowplayer 6 HTML5 version
     * @constructor
     */
    imaPlugin.AngPlugin = function(){
        /**
         * object self
         */
        var self = this;
        /**
         * video tag
         */
        this.videoContent = null;
        /**
         * video wrapper tag
         */
        this.videoContentElement = null;
        /**
         * video selector element
         */
        this.videoContentParameter = null;
        /**
         * flowplayer api
         */
        this.playerObject = null;
        /**
         * ads will be added this element
         */
        this.joinElement = null;
        /**
         * video player
         */
        this.player = null;
        /**
         * player[0]
         */
        this.playerContext = null;
        /**
         * ad wrapper
         */
        this.adWrapper = null;
        /**
         * ad display container
         */
        this.adDisplayContainer = null;
        /**
         * all ads obj (preroll, overlay, midroll, postroll)
         */
        this.ads = null;
        /**
         * preroll ad obj
         */
        this.prerollAds = null;
        /**
         * overlay ad obj
         */
        this.overlayAds = null;
        /**
         * midroll ad obj
         */
        this.midrollAds = null;
        /**
         * postroll ad obj
         */
        this.postrollAds = null;
        /**
         * ima ads loader
         */
        this.adsLoader = null;
        /**
         * ima ads manager
         */
        this.adsManager = null;
        /**
         * video wrapper size
         */
        this.wrapperSize = null;
        /**
         * video control bar height
         */
        this.controlBarHeight = null;
        /**
         * we have got this ad
         */
        this.justAd = null;
        /**
         * ad paused
         */
        this.isAdPaused = false;
        /**
         * is video start
         */
        this.isVideoStarted = false;
        /**
         * ad status
         */
        this.isAdPlay = false;
        /**
         * ad type (preroll, overlay etc.)
         */
        this.adType = null;
        /**
         * is video fullscreen
         */
        this.isFullscreen = false;
        /**
         * when show overlay ad
         */
        this.overlayAdTime = 10;
        /**
         * when show middroll ad
         */
        this.midrollAdTime = 60;
        /**
         * do you want ads showing player on fullscreen
         */
        this.fullscreenAds = false;
        /**
         * ad mode obj
         */
        this.adMode = {};
        /**
         * ad mode preroll variable
         */
        this.adMode.preroll = "preroll";
        /**
         * ad mode overlay variable
         */
        this.adMode.overlay = "overlay";
        /**
         * ad mode midroll variable
         */
        this.adMode.midroll = "midroll";
        /**
         * ad mode postroll variable
         */
        this.adMode.postroll = "postroll";
        /**
         * flowplayer ui elemets
         * @type {*|jQuery|HTMLElement}
         */
        this.flowplayerUI = ".fp-ui .fp-controls, .fp-ui .fp-time, .fp-ui .fp-embed, .fp-ui .fp-fullscreen";
        /**
         * is mobile?
         */
        this.isMobile = false;
        this.isAndroid = false;
        /**
         * initialize plugin with player
         * @param player
         * @param ads
         */
        this.initializePlugin = function (player, ads) {
            var api = $(player).flowplayer({
                engine: "angengine",
                cuepoints: [this.overlayAdTime, this.midrollAdTime],
                seekable: true,
                mouseoutTimeout: 5000
            }, function(e, api, video){
            });

            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) this.isMobile = true;


            var ua = navigator.userAgent.toLowerCase();
            if(ua.indexOf("android") > -1) {
                this.isAndroid = true;
            }

            $('.fp-ui .fp-fullscreen, .fp-ui .fp-embed').hide();
            $(".fp-ui").removeAttr("title");

            this.player = player;
            this.ads = ads;

            this.prerollAds  = this.filterAdType(this.ads, this.adMode.preroll);
            this.overlayAds  = this.filterAdType(this.ads, this.adMode.overlay);
            this.midrollAds  = this.filterAdType(this.ads, this.adMode.midroll);
            this.postrollAds = this.filterAdType(this.ads, this.adMode.postroll);

            this.videoContentParameter = player + " video";
            this.videoContent = $(this.videoContentParameter).get(0);
            this.videoContentElement = $(this.videoContentParameter);
            this.playerContext = $(this.player).get(0);
            this.joinElement = $(this.player).find(".fp-ui").first().get(0);

            this.wrapperSize = {
                width: $(this.joinElement).width(),
                height: $(this.joinElement).height()
            };

            this.adWrapper = this.createAdContainer(this.joinElement);
            this.createPlayContainer(this.playerContext);
            this.hideAdContainer();
            google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

            this.adDisplayContainer =
                new google.ima.AdDisplayContainer(
                    this.adWrapper,
                    this.videoContent);
            // Must be done as the result of a user action on mobile
            this.adDisplayContainer.initialize();

            // Re-use this AdsLoader instance for the entire lifecycle of your page.
            this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

            // Add event listeners
            this.adsLoader.addEventListener(
                google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                this.onAdsManagerLoaded,
                false);
            this.adsLoader.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                this.onAdError,
                false);

            this.contentEndedListener();
            this.videoContentElement.on('ended', this.contentEndedListener);

            this.playerObject = flowplayer($(player))
                .on("resume", this.onPlayerResume)
                .on("fullscreen", this.onPlayerFullscreen)
                .on("fullscreen-exit", this.onPlayerFullscreenExit)
                .on("cuepoint", this.onPlayerCuepoint)
                .on("finish", this.onPlayerFinish);

            this.playerObject.conf.keyboard = false;
            this.controlBarHeight = this.getControlBarHeight();

            $('.fp-ui').on("click", this.onPlayerClick);
            $('.playContainer').on("click", this.onPlayWrapperClick);
            $('.adContainer').not('.fp-fullscreen, .fp-embed').on("click", this.onAdWrapperClick);
            $(window).resize(this.onScreenResize);
            $(window).on("orientationchange", this.onWindowOrientationchange);

        };
        /**
         * get angConf object and filter ads
         * @param array
         * @param item
         * @returns {*}
         */
        this.filterAdType = function (array, item) {
            var filteredItem = array.filter(function(value){
                return value.type == item;
            });

            if(filteredItem.length > 0){
                return filteredItem[0];
            }

            return false;
        };
        /**
         * on player click
         */
        this.onPlayerClick = function () {
            if(!self.videoContent){
                self.videoContent = $(self.videoContentParameter).get(0);
                self.videoContent.play();
            }
        };
        /**
         * on video request wrapper click
         */
        this.onPlayWrapperClick = function () {
            if(self.isVideoStarted == false){
                if(self.prerollAds){
                    self.adType = self.adMode.preroll;
                    self.requestAds(self.prerollAds.adTagUrl);
                    self.isVideoStarted = true;
                }
            }

            $(this).hide();
        };
        /**
         * if overlay ad showing player toggled
         */
        this.onAdWrapperClick = function () {
            if(self.adType == null){
                self.playerObject.toggle();
            }
        };
        /**
         * on screen resize, resize ads
         */
        this.onScreenResize = function () {
            var windowWidth = window.screen.width;
            var windowHeight = window.screen.height;
            if (self.adType == null && self.adsManager) {
                var size = self.getAdWrapperSize();
                if (size.viewMode == google.ima.ViewMode.FULLSCREEN) {
                    self.adsManager.resize(windowWidth, windowHeight - 40, size.viewMode);
                } else {
                    self.adsManager.resize(size.width, size.height - 40, size.viewMode);
                }
            }
        };
        /**
         * on window orientation change, for mobile device
         */
        this.onWindowOrientationchange = function () {
            var size = self.getAdWrapperSize();

            if(self.adsManager){
                if(self.adType == self.adMode.preroll || self.adType == self.adMode.postroll){
                    self.adsManager.resize(size.width, (size.height / 2) - (self.justAd.getHeight() / 2) + self.justAd.getHeight(), size.viewMode);

                } else {
                    self.adsManager.resize(size.width, size.height - 40, size.viewMode);
                }
            }
        };
        /**
         * player resume ?
         */
        this.onPlayerResume = function (e, api) {

        };
        /**
         * on player fullscreen ads resize or hide
         */
        this.onPlayerFullscreen = function (e, api) {
            if(self.fullscreenAds){
                var windowWidth = window.screen.width;
                var windowHeight = window.screen.height;
                self.isFullscreen = true;
                if(self.adsManager){
                    var size = self.getAdWrapperSize();
                    if(self.adType == self.adMode.preroll || self.adType == self.adMode.postroll){
                        self.adsManager.resize(windowWidth, (windowHeight / 2) - (self.justAd.getHeight() / 2) + self.justAd.getHeight(), size.viewMode);
                    } else {
                        self.adsManager.resize(windowWidth, windowHeight - 40, size.viewMode);
                    }
                }
            } else {
                self.hideAdContainer();
            }
        };
        /**
         * on player normal mode resize ads or show
         */
        this.onPlayerFullscreenExit = function (e, api) {
            self.isFullscreen = false;
            self.showAdContainer();
            var size = self.getAdWrapperSize();
            if(self.justAd.isLinear()){
                self.adsManager.resize(size.width, size.height, size.viewMode);
            } else {
                self.adsManager.resize(size.width, size.height - 40, size.viewMode);
            }
        };
        /**
         * on player cue point if has overlay or midroll ad this time get ad.
         */
        this.onPlayerCuepoint = function (e, api, cue) {
            if (cue.time == self.overlayAdTime) {
                if(self.overlayAds){
                    self.adType = null;
                    self.requestAds(self.overlayAds.adTagUrl);
                }
            }
            else if (cue.time == self.midrollAdTime) {
                if(self.adsManager){
                    self.adsManager.destroy();
                }
                if(self.midrollAds){
                    self.adType = self.adMode.midroll;
                    self.requestAds(self.midrollAds.adTagUrl);
                }
            }
        };
        /**
         * on player finish get postroll ad
         */
        this.onPlayerFinish = function (e, api) {
            self.isVideoStarted = false;
            if(self.adsManager){
                self.adsManager.destroy();
            }
            if(self.postrollAds){
                self.adType = self.adMode.postroll;
                self.requestAds(self.postrollAds.adTagUrl);
            }
        };
        /**
         * create ad container for ima ad
         */
        this.createAdContainer = function (joinElement) {
            var element = $("<div/>", {
                class: "adContainer",
                style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            });
            $(joinElement).prepend(element);
            $(element).on("mouseout", function (event) {
                event.stopPropagation()
            });

            return element[0];
        };
        /**
         * create play container for preroll ad request
         */
        this.createPlayContainer = function (joinElement) {
            var element = $("<div/>", {
                class: "playContainer",
                style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: inline-block; z-index: 999; cursor: pointer"
            });
            $(joinElement).prepend(element);
            $(element).on("mouseout", function (event) {
                event.stopPropagation()
            });

            return element[0];
        };
        /**
         * get video player control bar height
         */
        this.getControlBarHeight = function () {
            var container = $(".flowplayer:first"),
                hidden = !container.hasClass("is-mouseover") &&
                    !container.hasClass("fixed-controls"),
                ctrlheight;

            if (hidden) {
                container.addClass("is-mouseover");
            }
            ctrlheight = $(".fp-controls", container).css("height");
            if (hidden) {
                container.removeClass("is-mouseover");
            }

            return ctrlheight;
        };
        /**
         * show ad container
         */
        this.showAdContainer = function () {
            $(self.adWrapper).css("display", "block");
        };
        /**
         * hide ad container
         */
        this.hideAdContainer = function () {
            $(self.adWrapper).css("display", "none");
        };
        /**
         * video pause or play
         */
        this.changeVideoStatus = function (paused) {
            if(paused){
                $(self.player).addClass("is-paused").removeClass("is-playing");
            } else {
                $(self.player).removeClass("is-paused").addClass("is-playing");
            }
        };
        /**
         * ad status
         */
        this.isAdPlaying = function () {
            return self.isAdPlay;
        };
        /**
         * ad toggled
         */
        this.changeAdStatus = function () {
            if (self.isAdPaused) self.adsManager.resume();
            else self.adsManager.pause();
            self.isAdPaused = !self.isAdPaused;
            self.changeVideoStatus(self.isAdPaused);
        };
        /**
         * pause ad
         */
        this.pauseAd = function () {
            self.changeAdStatus();
        };
        /**
         * resume ad
         */
        this.resumeAd = function () {
            self.changeAdStatus();
        };
        /**
         * set ad volume
         */
        this.setVolume = function (volume) {
            if(self.adsManager){
                self.adsManager.setVolume(volume)
            }
        };
        /**
         * get ad wrapper elemet size for ad resize
         */
        this.getAdWrapperSize = function () {
            var adContainerParent = $(self.adWrapper).parent(),
                size = {};

            size.width = adContainerParent.width();
            size.height = adContainerParent.height();
            if(self.isFullscreen){
                size.viewMode = google.ima.ViewMode.FULLSCREEN;
            } else {
                size.viewMode = google.ima.ViewMode.NORMAL;
            }
            return size
        };
        /**
         * on ima error
         */
        this.onAdError = function(adErrorEvent) {
            // Handle the error logging and destroy the AdsManager
            console.log(adErrorEvent.getError());
            if(self.adsManager){
                self.adsManager.destroy();
            }
            if(self.adType == self.adMode.preroll){
                if(self.isMobile){
                    self.playerObject.play();
                } else {
                    self.videoContent.play();
                }
            }
            else if(self.adType == self.adMode.postroll){
                $('.playContainer').show();
            }
            self.playerObject.conf.keyboard = true;
            $('.fp-ui .fp-fullscreen, .fp-ui .fp-embed').show();
            self.hideAdContainer();
        };
        /**
         *
         */
        this.contentEndedListener = function() {
            self.adsLoader.contentComplete();
        };
        /**
         * request ima ad
         */
        this.requestAds = function (adTagUrl) {
            var adsRequest = new google.ima.AdsRequest;
            adsRequest.adTagUrl = adTagUrl;
            adsRequest.linearAdSlotWidth = self.wrapperSize.width;
            adsRequest.linearAdSlotHeight = self.wrapperSize.height;
            adsRequest.nonLinearAdSlotWidth = self.wrapperSize.width;
            adsRequest.nonLinearAdSlotHeight = self.wrapperSize.height - 40;
            if(self.adType !== null){
                adsRequest.forceNonLinearFullSlot = true;
            }
            self.adsLoader.requestAds(adsRequest)
        };
        /**
         * on ima ads manager loaded show ad or catch error
         */
        this.onAdsManagerLoaded = function(adsManagerLoadedEvent) {
            //console.log("adsmanagaer loaded");

            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

            self.adsManager = adsManagerLoadedEvent.getAdsManager(
                self.videoContentElement, adsRenderingSettings);  // See API reference for contentPlayback

            // Add listeners to the required events.
            self.adsManager.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                self.onAdError);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
                self.onContentPauseRequested);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
                self.onContentResumeRequested);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.SKIPPED,
                self.onAdSkipped);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.COMPLETE,
                self.onAdComplete);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.STARTED,
                self.onAdStarted);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.CLICK,
                self.onAdClick);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.USER_CLOSE,
                self.onAdUserClose);
            self.adsManager.addEventListener(
                google.ima.AdEvent.Type.LOADED,
                self.onAdLoaded);

            try {
                self.showAdContainer();
                var size = self.getAdWrapperSize();
                // Initialize the ads manager. Ad rules playlist will start at this time.
                self.adsManager.init(size.width, size.height, size.viewMode);
                // Call start to show ads. Single video and overlay ads will
                // start at this time; this call will be ignored for ad rules, as ad rules
                // ads start when the adsManager is initialized.
                self.adsManager.start();
            } catch (adError) {
                // An error may be thrown if there was a problem with the VAST response.
            }
        };
        /**
         * pause video content and show ad
         */
        this.onContentPauseRequested = function() {
            // This function is where you should setup UI for showing ads (e.g.
            // display ad timer countdown, disable seeking, etc.)
            self.videoContentElement.off('ended', self.contentEndedListener);
            if(self.isMobile){
                self.playerObject.pause();
            } else {
                self.videoContent.pause();
            }
            //console.log("content pause");
        };
        /**
         * play video content and hide ad
         */
        this.onContentResumeRequested = function() {
            // This function is where you should ensure that your UI is ready
            // to play content.
            self.videoContentElement.on('ended', self.contentEndedListener);
            if(self.adType == self.adMode.postroll){
                self.changeVideoStatus(true);
                self.onAdUserClose();
            } else {
                if(self.isMobile){
                    if(self.isAndroid){
                        $(".fp-ui").trigger("click");
                    }
                    self.playerObject.play();
                } else {
                    self.videoContent.play();
                }
            }
            //console.log("content resume");
        };
        /**
         * on user close ad
         */
        this.onAdUserClose = function() {
            if(self.adType == self.adMode.preroll || self.adType == self.adMode.midroll){
                self.videoContentElement.on('ended', self.contentEndedListener);
                if(self.isMobile){
                    if(self.isAndroid){
                        $(".fp-ui").trigger("click");
                    }
                    self.playerObject.play();
                } else {
                    self.videoContent.play();
                }
                if(self.adsManager){
                    self.adsManager.destroy();
                }
                $('.adBackground').hide();
                $('.adContainer').find('div').css('z-index', 0);
                self.playerObject.conf.keyboard = true;
                self.adType = null;
                $(self.flowplayerUI).show();
            }
            else if (self.adType == self.adMode.postroll){
                self.videoContentElement.on('ended', self.contentEndedListener);
                if(self.adsManager){
                    self.adsManager.destroy();
                }
                $('.adBackground').hide();
                $('.adContainer').find('div').css('z-index', 0);
                self.playerObject.conf.keyboard = false;
                $(self.flowplayerUI).show();
                $('.playContainer').show();
            }
            self.hideAdContainer();
            self.isAdPlay = false;
        };
        /**
         * clicked ad open new tab and pause video content (for nonlinear ad)
         */
        this.onAdClick = function() {
            //self.videoContent.pause();
        };
        /**
         * skipped ad and video content play
         */
        this.onAdSkipped = function() {
            self.adsManager.stop();
            self.hideAdContainer();
            self.isAdPlay = false;
            self.playerObject.conf.keyboard = true;
            $(self.flowplayerUI).show();
            if(self.adType == self.adMode.postroll){
                self.playerObject.conf.keyboard = false;
            }
        };
        /**
         * on ad complete play video content
         */
        this.onAdComplete = function() {
            self.adsManager.stop();
            self.hideAdContainer();
            self.isAdPlay = false;
            self.playerObject.conf.keyboard = true;
            $(self.flowplayerUI).show();
            if(self.adType == self.adMode.postroll){
                self.playerObject.conf.keyboard = false;
            }
        };
        /**
         * on ad started resize ad or prepare ad background
         */
        this.onAdStarted = function(adEvent) {
            if(self.adType == self.adMode.preroll || self.adType == self.adMode.postroll || self.adType == self.adMode.midroll){
                self.playerObject.pause();
                $(self.flowplayerUI).hide();
                self.playerObject.conf.keyboard = false;
                self.setVolume(self.playerObject.conf.volume);
            }

            self.justAd = adEvent.getAd();
            if(!self.justAd.isLinear()){

                var size = self.getAdWrapperSize();

                if(self.adType == self.adMode.preroll || self.adType == self.adMode.postroll || self.adType == self.adMode.midroll){

                    setTimeout(function(){
                        if(self.adType == self.adMode.preroll || self.adType == self.adMode.postroll){
                            self.onAdUserClose();
                        }
                    }, 10000);

                    self.adsManager.resize(size.width, (size.height / 2) - (self.justAd.getHeight() / 2) + self.justAd.getHeight(), size.viewMode);

                    var adContainer = $('.adContainer');
                    var adBackground = $('.adBackground');
                    if(adBackground.length < 1){
                        var element = $("<div/>", {
                            class: "adBackground",
                            style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: white; opacity: 0.8;"
                        });
                        $(element).on("mouseout", function (event) {
                            event.stopPropagation()
                        });
                        adContainer.prepend(element);
                        adContainer.find('div').css('z-index', 9999);
                    } else {
                        adBackground.show();
                        adContainer.find('div').css('z-index', 9999);
                    }
                } else {
                    self.adsManager.resize(size.width, size.height - 40, size.viewMode);
                }
            } else {
                self.isAdPlay = true;
                self.isAdPaused = false;
                self.changeVideoStatus(self.isAdPaused);
            }
        };
        /**
         * on ad loaded from ima
         * @param adEvent
         */
        this.onAdLoaded = function(adEvent) {
        };
    };

    var engineImpl = function (player, root) {

        var api = common.findDirect('video', root)[0] || common.find('.fp-player > video', root)[0],
            track = common.find("track", api)[0],
            timer,
            volumeLevel;

        var engine = {
            engineName: engineImpl.engineName,

            pick: function(sources) {
                if (flowplayer.support.video) {
                    if (player.conf.videoTypePreference) {
                        var mp4source = findFromSourcesByType(sources, player.conf.videoTypePreference);
                        if (mp4source) return mp4source;
                    }

                    for (var i = 0, source; i < sources.length; i++) {
                        if (canPlay(sources[i].type)) return sources[i];
                    }
                }
            },

            load: function(video) {
                var created = false, container = common.find('.fp-player', root)[0], reload = false;
                if (player.conf.splash && !api) {
                    api = createVideoTag(video);
                    common.prepend(container, api);
                    created = true;
                } else if (!api) {
                    api = createVideoTag(video, !!video.autoplay || !!player.conf.autoplay, player.conf.clip.preload || 'metadata', false);
                    common.prepend(container, api);
                    created = true;
                } else {
                    ClassList(api).add('fp-engine');
                    common.find('source,track', api).forEach(common.removeNode);
                    if (!player.conf.nativesubtitles) common.attr(api, 'crossorigin', false);
                    reload = api.src === video.src;
                }
                if (!flowplayer.support.inlineVideo) {
                    common.css(api, {
                        position: 'absolute',
                        top: '-9999em'
                    });
                }
                //TODO subtitles support

                // IE does not fire delegated timeupdate events
                bean.off(api, 'timeupdate', common.noop);
                bean.on(api, 'timeupdate', common.noop);

                common.prop(api, 'loop', !!(video.loop || player.conf.loop));

                if (typeof volumeLevel !== 'undefined') {
                    api.volume = volumeLevel;
                }

                if (player.video.src && video.src != player.video.src || video.index) common.attr(api, 'autoplay', 'autoplay');
                api.src = video.src;
                api.type = video.type;

                listen(api, common.find("source", api).concat(api), video);

                // iPad (+others?) demands load()
                if (player.conf.clip.preload != 'none' && video.type != "mpegurl" || !flowplayer.support.zeropreload || !flowplayer.support.dataload) api.load();
                if (created || reload) api.load();
                if (api.paused && (video.autoplay || player.conf.autoplay)) api.play();
            },

            resume: function () {
                // how this engine resumes playback
                //console.log("resume called");
                if (api) {
                    if (angApi.isAdPlaying()) {
                        angApi.resumeAd();
                    } else {
                        currentPos = api.ready ? api.video.time : 0;
                        if (currentPos == 0) {
                            api.play();
                        } else {
                            api.resume();
                        }
                    }
                }
            },

            pause: function () {
                // how this engine resumes playback
                //console.log("pause called");
                if (api) {
                    if (angApi.isAdPlaying()) {
                        angApi.pauseAd();
                    } else {
                        api.pause();
                    }
                }
            },

            speed: function(val) {
                api.playbackRate = val;
            },

            seek: function(time) {
                try {
                    var pausedState = player.paused;
                    api.currentTime = time;
                    if (pausedState) api.pause();
                } catch (ignored) {}
            },

            volume: function(level) {
                volumeLevel = level;
                if (api) {
                    if(angApi.isAdPlaying()){
                        angApi.setVolume(level);
                    } else {
                        api.volume = level;
                    }
                }
            },

            unload: function() {
                common.find('video.fp-engine', root).forEach(common.removeNode);
                if (!flowplayer.support.cachedVideoTag) videoTagCache = null;
                timer = clearInterval(timer);
                api = 0;
            }

            /* etc. */

        };

        function listen(api, sources, video) {
            // listen only once
            var instanceId = root.getAttribute('data-flowplayer-instance-id');

            if (api.listeners && api.listeners.hasOwnProperty(instanceId)) {
                api.listeners[instanceId] = video;
                return;
            }
            (api.listeners || (api.listeners = {}))[instanceId] = video;

            bean.on(sources, 'error', function(e) {
                try {
                    if (canPlay(e.target.getAttribute('type'))) {
                        player.trigger("error", [player, { code: 4, video: extend(video, {src: api.src, url: api.src}) }]);
                    }
                } catch (er) {
                    // Most likely: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
                }
            });

            player.on('shutdown', function() {
                bean.off(sources);
            });

            Object.keys(EVENTS).forEach(function(type) {
                var flow = EVENTS[type];
                if (!flow) return;
                root.addEventListener(type, function(e) {
                    video = api.listeners[instanceId];
                    if (!e.target || !ClassList(e.target).contains('fp-engine')) return;

                    if (player.conf.debug && !/progress/.test(flow)) console.log(type, "->", flow, e);

                    // no events if player not ready
                    if (!player.ready && !/ready|error/.test(flow) || !flow || !common.find('video', root).length) { return; }

                    var arg, vtype;

                    if (flow === 'unload') { //Call player unload
                        player.unload();
                        return;
                    }

                    var triggerEvent = function() {
                        player.trigger(flow, [player, arg]);
                    };

                    switch (flow) {

                        case "ready":

                            arg = extend(video, {
                                duration: api.duration,
                                width: api.videoWidth,
                                height: api.videoHeight,
                                url: api.currentSrc,
                                src: api.currentSrc
                            });

                            try {
                                arg.seekable = !player.conf.live && /mpegurl/i.test(video ? (video.type || '') : '') && api.duration || api.seekable && api.seekable.end(null);

                            } catch (ignored) {}

                            // buffer
                            timer = timer || setInterval(function() {

                                try {
                                    arg.buffer = api.buffered.end(null);

                                } catch (ignored) {}

                                if (arg.buffer) {
                                    if (round(arg.buffer, 1000) < round(arg.duration, 1000) && !arg.buffered) {
                                        player.trigger("buffer", e);

                                    } else if (!arg.buffered) {
                                        arg.buffered = true;
                                        player.trigger("buffer", e).trigger("buffered", e);
                                        clearInterval(timer);
                                        timer = 0;
                                    }
                                }

                            }, 250);

                            if (!player.conf.live && !arg.duration && !flowplayer.support.hlsDuration && type === "loadeddata") {
                                var durationChanged = function() {
                                    arg.duration = api.duration;
                                    try {
                                        arg.seekable = api.seekable && api.seekable.end(null);

                                    } catch (ignored) {}
                                    triggerEvent();
                                    api.removeEventListener('durationchange', durationChanged);
                                    ClassList(root).remove('is-live');
                                };
                                api.addEventListener('durationchange', durationChanged);

                                // Ugly hack to handle broken Android devices
                                var timeUpdated = function() {
                                    if (!player.ready && !api.duration) { // No duration even though the video already plays
                                        arg.duration = 0;
                                        ClassList(root).add('is-live'); // Make UI believe it's live
                                        triggerEvent();
                                    }
                                    api.removeEventListener('timeupdate', timeUpdated);
                                };
                                api.addEventListener('timeupdate', timeUpdated);
                                return;
                            }

                            break;

                        case "progress": case "seek":

                        var dur = player.video.duration;

                        if (api.currentTime > 0 || player.live) {
                            arg = Math.max(api.currentTime, 0);

                        } else if (flow == 'progress') {
                            return;
                        }
                        break;


                        case "speed":
                            arg = round(api.playbackRate);
                            break;

                        case "volume":
                            arg = round(api.volume);
                            break;

                        case "error":
                            try {
                                arg = (e.srcElement || e.originalTarget).error;
                                arg.video = extend(video, {src: api.src, url: api.src});
                            } catch (er) {
                                // Most likely https://bugzilla.mozilla.org/show_bug.cgi?id=208427
                                return;
                            }
                    }

                    triggerEvent();


                }, true);

            });

        }

        return engine;
    };

    engineImpl.canPlay = function(type) {
        return flowplayer.support.video && canPlay(type);
    };
    engineImpl.engineName = "angengine";

    flowplayer.engines.push(engineImpl);

    var angApi = new imaPlugin.AngPlugin();
    var playerElemAng = conf.videoContent;
    var ads = conf.ads;

    angApi.initializePlugin(playerElemAng, ads);
};