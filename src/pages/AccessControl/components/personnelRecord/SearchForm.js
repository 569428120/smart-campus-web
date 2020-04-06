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
   *  简单的表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      userTypeList,
      strategyTypeList,
      modeList,

      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={4} sm={24}>
            <FormItem label="信息">
              {getFieldDecorator('info')
              (<Input allowClear placeholder="名称、证件号码等"/>)}
            </FormItem>
          </Col>

          <Col md={4} sm={24}>
            <FormItem label="用户类型">
              {getFieldDecorator('userType')(
                <Select allowClear>
                  <Select.Option key={"1"} value={"1"}>{"学生"}</Select.Option>
                  <Select.Option key={"2"} value={"2"}>{"老师"}</Select.Option>
                  <Select.Option key={"3"} value={"3"}>{"家长"}</Select.Option>
                  <Select.Option key={"4"} value={"4"}>{"职工"}</Select.Option>
                </Select>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="策略类型">
              {getFieldDecorator('strategyType')(<Select allowClear>
                <Select.Option key={"1"} value={"1"}>{"出入策略"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"审批流程"}</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="验证方式">
              {getFieldDecorator('mode')(<Select allowClear>
                <Select.Option key={"1"} value={"1"}>{"一卡通"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"脸部识别"}</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="出入类型">
              {getFieldDecorator('inOrOut')(<Select allowClear>
                <Select.Option key={"1"} value={"1"}>{"进入"}</Select.Option>
                <Select.Option key={"2"} value={"2"}>{"外出"}</Select.Option>
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
  // 用户类型
  userTypeList: PropTypes.array,
  // 策略类型
  strategyTypeList: PropTypes.array,
  // 验证方式
  modeList: PropTypes.array,
  onSearch: PropTypes.func,
  onFormReset: PropTypes.func,
};

// 默认值
SearchForm.defaultProps = {};
export default SearchForm;
