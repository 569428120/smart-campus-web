import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => {
  const columns = [
    {
      title: '分组名称',
      dataIndex: 'groupName',
      align: 'left',
      width: '25%',
    },
    {
      title: '分组编码',
      dataIndex: 'groupCode',
      width: '25%',
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
class StaffGroupTable extends PureComponent {
  render() {
    const {
      height,
      dataSource,
      loading,
      rowSelection,
      selectedRowKeys,
      onTableSelectChange,
      onRowCheck,
      onOperator
    } = this.props;

    const mRowSelection = (rowSelection || {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
    });

    const onRow = (record) => {
      return {
        onClick: event => onRowCheck && onRowCheck(record), // 点击行
      }
    };

    // 表格参数
    const dataTableProps = {
      height,
      rowKey: 'id',
      rowSelection: mRowSelection,
      dataSource,
      loading,
      onRow,
      columns: tableColumns(onOperator),
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

StaffGroupTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
StaffGroupTable.defaultProps = {};

export default StaffGroupTable;
