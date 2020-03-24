import {queryCurrent, fakeChartData, queryActivities, queryProjectNotice} from './service';
import {getMy, handleProject} from '@/services/projectService';
import {getWallet} from '@/services/user';

const Model = {
  namespace: 'userAndDashboardWorkplace',
  state: {
    currentUser: undefined,
    projectNotice: [],
    activities: [],
    radarData: [],
    projects: [],
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
        type: 'fetchActivitiesList',
      });
      yield put({
        type: 'fetchChart',
      });
    },

    * getHandleProject({payload}, {call, put}) {
      const response = yield call(handleProject, payload);
      yield put({
        type: 'fetchProjectList',
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

    clear() {
      return {
        currentUser: undefined,
        projectNotice: [],
        activities: [],
        radarData: [],
      };
    },
  },
};
export default Model;
