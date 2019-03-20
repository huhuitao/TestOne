import React, { Component } from 'react';
import { Input, Button } from 'antd';

export default class SubscribeDeclare extends Component {
  render() {
    return (
      <div>
      <Input value="以下日期均不可预定,请仔细核对春季为:2019年 2月1日XXXXXXX XX XX
              最后更新时间2018年-11-11 10  10：10　ｄｍｉｎ"
        style={{ height: 100 }}
      />
        <Button type="primary">保存</Button>
      </div>
    );
  }
}
