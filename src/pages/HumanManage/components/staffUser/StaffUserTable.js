import React, {Fragment, PureComponent} from 'react';
import {List} from 'antd';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '用户类型',
      dataIndex: 'user_type',
      width: '10%',
    },
    {
      title: '身份证',
      dataIndex: 'user_type',
      width: '15%',
    },
    {
      title: '工号',
      dataIndex: 'user_type',
      width: '12%',
    },
    {
      title: '登录设置',
      dataIndex: 'userName',
      width: '12%',
      render: text => (text || '') === '' ? "未设置" : "已设置"
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ];
  if (onOperator) {
    columns.push({
      title: '操作',
      width: '10%',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => onOperator(record)}>权限</a>
        </Fragment>
      ),
    })
  }
  return columns;
};

/**
 *  权限表格
 */
class StaffUserTable extends PureComponent {

  getExpandedRowRender = (record) => {
    return <List
      header={<div>所属分组</div>}
      stype={{width: '100%', textAlign: 'center'}}
      bordered
      dataSource={[{id: "1", groupName: "测试组1"}]}
      renderItem={({id, groupName}) => (
        <List.Item>
          {groupName}
        </List.Item>
      )}
    />
  };

  render() {
    const {
      dataSource,
      total,
      current,
      pageSize,
      loading,
      selectedRowKeys,
      onTableSelectChange,
      onTablePageChange,
      onShowSizeChange,
      onOperator
    } = this.props;

    const rowSelection = {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
    };

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onOperator),
      expandedRowRender: this.getExpandedRowRender,
      total,
      current,
      pageSize,
      onTablePageChange,
      onShowSizeChange
    };

    return <DataTable {...dataTableProps} />;
  }
}

StaffUserTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
StaffUserTable.defaultProps = {};

export default StaffUserTable;
