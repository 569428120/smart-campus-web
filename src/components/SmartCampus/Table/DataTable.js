import React, {PureComponent} from 'react';
import {Pagination, Table} from 'antd';
import styles from './DataTable.less';
import PropTypes from 'prop-types';

/**
 *  数据表格
 */
class DataTable extends PureComponent {
  render() {
    const {
      current,
      pageSize,
      total,
      pagination,
      height,
      onTablePageChange,
      onTablePageSizeChange,
      ...ret
    } = this.props;

    const tableHeight = (height || window.innerHeight - 360);
    const isPagination = (pagination === true || onTablePageChange);
    const paginationHeight = (isPagination ? 80 : 35);
    // 表格属性
    const tableProps = {
      className: styles.table,
      pagination: false,
      scroll: {y: tableHeight - paginationHeight},
      style: {height: tableHeight - paginationHeight + 35},
      ...ret,
    };

    // 分页组件
    const paginationProps = {
      defaultPageSize: 15,
      pageSizeOptions: ['15', '50', '100'],
      showQuickJumper: true,
      showSizeChanger: !!onTablePageChange,
      current,
      pageSize,
      total,
      onChange: onTablePageChange,
      onShowSizeChange: onTablePageChange,
    };
    const paginationContent = isPagination ?
      <Pagination style={{marginTop: 10}} {...paginationProps} /> : null;
    return (
      <div style={{textAlign: 'right', height: (tableHeight)}}>
        <Table {...tableProps} />
        {paginationContent}
      </div>
    );
  }
}

DataTable.propTypes = {
  pagination: PropTypes.bool,
};
DataTable.defaultProps = {
  pagination: true,
};

export default DataTable;
