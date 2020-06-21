import React from 'react';
import {connect} from "dva/index";
import {Card, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/card/SearchForm";
import CardTable from "./components/card/CardTable";
import CardModal from "./components/card/CardModal";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import enums from "./config/enums";


@connect(({loading, card}) => ({
  loading,
  card,
}))
class CardManage extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    cardModalVisible: false,
    cardModel: {},
    openType: "",
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshCardPage({}, 1, appConfig.PAGE_SIZE);
  }

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshCardPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "card/getCardList",
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
  openCardModal = (cardModel, openType) => {
    const {dispatch} = this.props;
    // 新增默认查询学生的用户组
    if (openType === 'add') {
      dispatch({
        type: "user/getStudentGroupList",
        payload: {}
      });
    }

    this.setState({
      cardModalVisible: true,
      cardModel,
      openType,
    })
  };

  /**
   *  删除
   */
  onDeleteCard = () => {
    const {selectedRowKeys, searchValue} = this.state;
    const {dispatch, card: {pageSize}} = this.props;
    const deleteFunc = () => {
      dispatch({
        type: "card/deleteCardByIds",
        payload: {
          cardIds: selectedRowKeys
        }
      }).then(() => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        });
        this.onRefreshCardPage(searchValue, 1, pageSize);
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
   *   确认
   * @param values
   * @param openType
   */
  onCardModalOk = (values, openType) => {
    const {dispatch, card: {current, pageSize}} = this.props;
    dispatch({
      type: "card/saveCardData",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshCardPage(openType === 'edit' ? current : 1, pageSize);
    });
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
    const buttonList = [
      {
        icon: 'plus',
        type: 'primary',
        text: '新增',
        operatorKey: 'card-add',
        onClick: () => this.openCardModal({}, 'add'),
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
        operatorKey: 'card-update',
        onClick: () => this.openCardModal(selectedRows[0], 'edit'),
      });
    }

    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        operatorKey: 'card-delete',
        onClick: this.onDeleteCard,
      });
    }
    return {buttonList};
  };

  render() {
    const {
      loading,
      card: {
        cardList,
        total,
        current,
        pageSize,
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
      height: window.innerHeight - 320,
      dataSource: cardList,
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
      userGroupList: [],
      userList: [],
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
