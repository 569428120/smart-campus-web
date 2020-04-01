import appConfig from "@/config/appConfig";
import * as personnelRecordService from '../services/personnelRecordService'

export default {
  namespace: 'personnelRecord',
  state: {
    text: 'personnelRecord',
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
