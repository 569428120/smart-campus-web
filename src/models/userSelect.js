import appConfig from "@/config/appConfig";
import enums from '@/config/enums';
import * as userService from "../services/userService";

export default {
  namespace: 'userSelect',
  state: {
    userTypeList: Object.values(enums.UserTypes),
    groupList: [],
    userList: [],
    total: 0,
    current: 1,
    pageSize: 15,
  },
  effects: {

    /**
     *  查询用户列表
     * @param groupId
     * @param userType
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     */* getUserList({payload: {groupId, userType, searchValue, current, pageSize}}, {call, put}) {
      const {data: userList, total, totalPage} = yield call(userService.getUserList, groupId, userType, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          userList
        }
      })
    },

    /**
     *  获取用户分组
     * @param userType
     * @param call
     * @param put
     */* getUserGroupList({payload: {userType}}, {call, put}) {
      const groupList = yield call(userService.getUserGroupList, userType);
      yield put({
        type: "setState",
        payload: {
          groupList
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
