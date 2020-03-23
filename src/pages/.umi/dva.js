import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'achievement', ...(require('F:/Workspace/React/zb-ant/src/models/achievement.js').default) });
app.model({ namespace: 'global', ...(require('F:/Workspace/React/zb-ant/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('F:/Workspace/React/zb-ant/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('F:/Workspace/React/zb-ant/src/models/setting.js').default) });
app.model({ namespace: 'technicalRequirementsListModel', ...(require('F:/Workspace/React/zb-ant/src/models/technicalRequirementsListModel.js').default) });
app.model({ namespace: 'technicalRequirementsOneModel', ...(require('F:/Workspace/React/zb-ant/src/models/technicalRequirementsOneModel.js').default) });
app.model({ namespace: 'technicalRequirementsPostModel', ...(require('F:/Workspace/React/zb-ant/src/models/technicalRequirementsPostModel.js').default) });
app.model({ namespace: 'user', ...(require('F:/Workspace/React/zb-ant/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
