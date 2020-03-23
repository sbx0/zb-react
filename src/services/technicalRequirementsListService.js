import request, {mock} from '@/utils/request';

export async function getTechnicalAchievementsList(p) {
  const formData = new FormData();
  formData.append('userId', 0);
  let addressIds = [];
  let classificationIds = [];
  if (p.values) {
    Object.keys(p.values).forEach(
      (key) => {
        if (key === 'classificationFather' || key === 'classificationSon')
          classificationIds = p.values[key]
        else if (key === 'addressFather' || key === 'addressSon')
          addressIds = p.values[key]
        else
          formData.append(key, p.values[key]);
      }
    );
  }
  if (addressIds.length > 0) {
    addressIds = [...new Set(addressIds)];
    formData.append('addressId', addressIds);
  }
  if (classificationIds.length > 0) {
    classificationIds = [...new Set(classificationIds)];
    formData.append('classificationId', classificationIds);
  }
  return request.post('/technical/requirements/mybatis/lists', {data: formData, requestsType: 'form'});
}

export async function getTechnicalClassificationSons(p) {
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
  return request.get('/technical/requirements/attribute');
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
