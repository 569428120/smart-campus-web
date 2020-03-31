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
    studentToGuardianList: [],
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
     *   获取联系人列表
     * @param studentId
     * @param call
     * @param put
     */* getStudentToGuardianList({payload: {studentId}}, {call, put}) {
      const studentToGuardianList = yield call(studentService.getStudentToGuardianList, studentId);
      yield put({
        type: "setState",
        payload: {
          studentToGuardianList
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
     * @param values
     * @param studentId
     * @param call
     * @param put
     */* saveStudentToGuardian({payload: {values}}, {call, put}) {
      yield call(studentService.saveStudentToGuardian, values);
    },

    /**
     *  删除
     * @param studentId
     * @param contactIds
     * @param call
     * @param put
     */* deleteStudentToGuardians({payload: {studentId, contactIds}}, {call, put}) {
      yield call(studentService.deleteStudentToGuardians, studentId, contactIds);
    }

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
