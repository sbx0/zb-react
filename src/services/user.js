import request from '@/utils/request';

export async function active(p, d) {
  return request.get('/user/base/active', {params: p, data: d});
}

export async function basic(p, d) {
  return request.get('/user/base/basic', {params: p, data: d});
}

export async function query() {
  return request('/api/users');
}

export async function queryNotices() {
  return request('/api/notices');
}
