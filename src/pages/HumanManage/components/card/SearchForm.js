import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select} from 'antd';
import styles from '@/pages/List/TableList.less';
import appEnums from '../../../../config/enums'

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class SearchForm extends React.PureComponent {
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
    form.resetFields(["name", "userCode", "cardNumber"]);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onFormReset(fieldsValue);
    });
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

  onUserTypeChange = (userType) => {
    const {form, onFormReset} = this.props;
    form.resetFields(["name", "userCode", "cardNumber"]);
    onFormReset({userType});
  };

  /**
   *  简单的表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;

    const typeOptions = Object.values(appEnums.UserTypes).map(({key, value}) => <Option key={key}
                                                                                        value={key}>{value}</Option>);

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={4} sm={24}>
            <FormItem label="用户类型">
              {getFieldDecorator('userType', {
                initialValue: appEnums.UserTypes.Student.key,
              })(
                <Select onChange={this.onUserTypeChange}>
                  {typeOptions}
                </Select>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input allowClear placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('userCode')(<Input allowClear placeholder="请输入工号，学号等"/>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="卡号">
              {getFieldDecorator('cardNumber')(<Input allowClear placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
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
  onSearch: PropTypes.func,
  onFormReset: PropTypes.func,
};

// 默认值
SearchForm.defaultProps = {};
export default SearchForm;
