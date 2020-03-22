import React, {PureComponent} from 'react';
import {Modal, Tabs} from "antd";
import PropTypes from "prop-types";
import {modalWidth} from '@/utils/utils';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import PcMenuTable from '@/pages/SystemManage/components/pcMenu/PcMenuTable';


const {TabPane} = Tabs;

/**
 *  菜单分配弹窗
 */
class MenuDistributeModal extends PureComponent {
  render() {
    const {
      visible,
      openType,
      loading,
      groupToMenuList,
      selectedRowKeys,
      onPcMenuAdd,
      onPcMenuDelete,
      onMenuSelect,
      onOk,
      onCancel
    } = this.props;

    const buttonList = [];
    if (onPcMenuAdd) {
      buttonList.push({
        icon: 'plus',
        type: 'primary',
        text: '新增',
        operatorKey: 'authority-to-menu-add',
        onClick: onPcMenuAdd,
      });
    }
    if ((selectedRowKeys || []).length > 0 && onPcMenuDelete) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        operatorKey: 'authority-to-menu-delete',
        onClick: onPcMenuDelete,
      });
    }
    // 操作按钮
    const operatorButtonProps = {
      buttonList
    };

    // 表格组件参数
    const pcMenuTableProps = {
      dataSource: groupToMenuList,
      loading,
      selectedRowKeys,
      onTableSelect: onMenuSelect
    };

    return <Modal
      title={"权限菜单"}
      destroyOnClose={true}
      visible={visible}
      onOk={onOk}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          <OperatorButton {...operatorButtonProps} />
          <PcMenuTable {...pcMenuTableProps}/>
        </TabPane>
      </Tabs>
    </Modal>;
  }
}

MenuDistributeModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 加载状态
  loading: PropTypes.bool,
  // 选择
  selectedRowKeys: PropTypes.string,
  // 已经分配的
  groupToMenuList: PropTypes.array,
  // 新增菜单
  onPcMenuAdd: PropTypes.func,
  // 删除菜单
  onPcMenuDelete: PropTypes.func,
  // 菜单选择
  onMenuSelect: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

MenuDistributeModal.defaultProps = {};

export default MenuDistributeModal;
