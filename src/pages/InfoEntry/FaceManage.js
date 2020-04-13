import React from 'react';
import {connect} from "dva/index";
import {Card, Modal} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/face/SearchForm";
import FaceTable from "./components/face/FaceTable";
import FaceModal from "./components/face/FaceModal";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import enums from "./config/enums";


@connect(({loading, featureUser, face}) => ({
  loading,
  featureUser,
  face,
}))
class FaceManage extends React.PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    faceModalVisible: false,
    faceModel: {},
    openType: "",
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshFacePage({}, 1, appConfig.PAGE_SIZE);
  }

  /**
   *  刷新数据
   * @param searchValue
   * @param current
   * @param pageSize
   */
  onRefreshFacePage = (searchValue, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "face/getFaceList",
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
  openFaceModal = (faceModel, openType) => {
    const {dispatch} = this.props;
    // 新增默认查询学生的用户组
    if (openType === 'add') {
      dispatch({
        type: "user/getStudentGroupList",
        payload: {}
      });
    }

    this.setState({
      faceModalVisible: true,
      faceModel,
      openType,
    })
  };

  /**
   *  删除
   */
  onDeleteFace = () => {
    const {selectedRowKeys, searchValue} = this.state;
    const {dispatch, face: {pageSize}} = this.props;
    const deleteFunc = () => {
      dispatch({
        type: "face/deleteFaceByIds",
        payload: {
          faceIds: selectedRowKeys
        }
      }).then(() => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
        });
        this.onRefreshFacePage(searchValue, 1, pageSize);
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
  onFaceModalOk = (values, openType) => {
    const {dispatch, face: {current, pageSize}} = this.props;
    dispatch({
      type: "face/saveFaceData",
      payload: {
        values
      }
    }).then(() => {
      this.onRefreshFacePage(openType === 'edit' ? current : 1, pageSize);
    });
  };

  /**
   *  用户类型
   */
  onFaceModalUserTypeSelect = (userType) => {
    const {dispatch} = this.props;
    // 学生
    if (enums.UserType.student.key === userType) {
      dispatch({
        type: "user/getStudentGroupList",
        payload: {}
      });
      return;
    }
    if (enums.UserType.staff.key === userType) {
      dispatch({
        type: "user/getStaffGroupList",
        payload: {}
      });
      return;
    }
    console.error(`不支持的用户类型${userType}`);
  };

  /**
   *  查询组下面的用户
   * @param userType
   * @param groupId
   */
  onFaceModalUserGroupSelect = (userType, groupId) => {
    const {dispatch} = this.props;
    // 学生
    if (enums.UserType.student.key === userType) {
      dispatch({
        type: "user/getStudentList",
        payload: {
          groupId
        }
      });
      return;
    }
    if (enums.UserType.staff.key === userType) {
      dispatch({
        type: "user/getStaffList",
        payload: {
          groupId
        }
      });
      return;
    }
    console.error(`不支持的用户类型${userType}`);
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
      operatorKey: 'face-add',
      onClick: () => this.openFaceModal({}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'face-update',
        onClick: () => this.openFaceModal(selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'face-delete',
        text: '删除',
        onClick: this.onDeleteFace,
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      loading,
      face: {
        faceList,
        total,
        current,
        pageSize,
      },
      featureUser: {
        userGroupList,
        userList
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {
      onSearch: (searchValue) => this.onRefreshFacePage(searchValue, 1, pageSize),
      onFormReset: (searchValue) => this.onRefreshFacePage(searchValue, 1, pageSize)
    };
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();
    // 表格参数
    const faceTableProps = {
      dataSource: [{id: ''}],
      selectedRowKeys: this.state.selectedRowKeys,
      loading: loading.effects['face/getFaceList'],
      total,
      current,
      pageSize,
      onTableSelectChange: (rowKeys, rows) => this.setState({selectedRowKeys: rowKeys, selectedRows: rows,}),
      onTablePageChange: (current, pageSize) => this.onRefreshFacePage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshFacePage(this.state.searchValue, current, pageSize),
    };
    // 详情弹窗
    const faceModalProps = {
      visible: this.state.faceModalVisible,
      openType: this.state.openType,
      dataSource: this.state.faceModel,
      userGroupList,
      userList,
      onUserTypeSelect: this.onFaceModalUserTypeSelect,
      onUserGroupSelect: this.onFaceModalUserGroupSelect,
      onOk: this.onFaceModalOk,
      onCancel: () => this.setState({faceModalVisible: false})
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
            <FaceTable {...faceTableProps} />
          </div>
        </Card>
        <FaceModal {...faceModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default FaceManage;
