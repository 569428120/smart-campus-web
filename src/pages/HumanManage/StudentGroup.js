import React, {PureComponent} from 'react';
import {Card, message, Tabs, Row, Col, Descriptions, Spin, Select} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import SearchForm from './components/student/SearchForm';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import StudentGroupModal from "./components/studentGroup/StudentGroupModal";
import enums from "@/pages/HumanManage/config/enums";
import UserGroupTree from "./components/UserGroupTree";
import StudentTable from "./components/student/StudentTable";
import {Modal} from "antd/lib/index";
import UserGroupModal from "./components/UserGroupModal";
import StudentModal from "./components/student/StudentModal";
import {validatorStudentModel} from "./services/studentService";
import StudentContactModal from "./components/student/StudentContactModal";

const groupToStudentPageSize = 5;

const {TabPane} = Tabs;

/**
 *  区域管理页面
 */
@connect(({loading, student, studentGroup, staffGroup}) => ({
  loading,
  student,
  studentGroup,
  staffGroup,
}))
class StudentGroup extends PureComponent {
  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    studentGroupModalVisible: false,
    studentModalVisible: false,
    studentGroupModel: {},
    pStudentGroupModel: {},
    openType: "",
    groupToStudentDrawerVisible: false,
    treeSelectedRowKeys: ["root"],
    groupCopyModalVisible: false,
    targetSelectedRowKeys: [],
    studentModel: {},
    studentContactModalVisible: false,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    this.onRefreshStudentGroupList({});
    this.onRefreshStudentPage({}, 1, 15);
    dispatch({
      type: "studentGroup/setState",
      payload: {
        studentGroupModel: {}
      }
    });
    dispatch({
      type: "staffGroup/getAccessStrategyList",
      payload: {}
    })
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
   *  删除
   */
  deleteStudent = (studentIds) => {
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

  openCopyModel = (record, openType) => {
    const {type} = (record || {});
    if ("grade" === type) {
      message.info("年级目录不支持移动和复制操作");
      return;
    }
    this.setState({
      studentGroupModel: record,
      openType,
      groupCopyModalVisible: true,
      targetSelectedRowKeys: [],
    })
  };

  closeCopyOrMoveModal = () => {
    this.setState({
      studentGroupModel: {},
      openType: "",
      groupCopyModalVisible: false,
      targetSelectedRowKeys: [],
    })
  };

  onCopyOrMoveModalOk = () => {
    const {dispatch, student: {pageSize}} = this.props;
    const {targetSelectedRowKeys, studentGroupModel, selectedRowKeys, openType, searchValue} = this.state;
    const {id: groupId} = (studentGroupModel || {});
    if ((targetSelectedRowKeys || []).length <= 0) {
      message.info("请选择目标分组");
      return
    }
    switch (openType) {
      case 'copyGroup':
        dispatch({
          type: "studentGroup/copyGroupToGroup",
          payload: {
            sourceIds: [groupId],
            targetIds: targetSelectedRowKeys,
          }
        }).then(() => {
          this.onRefreshStudentGroupList({});
          this.closeCopyOrMoveModal();
        });

        break;
      case 'moveGroup':
        const getChildrenIds = (node) => {
          const children = [node];
          const ids = [];
          do {
            const arr = [];
            children.forEach(item => {
              if ((item.children || []).length > 0) {
                arr.push(item.children);
              }
              ids.push(item.id);
            });
            children.splice(0);
            children.push(...arr)
          } while (children.length > 0);
          return ids;
        };
        // 校验不能为子节点
        const childrenIds = getChildrenIds((studentGroupModel || {}));
        if ((targetSelectedRowKeys || []).find(id => childrenIds.includes(id))) {
          message.info("不能移动到本节点以及子节点");
          return;
        }
        dispatch({
          type: "studentGroup/moveGroupToGroup",
          payload: {
            sourceIds: [groupId],
            targetId: targetSelectedRowKeys[0],
          }
        }).then(() => {
          this.onRefreshStudentGroupList({});
          this.closeCopyOrMoveModal();
        });
        break;
      case 'moveUser':
        dispatch({
          type: "studentGroup/moveUserToGroup",
          payload: {
            userIds: selectedRowKeys,
            targetId: targetSelectedRowKeys[0],
          }
        }).then(() => {
          this.onRefreshStudentPage(searchValue, 1, pageSize);
          this.closeCopyOrMoveModal();
          this.setState({
            selectedRowKeys: [],
            selectedRows: [],
          });
        });
        break;
      default:
        message.info(`操作错误openType ${openType}`);
    }
  };


  onRefreshGroupInfo = (groupId) => {
    const {dispatch} = this.props;
    dispatch({
      type: "studentGroup/getStudentGroupById",
      payload: {
        groupId
      }
    })
  };

  onRefreshStudentPage = (searchValue, current, pageSize) => {
    const {treeSelectedRowKeys} = this.state;
    const {dispatch} = this.props;
    const {groupId} = (searchValue || {});
    if (!groupId) {
      searchValue.groupId = (treeSelectedRowKeys || []).length > 0 ? treeSelectedRowKeys[0] : "root";
    }
    dispatch({
      type: "student/getStudentList",
      payload: {
        searchValue,
        current,
        pageSize
      }
    });
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  onSelectGroup = (treeSelectedRowKeys) => {
    const {dispatch, student: {pageSize}} = this.props;
    const searchValue = {
      groupId: treeSelectedRowKeys[0],
    };
    this.userSearchForm.resetFields();
    this.onRefreshStudentPage(searchValue, 1, pageSize);
    this.onRefreshGroupInfo(treeSelectedRowKeys[0]);
    this.setState({
      treeSelectedRowKeys
    })
  };

  onDeleteStudentGroup = (node) => {
    const {dispatch} = this.props;
    const deleteFunc = () => {
      dispatch({
        type: "studentGroup/deleteStudentGroupByIds",
        payload: {
          groupIds: [node.id],
        }
      }).then(() => {
        this.onRefreshStudentGroupList({});
      });
    };
    Modal.confirm({
      title: '删除确认',
      content: '是否删除选择的数据以及关联的用户数据',
      onOk: deleteFunc,
      okText: '确认',
      cancelText: '取消',
    });
  };

  openStudentModal = (studentModel, openType) => {
    const {studentGroup: {studentGroupModel}} = this.props;
    const {type} = (studentGroupModel || {});
    if (openType === "add" && !["class", "group"].includes(type)) {
      message.info("只支持在班级和分组下新增学生");
      return;
    }
    this.setState({
      studentModel,
      openType,
      studentModalVisible: true
    })
  };

  closeStudentModal = () => {
    this.setState({
      studentModel: {},
      openType: "",
      studentModalVisible: false
    })
  };

  onStudentModalOk = (values, openType) => {
    const {dispatch, student: {pageSize}, studentGroup: {studentGroupModel}} = this.props;
    const {searchValue} = this.state;
    const {id: groupId} = (studentGroupModel || {});
    if (["add", "edit"].includes(openType)) {
      dispatch({
        type: "student/saveStudentData",
        payload: {
          values: {
            ...values,
            groupId
          }
        }
      }).then(() => {
        this.onRefreshStudentPage(searchValue, 1, pageSize);
        this.closeStudentModal();
      })
    } else {
      this.closeStudentModal()
    }
  };


  getSelectStrategy = (accessStrategyId) => {
    const {staffGroup: {accessStrategyList}} = this.props;
    if (!accessStrategyId) {
      return null;
    }
    return (accessStrategyList || []).find(item => accessStrategyId === item.id);
  };

  getUserGroupModalCheckboxProps = (record) => {
    const {studentGroupModel, openType} = this.state;
    const {type} = (studentGroupModel || {});
    const getDisabled = () => {
      if (openType === "moveUser" && ["class", "group"].includes(record.type)) {
        return false;
      }
      if (type === "grade") {
        return true;
      }
      if (type === "class" && record.type === "grade") {
        return false;
      }
      if (type === "group" && ["class", "group"].includes(record.type)) {
        return false;
      }
      return true;
    };

    return {
      disabled: getDisabled()
    }
  };

  openStudentContactModal = (studentModel, openType) => {
    const {studentContactList} = (studentModel || {});
    this.studentContactModal.setState({
      contactList: (studentContactList || []),
      selectedRowKeys: [],
    });
    this.setState({
      studentModel,
      openType,
      studentContactModalVisible: true
    })
  };

  closeStudentContactModal = () => {
    this.setState({
      studentModel: {},
      openType: "",
      studentContactModalVisible: false
    })
  };

  onStudentContactModalOk = (contactList, studentId) => {
    const {dispatch, student: {current, pageSize}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "student/saveStudentContact",
      payload: {
        contactList,
        studentId
      }
    }).then(() => {
      this.onRefreshStudentPage(searchValue, current, pageSize);
      this.closeStudentContactModal();
    })
  };

  /**
   *  策略选择
   * @param accessStrategyId
   */
  onStrategySelectChange = (accessStrategyId) => {
    const {dispatch, studentGroup: {studentGroupModel}} = this.props;
    const {id} = (studentGroupModel || {});
    dispatch({
      type: "studentGroup/saveStudentGroupData",
      payload: {
        values: {
          ...studentGroupModel,
          accessStrategyId
        }
      }
    }).then(() => {
      this.onRefreshGroupInfo(id)
    })
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows} = this.state;
    const buttonList = [
      {
        icon: 'plus',
        type: 'primary',
        text: "新增",
        operatorKey: 'student-add',
        onClick: () => this.openStudentModal({}, 'add'),
      },
      {
        icon: '',
        type: '',
        text: '导入',
        operatorKey: 'staff-user-import',
        onClick: () => this.openUploadModal(),
      },
    ];
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
    // 删除
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        operatorKey: 'student-delete',
        text: '删除',
        onClick: () => this.deleteStudent(selectedRowKeys),
      });
      buttonList.push({
        icon: '',
        type: '',
        operatorKey: 'staff-user-move',
        text: '移动',
        onClick: () => this.openCopyModel({}, "moveUser"),
      });
    }
    return {buttonList};
  };

  renderStrategySettingContent() {
    const {studentGroup: {studentGroupModel}, staffGroup: {accessStrategyList}, loading} = this.props;
    const {treeSelectedRowKeys} = this.state;
    const {groupName, groupCode, authorityId, accessStrategyId, description} = (studentGroupModel || {});
    // 门禁策略
    const strategyOptions = (accessStrategyList || []).map(item => <Select.Option key={item.id} value={item.id}>
      {item.strategyName}
    </Select.Option>);

    // 如果authorityId不在accessStrategyList中则设置为空
    const selectStrategy = this.getSelectStrategy(accessStrategyId);
    const strategyPlaceholder = accessStrategyId && !selectStrategy ? "策略未启用或被删除，请策略分配" : "请选择策略";

    return <Descriptions layout="vertical" column={2} bordered>
      <Descriptions.Item label="分组名称">{(groupName || "无")}</Descriptions.Item>
      <Descriptions.Item label="分组编号">{(groupCode || "无")}</Descriptions.Item>
      <Descriptions.Item label="描述" span={2}>{description || "无"}</Descriptions.Item>

      <Descriptions.Item label="门禁策略" span={2}>
        <Select placeholder={strategyPlaceholder}
                disabled={(treeSelectedRowKeys || []).includes("root")}
                onChange={this.onStrategySelectChange}
                style={{width: 250}}
                value={accessStrategyId && selectStrategy ? accessStrategyId : undefined}>
          {strategyOptions}
        </Select>
      </Descriptions.Item>
    </Descriptions>
  };

  render() {
    // model里面的数据
    const {
      loading,
      studentGroup: {
        studentGroupList,
      },
      student: {
        studentList,
        total,
        current,
        pageSize
      }
    } = this.props;

    // 搜索框参数
    const searchFormProps = {
      onSearch: (values) => this.onRefreshStudentPage(values, 1, pageSize),
      onFormReset: (values) => this.onRefreshStudentPage(values, 1, pageSize),
    };

    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

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

    const studentModalProps = {
      visible: this.state.studentModalVisible,
      openType: this.state.openType,
      dataSource: this.state.studentModel,
      okLoading: loading.effects['student/saveStudentData'],
      validatorStudentModel: validatorStudentModel,
      onOk: this.onStudentModalOk,
      onCancel: this.closeStudentModal,
    };

    const userGroupModalProps = {
      visible: this.state.groupCopyModalVisible,
      openType: this.state.openType,
      userGroupList: studentGroupList,
      selectedRowKeys: this.state.targetSelectedRowKeys,
      onSelectChange: (targetSelectedRowKeys) => this.setState({targetSelectedRowKeys}),
      okLoading: loading.effects['studentGroup/copyGroupToGroup'] || loading.effects['studentGroup/moveGroupToGroup'] || loading.effects['studentGroup/moveUserToGroup'],
      getCheckboxProps: this.getUserGroupModalCheckboxProps,
      onOk: this.onCopyOrMoveModalOk,
      onCancel: this.closeCopyOrMoveModal,
    };

    const userGroupTreeProps = {
      title: "班级分组",
      height: window.innerHeight - 220,
      loading: loading.effects['studentGroup/getStudentGroupList'],
      userGroupList: studentGroupList,
      selectedRowKeys: this.state.treeSelectedRowKeys,
      onSelectChange: this.onSelectGroup,
      onAddNode: (pRecord) => this.openStudentGroupModal({}, 'add', pRecord),
      onEditNode: (record) => this.openStudentGroupModal(record, 'edit', {}),
      onDeleteNode: this.onDeleteStudentGroup,
      onCopyNode: (node) => this.openCopyModel(node, 'copyGroup'),
      onMoveNode: (node) => this.openCopyModel(node, 'moveGroup'),
    };

    const studentTableProps = {
      height: window.innerHeight - 400,
      dataSource: studentList,
      total,
      current,
      pageSize,
      loading: loading.effects['student/getStudentList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onTablePageChange: (current, pageSize) => this.onRefreshStudentPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshStudentPage(this.state.searchValue, current, pageSize),
      onOperator: (record) => this.openStudentContactModal(record, "edit"),
    };

    const studentContactModalProps = {
      visible: this.state.studentContactModalVisible,
      studentModel: this.state.studentModel,
      okLoading: loading.effects['student/saveStudentContact'],
      onOk: this.onStudentContactModalOk,
      onCancel: this.closeStudentContactModal,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={6}>
              <UserGroupTree {...userGroupTreeProps} />
            </Col>
            <Col span={18}>
              <Spin spinning={!!loading.effects['studentGroup/getStudentGroupById']}>
                <Tabs defaultActiveKey="1" style={{padding: '0 10px'}}>
                  <TabPane tab="用户列表" key="1">
                    <div className={styles.tableList}>
                      <div className={styles.tableListForm}>
                        <SearchForm {...searchFormProps} onRef={r => this.userSearchForm = r}/>
                      </div>
                      <div className={styles.tableListOperator}>
                        <OperatorButton {...operatorButtonProps} />
                      </div>
                      <StudentTable {...studentTableProps} />
                    </div>
                  </TabPane>
                  <TabPane tab="策略配置" key="2">
                    {this.renderStrategySettingContent()}
                  </TabPane>
                </Tabs>
              </Spin>
            </Col>
          </Row>
        </Card>
        <StudentGroupModal {...studentGroupModalProps}/>
        <StudentModal {...studentModalProps}/>
        <UserGroupModal {...userGroupModalProps} />
        <StudentContactModal {...studentContactModalProps} onRef={r => this.studentContactModal = r}/>
      </PageHeaderWrapper>
    );
  }
}

export default StudentGroup;
