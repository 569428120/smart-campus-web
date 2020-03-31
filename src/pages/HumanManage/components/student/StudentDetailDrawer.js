import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Drawer, Tabs} from "antd";
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import StudentToGuardianTable from "./StudentToGuardianTable";

const {TabPane} = Tabs;

class StudentDetailDrawer extends PureComponent {

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows, studentModel, openStudentModal, deleteStudentToGuardians} = this.props;
    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新增',
      operatorKey: 'student-guardian-add',
      onClick: () => openStudentModal(studentModel, {}, 'add'),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'student-guardian-edit',
        onClick: () => openStudentModal(studentModel, selectedRows[0], 'edit'),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'student-guardian-delete',
        text: '删除',
        onClick: () => deleteStudentToGuardians(studentModel.id, selectedRowKeys),
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      visible,
      onTabsChange,
      studentToGuardianList,
      selectedRowKeys,
      onTableSelectChange,
      loading,
      onClose,
    } = this.props;

    const operatorButtonProps = this.getOperatorButtonProps();
    const studentToGuardianTableProps = {
      dataSource: studentToGuardianList,
      loading,
      selectedRowKeys,
      onTableSelectChange,
    };
    return <Drawer
      placement={'bottom'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <Tabs defaultActiveKey="1" onChange={onTabsChange}>
        <TabPane tab="联系人列表" key="1">
          <OperatorButton {...operatorButtonProps} />
          <StudentToGuardianTable {...studentToGuardianTableProps}/>
        </TabPane>
      </Tabs>
    </Drawer>;
  }
}

StudentDetailDrawer.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  selectedRowKeys: PropTypes.array,
  openStudentModal: PropTypes.func,
  loading: PropTypes.bool,
  deleteStudentToGuardians: PropTypes.func,
  onTableSelectChange: PropTypes.func,
  // 取消方法
  onClose: PropTypes.func,
};

StudentDetailDrawer.defaultProps = {};

export default StudentDetailDrawer;
