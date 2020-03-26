import appConfig from "@/config/appConfig";
import * as authorityGroupService from '@/pages/SystemManage/services/authorityGroupService'
import {treeDataToMap, getTreeKeys} from '@/utils/utils';

export default {
  namespace: 'authorityGroup',
  state: {
    text: '权限组model',
    authorityGroupList: [],
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
    menuList: [], // 菜单列表
    menuIdToModelMap: new Map(),
    pidToModelsMap: new Map(),
    groupToMenuIdList: [],// 分组下的菜单列表
  },
  effects: {

    /**
     *  搜索查询权限组数据
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     */* getAuthorityGroupList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: authorityGroupList, total, totalPage} = yield call(authorityGroupService.getAuthorityGroupList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          authorityGroupList
        }
      })
    },

    /**
     *   删除
     * @param groupIds
     * @param call
     * @param put
     */* deleteAuthorityGroupByIds({payload: {groupIds}}, {call, put}) {
      yield call(authorityGroupService.deleteAuthorityGroupByIds, groupIds);
    },

    /**
     *  获取菜单
     *  @param groupId
     * @param call
     * @param put
     */* getAllMenuAndGroupToMenuIdList({payload: {groupId}}, {call, put}) {
      // 查询菜单列表
      const menuList = yield call(authorityGroupService.getAllMenuList);
      const menuIdToModelMap = new Map();
      const pidToModelsMap = new Map();
      treeDataToMap((menuList || []), menuIdToModelMap, pidToModelsMap);
      // 查询本组挂了的菜单列表
      const groupToMenuList = yield call(authorityGroupService.getMenuListByGroupId, groupId);
      const groupToMenuIdList = getTreeKeys(groupToMenuList, "id");
      yield put({
        type: "setState",
        payload: {
          menuList,
          menuIdToModelMap,
          pidToModelsMap,
          groupToMenuIdList
        }
      })
    },

    /**
     *  获取分组下的菜单列表
     * @param groupId
     * @param call
     * @param put
     */* getMenuListByGroupId({payload: {groupId}}, {call, put}) {
      const menuList = yield call(authorityGroupService.getMenuListByGroupId, groupId);
      yield put({
        type: "setState",
        payload: {
          menuList,
        }
      })
    },

    /**
     *  保存
     * @param values
     * @param call
     * @param put
     */* saveAuthorityGroup({payload: {values}}, {call, put}) {
      yield call(authorityGroupService.saveAuthorityGroup, values);
    },

    /**
     *   给权限组设置菜单
     * @param groupId
     * @param menuIds
     * @param call
     * @param put
     */* saveGroupIdToMenuList({payload: {groupId, menuIds}}, {call, put}) {
      yield call(authorityGroupService.saveGroupIdToMenuList, groupId, menuIds);
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
