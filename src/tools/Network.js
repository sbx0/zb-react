import global from '../tools/Global';

let serverConfig = localStorage.getItem("server_config");
if (serverConfig == null) {
    localStorage.setItem("server_config", global.server_config);
    serverConfig = global.server_config;
}
export const baseUrl = serverConfig;

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
        localStorage.setItem("server_config", global.server_config);
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

// export const technicalAchievementListUrl = `${baseUrl}technical/achievements/list`;
export const urlTechnicalAchievementList = `technical/achievements/list`;
export const getTechnicalAchievementList = (params) => fetchGet(urlTechnicalAchievementList, params).then(json => json);

export const urlTechnicalAchievementListMybatis = `technical/achievements/mybatis/list`;
export const getTechnicalAchievementListMybatis = (params) => fetchGet(urlTechnicalAchievementListMybatis, params).then(json => json);

export const urlTechnicalAchievementCount = `technical/achievements/count`;
export const getTechnicalAchievementCount = (params) => fetchGet(urlTechnicalAchievementCount, params).then(json => json);

export const urlUserActiveCount = `user/base/active`;
export const getUserActiveCount = (params) => fetchGet(urlUserActiveCount, params).then(json => json);

export const urlUserCertificationList = `user/certification/list`;
export const getUserCertificationList = (params) => fetchGet(urlUserCertificationList, params).then(json => json);

export const urlUserCertificationJudge = `user/certification/judge`;
export const getUserCertificationJudge = (params) => fetchGet(urlUserCertificationJudge, params).then(json => json);

export const urlAdminList = `admin/list`;
export const getAdminList = (url, params) => fetchGet(url + urlAdminList, params).then(json => json);

export const urlAdminSave = `admin/save`;
export const postAdminSave = (url, params) => fetchPost(url + urlAdminSave, params).then(json => json);

export const urlAdminDelete = `admin/delete`;
export const getAdminDelete = (url, params) => fetchGet(url + urlAdminDelete, params).then(json => json);

export const urlAttribute = `admin/attribute`;
export const getAttribute = (url, params) => fetchGet(url + urlAttribute, params).then(json => json);

export const urlAddressBaseFather = `address/base/father`;
export const getAddressBaseFather = (params) => fetchGet(urlAddressBaseFather, params).then(json => json);

export const urlAddressBaseSon = `address/base/son`;
export const getAddressBaseSon = (params) => fetchGet(urlAddressBaseSon, {fatherId: params}).then(json => json);

export const urlTechnicalClassificationFather = `technical/classification/father`;
export const getTechnicalClassificationFather = (params) => fetchGet(urlTechnicalClassificationFather, params).then(json => json);

export const urlTechnicalClassificationSon = `technical/classification/son`;
export const getTechnicalClassificationSon = (params) => fetchGet(urlTechnicalClassificationSon, {fatherId: params}).then(json => json);

export const urlTechnicalAchievementsMaturityList = `technical/achievements/maturity/list`;
export const getTechnicalAchievementsMaturityList = (params) => fetchGet(urlTechnicalAchievementsMaturityList, params).then(json => json);

export const urlTechnicalAchievementsCooperationMethodList = `technical/achievements/cooperationMethod/list`;
export const getTechnicalAchievementsCooperationMethodList = (params) => fetchGet(urlTechnicalAchievementsCooperationMethodList, params).then(json => json);

export const urlTechnicalClassificationSonToFather = `technical/classification/sonToFather`;
export const getTechnicalClassificationSonToFather = (params) => fetchGet(urlTechnicalClassificationSonToFather, params).then(json => json);

export const urlAddressBaseSonToFather = `address/base/sonToFather`;
export const getAddressBaseSonToFather = (params) => fetchGet(urlAddressBaseSonToFather, params).then(json => json);

export const urlUploadFile = `file/upload/submit`;
export const getUrlUploadFile = (params) => fetchUpload(urlUploadFile, params).then(json => json);

export const urlUserBaseShow = `user/base/show`;
export const getUserBaseShow = (params) => fetchGet(urlUserBaseShow, params).then(json => json);

export const urlUserCertificationType = `user/certification/type`;
export const getUserCertificationType = (params) => fetchGet(urlUserCertificationType, params).then(json => json);

export const urlUserCertificationSubmit = `user/certification/submit`;
export const postUserCertificationSubmit = (params) => fetchPost(urlUserCertificationSubmit, params).then(json => json);

export const urlUserGroupMember = `user/group/member`;
export const getUserGroupMember = (params) => fetchGet(urlUserGroupMember, params).then(json => json);

export const urlUserGroupOne = `user/group/one`;
export const getUserGroupOne = (params) => fetchGet(urlUserGroupOne, params).then(json => json);

export const urlUserGroupCheck = `user/group/check`;
export const getUserGroupCheck = (params) => fetchGet(urlUserGroupCheck, params).then(json => json);

export const urlUserGroupJoin = `user/group/join`;
export const getUserGroupJoin = (params) => fetchGet(urlUserGroupJoin, params).then(json => json);

export const urlUserGroupQuit = `user/group/quit`;
export const getUserGroupQuit = (params) => fetchGet(urlUserGroupQuit, params).then(json => json);

export const urlUserGroupCreate = `user/group/create`;
export const getUserGroupCreate = (params) => fetchGet(urlUserGroupCreate, params).then(json => json);

export const urlUserGroupList = `user/group/list`;
export const getUserGroupList = (params) => fetchGet(urlUserGroupList, params).then(json => json);

export const urlUserGroupMy = `user/group/my`;
export const getUserGroupMy = (params) => fetchGet(urlUserGroupMy, params).then(json => json);

export const urlStaticalDataRecent = `statistical/data/recent`;
export const getStaticalDataRecent = (params) => fetchGet(urlStaticalDataRecent, params).then(json => json);

export const urlStatisticalUserClient = `statistical/user/client`;
export const getStatisticalUserClient = (params) => fetchGet(urlStatisticalUserClient, params).then(json => json);

export const urlUserBaseLogin = `user/base/login`;
export const postUserBaseLogin = (params) => fetchPost(urlUserBaseLogin, params).then(json => json);

export const urlTechnicalAchievementOne = `technical/achievements/one`;
export const getTechnicalAchievementOne = (params) => fetchGet(urlTechnicalAchievementOne, params).then(json => json);

export const urlTechnicalAchievementPost = `technical/achievements/post`;
export const postTechnicalAchievementPost = (params) => fetchPost(urlTechnicalAchievementPost, params).then(json => json);

export const urlUserBaseRegister = `user/base/register`;
export const postUserBaseRegister = (params) => fetchPost(urlUserBaseRegister, params).then(json => json);

export const urlFileUploadAvatar = `file/upload/avatar`;
export const postFileUploadAvatar = (params) => fetchUpload(urlFileUploadAvatar, params).then(json => json);

export const urlUserCertificationCheck = `user/certification/check`;
export const getUserCertificationCheck = (params) => fetchGet(urlUserCertificationCheck, params).then(json => json);

export const urlUserCertificationCancel = `user/certification/cancel`;
export const getUserCertificationCancel = (params) => fetchGet(urlUserCertificationCancel, params).then(json => json);

export const urlTechnicalAchievementsAttribute = `technical/achievements/attribute`;
export const getTechnicalAchievementsAttribute = (params) => fetchGet(urlTechnicalAchievementsAttribute, params).then(json => json);

