import React, {PureComponent} from 'react';
import {Input, message} from "antd";
import UserGroupModal from "./UserGroupModal";
import enums from '../../../config/enums';

class UserSelectInput extends PureComponent {

  state = {
    visible: false,
    selectedRowKeys: [],
    selectedRows: []
  };

  triggerChange = changedValue => {
    const {onChange} = this.props;
    onChange && onChange(changedValue);
  };

  /**
   *  打开用户选择弹窗
   */
  openUserSelectModal = () => {
    const {value: selectedRows, typeDefaultValue} = this.props;
    const selectedRowKeys = (selectedRows || []).map(item => item.id);
    this.setState({
      visible: true,
      selectedRowKeys,
      selectedRows,
    }, () => {
      this.userGroupModal && this.userGroupModal.onTypeSelectChange((typeDefaultValue || enums.UserTypes.Student.key));
    });
  };

  /**
   *   选择
   */
  onModalOk = () => {
    const {selectedRows} = this.state;
    if ((selectedRows || []).length <= 0) {
      message.info("请选择人员");
      return;
    }
    this.triggerChange(selectedRows);
    this.onModalCancel();
  };

  onModalCancel = () => {
    this.setState({
      visible: false
    })
  };

  getUserList = () => {
    const {value: userList} = this.props;
    return (userList || []).map(({name, userCode, userIdentity, userJobCode, contact}) => `${name || ""}(${userCode || userIdentity || userJobCode || contact || ""})`)
  };

  render() {
    const {value, disabled, typeDefaultValue} = this.props;
    const userList = this.getUserList();
    const userGroupModalProps = {
      visible: this.state.visible,
      selectedRowKeys: this.state.selectedRowKeys,
      onSelectChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys, selectedRows}),
      onOk: this.onModalOk,
      onCancel: this.onModalCancel
    };
    const style = disabled ? null : {width: '82%'};
    return <span style={{width: '100%'}}>
      <Input style={style} disabled={disabled} value={(userList || []).join(",")}/>
      {disabled ? null : <a style={{width: '30%'}} onClick={this.openUserSelectModal}> 选择人员</a>}
      <UserGroupModal {...userGroupModalProps} onRef={r => this.userGroupModal = r}/>
    </span>;
  }
}

export default UserSelectInput;
