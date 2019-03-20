import { message } from 'antd';
import { getResource } from '@services/item';

export default {

  namespace: 'itemList',

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
        if (location.pathname === '/item/list') {
          dispatch({ type: 'query' });
        }
      });
    },
  },

  effects: {
    *query(action, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { formData, tableData: { pageSize, pageNum } } = yield select(state => state.itemList);
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
    querySuccess(state, { payload: { items, total } }) {
      return {
        ...state,
        tableData: {
          ...state.tableData,
          items,
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
          items: [],
          total: 0,
          loading: false,
        },
      };
    },
  },

};
