import { getProductList } from '../../services/deploy/deploy';


const DeviceModal = {
  namespace: 'productDeploy',
  state: {
    tableData: {
      data: [],
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'query' });
    },
  },

  effects: {
    *query(payload, { call, put, select }) {
      const res = yield call(getProductList, { ...payload });
      yield put({ type: 'save', payload: { data: res.data } });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default DeviceModal;
