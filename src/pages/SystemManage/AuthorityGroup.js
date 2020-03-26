import React, {PureComponent} from 'react';
import {connect} from "dva/index";
import {Card, message} from 'antd';
import appConfig from "@/config/appConfig";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SearchForm from "@/pages/SystemManage/components/authorityGroup/SearchForm";
import AuthorityGroupTable from "@/pages/SystemManage/components/authorityGroup/AuthorityGroupTable";
import AuthorityGroupModal from "@/pages/SystemManage/components/authorityGroup/AuthorityGroupModal";
import MenuDistributeModal from "@/pages/SystemManage/components/authorityGroup/MenuDistributeModal";
import {treePidAndChildRecords} from '@/utils/utils';
import {Modal} from "antd/lib/index";

@connect(({loading, authorityGroup}) => ({
  loading,
  authorityGroup,
}))
class AuthorityGroup extends PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    authorityGroupModalVisible: false,// 新增修改窗口
    openType: '',// 操作类型
    authorityGroupModel: {}, // 弹窗数据
    menuDistributeModalVisible: false,// 菜单分配
    menuDistributeOpenType: "",// 操作类型
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshAuthorityGroupPage({}, 1, appConfig.PAGE_SIZE);
  }


  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshAuthorityGroupPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "authorityGroup/getAuthorityGroupList",
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
   *  删除
   */
  onDeleteAuthorityGroup = (groupIds) => {
    const {dispatch, authorityGroup: {pageSize}} = this.props;
    const {searchValue} = this.state;
    const deleteFunc = () => {
      dispatch({
        type: "authorityGroup/deleteAuthorityGroupByIds",
        payload: {
          groupIds
        }
      }).then(() => {
        // 刷新页面并把选择质控
        this.onRefreshAuthorityGroupPage(searchValue, 1, pageSize);
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
   *   打开新增编辑弹窗
   * @param authorityGroupModel
   * @param openType
   */
  openAuthorityGroupModal = (authorityGroupModel, openType) => {
    this.setState({
      authorityGroupModalVisible: true,
      authorityGroupModel,
      openType
    })
  };

  /**
   *  打开菜单分配窗口
   * @param record
   */
  openMenuDistributeModal = (record) => {
    const {dispatch} = this.props;
    const {id: groupId} = record;
    dispatch({
      type: "authorityGroup/getMenuListByGroupId",
      payload: {
        groupId
      }
    });
    this.setState({
      menuDistributeModalVisible: true,
      authorityGroupModel: record,
      menuDistributeOpenType: "view",
    })
  };

  /**
   *  编辑
   */
  onPcMenuDistributeEdit = (menuDistributeOpenType) => {
    // 查询全部的菜单列表
    const {dispatch} = this.props;
    const {authorityGroupModel: {id: groupId}} = this.state;
    if (menuDistributeOpenType === 'edit') {
      dispatch({
        type: "authorityGroup/getAllMenuAndGroupToMenuIdList",
        payload: {
          groupId
        }
      });
    } else {
      dispatch({
        type: "authorityGroup/getMenuListByGroupId",
        payload: {
          groupId
        }
      });
    }
    this.setState({
      menuDistributeOpenType,
    })
  };


  /**
   *   菜单选择
   */
  onPcMenuDistributeSelect = (record, selected) => {
    const {authorityGroup: {groupToMenuIdList, menuIdToModelMap, pidToModelsMap}, dispatch} = this.props;
    const newGroupToMenuIdList = [...(groupToMenuIdList || [])];
    treePidAndChildRecords(menuIdToModelMap, pidToModelsMap, newGroupToMenuIdList, record, selected);
    dispatch({
      type: "authorityGroup/setState",
      payload: {
        groupToMenuIdList: newGroupToMenuIdList
      }
    });
  };

  /**
   *   保存数据
   */
  onSaveAuthorityGroup = (values, openType) => {
    const {dispatch, authorityGroup: {current, pageSize}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "authorityGroup/saveAuthorityGroup",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshAuthorityGroupPage(searchValue, openType === 'edit' ? current : 1, pageSize);
      this.closeAuthorityGroupModal();
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
      })
    });
  };

  /**
   *   菜单分配确认
   */
  onMenuDistributeOk = (openType) => {
    const {dispatch, authorityGroup: {groupToMenuIdList}} = this.props;
    const {authorityGroupModel: {id: groupId}} = this.state;
    if (openType === 'edit') {
      dispatch({
        type: "authorityGroup/saveGroupIdToMenuList",
        payload: {
          groupId,
          menuIds: groupToMenuIdList,
        }
      }).then(() => {
        dispatch({
          type: "authorityGroup/getMenuListByGroupId",
          payload: {
            groupId
          }
        });
        message.info("保存成功");
        this.setState({menuDistributeOpenType: 'view'})
      });
    }

  };

  /**
   *  关闭弹窗
   */
  closeAuthorityGroupModal = () => {
    this.setState({
      authorityGroupModalVisible: false
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
      text: '新建',
      operatorKey: 'authority-group-add',
      onClick: () => this.openAuthorityGroupModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'authority-group-update',
        onClick: () => this.openAuthorityGroupModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'authority-group-delete',
        text: '删除',
        onClick: () => this.onDeleteAuthorityGroup(selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      loading,
      authorityGroup: {
        authorityGroupList,
        total,
        current,
        pageSize,
        menuList,
        groupToMenuIdList,
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.onRefreshAuthorityGroupPage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshAuthorityGroupPage(searchValue, 1, pageSize),
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格参数
    const authorityGroupTableProps = {
      dataSource: authorityGroupList,
      loading: loading.effects['authorityGroup/getAuthorityGroupList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onOperator: this.openMenuDistributeModal
    };

    // 弹窗参数
    const authorityGroupModalProps = {
      visible: this.state.authorityGroupModalVisible,
      openType: this.state.openType,
      dataSource: this.state.authorityGroupModel,
      onOk: this.onSaveAuthorityGroup,
      onCancel: this.closeAuthorityGroupModal
    };

    // 分配菜单
    const menuDistributeModal = {
      visible: this.state.menuDistributeModalVisible,
      loading: loading.effects['authorityGroup/getMenuListByGroupId'] || loading.effects['authorityGroup/getAllMenuAndGroupToMenuIdList'],
      okLoading: loading.effects['authorityGroup/saveGroupIdToMenuList'],
      selectedRowKeys: groupToMenuIdList,
      openType: this.state.menuDistributeOpenType,
      menuList,
      onPcMenuEdit: this.onPcMenuDistributeEdit,
      onMenuSelect: this.onPcMenuDistributeSelect,
      onOk: this.onMenuDistributeOk,
      onCancel: () => this.setState({menuDistributeModalVisible: false})
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
            <AuthorityGroupTable {...authorityGroupTableProps} />
          </div>
        </Card>
        <AuthorityGroupModal {...authorityGroupModalProps}/>
        <MenuDistributeModal {...menuDistributeModal}/>
      </PageHeaderWrapper>
    );
  }
}

export default AuthorityGroup;
