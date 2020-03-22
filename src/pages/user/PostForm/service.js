import request from '@/utils/request';

export async function postTechnicalAchievements(p) {
  const formData = new FormData();
  let addressIds = [];
  let classificationIds = [];
  if (p.values) {
    Object.keys(p.values).forEach(
      (key) => {
        if (key === 'classificationFather' || key === 'classificationSon')
          classificationIds.push(p.values[key]);
        else if (key === 'addressFather' || key === 'addressSon')
          addressIds.push(p.values[key]);
        else
          formData.append(key, p.values[key]);
      }
    );
  }
  if (addressIds.length > 0) {
    addressIds = [...new Set(addressIds)];
    formData.append('addressId', addressIds[0]);
  }
  if (classificationIds.length > 0) {
    classificationIds = [...new Set(classificationIds)];
    formData.append('classificationId', classificationIds[0]);
  }
  return request.post('/technical/achievements/post', {data: formData, requestsType: 'form'});
}

export async function getUrlUploadFile(params) {
  return request('/file/upload/submit', {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
