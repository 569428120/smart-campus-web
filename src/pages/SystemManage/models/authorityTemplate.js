import appConfig from "@/config/appConfig";
import * as templateService from '../services/templateService'

export default {
  namespace: 'authorityTemplate',
  state: {
    authorityTemplateList: [],
  },
  effects: {

    /**
     *  根据搜索条件查询教育局列表
     * @param searchValue
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getAuthorityTemplateList({payload: {}}, {call, put}) {
      const {data: authorityTemplateList, total, totalPage} = yield call(templateService.getAuthorityTemplateList);
      yield put({
        type: "setState",
        payload: {
          authorityTemplateList
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
