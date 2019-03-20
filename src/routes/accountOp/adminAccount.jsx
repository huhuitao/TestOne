import React, { Component } from 'react';
import { Button, Table, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './adminAccount.less';
import ModalCp from '../../components/ModalCp';

const FormItem = Form.Item;
function mapStateToProps(state) {
  return { adminAccount: state.adminAccount };
}
@connect(mapStateToProps)
class AdminAccount extends Component {
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hidModal = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const columns = [
      {
        title: '淘宝账号',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '添加日期',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: (record, text) => (
          <div>
            <ModalCp buttonP="删除" okText="保存" cancelText="取消 " span={<span style={{ marginLeft: 160 }}>确认立刻删除该账号?</span>} />
          </div>
        ),
      },
    ];
    const { data } = this.props.adminAccount;
    return (
      <div style={{ width: 1300 }}>
        <h1 style={{ fontSize: 26 }}>管理员账号<ModalCp className={styles.addButton}
          buttonP="添加"
          title="添加／编辑"
          onClick={this.showModal}
          type="primary"
          span={<Form>
          <FormItem labelCol={{ sm: { span: 5 } }} wrapperCol={{ sm: { span: 12 } }} label="淘宝账号:" ><Input /></FormItem>
                </Form>}
        />
        </h1>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    );
  }
}
export default AdminAccount;
