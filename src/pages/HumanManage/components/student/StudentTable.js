import React, {Fragment, PureComponent} from 'react';
import {Badge} from "antd";
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';
import StudentContactTable from "./StudentContactTable";

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => {
  const columns = [
    {
      title: '班级',
      dataIndex: 'groupName',
      width: '25%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '学号',
      dataIndex: 'studentCode',
      width: '12%',
    },
    {
      title: '家庭住址',
      dataIndex: 'address',
    },
  ];
  if (onOperator) {
    columns.push({
      title: '操作',
      width: '12%',
      render: (text, record) => {
        const badge = (record.studentContactList || []).length <= 0 ? <Badge status="error"/> : null;
        return <Fragment>
          {badge}<a onClick={() => onOperator(record)}>家长设置</a>
        </Fragment>
      },
    })
  }
  return columns;
};

/**
 *  权限表格
 */
class StudentTable extends PureComponent {

  expandedRowRender = (record) => {
    const {studentContactList} = (record || {});
    const studentContactTableProps = {
      height: 210,
      dataSource: studentContactList,
      loading: false,
    };
    return <Fragment>
      <StudentContactTable {...studentContactTableProps}/>
    </Fragment>;
  };

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
      pagination: true,
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onOperator),
      expandedRowRender: this.expandedRowRender,
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

StudentTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
StudentTable.defaultProps = {};

export default StudentTable;
