'use strict';

var app = {
    data: {
        current: '',
        news: [],
    },
    methods: {
        update: async function () {
            this.current = location.hash.slice(1)
            if (!this.current) {
                this.title = this._.news
                return
            }
            let response = await (
                await fetch('./' + this.current + '.md')
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
        },
    },
    created: async function () {
        this.news = await (await fetch('/_news/index.json')).json()
        window.addEventListener('hashchange', function () {
            app.update()
        })
    },
}
