$INCLUDE_ONLY
'use strict';

/* fancy.js */
if (new URL(location).searchParams.has('noscript')) {
    let redirect = new URL(location)
    redirect.searchParams.delete('noscript')
    location.replace(redirect)
}

var app = {}

$INCLUDE static/common.js
