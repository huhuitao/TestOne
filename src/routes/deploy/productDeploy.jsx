import React, { Component } from 'react';
import { Table, Button, Form, Input, Checkbox } from 'antd';
import { connect } from 'dva';
import ModalCp from '../../components/ModalCp';
import styles from './productDeploy.less';

const FormItem = Form.Item;
const { TextArea } = Input;
function mapStateToProps(state) {
  return { productDeploy: state.productDeploy };
}
@connect(mapStateToProps)
export default class Product extends Component {
  render() {
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      align: 'center',
    }, {
      title: '酒店名',
      dataIndex: 'hotelName',
      align: 'center',
    }, {
      title: '支持的酒店',
      dataIndex: 'supportHotel',
      align: 'center',
    }, {
      title: '更新时间',
      dataIndex: 'turnoverTime',
      align: 'center',
    }, {
      title: '操作人',
      dataIndex: 'admin',
      align: 'center',
    }, {
      title: '操作',
      align: 'center',
      render: (record, text) => (
        <div><ModalCp
          buttonP="修改"
          title="编辑"
          okText="保存"
          cancelText="取消"
          span={<Form>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="商品名" ><Input /></FormItem>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="支持的酒店" >
              <div className={styles.checkbox}>
                <Checkbox style={{ marginLeft: 7 }}>福州世贸洲际酒店</Checkbox >
                <Checkbox >福州世贸洲际酒店</Checkbox >
                <Checkbox >福州世贸洲际酒店</Checkbox >
                <Checkbox >福州世贸洲际酒店</Checkbox >
                <Checkbox >福州世贸洲际酒店</Checkbox >
                <Checkbox >福州世贸洲际酒店</Checkbox >
              </div>
            </FormItem>
                </Form>}
        /><ModalCp buttonP="删除" okText="保存" cancelText="取消 " span={<span style={{ marginLeft: 160 }}>确认立刻删除该商品?</span>} />
        </div>
      ),
    }];
    const { data } = this.props.productDeploy;
    return (
      <div>
        <h1 style={{ fontSize: 26 }}>商品配置<ModalCp className={styles.addButton}
          buttonP="添加"
          title="新建／编辑"
          okText="保存"
          cancelText="取消"
          span={<Form>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="商品名" ><Input /></FormItem>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="支持的酒店" >
              <div className={styles.checkbox}>
              <Checkbox style={{ marginLeft: 7 }}>福州世贸洲际酒店</Checkbox >
                <Checkbox >福州世贸洲际酒店</Checkbox >
              <Checkbox >福州世贸洲际酒店</Checkbox >
              <Checkbox >福州世贸洲际酒店</Checkbox >
              <Checkbox >福州世贸洲际酒店</Checkbox >
              <Checkbox >福州世贸洲际酒店</Checkbox >
              </div>
            </FormItem>
                </Form>}
        />
        </h1>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    );
  }
}
