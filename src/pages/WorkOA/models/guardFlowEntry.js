import appConfig from "@/config/appConfig";
import * as guardFlowEntryService from '../services/flowRecordService';
// 测试数据
import mock from '../config/mock'

export default {
  namespace: 'guardFlowEntry',
  state: {
    flowPool: {},
    flowServiceModel: {},
    flowStepList: []
  },
  effects: {

    /**
     *   获取电子流模板
     * @param call
     * @param put
     */* getFlowTemplate({payload: {}}, {call, put}) {
      //const {flowPool,flowStepList} = yield call(guardFlowEntryService.getFlowTemplate);
      const {flowPool, flowStepList, flowServiceModel} = mock.guardFlowEntryService.getFlowTemplate();
      yield put({
        type: "setState",
        payload: {
          flowPool,
          flowStepList,
          flowServiceModel
        }
      })
    },

    /**
     *   获取电子流数据
     * @param flowId
     * @param call
     * @param put
     */* getFlowPoolAndStepList({payload: {flowId}}, {call, put}) {
      //const {flowPool,flowStepList} = yield call(guardFlowEntryService.getFlowPoolAndStepList,flowId);
      const {flowPool, flowStepList} = mock.guardFlowEntryService.getFlowTemplate();
      yield put({
        type: "setState",
        payload: {
          flowPool,
          flowStepList
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
