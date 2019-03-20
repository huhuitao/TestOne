import { getRecordList } from '../services/record';

const DeviceModal = {
  namespace: 'record',
  state: {
    data: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'query' });
    },
  },

  effects: {
    *query(payload, { call, put, select }) {
      const res = yield call(getRecordList, { ...payload });
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
