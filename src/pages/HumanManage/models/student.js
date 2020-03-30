import appConfig from "@/config/appConfig";
import * as studentService from '@/pages/HumanManage/services/studentService'

export default {
  namespace: 'student',
  state: {
    text: 'student',
    studentList: [],// 学校列表
    current: 1,// 当前页
    pageSize: appConfig.PAGE_SIZE, //每页显示的大小
    total: 0,// 总数
  },
  effects: {

    /**
     *  搜索
     * @param searchValue
     * @param current
     * @param pageSize
     * @param call
     * @param put
     * @returns {Generator<*, void, ?>}
     */* getStudentList({payload: {searchValue, current, pageSize}}, {call, put}) {
      const {data: studentList, total, totalPage} = yield call(studentService.getStudentList, searchValue, current, pageSize);
      yield put({
        type: "setState",
        payload: {
          total,
          current,
          pageSize,
          studentList
        }
      })
    },

    /**
     *  保存
     * @param values
     * @param call
     * @param put
     */* saveStudentData({payload: {values}}, {call, put}) {
      yield call(studentService.saveStudentData, values);
    },

    /**
     *  保存
     * @param guardianList
     * @param studentId
     * @param call
     * @param put
     */* saveGuardianList({payload: {studentId, guardianList}}, {call, put}) {
      yield call(studentService.saveGuardianList, studentId, guardianList);
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
