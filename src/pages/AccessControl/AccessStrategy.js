import React, {PureComponent} from 'react';
import {connect} from "dva/index";
import {Card, Row, Tabs, Col, message, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SearchForm from "./components/strategy/SearchForm";
import AccessStrategyTable from "./components/strategy/AccessStrategyTable";
import TimeQuantumModal from "./components/strategy/TimeQuantumModal";
import StrategyDetailTabs from "./components/strategy/StrategyDetailTabs";
import StrategyModal from "./components/strategy/StrategyModal";


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
    selectStrategyModel: {},// 选择的策略
    timeQuantumModalVisible: false,// 时间段弹窗
    timeQuantumSelectedRowKeys: [],// 时间段选择
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
      searchValue,
      selectedRowKeys: [],
      selectedRows: [],
      selectStrategyModel: {},
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
  openStrategyModal = (accessStrategyModel, openType) => {
    const {dispatch} = this.props;
    const strategyId = (accessStrategyModel || {});
    this.setState({
      accessStrategyModalVisible: true,
      accessStrategyModel,
      openType,
    })
  };

  closeStrategyModal = () => {
    this.setState({
      accessStrategyModalVisible: false
    });
  };

  onSaveStrategy = (values, openType) => {
    const {dispatch, accessStrategy: {current, pageSize, strategyToTimeQuantumList}} = this.props;
    const {searchValue} = this.state;
    dispatch({
      type: "accessStrategy/saveAccessStrategy",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshAccessStrategyPage(searchValue, openType === 'edit' ? current : 1, pageSize);
      this.closeStrategyModal()
    })
  };

  /**
   *  打开时间段弹窗
   */
  openTimeQuantumModel = () => {
    this.setState({
      timeQuantumModalVisible: true
    });
  };

  /**
   *  删除时间段
   */
  onDeleteTimeQuantum = () => {
    const {dispatch} = this.props;
    const {timeQuantumSelectedRowKeys, selectStrategyModel} = this.state;
    if ((timeQuantumSelectedRowKeys || []).length <= 0) {
      message.info("请选择需要删除的数据");
      return;
    }
    const deleteFunc = () => {
      dispatch({
        type: "accessStrategy/deleteTimeQuantum",
        payload: {
          timeQuantumIds: timeQuantumSelectedRowKeys,
        }
      }).then(() => {
        this.onRefreshTimeQuantumList(selectStrategyModel.id);
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
   *  刷新时间段数据
   * @param strategyId
   */
  onRefreshTimeQuantumList = (strategyId) => {
    const {dispatch} = this.props;
    dispatch({
      type: "accessStrategy/getStrategyToTimeQuantumList",
      payload: {
        strategyId
      }
    });
    this.setState({
      timeQuantumSelectedRowKeys: [],
    })
  };

  /**
   *  启用
   * @param dataSource
   * @param checked
   */
  onEnableChange = (dataSource, checked) => {
    const {accessStrategy: {accessStrategyList}, dispatch} = this.props;
    const {selectStrategyModel} = this.state;
    const {id: strategyId} = (dataSource || {});
    const strategyStatus = checked ? "Enable" : "UnEnable";
    // 更新列表的状态
    (accessStrategyList || []).forEach(item => {
      if (strategyId === item.id) {
        item.strategyStatus = strategyStatus;
      }
    });
    selectStrategyModel.strategyStatus = strategyStatus;
    dispatch({
      type: "accessStrategy/updateAccessStrategyStatus",
      payload: {
        strategyId,
        status: strategyStatus
      }
    }).then(() => {
      dispatch({
        type: "accessStrategy/setState",
        payload: {
          accessStrategyList
        }
      });
      this.setState({
        selectStrategyModel
      })
    });
  };

  /**
   *  点击策略
   * @param selectStrategyModel
   */
  onStrategyClick = (selectStrategyModel) => {
    this.onRefreshTimeQuantumList(selectStrategyModel.id);
    this.setState({
      selectStrategyModel
    })
  };

  /**
   *  保存时间段
   * @param values
   */
  onSaveTimeQuantum = (values) => {
    const {dispatch} = this.props;
    const {selectStrategyModel: {id}} = this.state;
    dispatch({
      type: "accessStrategy/saveTimeQuantum",
      payload: {
        strategyId: id,
        values
      }
    }).then(() => {
      this.onRefreshTimeQuantumList(id);
      this.setState({timeQuantumModalVisible: false});
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
      onClick: () => this.openStrategyModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'access-strategy-update',
        onClick: () => this.openStrategyModal(selectedRows[0], 'edit'),
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
      height: window.innerHeight - 350,
      dataSource: accessStrategyList,
      total,
      current,
      pageSize,
      loading: loading.effects['accessStrategy/getAccessStrategyList'],
      selectedRowKeys: this.state.selectedRowKeys,
      selectStrategyModel: this.state.selectStrategyModel,
      onRowClick: this.onStrategyClick,
      onTableSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onTablePageChange: (current, pageSize) => this.onRefreshAccessStrategyPage(this.state.searchValue, current, pageSize),
      onTablePageSizeChange: (current, pageSize) => this.onRefreshAccessStrategyPage(this.state.searchValue, current, pageSize),
    };

    const strategyModalProps = {
      visible: this.state.accessStrategyModalVisible,
      openType: this.state.openType,
      dataSource: this.state.accessStrategyModel,
      onOk: this.onSaveStrategy,
      onCancel: this.closeStrategyModal,
    };

    const timeQuantumTableProps = {
      selectedRowKeys: this.state.timeQuantumSelectedRowKeys,
      timeQuantumList: strategyToTimeQuantumList,
      onAddTimeQuantum: this.openTimeQuantumModel,
      onDeleteTimeQuantum: this.onDeleteTimeQuantum,
      onTimeQuantumSelectChange: (timeQuantumSelectedRowKeys) => this.setState({timeQuantumSelectedRowKeys}),
    };

    const strategyDetailTabProps = {
      height: window.innerHeight - 285,
      loading: loading.effects['accessStrategy/getStrategyToTimeQuantumList'] || loading.effects['accessStrategy/updateAccessStrategyStatus'],
      dataSource: this.state.selectStrategyModel,
      onEnableChange: this.onEnableChange,
      timeQuantumTableProps
    };

    const timeQuantumModalProps = {
      visible: this.state.timeQuantumModalVisible,
      okLoading: loading.effects['accessStrategy/saveTimeQuantum'],
      onOk: this.onSaveTimeQuantum,
      onCancel: () => this.setState({timeQuantumModalVisible: false}),
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={10} style={{border: '1px solid #d9d9d9', padding: '10px 5px'}}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>
                  <SearchForm {...searchFormProps} />
                </div>
                <div className={styles.tableListOperator}>
                  <OperatorButton {...operatorButtonProps} />
                </div>
                <AccessStrategyTable {...accessStrategyTableProps} />
              </div>
            </Col>
            <Col span={14}>
              <StrategyDetailTabs {...strategyDetailTabProps}/>
            </Col>
          </Row>
        </Card>
        <StrategyModal {...strategyModalProps}/>
        <TimeQuantumModal {...timeQuantumModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default AccessStrategy;
