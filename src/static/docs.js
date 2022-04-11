$INCLUDE_ONLY
'use strict';
$INCLUDE static/lib/marked.min.js
$INCLUDE docs/index.js

/* docs.js */
var app = {
    el: '#app',
    data: {
        docsAll: docs,
        current: location.hash.slice(1),
        content: '',
    },
    computed: {
        docs: function () { return this.docsAll[this.lang] },
    },
    methods: {
        switchLang: function (change = true) {
            if (!this.docs[this.current]) this.current = '' // different availablity across lang
            this.update(this.current)
        },
        update: async function (doc) {
            this.current = doc
            if (!doc) doc = 'index'
            let response = await fetch('./_posts/' + doc + '.' + this.lang + '.md')
            this.content = marked.parse(await response.text())
            location.hash = '#' + doc
            window.scrollTo(0, 0)
        }
    },
    created: function () {
        window.addEventListener('hashchange', function () {
            app.update(location.hash.slice(1))
        })
    }
}

$INCLUDE static/common.js
