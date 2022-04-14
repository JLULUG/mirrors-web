$INCLUDE_ONLY NOCOPY
$INCLUDE static/lib/vue.min.js

/* common.js */
if (!localStorage.lang) localStorage.lang = navigator.language.slice(0, 2)
if (!(localStorage.lang in i18n)) localStorage.lang = 'en'

app = { // inject option object for i18n
    ...app,
    el: '#app',
    data: {
        ...app.data,
        lang: localStorage.lang,
        i18n: i18n,
    },
    computed: {
        ...app.computed,
        _: function () { return this.i18n[this.lang] },
    },
    methods: {
        ...app.methods,
        _switchLang: typeof app.methods === 'undefined' ? undefined : app.methods.switchLang,
        switchLang: function (change = true) {
            if (change) this.lang = this.lang == 'en' ? 'zh' : 'en'
            localStorage.lang = this.lang
            document.documentElement.setAttribute('lang', this.lang)
            document.title = this._.title
            if (this._switchLang) this._switchLang(change)
        },
    },
    _created: app.created,
    created: function () {
        this.switchLang(false)
        if (this.$options._created) this.$options._created.apply(this)
    },
}
app = new Vue(app)
