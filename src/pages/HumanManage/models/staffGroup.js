import appConfig from "@/config/appConfig";
import * as staffGroupService from '@/pages/HumanManage/services/staffGroupService'

export default {
  namespace: 'staffGroup',
  state: {
    text: 'staffGroup',
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
