import appConfig from "@/config/appConfig";
import * as faceService from '../services/faceService'

export default {
  namespace: 'face',
  state: {
    text: 'face',
    faceList: [],// 学校列表
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
  },
  effects: {

    /**
     * 查询
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     */* getFaceList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: faceList, total, totalPage} = yield call(faceService.getFaceList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          faceList
        }
      })
    },

    /**
     *  删除
     * @param faceIds
     * @param call
     * @param put
     */* deleteFaceByIds({payload: {faceIds}}, {call, put}) {
      yield call(faceService.deleteFaceByIds);
    },

    /**
     *  保存
     * @param faceIds
     * @param call
     * @param put
     */* saveFaceData({payload: {values}}, {call, put}) {
      yield call(faceService.saveFaceData, values);
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
