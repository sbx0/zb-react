import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        name: 'register',
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__register" */ '../user/register'),
              LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                .default,
            })
          : require('../user/register').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        routes: [
          {
            name: 'achievements.post',
            icon: 'smile',
            path: '/postform',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__user__PostForm__model.js' */ 'C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/pages/user/PostForm/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__user__PostForm" */ '../user/PostForm'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/PostForm').default,
            exact: true,
          },
          {
            name: 'requirements.post',
            icon: 'smile',
            path: '/requirement/post',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__TechnicalRequirementsPost" */ '../TechnicalRequirementsPost'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../TechnicalRequirementsPost').default,
            exact: true,
          },
          {
            name: 'achievements.one',
            icon: 'smile',
            path: '/achievement/one',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__TechnicalAchievementOne" */ '../TechnicalAchievementOne'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../TechnicalAchievementOne').default,
            hideInMenu: true,
            exact: true,
          },
          {
            name: 'requirements',
            icon: 'smile',
            path: '/requirement/one',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__TechnicalRequirementOne" */ '../TechnicalRequirementOne'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../TechnicalRequirementOne').default,
            hideInMenu: true,
            exact: true,
          },
          {
            name: 'achievements',
            icon: 'smile',
            path: '/achievements',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__ListSearchProjects__model.js' */ 'C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/pages/ListSearchProjects/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__ListSearchProjects" */ '../ListSearchProjects'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../ListSearchProjects').default,
            exact: true,
          },
          {
            name: 'requirements',
            icon: 'smile',
            path: '/requirements',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__TechnicalRequirementsListPage" */ '../TechnicalRequirementsListPage'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../TechnicalRequirementsListPage').default,
            exact: true,
          },
          {
            name: 'welcome',
            icon: 'smile',
            path: '/',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__user__DashboardWorkplace__model.js' */ 'C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/pages/user/DashboardWorkplace/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__user__DashboardWorkplace" */ '../user/DashboardWorkplace'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/DashboardWorkplace').default,
            exact: true,
          },
          {
            name: 'alipay',
            icon: 'smile',
            path: '/alipay',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__user__AlipayStep__model.js' */ 'C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/pages/user/AlipayStep/model.js').then(
                      m => {
                        return { namespace: 'model', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__user__AlipayStep" */ '../user/AlipayStep'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../user/AlipayStep').default,
            exact: true,
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ '../Admin'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../Admin').default,
            authority: ['admin', 'webSiteOwner'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Admin" */ '../Welcome'),
                      LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Welcome').default,
                authority: ['admin', 'webSiteOwner'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('C:/Users/sbx0/Workspace/NewWorkspace/zb-ant/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
