import React, {PureComponent} from 'react';
import {connect} from "dva/index";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/pages/common.less';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';


@connect(({loading, authorityGroup}) => ({
  loading,
  authorityGroup,
}))
class AuthorityGroup extends PureComponent {

  state = {
    searchValue: {},//  搜索条件
    selectedRowKeys: [],
    selectedRows: [],
    authorityGroupModalVisible: false,// 新增修改窗口
    openType: '',// 操作类型
    authorityGroupModel: {}, // 弹窗数据
  };

  /**
   *  删除
   */
  onDeleteAuthorityGroup = (groupIds) => {

  };

  /**
   *   打开新增编辑弹窗
   * @param authorityGroupModel
   * @param openType
   */
  openAuthorityGroupModal = (authorityGroupModel, openType) => {
    this.setState({
      authorityGroupModalVisible: true,
      authorityGroupModel,
      openType
    })
  };


  /**
   *  关闭弹窗
   */
  closeAuthorityGroupModal = () => {
    this.setState({
      authorityGroupModalVisible: false
    });
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const {selectedRowKeys, selectedRows} = this.state;
    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新建',
      operatorKey: 'authority-group-add',
      onClick: () => this.openAuthorityGroupModal('add', {}),
    });
    // 更新按钮，选择一个的时候显示
    if ((selectedRows || []).length === 1) {
      buttonList.push({
        icon: '',
        type: '',
        text: '更新',
        operatorKey: 'authority-group-update',
        onClick: () => this.openAuthorityGroupModal('edit', selectedRows[0]),
      });
    }

    // 下拉菜单按钮
    const dropdownList = [];
    // 大于0 就显示
    if ((selectedRowKeys || []).length > 0) {
      dropdownList.push({
        operatorKey: 'authority-group-delete',
        text: '删除',
        onClick: this.onDeleteAuthorityGroup,
      });
    }
    return {buttonList, dropdownList};
  };

  render() {
    const {
      loading,
      authorityGroup: {
        authorityGroupList,
        total,
        current,
        pageSize
      }
    } = this.props;

    // 搜索参数
    const searchFormProps = {};
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm {...searchFormProps} />
            </div>
            <div className={styles.tableListOperator}>
              <OperatorButton {...operatorButtonProps} />
            </div>
            <AuthorityGroupTable {...pcMenuTableProps} />
          </div>
        </Card>
        <AuthorityGroupModal {...pcMenuModalProps}/>
      </PageHeaderWrapper>
    );
  }
}

export default AuthorityGroup;
