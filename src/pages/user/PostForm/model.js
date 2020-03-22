import {message} from 'antd';
import {postTechnicalAchievements} from './service';
import {
  getAddressFather,
  getAddressSons,
  getTechnicalAchievementsCooperationMethodList,
  getTechnicalAchievementsMaturityList,
  getTechnicalAttributeList,
  getTechnicalClassificationFather,
  getTechnicalClassificationSons,
} from "@/pages/ListSearchProjects/service";

const Model = {
  namespace: 'userAndPostForm',
  state: {
    technicalClassificationFatherList: [],
    technicalClassificationSonList: [],
    addressFatherList: [],
    addressSonList: [],
    maturityList: [],
    cooperationMethodList: [],
    attributeList: [],
    technicalAchievementsList: [],
  },
  effects: {
    * submitRegularForm({payload}, {call}) {
      yield call(postTechnicalAchievements, payload);
      message.success('提交成功');
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
    setTechnicalAchievementsList(state, action) {
      return {...state, technicalAchievementsList: action.payload};
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