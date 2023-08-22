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

/* HACK: get client timezone and fix UTC date */
document.querySelectorAll(
    'main table#list tbody tr:not(:first-child) td:nth-child(3)'
).forEach((elm) => {
    elm.innerText = new Date(
        new Date(elm.innerText+' +0000')-new Date().getTimezoneOffset()*60*1000
    ).toISOString().slice(0, 16).replace('T', ' ')
})
document.getElementById('list').classList.add('tzlocal')
