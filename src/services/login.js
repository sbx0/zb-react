import request from '@/utils/request';

export async function whoami() {
  return request.get('/user/role/whoami');
}

export async function logout() {
  return request.get('/user/base/logout');
}

export async function login(params) {
  const formData = new FormData();
  if (params) {
    Object.keys(params).forEach(
      (key) => {
        formData.append(key, params[key]);
      }
    );
  }
  return request.post('/user/base/login', {data: formData, requestsType: 'form'});
}

export async function register(params) {
  const formData = new FormData();
  if (params) {
    Object.keys(params).forEach(
      (key) => {
        formData.append(key, params[key]);
      }
    );
  }
  return request.post('/user/base/register', {data: formData, requestsType: 'form'});
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
