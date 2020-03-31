import React, {Fragment, PureComponent} from 'react';
import {List} from 'antd';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = () => [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: '关系类型',
    dataIndex: 'user_type',
    width: '15%',
  },
  {
    title: '手机号码',
    dataIndex: 'phoneNumber',
    width: '15%',
  },
  {
    title: '证件号码',
    dataIndex: 'certificate',
    width: '15%',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

/**
 *  权限表格
 */
class StudentToGuardianTable extends PureComponent {


  render() {
    const {
      dataSource,
      loading,
      selectedRowKeys,
      onTableSelectChange,
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
      columns: tableColumns(null),
    };

    return <DataTable {...dataTableProps} />;
  }
}

StudentToGuardianTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
};
StudentToGuardianTable.defaultProps = {};

export default StudentToGuardianTable;
