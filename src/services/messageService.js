import request from '@/utils/request';

export async function sendMessage(p) {
  const formData = new FormData();
  Object.keys(p).forEach(
    (key) => {
      // content receiveUserId
      formData.append(key, p[key])
    }
  );
  return request.post('/message/base/send', {params: p});
}

export async function sendBroadcast(p) {
  const formData = new FormData();
  Object.keys(p).forEach(
    (key) => {
      // content
      formData.append(key, p[key])
    }
  );
  return request.post('/message/base/broadcast', {params: p});
}

export async function getReceive(p) {
  // page size
  return request.post('/message/base/receive', {params: p});
}

export async function getNotice() {
  // page size
  return request.post('/message/base/notice');
}

export async function readMsg(p) {
  // msgId
  return request.post('/message/base/notice', {params: p});
}


