import global from '../tools/Global';

export function fetchStatus(status) {
    return status === returnStatus.success.code;
}

export function fetchStatusAlert(status) {
    switch (status) {
        case -1:
            return '操作失败';
        case 0:
            return '操作成功';
        case 1:
            return '空值错误';
        case 2:
            return '无效数据';
        case 3:
            return '重复操作';
        case 4:
            return '密码错误';
        case 5:
            return '暂未登录';
        case 6:
            return '结果为空';
        case 7:
            return '暂无权限';
        case 8:
            return '发生异常';
        case 9:
            return '超出限制';
        default:
            return '未知错误';
    }
}

export const returnStatus = {
    failed: {
        code: -1,
        msg: '操作失败'
    },
    success: {
        code: 0,
        msg: '操作成功'
    },
    nullStr: {
        code: 1,
        msg: '空值错误'
    },
    invalidValue: {
        code: 2,
        msg: '无效数据'
    },
    repeatOperation: {
        code: 3,
        msg: '重复操作'
    },
    wrongPassword: {
        code: 4,
        msg: '密码错误'
    },
    notLogin: {
        code: 5,
        msg: '暂未登录'
    },
    emptyResult: {
        code: 6,
        msg: '结果为空'
    },
    noPermission: {
        code: 7,
        msg: '暂无权限'
    },
};

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
};

export async function fetchUpload(url, formData) {
    let serverConfig = localStorage.getItem("server_config");
    if (serverConfig == null) {
        localStorage.setItem("server_config", "https://zb.sbx0.cn/");
        serverConfig = global.server_config;
    }
    url = serverConfig + url;
    const request = fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        cache: 'default',
        body: formData,
    });
    return await fetchResult(request);
}


export async function fetchPost(url, params) {
    let serverConfig = localStorage.getItem("server_config");
    if (serverConfig == null) {
        localStorage.setItem("server_config", "https://zb.sbx0.cn/");
        serverConfig = global.server_config;
    }
    url = serverConfig + url;
    const formData = new FormData();
    if (params) {
        Object.keys(params).forEach(
            (key) => {
                formData.append(key, params[key]);
            }
        );
    }
    const request = fetch(url, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        cache: 'default',
        body: formData,
    });
    return await fetchResult(request);
}

export async function fetchGet(url, params) {
    let serverConfig = localStorage.getItem("server_config");
    if (serverConfig == null) {
        localStorage.setItem("server_config", global.server_config);
        serverConfig = global.server_config;
    }
    url = serverConfig + url;
    if (params) {
        const paramsArray = [];
        Object.keys(params).forEach((key) =>
            paramsArray.push(key + '=' + encodeURI(params[key])));
        if (paramsArray.length > 0) {
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
        }
    }
    const request = fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: headers,
    });
    return await fetchResult(request);
}

async function fetchResult(request) {
    return await request.then(
        function (response) {
            return response.json();
        }
    );
}