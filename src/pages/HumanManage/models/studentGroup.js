import appConfig from "@/config/appConfig";
import * as studentGroupService from '../services/studentGroupService'

export default {
  namespace: 'studentGroup',
  state: {
    studentGroupList: [],
    studentGroupModel: {}
  },
  effects: {

    /**
     *  搜索
     * @param searchValue
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getStudentGroupList({payload: {searchValue}}, {call, put}) {
      const studentGroupList = yield call(studentGroupService.getStudentGroupList, searchValue);
      yield put({
        type: "setState",
        payload: {
          studentGroupList
        }
      })
    },

    /**
     *  删除
     * @param groupIds
     * @param call
     * @param put
     */* deleteStudentGroupByIds({payload: {groupIds}}, {call, put}) {
      yield call(studentGroupService.deleteStudentGroupByIds, groupIds);
    },

    /**
     *  保存
     * @param values
     * @param call
     * @param put
     */* saveStudentGroupData({payload: {values}}, {call, put}) {
      yield call(studentGroupService.saveStudentGroupData, values);
    },

    /**
     *   复制分组到分组
     * @param sourceIds
     * @param targetIds
     * @param call
     * @param put
     */* copyGroupToGroup({payload: {sourceIds, targetIds}}, {call, put}) {
      yield call(studentGroupService.copyGroupToGroup, sourceIds, targetIds);
    },

    /**
     *  移动
     * @param sourceIds
     * @param targetId
     * @param call
     * @param put
     */* moveGroupToGroup({payload: {sourceIds, targetId}}, {call, put}) {
      yield call(studentGroupService.moveGroupToGroup, sourceIds, targetId);
    },

    /**
     *  移动用户
     * @param userIds
     * @param targetId
     * @param call
     * @param put
     */* moveUserToGroup({payload: {userIds, targetId}}, {call, put}) {
      yield call(studentGroupService.moveUserToGroup, userIds, targetId);
    },

    /**
     *  查询分组信息
     * @param groupId
     * @param call
     * @param put
     */* getStudentGroupById({payload: {groupId}}, {call, put}) {
      const studentGroupModel = yield call(studentGroupService.getStudentGroupById, groupId);
      yield put({
        type: "setState",
        payload: {
          studentGroupModel
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
