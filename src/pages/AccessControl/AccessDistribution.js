import React from 'react';
import {connect} from "dva/index";
import {Card, message, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SearchForm from "./components/distribution/SearchForm";
import AccessDistributionTable from "./components/distribution/AccessDistributionTable";
import AccessDistributionModal from "./components/distribution/AccessDistributionModal";

@connect(({loading, accessDistribution}) => ({
  loading,
  accessDistribution,
}))
class AccessDistribution extends React.PureComponent {
  state = {
    searchType: '1', // 类型
    searchValue: {},// 搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    accessDistributionModalVisible: false,
    groupIds: [],
    accessDistributionModel: {},
    openType: '',
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshAccessDistributionList({type: this.state.searchType});
  }

  /**
   *  查询
   * @param searchValue
   */
  onRefreshAccessDistributionList = (searchValue) => {
    const {dispatch} = this.props;
    dispatch({
      type: "accessDistribution/getAccessDistributionList",
      payload: {
        searchValue
      }
    });
    this.setState({
      searchValue
    })
  };


  /**
   *  刷新时间段数据
   * @param strategyId
   */
  onRefreshRimeQuantumList = (strategyId) => {
    const {dispatch} = this.props;
    dispatch({
      type: "accessDistribution/getTimeQuantumListByStrategyId",
      payload: {
        strategyId
      }
    });
  };

  /**
   *  策略分配弹窗
   * @param groupIds
   * @param record
   * @param openType
   */
  openAccessDistributionModal = (groupIds, record, openType) => {
    if ((groupIds || []).length <= 0) {
      message.info("请选择分配的数据");
      return;
    }
    const {dispatch} = this.props;
    const {strategyId} = (record || {});
    dispatch({
      type: "accessDistribution/getAccessStrategyList",
      payload: {}
    });
    this.onRefreshRimeQuantumList(strategyId);
    this.setState({
      accessDistributionModalVisible: true,
      accessDistributionModel: record,
      groupIds,
      openType
    })
  };

  /**
   *  分配策略
   * @param values
   * @param groupIds
   * @param openType
   */
  onAccessDistributionModalOk = (values, groupIds, openType) => {
    const {dispatch} = this.props;
    const {strategyId} = values;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "accessDistribution/saveGroupToStrategyId",
        payload: {
          groupIds,
          strategyId,
        }
      }).then(() => {
        this.setState({
          accessDistributionModalVisible: false
        });
      });
    } else {
      this.setState({
        accessDistributionModalVisible: false
      });
    }
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows} = this.state;
    const buttonList = [];
    // 更新按钮，选择一个的时候显示
    buttonList.push({
      icon: '',
      type: '',
      text: '策略分配',
      operatorKey: 'access-distribution-update',
      onClick: () => this.openAccessDistributionModal(selectedRowKeys, {}, 'edit'),
    });

    return {buttonList};
  };


  render() {
    const {
      loading,
      accessDistribution: {
        accessDistributionList,
        timeQuantumList,
        accessStrategyList
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      type: this.state.searchType,
      onSearch: (searchValue) => this.onRefreshAccessDistributionList(searchValue),
      onFormReset: (searchValue) => this.onRefreshAccessDistributionList(searchValue),
      onTypeChange: (searchType) => {
        this.setState({
          searchType
        });
        this.onRefreshAccessDistributionList({type: searchType})
      }
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();
    // 表格参数
    const accessDistributionTableProps = {
      dataSource: [{id: '1', timeQuantum: "节假日:13:55-16:55、15:30-16:30"}],
      loading: loading.effects['accessDistribution/getAccessDistributionList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: (rowKeys, rows) => this.setState({selectedRowKeys: rowKeys, selectedRows: rows}),
      onTimeQuantumCheck: (record) => this.openAccessDistributionModal([record.id], record, 'view')
    };
    // 弹窗参数
    const accessDistributionModalProps = {
      visible: this.state.accessDistributionModalVisible,
      openType: this.state.openType,
      groupIds: this.state.groupIds,
      dataSource: this.state.accessDistributionModel,
      timeQuantumList,
      accessStrategyList,
      loading: loading.effects['accessDistribution/getTimeQuantumListByStrategyId'],
      onAccessStrategyChange: (strategyId) => this.onRefreshRimeQuantumList(strategyId),
      onOk: this.onAccessDistributionModalOk,
      onCancel: () => this.setState({accessDistributionModalVisible: false})
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
            <AccessDistributionTable {...accessDistributionTableProps} />
          </div>
        </Card>
        <AccessDistributionModal {...accessDistributionModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default AccessDistribution;
