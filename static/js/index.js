/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = window,
    e$5 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    s$4 = Symbol(),
    n$5 = new WeakMap;
class o$4 {
    constructor(t, e, n) {
        if (this._$cssResult$ = !0, n !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if (e$5 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = n$5.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && n$5.set(s, t));
        }
        return t
    }
    toString() {
        return this.cssText
    }
}
const r$3 = t => new o$4("string" == typeof t ? t : t + "", void 0, s$4),
    i$3 = (t, ...e) => {
        const n = 1 === t.length ? t[0] : e.reduce(((e, s, n) => e + (t => {
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
        })(s) + t[n + 1]), t[0]);
        return new o$4(n, t, s$4)
    },
    S$2 = (s, n) => {
        e$5 ? s.adoptedStyleSheets = n.map((t => t instanceof CSSStyleSheet ? t : t.styleSheet)) : n.forEach((e => {
            const n = document.createElement("style"),
                o = t$3.litNonce;
            void 0 !== o && n.setAttribute("nonce", o), n.textContent = e.cssText, s.appendChild(n);
        }));
    },
    c$2 = e$5 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
        let e = "";
        for (const s of t.cssRules) e += s.cssText;
        return r$3(e)
    })(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$3;
const e$4 = window,
    r$2 = e$4.trustedTypes,
    h$2 = r$2 ? r$2.emptyScript : "",
    o$3 = e$4.reactiveElementPolyfillSupport,
    n$4 = {
        toAttribute(t, i) {
            switch (i) {
                case Boolean:
                    t = t ? h$2 : null;
                    break;
                case Object:
                case Array:
                    t = null == t ? t : JSON.stringify(t);
            }
            return t
        },
        fromAttribute(t, i) {
            let s = t;
            switch (i) {
                case Boolean:
                    s = null !== t;
                    break;
                case Number:
                    s = null === t ? null : Number(t);
                    break;
                case Object:
                case Array:
                    try {
                        s = JSON.parse(t);
                    } catch (t) {
                        s = null;
                    }
            }
            return s
        }
    },
    a$2 = (t, i) => i !== t && (i == i || t == t),
    l$3 = {
        attribute: !0,
        type: String,
        converter: n$4,
        reflect: !1,
        hasChanged: a$2
    };
class d$2 extends HTMLElement {
    constructor() {
        super(), this._$Ei = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
    }
    static addInitializer(t) {
        var i;
        this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : this.h = []).push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach(((i, s) => {
            const e = this._$Ep(s, i);
            void 0 !== e && (this._$Ev.set(e, s), t.push(e));
        })), t
    }
    static createProperty(t, i = l$3) {
        if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s = "symbol" == typeof t ? Symbol() : "__" + t,
                e = this.getPropertyDescriptor(t, s, i);
            void 0 !== e && Object.defineProperty(this.prototype, t, e);
        }
    }
    static getPropertyDescriptor(t, i, s) {
        return {
            get() {
                return this[i]
            },
            set(e) {
                const r = this[t];
                this[i] = e, this.requestUpdate(t, r, s);
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || l$3
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return !1;
        this.finalized = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), void 0 !== t.h && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
            const t = this.properties,
                i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
            for (const s of i) this.createProperty(s, t[s]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0
    }
    static finalizeStyles(i) {
        const s = [];
        if (Array.isArray(i)) {
            const e = new Set(i.flat(1 / 0).reverse());
            for (const i of e) s.unshift(c$2(i));
        } else void 0 !== i && s.push(c$2(i));
        return s
    }
    static _$Ep(t, i) {
        const s = i.attribute;
        return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0
    }
    u() {
        var t;
        this._$E_ = new Promise((t => this.enableUpdating = t)), this._$AL = new Map, this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach((t => t(this)));
    }
    addController(t) {
        var i, s;
        (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
    }
    removeController(t) {
        var i;
        null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
    }
    _$Eg() {
        this.constructor.elementProperties.forEach(((t, i) => {
            this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
        }));
    }
    createRenderRoot() {
        var t;
        const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return S$2(s, this.constructor.elementStyles), s
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach((t => {
            var i;
            return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t)
        }));
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t;
        null === (t = this._$ES) || void 0 === t || t.forEach((t => {
            var i;
            return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t)
        }));
    }
    attributeChangedCallback(t, i, s) {
        this._$AK(t, s);
    }
    _$EO(t, i, s = l$3) {
        var e;
        const r = this.constructor._$Ep(t, s);
        if (void 0 !== r && !0 === s.reflect) {
            const h = (void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : n$4).toAttribute(i, s.type);
            this._$El = t, null == h ? this.removeAttribute(r) : this.setAttribute(r, h), this._$El = null;
        }
    }
    _$AK(t, i) {
        var s;
        const e = this.constructor,
            r = e._$Ev.get(t);
        if (void 0 !== r && this._$El !== r) {
            const t = e.getPropertyOptions(r),
                h = "function" == typeof t.converter ? {
                    fromAttribute: t.converter
                } : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute) ? t.converter : n$4;
            this._$El = r, this[r] = h.fromAttribute(i, t.type), this._$El = null;
        }
    }
    requestUpdate(t, i, s) {
        let e = !0;
        void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || a$2)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ei && (this._$Ei.forEach(((t, i) => this[i] = t)), this._$Ei = void 0);
        let i = !1;
        const s = this._$AL;
        try {
            i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach((t => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t)
            })), this.update(s)) : this._$Ek();
        } catch (t) {
            throw i = !1, this._$Ek(), t
        }
        i && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        var i;
        null === (i = this._$ES) || void 0 === i || i.forEach((t => {
            var i;
            return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t)
        })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$E_
    }
    shouldUpdate(t) {
        return !0
    }
    update(t) {
        void 0 !== this._$EC && (this._$EC.forEach(((t, i) => this._$EO(i, this[i], t))), this._$EC = void 0), this._$Ek();
    }
    updated(t) {}
    firstUpdated(t) {}
}
d$2.finalized = !0, d$2.elementProperties = new Map, d$2.elementStyles = [], d$2.shadowRootOptions = {
    mode: "open"
}, null == o$3 || o$3({
    ReactiveElement: d$2
}), (null !== (s$3 = e$4.reactiveElementVersions) && void 0 !== s$3 ? s$3 : e$4.reactiveElementVersions = []).push("1.6.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;
const i$2 = window,
    s$2 = i$2.trustedTypes,
    e$3 = s$2 ? s$2.createPolicy("lit-html", {
        createHTML: t => t
    }) : void 0,
    o$2 = `lit$${(Math.random() + "").slice(9)}$`,
    n$3 = "?" + o$2,
    l$2 = `<${n$3}>`,
    h$1 = document,
    r$1 = (t = "") => h$1.createComment(t),
    d$1 = t => null === t || "object" != typeof t && "function" != typeof t,
    u$1 = Array.isArray,
    c$1 = t => u$1(t) || "function" == typeof(null == t ? void 0 : t[Symbol.iterator]),
    v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    a$1 = /-->/g,
    f$1 = />/g,
    _$1 = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"),
    m$1 = /'/g,
    p$1 = /"/g,
    $$1 = /^(?:script|style|textarea|title)$/i,
    x$1 = Symbol.for("lit-noChange"),
    b$1 = Symbol.for("lit-nothing"),
    T$1 = new WeakMap,
    A$1 = h$1.createTreeWalker(h$1, 129, null, !1),
    E$1 = (t, i) => {
        const s = t.length - 1,
            n = [];
        let h, r = 2 === i ? "<svg>" : "",
            d = v$1;
        for (let i = 0; i < s; i++) {
            const s = t[i];
            let e, u, c = -1,
                g = 0;
            for (; g < s.length && (d.lastIndex = g, u = d.exec(s), null !== u);) g = d.lastIndex, d === v$1 ? "!--" === u[1] ? d = a$1 : void 0 !== u[1] ? d = f$1 : void 0 !== u[2] ? ($$1.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = _$1) : void 0 !== u[3] && (d = _$1) : d === _$1 ? ">" === u[0] ? (d = null != h ? h : v$1, c = -1) : void 0 === u[1] ? c = -2 : (c = d.lastIndex - u[2].length, e = u[1], d = void 0 === u[3] ? _$1 : '"' === u[3] ? p$1 : m$1) : d === p$1 || d === m$1 ? d = _$1 : d === a$1 || d === f$1 ? d = v$1 : (d = _$1, h = void 0);
            const y = d === _$1 && t[i + 1].startsWith("/>") ? " " : "";
            r += d === v$1 ? s + l$2 : c >= 0 ? (n.push(e), s.slice(0, c) + "$lit$" + s.slice(c) + o$2 + y) : s + o$2 + (-2 === c ? (n.push(void 0), i) : y);
        }
        const u = r + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
        if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
        return [void 0 !== e$3 ? e$3.createHTML(u) : u, n]
    };
class C$1 {
    constructor({
        strings: t,
        _$litType$: i
    }, e) {
        let l;
        this.parts = [];
        let h = 0,
            d = 0;
        const u = t.length - 1,
            c = this.parts,
            [v, a] = E$1(t, i);
        if (this.el = C$1.createElement(v, e), A$1.currentNode = this.el.content, 2 === i) {
            const t = this.el.content,
                i = t.firstChild;
            i.remove(), t.append(...i.childNodes);
        }
        for (; null !== (l = A$1.nextNode()) && c.length < u;) {
            if (1 === l.nodeType) {
                if (l.hasAttributes()) {
                    const t = [];
                    for (const i of l.getAttributeNames())
                        if (i.endsWith("$lit$") || i.startsWith(o$2)) {
                            const s = a[d++];
                            if (t.push(i), void 0 !== s) {
                                const t = l.getAttribute(s.toLowerCase() + "$lit$").split(o$2),
                                    i = /([.?@])?(.*)/.exec(s);
                                c.push({
                                    type: 1,
                                    index: h,
                                    name: i[2],
                                    strings: t,
                                    ctor: "." === i[1] ? M$1 : "?" === i[1] ? k$1 : "@" === i[1] ? H$1 : S$1
                                });
                            } else c.push({
                                type: 6,
                                index: h
                            });
                        }
                    for (const i of t) l.removeAttribute(i);
                }
                if ($$1.test(l.tagName)) {
                    const t = l.textContent.split(o$2),
                        i = t.length - 1;
                    if (i > 0) {
                        l.textContent = s$2 ? s$2.emptyScript : "";
                        for (let s = 0; s < i; s++) l.append(t[s], r$1()), A$1.nextNode(), c.push({
                            type: 2,
                            index: ++h
                        });
                        l.append(t[i], r$1());
                    }
                }
            } else if (8 === l.nodeType)
                if (l.data === n$3) c.push({
                    type: 2,
                    index: h
                });
                else {
                    let t = -1;
                    for (; - 1 !== (t = l.data.indexOf(o$2, t + 1));) c.push({
                        type: 7,
                        index: h
                    }), t += o$2.length - 1;
                }
            h++;
        }
    }
    static createElement(t, i) {
        const s = h$1.createElement("template");
        return s.innerHTML = t, s
    }
}

function P$1(t, i, s = t, e) {
    var o, n, l, h;
    if (i === x$1) return i;
    let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
    const u = d$1(i) ? void 0 : i._$litDirective$;
    return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = P$1(t, r._$AS(t, i.values), r, e)), i
}
class V$1 {
    constructor(t, i) {
        this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    v(t) {
        var i;
        const {
            el: {
                content: s
            },
            parts: e
        } = this._$AD, o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : h$1).importNode(s, !0);
        A$1.currentNode = o;
        let n = A$1.nextNode(),
            l = 0,
            r = 0,
            d = e[0];
        for (; void 0 !== d;) {
            if (l === d.index) {
                let i;
                2 === d.type ? i = new N$1(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new I$1(n, this, t)), this.u.push(i), d = e[++r];
            }
            l !== (null == d ? void 0 : d.index) && (n = A$1.nextNode(), l++);
        }
        return o
    }
    p(t) {
        let i = 0;
        for (const s of this.u) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class N$1 {
    constructor(t, i, s, e) {
        var o;
        this.type = 2, this._$AH = b$1, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cm = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
    }
    get _$AU() {
        var t, i;
        return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cm
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(t, i = this) {
        t = P$1(this, t, i), d$1(t) ? t === b$1 || null == t || "" === t ? (this._$AH !== b$1 && this._$AR(), this._$AH = b$1) : t !== this._$AH && t !== x$1 && this.g(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : c$1(t) ? this.k(t) : this.g(t);
    }
    O(t, i = this._$AB) {
        return this._$AA.parentNode.insertBefore(t, i)
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    g(t) {
        this._$AH !== b$1 && d$1(this._$AH) ? this._$AA.nextSibling.data = t : this.T(h$1.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        var i;
        const {
            values: s,
            _$litType$: e
        } = t, o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C$1.createElement(e.h, this.options)), e);
        if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.p(s);
        else {
            const t = new V$1(o, this),
                i = t.v(this.options);
            t.p(s), this.T(i), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = T$1.get(t.strings);
        return void 0 === i && T$1.set(t.strings, i = new C$1(t)), i
    }
    k(t) {
        u$1(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const o of t) e === i.length ? i.push(s = new N$1(this.O(r$1()), this.O(r$1()), this, this.options)) : s = i[e], s._$AI(o), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        var s;
        for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        var i;
        void 0 === this._$AM && (this._$Cm = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }
}
class S$1 {
    constructor(t, i, s, e, o) {
        this.type = 1, this._$AH = b$1, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = b$1;
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t, i = this, s, e) {
        const o = this.strings;
        let n = !1;
        if (void 0 === o) t = P$1(this, t, i, 0), n = !d$1(t) || t !== this._$AH && t !== x$1, n && (this._$AH = t);
        else {
            const e = t;
            let l, h;
            for (t = o[0], l = 0; l < o.length - 1; l++) h = P$1(this, e[s + l], i, l), h === x$1 && (h = this._$AH[l]), n || (n = !d$1(h) || h !== this._$AH[l]), h === b$1 ? t = b$1 : t !== b$1 && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
        }
        n && !e && this.j(t);
    }
    j(t) {
        t === b$1 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class M$1 extends S$1 {
    constructor() {
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === b$1 ? void 0 : t;
    }
}
const R$1 = s$2 ? s$2.emptyScript : "";
class k$1 extends S$1 {
    constructor() {
        super(...arguments), this.type = 4;
    }
    j(t) {
        t && t !== b$1 ? this.element.setAttribute(this.name, R$1) : this.element.removeAttribute(this.name);
    }
}
class H$1 extends S$1 {
    constructor(t, i, s, e, o) {
        super(t, i, s, e, o), this.type = 5;
    }
    _$AI(t, i = this) {
        var s;
        if ((t = null !== (s = P$1(this, t, i, 0)) && void 0 !== s ? s : b$1) === x$1) return;
        const e = this._$AH,
            o = t === b$1 && e !== b$1 || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
            n = t !== b$1 && (e === b$1 || o);
        o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        var i, s;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
    }
}
class I$1 {
    constructor(t, i, s) {
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t) {
        P$1(this, t);
    }
}
const z$1 = i$2.litHtmlPolyfillSupport;
null == z$1 || z$1(C$1, N$1), (null !== (t$2 = i$2.litHtmlVersions) && void 0 !== t$2 ? t$2 : i$2.litHtmlVersions = []).push("2.6.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = window,
    s$1 = i$1.trustedTypes,
    e$2 = s$1 ? s$1.createPolicy("lit-html", {
        createHTML: t => t
    }) : void 0,
    o$1 = `lit$${(Math.random() + "").slice(9)}$`,
    n$2 = "?" + o$1,
    l$1 = `<${n$2}>`,
    h = document,
    r = (t = "") => h.createComment(t),
    d = t => null === t || "object" != typeof t && "function" != typeof t,
    u = Array.isArray,
    c = t => u(t) || "function" == typeof(null == t ? void 0 : t[Symbol.iterator]),
    v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    a = /-->/g,
    f = />/g,
    _ = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"),
    m = /'/g,
    p = /"/g,
    $ = /^(?:script|style|textarea|title)$/i,
    g = t => (i, ...s) => ({
        _$litType$: t,
        strings: i,
        values: s
    }),
    y = g(1),
    x = Symbol.for("lit-noChange"),
    b = Symbol.for("lit-nothing"),
    T = new WeakMap,
    A = h.createTreeWalker(h, 129, null, !1),
    E = (t, i) => {
        const s = t.length - 1,
            n = [];
        let h, r = 2 === i ? "<svg>" : "",
            d = v;
        for (let i = 0; i < s; i++) {
            const s = t[i];
            let e, u, c = -1,
                g = 0;
            for (; g < s.length && (d.lastIndex = g, u = d.exec(s), null !== u);) g = d.lastIndex, d === v ? "!--" === u[1] ? d = a : void 0 !== u[1] ? d = f : void 0 !== u[2] ? ($.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = _) : void 0 !== u[3] && (d = _) : d === _ ? ">" === u[0] ? (d = null != h ? h : v, c = -1) : void 0 === u[1] ? c = -2 : (c = d.lastIndex - u[2].length, e = u[1], d = void 0 === u[3] ? _ : '"' === u[3] ? p : m) : d === p || d === m ? d = _ : d === a || d === f ? d = v : (d = _, h = void 0);
            const y = d === _ && t[i + 1].startsWith("/>") ? " " : "";
            r += d === v ? s + l$1 : c >= 0 ? (n.push(e), s.slice(0, c) + "$lit$" + s.slice(c) + o$1 + y) : s + o$1 + (-2 === c ? (n.push(void 0), i) : y);
        }
        const u = r + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
        if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
        return [void 0 !== e$2 ? e$2.createHTML(u) : u, n]
    };
class C {
    constructor({
        strings: t,
        _$litType$: i
    }, e) {
        let l;
        this.parts = [];
        let h = 0,
            d = 0;
        const u = t.length - 1,
            c = this.parts,
            [v, a] = E(t, i);
        if (this.el = C.createElement(v, e), A.currentNode = this.el.content, 2 === i) {
            const t = this.el.content,
                i = t.firstChild;
            i.remove(), t.append(...i.childNodes);
        }
        for (; null !== (l = A.nextNode()) && c.length < u;) {
            if (1 === l.nodeType) {
                if (l.hasAttributes()) {
                    const t = [];
                    for (const i of l.getAttributeNames())
                        if (i.endsWith("$lit$") || i.startsWith(o$1)) {
                            const s = a[d++];
                            if (t.push(i), void 0 !== s) {
                                const t = l.getAttribute(s.toLowerCase() + "$lit$").split(o$1),
                                    i = /([.?@])?(.*)/.exec(s);
                                c.push({
                                    type: 1,
                                    index: h,
                                    name: i[2],
                                    strings: t,
                                    ctor: "." === i[1] ? M : "?" === i[1] ? k : "@" === i[1] ? H : S
                                });
                            } else c.push({
                                type: 6,
                                index: h
                            });
                        }
                    for (const i of t) l.removeAttribute(i);
                }
                if ($.test(l.tagName)) {
                    const t = l.textContent.split(o$1),
                        i = t.length - 1;
                    if (i > 0) {
                        l.textContent = s$1 ? s$1.emptyScript : "";
                        for (let s = 0; s < i; s++) l.append(t[s], r()), A.nextNode(), c.push({
                            type: 2,
                            index: ++h
                        });
                        l.append(t[i], r());
                    }
                }
            } else if (8 === l.nodeType)
                if (l.data === n$2) c.push({
                    type: 2,
                    index: h
                });
                else {
                    let t = -1;
                    for (; - 1 !== (t = l.data.indexOf(o$1, t + 1));) c.push({
                        type: 7,
                        index: h
                    }), t += o$1.length - 1;
                }
            h++;
        }
    }
    static createElement(t, i) {
        const s = h.createElement("template");
        return s.innerHTML = t, s
    }
}

function P(t, i, s = t, e) {
    var o, n, l, h;
    if (i === x) return i;
    let r = void 0 !== e ? null === (o = s._$Co) || void 0 === o ? void 0 : o[e] : s._$Cl;
    const u = d(i) ? void 0 : i._$litDirective$;
    return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Co) && void 0 !== l ? l : h._$Co = [])[e] = r : s._$Cl = r), void 0 !== r && (i = P(t, r._$AS(t, i.values), r, e)), i
}
class V {
    constructor(t, i) {
        this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    v(t) {
        var i;
        const {
            el: {
                content: s
            },
            parts: e
        } = this._$AD, o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : h).importNode(s, !0);
        A.currentNode = o;
        let n = A.nextNode(),
            l = 0,
            r = 0,
            d = e[0];
        for (; void 0 !== d;) {
            if (l === d.index) {
                let i;
                2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new I(n, this, t)), this.u.push(i), d = e[++r];
            }
            l !== (null == d ? void 0 : d.index) && (n = A.nextNode(), l++);
        }
        return o
    }
    p(t) {
        let i = 0;
        for (const s of this.u) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class N {
    constructor(t, i, s, e) {
        var o;
        this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cm = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
    }
    get _$AU() {
        var t, i;
        return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cm
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(t, i = this) {
        t = P(this, t, i), d(t) ? t === b || null == t || "" === t ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== x && this.g(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : c(t) ? this.k(t) : this.g(t);
    }
    O(t, i = this._$AB) {
        return this._$AA.parentNode.insertBefore(t, i)
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    g(t) {
        this._$AH !== b && d(this._$AH) ? this._$AA.nextSibling.data = t : this.T(h.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        var i;
        const {
            values: s,
            _$litType$: e
        } = t, o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e);
        if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.p(s);
        else {
            const t = new V(o, this),
                i = t.v(this.options);
            t.p(s), this.T(i), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = T.get(t.strings);
        return void 0 === i && T.set(t.strings, i = new C(t)), i
    }
    k(t) {
        u(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const o of t) e === i.length ? i.push(s = new N(this.O(r()), this.O(r()), this, this.options)) : s = i[e], s._$AI(o), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        var s;
        for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        var i;
        void 0 === this._$AM && (this._$Cm = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }
}
class S {
    constructor(t, i, s, e, o) {
        this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = b;
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t, i = this, s, e) {
        const o = this.strings;
        let n = !1;
        if (void 0 === o) t = P(this, t, i, 0), n = !d(t) || t !== this._$AH && t !== x, n && (this._$AH = t);
        else {
            const e = t;
            let l, h;
            for (t = o[0], l = 0; l < o.length - 1; l++) h = P(this, e[s + l], i, l), h === x && (h = this._$AH[l]), n || (n = !d(h) || h !== this._$AH[l]), h === b ? t = b : t !== b && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
        }
        n && !e && this.j(t);
    }
    j(t) {
        t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class M extends S {
    constructor() {
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === b ? void 0 : t;
    }
}
const R = s$1 ? s$1.emptyScript : "";
class k extends S {
    constructor() {
        super(...arguments), this.type = 4;
    }
    j(t) {
        t && t !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
}
class H extends S {
    constructor(t, i, s, e, o) {
        super(t, i, s, e, o), this.type = 5;
    }
    _$AI(t, i = this) {
        var s;
        if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : b) === x) return;
        const e = this._$AH,
            o = t === b && e !== b || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
            n = t !== b && (e === b || o);
        o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        var i, s;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
    }
}
class I {
    constructor(t, i, s) {
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(t) {
        P(this, t);
    }
}
const z = i$1.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t$1 = i$1.litHtmlVersions) && void 0 !== t$1 ? t$1 : i$1.litHtmlVersions = []).push("2.6.1");
const Z = (t, i, s) => {
    var e, o;
    const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
    let l = n._$litPart$;
    if (void 0 === l) {
        const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
        n._$litPart$ = l = new N(i.insertBefore(r(), t), t, void 0, null != s ? s : {});
    }
    return l._$AI(t), l
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends d$2 {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Z(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return x
    }
}
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
    LitElement: s
});
const n$1 = globalThis.litElementPolyfillSupport;
null == n$1 || n$1({
    LitElement: s
});
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = e => n => "function" == typeof n ? ((e, n) => (customElements.define(e, n), n))(e, n) : ((e, n) => {
    const {
        kind: t,
        elements: s
    } = n;
    return {
        kind: t,
        elements: s,
        finisher(n) {
            customElements.define(e, n);
        }
    }
})(e, n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? { ...e,
    finisher(n) {
        n.createProperty(e.key, i);
    }
} : {
    kind: "field",
    key: Symbol(),
    placement: "own",
    descriptor: {},
    originalKey: e.key,
    initializer() {
        "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
    },
    finisher(n) {
        n.createProperty(e.key, i);
    }
};

function e(e) {
    return (n, t) => void 0 !== t ? ((i, e, n) => {
        e.constructor.createProperty(n, i);
    })(e, n, t) : i(e, n)
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t) {
    return e({ ...t,
        state: !0
    })
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o, n) => o.assignedElements(n) : (o, n) => o.assignedNodes(n).filter((o => o.nodeType === Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");

var css_248z = i$3 `@charset "UTF-8";
:root {
  --sgds-blue: #1f69ff;
  --sgds-purple: #5925DC;
  --sgds-pink: #d63384;
  --sgds-red: #D7260F;
  --sgds-yellow: #F79009;
  --sgds-green: #0A8217;
  --sgds-cyan: #0F71BB;
  --sgds-white: #fff;
  --sgds-gray: #344054;
  --sgds-gray-dark: #000;
  --sgds-gray-100: #F7F7F9;
  --sgds-gray-200: #E4E7EC;
  --sgds-gray-300: #D0D5DD;
  --sgds-gray-400: #98A2B3;
  --sgds-gray-500: #667085;
  --sgds-gray-600: #344054;
  --sgds-gray-700: #1D2939;
  --sgds-gray-800: #000;
  --sgds-gray-900: #000;
  --sgds-primary: #5925DC;
  --sgds-secondary: #1f69ff;
  --sgds-success: #0A8217;
  --sgds-info: #0F71BB;
  --sgds-warning: #F79009;
  --sgds-danger: #D7260F;
  --sgds-light: #F7F7F9;
  --sgds-dark: #000;
  --sgds-primary-rgb: 89, 37, 220;
  --sgds-secondary-rgb: 31, 105, 255;
  --sgds-success-rgb: 10, 130, 23;
  --sgds-info-rgb: 15, 113, 187;
  --sgds-warning-rgb: 247, 144, 9;
  --sgds-danger-rgb: 215, 38, 15;
  --sgds-light-rgb: 247, 247, 249;
  --sgds-dark-rgb: 0, 0, 0;
  --sgds-white-rgb: 255, 255, 255;
  --sgds-black-rgb: 0, 0, 0;
  --sgds-body-color-rgb: 29, 41, 57;
  --sgds-body-bg-rgb: 255, 255, 255;
  --sgds-font-sans-serif: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --sgds-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --sgds-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  --sgds-body-font-family: var(--sgds-font-sans-serif);
  --sgds-body-font-size: 1rem;
  --sgds-body-font-weight: 400;
  --sgds-body-line-height: 2;
  --sgds-body-color: #1D2939;
  --sgds-body-bg: #fff;
}

:root {
  --sgds-gutter-x: 1.5rem;
}
@media (min-width: 992px) {
  :root {
    --section-padding: 3rem 1.5rem;
    --section-padding-xs: 1rem 1.5rem;
    --section-padding-sm: 1.5rem 1.5rem;
    --section-padding-lg: 9rem 1.5rem;
    --section-padding-xl: 18rem 1.5rem;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

@media (prefers-reduced-motion: no-preference) {
  :root {
    scroll-behavior: smooth;
  }
}

body {
  margin: 0;
  font-family: var(--sgds-body-font-family);
  font-size: var(--sgds-body-font-size);
  font-weight: var(--sgds-body-font-weight);
  line-height: var(--sgds-body-line-height);
  color: var(--sgds-body-color);
  text-align: var(--sgds-body-text-align);
  background-color: var(--sgds-body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

hr {
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
}

hr:not([size]) {
  height: 1px;
}

h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

h1, .h1 {
  font-size: calc(1.375rem + 1.5vw);
}
@media (min-width: 1200px) {
  h1, .h1 {
    font-size: 2.5rem;
  }
}

h2, .h2 {
  font-size: calc(1.325rem + 0.9vw);
}
@media (min-width: 1200px) {
  h2, .h2 {
    font-size: 2rem;
  }
}

h3, .h3 {
  font-size: calc(1.275rem + 0.3vw);
}
@media (min-width: 1200px) {
  h3, .h3 {
    font-size: 1.5rem;
  }
}

h4, .h4 {
  font-size: 1.125rem;
}

h5, .h5 {
  font-size: 1rem;
}

h6, .h6 {
  font-size: 1rem;
}

p {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

abbr[title],
abbr[data-bs-original-title] {
  text-decoration: underline dotted;
  cursor: help;
  text-decoration-skip-ink: none;
}

address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}

ol,
ul {
  padding-left: 2rem;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}

dt {
  font-weight: 700;
}

dd {
  margin-bottom: 0.5rem;
  margin-left: 0;
}

blockquote {
  margin: 0 0 1rem;
}

b,
strong {
  font-weight: bolder;
}

small, .small {
  font-size: 0.875em;
}

mark, .mark {
  padding: 0.2em;
  background-color: #fcf8e3;
}

sub,
sup {
  position: relative;
  font-size: 0.75em;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

a {
  color: #0F71BB;
  text-decoration: underline;
}
a:hover {
  color: #0c5a96;
}

a:not([href]):not([class]), a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}

pre,
code,
kbd,
samp {
  font-family: var(--sgds-font-monospace);
  font-size: 1em;
  direction: ltr /* rtl:ignore */;
  unicode-bidi: bidi-override;
}

pre {
  display: block;
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 0.875em;
}
pre code {
  font-size: inherit;
  color: inherit;
  word-break: normal;
}

code {
  font-size: 0.875em;
  color: #d63384;
  word-wrap: break-word;
}
a > code {
  color: inherit;
}

kbd {
  padding: 0.2rem 0.4rem;
  font-size: 0.875em;
  color: #fff;
  background-color: #000;
  border-radius: 0.2rem;
}
kbd kbd {
  padding: 0;
  font-size: 1em;
  font-weight: 700;
}

figure {
  margin: 0 0 1rem;
}

img,
svg {
  vertical-align: middle;
}

table {
  caption-side: bottom;
  border-collapse: collapse;
}

caption {
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #667085;
  text-align: left;
}

th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}

thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

label {
  display: inline-block;
}

button {
  border-radius: 0;
}

button:focus:not(:focus-visible) {
  outline: 0;
}

input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button,
select {
  text-transform: none;
}

[role=button] {
  cursor: pointer;
}

select {
  word-wrap: normal;
}
select:disabled {
  opacity: 1;
}

[list]::-webkit-calendar-picker-indicator {
  display: none;
}

button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}
button:not(:disabled),
[type=button]:not(:disabled),
[type=reset]:not(:disabled),
[type=submit]:not(:disabled) {
  cursor: pointer;
}

::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

textarea {
  resize: vertical;
}

fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: calc(1.275rem + 0.3vw);
  line-height: inherit;
}
@media (min-width: 1200px) {
  legend {
    font-size: 1.5rem;
  }
}
legend + * {
  clear: left;
}

::-webkit-datetime-edit-fields-wrapper,
::-webkit-datetime-edit-text,
::-webkit-datetime-edit-minute,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-year-field {
  padding: 0;
}

::-webkit-inner-spin-button {
  height: auto;
}

[type=search] {
  outline-offset: -2px;
  -webkit-appearance: textfield;
}

/* rtl:raw:
[type="tel"],
[type="url"],
[type="email"],
[type="number"] {
  direction: ltr;
}
*/
::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-color-swatch-wrapper {
  padding: 0;
}

::file-selector-button {
  font: inherit;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}

output {
  display: inline-block;
}

iframe {
  border: 0;
}

summary {
  display: list-item;
  cursor: pointer;
}

progress {
  vertical-align: baseline;
}

[hidden] {
  display: none !important;
}

h1, .h1 {
  line-height: 1.2;
}

h2, .h2 {
  line-height: 1.25;
}

h3, .h3 {
  line-height: 1.33;
}

h4, .h4 {
  line-height: 1.78;
}

h5, .h5 {
  line-height: 1.2;
}

h6, .h6 {
  line-height: 1.2;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
}

.display-0 {
  font-size: calc(1.475rem + 2.7vw);
  font-weight: 700;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-0 {
    font-size: 3.5rem;
  }
}

.display-1 {
  font-size: calc(1.375rem + 1.5vw);
  font-weight: 700;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-1 {
    font-size: 2.5rem;
  }
}

.display-2 {
  font-size: calc(1.325rem + 0.9vw);
  font-weight: 700;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-2 {
    font-size: 2rem;
  }
}

.display-3 {
  font-size: calc(1.275rem + 0.3vw);
  font-weight: 700;
  line-height: 1.2;
}
@media (min-width: 1200px) {
  .display-3 {
    font-size: 1.5rem;
  }
}

.display-4 {
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.2;
}

.display-5 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.display-6 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.list-inline {
  padding-left: 0;
  list-style: none;
}

.list-inline-item {
  display: inline-block;
}
.list-inline-item:not(:last-child) {
  margin-right: 0.5rem;
}

.initialism {
  font-size: 0.875em;
  text-transform: uppercase;
}

.blockquote {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}
.blockquote > :last-child {
  margin-bottom: 0;
}

.blockquote-footer {
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.875em;
  color: #344054;
}
.blockquote-footer::before {
  content: "— ";
}

p + p {
  margin-top: 1.5rem;
}

a {
  text-underline-offset: 0.25rem;
}

a[target=_blank]:after {
  display: inline-block;
  font-family: bootstrap-icons;
  content: "\\f1c5";
  padding-left: 0.25rem;
  text-decoration-line: none;
}

.clearfix::after {
  display: block;
  clear: both;
  content: "";
}

.link-primary {
  color: #5925DC;
}
.link-primary:hover, .link-primary:focus {
  color: #471eb0;
}

.link-secondary {
  color: #1f69ff;
}
.link-secondary:hover, .link-secondary:focus {
  color: #1954cc;
}

.link-success {
  color: #0A8217;
}
.link-success:hover, .link-success:focus {
  color: #086812;
}

.link-info {
  color: #0F71BB;
}
.link-info:hover, .link-info:focus {
  color: #0c5a96;
}

.link-warning {
  color: #F79009;
}
.link-warning:hover, .link-warning:focus {
  color: #f9a63a;
}

.link-danger {
  color: #D7260F;
}
.link-danger:hover, .link-danger:focus {
  color: #ac1e0c;
}

.link-light {
  color: #F7F7F9;
}
.link-light:hover, .link-light:focus {
  color: #f9f9fa;
}

.link-dark {
  color: #000;
}
.link-dark:hover, .link-dark:focus {
  color: black;
}

.ratio {
  position: relative;
  width: 100%;
}
.ratio::before {
  display: block;
  padding-top: var(--sgds-aspect-ratio);
  content: "";
}
.ratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ratio-1x1 {
  --sgds-aspect-ratio: 100%;
}

.ratio-4x3 {
  --sgds-aspect-ratio: 75%;
}

.ratio-16x9 {
  --sgds-aspect-ratio: 56.25%;
}

.ratio-21x9 {
  --sgds-aspect-ratio: 42.8571428571%;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1020;
}

@media (min-width: 576px) {
  .sticky-sm-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 768px) {
  .sticky-md-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 992px) {
  .sticky-lg-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 1200px) {
  .sticky-xl-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
@media (min-width: 1400px) {
  .sticky-xxl-top {
    position: sticky;
    top: 0;
    z-index: 1020;
  }
}
.hstack {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
}

.vstack {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-self: stretch;
}

.visually-hidden,
.visually-hidden-focusable:not(:focus):not(:focus-within) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.stretched-link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vr {
  display: inline-block;
  align-self: stretch;
  width: 1px;
  min-height: 1em;
  background-color: currentColor;
  opacity: 0.25;
}

.align-baseline {
  vertical-align: baseline !important;
}

.align-top {
  vertical-align: top !important;
}

.align-middle {
  vertical-align: middle !important;
}

.align-bottom {
  vertical-align: bottom !important;
}

.align-text-bottom {
  vertical-align: text-bottom !important;
}

.align-text-top {
  vertical-align: text-top !important;
}

.float-start {
  float: left !important;
}

.float-end {
  float: right !important;
}

.float-none {
  float: none !important;
}

.opacity-0 {
  opacity: 0 !important;
}

.opacity-25 {
  opacity: 0.25 !important;
}

.opacity-50 {
  opacity: 0.5 !important;
}

.opacity-75 {
  opacity: 0.75 !important;
}

.opacity-100 {
  opacity: 1 !important;
}

.overflow-auto {
  overflow: auto !important;
}

.overflow-hidden {
  overflow: hidden !important;
}

.overflow-visible {
  overflow: visible !important;
}

.overflow-scroll {
  overflow: scroll !important;
}

.d-inline {
  display: inline !important;
}

.d-inline-block {
  display: inline-block !important;
}

.d-block {
  display: block !important;
}

.d-grid {
  display: grid !important;
}

.d-table {
  display: table !important;
}

.d-table-row {
  display: table-row !important;
}

.d-table-cell {
  display: table-cell !important;
}

.d-flex {
  display: flex !important;
}

.d-inline-flex {
  display: inline-flex !important;
}

.d-none {
  display: none !important;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.shadow-none {
  box-shadow: none !important;
}

.position-static {
  position: static !important;
}

.position-relative {
  position: relative !important;
}

.position-absolute {
  position: absolute !important;
}

.position-fixed {
  position: fixed !important;
}

.position-sticky {
  position: sticky !important;
}

.top-0 {
  top: 0 !important;
}

.top-50 {
  top: 50% !important;
}

.top-100 {
  top: 100% !important;
}

.bottom-0 {
  bottom: 0 !important;
}

.bottom-50 {
  bottom: 50% !important;
}

.bottom-100 {
  bottom: 100% !important;
}

.start-0 {
  left: 0 !important;
}

.start-50 {
  left: 50% !important;
}

.start-100 {
  left: 100% !important;
}

.end-0 {
  right: 0 !important;
}

.end-50 {
  right: 50% !important;
}

.end-100 {
  right: 100% !important;
}

.translate-middle {
  transform: translate(-50%, -50%) !important;
}

.translate-middle-x {
  transform: translateX(-50%) !important;
}

.translate-middle-y {
  transform: translateY(-50%) !important;
}

.border {
  border: 1px solid #98A2B3 !important;
}

.border-0 {
  border: 0 !important;
}

.border-top {
  border-top: 1px solid #98A2B3 !important;
}

.border-top-0 {
  border-top: 0 !important;
}

.border-end {
  border-right: 1px solid #98A2B3 !important;
}

.border-end-0 {
  border-right: 0 !important;
}

.border-bottom {
  border-bottom: 1px solid #98A2B3 !important;
}

.border-bottom-0 {
  border-bottom: 0 !important;
}

.border-start {
  border-left: 1px solid #98A2B3 !important;
}

.border-start-0 {
  border-left: 0 !important;
}

.border-primary {
  border-color: #5925DC !important;
}

.border-secondary {
  border-color: #1f69ff !important;
}

.border-success {
  border-color: #0A8217 !important;
}

.border-info {
  border-color: #0F71BB !important;
}

.border-warning {
  border-color: #F79009 !important;
}

.border-danger {
  border-color: #D7260F !important;
}

.border-light {
  border-color: #F7F7F9 !important;
}

.border-dark {
  border-color: #000 !important;
}

.border-white {
  border-color: #fff !important;
}

.border-1 {
  border-width: 1px !important;
}

.border-2 {
  border-width: 2px !important;
}

.border-3 {
  border-width: 3px !important;
}

.border-4 {
  border-width: 4px !important;
}

.border-5 {
  border-width: 5px !important;
}

.w-25 {
  width: 25% !important;
}

.w-50 {
  width: 50% !important;
}

.w-75 {
  width: 75% !important;
}

.w-100 {
  width: 100% !important;
}

.w-auto {
  width: auto !important;
}

.mw-100 {
  max-width: 100% !important;
}

.vw-100 {
  width: 100vw !important;
}

.min-vw-100 {
  min-width: 100vw !important;
}

.h-25 {
  height: 25% !important;
}

.h-50 {
  height: 50% !important;
}

.h-75 {
  height: 75% !important;
}

.h-100 {
  height: 100% !important;
}

.h-auto {
  height: auto !important;
}

.mh-100 {
  max-height: 100% !important;
}

.vh-100 {
  height: 100vh !important;
}

.min-vh-100 {
  min-height: 100vh !important;
}

.flex-fill {
  flex: 1 1 auto !important;
}

.flex-row {
  flex-direction: row !important;
}

.flex-column {
  flex-direction: column !important;
}

.flex-row-reverse {
  flex-direction: row-reverse !important;
}

.flex-column-reverse {
  flex-direction: column-reverse !important;
}

.flex-grow-0 {
  flex-grow: 0 !important;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}

.flex-shrink-0 {
  flex-shrink: 0 !important;
}

.flex-shrink-1 {
  flex-shrink: 1 !important;
}

.flex-wrap {
  flex-wrap: wrap !important;
}

.flex-nowrap {
  flex-wrap: nowrap !important;
}

.flex-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}

.gap-0 {
  gap: 0 !important;
}

.gap-1 {
  gap: 0.25rem !important;
}

.gap-2 {
  gap: 0.5rem !important;
}

.gap-3 {
  gap: 1rem !important;
}

.gap-4 {
  gap: 1.5rem !important;
}

.gap-5 {
  gap: 2rem !important;
}

.gap-6 {
  gap: 2.5rem !important;
}

.gap-7 {
  gap: 3rem !important;
}

.gap-8 {
  gap: 3.5rem !important;
}

.justify-content-start {
  justify-content: flex-start !important;
}

.justify-content-end {
  justify-content: flex-end !important;
}

.justify-content-center {
  justify-content: center !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.justify-content-around {
  justify-content: space-around !important;
}

.justify-content-evenly {
  justify-content: space-evenly !important;
}

.align-items-start {
  align-items: flex-start !important;
}

.align-items-end {
  align-items: flex-end !important;
}

.align-items-center {
  align-items: center !important;
}

.align-items-baseline {
  align-items: baseline !important;
}

.align-items-stretch {
  align-items: stretch !important;
}

.align-content-start {
  align-content: flex-start !important;
}

.align-content-end {
  align-content: flex-end !important;
}

.align-content-center {
  align-content: center !important;
}

.align-content-between {
  align-content: space-between !important;
}

.align-content-around {
  align-content: space-around !important;
}

.align-content-stretch {
  align-content: stretch !important;
}

.align-self-auto {
  align-self: auto !important;
}

.align-self-start {
  align-self: flex-start !important;
}

.align-self-end {
  align-self: flex-end !important;
}

.align-self-center {
  align-self: center !important;
}

.align-self-baseline {
  align-self: baseline !important;
}

.align-self-stretch {
  align-self: stretch !important;
}

.order-first {
  order: -1 !important;
}

.order-0 {
  order: 0 !important;
}

.order-1 {
  order: 1 !important;
}

.order-2 {
  order: 2 !important;
}

.order-3 {
  order: 3 !important;
}

.order-4 {
  order: 4 !important;
}

.order-5 {
  order: 5 !important;
}

.order-last {
  order: 6 !important;
}

.m-0 {
  margin: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.m-3 {
  margin: 1rem !important;
}

.m-4 {
  margin: 1.5rem !important;
}

.m-5 {
  margin: 2rem !important;
}

.m-6 {
  margin: 2.5rem !important;
}

.m-7 {
  margin: 3rem !important;
}

.m-8 {
  margin: 3.5rem !important;
}

.m-auto {
  margin: auto !important;
}

.mx-0 {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}

.mx-2 {
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}

.mx-3 {
  margin-right: 1rem !important;
  margin-left: 1rem !important;
}

.mx-4 {
  margin-right: 1.5rem !important;
  margin-left: 1.5rem !important;
}

.mx-5 {
  margin-right: 2rem !important;
  margin-left: 2rem !important;
}

.mx-6 {
  margin-right: 2.5rem !important;
  margin-left: 2.5rem !important;
}

.mx-7 {
  margin-right: 3rem !important;
  margin-left: 3rem !important;
}

.mx-8 {
  margin-right: 3.5rem !important;
  margin-left: 3.5rem !important;
}

.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}

.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.my-3 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.my-5 {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}

.my-6 {
  margin-top: 2.5rem !important;
  margin-bottom: 2.5rem !important;
}

.my-7 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.my-8 {
  margin-top: 3.5rem !important;
  margin-bottom: 3.5rem !important;
}

.my-auto {
  margin-top: auto !important;
  margin-bottom: auto !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.mt-5 {
  margin-top: 2rem !important;
}

.mt-6 {
  margin-top: 2.5rem !important;
}

.mt-7 {
  margin-top: 3rem !important;
}

.mt-8 {
  margin-top: 3.5rem !important;
}

.mt-auto {
  margin-top: auto !important;
}

.me-0 {
  margin-right: 0 !important;
}

.me-1 {
  margin-right: 0.25rem !important;
}

.me-2 {
  margin-right: 0.5rem !important;
}

.me-3 {
  margin-right: 1rem !important;
}

.me-4 {
  margin-right: 1.5rem !important;
}

.me-5 {
  margin-right: 2rem !important;
}

.me-6 {
  margin-right: 2.5rem !important;
}

.me-7 {
  margin-right: 3rem !important;
}

.me-8 {
  margin-right: 3.5rem !important;
}

.me-auto {
  margin-right: auto !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 2rem !important;
}

.mb-6 {
  margin-bottom: 2.5rem !important;
}

.mb-7 {
  margin-bottom: 3rem !important;
}

.mb-8 {
  margin-bottom: 3.5rem !important;
}

.mb-auto {
  margin-bottom: auto !important;
}

.ms-0 {
  margin-left: 0 !important;
}

.ms-1 {
  margin-left: 0.25rem !important;
}

.ms-2 {
  margin-left: 0.5rem !important;
}

.ms-3 {
  margin-left: 1rem !important;
}

.ms-4 {
  margin-left: 1.5rem !important;
}

.ms-5 {
  margin-left: 2rem !important;
}

.ms-6 {
  margin-left: 2.5rem !important;
}

.ms-7 {
  margin-left: 3rem !important;
}

.ms-8 {
  margin-left: 3.5rem !important;
}

.ms-auto {
  margin-left: auto !important;
}

.p-0 {
  padding: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.p-5 {
  padding: 2rem !important;
}

.p-6 {
  padding: 2.5rem !important;
}

.p-7 {
  padding: 3rem !important;
}

.p-8 {
  padding: 3.5rem !important;
}

.px-0 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.px-1 {
  padding-right: 0.25rem !important;
  padding-left: 0.25rem !important;
}

.px-2 {
  padding-right: 0.5rem !important;
  padding-left: 0.5rem !important;
}

.px-3 {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}

.px-4 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.px-5 {
  padding-right: 2rem !important;
  padding-left: 2rem !important;
}

.px-6 {
  padding-right: 2.5rem !important;
  padding-left: 2.5rem !important;
}

.px-7 {
  padding-right: 3rem !important;
  padding-left: 3rem !important;
}

.px-8 {
  padding-right: 3.5rem !important;
  padding-left: 3.5rem !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.py-5 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}

.py-6 {
  padding-top: 2.5rem !important;
  padding-bottom: 2.5rem !important;
}

.py-7 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.py-8 {
  padding-top: 3.5rem !important;
  padding-bottom: 3.5rem !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pt-3 {
  padding-top: 1rem !important;
}

.pt-4 {
  padding-top: 1.5rem !important;
}

.pt-5 {
  padding-top: 2rem !important;
}

.pt-6 {
  padding-top: 2.5rem !important;
}

.pt-7 {
  padding-top: 3rem !important;
}

.pt-8 {
  padding-top: 3.5rem !important;
}

.pe-0 {
  padding-right: 0 !important;
}

.pe-1 {
  padding-right: 0.25rem !important;
}

.pe-2 {
  padding-right: 0.5rem !important;
}

.pe-3 {
  padding-right: 1rem !important;
}

.pe-4 {
  padding-right: 1.5rem !important;
}

.pe-5 {
  padding-right: 2rem !important;
}

.pe-6 {
  padding-right: 2.5rem !important;
}

.pe-7 {
  padding-right: 3rem !important;
}

.pe-8 {
  padding-right: 3.5rem !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pb-1 {
  padding-bottom: 0.25rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pb-3 {
  padding-bottom: 1rem !important;
}

.pb-4 {
  padding-bottom: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 2rem !important;
}

.pb-6 {
  padding-bottom: 2.5rem !important;
}

.pb-7 {
  padding-bottom: 3rem !important;
}

.pb-8 {
  padding-bottom: 3.5rem !important;
}

.ps-0 {
  padding-left: 0 !important;
}

.ps-1 {
  padding-left: 0.25rem !important;
}

.ps-2 {
  padding-left: 0.5rem !important;
}

.ps-3 {
  padding-left: 1rem !important;
}

.ps-4 {
  padding-left: 1.5rem !important;
}

.ps-5 {
  padding-left: 2rem !important;
}

.ps-6 {
  padding-left: 2.5rem !important;
}

.ps-7 {
  padding-left: 3rem !important;
}

.ps-8 {
  padding-left: 3.5rem !important;
}

.font-monospace {
  font-family: var(--sgds-font-monospace) !important;
}

.fs-0 {
  font-size: calc(1.475rem + 2.7vw) !important;
}

.fs-1 {
  font-size: calc(1.375rem + 1.5vw) !important;
}

.fs-2 {
  font-size: calc(1.325rem + 0.9vw) !important;
}

.fs-3 {
  font-size: calc(1.275rem + 0.3vw) !important;
}

.fs-4 {
  font-size: 1.125rem !important;
}

.fs-5 {
  font-size: 1rem !important;
}

.fs-6 {
  font-size: 1rem !important;
}

.fst-italic {
  font-style: italic !important;
}

.fst-normal {
  font-style: normal !important;
}

.fw-light {
  font-weight: 300 !important;
}

.fw-lighter {
  font-weight: lighter !important;
}

.fw-normal {
  font-weight: 400 !important;
}

.fw-bold {
  font-weight: 700 !important;
}

.fw-bolder {
  font-weight: bolder !important;
}

.lh-1 {
  line-height: 1 !important;
}

.lh-sm {
  line-height: 1.75 !important;
}

.lh-base {
  line-height: 2 !important;
}

.lh-lg {
  line-height: 2.25 !important;
}

.text-start {
  text-align: left !important;
}

.text-end {
  text-align: right !important;
}

.text-center {
  text-align: center !important;
}

.text-decoration-none {
  text-decoration: none !important;
}

.text-decoration-underline {
  text-decoration: underline !important;
}

.text-decoration-line-through {
  text-decoration: line-through !important;
}

.text-lowercase {
  text-transform: lowercase !important;
}

.text-uppercase {
  text-transform: uppercase !important;
}

.text-capitalize {
  text-transform: capitalize !important;
}

.text-wrap {
  white-space: normal !important;
}

.text-nowrap {
  white-space: nowrap !important;
}

/* rtl:begin:remove */
.text-break {
  word-wrap: break-word !important;
  word-break: break-word !important;
}

/* rtl:end:remove */
.text-primary {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-primary-rgb), var(--sgds-text-opacity)) !important;
}

.text-secondary {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-secondary-rgb), var(--sgds-text-opacity)) !important;
}

.text-success {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-success-rgb), var(--sgds-text-opacity)) !important;
}

.text-info {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-info-rgb), var(--sgds-text-opacity)) !important;
}

.text-warning {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-warning-rgb), var(--sgds-text-opacity)) !important;
}

.text-danger {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-danger-rgb), var(--sgds-text-opacity)) !important;
}

.text-light {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-light-rgb), var(--sgds-text-opacity)) !important;
}

.text-dark {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-dark-rgb), var(--sgds-text-opacity)) !important;
}

.text-black {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-black-rgb), var(--sgds-text-opacity)) !important;
}

.text-white {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-white-rgb), var(--sgds-text-opacity)) !important;
}

.text-body {
  --sgds-text-opacity: 1;
  color: rgba(var(--sgds-body-color-rgb), var(--sgds-text-opacity)) !important;
}

.text-muted {
  --sgds-text-opacity: 1;
  color: #667085 !important;
}

.text-black-50 {
  --sgds-text-opacity: 1;
  color: rgba(0, 0, 0, 0.5) !important;
}

.text-white-50 {
  --sgds-text-opacity: 1;
  color: rgba(255, 255, 255, 0.5) !important;
}

.text-reset {
  --sgds-text-opacity: 1;
  color: inherit !important;
}

.text-opacity-25 {
  --sgds-text-opacity: 0.25;
}

.text-opacity-50 {
  --sgds-text-opacity: 0.5;
}

.text-opacity-75 {
  --sgds-text-opacity: 0.75;
}

.text-opacity-100 {
  --sgds-text-opacity: 1;
}

.bg-primary {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-primary-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-secondary {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-secondary-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-success {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-success-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-info {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-info-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-warning {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-warning-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-danger {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-danger-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-light {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-light-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-dark {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-dark-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-black {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-black-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-white {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-white-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-body {
  --sgds-bg-opacity: 1;
  background-color: rgba(var(--sgds-body-bg-rgb), var(--sgds-bg-opacity)) !important;
}

.bg-transparent {
  --sgds-bg-opacity: 1;
  background-color: transparent !important;
}

.bg-opacity-10 {
  --sgds-bg-opacity: 0.1;
}

.bg-opacity-25 {
  --sgds-bg-opacity: 0.25;
}

.bg-opacity-50 {
  --sgds-bg-opacity: 0.5;
}

.bg-opacity-75 {
  --sgds-bg-opacity: 0.75;
}

.bg-opacity-100 {
  --sgds-bg-opacity: 1;
}

.bg-gradient {
  background-image: var(--sgds-gradient) !important;
}

.user-select-all {
  user-select: all !important;
}

.user-select-auto {
  user-select: auto !important;
}

.user-select-none {
  user-select: none !important;
}

.pe-none {
  pointer-events: none !important;
}

.pe-auto {
  pointer-events: auto !important;
}

.rounded {
  border-radius: 0.3125rem !important;
}

.rounded-0 {
  border-radius: 0 !important;
}

.rounded-1 {
  border-radius: 0.2rem !important;
}

.rounded-2 {
  border-radius: 0.3125rem !important;
}

.rounded-3 {
  border-radius: 0.3rem !important;
}

.rounded-circle {
  border-radius: 50% !important;
}

.rounded-pill {
  border-radius: 50rem !important;
}

.rounded-top {
  border-top-left-radius: 0.3125rem !important;
  border-top-right-radius: 0.3125rem !important;
}

.rounded-end {
  border-top-right-radius: 0.3125rem !important;
  border-bottom-right-radius: 0.3125rem !important;
}

.rounded-bottom {
  border-bottom-right-radius: 0.3125rem !important;
  border-bottom-left-radius: 0.3125rem !important;
}

.rounded-start {
  border-bottom-left-radius: 0.3125rem !important;
  border-top-left-radius: 0.3125rem !important;
}

.visible {
  visibility: visible !important;
}

.invisible {
  visibility: hidden !important;
}

@media (min-width: 576px) {
  .float-sm-start {
    float: left !important;
  }
  .float-sm-end {
    float: right !important;
  }
  .float-sm-none {
    float: none !important;
  }
  .d-sm-inline {
    display: inline !important;
  }
  .d-sm-inline-block {
    display: inline-block !important;
  }
  .d-sm-block {
    display: block !important;
  }
  .d-sm-grid {
    display: grid !important;
  }
  .d-sm-table {
    display: table !important;
  }
  .d-sm-table-row {
    display: table-row !important;
  }
  .d-sm-table-cell {
    display: table-cell !important;
  }
  .d-sm-flex {
    display: flex !important;
  }
  .d-sm-inline-flex {
    display: inline-flex !important;
  }
  .d-sm-none {
    display: none !important;
  }
  .flex-sm-fill {
    flex: 1 1 auto !important;
  }
  .flex-sm-row {
    flex-direction: row !important;
  }
  .flex-sm-column {
    flex-direction: column !important;
  }
  .flex-sm-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-sm-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-sm-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-sm-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-sm-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-sm-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-sm-wrap {
    flex-wrap: wrap !important;
  }
  .flex-sm-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-sm-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .gap-sm-0 {
    gap: 0 !important;
  }
  .gap-sm-1 {
    gap: 0.25rem !important;
  }
  .gap-sm-2 {
    gap: 0.5rem !important;
  }
  .gap-sm-3 {
    gap: 1rem !important;
  }
  .gap-sm-4 {
    gap: 1.5rem !important;
  }
  .gap-sm-5 {
    gap: 2rem !important;
  }
  .gap-sm-6 {
    gap: 2.5rem !important;
  }
  .gap-sm-7 {
    gap: 3rem !important;
  }
  .gap-sm-8 {
    gap: 3.5rem !important;
  }
  .justify-content-sm-start {
    justify-content: flex-start !important;
  }
  .justify-content-sm-end {
    justify-content: flex-end !important;
  }
  .justify-content-sm-center {
    justify-content: center !important;
  }
  .justify-content-sm-between {
    justify-content: space-between !important;
  }
  .justify-content-sm-around {
    justify-content: space-around !important;
  }
  .justify-content-sm-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-sm-start {
    align-items: flex-start !important;
  }
  .align-items-sm-end {
    align-items: flex-end !important;
  }
  .align-items-sm-center {
    align-items: center !important;
  }
  .align-items-sm-baseline {
    align-items: baseline !important;
  }
  .align-items-sm-stretch {
    align-items: stretch !important;
  }
  .align-content-sm-start {
    align-content: flex-start !important;
  }
  .align-content-sm-end {
    align-content: flex-end !important;
  }
  .align-content-sm-center {
    align-content: center !important;
  }
  .align-content-sm-between {
    align-content: space-between !important;
  }
  .align-content-sm-around {
    align-content: space-around !important;
  }
  .align-content-sm-stretch {
    align-content: stretch !important;
  }
  .align-self-sm-auto {
    align-self: auto !important;
  }
  .align-self-sm-start {
    align-self: flex-start !important;
  }
  .align-self-sm-end {
    align-self: flex-end !important;
  }
  .align-self-sm-center {
    align-self: center !important;
  }
  .align-self-sm-baseline {
    align-self: baseline !important;
  }
  .align-self-sm-stretch {
    align-self: stretch !important;
  }
  .order-sm-first {
    order: -1 !important;
  }
  .order-sm-0 {
    order: 0 !important;
  }
  .order-sm-1 {
    order: 1 !important;
  }
  .order-sm-2 {
    order: 2 !important;
  }
  .order-sm-3 {
    order: 3 !important;
  }
  .order-sm-4 {
    order: 4 !important;
  }
  .order-sm-5 {
    order: 5 !important;
  }
  .order-sm-last {
    order: 6 !important;
  }
  .m-sm-0 {
    margin: 0 !important;
  }
  .m-sm-1 {
    margin: 0.25rem !important;
  }
  .m-sm-2 {
    margin: 0.5rem !important;
  }
  .m-sm-3 {
    margin: 1rem !important;
  }
  .m-sm-4 {
    margin: 1.5rem !important;
  }
  .m-sm-5 {
    margin: 2rem !important;
  }
  .m-sm-6 {
    margin: 2.5rem !important;
  }
  .m-sm-7 {
    margin: 3rem !important;
  }
  .m-sm-8 {
    margin: 3.5rem !important;
  }
  .m-sm-auto {
    margin: auto !important;
  }
  .mx-sm-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-sm-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .mx-sm-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .mx-sm-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .mx-sm-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .mx-sm-5 {
    margin-right: 2rem !important;
    margin-left: 2rem !important;
  }
  .mx-sm-6 {
    margin-right: 2.5rem !important;
    margin-left: 2.5rem !important;
  }
  .mx-sm-7 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .mx-sm-8 {
    margin-right: 3.5rem !important;
    margin-left: 3.5rem !important;
  }
  .mx-sm-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-sm-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-sm-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-sm-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-sm-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-sm-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .my-sm-5 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }
  .my-sm-6 {
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;
  }
  .my-sm-7 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .my-sm-8 {
    margin-top: 3.5rem !important;
    margin-bottom: 3.5rem !important;
  }
  .my-sm-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-sm-0 {
    margin-top: 0 !important;
  }
  .mt-sm-1 {
    margin-top: 0.25rem !important;
  }
  .mt-sm-2 {
    margin-top: 0.5rem !important;
  }
  .mt-sm-3 {
    margin-top: 1rem !important;
  }
  .mt-sm-4 {
    margin-top: 1.5rem !important;
  }
  .mt-sm-5 {
    margin-top: 2rem !important;
  }
  .mt-sm-6 {
    margin-top: 2.5rem !important;
  }
  .mt-sm-7 {
    margin-top: 3rem !important;
  }
  .mt-sm-8 {
    margin-top: 3.5rem !important;
  }
  .mt-sm-auto {
    margin-top: auto !important;
  }
  .me-sm-0 {
    margin-right: 0 !important;
  }
  .me-sm-1 {
    margin-right: 0.25rem !important;
  }
  .me-sm-2 {
    margin-right: 0.5rem !important;
  }
  .me-sm-3 {
    margin-right: 1rem !important;
  }
  .me-sm-4 {
    margin-right: 1.5rem !important;
  }
  .me-sm-5 {
    margin-right: 2rem !important;
  }
  .me-sm-6 {
    margin-right: 2.5rem !important;
  }
  .me-sm-7 {
    margin-right: 3rem !important;
  }
  .me-sm-8 {
    margin-right: 3.5rem !important;
  }
  .me-sm-auto {
    margin-right: auto !important;
  }
  .mb-sm-0 {
    margin-bottom: 0 !important;
  }
  .mb-sm-1 {
    margin-bottom: 0.25rem !important;
  }
  .mb-sm-2 {
    margin-bottom: 0.5rem !important;
  }
  .mb-sm-3 {
    margin-bottom: 1rem !important;
  }
  .mb-sm-4 {
    margin-bottom: 1.5rem !important;
  }
  .mb-sm-5 {
    margin-bottom: 2rem !important;
  }
  .mb-sm-6 {
    margin-bottom: 2.5rem !important;
  }
  .mb-sm-7 {
    margin-bottom: 3rem !important;
  }
  .mb-sm-8 {
    margin-bottom: 3.5rem !important;
  }
  .mb-sm-auto {
    margin-bottom: auto !important;
  }
  .ms-sm-0 {
    margin-left: 0 !important;
  }
  .ms-sm-1 {
    margin-left: 0.25rem !important;
  }
  .ms-sm-2 {
    margin-left: 0.5rem !important;
  }
  .ms-sm-3 {
    margin-left: 1rem !important;
  }
  .ms-sm-4 {
    margin-left: 1.5rem !important;
  }
  .ms-sm-5 {
    margin-left: 2rem !important;
  }
  .ms-sm-6 {
    margin-left: 2.5rem !important;
  }
  .ms-sm-7 {
    margin-left: 3rem !important;
  }
  .ms-sm-8 {
    margin-left: 3.5rem !important;
  }
  .ms-sm-auto {
    margin-left: auto !important;
  }
  .p-sm-0 {
    padding: 0 !important;
  }
  .p-sm-1 {
    padding: 0.25rem !important;
  }
  .p-sm-2 {
    padding: 0.5rem !important;
  }
  .p-sm-3 {
    padding: 1rem !important;
  }
  .p-sm-4 {
    padding: 1.5rem !important;
  }
  .p-sm-5 {
    padding: 2rem !important;
  }
  .p-sm-6 {
    padding: 2.5rem !important;
  }
  .p-sm-7 {
    padding: 3rem !important;
  }
  .p-sm-8 {
    padding: 3.5rem !important;
  }
  .px-sm-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-sm-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .px-sm-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .px-sm-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .px-sm-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .px-sm-5 {
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }
  .px-sm-6 {
    padding-right: 2.5rem !important;
    padding-left: 2.5rem !important;
  }
  .px-sm-7 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .px-sm-8 {
    padding-right: 3.5rem !important;
    padding-left: 3.5rem !important;
  }
  .py-sm-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-sm-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .py-sm-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .py-sm-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .py-sm-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .py-sm-5 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .py-sm-6 {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  .py-sm-7 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .py-sm-8 {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .pt-sm-0 {
    padding-top: 0 !important;
  }
  .pt-sm-1 {
    padding-top: 0.25rem !important;
  }
  .pt-sm-2 {
    padding-top: 0.5rem !important;
  }
  .pt-sm-3 {
    padding-top: 1rem !important;
  }
  .pt-sm-4 {
    padding-top: 1.5rem !important;
  }
  .pt-sm-5 {
    padding-top: 2rem !important;
  }
  .pt-sm-6 {
    padding-top: 2.5rem !important;
  }
  .pt-sm-7 {
    padding-top: 3rem !important;
  }
  .pt-sm-8 {
    padding-top: 3.5rem !important;
  }
  .pe-sm-0 {
    padding-right: 0 !important;
  }
  .pe-sm-1 {
    padding-right: 0.25rem !important;
  }
  .pe-sm-2 {
    padding-right: 0.5rem !important;
  }
  .pe-sm-3 {
    padding-right: 1rem !important;
  }
  .pe-sm-4 {
    padding-right: 1.5rem !important;
  }
  .pe-sm-5 {
    padding-right: 2rem !important;
  }
  .pe-sm-6 {
    padding-right: 2.5rem !important;
  }
  .pe-sm-7 {
    padding-right: 3rem !important;
  }
  .pe-sm-8 {
    padding-right: 3.5rem !important;
  }
  .pb-sm-0 {
    padding-bottom: 0 !important;
  }
  .pb-sm-1 {
    padding-bottom: 0.25rem !important;
  }
  .pb-sm-2 {
    padding-bottom: 0.5rem !important;
  }
  .pb-sm-3 {
    padding-bottom: 1rem !important;
  }
  .pb-sm-4 {
    padding-bottom: 1.5rem !important;
  }
  .pb-sm-5 {
    padding-bottom: 2rem !important;
  }
  .pb-sm-6 {
    padding-bottom: 2.5rem !important;
  }
  .pb-sm-7 {
    padding-bottom: 3rem !important;
  }
  .pb-sm-8 {
    padding-bottom: 3.5rem !important;
  }
  .ps-sm-0 {
    padding-left: 0 !important;
  }
  .ps-sm-1 {
    padding-left: 0.25rem !important;
  }
  .ps-sm-2 {
    padding-left: 0.5rem !important;
  }
  .ps-sm-3 {
    padding-left: 1rem !important;
  }
  .ps-sm-4 {
    padding-left: 1.5rem !important;
  }
  .ps-sm-5 {
    padding-left: 2rem !important;
  }
  .ps-sm-6 {
    padding-left: 2.5rem !important;
  }
  .ps-sm-7 {
    padding-left: 3rem !important;
  }
  .ps-sm-8 {
    padding-left: 3.5rem !important;
  }
  .text-sm-start {
    text-align: left !important;
  }
  .text-sm-end {
    text-align: right !important;
  }
  .text-sm-center {
    text-align: center !important;
  }
}
@media (min-width: 768px) {
  .float-md-start {
    float: left !important;
  }
  .float-md-end {
    float: right !important;
  }
  .float-md-none {
    float: none !important;
  }
  .d-md-inline {
    display: inline !important;
  }
  .d-md-inline-block {
    display: inline-block !important;
  }
  .d-md-block {
    display: block !important;
  }
  .d-md-grid {
    display: grid !important;
  }
  .d-md-table {
    display: table !important;
  }
  .d-md-table-row {
    display: table-row !important;
  }
  .d-md-table-cell {
    display: table-cell !important;
  }
  .d-md-flex {
    display: flex !important;
  }
  .d-md-inline-flex {
    display: inline-flex !important;
  }
  .d-md-none {
    display: none !important;
  }
  .flex-md-fill {
    flex: 1 1 auto !important;
  }
  .flex-md-row {
    flex-direction: row !important;
  }
  .flex-md-column {
    flex-direction: column !important;
  }
  .flex-md-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-md-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-md-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-md-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-md-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-md-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-md-wrap {
    flex-wrap: wrap !important;
  }
  .flex-md-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-md-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .gap-md-0 {
    gap: 0 !important;
  }
  .gap-md-1 {
    gap: 0.25rem !important;
  }
  .gap-md-2 {
    gap: 0.5rem !important;
  }
  .gap-md-3 {
    gap: 1rem !important;
  }
  .gap-md-4 {
    gap: 1.5rem !important;
  }
  .gap-md-5 {
    gap: 2rem !important;
  }
  .gap-md-6 {
    gap: 2.5rem !important;
  }
  .gap-md-7 {
    gap: 3rem !important;
  }
  .gap-md-8 {
    gap: 3.5rem !important;
  }
  .justify-content-md-start {
    justify-content: flex-start !important;
  }
  .justify-content-md-end {
    justify-content: flex-end !important;
  }
  .justify-content-md-center {
    justify-content: center !important;
  }
  .justify-content-md-between {
    justify-content: space-between !important;
  }
  .justify-content-md-around {
    justify-content: space-around !important;
  }
  .justify-content-md-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-md-start {
    align-items: flex-start !important;
  }
  .align-items-md-end {
    align-items: flex-end !important;
  }
  .align-items-md-center {
    align-items: center !important;
  }
  .align-items-md-baseline {
    align-items: baseline !important;
  }
  .align-items-md-stretch {
    align-items: stretch !important;
  }
  .align-content-md-start {
    align-content: flex-start !important;
  }
  .align-content-md-end {
    align-content: flex-end !important;
  }
  .align-content-md-center {
    align-content: center !important;
  }
  .align-content-md-between {
    align-content: space-between !important;
  }
  .align-content-md-around {
    align-content: space-around !important;
  }
  .align-content-md-stretch {
    align-content: stretch !important;
  }
  .align-self-md-auto {
    align-self: auto !important;
  }
  .align-self-md-start {
    align-self: flex-start !important;
  }
  .align-self-md-end {
    align-self: flex-end !important;
  }
  .align-self-md-center {
    align-self: center !important;
  }
  .align-self-md-baseline {
    align-self: baseline !important;
  }
  .align-self-md-stretch {
    align-self: stretch !important;
  }
  .order-md-first {
    order: -1 !important;
  }
  .order-md-0 {
    order: 0 !important;
  }
  .order-md-1 {
    order: 1 !important;
  }
  .order-md-2 {
    order: 2 !important;
  }
  .order-md-3 {
    order: 3 !important;
  }
  .order-md-4 {
    order: 4 !important;
  }
  .order-md-5 {
    order: 5 !important;
  }
  .order-md-last {
    order: 6 !important;
  }
  .m-md-0 {
    margin: 0 !important;
  }
  .m-md-1 {
    margin: 0.25rem !important;
  }
  .m-md-2 {
    margin: 0.5rem !important;
  }
  .m-md-3 {
    margin: 1rem !important;
  }
  .m-md-4 {
    margin: 1.5rem !important;
  }
  .m-md-5 {
    margin: 2rem !important;
  }
  .m-md-6 {
    margin: 2.5rem !important;
  }
  .m-md-7 {
    margin: 3rem !important;
  }
  .m-md-8 {
    margin: 3.5rem !important;
  }
  .m-md-auto {
    margin: auto !important;
  }
  .mx-md-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-md-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .mx-md-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .mx-md-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .mx-md-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .mx-md-5 {
    margin-right: 2rem !important;
    margin-left: 2rem !important;
  }
  .mx-md-6 {
    margin-right: 2.5rem !important;
    margin-left: 2.5rem !important;
  }
  .mx-md-7 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .mx-md-8 {
    margin-right: 3.5rem !important;
    margin-left: 3.5rem !important;
  }
  .mx-md-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-md-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-md-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-md-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-md-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-md-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .my-md-5 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }
  .my-md-6 {
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;
  }
  .my-md-7 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .my-md-8 {
    margin-top: 3.5rem !important;
    margin-bottom: 3.5rem !important;
  }
  .my-md-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-md-0 {
    margin-top: 0 !important;
  }
  .mt-md-1 {
    margin-top: 0.25rem !important;
  }
  .mt-md-2 {
    margin-top: 0.5rem !important;
  }
  .mt-md-3 {
    margin-top: 1rem !important;
  }
  .mt-md-4 {
    margin-top: 1.5rem !important;
  }
  .mt-md-5 {
    margin-top: 2rem !important;
  }
  .mt-md-6 {
    margin-top: 2.5rem !important;
  }
  .mt-md-7 {
    margin-top: 3rem !important;
  }
  .mt-md-8 {
    margin-top: 3.5rem !important;
  }
  .mt-md-auto {
    margin-top: auto !important;
  }
  .me-md-0 {
    margin-right: 0 !important;
  }
  .me-md-1 {
    margin-right: 0.25rem !important;
  }
  .me-md-2 {
    margin-right: 0.5rem !important;
  }
  .me-md-3 {
    margin-right: 1rem !important;
  }
  .me-md-4 {
    margin-right: 1.5rem !important;
  }
  .me-md-5 {
    margin-right: 2rem !important;
  }
  .me-md-6 {
    margin-right: 2.5rem !important;
  }
  .me-md-7 {
    margin-right: 3rem !important;
  }
  .me-md-8 {
    margin-right: 3.5rem !important;
  }
  .me-md-auto {
    margin-right: auto !important;
  }
  .mb-md-0 {
    margin-bottom: 0 !important;
  }
  .mb-md-1 {
    margin-bottom: 0.25rem !important;
  }
  .mb-md-2 {
    margin-bottom: 0.5rem !important;
  }
  .mb-md-3 {
    margin-bottom: 1rem !important;
  }
  .mb-md-4 {
    margin-bottom: 1.5rem !important;
  }
  .mb-md-5 {
    margin-bottom: 2rem !important;
  }
  .mb-md-6 {
    margin-bottom: 2.5rem !important;
  }
  .mb-md-7 {
    margin-bottom: 3rem !important;
  }
  .mb-md-8 {
    margin-bottom: 3.5rem !important;
  }
  .mb-md-auto {
    margin-bottom: auto !important;
  }
  .ms-md-0 {
    margin-left: 0 !important;
  }
  .ms-md-1 {
    margin-left: 0.25rem !important;
  }
  .ms-md-2 {
    margin-left: 0.5rem !important;
  }
  .ms-md-3 {
    margin-left: 1rem !important;
  }
  .ms-md-4 {
    margin-left: 1.5rem !important;
  }
  .ms-md-5 {
    margin-left: 2rem !important;
  }
  .ms-md-6 {
    margin-left: 2.5rem !important;
  }
  .ms-md-7 {
    margin-left: 3rem !important;
  }
  .ms-md-8 {
    margin-left: 3.5rem !important;
  }
  .ms-md-auto {
    margin-left: auto !important;
  }
  .p-md-0 {
    padding: 0 !important;
  }
  .p-md-1 {
    padding: 0.25rem !important;
  }
  .p-md-2 {
    padding: 0.5rem !important;
  }
  .p-md-3 {
    padding: 1rem !important;
  }
  .p-md-4 {
    padding: 1.5rem !important;
  }
  .p-md-5 {
    padding: 2rem !important;
  }
  .p-md-6 {
    padding: 2.5rem !important;
  }
  .p-md-7 {
    padding: 3rem !important;
  }
  .p-md-8 {
    padding: 3.5rem !important;
  }
  .px-md-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-md-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .px-md-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .px-md-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .px-md-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .px-md-5 {
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }
  .px-md-6 {
    padding-right: 2.5rem !important;
    padding-left: 2.5rem !important;
  }
  .px-md-7 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .px-md-8 {
    padding-right: 3.5rem !important;
    padding-left: 3.5rem !important;
  }
  .py-md-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-md-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .py-md-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .py-md-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .py-md-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .py-md-5 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .py-md-6 {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  .py-md-7 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .py-md-8 {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .pt-md-0 {
    padding-top: 0 !important;
  }
  .pt-md-1 {
    padding-top: 0.25rem !important;
  }
  .pt-md-2 {
    padding-top: 0.5rem !important;
  }
  .pt-md-3 {
    padding-top: 1rem !important;
  }
  .pt-md-4 {
    padding-top: 1.5rem !important;
  }
  .pt-md-5 {
    padding-top: 2rem !important;
  }
  .pt-md-6 {
    padding-top: 2.5rem !important;
  }
  .pt-md-7 {
    padding-top: 3rem !important;
  }
  .pt-md-8 {
    padding-top: 3.5rem !important;
  }
  .pe-md-0 {
    padding-right: 0 !important;
  }
  .pe-md-1 {
    padding-right: 0.25rem !important;
  }
  .pe-md-2 {
    padding-right: 0.5rem !important;
  }
  .pe-md-3 {
    padding-right: 1rem !important;
  }
  .pe-md-4 {
    padding-right: 1.5rem !important;
  }
  .pe-md-5 {
    padding-right: 2rem !important;
  }
  .pe-md-6 {
    padding-right: 2.5rem !important;
  }
  .pe-md-7 {
    padding-right: 3rem !important;
  }
  .pe-md-8 {
    padding-right: 3.5rem !important;
  }
  .pb-md-0 {
    padding-bottom: 0 !important;
  }
  .pb-md-1 {
    padding-bottom: 0.25rem !important;
  }
  .pb-md-2 {
    padding-bottom: 0.5rem !important;
  }
  .pb-md-3 {
    padding-bottom: 1rem !important;
  }
  .pb-md-4 {
    padding-bottom: 1.5rem !important;
  }
  .pb-md-5 {
    padding-bottom: 2rem !important;
  }
  .pb-md-6 {
    padding-bottom: 2.5rem !important;
  }
  .pb-md-7 {
    padding-bottom: 3rem !important;
  }
  .pb-md-8 {
    padding-bottom: 3.5rem !important;
  }
  .ps-md-0 {
    padding-left: 0 !important;
  }
  .ps-md-1 {
    padding-left: 0.25rem !important;
  }
  .ps-md-2 {
    padding-left: 0.5rem !important;
  }
  .ps-md-3 {
    padding-left: 1rem !important;
  }
  .ps-md-4 {
    padding-left: 1.5rem !important;
  }
  .ps-md-5 {
    padding-left: 2rem !important;
  }
  .ps-md-6 {
    padding-left: 2.5rem !important;
  }
  .ps-md-7 {
    padding-left: 3rem !important;
  }
  .ps-md-8 {
    padding-left: 3.5rem !important;
  }
  .text-md-start {
    text-align: left !important;
  }
  .text-md-end {
    text-align: right !important;
  }
  .text-md-center {
    text-align: center !important;
  }
}
@media (min-width: 992px) {
  .float-lg-start {
    float: left !important;
  }
  .float-lg-end {
    float: right !important;
  }
  .float-lg-none {
    float: none !important;
  }
  .d-lg-inline {
    display: inline !important;
  }
  .d-lg-inline-block {
    display: inline-block !important;
  }
  .d-lg-block {
    display: block !important;
  }
  .d-lg-grid {
    display: grid !important;
  }
  .d-lg-table {
    display: table !important;
  }
  .d-lg-table-row {
    display: table-row !important;
  }
  .d-lg-table-cell {
    display: table-cell !important;
  }
  .d-lg-flex {
    display: flex !important;
  }
  .d-lg-inline-flex {
    display: inline-flex !important;
  }
  .d-lg-none {
    display: none !important;
  }
  .flex-lg-fill {
    flex: 1 1 auto !important;
  }
  .flex-lg-row {
    flex-direction: row !important;
  }
  .flex-lg-column {
    flex-direction: column !important;
  }
  .flex-lg-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-lg-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-lg-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-lg-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-lg-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-lg-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-lg-wrap {
    flex-wrap: wrap !important;
  }
  .flex-lg-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-lg-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .gap-lg-0 {
    gap: 0 !important;
  }
  .gap-lg-1 {
    gap: 0.25rem !important;
  }
  .gap-lg-2 {
    gap: 0.5rem !important;
  }
  .gap-lg-3 {
    gap: 1rem !important;
  }
  .gap-lg-4 {
    gap: 1.5rem !important;
  }
  .gap-lg-5 {
    gap: 2rem !important;
  }
  .gap-lg-6 {
    gap: 2.5rem !important;
  }
  .gap-lg-7 {
    gap: 3rem !important;
  }
  .gap-lg-8 {
    gap: 3.5rem !important;
  }
  .justify-content-lg-start {
    justify-content: flex-start !important;
  }
  .justify-content-lg-end {
    justify-content: flex-end !important;
  }
  .justify-content-lg-center {
    justify-content: center !important;
  }
  .justify-content-lg-between {
    justify-content: space-between !important;
  }
  .justify-content-lg-around {
    justify-content: space-around !important;
  }
  .justify-content-lg-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-lg-start {
    align-items: flex-start !important;
  }
  .align-items-lg-end {
    align-items: flex-end !important;
  }
  .align-items-lg-center {
    align-items: center !important;
  }
  .align-items-lg-baseline {
    align-items: baseline !important;
  }
  .align-items-lg-stretch {
    align-items: stretch !important;
  }
  .align-content-lg-start {
    align-content: flex-start !important;
  }
  .align-content-lg-end {
    align-content: flex-end !important;
  }
  .align-content-lg-center {
    align-content: center !important;
  }
  .align-content-lg-between {
    align-content: space-between !important;
  }
  .align-content-lg-around {
    align-content: space-around !important;
  }
  .align-content-lg-stretch {
    align-content: stretch !important;
  }
  .align-self-lg-auto {
    align-self: auto !important;
  }
  .align-self-lg-start {
    align-self: flex-start !important;
  }
  .align-self-lg-end {
    align-self: flex-end !important;
  }
  .align-self-lg-center {
    align-self: center !important;
  }
  .align-self-lg-baseline {
    align-self: baseline !important;
  }
  .align-self-lg-stretch {
    align-self: stretch !important;
  }
  .order-lg-first {
    order: -1 !important;
  }
  .order-lg-0 {
    order: 0 !important;
  }
  .order-lg-1 {
    order: 1 !important;
  }
  .order-lg-2 {
    order: 2 !important;
  }
  .order-lg-3 {
    order: 3 !important;
  }
  .order-lg-4 {
    order: 4 !important;
  }
  .order-lg-5 {
    order: 5 !important;
  }
  .order-lg-last {
    order: 6 !important;
  }
  .m-lg-0 {
    margin: 0 !important;
  }
  .m-lg-1 {
    margin: 0.25rem !important;
  }
  .m-lg-2 {
    margin: 0.5rem !important;
  }
  .m-lg-3 {
    margin: 1rem !important;
  }
  .m-lg-4 {
    margin: 1.5rem !important;
  }
  .m-lg-5 {
    margin: 2rem !important;
  }
  .m-lg-6 {
    margin: 2.5rem !important;
  }
  .m-lg-7 {
    margin: 3rem !important;
  }
  .m-lg-8 {
    margin: 3.5rem !important;
  }
  .m-lg-auto {
    margin: auto !important;
  }
  .mx-lg-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-lg-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .mx-lg-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .mx-lg-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .mx-lg-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .mx-lg-5 {
    margin-right: 2rem !important;
    margin-left: 2rem !important;
  }
  .mx-lg-6 {
    margin-right: 2.5rem !important;
    margin-left: 2.5rem !important;
  }
  .mx-lg-7 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .mx-lg-8 {
    margin-right: 3.5rem !important;
    margin-left: 3.5rem !important;
  }
  .mx-lg-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-lg-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-lg-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-lg-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-lg-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-lg-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .my-lg-5 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }
  .my-lg-6 {
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;
  }
  .my-lg-7 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .my-lg-8 {
    margin-top: 3.5rem !important;
    margin-bottom: 3.5rem !important;
  }
  .my-lg-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-lg-0 {
    margin-top: 0 !important;
  }
  .mt-lg-1 {
    margin-top: 0.25rem !important;
  }
  .mt-lg-2 {
    margin-top: 0.5rem !important;
  }
  .mt-lg-3 {
    margin-top: 1rem !important;
  }
  .mt-lg-4 {
    margin-top: 1.5rem !important;
  }
  .mt-lg-5 {
    margin-top: 2rem !important;
  }
  .mt-lg-6 {
    margin-top: 2.5rem !important;
  }
  .mt-lg-7 {
    margin-top: 3rem !important;
  }
  .mt-lg-8 {
    margin-top: 3.5rem !important;
  }
  .mt-lg-auto {
    margin-top: auto !important;
  }
  .me-lg-0 {
    margin-right: 0 !important;
  }
  .me-lg-1 {
    margin-right: 0.25rem !important;
  }
  .me-lg-2 {
    margin-right: 0.5rem !important;
  }
  .me-lg-3 {
    margin-right: 1rem !important;
  }
  .me-lg-4 {
    margin-right: 1.5rem !important;
  }
  .me-lg-5 {
    margin-right: 2rem !important;
  }
  .me-lg-6 {
    margin-right: 2.5rem !important;
  }
  .me-lg-7 {
    margin-right: 3rem !important;
  }
  .me-lg-8 {
    margin-right: 3.5rem !important;
  }
  .me-lg-auto {
    margin-right: auto !important;
  }
  .mb-lg-0 {
    margin-bottom: 0 !important;
  }
  .mb-lg-1 {
    margin-bottom: 0.25rem !important;
  }
  .mb-lg-2 {
    margin-bottom: 0.5rem !important;
  }
  .mb-lg-3 {
    margin-bottom: 1rem !important;
  }
  .mb-lg-4 {
    margin-bottom: 1.5rem !important;
  }
  .mb-lg-5 {
    margin-bottom: 2rem !important;
  }
  .mb-lg-6 {
    margin-bottom: 2.5rem !important;
  }
  .mb-lg-7 {
    margin-bottom: 3rem !important;
  }
  .mb-lg-8 {
    margin-bottom: 3.5rem !important;
  }
  .mb-lg-auto {
    margin-bottom: auto !important;
  }
  .ms-lg-0 {
    margin-left: 0 !important;
  }
  .ms-lg-1 {
    margin-left: 0.25rem !important;
  }
  .ms-lg-2 {
    margin-left: 0.5rem !important;
  }
  .ms-lg-3 {
    margin-left: 1rem !important;
  }
  .ms-lg-4 {
    margin-left: 1.5rem !important;
  }
  .ms-lg-5 {
    margin-left: 2rem !important;
  }
  .ms-lg-6 {
    margin-left: 2.5rem !important;
  }
  .ms-lg-7 {
    margin-left: 3rem !important;
  }
  .ms-lg-8 {
    margin-left: 3.5rem !important;
  }
  .ms-lg-auto {
    margin-left: auto !important;
  }
  .p-lg-0 {
    padding: 0 !important;
  }
  .p-lg-1 {
    padding: 0.25rem !important;
  }
  .p-lg-2 {
    padding: 0.5rem !important;
  }
  .p-lg-3 {
    padding: 1rem !important;
  }
  .p-lg-4 {
    padding: 1.5rem !important;
  }
  .p-lg-5 {
    padding: 2rem !important;
  }
  .p-lg-6 {
    padding: 2.5rem !important;
  }
  .p-lg-7 {
    padding: 3rem !important;
  }
  .p-lg-8 {
    padding: 3.5rem !important;
  }
  .px-lg-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-lg-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .px-lg-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .px-lg-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .px-lg-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .px-lg-5 {
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }
  .px-lg-6 {
    padding-right: 2.5rem !important;
    padding-left: 2.5rem !important;
  }
  .px-lg-7 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .px-lg-8 {
    padding-right: 3.5rem !important;
    padding-left: 3.5rem !important;
  }
  .py-lg-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-lg-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .py-lg-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .py-lg-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .py-lg-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .py-lg-5 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .py-lg-6 {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  .py-lg-7 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .py-lg-8 {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .pt-lg-0 {
    padding-top: 0 !important;
  }
  .pt-lg-1 {
    padding-top: 0.25rem !important;
  }
  .pt-lg-2 {
    padding-top: 0.5rem !important;
  }
  .pt-lg-3 {
    padding-top: 1rem !important;
  }
  .pt-lg-4 {
    padding-top: 1.5rem !important;
  }
  .pt-lg-5 {
    padding-top: 2rem !important;
  }
  .pt-lg-6 {
    padding-top: 2.5rem !important;
  }
  .pt-lg-7 {
    padding-top: 3rem !important;
  }
  .pt-lg-8 {
    padding-top: 3.5rem !important;
  }
  .pe-lg-0 {
    padding-right: 0 !important;
  }
  .pe-lg-1 {
    padding-right: 0.25rem !important;
  }
  .pe-lg-2 {
    padding-right: 0.5rem !important;
  }
  .pe-lg-3 {
    padding-right: 1rem !important;
  }
  .pe-lg-4 {
    padding-right: 1.5rem !important;
  }
  .pe-lg-5 {
    padding-right: 2rem !important;
  }
  .pe-lg-6 {
    padding-right: 2.5rem !important;
  }
  .pe-lg-7 {
    padding-right: 3rem !important;
  }
  .pe-lg-8 {
    padding-right: 3.5rem !important;
  }
  .pb-lg-0 {
    padding-bottom: 0 !important;
  }
  .pb-lg-1 {
    padding-bottom: 0.25rem !important;
  }
  .pb-lg-2 {
    padding-bottom: 0.5rem !important;
  }
  .pb-lg-3 {
    padding-bottom: 1rem !important;
  }
  .pb-lg-4 {
    padding-bottom: 1.5rem !important;
  }
  .pb-lg-5 {
    padding-bottom: 2rem !important;
  }
  .pb-lg-6 {
    padding-bottom: 2.5rem !important;
  }
  .pb-lg-7 {
    padding-bottom: 3rem !important;
  }
  .pb-lg-8 {
    padding-bottom: 3.5rem !important;
  }
  .ps-lg-0 {
    padding-left: 0 !important;
  }
  .ps-lg-1 {
    padding-left: 0.25rem !important;
  }
  .ps-lg-2 {
    padding-left: 0.5rem !important;
  }
  .ps-lg-3 {
    padding-left: 1rem !important;
  }
  .ps-lg-4 {
    padding-left: 1.5rem !important;
  }
  .ps-lg-5 {
    padding-left: 2rem !important;
  }
  .ps-lg-6 {
    padding-left: 2.5rem !important;
  }
  .ps-lg-7 {
    padding-left: 3rem !important;
  }
  .ps-lg-8 {
    padding-left: 3.5rem !important;
  }
  .text-lg-start {
    text-align: left !important;
  }
  .text-lg-end {
    text-align: right !important;
  }
  .text-lg-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .float-xl-start {
    float: left !important;
  }
  .float-xl-end {
    float: right !important;
  }
  .float-xl-none {
    float: none !important;
  }
  .d-xl-inline {
    display: inline !important;
  }
  .d-xl-inline-block {
    display: inline-block !important;
  }
  .d-xl-block {
    display: block !important;
  }
  .d-xl-grid {
    display: grid !important;
  }
  .d-xl-table {
    display: table !important;
  }
  .d-xl-table-row {
    display: table-row !important;
  }
  .d-xl-table-cell {
    display: table-cell !important;
  }
  .d-xl-flex {
    display: flex !important;
  }
  .d-xl-inline-flex {
    display: inline-flex !important;
  }
  .d-xl-none {
    display: none !important;
  }
  .flex-xl-fill {
    flex: 1 1 auto !important;
  }
  .flex-xl-row {
    flex-direction: row !important;
  }
  .flex-xl-column {
    flex-direction: column !important;
  }
  .flex-xl-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-xl-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-xl-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-xl-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-xl-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-xl-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-xl-wrap {
    flex-wrap: wrap !important;
  }
  .flex-xl-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-xl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .gap-xl-0 {
    gap: 0 !important;
  }
  .gap-xl-1 {
    gap: 0.25rem !important;
  }
  .gap-xl-2 {
    gap: 0.5rem !important;
  }
  .gap-xl-3 {
    gap: 1rem !important;
  }
  .gap-xl-4 {
    gap: 1.5rem !important;
  }
  .gap-xl-5 {
    gap: 2rem !important;
  }
  .gap-xl-6 {
    gap: 2.5rem !important;
  }
  .gap-xl-7 {
    gap: 3rem !important;
  }
  .gap-xl-8 {
    gap: 3.5rem !important;
  }
  .justify-content-xl-start {
    justify-content: flex-start !important;
  }
  .justify-content-xl-end {
    justify-content: flex-end !important;
  }
  .justify-content-xl-center {
    justify-content: center !important;
  }
  .justify-content-xl-between {
    justify-content: space-between !important;
  }
  .justify-content-xl-around {
    justify-content: space-around !important;
  }
  .justify-content-xl-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-xl-start {
    align-items: flex-start !important;
  }
  .align-items-xl-end {
    align-items: flex-end !important;
  }
  .align-items-xl-center {
    align-items: center !important;
  }
  .align-items-xl-baseline {
    align-items: baseline !important;
  }
  .align-items-xl-stretch {
    align-items: stretch !important;
  }
  .align-content-xl-start {
    align-content: flex-start !important;
  }
  .align-content-xl-end {
    align-content: flex-end !important;
  }
  .align-content-xl-center {
    align-content: center !important;
  }
  .align-content-xl-between {
    align-content: space-between !important;
  }
  .align-content-xl-around {
    align-content: space-around !important;
  }
  .align-content-xl-stretch {
    align-content: stretch !important;
  }
  .align-self-xl-auto {
    align-self: auto !important;
  }
  .align-self-xl-start {
    align-self: flex-start !important;
  }
  .align-self-xl-end {
    align-self: flex-end !important;
  }
  .align-self-xl-center {
    align-self: center !important;
  }
  .align-self-xl-baseline {
    align-self: baseline !important;
  }
  .align-self-xl-stretch {
    align-self: stretch !important;
  }
  .order-xl-first {
    order: -1 !important;
  }
  .order-xl-0 {
    order: 0 !important;
  }
  .order-xl-1 {
    order: 1 !important;
  }
  .order-xl-2 {
    order: 2 !important;
  }
  .order-xl-3 {
    order: 3 !important;
  }
  .order-xl-4 {
    order: 4 !important;
  }
  .order-xl-5 {
    order: 5 !important;
  }
  .order-xl-last {
    order: 6 !important;
  }
  .m-xl-0 {
    margin: 0 !important;
  }
  .m-xl-1 {
    margin: 0.25rem !important;
  }
  .m-xl-2 {
    margin: 0.5rem !important;
  }
  .m-xl-3 {
    margin: 1rem !important;
  }
  .m-xl-4 {
    margin: 1.5rem !important;
  }
  .m-xl-5 {
    margin: 2rem !important;
  }
  .m-xl-6 {
    margin: 2.5rem !important;
  }
  .m-xl-7 {
    margin: 3rem !important;
  }
  .m-xl-8 {
    margin: 3.5rem !important;
  }
  .m-xl-auto {
    margin: auto !important;
  }
  .mx-xl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-xl-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .mx-xl-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .mx-xl-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .mx-xl-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .mx-xl-5 {
    margin-right: 2rem !important;
    margin-left: 2rem !important;
  }
  .mx-xl-6 {
    margin-right: 2.5rem !important;
    margin-left: 2.5rem !important;
  }
  .mx-xl-7 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .mx-xl-8 {
    margin-right: 3.5rem !important;
    margin-left: 3.5rem !important;
  }
  .mx-xl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-xl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-xl-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-xl-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-xl-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-xl-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .my-xl-5 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }
  .my-xl-6 {
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;
  }
  .my-xl-7 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .my-xl-8 {
    margin-top: 3.5rem !important;
    margin-bottom: 3.5rem !important;
  }
  .my-xl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-xl-0 {
    margin-top: 0 !important;
  }
  .mt-xl-1 {
    margin-top: 0.25rem !important;
  }
  .mt-xl-2 {
    margin-top: 0.5rem !important;
  }
  .mt-xl-3 {
    margin-top: 1rem !important;
  }
  .mt-xl-4 {
    margin-top: 1.5rem !important;
  }
  .mt-xl-5 {
    margin-top: 2rem !important;
  }
  .mt-xl-6 {
    margin-top: 2.5rem !important;
  }
  .mt-xl-7 {
    margin-top: 3rem !important;
  }
  .mt-xl-8 {
    margin-top: 3.5rem !important;
  }
  .mt-xl-auto {
    margin-top: auto !important;
  }
  .me-xl-0 {
    margin-right: 0 !important;
  }
  .me-xl-1 {
    margin-right: 0.25rem !important;
  }
  .me-xl-2 {
    margin-right: 0.5rem !important;
  }
  .me-xl-3 {
    margin-right: 1rem !important;
  }
  .me-xl-4 {
    margin-right: 1.5rem !important;
  }
  .me-xl-5 {
    margin-right: 2rem !important;
  }
  .me-xl-6 {
    margin-right: 2.5rem !important;
  }
  .me-xl-7 {
    margin-right: 3rem !important;
  }
  .me-xl-8 {
    margin-right: 3.5rem !important;
  }
  .me-xl-auto {
    margin-right: auto !important;
  }
  .mb-xl-0 {
    margin-bottom: 0 !important;
  }
  .mb-xl-1 {
    margin-bottom: 0.25rem !important;
  }
  .mb-xl-2 {
    margin-bottom: 0.5rem !important;
  }
  .mb-xl-3 {
    margin-bottom: 1rem !important;
  }
  .mb-xl-4 {
    margin-bottom: 1.5rem !important;
  }
  .mb-xl-5 {
    margin-bottom: 2rem !important;
  }
  .mb-xl-6 {
    margin-bottom: 2.5rem !important;
  }
  .mb-xl-7 {
    margin-bottom: 3rem !important;
  }
  .mb-xl-8 {
    margin-bottom: 3.5rem !important;
  }
  .mb-xl-auto {
    margin-bottom: auto !important;
  }
  .ms-xl-0 {
    margin-left: 0 !important;
  }
  .ms-xl-1 {
    margin-left: 0.25rem !important;
  }
  .ms-xl-2 {
    margin-left: 0.5rem !important;
  }
  .ms-xl-3 {
    margin-left: 1rem !important;
  }
  .ms-xl-4 {
    margin-left: 1.5rem !important;
  }
  .ms-xl-5 {
    margin-left: 2rem !important;
  }
  .ms-xl-6 {
    margin-left: 2.5rem !important;
  }
  .ms-xl-7 {
    margin-left: 3rem !important;
  }
  .ms-xl-8 {
    margin-left: 3.5rem !important;
  }
  .ms-xl-auto {
    margin-left: auto !important;
  }
  .p-xl-0 {
    padding: 0 !important;
  }
  .p-xl-1 {
    padding: 0.25rem !important;
  }
  .p-xl-2 {
    padding: 0.5rem !important;
  }
  .p-xl-3 {
    padding: 1rem !important;
  }
  .p-xl-4 {
    padding: 1.5rem !important;
  }
  .p-xl-5 {
    padding: 2rem !important;
  }
  .p-xl-6 {
    padding: 2.5rem !important;
  }
  .p-xl-7 {
    padding: 3rem !important;
  }
  .p-xl-8 {
    padding: 3.5rem !important;
  }
  .px-xl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-xl-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .px-xl-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .px-xl-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .px-xl-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .px-xl-5 {
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }
  .px-xl-6 {
    padding-right: 2.5rem !important;
    padding-left: 2.5rem !important;
  }
  .px-xl-7 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .px-xl-8 {
    padding-right: 3.5rem !important;
    padding-left: 3.5rem !important;
  }
  .py-xl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-xl-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .py-xl-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .py-xl-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .py-xl-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .py-xl-5 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .py-xl-6 {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  .py-xl-7 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .py-xl-8 {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .pt-xl-0 {
    padding-top: 0 !important;
  }
  .pt-xl-1 {
    padding-top: 0.25rem !important;
  }
  .pt-xl-2 {
    padding-top: 0.5rem !important;
  }
  .pt-xl-3 {
    padding-top: 1rem !important;
  }
  .pt-xl-4 {
    padding-top: 1.5rem !important;
  }
  .pt-xl-5 {
    padding-top: 2rem !important;
  }
  .pt-xl-6 {
    padding-top: 2.5rem !important;
  }
  .pt-xl-7 {
    padding-top: 3rem !important;
  }
  .pt-xl-8 {
    padding-top: 3.5rem !important;
  }
  .pe-xl-0 {
    padding-right: 0 !important;
  }
  .pe-xl-1 {
    padding-right: 0.25rem !important;
  }
  .pe-xl-2 {
    padding-right: 0.5rem !important;
  }
  .pe-xl-3 {
    padding-right: 1rem !important;
  }
  .pe-xl-4 {
    padding-right: 1.5rem !important;
  }
  .pe-xl-5 {
    padding-right: 2rem !important;
  }
  .pe-xl-6 {
    padding-right: 2.5rem !important;
  }
  .pe-xl-7 {
    padding-right: 3rem !important;
  }
  .pe-xl-8 {
    padding-right: 3.5rem !important;
  }
  .pb-xl-0 {
    padding-bottom: 0 !important;
  }
  .pb-xl-1 {
    padding-bottom: 0.25rem !important;
  }
  .pb-xl-2 {
    padding-bottom: 0.5rem !important;
  }
  .pb-xl-3 {
    padding-bottom: 1rem !important;
  }
  .pb-xl-4 {
    padding-bottom: 1.5rem !important;
  }
  .pb-xl-5 {
    padding-bottom: 2rem !important;
  }
  .pb-xl-6 {
    padding-bottom: 2.5rem !important;
  }
  .pb-xl-7 {
    padding-bottom: 3rem !important;
  }
  .pb-xl-8 {
    padding-bottom: 3.5rem !important;
  }
  .ps-xl-0 {
    padding-left: 0 !important;
  }
  .ps-xl-1 {
    padding-left: 0.25rem !important;
  }
  .ps-xl-2 {
    padding-left: 0.5rem !important;
  }
  .ps-xl-3 {
    padding-left: 1rem !important;
  }
  .ps-xl-4 {
    padding-left: 1.5rem !important;
  }
  .ps-xl-5 {
    padding-left: 2rem !important;
  }
  .ps-xl-6 {
    padding-left: 2.5rem !important;
  }
  .ps-xl-7 {
    padding-left: 3rem !important;
  }
  .ps-xl-8 {
    padding-left: 3.5rem !important;
  }
  .text-xl-start {
    text-align: left !important;
  }
  .text-xl-end {
    text-align: right !important;
  }
  .text-xl-center {
    text-align: center !important;
  }
}
@media (min-width: 1400px) {
  .float-xxl-start {
    float: left !important;
  }
  .float-xxl-end {
    float: right !important;
  }
  .float-xxl-none {
    float: none !important;
  }
  .d-xxl-inline {
    display: inline !important;
  }
  .d-xxl-inline-block {
    display: inline-block !important;
  }
  .d-xxl-block {
    display: block !important;
  }
  .d-xxl-grid {
    display: grid !important;
  }
  .d-xxl-table {
    display: table !important;
  }
  .d-xxl-table-row {
    display: table-row !important;
  }
  .d-xxl-table-cell {
    display: table-cell !important;
  }
  .d-xxl-flex {
    display: flex !important;
  }
  .d-xxl-inline-flex {
    display: inline-flex !important;
  }
  .d-xxl-none {
    display: none !important;
  }
  .flex-xxl-fill {
    flex: 1 1 auto !important;
  }
  .flex-xxl-row {
    flex-direction: row !important;
  }
  .flex-xxl-column {
    flex-direction: column !important;
  }
  .flex-xxl-row-reverse {
    flex-direction: row-reverse !important;
  }
  .flex-xxl-column-reverse {
    flex-direction: column-reverse !important;
  }
  .flex-xxl-grow-0 {
    flex-grow: 0 !important;
  }
  .flex-xxl-grow-1 {
    flex-grow: 1 !important;
  }
  .flex-xxl-shrink-0 {
    flex-shrink: 0 !important;
  }
  .flex-xxl-shrink-1 {
    flex-shrink: 1 !important;
  }
  .flex-xxl-wrap {
    flex-wrap: wrap !important;
  }
  .flex-xxl-nowrap {
    flex-wrap: nowrap !important;
  }
  .flex-xxl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .gap-xxl-0 {
    gap: 0 !important;
  }
  .gap-xxl-1 {
    gap: 0.25rem !important;
  }
  .gap-xxl-2 {
    gap: 0.5rem !important;
  }
  .gap-xxl-3 {
    gap: 1rem !important;
  }
  .gap-xxl-4 {
    gap: 1.5rem !important;
  }
  .gap-xxl-5 {
    gap: 2rem !important;
  }
  .gap-xxl-6 {
    gap: 2.5rem !important;
  }
  .gap-xxl-7 {
    gap: 3rem !important;
  }
  .gap-xxl-8 {
    gap: 3.5rem !important;
  }
  .justify-content-xxl-start {
    justify-content: flex-start !important;
  }
  .justify-content-xxl-end {
    justify-content: flex-end !important;
  }
  .justify-content-xxl-center {
    justify-content: center !important;
  }
  .justify-content-xxl-between {
    justify-content: space-between !important;
  }
  .justify-content-xxl-around {
    justify-content: space-around !important;
  }
  .justify-content-xxl-evenly {
    justify-content: space-evenly !important;
  }
  .align-items-xxl-start {
    align-items: flex-start !important;
  }
  .align-items-xxl-end {
    align-items: flex-end !important;
  }
  .align-items-xxl-center {
    align-items: center !important;
  }
  .align-items-xxl-baseline {
    align-items: baseline !important;
  }
  .align-items-xxl-stretch {
    align-items: stretch !important;
  }
  .align-content-xxl-start {
    align-content: flex-start !important;
  }
  .align-content-xxl-end {
    align-content: flex-end !important;
  }
  .align-content-xxl-center {
    align-content: center !important;
  }
  .align-content-xxl-between {
    align-content: space-between !important;
  }
  .align-content-xxl-around {
    align-content: space-around !important;
  }
  .align-content-xxl-stretch {
    align-content: stretch !important;
  }
  .align-self-xxl-auto {
    align-self: auto !important;
  }
  .align-self-xxl-start {
    align-self: flex-start !important;
  }
  .align-self-xxl-end {
    align-self: flex-end !important;
  }
  .align-self-xxl-center {
    align-self: center !important;
  }
  .align-self-xxl-baseline {
    align-self: baseline !important;
  }
  .align-self-xxl-stretch {
    align-self: stretch !important;
  }
  .order-xxl-first {
    order: -1 !important;
  }
  .order-xxl-0 {
    order: 0 !important;
  }
  .order-xxl-1 {
    order: 1 !important;
  }
  .order-xxl-2 {
    order: 2 !important;
  }
  .order-xxl-3 {
    order: 3 !important;
  }
  .order-xxl-4 {
    order: 4 !important;
  }
  .order-xxl-5 {
    order: 5 !important;
  }
  .order-xxl-last {
    order: 6 !important;
  }
  .m-xxl-0 {
    margin: 0 !important;
  }
  .m-xxl-1 {
    margin: 0.25rem !important;
  }
  .m-xxl-2 {
    margin: 0.5rem !important;
  }
  .m-xxl-3 {
    margin: 1rem !important;
  }
  .m-xxl-4 {
    margin: 1.5rem !important;
  }
  .m-xxl-5 {
    margin: 2rem !important;
  }
  .m-xxl-6 {
    margin: 2.5rem !important;
  }
  .m-xxl-7 {
    margin: 3rem !important;
  }
  .m-xxl-8 {
    margin: 3.5rem !important;
  }
  .m-xxl-auto {
    margin: auto !important;
  }
  .mx-xxl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .mx-xxl-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .mx-xxl-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .mx-xxl-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .mx-xxl-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .mx-xxl-5 {
    margin-right: 2rem !important;
    margin-left: 2rem !important;
  }
  .mx-xxl-6 {
    margin-right: 2.5rem !important;
    margin-left: 2.5rem !important;
  }
  .mx-xxl-7 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .mx-xxl-8 {
    margin-right: 3.5rem !important;
    margin-left: 3.5rem !important;
  }
  .mx-xxl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .my-xxl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .my-xxl-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .my-xxl-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .my-xxl-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .my-xxl-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .my-xxl-5 {
    margin-top: 2rem !important;
    margin-bottom: 2rem !important;
  }
  .my-xxl-6 {
    margin-top: 2.5rem !important;
    margin-bottom: 2.5rem !important;
  }
  .my-xxl-7 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .my-xxl-8 {
    margin-top: 3.5rem !important;
    margin-bottom: 3.5rem !important;
  }
  .my-xxl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .mt-xxl-0 {
    margin-top: 0 !important;
  }
  .mt-xxl-1 {
    margin-top: 0.25rem !important;
  }
  .mt-xxl-2 {
    margin-top: 0.5rem !important;
  }
  .mt-xxl-3 {
    margin-top: 1rem !important;
  }
  .mt-xxl-4 {
    margin-top: 1.5rem !important;
  }
  .mt-xxl-5 {
    margin-top: 2rem !important;
  }
  .mt-xxl-6 {
    margin-top: 2.5rem !important;
  }
  .mt-xxl-7 {
    margin-top: 3rem !important;
  }
  .mt-xxl-8 {
    margin-top: 3.5rem !important;
  }
  .mt-xxl-auto {
    margin-top: auto !important;
  }
  .me-xxl-0 {
    margin-right: 0 !important;
  }
  .me-xxl-1 {
    margin-right: 0.25rem !important;
  }
  .me-xxl-2 {
    margin-right: 0.5rem !important;
  }
  .me-xxl-3 {
    margin-right: 1rem !important;
  }
  .me-xxl-4 {
    margin-right: 1.5rem !important;
  }
  .me-xxl-5 {
    margin-right: 2rem !important;
  }
  .me-xxl-6 {
    margin-right: 2.5rem !important;
  }
  .me-xxl-7 {
    margin-right: 3rem !important;
  }
  .me-xxl-8 {
    margin-right: 3.5rem !important;
  }
  .me-xxl-auto {
    margin-right: auto !important;
  }
  .mb-xxl-0 {
    margin-bottom: 0 !important;
  }
  .mb-xxl-1 {
    margin-bottom: 0.25rem !important;
  }
  .mb-xxl-2 {
    margin-bottom: 0.5rem !important;
  }
  .mb-xxl-3 {
    margin-bottom: 1rem !important;
  }
  .mb-xxl-4 {
    margin-bottom: 1.5rem !important;
  }
  .mb-xxl-5 {
    margin-bottom: 2rem !important;
  }
  .mb-xxl-6 {
    margin-bottom: 2.5rem !important;
  }
  .mb-xxl-7 {
    margin-bottom: 3rem !important;
  }
  .mb-xxl-8 {
    margin-bottom: 3.5rem !important;
  }
  .mb-xxl-auto {
    margin-bottom: auto !important;
  }
  .ms-xxl-0 {
    margin-left: 0 !important;
  }
  .ms-xxl-1 {
    margin-left: 0.25rem !important;
  }
  .ms-xxl-2 {
    margin-left: 0.5rem !important;
  }
  .ms-xxl-3 {
    margin-left: 1rem !important;
  }
  .ms-xxl-4 {
    margin-left: 1.5rem !important;
  }
  .ms-xxl-5 {
    margin-left: 2rem !important;
  }
  .ms-xxl-6 {
    margin-left: 2.5rem !important;
  }
  .ms-xxl-7 {
    margin-left: 3rem !important;
  }
  .ms-xxl-8 {
    margin-left: 3.5rem !important;
  }
  .ms-xxl-auto {
    margin-left: auto !important;
  }
  .p-xxl-0 {
    padding: 0 !important;
  }
  .p-xxl-1 {
    padding: 0.25rem !important;
  }
  .p-xxl-2 {
    padding: 0.5rem !important;
  }
  .p-xxl-3 {
    padding: 1rem !important;
  }
  .p-xxl-4 {
    padding: 1.5rem !important;
  }
  .p-xxl-5 {
    padding: 2rem !important;
  }
  .p-xxl-6 {
    padding: 2.5rem !important;
  }
  .p-xxl-7 {
    padding: 3rem !important;
  }
  .p-xxl-8 {
    padding: 3.5rem !important;
  }
  .px-xxl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .px-xxl-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .px-xxl-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .px-xxl-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .px-xxl-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .px-xxl-5 {
    padding-right: 2rem !important;
    padding-left: 2rem !important;
  }
  .px-xxl-6 {
    padding-right: 2.5rem !important;
    padding-left: 2.5rem !important;
  }
  .px-xxl-7 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .px-xxl-8 {
    padding-right: 3.5rem !important;
    padding-left: 3.5rem !important;
  }
  .py-xxl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .py-xxl-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .py-xxl-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .py-xxl-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .py-xxl-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .py-xxl-5 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .py-xxl-6 {
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
  }
  .py-xxl-7 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .py-xxl-8 {
    padding-top: 3.5rem !important;
    padding-bottom: 3.5rem !important;
  }
  .pt-xxl-0 {
    padding-top: 0 !important;
  }
  .pt-xxl-1 {
    padding-top: 0.25rem !important;
  }
  .pt-xxl-2 {
    padding-top: 0.5rem !important;
  }
  .pt-xxl-3 {
    padding-top: 1rem !important;
  }
  .pt-xxl-4 {
    padding-top: 1.5rem !important;
  }
  .pt-xxl-5 {
    padding-top: 2rem !important;
  }
  .pt-xxl-6 {
    padding-top: 2.5rem !important;
  }
  .pt-xxl-7 {
    padding-top: 3rem !important;
  }
  .pt-xxl-8 {
    padding-top: 3.5rem !important;
  }
  .pe-xxl-0 {
    padding-right: 0 !important;
  }
  .pe-xxl-1 {
    padding-right: 0.25rem !important;
  }
  .pe-xxl-2 {
    padding-right: 0.5rem !important;
  }
  .pe-xxl-3 {
    padding-right: 1rem !important;
  }
  .pe-xxl-4 {
    padding-right: 1.5rem !important;
  }
  .pe-xxl-5 {
    padding-right: 2rem !important;
  }
  .pe-xxl-6 {
    padding-right: 2.5rem !important;
  }
  .pe-xxl-7 {
    padding-right: 3rem !important;
  }
  .pe-xxl-8 {
    padding-right: 3.5rem !important;
  }
  .pb-xxl-0 {
    padding-bottom: 0 !important;
  }
  .pb-xxl-1 {
    padding-bottom: 0.25rem !important;
  }
  .pb-xxl-2 {
    padding-bottom: 0.5rem !important;
  }
  .pb-xxl-3 {
    padding-bottom: 1rem !important;
  }
  .pb-xxl-4 {
    padding-bottom: 1.5rem !important;
  }
  .pb-xxl-5 {
    padding-bottom: 2rem !important;
  }
  .pb-xxl-6 {
    padding-bottom: 2.5rem !important;
  }
  .pb-xxl-7 {
    padding-bottom: 3rem !important;
  }
  .pb-xxl-8 {
    padding-bottom: 3.5rem !important;
  }
  .ps-xxl-0 {
    padding-left: 0 !important;
  }
  .ps-xxl-1 {
    padding-left: 0.25rem !important;
  }
  .ps-xxl-2 {
    padding-left: 0.5rem !important;
  }
  .ps-xxl-3 {
    padding-left: 1rem !important;
  }
  .ps-xxl-4 {
    padding-left: 1.5rem !important;
  }
  .ps-xxl-5 {
    padding-left: 2rem !important;
  }
  .ps-xxl-6 {
    padding-left: 2.5rem !important;
  }
  .ps-xxl-7 {
    padding-left: 3rem !important;
  }
  .ps-xxl-8 {
    padding-left: 3.5rem !important;
  }
  .text-xxl-start {
    text-align: left !important;
  }
  .text-xxl-end {
    text-align: right !important;
  }
  .text-xxl-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .fs-0 {
    font-size: 3.5rem !important;
  }
  .fs-1 {
    font-size: 2.5rem !important;
  }
  .fs-2 {
    font-size: 2rem !important;
  }
  .fs-3 {
    font-size: 1.5rem !important;
  }
}
@media print {
  .d-print-inline {
    display: inline !important;
  }
  .d-print-inline-block {
    display: inline-block !important;
  }
  .d-print-block {
    display: block !important;
  }
  .d-print-grid {
    display: grid !important;
  }
  .d-print-table {
    display: table !important;
  }
  .d-print-table-row {
    display: table-row !important;
  }
  .d-print-table-cell {
    display: table-cell !important;
  }
  .d-print-flex {
    display: flex !important;
  }
  .d-print-inline-flex {
    display: inline-flex !important;
  }
  .d-print-none {
    display: none !important;
  }
}
.container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  width: 100%;
  padding-right: var(--sgds-gutter-x, 0.75rem);
  padding-left: var(--sgds-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container-sm, .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container-md, .container-sm, .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container-lg, .container-md, .container-sm, .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1140px;
  }
}
@media (min-width: 1400px) {
  .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1320px;
  }
}
.row {
  --sgds-gutter-x: 1.5rem;
  --sgds-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--sgds-gutter-y));
  margin-right: calc(-0.5 * var(--sgds-gutter-x));
  margin-left: calc(-0.5 * var(--sgds-gutter-x));
}
.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--sgds-gutter-x) * 0.5);
  padding-left: calc(var(--sgds-gutter-x) * 0.5);
  margin-top: var(--sgds-gutter-y);
}

.col {
  flex: 1 0 0%;
}

.row-cols-auto > * {
  flex: 0 0 auto;
  width: auto;
}

.row-cols-1 > * {
  flex: 0 0 auto;
  width: 100%;
}

.row-cols-2 > * {
  flex: 0 0 auto;
  width: 50%;
}

.row-cols-3 > * {
  flex: 0 0 auto;
  width: 33.3333333333%;
}

.row-cols-4 > * {
  flex: 0 0 auto;
  width: 25%;
}

.row-cols-5 > * {
  flex: 0 0 auto;
  width: 20%;
}

.row-cols-6 > * {
  flex: 0 0 auto;
  width: 16.6666666667%;
}

.col-auto {
  flex: 0 0 auto;
  width: auto;
}

.col-1 {
  flex: 0 0 auto;
  width: 8.33333333%;
}

.col-2 {
  flex: 0 0 auto;
  width: 16.66666667%;
}

.col-3 {
  flex: 0 0 auto;
  width: 25%;
}

.col-4 {
  flex: 0 0 auto;
  width: 33.33333333%;
}

.col-5 {
  flex: 0 0 auto;
  width: 41.66666667%;
}

.col-6 {
  flex: 0 0 auto;
  width: 50%;
}

.col-7 {
  flex: 0 0 auto;
  width: 58.33333333%;
}

.col-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
}

.col-9 {
  flex: 0 0 auto;
  width: 75%;
}

.col-10 {
  flex: 0 0 auto;
  width: 83.33333333%;
}

.col-11 {
  flex: 0 0 auto;
  width: 91.66666667%;
}

.col-12 {
  flex: 0 0 auto;
  width: 100%;
}

.offset-1 {
  margin-left: 8.33333333%;
}

.offset-2 {
  margin-left: 16.66666667%;
}

.offset-3 {
  margin-left: 25%;
}

.offset-4 {
  margin-left: 33.33333333%;
}

.offset-5 {
  margin-left: 41.66666667%;
}

.offset-6 {
  margin-left: 50%;
}

.offset-7 {
  margin-left: 58.33333333%;
}

.offset-8 {
  margin-left: 66.66666667%;
}

.offset-9 {
  margin-left: 75%;
}

.offset-10 {
  margin-left: 83.33333333%;
}

.offset-11 {
  margin-left: 91.66666667%;
}

.g-0,
.gx-0 {
  --sgds-gutter-x: 0;
}

.g-0,
.gy-0 {
  --sgds-gutter-y: 0;
}

.g-1,
.gx-1 {
  --sgds-gutter-x: 0.25rem;
}

.g-1,
.gy-1 {
  --sgds-gutter-y: 0.25rem;
}

.g-2,
.gx-2 {
  --sgds-gutter-x: 0.5rem;
}

.g-2,
.gy-2 {
  --sgds-gutter-y: 0.5rem;
}

.g-3,
.gx-3 {
  --sgds-gutter-x: 1rem;
}

.g-3,
.gy-3 {
  --sgds-gutter-y: 1rem;
}

.g-4,
.gx-4 {
  --sgds-gutter-x: 1.5rem;
}

.g-4,
.gy-4 {
  --sgds-gutter-y: 1.5rem;
}

.g-5,
.gx-5 {
  --sgds-gutter-x: 2rem;
}

.g-5,
.gy-5 {
  --sgds-gutter-y: 2rem;
}

.g-6,
.gx-6 {
  --sgds-gutter-x: 2.5rem;
}

.g-6,
.gy-6 {
  --sgds-gutter-y: 2.5rem;
}

.g-7,
.gx-7 {
  --sgds-gutter-x: 3rem;
}

.g-7,
.gy-7 {
  --sgds-gutter-y: 3rem;
}

.g-8,
.gx-8 {
  --sgds-gutter-x: 3.5rem;
}

.g-8,
.gy-8 {
  --sgds-gutter-y: 3.5rem;
}

@media (min-width: 576px) {
  .col-sm {
    flex: 1 0 0%;
  }
  .row-cols-sm-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-sm-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-sm-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-sm-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-sm-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-sm-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-sm-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-sm-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-sm-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-sm-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-sm-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-sm-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-sm-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-sm-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-sm-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-sm-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-sm-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-sm-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-sm-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-sm-0 {
    margin-left: 0;
  }
  .offset-sm-1 {
    margin-left: 8.33333333%;
  }
  .offset-sm-2 {
    margin-left: 16.66666667%;
  }
  .offset-sm-3 {
    margin-left: 25%;
  }
  .offset-sm-4 {
    margin-left: 33.33333333%;
  }
  .offset-sm-5 {
    margin-left: 41.66666667%;
  }
  .offset-sm-6 {
    margin-left: 50%;
  }
  .offset-sm-7 {
    margin-left: 58.33333333%;
  }
  .offset-sm-8 {
    margin-left: 66.66666667%;
  }
  .offset-sm-9 {
    margin-left: 75%;
  }
  .offset-sm-10 {
    margin-left: 83.33333333%;
  }
  .offset-sm-11 {
    margin-left: 91.66666667%;
  }
  .g-sm-0,
  .gx-sm-0 {
    --sgds-gutter-x: 0;
  }
  .g-sm-0,
  .gy-sm-0 {
    --sgds-gutter-y: 0;
  }
  .g-sm-1,
  .gx-sm-1 {
    --sgds-gutter-x: 0.25rem;
  }
  .g-sm-1,
  .gy-sm-1 {
    --sgds-gutter-y: 0.25rem;
  }
  .g-sm-2,
  .gx-sm-2 {
    --sgds-gutter-x: 0.5rem;
  }
  .g-sm-2,
  .gy-sm-2 {
    --sgds-gutter-y: 0.5rem;
  }
  .g-sm-3,
  .gx-sm-3 {
    --sgds-gutter-x: 1rem;
  }
  .g-sm-3,
  .gy-sm-3 {
    --sgds-gutter-y: 1rem;
  }
  .g-sm-4,
  .gx-sm-4 {
    --sgds-gutter-x: 1.5rem;
  }
  .g-sm-4,
  .gy-sm-4 {
    --sgds-gutter-y: 1.5rem;
  }
  .g-sm-5,
  .gx-sm-5 {
    --sgds-gutter-x: 2rem;
  }
  .g-sm-5,
  .gy-sm-5 {
    --sgds-gutter-y: 2rem;
  }
  .g-sm-6,
  .gx-sm-6 {
    --sgds-gutter-x: 2.5rem;
  }
  .g-sm-6,
  .gy-sm-6 {
    --sgds-gutter-y: 2.5rem;
  }
  .g-sm-7,
  .gx-sm-7 {
    --sgds-gutter-x: 3rem;
  }
  .g-sm-7,
  .gy-sm-7 {
    --sgds-gutter-y: 3rem;
  }
  .g-sm-8,
  .gx-sm-8 {
    --sgds-gutter-x: 3.5rem;
  }
  .g-sm-8,
  .gy-sm-8 {
    --sgds-gutter-y: 3.5rem;
  }
}
@media (min-width: 768px) {
  .col-md {
    flex: 1 0 0%;
  }
  .row-cols-md-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-md-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-md-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-md-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-md-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-md-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-md-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-md-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-md-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-md-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-md-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-md-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-md-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-md-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-md-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-md-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-md-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-md-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-md-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-md-0 {
    margin-left: 0;
  }
  .offset-md-1 {
    margin-left: 8.33333333%;
  }
  .offset-md-2 {
    margin-left: 16.66666667%;
  }
  .offset-md-3 {
    margin-left: 25%;
  }
  .offset-md-4 {
    margin-left: 33.33333333%;
  }
  .offset-md-5 {
    margin-left: 41.66666667%;
  }
  .offset-md-6 {
    margin-left: 50%;
  }
  .offset-md-7 {
    margin-left: 58.33333333%;
  }
  .offset-md-8 {
    margin-left: 66.66666667%;
  }
  .offset-md-9 {
    margin-left: 75%;
  }
  .offset-md-10 {
    margin-left: 83.33333333%;
  }
  .offset-md-11 {
    margin-left: 91.66666667%;
  }
  .g-md-0,
  .gx-md-0 {
    --sgds-gutter-x: 0;
  }
  .g-md-0,
  .gy-md-0 {
    --sgds-gutter-y: 0;
  }
  .g-md-1,
  .gx-md-1 {
    --sgds-gutter-x: 0.25rem;
  }
  .g-md-1,
  .gy-md-1 {
    --sgds-gutter-y: 0.25rem;
  }
  .g-md-2,
  .gx-md-2 {
    --sgds-gutter-x: 0.5rem;
  }
  .g-md-2,
  .gy-md-2 {
    --sgds-gutter-y: 0.5rem;
  }
  .g-md-3,
  .gx-md-3 {
    --sgds-gutter-x: 1rem;
  }
  .g-md-3,
  .gy-md-3 {
    --sgds-gutter-y: 1rem;
  }
  .g-md-4,
  .gx-md-4 {
    --sgds-gutter-x: 1.5rem;
  }
  .g-md-4,
  .gy-md-4 {
    --sgds-gutter-y: 1.5rem;
  }
  .g-md-5,
  .gx-md-5 {
    --sgds-gutter-x: 2rem;
  }
  .g-md-5,
  .gy-md-5 {
    --sgds-gutter-y: 2rem;
  }
  .g-md-6,
  .gx-md-6 {
    --sgds-gutter-x: 2.5rem;
  }
  .g-md-6,
  .gy-md-6 {
    --sgds-gutter-y: 2.5rem;
  }
  .g-md-7,
  .gx-md-7 {
    --sgds-gutter-x: 3rem;
  }
  .g-md-7,
  .gy-md-7 {
    --sgds-gutter-y: 3rem;
  }
  .g-md-8,
  .gx-md-8 {
    --sgds-gutter-x: 3.5rem;
  }
  .g-md-8,
  .gy-md-8 {
    --sgds-gutter-y: 3.5rem;
  }
}
@media (min-width: 992px) {
  .col-lg {
    flex: 1 0 0%;
  }
  .row-cols-lg-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-lg-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-lg-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-lg-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-lg-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-lg-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-lg-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-lg-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-lg-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-lg-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-lg-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-lg-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-lg-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-lg-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-lg-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-lg-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-lg-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-lg-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-lg-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-lg-0 {
    margin-left: 0;
  }
  .offset-lg-1 {
    margin-left: 8.33333333%;
  }
  .offset-lg-2 {
    margin-left: 16.66666667%;
  }
  .offset-lg-3 {
    margin-left: 25%;
  }
  .offset-lg-4 {
    margin-left: 33.33333333%;
  }
  .offset-lg-5 {
    margin-left: 41.66666667%;
  }
  .offset-lg-6 {
    margin-left: 50%;
  }
  .offset-lg-7 {
    margin-left: 58.33333333%;
  }
  .offset-lg-8 {
    margin-left: 66.66666667%;
  }
  .offset-lg-9 {
    margin-left: 75%;
  }
  .offset-lg-10 {
    margin-left: 83.33333333%;
  }
  .offset-lg-11 {
    margin-left: 91.66666667%;
  }
  .g-lg-0,
  .gx-lg-0 {
    --sgds-gutter-x: 0;
  }
  .g-lg-0,
  .gy-lg-0 {
    --sgds-gutter-y: 0;
  }
  .g-lg-1,
  .gx-lg-1 {
    --sgds-gutter-x: 0.25rem;
  }
  .g-lg-1,
  .gy-lg-1 {
    --sgds-gutter-y: 0.25rem;
  }
  .g-lg-2,
  .gx-lg-2 {
    --sgds-gutter-x: 0.5rem;
  }
  .g-lg-2,
  .gy-lg-2 {
    --sgds-gutter-y: 0.5rem;
  }
  .g-lg-3,
  .gx-lg-3 {
    --sgds-gutter-x: 1rem;
  }
  .g-lg-3,
  .gy-lg-3 {
    --sgds-gutter-y: 1rem;
  }
  .g-lg-4,
  .gx-lg-4 {
    --sgds-gutter-x: 1.5rem;
  }
  .g-lg-4,
  .gy-lg-4 {
    --sgds-gutter-y: 1.5rem;
  }
  .g-lg-5,
  .gx-lg-5 {
    --sgds-gutter-x: 2rem;
  }
  .g-lg-5,
  .gy-lg-5 {
    --sgds-gutter-y: 2rem;
  }
  .g-lg-6,
  .gx-lg-6 {
    --sgds-gutter-x: 2.5rem;
  }
  .g-lg-6,
  .gy-lg-6 {
    --sgds-gutter-y: 2.5rem;
  }
  .g-lg-7,
  .gx-lg-7 {
    --sgds-gutter-x: 3rem;
  }
  .g-lg-7,
  .gy-lg-7 {
    --sgds-gutter-y: 3rem;
  }
  .g-lg-8,
  .gx-lg-8 {
    --sgds-gutter-x: 3.5rem;
  }
  .g-lg-8,
  .gy-lg-8 {
    --sgds-gutter-y: 3.5rem;
  }
}
@media (min-width: 1200px) {
  .col-xl {
    flex: 1 0 0%;
  }
  .row-cols-xl-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-xl-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-xl-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-xl-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-xl-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-xl-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-xl-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-xl-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-xl-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-xl-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-xl-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-xl-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-xl-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-xl-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-xl-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-xl-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-xl-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-xl-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-xl-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-xl-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-xl-0 {
    margin-left: 0;
  }
  .offset-xl-1 {
    margin-left: 8.33333333%;
  }
  .offset-xl-2 {
    margin-left: 16.66666667%;
  }
  .offset-xl-3 {
    margin-left: 25%;
  }
  .offset-xl-4 {
    margin-left: 33.33333333%;
  }
  .offset-xl-5 {
    margin-left: 41.66666667%;
  }
  .offset-xl-6 {
    margin-left: 50%;
  }
  .offset-xl-7 {
    margin-left: 58.33333333%;
  }
  .offset-xl-8 {
    margin-left: 66.66666667%;
  }
  .offset-xl-9 {
    margin-left: 75%;
  }
  .offset-xl-10 {
    margin-left: 83.33333333%;
  }
  .offset-xl-11 {
    margin-left: 91.66666667%;
  }
  .g-xl-0,
  .gx-xl-0 {
    --sgds-gutter-x: 0;
  }
  .g-xl-0,
  .gy-xl-0 {
    --sgds-gutter-y: 0;
  }
  .g-xl-1,
  .gx-xl-1 {
    --sgds-gutter-x: 0.25rem;
  }
  .g-xl-1,
  .gy-xl-1 {
    --sgds-gutter-y: 0.25rem;
  }
  .g-xl-2,
  .gx-xl-2 {
    --sgds-gutter-x: 0.5rem;
  }
  .g-xl-2,
  .gy-xl-2 {
    --sgds-gutter-y: 0.5rem;
  }
  .g-xl-3,
  .gx-xl-3 {
    --sgds-gutter-x: 1rem;
  }
  .g-xl-3,
  .gy-xl-3 {
    --sgds-gutter-y: 1rem;
  }
  .g-xl-4,
  .gx-xl-4 {
    --sgds-gutter-x: 1.5rem;
  }
  .g-xl-4,
  .gy-xl-4 {
    --sgds-gutter-y: 1.5rem;
  }
  .g-xl-5,
  .gx-xl-5 {
    --sgds-gutter-x: 2rem;
  }
  .g-xl-5,
  .gy-xl-5 {
    --sgds-gutter-y: 2rem;
  }
  .g-xl-6,
  .gx-xl-6 {
    --sgds-gutter-x: 2.5rem;
  }
  .g-xl-6,
  .gy-xl-6 {
    --sgds-gutter-y: 2.5rem;
  }
  .g-xl-7,
  .gx-xl-7 {
    --sgds-gutter-x: 3rem;
  }
  .g-xl-7,
  .gy-xl-7 {
    --sgds-gutter-y: 3rem;
  }
  .g-xl-8,
  .gx-xl-8 {
    --sgds-gutter-x: 3.5rem;
  }
  .g-xl-8,
  .gy-xl-8 {
    --sgds-gutter-y: 3.5rem;
  }
}
@media (min-width: 1400px) {
  .col-xxl {
    flex: 1 0 0%;
  }
  .row-cols-xxl-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-xxl-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-xxl-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-xxl-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-xxl-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-xxl-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-xxl-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-xxl-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-xxl-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-xxl-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-xxl-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-xxl-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-xxl-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-xxl-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-xxl-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-xxl-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-xxl-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-xxl-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-xxl-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-xxl-12 {
    flex: 0 0 auto;
    width: 100%;
  }
  .offset-xxl-0 {
    margin-left: 0;
  }
  .offset-xxl-1 {
    margin-left: 8.33333333%;
  }
  .offset-xxl-2 {
    margin-left: 16.66666667%;
  }
  .offset-xxl-3 {
    margin-left: 25%;
  }
  .offset-xxl-4 {
    margin-left: 33.33333333%;
  }
  .offset-xxl-5 {
    margin-left: 41.66666667%;
  }
  .offset-xxl-6 {
    margin-left: 50%;
  }
  .offset-xxl-7 {
    margin-left: 58.33333333%;
  }
  .offset-xxl-8 {
    margin-left: 66.66666667%;
  }
  .offset-xxl-9 {
    margin-left: 75%;
  }
  .offset-xxl-10 {
    margin-left: 83.33333333%;
  }
  .offset-xxl-11 {
    margin-left: 91.66666667%;
  }
  .g-xxl-0,
  .gx-xxl-0 {
    --sgds-gutter-x: 0;
  }
  .g-xxl-0,
  .gy-xxl-0 {
    --sgds-gutter-y: 0;
  }
  .g-xxl-1,
  .gx-xxl-1 {
    --sgds-gutter-x: 0.25rem;
  }
  .g-xxl-1,
  .gy-xxl-1 {
    --sgds-gutter-y: 0.25rem;
  }
  .g-xxl-2,
  .gx-xxl-2 {
    --sgds-gutter-x: 0.5rem;
  }
  .g-xxl-2,
  .gy-xxl-2 {
    --sgds-gutter-y: 0.5rem;
  }
  .g-xxl-3,
  .gx-xxl-3 {
    --sgds-gutter-x: 1rem;
  }
  .g-xxl-3,
  .gy-xxl-3 {
    --sgds-gutter-y: 1rem;
  }
  .g-xxl-4,
  .gx-xxl-4 {
    --sgds-gutter-x: 1.5rem;
  }
  .g-xxl-4,
  .gy-xxl-4 {
    --sgds-gutter-y: 1.5rem;
  }
  .g-xxl-5,
  .gx-xxl-5 {
    --sgds-gutter-x: 2rem;
  }
  .g-xxl-5,
  .gy-xxl-5 {
    --sgds-gutter-y: 2rem;
  }
  .g-xxl-6,
  .gx-xxl-6 {
    --sgds-gutter-x: 2.5rem;
  }
  .g-xxl-6,
  .gy-xxl-6 {
    --sgds-gutter-y: 2.5rem;
  }
  .g-xxl-7,
  .gx-xxl-7 {
    --sgds-gutter-x: 3rem;
  }
  .g-xxl-7,
  .gy-xxl-7 {
    --sgds-gutter-y: 3rem;
  }
  .g-xxl-8,
  .gx-xxl-8 {
    --sgds-gutter-x: 3.5rem;
  }
  .g-xxl-8,
  .gy-xxl-8 {
    --sgds-gutter-y: 3.5rem;
  }
}
:host {
  --masthead-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  --masthead-text-color: hsl(0, 0%, 28%);
  --masthead-link-color: hsl(222, 63%, 50%);
  --masthead-link-color-hover: hsl(221, 64%, 55%);
  --masthead-mobile-font-size: 0.6875rem;
  --masthead-mobile-padding-x: 0.75rem;
  --masthead-fluid-padding-x: 0.75rem;
  --masthead-crest-color: rgb(239, 51, 32);
}

.sgds-masthead {
  font-size: 0.875rem;
  background-color: hsl(0deg, 0%, 94%);
  font-family: var(--masthead-font-family);
  color: var(--masthead-text-color);
}
@media screen and (max-width: 1023px) {
  .sgds-masthead {
    font-size: var(--masthead-mobile-font-size);
  }
  .sgds-masthead .col, .sgds-masthead .row {
    padding-left: 0;
    padding-right: 0;
  }
  .sgds-masthead .row {
    margin-right: 0;
    margin-left: 0;
  }
}

.sg-crest {
  width: 1.25rem;
  height: 1.75rem;
}
.sg-crest path {
  fill: var(--masthead-crest-color);
}

.masthead-layout {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.sgds-masthead-identify-icon {
  width: 12px;
  height: 21px;
  display: block;
  transform: rotate(180deg);
  user-select: none;
  transition: all 0.3s ease-in-out 0s;
  align-self: center;
}
.sgds-masthead-identify-icon.show {
  transform: rotate(0deg);
}

.sgds-masthead-button {
  display: flex;
  color: var(--masthead-link-color);
  align-items: center;
  cursor: pointer;
}
.sgds-masthead-button-text {
  text-decoration: underline;
}
.sgds-masthead-button-text:hover {
  color: var(--masthead-link-color-hover);
}

.sgds-masthead-content {
  padding-top: 2.5rem;
  padding-bottom: 3rem;
  display: none;
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
}
.sgds-masthead-content .content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10rem;
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .sgds-masthead-content .content-grid .banner-icon-inline {
    width: 0.6rem;
    height: 0.6rem;
    margin-bottom: 0.1875rem;
  }
}
.sgds-masthead-content .content-grid .icon {
  margin-top: -0.1em;
}
.sgds-masthead-content .wrapper {
  display: flex;
  gap: 1rem;
  font-size: 1rem;
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .wrapper {
    font-size: var(--masthead-mobile-font-size);
    gap: 0.5rem;
  }
}
.sgds-masthead-content .wrapper .content .title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .wrapper .content .title {
    margin-bottom: 0.25rem;
  }
}
.sgds-masthead-content .wrapper .content article {
  line-height: 1.5rem;
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .wrapper .content article {
    line-height: 1.2rem;
  }
}
.sgds-masthead-content .wrapper .banner-icon {
  width: 1.125rem;
}
.sgds-masthead-content .wrapper .banner-icon path {
  fill: var(--masthead-text-color);
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .wrapper .banner-icon {
    width: 0.75rem;
  }
}
.sgds-masthead-content .wrapper .banner-icon svg {
  line-height: 1.5rem;
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .wrapper .banner-icon svg {
    width: 1.25rem;
  }
}
.sgds-masthead-content .wrapper .banner-icon-inline path {
  fill: var(--masthead-text-color);
}
@media screen and (max-width: 1023px) {
  .sgds-masthead-content .wrapper .banner-icon-inline {
    width: 0.6rem;
    height: 0.6rem;
    margin-bottom: 0.1875rem;
  }
}
.sgds-masthead-content.show {
  display: block;
}

a[target=_blank] {
  text-decoration: none;
}
a[target=_blank]::after {
  content: none;
}

a.trusted-websites-link {
  display: inline-flex;
  align-items: center;
  color: var(--masthead-link-color);
  margin-left: 0.125rem;
}
a.trusted-websites-link svg {
  margin-left: 0.125rem;
  fill: var(--masthead-link-color);
}
a.trusted-websites-link:hover {
  color: var(--masthead-link-color-hover);
}
a.trusted-websites-link:hover svg {
  fill: var(--masthead-link-color-hover);
}

@media screen and (max-width: 1023px) {
  .trusted-websites-icon {
    width: 0.75rem;
  }
}
@media screen and (max-width: 1023px) {
  .sgds-masthead > .container {
    padding-left: var(--masthead-mobile-padding-x);
    padding-right: var(--masthead-mobile-padding-x);
  }
}
.sgds-masthead > .container-fluid, .sgds-masthead > .container-sm, .sgds-masthead > .container-md, .sgds-masthead > .container-lg, .sgds-masthead > .container-xl, .sgds-masthead > .container-xxl {
  padding-left: var(--masthead-fluid-padding-x);
  padding-right: var(--masthead-fluid-padding-x);
}
@media screen and (max-width: 1023px) {
  .sgds-masthead > .container-fluid, .sgds-masthead > .container-sm, .sgds-masthead > .container-md, .sgds-masthead > .container-lg, .sgds-masthead > .container-xl, .sgds-masthead > .container-xxl {
    padding-left: var(--masthead-mobile-padding-x);
    padding-right: var(--masthead-mobile-padding-x);
  }
}
@media screen and (max-width: 1023px) {
  .sgds-masthead:not([fluid]) .container {
    margin: 0;
  }
}`;

class SgdsElement extends s {
    /** Emits a custom event with more convenient defaults. */
    emit(name, options) {
        const event = new CustomEvent(name, Object.assign({
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {}
        }, options));
        this.dispatchEvent(event);
        return event;
    }
}

/**
 * @property fluid - Include this attribute for full width container
 */
let SgdsMasthead = class SgdsMasthead extends SgdsElement {
    constructor() {
        super(...arguments);
        this.fluid = false;
        this.toggleVisibility = false;
    }
    _toggleVisibility() {
        this.toggleVisibility = !this.toggleVisibility;
    }
    render() {
        return y `
      <div
        id="sgds-masthead"
        class="sgds-masthead"
        aria-label="A Singapore Government Agency Website"
      >
        <div class="${this.fluid ? "container-fluid" : "container"}">
          <div class="row">
            <div class="col">
              <div class="masthead-layout">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  class="sg-crest"
                >
                  <title>sg-crest</title>
                  <path
                    d="M5.896 11.185c0 0-0.949 1.341 0.294 3.075 0 0 0.196-0.883 2.159-0.883h2.356c2.225 0 3.893-2.126 2.846-4.319 0 0 1.57 0.164 2.095-0.818 0.523-0.981-0.033-1.374-0.818-1.374h-3.959c0 0.704-1.341 0.802-1.341 0h-2.225c0 0-1.669 0-1.701 1.407 0 0 0.377-0.229 0.752-0.261v0.375c0 0-0.458 0.082-0.671 0.197-0.212 0.114-0.523 0.425-0.228 1.227 0.294 0.801 0.409 1.079 0.409 1.079s0.475-0.41 1.244-0.41h0.9c1.602 0 1.308 1.554-0.295 1.554s-1.815-0.85-1.815-0.85z"
                  ></path>
                  <path
                    d="M14.255 9.566c0 0 0.54 0.033 0.932-0.31 0 0 3.55 2.765-1.717 8.326-5.268 5.562-1.195 9.162-1.195 9.162s-0.948 0.915-0.409 2.699c0 0-2.191-1.237-3.867-3.338-2.422-3.036-3.902-7.681 2.749-11.386 0 0 4.389-2.208 3.506-5.153z"
                  ></path>
                  <path
                    d="M8.829 6.343c0 0 0.709-1.265 2.355-1.265 1.298 0 1.594-0.666 1.594-0.666s0.566-1.079 3.424-1.079c2.619 0 4.384 0.873 5.812 2.039 0 0-3.85-2.388-7.645 0.971h-5.54z"
                  ></path>
                  <path
                    d="M24.839 14.348c-0.109-3.948-3.163-8.179-9.728-7.939 6.413-5.431 17.537 6.695 8.375 13.066 0 0 1.533-2.186 1.353-5.126z"
                  ></path>
                  <path
                    d="M16.093 6.845c8.005-0.24 10.863 9.357 5.693 13.676l-5.191 2.509c0 0-0.676-2.181 1.833-4.734 2.509-2.551 4.929-7.328-2.006-10.469 0 0 0.131-0.654-0.327-0.981z"
                  ></path>
                  <path
                    d="M15.678 9.004c0 0 0.393-0.371 0.524-0.676 5.954 2.486 5.017 6.697 1.461 10.23-2.181 2.246-1.505 4.668-1.505 4.668s-2.66 1.657-3.577 3.097c0 0-3.852-3.28 1.483-8.724 5.235-5.344 1.614-8.594 1.614-8.594z"
                  ></path>
                </svg>
                <span>A Singapore Government Agency Website</span>
                <div
                  class="sgds-masthead-button"
                  id="sgds-masthead-identify"
                  role="button"
                  aria-expanded="${this.toggleVisibility}"
                  aria-controls="sgds-masthead-content"
                  @click=${() => this._toggleVisibility()}
                >
                  <span class="sgds-masthead-button-text"
                    >How to identify</span
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    class="sgds-masthead-identify-icon ${!this.toggleVisibility ? null : "show"}"
                  >
                    <path
                      d="M8.65188 6.85L8.64813 6.84625L10.0031 5.49125L17.0744 12.5625L15.7194 13.9175L10.0075 8.20562L4.2875 13.9256L2.9325 12.5706L8.6525 6.85062L8.65188 6.85Z"
                      fill="#2F60CE"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="sgds-masthead-content" class="container sgds-masthead-content ${this.toggleVisibility ? "show" : null}">
          <div class="row">
            <div class="col">
              <div class="content-grid">
                <div class="wrapper">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      class="banner-icon"
                    >
                      <path
                        d="M0.166016 5.6665V9.00067H0.999349V13.9998H0.166016V16.4998H0.999349H3.49935H5.16602H7.66601H9.33268H11.8327H13.4993L15.9993 16.5007V16.4998H16.8327V13.9998H15.9993V9.00067H16.8327V5.6665L8.49935 0.666504L0.166016 5.6665ZM3.49935 13.9998V9.00067H5.16602V13.9998H3.49935ZM7.66601 13.9998V9.00067H9.33268V13.9998H7.66601ZM13.4993 13.9998H11.8327V9.00067H13.4993V13.9998ZM10.166 5.6665C10.166 6.58651 9.41935 7.33317 8.49935 7.33317C7.57935 7.33317 6.83268 6.58651 6.83268 5.6665C6.83268 4.7465 7.57935 3.99984 8.49935 3.99984C9.41935 3.99984 10.166 4.7465 10.166 5.6665Z"
                        fill="#242425"
                      ></path>
                    </svg>
                  </div>
                  <div class="content">
                    <div class="title">
                      Official website links end with .gov.sg
                    </div>
                    <article>
                      Government agencies communicate via .gov.sg websites (e.g.
                      go.gov.sg/open).<a
                        href="./"
                        class="trusted-websites-link"
                        rel="noreferrer"
                        target="_blank"
                        >Trusted websites<svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 32 32"
                          class="trusted-websites-icon"
                        >
                          <title>Trusted websites</title>
                          <path
                            d="M18.667 4v2.667h4c0.186-0.020 0.374-0.020 0.56 0l-2.667 2.667-6.973 6.987 1.88 1.88 9.733-9.667c0.092 0.257 0.137 0.528 0.133 0.8v4h2.667v-9.333h-9.333z"
                          ></path>
                          <path
                            d="M22.667 25.333h-16v-16h8v-2.667h-8c-1.473 0-2.667 1.194-2.667 2.667v16c0 1.473 1.194 2.667 2.667 2.667h16c1.473 0 2.667-1.194 2.667-2.667v-8h-2.667v8z"
                          ></path></svg
                      ></a>
                    </article>
                  </div>
                </div>
                <div class="wrapper">
                  <div class="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="18"
                      viewBox="0 0 15 18"
                      fill="none"
                      class="banner-icon"
                    >
                      <path
                        d="M14.1663 9.00008C14.1663 8.08091 13.4188 7.33342 12.4997 7.33342H11.6663V4.83342C11.6663 2.53591 9.79717 0.666748 7.49967 0.666748C5.20217 0.666748 3.33301 2.53591 3.33301 4.83342V7.33342H2.49967C1.58051 7.33342 0.833008 8.08091 0.833008 9.00008V15.6667C0.833008 16.5859 1.58051 17.3334 2.49967 17.3334H12.4997C13.4188 17.3334 14.1663 16.5859 14.1663 15.6667V9.00008ZM4.99967 4.83342C4.99967 3.45508 6.12134 2.33341 7.49967 2.33341C8.87801 2.33341 9.99967 3.45508 9.99967 4.83342V7.33342H4.99967V4.83342Z"
                        fill="#242425"
                      ></path>
                    </svg>
                  </div>
                  <div class="content">
                    <div class="title">Secure websites use HTTPS</div>
                    <article>
                      Look for a<b> lock </b>(<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none"
                        class="banner-icon-inline"
                      >
                        <path
                          d="M14.1663 9.00008C14.1663 8.08091 13.4188 7.33342 12.4997 7.33342H11.6663V4.83342C11.6663 2.53591 9.79717 0.666748 7.49967 0.666748C5.20217 0.666748 3.33301 2.53591 3.33301 4.83342V7.33342H2.49967C1.58051 7.33342 0.833008 8.08091 0.833008 9.00008V15.6667C0.833008 16.5859 1.58051 17.3334 2.49967 17.3334H12.4997C13.4188 17.3334 14.1663 16.5859 14.1663 15.6667V9.00008ZM4.99967 4.83342C4.99967 3.45508 6.12134 2.33341 7.49967 2.33341C8.87801 2.33341 9.99967 3.45508 9.99967 4.83342V7.33342H4.99967V4.83342Z"
                          fill="#242425"
                        ></path></svg
                      >) or https:// as an added precaution. Share sensitive
                      information only on official, secure websites.
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
};
SgdsMasthead.styles = css_248z;
__decorate([
    e({
        type: Boolean,
        reflect: true
    })
], SgdsMasthead.prototype, "fluid", void 0);
__decorate([
    t()
], SgdsMasthead.prototype, "toggleVisibility", void 0);
SgdsMasthead = __decorate([
    e$1("sgds-masthead")
], SgdsMasthead);

export {
    SgdsMasthead
};
//# sourceMappingURL=index.js.map