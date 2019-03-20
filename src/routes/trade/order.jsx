import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, DatePicker } from 'antd';
import SearchForm from '@alife/scu-search-form';
import OrderTable from '../../components/trade/order-table';
import styles from './order.less';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SETTING = [{
  label: '商品标题',
  target: <Input />,
  name: 'title',
  formItemLayout,
}, {
  label: '买家昵称',
  target: <Input />,
  name: 'buyerNick',
  formItemLayout,
}, {
  label: '商品ID',
  target: <Input />,
  name: 'itemId',
  formItemLayout,
}, {
  label: '成交时间',
  target: <RangePicker />,
  name: 'time',
  formItemLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    width: 400,
  },
}];

function mapStateToProps(state) {
  return state.order;
}

@connect(mapStateToProps)
export default class Order extends Component {
  render() {
    const { location, dispatch, ...order } = this.props;
    return (
      <div className={styles.root}>
        <SearchForm
          setting={SETTING}
          searchForm={order.formData}
          onValuesChange={(p, values) => dispatch({
            type: 'order/formChange',
            payload: values,
          })}
          handleSubmit={values => dispatch({
            type: 'order/query',
            payload: values,
          })}
        />
        <OrderTable
          style={{ marginTop: 24 }}
          tableData={order.tableData}
          onPageChange={payload => dispatch({
            type: 'order/onPageChange',
            payload,
          })}
        />
      </div>
    );
  }
}
