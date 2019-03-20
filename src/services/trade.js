/* eslint import/prefer-default-export: 0 */
/* eslint no-unused-vars: 0 */
import { postApi, getApi } from '@alife/scu/lib/request';
import { presetsWithResultGetter } from '@utils/request-presets';

export function getResource(params) {
  return getApi({
    url: '/icenter/traveller/ajax/getWifiOrder.htm',
    mock: 'http://dip.alibaba-inc.com/api/v2/services/schema/mock/61184',
  }, params, presetsWithResultGetter, { timeout: 100, isMock: true });
}
