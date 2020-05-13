const getFlowTemplate = () => {
  const flowPool = {
    id: '1',
    originatorName: 'xuzhipeng',
    originatorCode: 'xxxxxxxxxxxx',
    applicantType: '',
    applicantName: 'xxxx',
    applicantCode: 'xxxxxx',
    steps: '1##2##3',
    currStep: '2',
    examineStatus: 'toReviewed',
    flowName: '门禁审核-徐志鹏-2019-12-02',
  };
  const flowStepList = [
    {
      id: '1',
      stepName: '创建',
      opinion: '生病请假去医院',
      handleName: 'xxx',
      handleCode: 'xxxx',
      handleStatus: 'finish', //wait process finish error
    },
    {
      id: '2',
      stepName: '老师审批',
      opinion: '去吧',
      handleName: 'xxx',
      handleCode: 'xxxx',
      handleStatus: 'process', //wait process finish error
    },
    {
      id: '3',
      stepName: '结束',
      opinion: '系统结束',
      handleName: 'xxx',
      handleCode: 'xxxx',
      handleStatus: 'wait', //wait process finish error
    }
  ];
  const flowServiceModel = {
    id: "",
    startTime: "",
    endTime: "",
    carNumber: "xxxxxxxx"
  };
  return {flowPool, flowStepList, flowServiceModel}
};

// 测试数据
export default {
  // 流程记录
  guardFlowEntryService: {
    // 获取流程模板
    getFlowTemplate,

  },
}
