import React from 'react';
import { routerRedux, Route, Redirect, Switch } from 'dva/router';
import dynamic from './dynamic';
import MainLayout from './components/layout/main-layout';
import Exception from './routes/exception';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const toDynamic = (component, models = []) => dynamic(app, models, component);
  return (
    <ConnectedRouter history={history}>
      <Route path="/">
        <MainLayout>
          <Switch>
            <Route exact path="/" component={toDynamic(() => import('./routes/index-page'))} />
            <Route path="/record" component={toDynamic(() => import('./routes/record'), ['record'])} />
            <Route path="/deploy/productDeploy" component={toDynamic(() => import('./routes/deploy/productDeploy'), ['deploy/productDeploy'])} />
            <Route path="/deploy/hotelDeploy" component={toDynamic(() => import('./routes/deploy/hotelDeploy'), ['deploy/hotelDeploy'])} />
            <Route path="/deploy/subscribeDeclare" component={toDynamic(() => import('./routes/deploy/subscribeDeclare'))} />
            <Route path="/accountOp/adminAccount" component={toDynamic(() => import('./routes/accountOp/adminAccount'), ['accountOp/adminAccount'])} />
            <Route path="/item/publish" component={toDynamic(() => import('./routes/item/publish'))} />
            <Route path="/item/list" component={toDynamic(() => import('./routes/item/list'), ['item/list'])} />
            <Route path="/trade/order" component={toDynamic(() => import('./routes/trade/order'), ['trade/order'])} />
            <Route path="/exception/:code" component={Exception} />
            <Redirect to="/exception/404" />
          </Switch>
        </MainLayout>
      </Route>
    </ConnectedRouter>
  );
}

export default RouterConfig;
