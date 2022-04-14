$INCLUDE_ONLY
'use strict';
$INCLUDE static/lib/marked.min.js
$INCLUDE news/index.js

var app = {
    data: {
        news: news,
        current: '',
        content: '',
    },
    methods: {
        update: async function (post) {
            this.current = post
            if (!this.current) return
            let response = await fetch('./_posts/' + post + '.md')
            this.content = marked.parse(await response.text())
            location.hash = '#' + post
            window.scrollTo(0, 0)
        }
    },
    created: function () {
        this.update(location.hash.slice(1))
        window.addEventListener('hashchange', function () {
            app.update(location.hash.slice(1))
        })
    },
}

$INCLUDE static/common.js
