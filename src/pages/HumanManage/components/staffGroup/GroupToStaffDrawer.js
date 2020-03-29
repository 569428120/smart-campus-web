import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Drawer, Tabs} from "antd";

const {TabPane} = Tabs;

class GroupToStaffDrawer extends PureComponent {
  render() {
    const {
      visible,
      onTabsChange,
      onClose,
    } = this.props;

    return <Drawer
      handler={<span>"员工列表"</span>}
      placement={'bottom'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <div>员工列表</div>
    </Drawer>;
  }
}

GroupToStaffDrawer.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 取消方法
  onClose: PropTypes.func,
};

GroupToStaffDrawer.defaultProps = {};

export default GroupToStaffDrawer;
