import React from 'react';
import {connect} from "dva/index";
import {Card, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/personnelRecord/SearchForm";
import PersonnelRecordTable from "./components/personnelRecord/PersonnelRecordTable";
import PersonnelRecordDetailModal from "./components/personnelRecord/PersonnelRecordDetailModal";


@connect(({loading, personnelRecord}) => ({
  loading,
  personnelRecord,
}))
class PersonnelRecord extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshPersonnelRecordPage({}, 1, appConfig.PAGE_SIZE);
    const {dispatch} = this.props;
    dispatch({
      type: "personnelRecord/getUserTypeList",
      payload: {}
    });
    dispatch({
      type: "personnelRecord/getStrategyTypeList",
      payload: {}
    });
    dispatch({
      type: "personnelRecord/getModeList",
      payload: {}
    });
  }

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshPersonnelRecordPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "personnelRecord/getPersonnelRecordList",
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
  openPersonnelRecordDetailModal = (record) => {
    // TODO 查询策略详情
    const {dispatch} = this.props;
    dispatch({
      type: "personnelRecord/getPersonnelRecordDetail",
      payload: {
        recordId: record.id,
      }
    });
    this.setState({personnelRecordDetailModalVisible: true})
  };

  render() {
    const {
      loading,
      personnelRecord: {
        personnelRecordList,
        total,
        current,
        pageSize,
        personnelRecordDetail,
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
      onSearch: (searchValue) => this.onRefreshPersonnelRecordPage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshPersonnelRecordPage(searchValue, 1, pageSize)
    };
    // 表格参数
    const personnelRecordTableProps = {
      dataSource: [{id: ''}],
      loading: loading.effects['personnelRecord/getPersonnelRecordList'],
      total,
      current,
      pageSize,
      onTablePageChange: (current, pageSize) => this.onRefreshPersonnelRecordPage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshPersonnelRecordPage(this.state.searchValue, current, pageSize),
      onShowDetail: this.openPersonnelRecordDetailModal,
    };
    // 详情弹窗
    const personnelRecordDetailModalProps = {
      visible: this.state.personnelRecordDetailModalVisible,
      personnelRecord: personnelRecordDetail,
      onCancel: () => this.setState({personnelRecordDetailModalVisible: false})
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm {...searchFormProps} />
            </div>
            <PersonnelRecordTable {...personnelRecordTableProps} />
          </div>
        </Card>
        <PersonnelRecordDetailModal {...personnelRecordDetailModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default PersonnelRecord;
