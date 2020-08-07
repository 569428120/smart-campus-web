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
import {validatorFaceModel} from "./services/faceService";
import appEnums from "../../config/enums";
import {message} from "antd/lib/index";


@connect(({loading, featureUser, face}) => ({
  loading,
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
    fileList: [],
  };

  componentDidMount() {
    // 刷新数据
    this.onRefreshFacePage({
      userType: appEnums.UserTypes.Student.key,
    }, 1, appConfig.PAGE_SIZE);
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
      searchValue,
      selectedRowKeys: [],
      selectedRows: [],
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
    const fileList = (faceModel.imageList || []).map(item => {
      return {
        uid: item.id,
        name: item.name,
        status: 'done',
        url: item.url,
      }
    });

    this.setState({
      faceModalVisible: true,
      faceModel,
      openType,
      fileList,
    })
  };

  closeFaceModal = () => {
    this.setState({
      faceModalVisible: false,
      faceModel: {},
      openType: "",
      fileList: [],
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
    const {searchValue, fileList} = this.state;
    if (openType === "view") {
      this.closeFaceModal();
    } else {
      if ((fileList || []).length <= 0) {
        message.warn("特征照片不能为空");
        return;
      }
      values.imageIds = fileList.map(item => item.uid).join(",");
      dispatch({
        type: "face/saveFaceData",
        payload: {
          values
        }
      }).then(() => {
        this.onRefreshFacePage(searchValue, openType === 'edit' ? current : 1, pageSize);
        this.closeFaceModal();
      });
    }
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

    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        operatorKey: 'face-delete',
        text: '删除',
        onClick: this.onDeleteFace,
      });
    }
    return {buttonList};
  };

  render() {
    const {
      loading,
      face: {
        faceList,
        total,
        current,
        pageSize,
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
      height: window.innerHeight - 320,
      dataSource: faceList,
      selectedRowKeys: this.state.selectedRowKeys,
      loading: loading.effects['face/getFaceList'],
      total,
      current,
      pageSize,
      onTableSelectChange: (rowKeys, rows) => this.setState({selectedRowKeys: rowKeys, selectedRows: rows,}),
      onTablePageChange: (current, pageSize) => this.onRefreshFacePage(this.state.searchValue, current, pageSize),
      onShowSizeChange: (current, pageSize) => this.onRefreshFacePage(this.state.searchValue, current, pageSize),
      onOperator: (record) => this.openFaceModal(record, "view"),
    };
    // 详情弹窗
    const faceModalProps = {
      visible: this.state.faceModalVisible,
      okLoading: loading.effects['face/saveFaceData'],
      typeDefaultValue: (this.state.searchValue.userType || undefined),
      openType: this.state.openType,
      dataSource: this.state.faceModel,
      fileList: this.state.fileList,
      validatorFaceModel: validatorFaceModel,
      onFileListChange: (fileList) => this.setState({fileList}),
      onOk: this.onFaceModalOk,
      onCancel: this.closeFaceModal,
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
        <FaceModal {...faceModalProps} onRef={r => this.faceModal = r}/>
      </PageHeaderWrapper>
    );
  }
}

export default FaceManage;
