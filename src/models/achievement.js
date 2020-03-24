import {one, getTechnicalAchievementsList} from '@/services/achievement';
import {applyProject} from '@/services/projectService';
import {cs, ol} from "@/services/status";
import {message} from "antd";

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
    * applyProject({payload}, {call, put}) {
      const response = yield call(applyProject, payload);
      message.info(ol(response.status))
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
