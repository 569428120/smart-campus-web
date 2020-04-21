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
      title: ' 人员名称',
      dataIndex: 'userName',
      width: '15%',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      width: '12%',
    },
    {
      title: '策略类型',
      dataIndex: 'strategy_type',
      width: '8%',
    },
    {
      title: '验证方式',
      dataIndex: 'mode',
      width: '10%',
    },
    {
      title: '出入',
      dataIndex: 'in_or_out',
      width: '8%',
    },
    {
      title: '出入时间',
      dataIndex: 'updateTime',
      width: '12%',
    }
  ];
  if (onOperator) {
    columns.push({
      title: '操作',
      width: '6%',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => onOperator(record)}>详情</a>
        </Fragment>
      ),
    });
    return columns;
  }
};

/**
 *  权限表格
 */
class PersonnelRecordTable extends PureComponent {
  render() {
    const {
      dataSource,
      loading,
      total,
      current,
      pageSize,
      onTablePageChange,
      onShowSizeChange,
      onShowDetail
    } = this.props;

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      dataSource,
      loading,
      total,
      current,
      pageSize,
      onTablePageChange,
      onShowSizeChange,
      columns: tableColumns(onShowDetail),
    };

    return <DataTable {...dataTableProps} />;
  }
}

PersonnelRecordTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  onTablePageChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  onShowDetail: PropTypes.func,
};
PersonnelRecordTable.defaultProps = {};

export default PersonnelRecordTable;
