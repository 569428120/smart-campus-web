import React, {PureComponent} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import SearchForm from '@/pages/HumanManage/components/staffGroup/SearchForm';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import StaffGroupTable from '@/pages/HumanManage/components/staffGroup/StaffGroupTable';
import StaffGroupModal from "@/pages/HumanManage/components/staffGroup/StaffGroupModal";

/**
 *  区域管理页面
 */
@connect(({loading, staffGroup}) => ({
  loading,
  staffGroup,
}))
class StaffGroup extends PureComponent {
  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    staffGroupModalVisible: false,
    staffGroupModel: {},
    openType: "",
  };

  componentDidMount() {
    this.onRefreshStaffGroupList({});
  }

  /**
   *   刷新数据
   * @param searchValue
   */
  onRefreshStaffGroupList = (searchValue) => {
    const {dispatch} = this.props;
    dispatch({
      type: "staffGroup/getStaffGroupList",
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
  openStaffGroupModal = (record, openType, pRecord) => {
    this.setState({
      staffGroupModalVisible: true,
      openType,
      staffGroupModel: record,
      pStaffGroupModel: pRecord
    });
  };

  /**
   *  删除
   */
  deleteStaffGroups = (groupIds) => {
    const {dispatch} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "staffGroup/deleteStaffGroupByIds",
      payload: {
        groupIds,
      }
    }).then(() => {
      this.onRefreshStaffGroupList(searchValue);
    });
  };

  /**
   *   确认事件
   * @param values
   * @param openType
   */
  onStaffGroupModalOk = (values, openType) => {
    const {dispatch} = this.props;
    const {searchValue} = this.state;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "staffGroup/saveStaffGroupData",
        payload: {
          values
        }
      }).then(() => {
        this.onRefreshStaffGroupList(searchValue);
      });
    }
    this.closeStaffGroupModal();
  };


  /**
   *  关闭弹窗
   */
  closeStaffGroupModal = () => {
    this.setState({
      staffGroupModalVisible: false,
    });
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows} = this.state;
    const buttonList = [];
    let addText = '新增分组';
    if ((selectedRowKeys || []).length === 1) {
      addText = '新增子分组';
    }
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: addText,
      operatorKey: 'staff-group-add',
      onClick: () => this.openStaffGroupModal({}, 'add', (selectedRows || []).length === 1 ? selectedRows[0] : {}),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'staff-group-edit',
        onClick: () => this.openStaffGroupModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'staff-group-delete',
        text: '删除',
        onClick: () => this.deleteStaffGroups(selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    // model里面的数据
    const {
      loading,
      staffGroup: {
        staffGroupList
      }
    } = this.props;

    // 搜索框参数
    const searchFormProps = {
      onSearch: (values) => this.onRefreshStaffGroupList(values),
      onFormReset: (values) => this.onRefreshStaffGroupList(values),
    };

    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格组件参数
    const staffGroupTableProps = {
      dataSource: staffGroupList,
      loading: loading.effects['staffGroup/getStaffGroupList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onShowView: (record) => this.openStaffGroupModal(record, 'view'),
    };

    const staffGroupModalProps = {
      visible: this.state.staffGroupModalVisible,
      openType: this.state.openType,
      dataSource: this.state.staffGroupModel,
      pDataSource: this.state.pStaffGroupModel,
      onOk: this.onStaffGroupModalOk,
      onCancel: this.closeStaffGroupModal
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
            <StaffGroupTable {...staffGroupTableProps} />
          </div>
        </Card>
        <StaffGroupModal {...staffGroupModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default StaffGroup;