import request, {mock} from '@/utils/request';

export async function getTechnicalClassificationSons(p) {
  console.log(p);
  const formData = new FormData();
  if (p) {
    Object.keys(p).forEach(
      (key) => {
        formData.append(key, p[key]);
      }
    );
  }
  return request.post('/technical/classification/sons', {data: formData, requestsType: 'form'});
}

export async function getTechnicalClassificationFather() {
  return request.get('/technical/classification/father');
}

export async function queryFakeList(params) {
  return mock('/api/fake_list', {
    params,
  });
}
