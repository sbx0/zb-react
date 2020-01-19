import i18N from '../i18N/i18N_zh_CN';

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
        function(response) {
            return response.json();
        }
    );
}