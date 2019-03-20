import React from 'react';
import { connect } from 'dva';
import styles from './index-page.less';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>喵! Welcome to Janna!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a target="_blank" href="http://janna.alibaba.net/#/introduce/getting-started">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
