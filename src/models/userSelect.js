import appConfig from "@/config/appConfig";
import enums from '@/config/enums';
import * as cardService from '../pages/InfoEntry/services/cardService';

export default {
  namespace: 'userSelect',
  state: {
    userTypeList: Object.values(enums.UserTypes),
    groupList: [],
    userList: [],
    selectUser: {},
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
