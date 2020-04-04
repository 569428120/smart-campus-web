import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onTimeQuantumCheck => [
  {
    title: '分组名称',
    dataIndex: 'groupName',
    width: '15%',
  },
  {
    title: '分组编码',
    dataIndex: 'groupCode',
    width: '10%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '8%',
  },
  {
    title: '时间段',
    dataIndex: 'timeQuantum',
    render: (text, record) => {
      return <a onClick={() => onTimeQuantumCheck(record)}>{text}</a>
    }
  }
];

/**
 *  权限表格
 */
class AccessDistributionTable extends PureComponent {
  render() {
    const {dataSource, loading, selectedRowKeys, onTableSelectChange, onTimeQuantumCheck} = this.props;

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
      columns: tableColumns(onTimeQuantumCheck),
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

AccessDistributionTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onTimeQuantumCheck: PropTypes.func,
};
AccessDistributionTable.defaultProps = {};

export default AccessDistributionTable;
