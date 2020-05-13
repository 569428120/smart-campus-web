import appConfig from "@/config/appConfig";

const api = `${appConfig.API}/device-manage`;

export default {
  gateApi: {
    // 保存
    saveGateData: `${api}/gate/posts`,
    // 删除
    deleteGateByIds: `${api}/gate/deletes/deletes-by-ids`,
    // 分页查询
    getGateList: `${api}/gate/gets/page`,
  },
};
