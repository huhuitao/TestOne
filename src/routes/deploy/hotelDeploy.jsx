import React, { Component } from 'react';
import moment from 'moment';
import { Table, Button, Form, Input, TimePicker, Upload, Icon } from 'antd';
import { connect } from 'dva';
import ModalCp from '../../components/ModalCp';
import styles from './hotelDeploy.less';

const FormItem = Form.Item;
function mapStateToProps(state) {
  return { hotelDeploy: state.hotelDeploy };
}
@connect(mapStateToProps)
export default class hotelDeploy extends Component {
  render() {
    const props = {
      name: 'file', action: '//jsonplaceholder.typicode.com/posts/', headers: { authorization: 'authorization-text' } };
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        align: 'center',
      }, {
        title: '酒店名',
        dataIndex: 'hotelName',
        align: 'center',
      }, {
        title: '使用时间',
        dataIndex: 'time',
        align: 'center',
      }, {
        title: '说明',
        dataIndex: 'account',
        align: 'center',
      }, {
        title: '可用库存信息',
        dataIndex: 'info',
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
          <div>
            <ModalCp buttonP="修改"
              title="编辑"
              okText="保存"
              cancelText="取消"
              span={<Form>
                       <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="酒店名" ><Input /></FormItem>
                       <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="使用日期" ><TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /></FormItem>
                       <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="说明" ><Input /></FormItem>
                       <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="可用库存信息"><Upload {...props}>
                         <Button>
                           <Icon type="upload" />上传
                         </Button>
                                                                                                                 </Upload>
                       </FormItem>
                    </Form>}
            />
            <ModalCp buttonP="删除" okText="保存" cancelText="取消 " span={<span style={{ marginLeft: 160 }}>确认立刻删除该酒店?</span>} />
          </div>
        ),
      },
    ];
    const { data } = this.props.hotelDeploy;
    return (
      <div>
        <h1 style={{ fontSize: 26 }}>酒店配置 <ModalCp className={styles.buttonP}
          buttonP="添加"
          title="新建／编辑"
          okText="保存"
          cancelText="取消"
          span={<Form>
          <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="酒店名" ><Input /></FormItem>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="使用日期" ><TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /></FormItem>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="说明" ><Input /></FormItem>
            <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="可用库存信息"><Upload {...props}>
              <Button>
                <Icon type="upload" />上传
              </Button>
                                                                                                      </Upload>
            </FormItem>
                </Form>}
        />
        </h1>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    );
  }
}
