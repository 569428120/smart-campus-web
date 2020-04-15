import React from 'react';
import {connect} from "dva/index";
import {Card, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/flowRecord/SearchForm";
import FlowRecordTable from "./components/flowRecord/FlowRecordTable";
import FlowRecordModal from "./components/flowRecord/FlowRecordModal";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import enums from "./config/enums";


@connect(({loading, flowRecord}) => ({
  loading,
  flowRecord,
}))
class FlowRecordManage extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    flowRecordModalVisible: false,
    flowRecordModel: {},
    openType: "",
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshFlowRecordPage({}, 1, appConfig.PAGE_SIZE);
  }

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshFlowRecordPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "flowRecord/getFlowRecordList",
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
   *  打开弹窗
   */
  openFlowSelectModal = (flowRecordModel, openType) => {
    this.setState({
      flowRecordModalVisible: true,
      flowRecordModel,
      openType,
    })
  };

  /**
   *   确认
   * @param values
   * @param openType
   */
  onFlowSelectModalOk = (values, openType) => {
    // TODO 跳转到对应流程的填写页面
  };

  /**
   *  用户类型
   */
  onCardModalUserTypeSelect = (userType) => {
    const {dispatch} = this.props;
    // 学生
    if (enums.UserType.student.key === userType) {
      dispatch({
        type: "user/getStudentGroupList",
        payload: {}
      });
      return;
    }
    if (enums.UserType.staff.key === userType) {
      dispatch({
        type: "user/getStaffGroupList",
        payload: {}
      });
      return;
    }
    console.error(`不支持的用户类型${userType}`);
  };

  /**
   *  查询组下面的用户
   * @param userType
   * @param groupId
   */
  onCardModalUserGroupSelect = (userType, groupId) => {
    const {dispatch} = this.props;
    // 学生
    if (enums.UserType.student.key === userType) {
      dispatch({
        type: "user/getStudentList",
        payload: {
          groupId
        }
      });
      return;
    }
    if (enums.UserType.staff.key === userType) {
      dispatch({
        type: "user/getStaffList",
        payload: {
          groupId
        }
      });
      return;
    }
    console.error(`不支持的用户类型${userType}`);
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
      operatorKey: 'card-add',
      onClick: () => this.openCardModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'card-update',
        onClick: () => this.openCardModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'card-delete',
        text: '删除',
        onClick: this.onDeleteCard,
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      loading,
      card: {
        cardList,
        total,
        current,
        pageSize,
      },
      featureUser: {
        userGroupList,
        userList
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.onRefreshCardPage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshCardPage(searchValue, 1, pageSize)
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();
    // 表格参数
    const cardTableProps = {
      dataSource: [{id: ''}],
      selectedRowKeys: this.state.selectedRowKeys,
      loading: loading.effects['card/getCardList'],
      total,
      current,
      pageSize,
      onTableSelectChange: (rowKeys, rows) => this.setState({selectedRowKeys: rowKeys, selectedRows: rows,}),
      onTablePageChange: (current, pageSize) => this.onRefreshCardPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshCardPage(this.state.searchValue, current, pageSize),
    };
    // 详情弹窗
    const cardModalProps = {
      visible: this.state.cardModalVisible,
      openType: this.state.openType,
      dataSource: this.state.cardModel,
      userGroupList,
      userList,
      onUserTypeSelect: this.onCardModalUserTypeSelect,
      onUserGroupSelect: this.onCardModalUserGroupSelect,
      onOk: this.onCardModalOk,
      onCancel: () => this.setState({cardModalVisible: false})
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
            <CardTable {...cardTableProps} />
          </div>
        </Card>
        <CardModal {...cardModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default CardManage;
