import { getAccountList } from '../../services/accountOp/adminAccount';

const DeviceModal = {
  namespace: 'adminAccount',
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
      const res = yield call(getAccountList, { ...payload });
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
