import React from 'react';
import {connect} from "dva/index";
import {Card, Modal, message} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/Gate/SearchForm";
import GateTable from "./components/Gate/GateTable";
import GateModal from "./components/Gate/GateModal";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";


@connect(({loading, gate}) => ({
  loading,
  gate
}))
class Gate extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    gateModalVisible: false,
    gateModel: {},
    openType: "",
    mDisabled: false,
    currentStep: 0,
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshGatePage({}, 1, appConfig.PAGE_SIZE);
    // 刷新厂商数据
    this.onRefreshManufacturerList();
  }

  /**
   *  刷新厂商数据
   */
  onRefreshManufacturerList = () => {
    const {dispatch} = this.props;
    dispatch({
      type: "gate/getManufacturerList",
      payload: {}
    })
  };

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshGatePage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "gate/getGateList",
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
  openGateModal = (gateModel, openType, currentStep, mDisabled) => {
    const {dispatch} = this.props;
    this.gateModal.onInitDataSource(gateModel);
    this.setState({
      gateModalVisible: true,
      gateModel,
      openType,
      mDisabled,
      currentStep
    })
  };

  /**
   *  删除
   */
  onDeleteGate = () => {
    const {selectedRowKeys, searchValue} = this.state;
    const {dispatch, gate: {pageSize}} = this.props;
    const deleteFunc = () => {
      dispatch({
        type: "gate/deleteGateByIds",
        payload: {
          gateIds: selectedRowKeys
        }
      }).then(() => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        });
        this.onRefreshGatePage(searchValue, 1, pageSize);
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
  onGateModalOk = (values, openType) => {
    const {dispatch, gate: {current, pageSize}} = this.props;
    dispatch({
      type: "gate/saveGateData",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshGatePage(openType === 'edit' ? current : 1, pageSize);
    });
  };

  /**
   *   开始测试
   */
  onStartTest = (deviceId, onStartTestInterval) => {
    const {dispatch} = this.props;
    dispatch({
      type: "gate/startTest",
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
      type: "gate/getTestLogByDeviceId",
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
      operatorKey: 'gate-add',
      onClick: () => this.openGateModal({}, 'add', 0, false),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'gate-update',
        onClick: () => this.openGateModal(selectedRows[0], 'edit', 0, false),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'gate-delete',
        text: '删除',
        onClick: this.onDeleteGate,
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      loading,
      gate: {
        gateList,
        total,
        current,
        pageSize,
        manufacturerList,
        testLog,
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.onRefreshGatePage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshGatePage(searchValue, 1, pageSize),
      manufacturerList,
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();
    // 表格参数
    const gateTableProps = {
      height: window.innerHeight - 350,
      dataSource: gateList,
      selectedRowKeys: this.state.selectedRowKeys,
      loading: loading.effects['gate/getGateList'],
      total,
      current,
      pageSize,
      onTableSelectChange: (rowKeys, rows) => this.setState({selectedRowKeys: rowKeys, selectedRows: rows,}),
      onTablePageChange: (current, pageSize) => this.onRefreshGatePage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshGatePage(this.state.searchValue, current, pageSize),
      onOperator: (record) => this.openGateModal(record, "debug", 2, true),
    };
    // 详情弹窗
    const gateModalProps = {
      visible: this.state.gateModalVisible,
      openType: this.state.openType,
      mDisabled: this.state.mDisabled,
      dataSource: this.state.gateModel,
      currentStep: this.state.currentStep,
      manufacturerList,
      testLog,
      onCurrentStepChange: (currentStep) => this.setState({currentStep}),
      onStartTest: this.onStartTest,
      onRefreshTest: this.onRefreshTest,
      confirmLoading: loading.effects['gate/saveGateData'],
      onOk: this.onGateModalOk,
      onCancel: () => this.setState({gateModalVisible: false})
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
            <GateTable {...gateTableProps} />
          </div>
        </Card>
        <GateModal {...gateModalProps} onRef={r => this.gateModal = r}/>
      </PageHeaderWrapper>
    );
  }
}

export default Gate;
