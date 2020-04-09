import React from 'react';
import {connect} from "dva/index";
import {Card, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/card/SearchForm";
import CardTable from "./components/card/CardTable";
import CardModal from "./components/card/CardModal";


@connect(({loading, card}) => ({
  loading,
  card,
}))
class CardManage extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
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
  openCardModal = (record) => {
   
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
