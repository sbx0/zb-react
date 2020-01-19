// 用于加载
const lib = [
    {name: 'zh_CN', value: '简体中文'},
    {name: 'zh_TW', value: '繁體中文'},
    {name: 'en_US', value: 'English'},
];

// 从cookie中读取配置，为空则创建
const i18N_config = 'zh_CN';

// 加载i18N文件
document.write('<script src="/js/i18N/i18N_' + i18N_config + '.js"></script>');