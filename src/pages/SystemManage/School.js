import React, {PureComponent} from 'react';
import {Card, Modal} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import SearchForm from './components/school/SearchForm';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import SchoolTable from '@/pages/SystemManage/components/school/SchoolTable';
import appConfig from "@/config/appConfig";
import SchoolModal from "@/pages/SystemManage/components/school/SchoolModal";

/**
 *  区域管理页面
 */
@connect(({loading, school, region, authorityTemplate}) => ({
  loading,
  school,
  region,
  authorityTemplate
}))
class School extends PureComponent {
  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    schoolModalVisible: false,// 弹窗是否显示
    openType: '',// 操作类型
    schoolModel: {},// 回显的数据
    mDisabled: false,// 弹窗按钮是否可用
    currentStep: 0, // 弹窗步骤
  };

  componentDidMount() {
    const {dispatch} = this.props;
    this.onRefreshSchoolPage({}, 1, appConfig.PAGE_SIZE);
    // 获取教育局下拉列表
    dispatch({
      type: "region/getRegionList",
      payload: {
        searchValue: {},
        current: 1,
        pageSize: 1000
      }
    });
    // 权限模板列表
    dispatch({
      type: "authorityTemplate/getAuthorityTemplateList",
      payload: {}
    })
  };

  /**
   *  刷新页面
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshSchoolPage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "school/getSchoolList",
      payload: {
        searchValue,
        current,
        pageSize
      }
    });
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
    })
  };

  /**
   * 查询
   * @param searchValue
   */
  onSearchFormSearch = searchValue => {
    const {dispatch, school: {pageSize}} = this.props;
    this.onRefreshSchoolPage(searchValue, 1, pageSize);
    this.setState({
      searchValue
    })
  };

  /**
   * 重置
   * @param searchValue
   */
  onSearchFormReset = searchValue => {
    const {school: {pageSize}} = this.props;
    this.onRefreshSchoolPage(searchValue, 1, pageSize);
    this.setState({
      searchValue
    })
  };

  /**
   *  教育局选择
   * @param regionId
   */
  onRegionSelectChange = (regionId) => {
    const {dispatch, school: {pageSize}} = this.props;
    const searchValue = {
      regionId,
    };
    this.onRefreshSchoolPage(searchValue, 1, pageSize);
    this.setState({
      searchValue
    })
  };

  /**
   *  选择
   * @param selectedRowKeys
   * @param selectedRows
   */
  onTableSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  /**
   *  新增
   */
  openSchoolModal = (record, openType, currentStep = 0, mDisabled = false) => {
    // 初始化弹窗的数据
    this.schoolModal.onInitDataSource(record);
    this.setState({
      schoolModalVisible: true,
      openType,
      schoolModel: record,
      currentStep,
      mDisabled
    });
  };

  /**
   *  删除
   * @param schoolIds
   */
  onDeleteSchool = schoolIds => {
    const {dispatch, school: {current, pageSize}} = this.props;
    const {searchValue, selectedRowKeys} = this.state;
    const deleteRegion = () => {
      dispatch({
        type: "school/deleteSchoolByIds",
        payload: {
          schoolIds: selectedRowKeys
        }
      }).then(() => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        });
        this.onRefreshSchoolPage(searchValue, current, pageSize);
      });
    };
    Modal.confirm({
      title: '删除确认',
      content: '是否删除选择的数据',
      onOk: deleteRegion,
      okText: '确认',
      cancelText: '取消',
    });
  };

  /**
   *  弹窗确认按钮
   * @param values
   * @param openType
   */
  onSchoolModalOk = (values, openType) => {
    const {dispatch, school: {current, pageSize}} = this.props;
    const {schoolModel, searchValue} = this.state;
    if (['add', 'edit'].includes(openType)) {
      dispatch({
        type: "school/saveSchoolData",
        payload: {
          values: {
            ...values,
            id: (schoolModel || {}).id
          }
        }
      }).then(() => {
        this.onRefreshSchoolPage(searchValue, openType === 'edit' ? current : 1, pageSize);
        this.closeSchoolModal();
      });
    }
  };

  /**
   *  关闭弹窗
   */
  closeSchoolModal = () => {
    this.setState({
      schoolModalVisible: false,
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
      operatorKey: 'school-add',
      onClick: () => this.openSchoolModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'school-update',
        onClick: () => this.openSchoolModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'school-delete',
        text: '删除',
        onClick: () => this.onDeleteSchool(selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
  };


  render() {
    // model里面的数据
    const {
      loading,
      school: {
        schoolList,
        current,
        pageSize,
        total
      },
      region: {
        regionList
      },
      authorityTemplate: {
        authorityTemplateList
      }
    } = this.props;

    // 搜索框参数
    const searchFormProps = {
      regionList,
      onSearch: this.onSearchFormSearch,
      onFormReset: this.onSearchFormReset,
      onRegionSelectChange: this.onRegionSelectChange
    };

    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    // 表格组件参数
    const schoolTableProps = {
      dataSource: schoolList,
      loading: loading.effects['school/getSchoolList'],
      selectedRowKeys: this.state.selectedRowKeys,
      onTableSelectChange: this.onTableSelectChange,
      onShowView: (record) => this.openSchoolModal(record, 'view', 1, true),
      current,
      pageSize,
      total,
      onTablePageChange: (current, pageSize) => this.onRefreshSchoolPage(this.state.searchValue, current, pageSize),
      onTablePageSizeChange: (current, pageSize) => this.onRefreshSchoolPage(this.state.searchValue, 1, pageSize),
    };

    // 弹窗
    const schoolModalProps = {
      visible: this.state.schoolModalVisible,
      openType: this.state.openType,
      mDisabled: this.state.mDisabled,
      currentStep: this.state.currentStep,
      onCurrentStepChange: (currentStep) => this.setState({currentStep}),
      authorityTemplateList,
      regionList,
      confirmLoading: loading.effects['school/saveSchoolData'],
      onOk: this.onSchoolModalOk,
      onCancel: this.closeSchoolModal
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
            <SchoolTable {...schoolTableProps} />
          </div>
        </Card>
        <SchoolModal {...schoolModalProps} onRef={r => this.schoolModal = r}/>
      </PageHeaderWrapper>
    );
  }
}

export default School;
