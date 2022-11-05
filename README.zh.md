# 吉林大学开源镜像站

[English README](./README.md)

本仓库是吉林大学开源镜像站的网站前端界面。

## 功能

本站

- 完全由静态的 HTML+CSS+JS 制成
- 使用 NGINX 的 SSI (server-side inclusion) 模块作为简单模板引擎
- 使用 [Vue.js 2.x](https://github.com/vuejs/vue) 在客户端渲染动态 API 结果
- 需要与 [shine](https://github.com/JLULUG/shine) 提供的 API 一起使用
    - 或者稍做修改，也可以适配 [tunasync](https://github.com/tuna/tunasync)
- 使用 [normalize.css](https://github.com/necolas/normalize.css) 作为样式表基础
- 使用 [Marked](https://github.com/markedjs/marked) 渲染 markdown 格式的新闻与文档
- 可以使用 NGINX 的 [fancyindex](https://github.com/aperezdc/ngx-fancyindex) 模块提供友好的目录浏览和 noscript 支持

## 安装

只消 `ln -s public/* /mirrors_root/` 即可。

请在 `_{docs|news}/posts` 中按照[如下](#structure)命名规则创建新闻与文档, 然后运行 `python3 index.py` 生成两个 `index.js` 。

NGINX 配置建议：

```
index index$arg_noscript.html;
#autoindex on;
fancyindex on;
fancyindex_exact_size off;
fancyindex_time_format "%Y-%m-%d %H:%M";
fancyindex_header /_static/fancy/header.html;
fancyindex_footer /_static/fancy/footer.html;

location = /index.html {
    ssi on;
}
location ^~ /_ {
    ssi on;
    expires -1;
    location ^~ /_api/ {
        alias /run/shine/api/;
    }
    location ^~ /_static/ {
        expires 30d;
    }
}
```

## 文件结构

- `public/`
    - `_docs/` - 镜像站文档
        - `posts/[mirror].{en|zh}.md` - 带有语言后缀的 markdown 格式文档
        - `index.js` - 生成的索引
        - `index.html` - 文档页面模板
    - `_news/` - 新闻和公告
        - `posts/YYYY-MM-DD-[title].md` - 带有日期前缀的 markdown 格式新闻
        - `index.js` - 生成的索引
        - `index.html` - 新闻页面模板
    - `_static/`
        - `lib/` - 引用的外部前端库
        - `fancy/{header|footer}.html` - fancyindex 页面模板
        - `common.{css|js}` - 公共页面样式和脚本
        - `{main|docs|news|fancy}.{css|js}` - 特定页面样式和脚本
        - `logo.svg` - 网站图标
        - `{header|footer}.html` - HTML 页面模板
    - `index.html` - 主页模板
- `index.py` - 用于生成 `_{doc|new}s/index.js`
- `LICENSE.txt` - GNU AGPLv3 许可证文本
- `README(.zh).md` - 本文档

## 许可协议

著作传所有 2022 吉林大学 Linux 用户协会。以 GNU Affero 通用公共许可协议第三版授权。

下列文件在 MIT 许可协议下授权：

- `src/static/lib/marked.js` - 著作权所有 2011-2022 Christopher Jeffrey
- `src/static/lib/normalize.min.css` - 著作权所有 Nicolas Gallagher 和 Jonathan Neal
- `src/static/lib/vue(.min).js` - 著作权所有 2014-2021 Evan You

吉林大学的校徽属于吉林大学，需经学校单独许可使用。

## 致谢

设计本站期间，受到 [TUNA](https://mirrors.tuna.tsinghua.edu.cn) 、[USTCLUG](https://mirrors.ustc.edu.cn) 和 [HITLUG](https://mirrors.hit.edu.cn) 的镜像站很多启发。

特别感谢 [Zenithal](https://github.com/ZenithalHourlyRate) 、[Keyu Tao](https://github.com/taoky) 和 [Billchenchina](https://github.com/BIllchenchina) 。
