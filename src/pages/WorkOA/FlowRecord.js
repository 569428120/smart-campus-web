import React from 'react';
import {connect} from "dva/index";
import {Card, Modal, Tabs, message} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/flowRecord/SearchForm";
import FlowRecordTable from "./components/flowRecord/FlowRecordTable";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import enums from "./config/enums";

const {TabPane} = Tabs;

@connect(({loading, todoFlowRecord, alreadyFlowRecord, myCreateFlowRecord}) => ({
  loading,
  todoFlowRecord,
  alreadyFlowRecord,
  myCreateFlowRecord
}))
class FlowRecord extends React.PureComponent {

  state = {
    activeKey: '1',
    searchValue1: {},//  搜索条件
    searchValue2: {},//  搜索条件
    searchValue3: {},//  搜索条件
    searchReset: undefined,// 搜索框重置
    selectedRowKeys: [],
    selectedRows: [],
    flowRecordModalVisible: false,
    flowRecordModel: {},
    openType: "",
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshFlowRecordPage('1', undefined, 1, appConfig.PAGE_SIZE);
    this.onRefreshFlowRecordPage('2', undefined, 1, appConfig.PAGE_SIZE);
    this.onRefreshFlowRecordPage('3', undefined, 1, appConfig.PAGE_SIZE);
  }

  /**
   *  标签页切换
   * @param activeKey
   */
  onTabChange = (activeKey) => {
    this.setState({
      activeKey
    })
  };


  /**
   *  刷新数据
   *  @param activeKey
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshFlowRecordPage = (activeKey, searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    switch (activeKey) {
      // 待办
      case '1':
        // 没有传入搜索条件
        if (!searchValue) {
          searchValue = this.state.searchValue1
        }
        dispatch({
          type: "todoFlowRecord/getFlowRecordList",
          payload: {
            searchValue,
            current,
            pageSize
          }
        });
        this.setState({
          searchValue1: searchValue
        });
        break;
      case '2':
        // 没有传入搜索条件
        if (!searchValue) {
          searchValue = this.state.searchValue2
        }
        dispatch({
          type: "alreadyFlowRecord/getFlowRecordList",
          payload: {
            searchValue,
            current,
            pageSize
          }
        });
        this.setState({
          searchValue2: searchValue
        });
        break;
      case '3':
        // 没有传入搜索条件
        if (!searchValue) {
          searchValue = this.state.searchValue3
        }
        dispatch({
          type: "myCreateFlowRecord/getFlowRecordList",
          payload: {
            searchValue,
            current,
            pageSize
          }
        });
        this.setState({
          searchValue3: searchValue
        });
        break;
      default:
        message.error(`不支持的类型 ${activeKey}`);
    }
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
   *   跳转到详情页面
   * @param record
   */
  onToExaminePage = (record) => {

  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新建',
      operatorKey: 'flow-create',
      onClick: () => this.openFlowSelectModal({}, 'add'),
    });
    return {buttonList};
  };

  render() {
    const {
      loading,
      // 待办
      todoFlowRecord,
      // 已办
      alreadyFlowRecord,
      // 我创建的
      myCreateFlowRecord,
    } = this.props;

    // 待办
    const todoFlowSearchFormProps = {
      onSearch: (searchValue) => this.onRefreshFlowRecordPage(this.state.activeKey, searchValue, 1, todoFlowRecord.pageSize),
      onFormReset: (searchValue) => this.onRefreshFlowRecordPage(this.state.activeKey, searchValue, 1, todoFlowRecord.pageSize)
    };
    const todoFlowFlowRecordTableProps = {
      dataSource: todoFlowRecord.flowRecordList,
      loading: loading.effects['todoFlowRecord/getFlowRecordList'],
      total: todoFlowRecord.total,
      current: todoFlowRecord.current,
      pageSize: todoFlowRecord.pageSize,
      onTablePageChange: (current, pageSize) => this.onRefreshFlowRecordPage(this.state.activeKey, this.state.searchValue1, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshFlowRecordPage(this.state.activeKey, this.state.searchValue1, current, pageSize),
      onOperator: this.onToExaminePage,
    };
    // 已办
    const alreadyFlowSearchFormProps = {
      onSearch: (searchValue) => this.onRefreshFlowRecordPage(this.state.activeKey, searchValue, 1, alreadyFlowRecord.pageSize),
      onFormReset: (searchValue) => this.onRefreshFlowRecordPage(this.state.activeKey, searchValue, 1, alreadyFlowRecord.pageSize)
    };
    const alreadyFlowFlowRecordTableProps = {
      dataSource: alreadyFlowRecord.flowRecordList,
      loading: loading.effects['alreadyFlowRecord/getFlowRecordList'],
      total: alreadyFlowRecord.total,
      current: alreadyFlowRecord.current,
      pageSize: alreadyFlowRecord.pageSize,
      onTablePageChange: (current, pageSize) => this.onRefreshFlowRecordPage(this.state.activeKey, this.state.searchValue2, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshFlowRecordPage(this.state.activeKey, this.state.searchValue2, current, pageSize),
    };
    // 我创建的
    const myCreateFlowSearchFormProps = {
      onSearch: (searchValue) => this.onRefreshFlowRecordPage(this.state.activeKey, searchValue, 1, myCreateFlowRecord.pageSize),
      onFormReset: (searchValue) => this.onRefreshFlowRecordPage(this.state.activeKey, searchValue, 1, myCreateFlowRecord.pageSize)
    };
    const myCreateFlowFlowRecordTableProps = {
      dataSource: myCreateFlowRecord.flowRecordList,
      loading: loading.effects['myCreateFlowRecord/getFlowRecordList'],
      total: myCreateFlowRecord.total,
      current: myCreateFlowRecord.current,
      pageSize: myCreateFlowRecord.pageSize,
      onTablePageChange: (current, pageSize) => this.onRefreshFlowRecordPage(this.state.activeKey, this.state.searchValue3, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshFlowRecordPage(this.state.activeKey, this.state.searchValue3, current, pageSize),
    };

    return (
      <PageHeaderWrapper>
        <Tabs activeKey={this.state.activeKey} onChange={this.onTabChange}>
          <TabPane tab="待办流程" key="1">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <SearchForm {...todoFlowSearchFormProps}/>
              </div>
              <FlowRecordTable {...todoFlowFlowRecordTableProps}/>
            </div>
          </TabPane>
          <TabPane tab="已办流程" key="2">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <SearchForm {...alreadyFlowSearchFormProps}/>
              </div>
              <FlowRecordTable {...alreadyFlowFlowRecordTableProps}/>
            </div>
          </TabPane>
          <TabPane tab="我创建的" key="3">
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                <SearchForm {...myCreateFlowSearchFormProps}/>
              </div>
              <FlowRecordTable {...myCreateFlowFlowRecordTableProps}/>
            </div>
          </TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default FlowRecord;
