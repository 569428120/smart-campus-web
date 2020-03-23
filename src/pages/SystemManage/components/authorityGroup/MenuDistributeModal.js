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
      menuList,
      selectedRowKeys,
      onPcMenuEdit,
      onPcMenuDelete,
      onMenuSelect,
      onOk,
      onCancel
    } = this.props;

    const buttonList = [];
    // 编辑
    if (onPcMenuEdit && openType === 'view') {
      buttonList.push({
        icon: '',
        type: 'primary',
        text: '编辑',
        operatorKey: 'authority-to-menu-edit',
        onClick: () => onPcMenuEdit("edit"),
      });
    }
    // 撤回
    if (onPcMenuEdit && openType === 'edit') {
      buttonList.push({
        icon: '',
        type: '',
        text: '撤回',
        operatorKey: 'authority-to-menu-edit',
        onClick: () => {
          Modal.confirm({
            title: '确认是否撤回',
            content: '撤回后编辑的数据将不生效，请确认是否撤回.',
            okText: '确认',
            cancelText: '取消',
            onOk: () => onPcMenuEdit("view"),
            onCancel: () => {
            }
          });
        },
      });
    }

    // 操作按钮
    const operatorButtonProps = {
      buttonList
    };

    // 表格组件参数
    const pcMenuTableProps = {
      dataSource: menuList,
      loading,
      selectedRowKeys,
      onTableSelect: openType === 'edit' ? onMenuSelect : undefined
    };

    return <Modal
      title={"权限菜单"}
      destroyOnClose={true}
      visible={visible}
      onOk={onOk}
      bodyStyle={{height: window.innerHeight * 0.7}}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="保存"
      cancelText="取消"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="PC端菜单" key="1">
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
  // 操作类型
  openType: PropTypes.string,
  // 加载状态
  loading: PropTypes.bool,
  // 选择
  selectedRowKeys: PropTypes.string,
  // 已经分配的
  menuList: PropTypes.array,
  // 编辑菜单
  onPcMenuEdit: PropTypes.func,
  // 菜单选择
  onMenuSelect: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

MenuDistributeModal.defaultProps = {};

export default MenuDistributeModal;
