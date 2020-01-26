const i18N = {
    dev_version: '0.0.9',
    // server_config: 'https://zb.sbx0.cn/',
    server_config: 'http://localhost:8085/',
    page: {
        home: {
            nav_bar_title: [
                '需求',
                '问题',
                '文章',
            ]
        }
    },
    common: {
        fetch: {
            page: 0,
            size: 10,
            direction: 'DESC',
        },
        date_to_time_after: {
            already: '已',
            just: '刚刚',
            over: '结束',
            there_are_still: '还有',
            month: '个月',
            week: '周',
            day: '天',
            hour: '小时',
            min: '分钟',
        },
        date_to_time_before: {
            just: '刚刚',
            before: '前',
            month: '个月',
            week: '周',
            day: '天',
            hour: '小时',
            min: '分钟',
        },
        status: [
            '操作成功',
            '操作失败',
            '异常错误',
            '暂未登录',
            '超出限制',
            '查无结果',
            '暂无权限',
            '重复操作',
        ]
    }
};

export default i18N;