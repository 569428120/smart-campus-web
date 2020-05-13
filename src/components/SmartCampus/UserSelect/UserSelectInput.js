import React, {PureComponent} from 'react';
import {Input} from "antd";
import UserGroupModal from "./UserGroupModal";

class UserSelectInput extends PureComponent {

  state = {
    visible: false,
  };

  triggerChange = changedValue => {
    const {onChange, value} = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  /**
   *  打开用户选择弹窗
   */
  openUserSelectModal = () => {
    this.setState({
      visible: true
    })
  };

  /**
   *   选择
   * @param selectUser
   */
  onModalOk = (selectUser) => {
    this.triggerChange({})
  };

  onModalCancel = () => {
    this.setState({
      visible: false
    })
  };

  render() {
    const {value, disabled} = this.props;
    const userGroupModalProps = {
      visible: this.state.visible,
      onOk: this.onModalOk,
      onCancel: this.onModalCancel
    };
    return <span style={{width: '100%'}}>
      <Input style={{width: '70%'}} disabled={disabled} value={value}/>
      {!disabled ? null : <a style={{width: '30%'}} onClick={this.openUserSelectModal}> 选择人员</a>}
      <UserGroupModal {...userGroupModalProps}/>
    </span>;
  }
}

export default UserSelectInput;
