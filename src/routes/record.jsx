import React, { Component } from 'react';
import { Form, Input, Button, Table, Badge, Radio } from 'antd';
import { connect } from 'dva';
import styles from './record.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
function mapStateToProps(state) {
  return { record: state.record };
}
const columns = [{
  title: 'id',
  dataIndex: 'id',
  align: 'center',
}, {
  title: '验证码',
  dataIndex: 'authCode',
  align: 'center',
}, {
  title: '姓名',
  dataIndex: 'name',
  align: 'center',
}, {
  title: '手机',
  dataIndex: 'iphone',
  align: 'center',
}, {
  title: '预约商品',
  dataIndex: 'product',
  align: 'center',
}, {
  title: '入住酒店',
  dataIndex: 'hotel',
  align: 'center',
}, {
  title: '使用时间',
  dataIndex: 'lifeTimer',
  align: 'center',
}, {
  title: '入离日期',
  dataIndex: 'outTime',
  align: 'center',
}, {
  title: '创建时间',
  dataIndex: 'creatTime',
  align: 'center',
}, {
  title: '状态',
  dataIndex: 'status',
  align: 'center',
}, {
  title: '操作',
  align: 'center',
  render: record => (
      <Button>立即处理</Button>
  ),
}];
@connect(mapStateToProps)
@Form.create()
export default class Record extends Component {
  onChange=(e) => {
    const { dispatch } = this.props;
    dispatch({ type: 'record/onChange', payload: e.target.value });
  }
  render() {
    const { data } = this.props.record;
    return (
      <div>
      <div className={styles.top}>
        <Form layout="inline">
          <FormItem labelCol={{ sm: { span: 3 } }} label="客人手机"><Input style={{ width: 400 }} /></FormItem>
          <FormItem labelCol={{ sm: { span: 3 } }} label="客人姓名"><Input style={{ width: 400 }} /></FormItem>
          <Button>搜索</Button>
        </Form>
      </div>
        <RadioGroup onChange={this.onChange}>
          <Badge count={1} ><RadioButton value={1}>待处理</RadioButton></Badge>
          <Badge count={1} ><RadioButton value={2}>已处理</RadioButton></Badge>
          <Badge count={1} ><RadioButton value={3}>全部</RadioButton></Badge>
        </RadioGroup>
        <div>
              <Table columns={columns} dataSource={data} bordered />
        </div>
      </div>
    );
  }
}
