if (!localStorage.lang) localStorage.lang = navigator.language.slice(0, 2)
if (!(localStorage.lang in i18n)) localStorage.lang = 'en'

app = { // inject option object for i18n
    ...app,
    el: '#app',
    data: {
        ...app.data,
        title: '',
        lang: localStorage.lang,
        i18n: i18n,
    },
    computed: {
        ...app.computed,
        _: function () { return this.i18n[this.lang] },
    },
    methods: {
        ...app.methods,
        switchLang: function (change = true) {
            if (change) this.lang = this.lang == 'en' ? 'zh' : 'en'
            localStorage.lang = this.lang
            document.documentElement.setAttribute('lang', this.lang)
            if (this.update) this.update()
        },
        _title: function () {
            if (!this.title) return this._.title
            return this.title+' | '+this._.title
        },
    },
    _created: app.created,
    created: function () {
        document.title = this._title()
        this.$watch(this._title, function (val, _) { document.title = val })
        this.switchLang(false)
        if (this.$options._created) this.$options._created.apply(this)
    },
}
app = new Vue(app)
