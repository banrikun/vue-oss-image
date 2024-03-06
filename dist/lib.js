var a = Object.defineProperty;
var d = (t, e, r) => e in t ? a(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var n = (t, e, r) => (d(t, typeof e != "symbol" ? e + "" : e, r), r);
const f = (t, e) => Object.prototype.hasOwnProperty.call(t, e), i = (t) => {
  t.keys.forEach((e) => {
    if (f(t.source, e)) {
      const r = e;
      t.target[r] = t.source[r];
    }
  });
}, y = typeof (window == null ? void 0 : window.devicePixelRatio) == "number" ? window.devicePixelRatio : 1, l = (t, e) => {
  if (!t)
    return;
  t.tagName.toLowerCase() === "img" ? t.setAttribute("src", e) : t.style.backgroundImage = `url(${e})`;
}, U = (t, e) => {
  const r = (t || "").replace(/\/$/, ""), o = (e || "").replace(/^\.*\//, "");
  return /^https?:\/\//.test(o) ? o : `${r}/${o}`;
}, _ = (t) => {
  const e = t.resizeMode || "fill", r = typeof t.ratio == "number" && t.ratio >= 1 ? t.ratio : y, o = [];
  return t.width || t.height ? (t.width && o.push(`w_${Math.floor(t.width * r)}`), t.height && o.push(`h_${Math.floor(t.height * r)}`)) : (t.long || t.short) && (t.long && o.push(`l_${Math.floor(t.long * r)}`), t.short && o.push(`s_${Math.floor(t.short * r)}`)), o.length ? ["resize", `m_${e}`].concat(o).join(",") : "";
}, w = (t) => typeof t == "number" && t >= 1 && t < 100 ? `quality,q_${Math.floor(t)}` : "", $ = (t) => t && typeof t == "string" ? `format,${t}` : "", b = (t) => /^data:image/.test(t), c = (t) => {
  if (!t.path)
    return "";
  if (b(t.path))
    return t.path;
  const e = U(t.host, t.path), r = [
    _(t),
    w(t.quality),
    $(t.format)
  ].filter((s) => !!s), o = r.length ? ["?x-oss-process=image"].concat(r).join("/") : "";
  return e + o;
};
class h {
  constructor(e = {}) {
    n(this, "attr");
    n(this, "path");
    n(this, "loading");
    n(this, "error");
    i({
      source: e,
      target: this,
      keys: [
        "attr",
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
    return c(e);
  }
  getUrl(e) {
    if (!e)
      return "";
    const r = {};
    return i({
      source: this,
      target: r,
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
    }), r.path = e, this.compose(r);
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
  setUrl(e, r) {
    e && (this.attr && typeof this.attr == "string" ? e.setAttribute(this.attr, r) : l(e, r));
  }
}
const u = (t) => {
  class e extends h {
    constructor(o) {
      super(t), i({
        source: typeof o == "string" ? { path: o } : o || {},
        target: this,
        keys: [
          "attr",
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
}, g = (t) => {
  const e = (r, o) => {
    if (!o.url)
      return;
    const s = new Image();
    s.onload = () => {
      o.setUrl(r, o.url);
    }, o.errorUrl && (s.onerror = () => {
      o.setUrl(r, o.errorUrl);
    }), s.src = o.url;
  };
  return {
    mounted(r, o) {
      const s = new t(o.value);
      s.loadingUrl || s.errorUrl ? (s.loadingUrl && s.setUrl(r, s.loadingUrl), e(r, s)) : s.url && s.setUrl(r, s.url);
    },
    updated(r, o) {
      const s = new t(o.value);
      e(r, s);
    }
  };
}, p = (t, e) => {
  const r = (e == null ? void 0 : e.prototype) instanceof h ? e : u(e), o = g(r);
  t.directive("img", o);
}, k = {
  install: p,
  create: u,
  createHooks: g,
  compose: c,
  copyKeys: i,
  setImageUrl: l
};
export {
  k as default
};
