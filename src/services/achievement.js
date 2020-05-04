import request from '@/utils/request';

export async function getClassification(p) {
  return request.get('/technical/classification/sonToFather', {params: p});
}

export async function getAddress(p) {
  return request.get('/address/base/sonToFather', {params: p});
}

export async function one(p, d) {
  return request.get('/technical/achievements/one', {params: p, data: d});
}

export async function getTechnicalAchievementsList(p) {
  const formData = new FormData();
  if (p) {
    Object.keys(p).forEach(
      (key) => {
        if (key === 'addressId') {
          let aid = p.addressId
          request.get('/address/base/father', {
            data: {
              sonId: p.addressId,
            }
          }).then((json) => {
            aid = json.object
            formData.append('addressId', aid)
          })
        } else if (key === 'classificationId') {
          let sid = p.classificationId
          request.get('/technical/classification/father', {
            data: {
              sonId: p.classificationId,
            }
          }).then((json) => {
            sid = json.object
            formData.append('classificationId', sid)
          })
        } else {
          formData.append(key, p[key])
        }
      }
    );
  }

  return request.post('/technical/achievements/mybatis/lists', {data: formData, requestsType: 'form'});
}
