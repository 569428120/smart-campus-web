import appConfig from "@/config/appConfig";
import * as staffUserService from '@/pages/HumanManage/services/staffUserService'

export default {
  namespace: 'staffUser',
  state: {
    text: 'staffUser',
    schoolList: [],// 学校列表
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
  },
  effects: {


    /**
     *  保存数据
     * @param values
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* saveSchoolData({payload: {values}}, {call, put}) {
      yield call(schoolService.saveSchoolData, values);
    }

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
