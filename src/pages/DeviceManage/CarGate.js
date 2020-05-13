import React from 'react';
import {connect} from "dva/index";
import {Card, Modal, message} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/carGate/SearchForm";
import CarGateTable from "./components/carGate/CarGateTable";
import CarGateModal from "./components/carGate/CarGateModal";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import enums from "./config/enums";


@connect(({loading, carGate}) => ({
  loading,
  carGate
}))
class CarGate extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    carGateModalVisible: false,
    carGateModel: {},
    openType: "",
    mDisabled: false,
    currentStep: 0,
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshCarGatePage({}, 1, appConfig.PAGE_SIZE);
    // 刷新厂商数据
    this.onRefreshManufacturerList();
  }

  /**
   *  刷新厂商数据
   */
  onRefreshManufacturerList = () => {
    const {dispatch} = this.props;
    dispatch({
      type: "carGate/getManufacturerList",
      payload: {}
    })
  };

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshCarGatePage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "carGate/getCarGateList",
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
  openCarGateModal = (carGateModel, openType, currentStep, mDisabled) => {
    const {dispatch} = this.props;
    this.carGateModal.onInitDataSource(carGateModel);
    this.setState({
      carGateModalVisible: true,
      carGateModel,
      openType,
      mDisabled,
      currentStep
    })
  };

  /**
   *  删除
   */
  onDeleteCarGate = () => {
    const {selectedRowKeys, searchValue} = this.state;
    const {dispatch, carGate: {pageSize}} = this.props;
    const deleteFunc = () => {
      dispatch({
        type: "carGate/deleteCarGateByIds",
        payload: {
          carGateIds: selectedRowKeys
        }
      }).then(() => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        });
        this.onRefreshCarGatePage(searchValue, 1, pageSize);
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
  onCarGateModalOk = (values, openType) => {
    const {dispatch, carGate: {current, pageSize}} = this.props;
    dispatch({
      type: "carGate/saveCarGateData",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshCarGatePage(openType === 'edit' ? current : 1, pageSize);
    });
  };

  /**
   *   开始测试
   */
  onStartTest = (deviceId, onStartTestInterval) => {
    const {dispatch} = this.props;
    dispatch({
      type: "carGate/startTest",
      payload: {
        deviceId
      }
    }).then(() => {
      onStartTestInterval && onStartTestInterval();
    });
  };

  /**
   *  刷新测试数据
   */
  onRefreshTest = (testLog) => {
    const {dispatch} = this.props;
    const {id: deviceId} = (testLog || {});
    if (!deviceId) {
      message.info("测试log刷新失败，获取不到deviceId");
      return
    }
    dispatch({
      type: "carGate/getTestLogByDeviceId",
      payload: {
        deviceId
      }
    })
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
      operatorKey: 'car-gate-add',
      onClick: () => this.openCarGateModal({}, 'add', 0, false),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'car-gate-update',
        onClick: () => this.openCarGateModal(selectedRows[0], 'edit', 0, false),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'car-gate-delete',
        text: '删除',
        onClick: this.onDeleteCarGate,
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      loading,
      carGate: {
        carGateList,
        total,
        current,
        pageSize,
        manufacturerList,
        testLog,
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.onRefreshCarGatePage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshCarGatePage(searchValue, 1, pageSize)
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();
    // 表格参数
    const carGateTableProps = {
      dataSource: carGateList,
      selectedRowKeys: this.state.selectedRowKeys,
      loading: loading.effects['carGate/getCarGateList'],
      total,
      current,
      pageSize,
      onTableSelectChange: (rowKeys, rows) => this.setState({selectedRowKeys: rowKeys, selectedRows: rows,}),
      onTablePageChange: (current, pageSize) => this.onRefreshCarGatePage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshCarGatePage(this.state.searchValue, current, pageSize),
      onOperator: (record) => this.openCarGateModal(record, "debug", 2, true),
    };
    // 详情弹窗
    const carGateModalProps = {
      visible: this.state.carGateModalVisible,
      openType: this.state.openType,
      mDisabled: this.state.mDisabled,
      dataSource: this.state.carGateModel,
      currentStep: this.state.currentStep,
      manufacturerList,
      testLog,
      onCurrentStepChange: (currentStep) => this.setState({currentStep}),
      onStartTest: this.onStartTest,
      onRefreshTest: this.onRefreshTest,
      onOk: this.onCarGateModalOk,
      onCancel: () => this.setState({carGateModalVisible: false})
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
            <CarGateTable {...carGateTableProps} />
          </div>
        </Card>
        <CarGateModal {...carGateModalProps} onRef={r => this.carGateModal = r}/>
      </PageHeaderWrapper>
    );
  }
}

export default CarGate;
