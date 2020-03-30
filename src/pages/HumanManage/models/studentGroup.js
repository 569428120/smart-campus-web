import appConfig from "@/config/appConfig";
import * as studentGroupService from '@/pages/HumanManage/services/studentGroupService'

export default {
  namespace: 'studentGroup',
  state: {
    text: 'studentGroup',
    studentGroupList: [],
    groupToStudentList: [],
    total: 0, // 数量
    current: 1, // 当前页
    pageSize: 5
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
     *   查询关联的数据
     * @param groupId
     * @param current
     * @param pageSize
     * @param call
     * @param put
     */* getGroupToStudentList({payload: {groupId, current, pageSize}}, {call, put}) {
      const {data: groupToStudentList, total, totalPage} = yield call(studentGroupService.getGroupToStudentList, groupId, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          groupToStudentList
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
