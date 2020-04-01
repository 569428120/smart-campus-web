import appConfig from "@/config/appConfig";
import * as carRecordService from '../services/carRecordService'

export default {
  namespace: 'carRecord',
  state: {
    text: 'carRecord',
    staffGroupList: [],
    groupToStaffUserList: [],
    total: 0,
    current: 1,
    pageSize: 5,
  },
  effects: {

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
