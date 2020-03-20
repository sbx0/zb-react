import {queryFakeList, technicalClassificationFather} from './service';

const Model = {
  namespace: 'listSearchProjects',
  state: {
    list: [],
    classificationList: [],
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    * classification({payload}, {call, put}) {
      const response = yield call(technicalClassificationFather, payload);
      yield put({
        type: 'queryClassificationList',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return {...state, list: action.payload};
    },
    queryClassificationList(state, action) {
      return {...state, classificationList: action.payload};
    },
  },
};
export default Model;
