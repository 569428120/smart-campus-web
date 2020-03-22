import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => [
  {
    title: '权限组名称',
    dataIndex: 'menuName',
    width: '25%',
    render: (text, record) => (record.menuName || record.operateName)
  },
  {
    title: '权限组编码',
    dataIndex: 'menuLevel',
    width: '25%',
    render: text => text === 4 ? '按钮操作' : `${text}级菜单`
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '操作',
    width: '10%',
    render: (text, record) => (
      <Fragment>
        <a onClick={() => onOperator(record)}>分配权限</a>
      </Fragment>
    ),
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
