import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Form, Icon, Input, Row, Select} from 'antd';
import styles from '@/pages/List/TableList.less';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class SearchForm extends PureComponent {
  state = {
    expandForm: false, // 是否展开搜索框
  };

  /**
   *  展开
   */
  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  /**
   *  重置操作
   */
  handleFormReset = () => {
    const {form, onFormReset} = this.props;
    form.resetFields();
    onFormReset && onFormReset({});
  };

  /**
   *  搜索操作
   * @param e
   */
  handleSearch = e => {
    e.preventDefault();
    const {onSearch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      onSearch && onSearch(values);
    });
  };

  /**
   *  选择值标号
   * @param type
   */
  onTypeChange = (type) => {
    const {onTypeChange, form} = this.props;
    form.resetFields(['groupName', 'groupCode', 'status']);
    onTypeChange && onTypeChange(type);
  };

  /**
   *  简单的表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      type,
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={4} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type', {
                initialValue: type,
              })
              (<Select onChange={this.onTypeChange}>
                <Select.Option key={"1"} value={"1"}>{"学生分组"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"职工分组"}</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="分组名称">
              {getFieldDecorator('groupName')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="分组编码">
              {getFieldDecorator('groupCode')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(<Select allowClear placeholder="请输入">
                <Select.Option key={"1"} value={"1"}>{"未分配"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"已分配"}</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const {expandForm} = this.state;
    return this.renderSimpleForm();
  }
}

// 属性说明
SearchForm.propTypes = {
  type: PropTypes.string,
  onSearch: PropTypes.func,
  onFormReset: PropTypes.func,
  onTypeChange: PropTypes.func,
};

// 默认值
SearchForm.defaultProps = {};
export default SearchForm;
