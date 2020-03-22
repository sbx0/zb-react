import {one,getTechnicalAchievementsList} from '@/services/achievement';

export default {
  namespace: 'achievement',
  state: {
    one: {},
    relative: []
  },
  effects: {
    * getOne({payload}, {call, put}) {
      const response = yield call(one, payload);
      yield put({
        type: 'setOne',
        payload: response.object,
      });
    },
    * getRelative({payload}, {call, put}) {
      const response = yield call(getTechnicalAchievementsList, payload);
      yield put({
        type: 'setRelative',
        payload: response.objects,
      });
    },
  },
  reducers: {
    setOne(state, action) {
      return {...state, one: action.payload};
    },
    setRelative(state, action) {
      return {...state, relative: action.payload};
    },
  }
}
