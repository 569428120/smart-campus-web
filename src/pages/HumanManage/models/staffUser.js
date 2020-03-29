import appConfig from "@/config/appConfig";
import * as staffUserService from '@/pages/HumanManage/services/staffUserService'

export default {
  namespace: 'staffUser',
  state: {
    text: 'staffUser',
    staffUserList: [],// 学校列表
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
  },
  effects: {

    /**
     * 搜索数据
     */* getStaffUserList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: staffUserList, total, totalPage} = yield call(staffUserService.getStaffUserList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          staffUserList
        }
      })
    },

    /**
     *  保存数据
     * @param values
     * @param call
     * @param put
     */* saveStaffUserData({payload: {values}}, {call, put}) {
      yield call(staffUserService.saveStaffUserData, values);
    },

    /**
     *  保存数据
     * @param values
     * @param call
     * @param put
     */* saveLoginUser({payload: {values}}, {call, put}) {
      yield call(staffUserService.saveLoginUser, values);
    },

    /**
     *  删除
     * @param userIds
     * @param call
     * @param put
     */* deleteStaffUserByIds({payload: {userIds}}, {call, put}) {
      yield call(staffUserService.deleteStaffUserByIds, userIds);
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
