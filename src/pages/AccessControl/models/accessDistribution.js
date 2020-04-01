import appConfig from "@/config/appConfig";
import * as accessDistributionService from '../services/accessDistributionService'

export default {
  namespace: 'accessDistribution',
  state: {
    text: 'accessDistribution',
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
