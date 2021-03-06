import React, {Fragment, PureComponent} from 'react';
import {List} from 'antd';
import PropTypes from 'prop-types';
import DataTable from "../../../../components/SmartCampus/Table/DataTable";
import appEnums from '../../../../config/enums'

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => {
  const columns = [
    {
      title: '用户组',
      dataIndex: 'groupName',
      width: '15%',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      width: '10%',
      render: (text, record) => (appEnums.UserTypes[text] || {}).value
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '身份证(学号)',
      dataIndex: 'userCode',
      width: '12%',
    },
    {
      title: '卡类型',
      dataIndex: 'cardType',
      width: '10%',
    },
    {
      title: '卡号',
      dataIndex: 'cardNumber',
      width: '12%',
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
class CardTable extends PureComponent {


  render() {
    const {
      height,
      dataSource,
      total,
      current,
      pageSize,
      loading,
      selectedRowKeys,
      onTableSelectChange,
      onTablePageChange,
      onShowSizeChange,
      onRowCheck,
      onOperator
    } = this.props;

    const rowSelection = {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
    };

    const onRow = (record) => {
      return {
        onClick: event => onRowCheck && onRowCheck(record), // 点击行
      }
    };

    // 表格参数
    const dataTableProps = {
      height,
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onOperator),
      total,
      current,
      pageSize,
      onTablePageChange,
      onShowSizeChange,
      onRow
    };

    return <DataTable {...dataTableProps} />;
  }
}

CardTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
CardTable.defaultProps = {};

export default CardTable;
