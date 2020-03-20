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

export async function getTechnicalAchievementsMaturityList() {
  return request.get('/technical/achievements/maturity/list');
}

export async function getTechnicalAttributeList() {
  return request.get('/technical/achievements/attribute');
}

export async function getTechnicalAchievementsCooperationMethodList() {
  return request.get('/technical/achievements/cooperationMethod/list');
}

export async function getAddressFather() {
  return request.get('/address/base/son?fatherId=0');
}

export async function getAddressSons(p) {
  const formData = new FormData();
  if (p) {
    Object.keys(p).forEach(
      (key) => {
        formData.append(key, p[key]);
      }
    );
  }
  return request.post('/address/base/sons', {data: formData, requestsType: 'form'});
}

export async function queryFakeList(params) {
  return mock('/api/fake_list', {
    params,
  });
}
