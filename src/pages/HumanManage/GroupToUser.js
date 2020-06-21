import React, {PureComponent} from 'react';
import {Card, Modal, Row, Col, Tabs, message, Descriptions, Spin, Select} from 'antd';
import {connect} from 'dva';
import appConfig from "@/config/appConfig";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SearchForm from './components/staffUser/SearchForm';
import StaffUserTable from './components/staffUser/StaffUserTable';
import StaffUserModal from "./components/staffUser/StaffUserModal";
import UserGroupTree from "./components/UserGroupTree";
import StaffGroupModal from "./components/staffGroup/StaffGroupModal";
import UserGroupModal from "./components/UserGroupModal";

const {TabPane} = Tabs;

@connect(({loading, staffUser, staffGroup}) => ({
  loading,
  staffUser,
  staffGroup
}))
class StaffUser extends PureComponent {
  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    staffUserModalVisible: false,
    staffUserModel: {},
    openType: "",
    loginSettingModalVisible: false,
    groupModel: {},
    pGroupModel: {},
    groupModalVisible: false,
    groupCopyModalVisible: false,
    targetSelectedRowKeys: [],
    treeSelectedRowKeys: ["root"],
  };

  componentDidMount() {
    //  刷新用户列表
    this.onRefreshStaffUserPage({}, 1, appConfig.PAGE_SIZE);
    // 刷新分组列表
    this.onRefreshGroupList({});
    // 刷新门禁策略
    this.onRefreshAccessStrategyList();
    // 刷新菜单权限
    this.onRefreshMenuAuthorityGroupList();
  }

  /**
   * 刷新菜单权限
   */
  onRefreshMenuAuthorityGroupList = () => {
    const {dispatch} = this.props;
    dispatch({
      type: "staffGroup/getMenuAuthorityGroupList",
      payload: {}
    });
  };

  /**
   * 刷新门禁策略
   */
  onRefreshAccessStrategyList = () => {
    const {dispatch} = this.props;
    dispatch({
      type: "staffGroup/getAccessStrategyList",
      payload: {}
    });
  };

  /**
   *   刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshStaffUserPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    const {treeSelectedRowKeys} = this.state;
    if (!searchValue.groupId) {
      searchValue.groupId = (treeSelectedRowKeys || [""])[0];
    }
    if (searchValue.groupId === 'root') {
      searchValue.groupId = "";
    }
    dispatch({
      type: "staffUser/getStaffUserList",
      payload: {
        searchValue,
        current,
        pageSize
      }
    });
    this.setState({
      searchValue,
      selectedRowKeys: [],
      selectedRows: [],
    })
  };

  /**
   *  新增
   */
  openStaffUserModal = (record, openType) => {
    const {treeSelectedRowKeys} = this.state;
    if (openType === "add" && ((treeSelectedRowKeys || []).length <= 0 || treeSelectedRowKeys[0] === 'root')) {
      message.info("root分组或者没有选择分组不能新增用户");
      return;
    }
    this.setState({
      staffUserModalVisible: true,
      openType,
      staffUserModel: record,
    });
  };

  /**
   *  删除
   */
  deleteStaffUsers = (userIds) => {
    const {dispatch, staffUser: {pageSize}} = this.props;
    const {searchValue} = this.state;
    const deleteFunc = () => {
      dispatch({
        type: "staffUser/deleteStaffUserByIds",
        payload: {
          userIds,
        }
      }).then(() => {
        this.onRefreshStaffUserPage(searchValue, 1, pageSize);
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
  onStaffUserModalOk = (values, openType) => {
    const {dispatch, staffUser: {current, pageSize}} = this.props;
    const {treeSelectedRowKeys, searchValue} = this.state;
    if (['add', 'edit'].includes(openType)) {
      if (((treeSelectedRowKeys || []).length <= 0 || treeSelectedRowKeys[0] === "root") && openType === "add") {
        message.info("所属分组不能为空或者root");
        return;
      }
      dispatch({
        type: "staffUser/saveStaffUserData",
        payload: {
          values: {
            ...values,
            groupId: treeSelectedRowKeys[0],
          }
        }
      }).then(() => {
        this.onRefreshStaffUserPage(searchValue, openType === 'edit' ? current : 1, pageSize);
        // 清除选择
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        });
        this.closeStaffUserModal();
      });
    } else {
      this.closeStaffUserModal();
    }
  };

  openGroupModel = (record, pRecord, openType) => {
    this.setState({
      groupModel: record,
      pGroupModel: pRecord,
      openType,
      groupModalVisible: true
    })
  };

  closeGroupModal = () => {
    this.setState({
      groupModel: {},
      pGroupModel: {},
      openType: "",
      groupModalVisible: false
    })
  };

  onGroupModalOk = (values, openType) => {
    const {dispatch} = this.props;
    const {groupModel} = this.state;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "staffGroup/saveStaffGroupData",
        payload: {
          values
        }
      }).then((record) => {
        this.onRefreshGroupList({});
        this.closeGroupModal();
      });
    }
  };

  onDeleteUserGroup = (node) => {
    const {dispatch} = this.props;
    const deleteFunc = () => {
      dispatch({
        type: "staffGroup/deleteStaffGroupByIds",
        payload: {
          groupIds: [node.id],
        }
      }).then(() => {
        this.onRefreshGroupList({});
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

  onRefreshGroupList = (searchValue) => {
    const {dispatch} = this.props;
    dispatch({
      type: "staffGroup/getStaffGroupList",
      payload: {
        searchValue,
      }
    });
  };

  openCopyModel = (record, openType) => {
    this.setState({
      groupModel: record,
      openType,
      groupCopyModalVisible: true,
      targetSelectedRowKeys: [],
    })
  };

  closeCopyOrMoveModal = () => {
    this.setState({
      groupModel: {},
      openType: "",
      groupCopyModalVisible: false,
      targetSelectedRowKeys: [],
    })
  };

  onSelectGroup = (treeSelectedRowKeys) => {
    const {dispatch, staffUser: {pageSize}} = this.props;
    const searchValue = {
      groupId: treeSelectedRowKeys[0],
    };
    this.userSearchForm.resetFields();
    this.onRefreshStaffUserPage(searchValue, 1, pageSize);
    this.onRefreshGroupInfo(treeSelectedRowKeys[0]);
    this.setState({
      treeSelectedRowKeys
    })
  };

  onRefreshGroupInfo = (groupId) => {
    const {dispatch} = this.props;
    dispatch({
      type: "staffGroup/getUserGroupById",
      payload: {
        groupId
      }
    })
  };

  onCopyOrMoveModalOk = () => {
    const {dispatch, staffUser: {pageSize}} = this.props;
    const {targetSelectedRowKeys, groupModel, selectedRowKeys, openType, searchValue} = this.state;
    if ((targetSelectedRowKeys || []).length <= 0) {
      message.info("请选择目标分组");
      return
    }
    switch (openType) {
      case 'copyGroup':
        dispatch({
          type: "staffGroup/copyGroupToGroup",
          payload: {
            sourceIds: [groupModel.id],
            targetIds: targetSelectedRowKeys,
          }
        }).then(() => {
          this.onRefreshGroupList({});
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
        const childrenIds = getChildrenIds((groupModel || {}));
        if ((targetSelectedRowKeys || []).find(id => childrenIds.includes(id))) {
          message.info("不能移动到本节点以及子节点");
          return;
        }
        dispatch({
          type: "staffGroup/moveGroupToGroup",
          payload: {
            sourceIds: [groupModel.id],
            targetId: targetSelectedRowKeys[0],
          }
        }).then(() => {
          this.onRefreshGroupList({});
          this.closeCopyOrMoveModal();
        });
        break;
      case 'moveUser':
        dispatch({
          type: "staffGroup/moveUserToGroup",
          payload: {
            userIds: selectedRowKeys,
            targetId: targetSelectedRowKeys[0],
          }
        }).then(() => {
          this.setState({
            selectedRowKeys: [],
            selectedRows: [],
          });
          this.onRefreshStaffUserPage(searchValue, 1, pageSize);
          this.closeCopyOrMoveModal();
        });
        break;
      default:
        message.info(`操作错误openType ${openType}`);
    }
  };

  /**
   *  关闭弹窗
   */
  closeStaffUserModal = () => {
    this.setState({
      staffUserModalVisible: false,
    });
  };

  /**
   *   菜单权限
   * @param authorityId
   */
  onMenuAuthoritySelectChange = (authorityId) => {
    const {dispatch, staffGroup: {staffGroupModel}} = this.props;
    dispatch({
      type: "staffGroup/saveStaffGroupData",
      payload: {
        values: {
          ...staffGroupModel,
          authorityId
        }
      }
    }).then(() => {
      this.onRefreshGroupInfo(staffGroupModel.id)
    })
  };

  /**
   *  策略选择
   * @param accessStrategyId
   */
  onStrategySelectChange = (accessStrategyId) => {
    const {dispatch, staffGroup: {staffGroupModel}} = this.props;
    dispatch({
      type: "staffGroup/saveStaffGroupData",
      payload: {
        values: {
          ...staffGroupModel,
          accessStrategyId
        }
      }
    }).then(() => {
      this.onRefreshGroupInfo(staffGroupModel.id)
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
        text: '新增',
        operatorKey: 'staff-user-add',
        onClick: () => this.openStaffUserModal({}, 'add'),
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
        operatorKey: 'staff-user-edit',
        onClick: () => this.openStaffUserModal(selectedRows[0], 'edit'),
      });
    }
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        operatorKey: 'staff-user-delete',
        onClick: () => this.deleteStaffUsers(selectedRowKeys),
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

  getSelectStrategy = (accessStrategyId) => {
    const {staffGroup: {accessStrategyList}} = this.props;
    if (!accessStrategyId) {
      return null;
    }
    return (accessStrategyList || []).find(item => accessStrategyId === item.id);
  };

  getSelectAuthority = (authorityId) => {
    const {staffGroup: {menuAuthorityGroupList}} = this.props;
    if (!authorityId) {
      return null;
    }
    return (menuAuthorityGroupList || []).find(item => authorityId === item.id);
  };

  /**
   *  策略分配页面
   * @returns {*}
   */
  renderStrategySettingContent() {
    const {staffGroup: {staffGroupModel, accessStrategyList, menuAuthorityGroupList}, loading} = this.props;
    const {treeSelectedRowKeys} = this.state;
    const {groupName, groupCode, authorityId, accessStrategyId, description} = (staffGroupModel || {});
    // 门禁策略
    const strategyOptions = (accessStrategyList || []).map(item => <Select.Option key={item.id} value={item.id}>
      {item.strategyName}
    </Select.Option>);
    // 菜单权限组
    const menuAuthorityOptions = (menuAuthorityGroupList || []).map(item => <Select.Option key={item.id}
                                                                                           value={item.id}>
      {item.authorityName}
    </Select.Option>);

    // 如果authorityId不在accessStrategyList中则设置为空
    const selectStrategy = this.getSelectStrategy(accessStrategyId);
    const strategyPlaceholder = accessStrategyId && !selectStrategy ? "策略未启用或被删除，请策略分配" : "请选择策略";
    const selectAuthority = this.getSelectAuthority(authorityId);
    const authorityPlaceholder = authorityId && !selectAuthority ? "菜单权限组被删除，请重新选择" : "请选择菜单权限组";

    return <Spin spinning={loading.effects['staffGroup/getUserGroupById']}>
      <Descriptions layout="vertical" column={2} bordered>
        <Descriptions.Item label="分组名称">{(groupName || "无")}</Descriptions.Item>
        <Descriptions.Item label="分组编号">{(groupCode || "无")}</Descriptions.Item>
        <Descriptions.Item label="描述" span={2}>{description || "无"}</Descriptions.Item>
        <Descriptions.Item label="系统菜单权限组" span={2}>
          <Select placeholder={authorityPlaceholder}
                  disabled={(treeSelectedRowKeys || []).includes("root")}
                  onChange={this.onMenuAuthoritySelectChange}
                  style={{width: 250}}
                  value={authorityId && selectAuthority ? authorityId : undefined}>
            {menuAuthorityOptions}
          </Select>
        </Descriptions.Item>
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
    </Spin>
  };

  render() {
    // model里面的数据
    const {
      loading,
      staffUser: {
        staffUserList,
        total,
        current,
        pageSize
      },
      staffGroup: {
        staffGroupList
      }
    } = this.props;

    // 搜索框参数
    const searchFormProps = {
      onSearch: (values) => this.onRefreshStaffUserPage(values, 1, pageSize),
      onFormReset: (values) => this.onRefreshStaffUserPage(values, 1, pageSize),
    };

    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格组件参数
    const staffUserTableProps = {
      height: window.innerHeight - 400,
      dataSource: staffUserList,
      total,
      current,
      pageSize,
      loading: loading.effects['staffUser/getStaffUserList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onTablePageChange: (current, pageSize) => this.onRefreshStaffUserPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshStaffUserPage(this.state.searchValue, current, pageSize),
      onOperator: (record) => this.openStaffUserModal(record, "view"),
    };

    // 弹窗参数
    const staffUserModalProps = {
      visible: this.state.staffUserModalVisible,
      openType: this.state.openType,
      dataSource: this.state.staffUserModel,
      okLoading: loading.effects['staffUser/saveStaffUserData'],
      staffGroupList,
      onOk: this.onStaffUserModalOk,
      onCancel: this.closeStaffUserModal
    };

    const groupModalProps = {
      visible: this.state.groupModalVisible,
      openType: this.state.openType,
      dataSource: this.state.groupModel,
      pDataSource: this.state.pGroupModel,
      okLoading: loading.effects['staffGroup/saveStaffGroupData'],
      onOk: this.onGroupModalOk,
      onCancel: this.closeGroupModal
    };

    const userGroupModalProps = {
      visible: this.state.groupCopyModalVisible,
      openType: this.state.openType,
      userGroupList: staffGroupList,
      selectedRowKeys: this.state.targetSelectedRowKeys,
      onSelectChange: (targetSelectedRowKeys) => this.setState({targetSelectedRowKeys}),
      okLoading: loading.effects['staffGroup/copyGroupToGroup'] || loading.effects['staffGroup/moveGroupToGroup'] || loading.effects['staffGroup/moveUserToGroup'],
      onOk: this.onCopyOrMoveModalOk,
      onCancel: this.closeCopyOrMoveModal,
    };

    const userGroupTreeProps = {
      height: window.innerHeight - 220,
      loading: loading.effects['staffGroup/getStaffGroupList'],
      userGroupList: staffGroupList,
      selectedRowKeys: this.state.treeSelectedRowKeys,
      onSelectChange: this.onSelectGroup,
      onAddNode: (pRecord) => this.openGroupModel({}, pRecord, 'add'),
      onEditNode: (record) => this.openGroupModel(record, {}, 'edit'),
      onDeleteNode: this.onDeleteUserGroup,
      onCopyNode: (node) => this.openCopyModel(node, 'copyGroup'),
      onMoveNode: (node) => this.openCopyModel(node, 'moveGroup'),
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={6}>
              <UserGroupTree {...userGroupTreeProps} />
            </Col>
            <Col span={18}>
              <Tabs defaultActiveKey="1" style={{padding: '0 10px'}}>
                <TabPane tab="用户列表" key="1">
                  <div className={styles.tableList}>
                    <div className={styles.tableListForm}>
                      <SearchForm {...searchFormProps} onRef={r => this.userSearchForm = r}/>
                    </div>
                    <div className={styles.tableListOperator}>
                      <OperatorButton {...operatorButtonProps} />
                    </div>
                    <StaffUserTable {...staffUserTableProps} />
                  </div>
                </TabPane>
                <TabPane tab="策略配置" key="2">
                  {this.renderStrategySettingContent()}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
        <StaffGroupModal {...groupModalProps} />
        <UserGroupModal {...userGroupModalProps} />
        <StaffUserModal {...staffUserModalProps} />
      </PageHeaderWrapper>
    );
  }
}

export default StaffUser;
