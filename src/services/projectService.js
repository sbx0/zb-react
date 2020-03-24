import request from '@/utils/request';

export async function getMy() {
  return request.get('/application/base/my');
}

export async function applyProject(p) {
  // id
  console.log('p', p);
  return request.get('/application/base/apply', {params: p});
}

export async function handleProject(p) {
  // id type
  return request.get('/application/base/handle', {params: p});
}
