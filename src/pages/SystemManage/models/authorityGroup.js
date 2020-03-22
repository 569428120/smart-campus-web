import appConfig from "@/config/appConfig";

export default {
  namespace: 'authorityGroup',
  state: {
    text: '权限组model',
    authorityGroupList: [],
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
    menuList: [], // 菜单列表
    groupToMenuList: [],// 分组下的菜单列表
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

    },

    /**
     *   删除
     * @param groupIds
     * @param call
     * @param put
     */* deleteAuthorityGroupByIds({payload: {groupIds}}, {call, put}) {

    },

    /**
     *  获取菜单
     * @param call
     * @param put
     */* getAllMenuList({payload: {}}, {call, put}) {

    },

    /**
     *  获取分组下的菜单列表
     * @param groupId
     * @param call
     * @param put
     */* getMenuListByGroupId({payload: {groupId}}, {call, put}) {

    },

    /**
     *  保存
     * @param values
     * @param call
     * @param put
     */* saveAuthorityGroup({payload: {values}}, {call, put}) {

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
