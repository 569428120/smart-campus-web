import React, {PureComponent} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import SearchForm from '@/pages/HumanManage/components/studentGroup/SearchForm';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import StudentGroupTable from '@/pages/HumanManage/components/studentGroup/StudentGroupTable';
import StudentGroupModal from "@/pages/HumanManage/components/studentGroup/StudentGroupModal";
import enums from "@/pages/HumanManage/config/enums";
import GroupToStudentDrawer from "./components/studentGroup/GroupToStudentDrawer";

const groupToStudentPageSize = 5;

/**
 *  区域管理页面
 */
@connect(({loading, studentGroup}) => ({
  loading,
  studentGroup,
}))
class StudentGroup extends PureComponent {
  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    studentGroupModalVisible: false,
    studentGroupModel: {},
    pStudentGroupModel: {},
    openType: "",
    groupToStudentDrawerVisible: false,
  };

  componentDidMount() {
    this.onRefreshStudentGroupList({});
  }

  /**
   *   刷新数据
   * @param searchValue
   */
  onRefreshStudentGroupList = (searchValue) => {
    const {dispatch} = this.props;
    dispatch({
      type: "studentGroup/getStudentGroupList",
      payload: {
        searchValue,
      }
    });
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
      searchValue
    })
  };


  /**
   *  新增
   */
  openStudentGroupModal = (record, openType, pRecord) => {
    this.setState({
      studentGroupModalVisible: true,
      openType,
      studentGroupModel: record,
      pStudentGroupModel: pRecord
    });
  };

  /**
   *  查看学生列表
   * @param record
   */
  openGroupToStudentDrawer = (record) => {
    // 查询学生数据
    const {id: groupId} = record;
    this.onRefreshGroupToStudentList(groupId, 1, groupToStudentPageSize);
    this.setState({
      groupToStudentDrawerVisible: true,
      studentGroupModel: record,
    });
  };

  /**
   *  刷新group to StudentList
   * @param groupId
   * @param current
   * @param pageSize
   */
  onRefreshGroupToStudentList = (groupId, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "studentGroup/getGroupToStudentList",
      payload: {
        groupId,
        current,
        pageSize
      }
    });
  };

  /**
   *  删除
   */
  deleteStudentGroups = (groupIds) => {
    const {dispatch} = this.props;
    const {searchValue} = this.state;
    const deleteFunc = () => {
      dispatch({
        type: "studentGroup/deleteStudentGroupByIds",
        payload: {
          groupIds,
        }
      }).then(() => {
        this.onRefreshStudentGroupList(searchValue);
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
   *  校验年级
   * @param rule
   * @param value
   * @returns {Promise<void>}
   */
  validatorGradeLevel = async (rule, value) => {
    const {studentGroup: {studentGroupList}} = this.props;
    (studentGroupList || []).forEach(({gradeLevel}) => {
      if (value === gradeLevel) {
        throw new Error(`${enums.GradeLevel[value]} 已经存在`);
      }
    })
  };

  /**
   *   确认事件
   * @param values
   * @param openType
   */
  onStudentGroupModalOk = (values, openType) => {
    const {dispatch} = this.props;
    const {searchValue} = this.state;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "studentGroup/saveStudentGroupData",
        payload: {
          values
        }
      }).then(() => {
        this.onRefreshStudentGroupList(searchValue);
      });
    }
    this.closeStudentGroupModal();
  };


  /**
   *  关闭弹窗
   */
  closeStudentGroupModal = () => {
    this.setState({
      studentGroupModalVisible: false,
    });
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows} = this.state;
    const buttonList = [];
    const groupTypeToAddText = {
      grade: "新增年级",
      class: "新增班级",
      group: "新增分组",
    };
    const pStudentGroupModel = (selectedRows || []).length === 1 ? selectedRows[0] : {};
    const {id, type} = (pStudentGroupModel || {});
    const groupType = enums.StudentGroupTypeFunc(id, type);
    const addText = (groupTypeToAddText[groupType] || "新增年级");
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: addText,
      operatorKey: 'student-group-add',
      onClick: () => this.openStudentGroupModal({}, 'add', (selectedRows || []).length === 1 ? selectedRows[0] : {}),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'student-group-edit',
        onClick: () => this.openStudentGroupModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'student-group-delete',
        text: '删除',
        onClick: () => this.deleteStudentGroups(selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    // model里面的数据
    const {
      loading,
      studentGroup: {
        studentGroupList,
        groupToStudentList,
        total,
        current,
        pageSize
      }
    } = this.props;

    // 搜索框参数
    const searchFormProps = {
      onSearch: (values) => this.onRefreshStudentGroupList(values),
      onFormReset: (values) => this.onRefreshStudentGroupList(values),
    };

    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格组件参数
    const studentGroupTableProps = {
      dataSource: [{id: "1", groupName: "测试"}],
      loading: loading.effects['studentGroup/getStudentGroupList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onRowCheck: (record) => this.openGroupToStudentDrawer(record),
    };

    // 弹窗参数
    const studentGroupModalProps = {
      visible: this.state.studentGroupModalVisible,
      openType: this.state.openType,
      dataSource: this.state.studentGroupModel,
      pDataSource: this.state.pStudentGroupModel,
      validatorGradeLevel: this.validatorGradeLevel,
      onOk: this.onStudentGroupModalOk,
      onCancel: this.closeStudentGroupModal
    };

    const groupToStudentDrawerProps = {
      visible: this.state.groupToStudentDrawerVisible,
      groupToStudentList,
      total,
      current,
      pageSize,
      loading: loading.effects['studentGroup/getGroupToStudentList'],
      onStudentTablePageChange: (current, pageSize) => this.onRefreshGroupToStudentList(this.state.studentGroupModel.id, current, pageSize),
      onClose: () => this.setState({groupToStudentDrawerVisible: false})
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
            <StudentGroupTable {...studentGroupTableProps} />
          </div>
        </Card>
        <StudentGroupModal {...studentGroupModalProps}/>
        <GroupToStudentDrawer {...groupToStudentDrawerProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default StudentGroup;
