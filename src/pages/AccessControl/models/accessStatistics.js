import appConfig from "@/config/appConfig";
import * as accessStatisticsService from '../services/accessStatisticsService'

export default {
  namespace: 'accessStatistics',
  state: {
    text: 'accessStatistics',
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
