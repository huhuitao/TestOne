import React from 'react';
import CategoryMenu from '@alife/scu-category-menu';
import { Button } from 'antd';
import styles from './publish.less';

const data = [
  {
    name: '类目1',
    catId: '1',
    children: [
      {
        name: '类目1-1',
        catId: '1-1',
      },
    ],
  },
  {
    name: '类目2',
    catId: '2',
  },
];

export default function Publish() {
  return (
    <div className={styles.root}>
      <CategoryMenu data={data} valueKey="catId" labelKey="name" />
      <Button className={styles.btn} type="primary">
        发布商品
      </Button>
    </div>
  );
}
