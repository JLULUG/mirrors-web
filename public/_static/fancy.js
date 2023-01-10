'use strict';

if (new URL(location).searchParams.has('noscript')) {
    let redirect = new URL(location)
    redirect.searchParams.delete('noscript')
    location.replace(redirect)
}

var app = {
    created: function () {
        this.title = document.getElementsByTagName('h2')[0].textContent.slice('You are at '.length)
    }
}
