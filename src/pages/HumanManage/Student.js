import React, {PureComponent} from 'react';
import {Card, Modal} from 'antd';
import {connect} from 'dva';
import appConfig from "@/config/appConfig";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SearchForm from './components/student/SearchForm';
import StudentTable from './components/student/StudentTable';
import StudentModal from "./components/student/StudentModal";
import GuardianModal from "./components/student/GuardianModal";
import StudentDetailDrawer from "./components/student/StudentDetailDrawer";


/**
 *  学生管理
 */
@connect(({loading, student, studentGroup}) => ({
  loading,
  student,
  studentGroup
}))
class Student extends PureComponent {
  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    guardianSelectedRowKeys: [],// 监护人选择
    guardianSelectedRows: [],// 监护人选择
    studentModalVisible: false,
    studentModel: {},
    guardianModel: {},// 监护人对象
    openType: "",
    guardianModalVisible: false,
  };

  componentDidMount() {
    this.onRefreshStudentPage({}, 1, appConfig.PAGE_SIZE);
  }

  /**
   *   刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshStudentPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "student/getStudentList",
      payload: {
        searchValue,
        current,
        pageSize
      }
    });
    this.setState({
      searchValue
    })
  };


  /**
   *   刷新联系人数据
   * @param studentId
   */
  onRefreshStudentToGuardianList = (studentId) => {
    const {dispatch} = this.props;
    dispatch({
      type: "student/getStudentToGuardianList",
      payload: {
        studentId
      }
    });
    this.setState({
      guardianSelectedRowKeys: [],
      guardianSelectedRows: [],
    })
  };


  /**
   *  新增
   */
  openStudentModal = (record, openType) => {
    this.setState({
      studentModalVisible: true,
      openType,
      studentModel: record,
    });
  };

  /**
   *   设置
   */
  openGuardianModal = (studentModel, guardianModel, openType) => {
    this.setState({
      guardianModalVisible: true,
      openType,
      studentModel,
      guardianModel,
    });
  };

  /**
   *   删除联系人
   * @param studentId
   * @param contactIds
   */
  onDeleteStudentToGuardians = (studentId, contactIds) => {
    const {dispatch} = this.props;
    dispatch({
      type: "student/deleteStudentToGuardians",
      payload: {
        studentId,
        contactIds
      }
    }).then(() => {
      this.onRefreshStudentToGuardianList(studentId)
    });
  };

  /**
   *   用户详情抽屉
   * @param record
   */
  openStudentDetailDrawer = (record) => {
    this.onRefreshStudentToGuardianList(record.id);
    this.setState({
      studentModel: record,
      studentDetailDrawerVisible: true
    })
  };

  /**
   *  删除
   */
  deleteStudents = (studentIds) => {
    const {dispatch, student: {pageSize}} = this.props;
    const {searchValue} = this.state;
    const deleteFunc = () => {
      dispatch({
        type: "student/deleteStudentByIds",
        payload: {
          studentIds,
        }
      }).then(() => {
        this.onRefreshStudentPage(searchValue, 1, pageSize);
        // 清除选择
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        })
      });
    };

    Modal.confirm({
      title: '删除确认',
      content: '是否删除选择的数据',
      onOk: deleteFunc,
      okText: '确认',
      cancelText: '取消',
    });
  };

  /**
   *   确认事件
   * @param values
   * @param openType
   */
  onStudentModalOk = (values, openType) => {
    const {dispatch, student: {current, pageSize}} = this.props;
    const {searchValue} = this.state;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "student/saveStudentData",
        payload: {
          values
        }
      }).then(() => {
        this.onRefreshStudentPage(searchValue, openType === 'edit' ? current : 1, pageSize);
        // 清除选择
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        })
      });
    }
    this.closeStudentModal();
  };


  /**
   * 设置
   * @param values
   * @param openType
   */
  onGuardianModalOk = (values, openType) => {
    const {dispatch, student: {current, pageSize}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "student/saveStudentToGuardian",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshStudentPage(searchValue, openType === 'edit' ? current : 1, pageSize);
      // 清除选择
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        guardianModalVisible: false
      })
    });
  };


  /**
   *  关闭弹窗
   */
  closeStudentModal = () => {
    this.setState({
      studentModalVisible: false,
    });
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows} = this.state;
    const buttonList = [];

    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新增',
      operatorKey: 'student-add',
      onClick: () => this.openStudentModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'student-edit',
        onClick: () => this.openStudentModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'student-delete',
        text: '删除',
        onClick: () => this.deleteStudents(selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    // model里面的数据
    const {
      loading,
      student: {
        studentList,
        total,
        current,
        pageSize,
        studentToGuardianList
      },
      studentGroup: {
        studentGroupList
      }
    } = this.props;

    // 搜索框参数
    const searchFormProps = {
      onSearch: (values) => this.onRefreshStudentPage(values, 1, pageSize),
      onFormReset: (values) => this.onRefreshStudentPage(values, 1, pageSize),
    };

    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格组件参数
    const studentTableProps = {
      dataSource: [{id: "a", name: "sdsds"}],
      total,
      current,
      pageSize,
      loading: loading.effects['student/getStudentList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onTablePageChange: (current, pageSize) => this.onRefreshStudentPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshStudentPage(this.state.searchValue, current, pageSize),
      onRowCheck: (record) => this.openStudentDetailDrawer(record),
      //onShowView: (record) => this.openStudentModal(record, 'view'),
    };

    // 弹窗参数
    const studentModalProps = {
      visible: this.state.studentModalVisible,
      openType: this.state.openType,
      dataSource: this.state.studentModel,
      okLoading: loading.effects['student/saveStudentData'],
      studentGroupList,
      onOk: this.onStudentModalOk,
      onCancel: this.closeStudentModal
    };

    // 用户详情
    const studentDetailDrawerProps = {
      visible: this.state.studentDetailDrawerVisible,
      selectedRowKeys: this.state.guardianSelectedRowKeys,
      selectedRows: this.state.guardianSelectedRows,
      loading: loading.effects['student/getStudentToGuardianList'],
      studentToGuardianList,
      openStudentModal: (studentModel, guardianModel, openType) => this.openGuardianModal(studentModel, guardianModel, openType),
      deleteStudentToGuardians: (studentId, contactIds) => this.onDeleteStudentToGuardians(studentId, contactIds),
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({
        guardianSelectedRowKeys: selectedRowKeys,
        guardianSelectedRows: selectedRows
      }),
      onClose: () => this.setState({studentDetailDrawerVisible: false})
    };

    const guardianModalProps = {
      visible: this.state.guardianModalVisible,
      openType: this.state.openType,
      studentModel: this.state.studentModel,
      dataSource: this.state.guardianModel,
      okLoading: loading.effects['student/saveGuardianList'],
      onOk: this.onGuardianModalOk,
      onCancel: () => this.setState({guardianModalVisible: false})
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm {...searchFormProps} />
            </div>
            <div className={styles.tableListOperator}>
              <OperatorButton {...operatorButtonProps} />
            </div>
            <StudentTable {...studentTableProps} />
          </div>
        </Card>
        <StudentModal {...studentModalProps}/>
        <GuardianModal {...guardianModalProps}/>
        <StudentDetailDrawer {...studentDetailDrawerProps} />
      </PageHeaderWrapper>
    );
  }
}

export default Student;
