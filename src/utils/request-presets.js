
import { buildinPresets } from '@alife/scu/lib/request';

const { checkStatus, parseJSON, getResult, successJudge } = buildinPresets;

export const presetsWithResultGetter = [checkStatus, parseJSON, getResult];
export const presetsWithSuccessJudge = [checkStatus, parseJSON, successJudge];
export const resConfig = { timeout: 3000, isMock: true };
const MOCK_FLAG = {
  USE_JSON: 'USE_JSON', // 使用本地测试数据
  USE_PRE: 'USE_PRE', // 使用预发布数据
  USE_PUB: 'USE_PUB', // 使用发布数据
};
export const getMock = ({ urlJson, urlPre, urlPub }, retType = MOCK_FLAG.USE_JSON) => {
  if (retType === MOCK_FLAG.USE_JSON) {
    return urlJson;
  } else if (retType === MOCK_FLAG.USE_PRE) {
    return urlPre;
  } else if (retType === MOCK_FLAG.USE_PUB) {
    return urlPub;
  }
};

export default [checkStatus, parseJSON];
