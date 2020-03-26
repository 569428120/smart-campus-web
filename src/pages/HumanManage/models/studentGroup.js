import appConfig from "@/config/appConfig";
import * as studentGroupService from '@/pages/HumanManage/services/studentGroupService'

export default {
  namespace: 'studentGroup',
  state: {
    text: 'studentGroup',
    regionList: [],// 教育局列表
    total: 0, // 数量
    current: 1, // 当前页
    pageSize: appConfig.PAGE_SIZE
  },
  effects: {

    /**
     *  根据搜索条件查询教育局列表
     * @param searchValue
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getRegionList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: regionList, total, totalPage} = yield call(regionService.getRegionList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          regionList
        }
      })
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
