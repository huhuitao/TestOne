import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export default class ModalCp extends Component {
  state={
    visible: false,
  }
  showModal=() => {
    this.setState({
      visible: true,
    });
  }
  hidModal=() => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { title, buttonP, span, className, okText, cancelText } = this.props;
    return (<div>
        <Button className={className} onClick={this.showModal}>{buttonP}</Button>
        <Modal title={title} visible={this.state.visible} onCancel={this.hidModal} okText={okText} cancelText={cancelText}>{span}</Modal>
            </div>
    );
  }
}

