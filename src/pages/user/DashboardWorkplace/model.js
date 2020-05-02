import {queryCurrent, fakeChartData, queryActivities, queryProjectNotice} from './service';
import {getMy, getApplicant, getIng, getReg, handleProject} from '@/services/projectService';
import {getWallet} from '@/services/user';

const Model = {
  namespace: 'userAndDashboardWorkplace',
  state: {
    currentUser: undefined,
    projectNotice: [],
    activities: [],
    radarData: [],
    projects: [],
    mys: [],
    applicants: [],
    ings: [],
    regs: [],
    wallet: 0,
  },
  effects: {
    * init(_, {put}) {
      yield put({
        type: 'fetchWallet',
      });
      yield put({
        type: 'fetchUserCurrent',
      });
      yield put({
        type: 'fetchProjectList',
      });
      yield put({
        type: 'fetchMyList',
      });
      yield put({
        type: 'fetchIngList',
      });
      yield put({
        type: 'fetchRegList',
      });
      yield put({
        type: 'fetchApplicantList',
      });
      yield put({
        type: 'fetchActivitiesList',
      });
      yield put({
        type: 'fetchChart',
      });
    },

    * fetchMyList({payload}, {call, put}) {
      const response = yield call(getMy, payload);
      yield put({
        type: 'saveMys',
        payload: response.objects,
      });
    },

    * fetchApplicantList({payload}, {call, put}) {
      const response = yield call(getApplicant, payload);
      yield put({
        type: 'saveApplicants',
        payload: response.objects,
      });
    },

    * fetchIngList({payload}, {call, put}) {
      const response = yield call(getIng, payload);
      yield put({
        type: 'saveIngs',
        payload: response.objects,
      });
    },

    * fetchRegList({payload}, {call, put}) {
      const response = yield call(getReg, payload);
      yield put({
        type: 'saveRegs',
        payload: response.objects,
      });
    },

    * getHandleProject({payload}, {call, put}) {
      const response = yield call(handleProject, payload);
      yield put({
        type: 'fetchMyList',
      });
      yield put({
        type: 'fetchIngList',
      });
      yield put({
        type: 'fetchRegList',
      });
      yield put({
        type: 'fetchApplicantList',
      });
      yield put({
        type: 'fetchWallet',
      });
    },

    * fetchWallet(_, {call, put}) {
      const response = yield call(getWallet);
      yield put({
        type: 'saveWallet',
        payload: response.object.money,
      });
    },

    * fetchProjectList(_, {call, put}) {
      const response = yield call(getMy);
      yield put({
        type: 'saveProjects',
        payload: response.objects,
      });
    },

    * fetchUserCurrent(_, {call, put}) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: {
          currentUser: response,
        },
      });
    },

    * fetchProjectNotice(_, {call, put}) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'save',
        payload: {
          projectNotice: Array.isArray(response) ? response : [],
        },
      });
    },

    * fetchActivitiesList(_, {call, put}) {
      const response = yield call(queryActivities);
      yield put({
        type: 'save',
        payload: {
          activities: Array.isArray(response) ? response : [],
        },
      });
    },

    * fetchChart(_, {call, put}) {
      const {radarData} = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          radarData,
        },
      });
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },

    saveWallet(state, action) {
      return {...state, wallet: action.payload};
    },

    saveProjects(state, action) {
      return {...state, projects: action.payload};
    },

    saveMys(state, action) {
      return {...state, mys: action.payload};
    },

    saveApplicants(state, action) {
      return {...state, applicants: action.payload};
    },

    saveIngs(state, action) {
      return {...state, ings: action.payload};
    },

    saveRegs(state, action) {
      return {...state, regs: action.payload};
    },

  },
};
export default Model;
