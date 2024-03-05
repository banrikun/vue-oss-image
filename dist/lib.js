var g = Object.defineProperty;
var a = (t, e, o) => e in t ? g(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var s = (t, e, o) => (a(t, typeof e != "symbol" ? e + "" : e, o), o);
const d = (t, e) => Object.prototype.hasOwnProperty.call(t, e), i = (t) => {
  t.keys.forEach((e) => {
    if (d(t.source, e)) {
      const o = e;
      t.target[o] = t.source[o];
    }
  });
}, f = typeof window.devicePixelRatio == "number" ? window.devicePixelRatio : 1, y = (t, e) => {
  const o = (t || "").replace(/\/$/, ""), r = (e || "").replace(/^\.*\//, "");
  return /^https?:\/\//.test(r) ? r : `${o}/${r}`;
}, U = (t) => {
  const e = t.resizeMode || "fill", o = typeof t.ratio == "number" && t.ratio >= 1 ? t.ratio : f, r = [];
  return t.width || t.height ? (t.width && r.push(`w_${Math.floor(t.width * o)}`), t.height && r.push(`h_${Math.floor(t.height * o)}`)) : (t.long || t.short) && (t.long && r.push(`l_${Math.floor(t.long * o)}`), t.short && r.push(`s_${Math.floor(t.short * o)}`)), r.length ? ["resize", `m_${e}`].concat(r).join(",") : "";
}, _ = (t) => typeof t == "number" && t >= 1 && t < 100 ? `quality,q_${Math.floor(t)}` : "", w = (t) => typeof t == "string" ? `format,${t}` : "", l = (t) => {
  if (!t.path)
    return "";
  const e = y(t.host, t.path), o = [
    U(t),
    _(t.quality),
    w(t.format)
  ].filter((n) => !!n), r = o.length ? ["?x-oss-process=image"].concat(o).join("/") : "";
  return e + r;
};
class c {
  constructor(e = {}) {
    s(this, "path");
    s(this, "loading");
    s(this, "error");
    i({
      source: e,
      target: this,
      keys: [
        "host",
        "quality",
        "format",
        "resizeMode",
        "ratio",
        "loading",
        "error"
      ]
    });
  }
  compose(e) {
    return l(e);
  }
  getUrl(e) {
    if (!e)
      return "";
    const o = {};
    return i({
      source: this,
      target: o,
      keys: [
        "host",
        "quality",
        "format",
        "resizeMode",
        "ratio",
        "width",
        "height",
        "long",
        "short"
      ]
    }), o.path = e, this.compose(o);
  }
  get url() {
    return this.getUrl(this.path);
  }
  get loadingUrl() {
    return this.getUrl(this.loading);
  }
  get errorUrl() {
    return this.getUrl(this.error);
  }
  setUrl(e, o) {
    if (!e)
      return;
    e.tagName.toLowerCase() === "img" ? e.setAttribute("src", o) : e.style.backgroundImage = `url(${o})`;
  }
}
const h = (t) => {
  class e extends c {
    constructor(r) {
      super(t), i({
        source: typeof r == "string" ? { path: r } : r || {},
        target: this,
        keys: [
          "host",
          "path",
          "quality",
          "format",
          "resizeMode",
          "ratio",
          "width",
          "height",
          "long",
          "short",
          "loading",
          "error"
        ]
      });
    }
  }
  return e;
}, u = (t) => {
  const e = (o, r) => {
    if (!r.url)
      return;
    const n = new Image();
    n.onload = () => {
      r.setUrl(o, r.url);
    }, r.errorUrl && (n.onerror = () => {
      r.setUrl(o, r.errorUrl);
    }), n.src = r.url;
  };
  return {
    mounted(o, r) {
      const n = new t(r.value);
      n.loadingUrl && n.setUrl(o, n.loadingUrl), e(o, n);
    },
    updated(o, r) {
      const n = new t(r.value);
      e(o, n);
    }
  };
}, p = (t, e) => {
  const o = e.prototype && e.prototype instanceof c ? e : h(e), r = u(o);
  t.directive("img", r);
}, M = {
  install: p,
  create: h,
  createHooks: u,
  compose: l
};
export {
  M as default
};
