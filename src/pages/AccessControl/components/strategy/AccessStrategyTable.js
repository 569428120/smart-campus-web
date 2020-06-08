import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => [
  {
    title: '策略名称',
    dataIndex: 'strategyName',
    width: '15%',
  },
  {
    title: '状态',
    dataIndex: 'strategyStatus',
    width: '8%',
  },
  {
    title: '时间段',
    dataIndex: 'time',
    width: '25%',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '操作',
    dataIndex: 'strategyStatus',
    width: '10%',
    render: (text, record) => {
      // 启用状态
      if (text && text.toLowerCase() === 'enable') {
        return (
          <Fragment>
            <a onClick={() => onOperator(record, 'unenable')}>禁用</a>
          </Fragment>
        )
      }
      return (
        <Fragment>
          <a onClick={() => onOperator(record, 'enable')}>启用</a>
        </Fragment>
      )
    },
  },
];

/**
 *  权限表格
 */
class AuthorityGroupTable extends PureComponent {
  render() {
    const {dataSource, loading, selectedRowKeys, onTableSelectChange, onOperator} = this.props;

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
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

AuthorityGroupTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
AuthorityGroupTable.defaultProps = {};

export default AuthorityGroupTable;
