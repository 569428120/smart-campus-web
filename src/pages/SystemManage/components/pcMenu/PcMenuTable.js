import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onShowView => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'menuName',
      width: '20%',
      render: (text, record) => (record.menuName || record.operateName)
    },
    {
      title: '级别',
      dataIndex: 'menuLevel',
      width: '15%',
      render: text => text === 4 ? '按钮操作' : `${text}级菜单`
    },
    {
      title: '路由或编码',
      dataIndex: 'route',
      width: '20%',
      render: (text, record) => (record.route || record.operateCode)
    },
    {
      title: '描述',
      dataIndex: 'description',
    }
  ];

  if (onShowView) {
    columns.push({
      title: '操作',
      width: '10%',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => onShowView(record)}>查看详情</a>
        </Fragment>
      ),
    })
  }
  return columns;
};

/**
 *  区域管理表格展示组件
 */
class PcMenuTable extends PureComponent {
  render() {
    const {dataSource, loading, height, selectedRowKeys, onTableSelectChange, onTableSelect, onShowView} = this.props;

    const rowSelection = (onTableSelectChange || onTableSelect) ? {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
      onSelect: onTableSelect,
    } : undefined;


    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      height,
      columns: tableColumns(onShowView),
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

PcMenuTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  height: PropTypes.number,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onTableSelect: PropTypes.func,
  onShowView: PropTypes.func,
};
PcMenuTable.defaultProps = {};

export default PcMenuTable;
