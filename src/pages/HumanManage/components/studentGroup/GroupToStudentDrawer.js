import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Drawer, Tabs} from "antd";

const {TabPane} = Tabs;

class GroupToStudentDrawer extends PureComponent {
  render() {
    const {
      visible,
      onTabsChange,
      onClose,
    } = this.props;

    return <Drawer
      handler={<span>"学生信息"</span>}
      placement={'bottom'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <div>学生列表</div>
    </Drawer>;
  }
}

GroupToStudentDrawer.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 取消方法
  onClose: PropTypes.func,
};

GroupToStudentDrawer.defaultProps = {};

export default GroupToStudentDrawer;
