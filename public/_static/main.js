'use strict';

var app = {
    data: {
        mirrors: [],
        docsAll: {'en': {}, 'zh': {}},
        news: [],
        modal: false,
        distros: undefined,
        current: '',
    },
    computed: {
        docs: function () { return this.docsAll[this.lang] },
        distro: function () { return this.distros[this.current] },
    },
    watch: {
        modal: function () {
            if (this.modal) {
                location.hash = '#' + (this.current = location.hash.slice(1))
            }
        }
    },
    methods: {
        relTime: function (ts) { // don't touch this
            let diff = Date.now() / 1000 - ts
            let abs = Math.abs(diff)
            let future = diff < 0
            let round = future ? Math.ceil : Math.floor
            let ret = ''
            if (abs < (60 - future) + future) ret = this._.timeSeconds
            else if (abs < (60 * 60 - future) + future) ret = this._.timeMinute(round(abs / 60))
            else if (abs < (60 * 60 * 24 - future) + future) ret = this._.timeHour(round(abs / 60 / 60))
            else if (abs < (60 * 60 * 24 * 365 - future) + future) ret = this._.timeDay(round(abs / 60 / 60 / 24))
            else if (abs < (60 * 60 * 24 * 365 * 10 - future) + future) ret = this._.timeYear(round(abs / 60 / 60 / 24 / 365))
            else ret = this._.timeMore
            if (parseInt(ret) > 1) ret = this._.timePlural(ret)
            return future ? this._.timeFuture(ret) : this._.timePast(ret)
        },
        absTime: function (ts) { // this either
            return new Date((ts - new Date().getTimezoneOffset() * 60) * 1000).toISOString().slice(0, 16).replace('T', ' ')
        },
        updateMirrors: async function () {
            let response = await fetch('/_api/shine.json')
            let mirrors = await response.json()
            mirrors.sort((a, b) => { // case insensitive sort
                return -1 + 2 * (a.name.toLowerCase() > b.name.toLowerCase())
            })
            this.mirrors = mirrors
        },
        loadDistros: async function () {
            this.distros = await (await fetch('/_api/distros.json')).json()
            this.modal = true
        }
    },
    created: async function () {
        setInterval(this.updateMirrors, 60 * 1000)
        this.updateMirrors()
        this.docsAll = await (await fetch('/_docs/index.json')).json()
        this.news = await (await fetch('/_news/index.json')).json()
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                app.modal = false
            }
        })
        window.addEventListener('hashchange', function () {
            app.current = location.hash.slice(1)
        })
    },
}
