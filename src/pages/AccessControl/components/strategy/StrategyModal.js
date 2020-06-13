import React, {PureComponent} from 'react';
import {Form, Input, Modal, Tabs, Steps, Select, Button} from "antd";
import PropTypes from "prop-types";
import enums from '../../config/enums';
import {modalWidth} from '@/utils/utils';

const FormItem = Form.Item;
const {TextArea} = Input;

@Form.create()
class StrategyModal extends PureComponent {

  formLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 13},
  };

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    validateFields((errors, values) => {
      if (errors === null) {
        onOk && onOk({...dataSource, ...values}, openType);
      }
    });
  };

  renderBasicContent = () => {
    const {
      openType,
      dataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {strategyName, description} = (dataSource || {});
    return [
      <FormItem key="strategyName" {...this.formLayout} label="策略名称">
        {getFieldDecorator('strategyName', {
          initialValue: strategyName,
          rules: [
            {
              required: true,
              message: '策略名称必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </FormItem>,
      <FormItem key="description"  {...this.formLayout} label="描述">
        {getFieldDecorator('description', {
          initialValue: description,
          rules: [
            {
              max: 525,
              message: '长度不能超过525',
            },
          ]
        })(<TextArea placeholder={"关于设备的描述"} disabled={openType === 'view'} rows={4}/>)}
      </FormItem>
    ]
  };

  render() {
    const {
      visible,
      openType,
      onOk,
      onCancel,
      okLoading
    } = this.props;
    const content = this.renderBasicContent();
    return <Modal
      title={enums.OperatorType[openType]}
      width={500}
      destroyOnClose={true}
      visible={visible}
      bodyStyle={{padding: '32px 40px 48px'}}
      onOk={() => this.onSubmit(onOk)}
      onCancel={onCancel}
      confirmLoading={okLoading}
      okText={"保存"}
      cancelText={"取消"}
    >
      {content}
    </Modal>
  }
}

StrategyModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  //
  okLoading: PropTypes.bool,
  //
  dataSource: PropTypes.object,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

StrategyModal.defaultProps = {};

export default StrategyModal;
