import React from 'react';
import { Table } from 'antd';
import ItemCard from '@alife/scu-item-card';

export default function ItemTable({ tableData, onPageChange, ...rest }) {
  const { items, loading, pageNum, pageSize, total } = tableData;
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
      render: (title, item) => (
        <ItemCard item={item} />
      ),
    }, {
      title: '操作',
      dataIndex: 'itemId',
      width: 60,
      render() {
        return (
          <div>
            <a>编辑</a>
            <br />
            <a>删除</a>
          </div>
        );
      },
    },
  ];
  const pagination = {
    current: pageNum,
    total,
    pageSize,
    onChange: onPageChange,
  };
  return (
    <div {...rest}>
      <Table
        rowKey="itemId"
        pagination={pagination}
        columns={columns}
        dataSource={items}
        loading={loading}
      />
    </div>
  );
}
