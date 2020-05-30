import appConfig from "@/config/appConfig";

export default {
  // 教育局管理api
  regionApi: {
    // 搜索查询教育局列表
    getRegionList: `${appConfig.API}/region/gets/page`,
    // 删除教育局数据
    deleteRegionByIds: `${appConfig.API}/region/deletes/deletes-by-ids`,
    // 保存教育局的数据
    saveRegionData: `${appConfig.API}/region/posts`,
    // 校验
    validatorRegion: `${appConfig.API}/region/validator`,
  },
  // 学校管理api
  schoolApi: {
    // 查询
    getSchoolList: `${appConfig.API}/school/gets/page`,
    // 删除
    deleteSchoolByIds: `${appConfig.API}/school/deletes/deletes-by-ids`,
    // 保存
    saveSchoolData: `${appConfig.API}/school/posts`,
  },
  // pc菜单管理
  pcMenuApi: {
    getMenuList: `${appConfig.API}/pc-menu/gets/all`,
    deletePcMenuByIds: `${appConfig.API}/pc-menu/deletes/deletes-by-ids`,
    savePcMenuData: `${appConfig.API}/pc-menu/posts`,
  },
  // 权限组管理
  authorityGroupApi: {
    // 查询权限组
    getAuthorityGroupList: `${appConfig.API}/authority-group/gets/page`,
    // 查询组下的菜单列表
    getMenuListByGroupId: `${appConfig.API}/authority-to-menu/gets/gets-by-groupid`,
    // 删除权限组
    deleteAuthorityGroupByIds: `${appConfig.API}/authority-group/deletes/deletes-by-ids`,
    // 保存权限组
    saveAuthorityGroup: `${appConfig.API}/authority-group/posts`,
    // 保存权限组管理的菜单
    saveGroupIdToMenuList: `${appConfig.API}/authority-to-menu/posts/post-by-groupid`,
  }
}
