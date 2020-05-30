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
   *   选择教育局
   * @param regionId
   */
  onRegionChange = (regionId) => {
    const {onRegionSelectChange, form: {resetFields}} = this.props;
    resetFields(['schoolName']);
    onRegionSelectChange && onRegionSelectChange(regionId);
  };

  /**
   *  简单的表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      regionList,
      form: {getFieldDecorator},
    } = this.props;

    const regionOptions = (regionList || []).map(({id, regionName}) =>
      <Option key={id} value={id}>{regionName}</Option>
    );

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="所属教育局">
              {getFieldDecorator('regionId')(
                <Select placeholder="请选择所属教育局" allowClear onChange={this.onRegionChange} style={{width: '100%'}}>
                  {regionOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学校名称">
              {getFieldDecorator('schoolName')(<Input allowClear placeholder="请输入学校名称"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
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
  regionList: PropTypes.array,
  onSearch: PropTypes.func,
  onFormReset: PropTypes.func,
};

// 默认值
SearchForm.defaultProps = {};
export default SearchForm;
