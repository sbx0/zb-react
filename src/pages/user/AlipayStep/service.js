import request from '@/utils/request';

export async function recharge(params) {
  return request.get('/trade/base/recharge', {
    params: {
      price: params.amount
    },
  }).then((r) => r);
}

export async function pay(params) {
  const formData = new FormData();
  formData.append('tradeNo', params);
  return request.post("/alipay/pay", {
    data: formData
  }).then((response) => response);
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
