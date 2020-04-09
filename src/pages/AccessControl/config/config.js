import appConfig from "@/config/appConfig";

const api = `${appConfig.API}/access-control`;

export default {
  // 策略api
  accessStrategyApi: {
    // 分页查询
    getAccessStrategyList: `${api}/access-strategy/gets/page`,
    // 查询时间段
    getStrategyToTimeQuantumList: `${api}/strategy-time-quantum/gets/gets-by-strategyid`,
    // 删除
    deleteAccessStrategyByIds: `${api}/access-strategy/deletes/deletes-by-id`,
    // 保存
    saveAccessStrategy: `${api}/access-strategy/posts`,
    // 更新状态
    updateAccessStrategyStatus: `${api}/access-strategy/status/posts`,
  },
  // 策略分配
  accessDistributionApi: {
    // 根据类型不同查询学生和职工分组
    getAccessDistributionList: `${api}/access-distribution/gets/all`,
    // 保存策略分配关系, 类型字段不需要设置
    saveGroupToStrategyId: `${api}/access-distribution/posts`,
    // 查询策略
    getAccessStrategyList: `${api}/access-strategy/gets/all`,
    // 根据策略查询时间段
    getTimeQuantumListByStrategyId: `${api}/strategy-time-quantum/gets/gets-by-strategyId`,
  },
  // 人员出入记录
  personnelRecordApi: {
    // 分页查询
    getPersonnelRecordList: `${api}/personnel-record/gets/page`,
    // 查询用户类型
    getUserTypeList: `${api}/personnel-user-type/gets/all`,
    // 策略类型
    getStrategyTypeList: `${api}/personnel-strategy-type/gets/all`,
    // 验证方式
    getModeList: `${api}/personnel-mode/gets/all`,
    // 记录详情
    getPersonnelRecordDetail: `${api}/personnel-record-detail/gets/gets-by-id`,
  },
  // 人员出入记录
  carRecordApi: {
    // 分页查询
    getCarRecordList: `${api}/car-record/gets/page`,
    // 查询用户类型
    getUserTypeList: `${api}/car-user-type/gets/all`,
    // 策略类型
    getStrategyTypeList: `${api}/car-strategy-type/gets/all`,
    // 记录详情
    getCarRecordDetail: `${api}/car-record-detail/gets/gets-by-id`,
  },
}
