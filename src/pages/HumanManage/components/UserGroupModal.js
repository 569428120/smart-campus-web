import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Modal} from "antd";
import StaffGroupTable from "./staffGroup/StaffGroupTable";

class UserGroupModal extends PureComponent {
  render() {
    const {
      visible,
      okLoading,
      onOk,
      onCancel,
      userGroupList,
      selectedRowKeys,
      onSelectChange,
      getCheckboxProps,
    } = this.props;

    const rowSelection = {
      type: "radio",
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      getCheckboxProps,
      onChange: onSelectChange,
    };

    const staffGroupTableProps = {
      height: 350,
      rowSelection,
      dataSource: userGroupList
    };

    return <Modal
      title="请选择目标分组"
      width={700}
      destroyOnClose={true}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={okLoading}
      okText="确认"
      cancelText="取消"
    >
      <StaffGroupTable {...staffGroupTableProps}/>
    </Modal>;
  }
}

UserGroupModal.propTypes = {
  isEdit: PropTypes.bool,
  height: PropTypes.number,
  userGroupList: PropTypes.array,
  onAddNode: PropTypes.func,
  onDeleteNode: PropTypes.func,
  onCopyNode: PropTypes.func,
  onMoveNode: PropTypes.func,
};

UserGroupModal.defaultProps = {
  isEdit: true
};

export default UserGroupModal;
