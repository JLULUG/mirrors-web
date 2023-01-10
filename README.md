# JLU Mirrors Website

[中文 README](./README.zh.md)

This repository is the frontend of the JLU Mirrors.

## Features

This website,

- is made of plain static HTML+CSS+JS files
- use the SSI (server-side inclusion) module of NGINX as a simple templating engine
- use [Vue.js 2.x](https://github.com/vuejs/vue) for client-side rendering of dynamic API results
- should be used with the API from [shine](https://github.com/JLULUG/shine)
- use [normalize.css](https://github.com/necolas/normalize.css) as the base style sheet
- use [Marked](https://github.com/markedjs/marked) for markdown rendering of news posts
- can be used with NGINX [fancyindex](https://github.com/aperezdc/ngx-fancyindex) module to provide frinedly directory browsering and noscript support
    - actual fancyindex runs JLU Mirrors was heavily modified, upstream ver sucks

## Installation

Store web with mirrors: `ln -srf public/* /mirrors_root/`

(Optionally) generate a large file for speedtesting: `dd if=/dev/urandom of=public/_static/speedtest.bin bs=1M count=1024`

Create documentation or news posts in `_{docs|news}` with the naming conventions [below](#structure), and generate JSON indices: `./index.py`

If your server doesn't support SSI, render it offline: `./ssi.py`

For NGINX configuration example, see `nginx-vhost.conf`

## Structure

- `public/`
    - `_docs/` - documentations of mirrors
        - `[mirror].{en|zh}.md` - markdown of docs with language suffix
        - `index.json` - generated index
        - `_index.html` - page template for documentations
    - `_news/` - news and announcements
        - `YYYY-MM-DD-[title].md` - markdown of news with date prefix
        - `index.json` - generated index
        - `_index.html` - page template for news
    - `_static/`
        - `lib/` - external libraries
        - `fancy/_{header|footer}.html` - template for fancyindex module
        - `common.{css|js}` - common style sheet and scripts
        - `{main|docs|news|fancy}.{css|js}` - page-specific ones
        - `logo.svg` - website logo
        - `_{header|footer|ban}.html` - HTML page template
    - `_index.html` - template of home page
- `index.py` - generate `_{doc|new}s/index.json`
- `ssi.py` - render `_*.html` SSI templates offline
- `nginx-vhost.conf` - NGINX config example
- `LICENSE.txt` - GNU AGPLv3 license text
- `README(.zh).md` - this document

## License

Copyleft 2022 LUG@JLU. Licensed under GNU Affero General Public License version 3.

The following files are licensed under MIT License:

- `public/_static/lib/marked.js` - Copyright 2011-2022 Christopher Jeffrey
- `public/_static/lib/normalize.min.css` - Copyright Nicolas Gallagher and Jonathan Neal
- `public/_static/lib/vue(.min).js` - Copyright 2014-2021 Evan You

The logo of Jilin University, which belongs to the university, is licensed under a private license.

## Acknowledgements

During the design of this website, mirrors from [TUNA](https://mirrors.tuna.tsinghua.edu.cn), [USTCLUG](https://mirrors.ustc.edu.cn) and [HITLUG](https://mirrors.hit.edu.cn) inspired us a lot.

Especially thanks to [Zenithal](https://github.com/ZenithalHourlyRate), [Keyu Tao](https://github.com/taoky) and [Billchenchina](https://github.com/BIllchenchina).
