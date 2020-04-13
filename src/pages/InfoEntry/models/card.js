import appConfig from "@/config/appConfig";
import * as cardService from '../services/cardService'

export default {
  namespace: 'card',
  state: {
    text: 'card',
    cardList: [],// 学校列表
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
     */* getCardList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: cardList, total, totalPage} = yield call(cardService.getCardList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          cardList
        }
      })
    },

    /**
     *  删除
     * @param cardIds
     * @param call
     * @param put
     */* deleteCardByIds({payload: {cardIds}}, {call, put}) {
      yield call(cardService.deleteCardByIds);
    },

    /**
     *  保存
     * @param cardIds
     * @param call
     * @param put
     */* saveCardData({payload: {values}}, {call, put}) {
      yield call(cardService.saveCardData, values);
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
