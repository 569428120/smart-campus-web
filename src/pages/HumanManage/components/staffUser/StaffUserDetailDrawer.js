import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Drawer, Tabs} from "antd";

const {TabPane} = Tabs;

class StaffUserDetailDrawer extends PureComponent {
  render() {
    const {
      visible,
      onTabsChange,
      onClose,
    } = this.props;

    return <Drawer
      placement={'bottom'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <Tabs defaultActiveKey="1" onChange={onTabsChange}>
        <TabPane tab="基本信息" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="联系方式" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </Drawer>;
  }
}

StaffUserDetailDrawer.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 取消方法
  onClose: PropTypes.func,
};

StaffUserDetailDrawer.defaultProps = {};

export default StaffUserDetailDrawer;
