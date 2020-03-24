import request from '@/utils/request';

export async function getMy() {
  return request.get('/project/base/my');
}

export async function applyProject(p) {
  // id
  console.log('p', p);
  return request.get('/project/base/apply', {params: p});
}

export async function handleProject(p) {
  // id type
  return request.get('/project/base/handle', {params: p});
}
