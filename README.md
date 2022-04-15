# JLU Mirrors Website

[中文 README](./README.zh.md)

## Usage

The website builds into static files. Python 3.7+ is required for building, with no other dependencies.

To build the website, run `./gen.py`

To start a test server with live-rebuild, run `./dev.py`

You may need some data like `/jobs` API from [tunasync](https://github.com/tuna/tunasync) and `distros.js` for ISOs, which are dynamically generated in production, placed in `/build/api/`. 

To add news post or mirror documentation, create Markdown files with naming convention [below](#structure) in `{docs|news}/_posts`, then commit and regenerate.

Suggested NGINX configuration:

```
index index$arg_noscript.html;

fancyindex on;
fancyindex_exact_size off;
fancyindex_time_format "%Y-%m-%d %H:%M";
fancyindex_header /static/fancy/header.html;
fancyindex_footer /static/fancy/footer.html;

location ^~ /api/ {
        expires -1;
}
location ^~ /static/ {
        expires 30d;
}
```

## Structure

- `build/` - the website to be built by `gen.py`
    - `api/` - dynamically generated content
- `src/` - source code
    - `docs/_posts/[mirror].{en|zh}.md` - markdown of docs with language suffix
    - `news/_posts/YYYY-MM-DD-[title].md` - markdown of news posts with date
    - `statics/` - style sheets and scripts
    - ... for details see `DEV.md`
- `indexer.py` - indexes docs and news posts into two JS object
- `gen.py` - a minimal template engine; builds `src/` into `build/`
- `dev.py` - starts `http.server` and rebuild on file changes in `src/`
- `.gitignore` - exclude `build/` and post indices from CVS
- `LICENSE.txt` - GNU AGPLv3 license text
- `DEV(.zh).md` - useful design concepts for developers
- `README(.zh).md` - this document

## License

Copyleft 2022 LUG@JLU. Licensed under GNU Affero General Public License version 3.

The following files are licensed under MIT License:

- `src/static/lib/marked.js` - Copyright 2011-2022 Christopher Jeffrey
- `src/static/lib/normalize.min.css` - Copyright Nicolas Gallagher and Jonathan Neal
- `src/static/lib/vue(.min).js` - Copyright 2014-2021 Evan You

The logo of Jilin University belongs to the university and is licensed under a private license.

## Acknowledgements

During the design of this website, mirrors from [TUNA](https://mirrors.tuna.tsinghua.edu.cn), [USTCLUG](https://mirrors.ustc.edu.cn) and [HITLUG](https://mirrors.hit.edu.cn) inspired us a lot.

Especially thanks to [Zenithal](https://github.com/ZenithalHourlyRate), [Keyu Tao](https://github.com/taoky) and [Billchenchina](https://github.com/BIllchenchina).
