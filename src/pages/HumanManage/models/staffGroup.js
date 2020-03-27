import appConfig from "@/config/appConfig";
import * as staffGroupService from '@/pages/HumanManage/services/staffGroupService'

export default {
  namespace: 'staffGroup',
  state: {
    text: 'staffGroup',
    staffGroupList: [],
  },
  effects: {
    /**
     *  搜索
     * @param searchValue
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getStaffGroupList({payload: {searchValue}}, {call, put}) {
      const staffGroupList = yield call(staffGroupService.getStaffGroupList, searchValue);
      yield put({
        type: "setState",
        payload: {
          staffGroupList
        }
      })
    },

    /**
     *   删除
     * @param groupIds
     * @param call
     * @param put
     */* deleteStaffGroupByIds({payload: {groupIds}}, {call, put}) {
      yield call(staffGroupService.deleteStaffGroupByIds, groupIds);
    },

    /**
     *  保存
     * @param values
     * @param call
     * @param put
     */* saveStaffGroupData({payload: {values}}, {call, put}) {
      yield call(staffGroupService.saveStaffGroupData, values);
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
