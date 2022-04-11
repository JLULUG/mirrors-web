$INCLUDE_ONLY NOCOPY

/* i18n */
var i18n = {
    en: {},
    zh: {}
}
i18n.en.title = 'Jilin University Open-source Mirrors'
i18n.zh.title = '吉林大学开源镜像站'
i18n.en.titleH1 = 'Jilin&nbsp;University Open&#8209;source&nbsp;Mirrors'
i18n.zh.titleH1 = '吉林大学开源镜像站'
i18n.en.back = 'Back to Mirrors'
i18n.zh.back = '回到主站'
i18n.en.legal = '<p>This service is supported by the Network Information Center of Jilin University, maintained by the Jilin University Linux User Group.</p>\
    <p>Jilin University Linux User Group is formed by GNU/Linux users and enthusiasts, advocating the use of GNU/Linux, promoting the value of free software, and cultivating an ambience of an open community.</p>\
    <p>JLU Mirrors joined <a href="https://mirrorz.org" target="_blank">MirrorZ.org</a> to provide a better experience.</p>\
    <p>The source code of this website is available at <a href="https://github.com/jlulug/mirrors-web" target="_blank">GitHub</a> under GNU AGPLv3.</p>'
i18n.zh.legal = '<p>本站由吉林大学大数据与网络中心支持创办，由吉林大学 Linux 用户协会运行维护。</p>\
    <p>吉林大学 Linux 用户协会是由 GNU/Linux 用户与爱好者自愿结成的注册社团，旨在联络沟通同道中人，推广 GNU/Linux 的使用，宣传自由软件的价值，培养开放社区氛围。</p>\
    <p>吉林大学开源镜像站加入了 <a href="https://mirrorz.org" target="_blank">MirrorZ.org</a> 和<a href="https://mirrors.cernet.edu.cn" target="_blank">教育网联合镜像站</a>，以提供更好的使用体验。</p>\
    <p>本站的源代码在 <a href="https://github.com/jlulug/mirrors-web" target="_blank">GitHub</a> 以 GNU Affero 通用公共许可协议第三版开源。</p>'

if (!localStorage.lang) localStorage.lang = navigator.language.slice(0, 2)
if (!(localStorage.lang in i18n)) localStorage.lang = 'en'
