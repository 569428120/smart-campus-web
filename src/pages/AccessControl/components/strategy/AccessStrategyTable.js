import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import DataTable from "../../../../components/SmartCampus/Table/DataTable";
import styles from '../../../../components/SmartCampus/Table/DataTable.less';
import enums from '../../config/enums';

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
    render: (text, record) => enums.StrategyStatus[text].value || ""
  },
];

/**
 *  权限表格
 */
class AuthorityGroupTable extends PureComponent {

  getRowClassName = (record) => {
    const {selectStrategyModel} = this.props;
    if (record.id === (selectStrategyModel || {}).id) {
      return styles.highlight;
    }
  };

  onTableRowClick = (record) => {
    const {selectStrategyModel, onRowClick} = this.props;
    if (record.id === (selectStrategyModel || {}).id) {
      return;
    }
    onRowClick && onRowClick(record);
  };

  render() {
    const {
      height,
      dataSource,
      total,
      current,
      pageSize,
      selectStrategyModel,
      loading,
      selectedRowKeys,
      onTableSelectChange,
      onTablePageChange,
      onTablePageSizeChange,
      onOperator
    } = this.props;

    const rowSelection = {
      columnTitle: '选择',
      columnWidth: 40,
      selectedRowKeys,
      onChange: onTableSelectChange,
    };

    const onRow = (record) => {
      return {
        onClick: () => this.onTableRowClick(record)
      }
    };

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowClassName: this.getRowClassName,
      height,
      rowSelection,
      dataSource,
      total,
      current,
      pageSize,
      loading,
      onRow,
      columns: tableColumns(onOperator),
      onTablePageChange,
      onTablePageSizeChange,
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
