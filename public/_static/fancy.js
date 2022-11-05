'use strict';

if (new URL(location).searchParams.has('noscript')) {
    let redirect = new URL(location)
    redirect.searchParams.delete('noscript')
    location.replace(redirect)
}

var app = {}
