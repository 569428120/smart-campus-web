import React, {PureComponent} from 'react';
import {connect} from "dva/index";
import PropTypes from "prop-types";
import {Modal, Row, Col} from "antd";
import UserGroupTree from "./UserGroupTree";
import UserTable from "./UserTable";
import enums from '../../../config/enums';

const height = 400;

@connect(({loading, userSelect}) => ({
  loading,
  userSelect,
}))
class UserGroupModal extends PureComponent {
  state = {
    typeValue: enums.UserTypes.Student.key,
    groupId: "root",
    searchValue: "",
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  onSubmit = () => {
    const {onOk} = this.props;
    onOk && onOk();
  };

  onRefreshUserGroupList = (typeValue) => {
    const {dispatch} = this.props;
    dispatch({
      type: "userSelect/getUserGroupList",
      payload: {
        userType: typeValue
      }
    });
    this.setState({
      typeValue
    });
  };

  /**
   *  刷新用户
   * @param searchValue
   * @param groupId
   * @param userType
   * @param current
   * @param pageSize
   */
  onRefreshUserPage = (searchValue, groupId, userType, current, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type: "userSelect/getUserList",
      payload: {
        groupId,
        userType,
        searchValue,
        current,
        pageSize
      }
    });
    this.setState({
      searchValue,
      groupId,
    })
  };

  onTypeSelectChange = (typeValue) => {
    const {selectType, onSelectChange} = this.props;
    const searchValue = "";
    this.onRefreshUserGroupList(typeValue);
    this.onRefreshUserPage(searchValue, "root", typeValue, 1, 15);
    this.userGroupTree && this.userGroupTree.setState({
      searchValue,
      expandedKeys: [],
      autoExpandParent: true,
    });
    this.userTable && this.userTable.setState({
      searchValue
    });
    if (selectType !== "checkbox") {
      onSelectChange && onSelectChange([], []);
    }
  };

  render() {
    const {
      visible,
      selectType,
      selectedRowKeys,
      onSelectChange,
      onOk,
      onCancel,
      loading,
      userSelect: {
        userTypeList,
        groupList,
        userList,
        total,
        current,
        pageSize,
      }
    } = this.props;

    const {
      searchValue,
      typeValue,
      groupId,
    } = this.state;

    // 用户组树参数
    const userGroupTreeProps = {
      typeValue: this.state.typeValue,
      loading: loading.effects["userSelect/getUserGroupList"],
      userTypeList: userTypeList,
      userGroupList: groupList,
      selectedKeys: [this.state.groupId],
      onSelectChange: (keys, e) => this.onRefreshUserPage(searchValue, (keys || []).length > 0 ? keys[0] : "root", typeValue, current, pageSize),
      onTypeChange: this.onTypeSelectChange,
    };
    const userTableProps = {
      dataSource: userList,
      selectType,
      total,
      current,
      pageSize,
      loading: loading.effects["userSelect/getUserList"],
      selectedRowKeys,
      onSearch: (searchValue) => this.onRefreshUserPage(searchValue, groupId, typeValue, 1, pageSize),
      onTableSelectChange: onSelectChange,
      onTablePageChange: (current, pageSize) => this.onRefreshUserPage(searchValue, groupId, typeValue, current, pageSize),
      onTablePageSizeChange: (current, pageSize) => this.onRefreshUserPage(searchValue, groupId, typeValue, 1, pageSize),
    };

    return <Modal
      title={"人员选择"}
      destroyOnClose={true}
      visible={visible}
      onOk={this.onSubmit}
      width={900}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Row style={{height}}>
        <Col span={6} style={{border: '1px solid #d9d9d9'}}>
          <UserGroupTree height={height} {...userGroupTreeProps} onRef={r => this.userGroupTree = r}/>
        </Col>
        <Col span={18} style={{border: '1px solid #d9d9d9'}}>
          <UserTable height={height} {...userTableProps} onRef={r => this.userTable = r}/>
        </Col>
      </Row>
    </Modal>;
  }
}

UserGroupModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 选择的类型 checkbox or radio
  selectType: PropTypes.string,
  // 默认选择
  defaultSelectKeys: PropTypes.array,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

UserGroupModal.defaultProps = {
  selectType: "radio",
};

export default UserGroupModal;
