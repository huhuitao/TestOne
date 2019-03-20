const menuData = [
  {
    name: '预约记录',
    icon: 'reconciliation',
    path: 'record',
  },
  {
    name: '预约配置',
    path: 'deploy',
    icon: 'credit-card',
    children: [
      {
        name: '商品配置',
        path: 'productDeploy',
      },
      {
        name: '酒店配置',
        path: 'hotelDeploy',
      },
      {
        name: '预定须知',
        path: 'subscribeDeclare',
      },
    ],
  },
  {
    name: '账号管理',
    icon: 'hdd',
    path: 'accountOp',
    children: [{
      name: '管理员账号',
      path: 'adminAccount',
    }],
  },
  // {
  //   name: '商品管理',
  //   icon: 'gift', // https://demo.com/icon.png or <Icon type="dashboard" />
  //   path: 'item',
  //   children: [
  //     {
  //       name: '发布商品',
  //       path: 'publish',
  //     },
  //     {
  //       name: '商品列表',
  //       path: 'list',
  //     },
  //   ],
  // },
  // {
  //   name: '交易管理',
  //   icon: 'bank',
  //   path: 'trade',
  //   children: [
  //     {
  //       name: '订单列表',
  //       path: 'order',
  //     },
  //   ],
  // },
  // {
  //   name: 'JANNA官网',
  //   path: 'http://janna.alibaba.net/',
  //   icon: 'book',
  //   target: '_blank',
  // },
];

// eslint-disable-next-line
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

function formatter(data, parentPath = '/') {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export default formatter(menuData);
