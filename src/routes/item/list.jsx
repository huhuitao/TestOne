import React, { Component } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import SearchForm from '@alife/scu-search-form';
import RangeInput from '@alife/scu-range-input';
import ItemTable from '../../components/item/item-table';
import styles from './list.less';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SETTING = [{
  label: '商品ID',
  target: <Input />,
  name: 'itemId',
  formItemLayout,
}, {
  label: '商品标题',
  target: <Input />,
  name: 'title',
  formItemLayout,
}, {
  label: '价格',
  target: <RangeInput />,
  name: 'priceRange',
  formItemLayout,
}, {
  label: '销量',
  target: <RangeInput />,
  name: 'salesRange',
  formItemLayout,
}];

function mapStateToProps(state) {
  return state.itemList;
}

@connect(mapStateToProps)
export default class List extends Component {
  render() {
    const { location, dispatch, ...itemList } = this.props;
    return (
      <div className={styles.root}>
        <SearchForm
          setting={SETTING}
          searchForm={itemList.formData}
          onValuesChange={(p, values) => dispatch({
            type: 'itemList/formChange',
            payload: values,
          })}
          handleSubmit={values => dispatch({
            type: 'itemList/query',
            payload: values,
          })}
        />
        <ItemTable
          style={{ marginTop: 24 }}
          tableData={itemList.tableData}
          onPageChange={payload => dispatch({
            type: 'itemList/onPageChange',
            payload,
          })}
        />
      </div>
    );
  }
}
