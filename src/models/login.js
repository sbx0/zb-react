import {stringify} from 'querystring';
import {router} from 'umi';
import {
  login as accountLogin,
  register as accountRegister,
  logout as accountLogout,
  whoami,
} from '@/services/login';
import {cs, ol} from '@/services/status';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {notification} from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(accountLogin, payload);
      const response2 = yield call(whoami, payload);
      if (cs(response.status)) {
        yield put({
          type: 'changeLoginStatus',
          payload: response2,
        }); // Login
        setAuthority(response2.objects);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        if (redirect === '/user/register') {
          window.location.href = '/';
        } else {
          router.replace(redirect || '/');
        }
      } else {
        if (ol(response.status))
          notification.warning({
            message: ol(response.status),
            description: response.status,
          });
      }
    },
    * register({payload}, {call, put}) {
      const response = yield call(accountRegister, payload);
      yield put({
        type: 'changeRegisterStatus',
        payload: response,
      }); // Register
      if (cs(response.status)) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      } else {
        if (ol(response.status))
          notification.warning({
            message: ol(response.status),
            description: response.status,
          });
      }
    },
    logout() {
      accountLogout().then((response) => {
        if (cs(response.status)) {
          const {redirect} = getPageQuery();
          if (window.location.pathname !== '/user/login' && !redirect) {
            router.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            });
          }
        } else {
          if (ol(response.status))
            notification.warning({
              message: ol(response.status),
              description: response.status,
            });
        }
      })
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      console.log('setAuthority(payload.objects)', payload.objects)
      setAuthority(payload.objects);
      return {...state, status: payload.status, type: payload.type};
    },
  },
};
export default Model;
