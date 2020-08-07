import React, {Fragment, PureComponent} from 'react';
import DataTable from '../Table/DataTable';
import PropTypes from 'prop-types';
import {Input} from "antd/lib/index";

const {Search} = Input;

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = () => {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '身份证(学号)',
      dataIndex: 'user_type',
      width: '15%',
      render: (text, record) => (record.userIdentity || record.userJobCode)
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      width: '12%',
    }
  ];
};

/**
 *  权限表格
 */
class UserTable extends PureComponent {

  state = {
    searchValue: "",
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  onSearchChange = (e) => {
    const {value: searchValue} = e.target;
    this.setState({
      searchValue
    })
  };

  render() {
    const {
      height,
      selectType,
      dataSource,
      total,
      current,
      pageSize,
      loading,
      selectedRowKeys,
      onSearch,
      onTableSelectChange,
      onTablePageChange,
      onTablePageSizeChange
    } = this.props;

    const rowSelection = {
      type: selectType,
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
      columns: tableColumns(),
      total,
      current,
      pageSize,
      onTablePageChange,
      onTablePageSizeChange,
    };

    return <div style={{textAlign: 'center', padding: '10px'}}>
      <Search style={{marginBottom: 8, width: '60%'}}
              value={this.state.searchValue}
              onChange={this.onSearchChange}
              onSearch={onSearch}
              placeholder="请输入"
      />
      <DataTable height={height - 58} {...dataTableProps} />
    </div>;
  }
}

UserTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
};
UserTable.defaultProps = {};

export default UserTable;
