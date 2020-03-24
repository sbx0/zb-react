import {fakeSubmitForm,recharge, pay} from './service';

const Model = {
  namespace: 'userAndAlipayStep',
  state: {
    current: 'info',
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '1000',
    },
  },
  effects: {
    * submitStepForm({payload}, {call, put}) {
      const response1 = yield call(recharge, payload);
      console.log('response1',response1)
      const tradeNo = response1.object
      const response2 = yield call(pay, tradeNo);
      console.log('response.object',response2.object);
      document.write(response2.object);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    saveCurrentStep(state, {payload}) {
      return {...state, current: payload};
    },

    saveStepFormData(state, {payload}) {
      return {...state, step: {...state.step, ...payload}};
    },
  },
};
export default Model;
