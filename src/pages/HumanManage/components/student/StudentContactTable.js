import React, {useEffect} from 'react';
import {Input, Select, Form} from "antd";
import DataTable from '@/components/SmartCampus/Table/DataTable';
import enums from '../../config/enums';


const getFamilyTypeSelectOptions = () => {
  return Object.keys(enums.FamilyType).map(pKey => {
    const {key, value} = (enums.FamilyType[pKey] || {});
    return <Select.Option key={key} value={key}>{value}</Select.Option>
  });
};

const tableColumns = (getFieldDecorator, onInputFormData) => [
  {
    title: '关系类型',
    dataIndex: 'familyType',
    width: '12%',
    render: (text, record) => {
      if (!record.isNew) {
        return (enums.FamilyType[text] || {}).value;
      }
      return <Form.Item>
        {getFieldDecorator('familyType', {
          initialValue: undefined,
          rules: [
            {
              required: true,
              message: '关系类型必填',
            }
          ],
        })(<Select onBlur={onInputFormData} style={{width: "90%"}} placeholder="请选择">
          {getFamilyTypeSelectOptions()}
        </Select>)}
      </Form.Item>
    },
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '15%',
    render: (text, record) => {
      if (!record.isNew) {
        return text;
      }
      return <Form.Item>
        {getFieldDecorator('name', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '姓名必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input onBlur={onInputFormData} style={{width: "90%"}} placeholder="请输入姓名，例如：张三"/>)}
      </Form.Item>
    },
  },
  {
    title: '手机号码',
    dataIndex: 'contact',
    width: '25%',
    render: (text, record) => {
      if (!record.isNew) {
        return text;
      }
      return <Form.Item>
        {getFieldDecorator('contact', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '手机号码必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input onBlur={onInputFormData} style={{width: "90%"}} placeholder="请输入名称，例如：xxxxxxxxxx"/>)}
      </Form.Item>
    },
  },
];
export default function StudentContactTable({
                                              form,
                                              height,
                                              dataSource,
                                              selectedRowKeys,
                                              loading,
                                              onTableSelectChange,
                                              onPutStudentContact,
                                            }) {
  const {getFieldDecorator, validateFields} = (form || {});
  // 业务方法
  const onInputFormData = () => {
    validateFields((errors, values) => {
      if (errors === null) {
        onPutStudentContact && onPutStudentContact(values);
      }
    });
  };

  const rowSelection = onTableSelectChange ? {
    columnWidth: 40,
    selectedRowKeys,
    onChange: onTableSelectChange,
  } : null;

  const dataTableProps = {
    height,
    pagination: false,
    rowKey: 'id',
    rowSelection,
    dataSource,
    loading,
    columns: tableColumns(getFieldDecorator, onInputFormData)
  };

  return <DataTable {...dataTableProps} />
}
