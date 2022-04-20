# 吉林大学开源镜像站前端

## 用法

网站构建后是一些列静态文件，构建需要 Python 3.7+ ，没有其他依赖。

要构建网站，执行 `./gen.py` 。

要启动一个检测文件改动，自动重构建的测试服务器，执行 `./dev.py` 。

你可能需要一些数据，如 [tunasync](https://github.com/tuna/tunasync) 的 `/jobs` API ，以及用于下载 ISO 的 `distros.js` ，生产环境下这些内容是动态生成的，放在 `/build/api/` 目录下。

要添加新的新闻公告或镜像站文档，在 `src/{docs|news}/_posts` 参照[目录结构](#目录结构)所列命名习惯创建 Markdown 文档，提交仓库并重新生成站点。

建议的 NGINX 配置模板：

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

## 目录结构

- `build/` - `gen.py` 构建出的网站
    - `api/` - 动态生成的内容
- `src/` - 源代码
    - `docs/_posts/[mirror].{en|zh}.md` - 带语言后缀的帮助文档 Markdown
    - `news/_posts/YYYY-MM-DD-[title].md` - 带日期的新闻公告文档 Markdown
    - `statics/` - 样式表和脚本
    - ... 更多细节请见 `DEV.zh.md`
- `indexer.py` - 将帮助文档和新闻公告索引到两个 JS 对象中
- `gen.py` - 一个极小模板引擎；将 `src/` 构建到 `build/` ；更多细节见 `DEV.zh.md`
- `dev.py` - 启动 `http.server` 并在 `src/` 变化时自动重构建
- `.gitignore` - 将 `build/` 和文档索引排除版本管理
- `LICENSE.txt` - GNU AGPLv3 许可证文本
- `DEV(.zh).md` - 对开发者有用的设计概念
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
