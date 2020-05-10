import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import {Badge} from 'antd';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => {
  const columns = [
    {
      title: 'DeviceID',
      dataIndex: 'deviceId',
      width: '10%',
    },
    {
      title: '设备厂商',
      dataIndex: 'manufacturerName',
      width: '10%',
    },
    {
      title: '设备型号',
      dataIndex: 'manufacturerType',
      width: '10%',
    },
    {
      title: '网络地址',
      dataIndex: 'netAddress',
      width: '12%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
      render: (text, record) => <span><Badge status={text}/>{text}</span>
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
  ];
  if (onOperator) {
    columns.push({
      title: '操作',
      width: '10%',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => onOperator(record)}>设备调试</a>
        </Fragment>
      ),
    })
  }
  return columns;
};

/**
 *  权限表格
 */
class CarGateTable extends PureComponent {


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
      onRowCheck,
      onOperator
    } = this.props;

    const rowSelection = {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
    };

    const onRow = (record) => {
      return {
        onClick: event => onRowCheck && onRowCheck(record), // 点击行
      }
    };

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onOperator),
      total,
      current,
      pageSize,
      onTablePageChange,
      onShowSizeChange,
      onRow
    };

    return <DataTable {...dataTableProps} />;
  }
}

CarGateTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
CarGateTable.defaultProps = {};

export default CarGateTable;
