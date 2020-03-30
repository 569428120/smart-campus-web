import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Drawer, Tabs} from "antd";
import StudentTable from "../student/StudentTable";

const {TabPane} = Tabs;

class GroupToStudentDrawer extends PureComponent {
  render() {
    const {
      visible,
      groupToStudentList,
      total,
      current,
      pageSize,
      loading,
      onStudentTablePageChange,
      onClose,
    } = this.props;

    const studentTableProps = {
      dataSource: groupToStudentList,
      loading,
      onTablePageChange: onStudentTablePageChange,
      total,
      current,
      pageSize,
    };

    return <Drawer
      handler={<span>"学生信息"</span>}
      placement={'bottom'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <StudentTable {...studentTableProps}/>
    </Drawer>;
  }
}

GroupToStudentDrawer.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 学生列表
  groupToStudentList: PropTypes.array,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  loading: PropTypes.bool,
  // 取消方法
  onClose: PropTypes.func,
};

GroupToStudentDrawer.defaultProps = {};

export default GroupToStudentDrawer;
