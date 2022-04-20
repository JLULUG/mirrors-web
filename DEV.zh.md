# 吉林大学开源镜像站 设计概念

## 设计考量

- 可维护性源于清晰的结构和良好的文档
- 考虑后端进程带来的性能和安全影响，静态页面文件更加合适
- 考虑天天学习现代前端新技术的成本，以及场景的简单性，复古的 HTML+CSS+JS 更加合适
- 利用镜像调度器的 API ，将 API 暴露到前端用于渲染是可行的
    - [tunasync](https://github.com/tuna/tunasync) 被选作调度器
- 利用轻量的 MVVM 视图模型库，可以轻松完成客户端渲染和国际化支持
    - [Vue.js 2.x](https://github.com/vuejs/vue) 被选作 MVVM 库
- 利用极简主义的界面设计，不必使用框架，减少依赖与流量
    - 只利用了 [normalize.css](https://github.com/necolas/normalize.css) 作为样式表基础
- 利用巧妙分割的静态文件，重用样式表和脚本是可行的
- 利用一个模板引擎，页面也可以被分割和重用，还可以捆绑（而不混淆）静态小文件
- 考虑主流模板引擎的复杂性，自己写一个极小的更加合适
    - 即 `gen.py`
- 对于文档和新闻页面，利用一个前端 Markdown 渲染器，不必将原稿编译成包含重复内容的页面
    - [Marked](https://github.com/markedjs/marked) 被选作渲染器
- 利用 [fancyindex](https://github.com/aperezdc/ngx-fancyindex) ，可以以较友好的方式展现子目录
- 利用不依赖 JavaScript 的 fancyindex 页面，配合 NGINX 魔法，可以实现有限的 noscript 支持
    - 利用 Vue 替换 HTML 内容的特性，在无法加载脚本时，使用嵌入的默认语言内容

## 文件结构

- `docs/` - 镜像站使用文档
    - `_posts/[mirror].{en|zh}.md` - 带语言后缀的帮助文档 Markdown
    - `index.js` - 生成的帮助文档索引
    - `index.html` - 用于加载帮助文档的静态页面
- `news/` - 新闻和公告
    - `_posts/YYYY-MM-DD-[title].md` - 带日期的新闻公告文档 Markdown
    - `index.js` - 生成的新闻公告索引
    - `index.html` - 用于加载和罗列新闻的静态页面
- `static/`
    - `lib/` - 外部框架文件
    - `fancy/{header|footer}.html` - 用于 fancyindex 的页眉页脚
    - `common.{css|js}` - 公共样式表或脚本
    - `{main|docs|news|fancy}.{css|js}` - 特定页面的样式表或脚本
    - `logo.svg` - 网站图标
- `api/` - 为 `build/api/` 中动态内容占位
- `{header|footer}.html` - 公共页眉页脚模板
- `index.html` - 用于加载镜像列表的主页

## 模板语法

模板引擎 `gen.py` 依次处理 `src/` 中的全部文件。处理每个文件时，内容被按行切分，以 `$` 开头（前面可有空白字符）后接大写字母和一个空格的行，被认为是一条命令。 所有命令处理完后，产生的文件被写入 `build/` 。

不含命令的文件的编译结果与源文件一致。每个文件至少被处理（可能写入）一次，如果被引用则可能更多，然而并没有缓存机制。

只有下列命令是有效的，未知命令导致错误。请留意**部分命令导致任意代码执行**。

- `$INCLUDE_ONLY`: 除非是被引用，不处理该文件（仅在首行有效）
    - `$INCLUDE_ONLY NOCOPY`: 不要将结果写入 `build/`
- `$INCLUDE <file>`: 处理指定（相对于 `src/` ）的文件，并就地插入结果
- `$REQUIRE <file>`: 类似 `$INCLUDE` 但不插入结果
- `$DEFINE <NAME> <str>`: 定义一个字符串变量，在当前及其引用的文件中有效
    - 变量名 NAME 必须全为大写字母
- `$VAR <...>`: 命令后的部分含有如 `$BASE` 这样的变量，会被计算和替换
    - 在 `$VAR` 行中使用 `$$` 表示单个的 `$`
    - 未知变量渲染为空字符串
- `$EVAL <...>`: 命令后的部分是一个 Python 表达式，传入 `eval()` 计算后插入结果（类型必须是 str ）
- `$EXEC <...>`: 命令后的部分是一个 Python 语句，传入 `exec()`
- 对于 `$INCLUDE` / `$VAR` / `$EVAL` 命令，缩进将被保留，对于其他命令，当前行被删除
- 对于 `$INCLUDE` / `$REQUIRE` / `$VAR` 命令和 `$DEFINE` 的值部分，变量将被计算
- 对于包含 `$EVAL` 或 `$EXEC` 的模板，渲染结果可能会有变化

有两个在构建全程有效的预定义变量：

- `$BASE`: 部署的子目录，默认为空字符串
- `$RND`: 每次构建不同的随机数，加入查询字符串，用于无效化静态文件缓存
