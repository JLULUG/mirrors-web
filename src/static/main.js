$INCLUDE_ONLY
'use strict';
$INCLUDE docs/index.js
$INCLUDE news/index.js

/* main.js */

var app = {
    data: {
        mirrors: [],
        relOrAbs: {},
        docsAll: docs,
        news: news,
        modal: false,
        distros: typeof distros === 'undefined' ? [] : distros,
        current: {},
    },
    computed: {
        docs: function () { return this.docsAll[this.lang] },
        badges: function () { return this.docsAll['_badges'] },
    },
    methods: {
        relTime: function (ts) { // don't touch this
            let diff = Date.now() / 1000 - ts
            let abs = Math.abs(diff)
            let future = diff < 0
            let round = future ? Math.ceil : Math.floor
            let ret = ''
            if (abs < (60 - future) + future) return future ? this._.timeSoon : this._.timeJustNow
            else if (abs < (60 * 60 - future) + future) ret = this._.timeMinute(round(abs / 60))
            else if (abs < (60 * 60 * 24 - future) + future) ret = this._.timeHour(round(abs / 60 / 60))
            else if (abs < (60 * 60 * 24 * 365 - future) + future) ret = this._.timeDay(round(abs / 60 / 60 / 24))
            else if (abs < (60 * 60 * 24 * 365 * 10 - future) + future) ret = this._.timeYear(round(abs / 60 / 60 / 24 / 365))
            else ret = this._.timeMore
            if (parseInt(ret) > 1) ret = this._.timePlural(ret)
            if (future) return this._.timeFuture(ret)
            else return this._.timePast(ret)
        },
        absTime: function (ts) { // this also
            return new Date((ts - new Date().getTimezoneOffset() * 60) * 1000).toISOString().slice(0, 16).replace('T', ' ')
        },
        flipAll: function () {
            for (let i in this.relOrAbs) this.relOrAbs[i] ^= 1
        },
        updateMirrors: async function () {
            let response = await fetch('./jobs')
            let mirrors = await response.json()
            mirrors.sort((a, b) => { // case insensitive sort
                return -1 + 2 * (a.name.toLowerCase() > b.name.toLowerCase())
            })
            mirrors.forEach((mirror) => {
                mirror.status = { // sanitize various statuses
                    'success': 'success',
                    'failed': 'failed',
                    'syncing': 'syncing',
                    'pre-syncing': 'syncing',
                }[mirror.status] || 'unknown'
                // responsive set
                this.$set(this.relOrAbs, mirror.name, this.relOrAbs[mirror.name] || false)
            })
            this.mirrors = mirrors
        },
    },
    created: function () {
        setInterval(this.updateMirrors, 60 * 1000)
        this.updateMirrors()
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Escape') {
                app.modal = false
            }
        })
    },
}

$INCLUDE static/common.js
