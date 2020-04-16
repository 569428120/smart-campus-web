import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => [
  {
    title: '流程名称',
    dataIndex: 'flowName',
    width: '20%',
  },
  {
    title: '流程类型',
    dataIndex: 'flowType',
    width: '10%',
  },
  {
    title: '发起时间',
    dataIndex: 'createTime',
    width: '10%',
  },
  {
    title: '处理时间',
    dataIndex: 'updateTime',
    width: '10%',
  },
  {
    title: '操作',
    width: '10%',
    render: (text, record) => (
      <Fragment>
        <a onClick={() => onOperator(record)}>审批</a>
      </Fragment>
    ),
  },
];

/**
 *  权限表格
 */
class FlowRecordTable extends PureComponent {
  render() {
    const {dataSource, loading, selectedRowKeys, onTableSelectChange, onOperator} = this.props;

    const rowSelection = onTableSelectChange ? {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
    } : null;

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onOperator),
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

FlowRecordTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  onOperator: PropTypes.func,
};
FlowRecordTable.defaultProps = {};

export default FlowRecordTable;
