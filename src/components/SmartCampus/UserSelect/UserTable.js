import React, {Fragment, PureComponent} from 'react';
import DataTable from '../Table/DataTable';
import PropTypes from 'prop-types';
import {Input} from "antd/lib/index";

const {Search} = Input;

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = () => {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
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
    }
  ];
};

/**
 *  权限表格
 */
class UserTable extends PureComponent {

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
      height
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
      columns: tableColumns(),
      total,
      current,
      pageSize,
      onTablePageChange,
    };

    return <div style={{textAlign: 'center', padding: '10px'}}>
      <Search style={{marginBottom: 8, width: '60%'}} placeholder="请输入"/>
      <DataTable height={height - 88} {...dataTableProps} />
    </div>;
  }
}

UserTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
};
UserTable.defaultProps = {};

export default UserTable;
