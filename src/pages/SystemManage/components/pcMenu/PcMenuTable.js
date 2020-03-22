import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onShowView => [
  {
    title: '名称',
    dataIndex: 'menuName',
    width: '30%',
    render: (text, record) => (record.menuName || record.operateName)
  },
  {
    title: '级别',
    dataIndex: 'menuLevel',
    width: '10%',
    render: text => text === 4 ? '按钮操作' : `${text}级菜单`
  },
  {
    title: '路由或编码',
    dataIndex: 'route',
    width: '12%',
    render: (text, record) => (record.route || record.operateCode)
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
        <a onClick={() => onShowView(record)}>查看详情</a>
      </Fragment>
    ),
  },
];

/**
 *  区域管理表格展示组件
 */
class PcMenuTable extends PureComponent {
  render() {
    const {dataSource, loading, selectedRowKeys, onTableSelectChange, onTableSelect, onShowView} = this.props;

    const rowSelection = {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
      onSelect: onTableSelect,
    };

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onShowView),
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

PcMenuTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onTableSelect: PropTypes.func,
  onShowView: PropTypes.func,
};
PcMenuTable.defaultProps = {};

export default PcMenuTable;
