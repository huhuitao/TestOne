import React from 'react';
import { Row } from 'antd';
import OrderTable from '@alife/scu-order-table';

const columns = [
  {
    title: '商品标题',
    key: 'itemTitle',
    dataIndex: 'itemTitle',
    style: {
      textAlign: 'left',
    },
  },
  {
    title: '单价',
    key: 'price',
    width: 70,
    render: data => `¥${data.itemPriceStr}`,
  },
  {
    title: '数量',
    dataIndex: 'buyAmount',
    key: 'buyAmount',
    width: 150,
  },
  {
    title: '操作',
    key: 'operation',
    width: 100,
    render: data => ( // eslint-disable-line
      <div>
        <a
          style={{ display: 'block' }}
        >
          操作1
        </a>
      </div>
    ),
  },
];
/* eslint-disable jsx-a11y/label-has-for */
const titleRender = data => (
    <Row type="flex">
      <div>
        <label htmlFor="order">订单号: </label>
        <text name="order">{data.tcOrderId}</text>
      </div>
      <div style={{ marginLeft: '20px' }}>
        <label htmlFor="time">成交时间: </label>
        <text name="time">{data.payTimeStr}</text>
      </div>
    </Row>
);

export default function OrderList({ tableData, onPageChange, ...rest }) {
  const { data, loading, pageNum, pageSize, total } = tableData;
  const pagination = {
    current: pageNum,
    pageSize,
    total,
    onChange: onPageChange,
  };
  return (
    <div {...rest}>
      <OrderTable
        columns={columns}
        dataSource={data}
        loading={loading}
        isShowPageButton
        pagination={pagination}
        titleRender={titleRender}
        rowKey="tcOrderId"
      />
    </div>
  );
}
