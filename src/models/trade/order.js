import { message } from 'antd';
import { getResource } from '@services/trade';

export default {

  namespace: 'order',

  state: {
    formData: {},
    tableData: {
      items: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      loading: false,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/trade/order') {
          dispatch({ type: 'query' });
        }
      });
    },
  },

  effects: {
    *query(action, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { formData, tableData: { pageSize, pageNum } } = yield select(state => state.order);
      const { data, err } = yield call(getResource, { ...formData, pageSize, pageNum });
      if (data) {
        yield put({ type: 'querySuccess', payload: data });
      } else {
        message.error(err.msg || '查询失败');
        yield put({ type: 'queryError' });
      }
    },
    *onPageChange({ payload }, { put }) {
      yield put({ type: 'pageChange', payload });
      yield put({ type: 'query' });
    },
  },

  reducers: {
    formChange(state, { payload }) {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...payload,
        },
      };
    },
    showLoading(state) {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          loading: true,
        },
      };
    },
    pageChange(state, { payload: pageNum }) {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageNum,
        },
      };
    },
    querySuccess(state, { payload: { data, total } }) {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          data,
          total,
          loading: false,
        },
      };
    },
    queryError(state) {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          data: [],
          total: 0,
          loading: false,
        },
      };
    },
  },

};
