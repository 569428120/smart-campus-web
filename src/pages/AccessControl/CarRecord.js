import React from 'react';
import {connect} from "dva/index";
import {Card, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/carRecord/SearchForm";
import CarRecordTable from "./components/carRecord/CarRecordTable";
import CarRecordDetailModal from "./components/carRecord/CarRecordDetailModal";


@connect(({loading, carRecord}) => ({
  loading,
  carRecord,
}))
class CarRecord extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshCarRecordPage({}, 1, appConfig.PAGE_SIZE);
    const {dispatch} = this.props;
    dispatch({
      type: "carRecord/getUserTypeList",
      payload: {}
    });
    dispatch({
      type: "carRecord/getStrategyTypeList",
      payload: {}
    });
  }

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshCarRecordPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "carRecord/getCarRecordList",
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
  openCarRecordDetailModal = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: "carRecord/getCarRecordDetail",
      payload: {
        recordId: record.id,
      }
    });
    // TODO 查询策略详情

    this.setState({carRecordDetailModalVisible: true})
  };

  render() {
    const {
      loading,
      carRecord: {
        carRecordList,
        total,
        current,
        pageSize,
        carRecordDetail,
        userTypeList,
        strategyTypeList,
        modeList,
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      userTypeList: [],
      strategyTypeList: [],
      modeList: [],
      onSearch: (searchValue) => this.onRefreshCarRecordPage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshCarRecordPage(searchValue, 1, pageSize)
    };
    // 表格参数
    const carRecordTableProps = {
      dataSource: [{id: ''}],
      loading: loading.effects['carRecord/getCarRecordList'],
      total,
      current,
      pageSize,
      onTablePageChange: (current, pageSize) => this.onRefreshCarRecordPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshCarRecordPage(this.state.searchValue, current, pageSize),
      onShowDetail: this.openCarRecordDetailModal,
    };
    // 详情弹窗
    const carRecordDetailModalProps = {
      visible: this.state.carRecordDetailModalVisible,
      carRecord: carRecordDetail,
      onCancel: () => this.setState({carRecordDetailModalVisible: false})
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm {...searchFormProps} />
            </div>
            <CarRecordTable {...carRecordTableProps} />
          </div>
        </Card>
        <CarRecordDetailModal {...carRecordDetailModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default CarRecord;
