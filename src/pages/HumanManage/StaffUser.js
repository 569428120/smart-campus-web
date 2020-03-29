import React, {PureComponent} from 'react';
import {Card, Modal} from 'antd';
import {connect} from 'dva';
import appConfig from "@/config/appConfig";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import SearchForm from '@/pages/HumanManage/components/staffUser/SearchForm';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import StaffUserTable from '@/pages/HumanManage/components/staffUser/StaffUserTable';
import StaffUserModal from "@/pages/HumanManage/components/staffUser/StaffUserModal";
import LoginSettingModal from "@/pages/HumanManage/components/staffUser/LoginSettingModal";


/**
 *  区域管理页面
 */
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
  };

  componentDidMount() {
    this.onRefreshStaffUserPage({}, 1, appConfig.PAGE_SIZE);
  }

  /**
   *   刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshStaffUserPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "staffUser/getStaffUserList",
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
   *  新增
   */
  openStaffUserModal = (record, openType) => {
    this.setState({
      staffUserModalVisible: true,
      openType,
      staffUserModel: record,
    });
  };

  /**
   *   设置登录弹窗
   * @param record
   * @param openType
   */
  openLoginSettingModal = (record, openType) => {
    this.setState({
      loginSettingModalVisible: true,
      openType,
      staffUserModel: record,
    });
  };

  /**
   *   用户详情抽屉
   * @param record
   */
  openStaffUserDetailDrawer = (record) => {
    this.setState({
      staffUserModel: record,
      staffUserDetailDrawerVisible: true
    })
  };

  /**
   *  删除
   */
  deleteStaffUsers = (staffUserIds) => {
    const {dispatch, staffUser: {pageSize}} = this.props;
    const {searchValue} = this.state;
    const deleteFunc = () => {
      dispatch({
        type: "staffUser/deleteStaffUserByIds",
        payload: {
          staffUserIds,
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
    const {searchValue} = this.state;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "staffUser/saveStaffUserData",
        payload: {
          values
        }
      }).then(() => {
        this.onRefreshStaffUserPage(searchValue, openType === 'edit' ? current : 1, pageSize);
        // 清除选择
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        })
      });
    }
    this.closeStaffUserModal();
  };


  /**
   * 设置登录账户
   * @param values
   * @param openType
   */
  onLoginSettingModalOk = (values, openType) => {
    const {dispatch, staffUser: {current, pageSize}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "staffUser/saveLoginUser",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshStaffUserPage(searchValue, openType === 'edit' ? current : 1, pageSize);
      // 清除选择
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        loginSettingModalVisible: false
      })
    });
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
      operatorKey: 'staff-user-add',
      onClick: () => this.openStaffUserModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '登录设置',
        operatorKey: 'staff-user-login',
        onClick: () => this.openLoginSettingModal(selectedRows[0], 'edit'),
      });
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'staff-user-edit',
        onClick: () => this.openStaffUserModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'staff-user-delete',
        text: '删除',
        onClick: () => this.deleteStaffUsers(selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
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
      dataSource: [{id: "a", name: "sdsds"}],
      total,
      current,
      pageSize,
      loading: loading.effects['staffUser/getStaffUserList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onTablePageChange: (current, pageSize) => this.onRefreshStaffUserPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshStaffUserPage(this.state.searchValue, current, pageSize),
      // onRowCheck: (record) => this.openStaffUserDetailDrawer(record),
      //onShowView: (record) => this.openStaffUserModal(record, 'view'),
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

    // 登录设置弹窗
    const loginSettingModalProps = {
      visible: this.state.loginSettingModalVisible,
      openType: this.state.openType,
      dataSource: this.state.staffUserModel,
      okLoading: loading.effects['staffUser/saveLoginUser'],
      onOk: this.onLoginSettingModalOk,
      onCancel: () => this.setState({loginSettingModalVisible: false})
    };

    // 用户详情
    const staffUserDetailDrawerProps = {
      visible: this.state.staffUserDetailDrawerVisible,
      onClose: () => this.setState({staffUserDetailDrawerVisible: false})
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
            <StaffUserTable {...staffUserTableProps} />
          </div>
        </Card>
        <StaffUserModal {...staffUserModalProps}/>
        <LoginSettingModal {...loginSettingModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default StaffUser;
