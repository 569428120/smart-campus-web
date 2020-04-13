import appConfig from "@/config/appConfig";
import * as userService from '../services/userService'

export default {
  namespace: 'featureUser',
  state: {
    text: 'featureUser',
    userGroupList: [],
    userList: [],
  },
  effects: {

    /**
     *  学生分组
     * @param call
     * @param put
     */* getStudentGroupList({payload: {}}, {call, put}) {
      const userGroupList = yield call(userService.getStudentGroupList);
      yield put({
        type: "setState",
        payload: {
          userGroupList
        }
      })
    },

    /**
     *  职员分组
     * @param call
     * @param put
     */* getStaffGroupList({payload: {}}, {call, put}) {
      const userGroupList = yield call(userService.getStaffGroupList);
      yield put({
        type: "setState",
        payload: {
          userGroupList
        }
      })
    },

    /**
     *  学生
     * @param groupId
     * @param call
     * @param put
     */* getStudentList({payload: {groupId}}, {call, put}) {
      const userList = yield call(userService.getStudentList, groupId);
      yield put({
        type: "setState",
        payload: {
          userList
        }
      })
    },

    /**
     *  职员
     * @param groupId
     * @param call
     * @param put
     */* getStaffList({payload: {groupId}}, {call, put}) {
      const userList = yield call(userService.getStaffList, groupId);
      yield put({
        type: "setState",
        payload: {
          userList
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
