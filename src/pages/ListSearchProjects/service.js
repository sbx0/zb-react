import request, {mock} from '@/utils/request';

export async function technicalClassificationFather(p, d) {
  return request.get('/technical/classification/father', {params: p, data: d});
}

export async function queryFakeList(params) {
  return mock('/api/fake_list', {
    params,
  });
}
