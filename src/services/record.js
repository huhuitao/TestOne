import { postApi, getApi } from '@alife/scu/lib/request';
import presets, { resConfig, getMock } from '@utils/request-presets';

export const getRecordList = {
  name: '人员列表',
  fn(params) {
    return getApi(
      {
        mock: getMock(
          {
            urlJson: '/src/mock/getRecordList.json',
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
