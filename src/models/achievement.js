import {one, getTechnicalAchievementsList, getAddress, getClassification} from '@/services/achievement';
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

      let detail = response.object

      if (detail != null) {
        const response2 = yield call(getAddress, {
          sonId: detail.addressId
        });
        const response3 = yield call(getClassification, {
          sonId: detail.classificationId
        });
        response.object.address = response2.objects.reverse();
        response.object.classification = response3.objects.reverse();
        yield put({
          type: 'setOne',
          payload: response.object,
        });
      } else {
        yield put({
          type: 'setOne',
          payload: response.object,
        });
      }

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
