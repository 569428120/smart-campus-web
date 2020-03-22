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


/**
 *  将树结构的数据转换为map
 * @param treeData
 * @param map
 * @param pid
 */
const treeDataToMap = (treeData, map, pid = 'root') => {
  if ((treeData || []).length <= 0) {
    return
  }
  map.set(pid, treeData);
  treeData.forEach(({children, id}) => {
    treeDataToMap(children, map, id);
  });
};

/**
 *   树结构数据级联选择和取消选择的处理方法
 *    一个元素选择，则父节点和子节点都要选择
 *    一个元素取消，子节点都要取消，父节点在所有子节点取消后也取消
 * @param treeMap
 * @param selectedRowKeys
 * @param record
 * @param selected
 */
const getTreePidAndChildRecords = (idToTreeMap, pidToTreesMap, selectedRowKeys, record, selected) => {
  // 递归退出条件
  if (!record) {
    return [];
  }
  const {id, pid} = record;
  const rowKeys = [];
  const records = [];
  // 一个元素选择，则父节点和子节点都要选择
  if (selected === true) {
    // 父节点都选择
    const pRecord = idToTreeMap.get(pid);
    if (pRecord && !selectedRowKeys.includes(pid)) {
      rowKeys.push(pRecord.id);
      records.push(pRecord);
    }
    // 子节点都选择
    const children = pidToTreesMap.get(id);
    if ((children || []).length > 0) {
      const tmpChildren = children.filter(item => !selectedRowKeys.includes(item.id));
      rowKeys.push(...tmpChildren.map(item => item.id));
      records.push(...tmpChildren);
    }
  } else {


  }
};

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
    menuSelectedRowKeys: [],// 菜单选择
    allMenuModalVisible: false,// 所有的菜单弹窗
    allMenuSelectedRowKeys: [],// 所有的菜单选择
    deleteGroupToMenuIds: [], // 删除的菜单
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
      menuDistributeModalVisible: true
    })
  };

  /**
   *  打开所有菜单弹窗
   */
  openAllMenuModal = () => {
    const {dispatch} = this.props;
    dispatch({
      type: "authorityGroup/getAllMenuList",
      payload: {}
    });
    this.setState({
      allMenuModalVisible: true
    })
  };

  /**
   *  删除操作
   */
  onPcMenuDistributeDelete = () => {
    const {menuSelectedRowKeys} = this.state;
    if ((menuSelectedRowKeys || []).length <= 0) {
      message.info("请选择需要删除的数据");
      return;
    }
    const {dispatch, authorityGroup: {groupToMenuList}} = this.props;
    const newGroupToMenuList = (groupToMenuList || []).filter(item => !menuSelectedRowKeys.includes(item.id));
    dispatch({
      type: "authorityGroup/setState",
      payload: {
        groupToMenuList: newGroupToMenuList,
      }
    });
    this.setState({
      menuSelectedRowKeys: [],
      deleteGroupToMenuIds: menuSelectedRowKeys,
    })
  };

  /**
   *   菜单选择
   */
  onPcMenuDistributeSelect = (record, selected) => {
    const {authorityGroup: groupToMenuList} = this.props;
    const {menuSelectedRowKeys} = this.state;
    const records = getTreePidAndChildRecords(groupToMenuList, menuSelectedRowKeys, record, selected);
    this.setState({
      menuSelectedRowKeys: records.map(item => item.id),
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
      this.onRefreshAuthorityGroupPage(searchValue, openType === 'edit' ? current : 1, pageSize)
      this.closeAuthorityGroupModal();
    });
  };

  /**
   *   菜单分配确认
   */
  onMenuDistributeOk = () => {

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
        onClick: this.onDeleteAuthorityGroup,
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
        groupToMenuList
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.this.onRefreshAuthorityGroupPage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshAuthorityGroupPage(searchValue, 1, pageSize),
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格参数
    const authorityGroupTableProps = {
      dataSource: [{id: 1, name: ""},],
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
      loading: loading.effects['authorityGroup/getMenuListByGroupId'],
      selectedRowKeys: this.state.menuSelectedRowKeys,
      groupToMenuList,
      onPcMenuAdd: this.openAllMenuModal,
      onPcMenuDelete: this.onPcMenuDistributeDelete,
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
