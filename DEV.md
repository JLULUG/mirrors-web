# Design Concepts of JLU Mirrors

## Design Principles

- Considering the performance and security impacts of having a backend daemon, a static page is preferable
- Considering the cost of learning daily new techs of modern frontend and the simplicity of use case, a retro HTML+CSS+JS way is preferable
- With the API from the mirror scheduler, it's ok to expose the API to the frontend for rendering
    - [tunasync](https://github.com/tuna/tunasync) is selected
- With a light-weight MVVM library, client-side rendering and i18n can be done easier
    - [Vue.js 2.x](https://github.com/vuejs/vue) is selected
- With a minimalist UI, frameworks aren't necessary, reducing dependencies and traffic
    - only [normalize.css](https://github.com/necolas/normalize.css) is used as the base style sheet
- With well-split assets files, reusing style sheet and scripts are possible
- With a template engine, HTMLs can be split and reused, and assets can be bundled (but not obfuscated)
- Considering the complicity of current template engines, developing a minimal one is preferable
    - it's `gen.py`
- For documentation and news, with a frontend Markdown renderer, compiled HTML files with duplicate content are not needed
    - [Marked](https://github.com/markedjs/marked) is selected

## File Structure

- `docs/` - documentations of mirrors
    - `_posts/` - markdown of docs with language suffix
        - `[mirror].{en|zh}.md`
    - `index.js` - generated index of docs
    - `index.html` - static page for loading docs
- `news/` - news and announcements
    - `_posts/` - markdown of news posts with date
        - `YYYY-MM-DD-[title].md` 
    - `index.js` - generated index of news post
    - `index.html` - static page for loading or listing news post
- `static/`
    - `lib/` - external libraries
    - `i18n/` - translations of interface
        - `common.js` - common texts and code
        - `{main|docs|news}.js` - page-specific texts
    - `common.{css|js}` - common style sheet and scripts
    - `{main|docs|news}.{css|js}` - page-specific ones
    - `logo.svg` - website logo
- `{header|footer}.html` - the common HTML template
- `index.html` - home page for loading mirrors

## Template Syntax

The template engine `gen.py` processes all files in `src/` in turn. For each file processed, the content is split into lines, the lines start with (optionally white-spaces and) `$`, follow UPPERCASE letters and a space, are considered as a command. After all commands compiled, the result file is written to `build/`.

The result of a file that contains no command remains identical to the origin. Files are processed (maybe written) at least once, or more if included multiple times, with no cache mechanism.

Only commands below are valid, unknown command causes an error. Please be aware that some commands **LEADS TO ARBITRARY CODE EXECUTION**.

- `$INCLUDE_ONLY`: don't process this file unless referred by other files (ONLY VALID ON FIRST LINE)
    - `$INCLUDE_ONLY NOCOPY`: don't write this file into `build/`
- `$INCLUDE <file>`: process the file specified (relative to `src/`), and insert the result in place
- `$REQUIRE <file>`: similar to `$INCLUDE`, but insert nothing
- `$DEFINE <NAME> <str>`: define a string variable effective in the current and included files
    - the NAME must be all UPPERCASE letters
- `$VAR <...>`: the remainder of the line may contain variables like `$BASE` that will be evaluated and replaced
    - use `$$` for a single `$` in `$VAR` lines
    - unknown variables render to empty string
- `$EVAL <...>`: the remainder of the line is a Python expression, passed into `eval()`, and the result (must be str) is inserted
- `$EXEC <...>`: the remainder of the line is a Python statement, passed into `exec()`
- for `$INCLUDE`, `$VAR` and `$EVAL`, the indents are preserved, for others, the line is removed
- for `$INCLUDE`, `$REQUIRE`, `$VAR` and the value part of `$DEFINE`, variables are evaluated
- for templates with `$EVAL` or `$EXEC`, the render result may vary

There're two predefined variables effective throughout the whole process:

- `$BASE`: the deployed sub-directory, defaults to an empty string
- `$RND`: different random number each build, for query string to invalidate caches of static files
