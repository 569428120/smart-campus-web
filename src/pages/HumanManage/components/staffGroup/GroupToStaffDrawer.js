import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Drawer, Tabs} from "antd";
import StaffUserTable from "../staffUser/StaffUserTable";

const {TabPane} = Tabs;

class GroupToStaffDrawer extends PureComponent {
  render() {
    const {
      visible,
      groupToStaffUserList,
      total,
      current,
      pageSize,
      loading,
      onStaffUserTablePageChange,
      onClose,
    } = this.props;

    const staffUserTableProps = {
      dataSource: groupToStaffUserList,
      total,
      current,
      pageSize,
      loading,
      onTablePageChange: onStaffUserTablePageChange
    };

    return <Drawer
      handler={<span>"员工列表"</span>}
      placement={'bottom'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <StaffUserTable {...staffUserTableProps}/>
    </Drawer>;
  }
}

GroupToStaffDrawer.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  onStaffUserTablePageChange: PropTypes.func,
  // 取消方法
  onClose: PropTypes.func,
};

GroupToStaffDrawer.defaultProps = {};

export default GroupToStaffDrawer;
