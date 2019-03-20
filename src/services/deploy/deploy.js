import { postApi, getApi } from '@alife/scu/lib/request';
import presets, { resConfig, getMock } from '@utils/request-presets';

export const getProductList = {
  name: '人员列表',
  fn(params) {
    return getApi(
      {
        mock: getMock(
          {
            urlJson: '/src/mock/getProductList.json',
          },
          'USE_JSON'
        ),
      },
      params,
      presets,
      { ...resConfig }
    );
  },
};
export const getHotelList = {
  name: '人员列表',
  fn(params) {
    return getApi(
      {
        mock: getMock(
          {
            urlJson: '/src/mock/getHotelList.json',
          },
          'USE_JSON'
        ),
      },
      params,
      presets,
      { ...resConfig }
    );
  },
};


