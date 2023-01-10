'use strict';

var app = {
    data: {
        current: '',
        docsAll: {'en': {}, 'zh': {}},
    },
    computed: {
        docs: function () { return this.docsAll[this.lang] },
    },
    methods: {
        update: async function () {
            this.current = location.hash.slice(1)
            if (!this.docs[this.current]) this.current = 'index'
            location.hash = '#' + this.current
            let response = await (
                await fetch('./' + this.current + '.' + this.lang + '.md')
            ).text()
            document.getElementById('content').replaceChildren(
                document.createRange().createContextualFragment(
                    marked.parse(response)
                )
            )
            window.scrollTo(0, 0)
            this.$nextTick(function () {
                this.title = document.getElementsByTagName('h2')[0].textContent
            })
        }
    },
    created: async function () {
        this.docsAll = await (await fetch('/_docs/index.json')).json()
        window.addEventListener('hashchange', function () {
            app.update()
        })
    }
}
