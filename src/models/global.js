import {queryNotices, getMsg} from '@/services/user';
import {read} from '@/services/messageService';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },
  effects: {
    * fetchNotices(_, {call, put, select}) {
      const data = yield call(getMsg);
      yield put({
        type: 'saveNotices',
        payload: data.objects,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.objects.length,
          unreadCount: data.objects.length,
        },
      });
    },

    * clearNotices({payload}, {put, select}) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    * changeNoticeReadState({payload}, {call, put, select}) {
      const response = yield call(read, {
        msgId: payload
      });
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = {...item};

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      {payload},
    ) {
      return {...state, collapsed: payload};
    },

    saveNotices(state, {payload}) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      {payload},
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({history}) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({pathname, search}) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
