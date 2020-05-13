import React, {PureComponent} from 'react';
import {connect} from "dva/index";
import PropTypes from "prop-types";
import {modalWidth} from "../../../utils/utils";
import {Modal, Row, Col} from "antd";
import UserGroupTree from "./UserGroupTree";
import UserTable from "./UserTable";

const height = 500;

@connect(({loading, userSelect}) => ({
  loading,
  userSelect,
}))
class UserGroupModal extends PureComponent {
  state = {
    typeValue: undefined
  };

  onSubmit = () => {
    const {userSelect: {selectUser}, onOk} = this.props;
    onOk && onOk(selectUser);
  };

  render() {
    const {
      visible,
      onOk,
      onCancel,
      userSelect: {
        userTypeList,
        groupList,
        selectUser
      }
    } = this.props;
    // 用户组树参数
    const userGroupTreeProps = {
      typeValue: this.state.typeValue,
      typeDefaultValue: userTypeList ? userTypeList[0].key : null,
      userTypeList: userTypeList,
      userGroupList: groupList,
      onTypeChange: (typeValue) => this.setState({typeValue})
    };
    const userTableProps = {};

    return <Modal
      title={"人员选择"}
      destroyOnClose={true}
      visible={visible}
      onOk={this.onSubmit}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Row style={{height}}>
        <Col span={6} style={{border: '1px solid #d9d9d9'}}>
          <UserGroupTree height={height} {...userGroupTreeProps}/>
        </Col>
        <Col span={18} style={{border: '1px solid #d9d9d9'}}>
          <UserTable height={height} {...userTableProps}/>
        </Col>
      </Row>
    </Modal>;
  }
}

UserGroupModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

UserGroupModal.defaultProps = {};

export default UserGroupModal;
