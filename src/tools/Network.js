import i18N from '../i18N/i18N_zh_CN';

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
            return '空字符串';
        case 2:
            return '无效邮箱';
        case 3:
            return '重复操作';
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
        msg: '空字符串'
    },
    invalidMail: {
        code: 2,
        msg: '无效邮箱'
    },
    repeatOperation: {
        code: 3,
        msg: '重复操作'
    },
};

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
};

export async function fetchPost(url, params) {
    url = i18N.server_config + url;
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
    url = i18N.server_config + url;
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