import {
  queryFakeList,
  getTechnicalClassificationSons,
  getTechnicalClassificationFather,
  getAddressFather,
  getTechnicalAchievementsMaturityList,
  getTechnicalAchievementsCooperationMethodList,
  getTechnicalAttributeList,
  getAddressSons
} from './service';

const Model = {
  namespace: 'listSearchProjects',
  state: {
    list: [],
    technicalClassificationFatherList: [],
    technicalClassificationSonList: [],
    addressFatherList: [],
    addressSonList: [],
    maturityList: [],
    cooperationMethodList: [],
    attributeList: [],
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    * technicalClassificationFather({payload}, {call, put}) {
      const response = yield call(getTechnicalClassificationFather, payload);
      yield put({
        type: 'setTechnicalClassificationFather',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
    * technicalClassificationSons({payload}, {call, put}) {
      const response = yield call(getTechnicalClassificationSons, payload);
      yield put({
        type: 'setTechnicalClassificationSons',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
    * addressFather({payload}, {call, put}) {
      const response = yield call(getAddressFather, payload);
      yield put({
        type: 'setAddressFather',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
    * addressSons({payload}, {call, put}) {
      const response = yield call(getAddressSons, payload);
      yield put({
        type: 'setAddressSons',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
    * maturity({payload}, {call, put}) {
      const response = yield call(getTechnicalAchievementsMaturityList, payload);
      yield put({
        type: 'setMaturity',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
    * cooperationMethod({payload}, {call, put}) {
      const response = yield call(getTechnicalAchievementsCooperationMethodList, payload);
      yield put({
        type: 'setCooperationMethod',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
    * attribute({payload}, {call, put}) {
      const response = yield call(getTechnicalAttributeList, payload);
      yield put({
        type: 'setAttribute',
        payload: Array.isArray(response.objects) ? response.objects : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return {...state, list: action.payload};
    },
    setTechnicalClassificationFather(state, action) {
      return {...state, technicalClassificationFatherList: action.payload};
    },
    setTechnicalClassificationSons(state, action) {
      return {...state, technicalClassificationSonList: action.payload};
    },
    setAddressFather(state, action) {
      return {...state, addressFatherList: action.payload};
    },
    setAddressSons(state, action) {
      return {...state, addressSonList: action.payload};
    },
    setMaturity(state, action) {
      return {...state, maturityList: action.payload};
    },
    setCooperationMethod(state, action) {
      return {...state, cooperationMethodList: action.payload};
    },
    setAttribute(state, action) {
      return {...state, attributeList: action.payload};
    },
  },
};
export default Model;
