import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select} from 'antd';
import styles from '@/pages/List/TableList.less';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class SearchForm extends PureComponent {
  state = {
    expandForm: false, // 是否展开搜索框
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  resetFields = () => {
    const {form} = this.props;
    form.resetFields();
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
   *  简单的表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={6} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input allowClear placeholder="请输入姓名"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="学号">
              {getFieldDecorator('studentCode')(<Input allowClear placeholder="请输入学号"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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

  /**
   *  简单的表单
   * @returns {*}
   */
  renderAdvancedForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={6} sm={24}>
            <FormItem label="学生信息">
              {getFieldDecorator('name')(<Input allowClear placeholder="姓名、学号"/>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="班级">
              {getFieldDecorator('groupCode')(<Select allowClear placeholder="请输入">
                <Select.Option key={"1"} value={"1"}>{"测试组1测试组1测试组1"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"测试组2"}</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="联系人">
              {getFieldDecorator('userName')(<Select allowClear placeholder="请输入">
                <Select.Option key={"1"} value={"1"}>{"已设置"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"未设置"}</Select.Option>
              </Select>)}
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
               <a style={{marginLeft: 8}} onClick={this.toggleForm}>收起 <Icon type="up"/></a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {expandForm} = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
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
