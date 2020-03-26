import appConfig from "@/config/appConfig";
import * as studentService from '@/pages/HumanManage/services/studentService'

export default {
  namespace: 'student',
  state: {
    text: 'student',
    menuList: [], // 菜单列表
  },
  effects: {

    /**
     *  搜索
     * @param searchValue
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getMenuList({payload: {searchValue}}, {call, put}) {
      const menuList = yield call(pcMenuService.getMenuList, searchValue);
      yield put({
        type: "setState",
        payload: {
          menuList
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
