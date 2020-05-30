import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select} from 'antd';
import styles from '@/pages/List/TableList.less';
import enums from '../../config/enums';

const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
class SearchForm extends React.PureComponent {
  state = {
    expandForm: false, // 是否展开搜索框
    deviceTypeList: [],
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

  onManufacturerChange = (manufacturerId) => {
    const {
      manufacturerList,
      form: {
        setFieldsValue
      }
    } = this.props;
    const manufacturerVo = (manufacturerList || []).find(item => item.id === manufacturerId);
    setFieldsValue({manufacturerTypeId: undefined});
    this.setState({
      deviceTypeList: ((manufacturerVo || {}).deviceTypeList || [])
    })
  };

  /**
   *  简单的表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      manufacturerList,
      form: {getFieldDecorator},
    } = this.props;
    const {deviceTypeList} = this.state;

    const manufacturerOptions = (manufacturerList || []).map(({id, name}) => <Option key={id}
                                                                                     value={id}>{name}</Option>);
    const deviceTypeOptions = (deviceTypeList || []).map(({id, name}) => <Option key={id}
                                                                                 value={id}>{name}</Option>);
    const statusOptions = Object.values(enums.DeviceStatus).map(({key, value}) => <Option key={key}
                                                                                          value={key}>{value}</Option>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={6} sm={24}>
            <FormItem label="厂商">
              {getFieldDecorator('manufacturerId')(
                <Select allowClear placeholder={"请选择"} onChange={this.onManufacturerChange}>
                  {manufacturerOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="设备型号">
              {getFieldDecorator('manufacturerTypeId')(
                <Select allowClear placeholder={"请选择"}>
                  {deviceTypeOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select allowClear placeholder={"请选择"}>
                  {statusOptions}
                </Select>
              )}
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
