import * as staffGroupService from '../services/staffGroupService'
import * as accessStrategyService from "../../AccessControl/services/accessStrategyService";
import * as authorityGroupService from '../../SystemManage/services/authorityGroupService'
import strategyEnums from "../../AccessControl/config/enums";

export default {
  namespace: 'staffGroup',
  state: {
    text: 'staffGroup',
    staffGroupList: [],
    groupToStaffUserList: [],
    total: 0,
    current: 1,
    pageSize: 5,
    staffGroupModel: {},
    accessStrategyList: [],
    menuAuthorityGroupList: [],
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
    },

    /**
     *   复制分组到分组
     * @param sourceIds
     * @param targetIds
     * @param call
     * @param put
     */* copyGroupToGroup({payload: {sourceIds, targetIds}}, {call, put}) {
      yield call(staffGroupService.copyGroupToGroup, sourceIds, targetIds);
    },

    /**
     *  移动
     * @param sourceIds
     * @param targetId
     * @param call
     * @param put
     */* moveGroupToGroup({payload: {sourceIds, targetId}}, {call, put}) {
      yield call(staffGroupService.moveGroupToGroup, sourceIds, targetId);
    },

    /**
     *  移动用户
     * @param userIds
     * @param targetId
     * @param call
     * @param put
     */* moveUserToGroup({payload: {userIds, targetId}}, {call, put}) {
      yield call(staffGroupService.moveUserToGroup, userIds, targetId);
    },

    /**
     *  根据id获取分组信息
     * @param groupId
     * @param call
     * @param put
     */* getUserGroupById({payload: {groupId}}, {call, put}) {
      const staffGroupModel = yield call(staffGroupService.getUserGroupById, groupId);
      yield put({
        type: "setState",
        payload: {
          staffGroupModel
        }
      })
    },

    /**
     *   获取门禁策略
     * @param call
     * @param put
     */* getAccessStrategyList({payload: {}}, {call, put}) {
      const {data: accessStrategyList} = yield call(accessStrategyService.getAccessStrategyList, {strategyStatus: strategyEnums.StrategyStatus.Enable.key}, 1, 1000);
      yield put({
        type: "setState",
        payload: {
          accessStrategyList
        }
      })
    },

    /**
     *  获取菜单权限
     * @param call
     * @param put
     */* getMenuAuthorityGroupList({payload: {}}, {call, put}) {
      const {data: menuAuthorityGroupList} = yield call(authorityGroupService.getAuthorityGroupList, {}, 1, 1000);
      yield put({
        type: "setState",
        payload: {
          menuAuthorityGroupList
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
