import appConfig from "@/config/appConfig";

const api = `${appConfig.API}/flow`;

export default {
  // 流程记录
  flowRecordApi: {
    // 代办列表
    getTodoFlowRecordList: `${api}/flow-record/todo/gets/page`,
    // 已办
    getAlreadyFlowRecordList: `${api}/flow-record/already/gets/page`,
    // 保存
    getMyCreateFlowRecordList: `${api}/flow-record/my-create/gets/page`,
  },
}
