import { } from '../../services/deploy/deploy';
import { getHotelList } from '../../services/deploy/deploy';

const DeviceModal = {
  namespace: 'hotelDeploy',
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
      const res = yield call(getHotelList, { ...payload });
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
