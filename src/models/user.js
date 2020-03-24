import {basic, query as queryUsers} from '@/services/user';
import {notification} from 'antd';
import {cs, ol} from "@/services/status";

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
      if (!cs(response.status)) {
        if (ol(response.status))
          notification.warning({
            message: ol(response.status),
            description: response.status,
          });
      }
    },
    * fetchCurrent(_, {call, put}) {
      const response = yield call(basic);
      yield put({
        type: 'saveCurrentUser',
        payload: response.object,
      });
      if (!cs(response.status)) {
        if (ol(response.status))
          notification.warning({
            message: ol(response.status),
            description: response.status,
          });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {...state, currentUser: action.payload || {}};
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
