import React, {PureComponent} from 'react';
import {connect} from "dva/index";
import {Card, message, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SearchForm from "./components/strategy/SearchForm";
import AccessStrategyTable from "./components/strategy/AccessStrategyTable";
import AccessStrategyModal from "./components/strategy/AccessStrategyModal";
import TimeQuantumModal from "./components/strategy/TimeQuantumModal";



@connect(({loading, accessStrategy}) => ({
  loading,
  accessStrategy,
}))
class AccessStrategy extends PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    accessStrategyModalVisible: false,// 新增修改窗口
    openType: '',// 操作类型
    accessStrategyModel: {}, // 弹窗数据
    timeQuantumModalVisible: false,// 时间段弹窗
    timeQuantumSelectedRowKeys: [],// 时间段选择
    mDisabled: false,//下一步上一步保存按钮是否可用
    currentStep: 0,//当前步骤
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshAccessStrategyPage({}, 1, appConfig.PAGE_SIZE);
  }


  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshAccessStrategyPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "accessStrategy/getAccessStrategyList",
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
  onDeleteAccessStrategy = (strategyIds) => {
    const {dispatch, accessStrategy: {pageSize}} = this.props;
    const {searchValue} = this.state;
    const deleteFunc = () => {
      dispatch({
        type: "accessStrategy/deleteAccessStrategyByIds",
        payload: {
          strategyIds
        }
      }).then(() => {
        // 刷新页面并把选择质控
        this.onRefreshAccessStrategyPage(searchValue, 1, pageSize);
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
   */
  openAccessStrategyModal = (accessStrategyModel, openType, mDisabled = false, currentStep = 0) => {
    const {dispatch} = this.props;
    const strategyId = (accessStrategyModel || {});
    this.accessStrategyModal.setState({dataSource: accessStrategyModel});
    this.setState({
      accessStrategyModalVisible: true,
      accessStrategyModel,
      openType,
      mDisabled,
      currentStep
    })
  };

  /**
   *   保存数据
   */
  onSaveAccessStrategy = (values, openType) => {
    const {dispatch, accessStrategy: {current, pageSize, strategyToTimeQuantumList}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "accessStrategy/saveAccessStrategy",
      payload: {
        values: {
          ...values,
          timeQuantumList: strategyToTimeQuantumList
        }
      }
    }).then(() => {
      this.onRefreshAccessStrategyPage(searchValue, openType === 'edit' ? current : 1, pageSize);
      this.closeAccessStrategyModal();
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
      })
    });
  };

  /**
   *  状态改变
   * @param record
   * @param status
   */
  onAccessStrategyStatusChange = (record, status) => {
    const {dispatch, accessStrategy: {current, pageSize}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "accessStrategy/updateAccessStrategyStatus",
      payload: {
        values: {
          strategyId: record.id,
          status
        }
      }
    }).then(() => {
      this.onRefreshAccessStrategyPage(searchValue, current, pageSize)
    });
  };


  /**
   *  关闭弹窗
   */
  closeAccessStrategyModal = () => {
    this.setState({
      accessStrategyModalVisible: false
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
      operatorKey: 'access-strategy-add',
      onClick: () => this.openAccessStrategyModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'access-strategy-update',
        onClick: () => this.openAccessStrategyModal(selectedRows[0], 'edit'),
      });
    }

    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        operatorKey: 'access-strategy-delete',
        text: '删除',
        onClick: () => this.onDeleteAccessStrategy(selectedRowKeys),
      });
    }
    return {buttonList};
  };

  render() {
    const {
      loading,
      accessStrategy: {
        accessStrategyList,
        total,
        current,
        pageSize,
        strategyToTimeQuantumList,
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.onRefreshAccessStrategyPage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshAccessStrategyPage(searchValue, 1, pageSize),
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格参数
    const accessStrategyTableProps = {
      dataSource: accessStrategyList,
      loading: loading.effects['accessStrategy/getAccessStrategyList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onOperator: this.onAccessStrategyStatusChange
    };

    // 弹窗参数
    const accessStrategyModalProps = {
      visible: this.state.accessStrategyModalVisible,
      openType: this.state.openType,
      mDisabled: this.state.mDisabled,
      currentStep: this.state.currentStep,
      onCurrentStepChange: (currentStep) => this.setState({currentStep}),
      onOk: this.onSaveAccessStrategy,
      onCancel: this.closeAccessStrategyModal,
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
            <AccessStrategyTable {...accessStrategyTableProps} />
          </div>
        </Card>
        <AccessStrategyModal {...accessStrategyModalProps} onRef={r => this.accessStrategyModal = r}/>
      </PageHeaderWrapper>
    );
  }
}

export default AccessStrategy;
