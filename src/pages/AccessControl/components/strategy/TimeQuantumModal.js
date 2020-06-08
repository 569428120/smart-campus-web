import React, {PureComponent} from 'react';
import {Form, Input, Modal, Tabs, Radio, TimePicker} from "antd";
import moment from 'moment';
import PropTypes from "prop-types";
import {modalWidth} from '@/utils/utils';
import enums from '../../config/enums';

const {TextArea} = Input;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

const format = 'HH:mm';

@Form.create()
class TimeQuantumModal extends PureComponent {
  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    const {id} = (dataSource || {});
    const formatValues = (values) => {
      values.startTime = values.startTime && moment(values.startTime).format(format);
      values.endTime = values.endTime && moment(values.endTime).format(format);
      return values;
    };
    validateFields((errors, values) => {
      if (errors === null) {
        values.id = id;
        onOk && onOk(formatValues(values), openType);
      }
    });
  };

  render() {
    const {
      visible,
      openType,
      okLoading,
      onOk,
      onCancel,
      dataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {dateType, startTime, endTime, description} = (dataSource || {});
    const dateTypeRadios = Object.keys(enums.DateType).map(mKey => {
      const {key, value} = (enums.DateType[mKey] || {});
      return <Radio key={key} value={key}>{value}</Radio>
    });
    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={400}
      confirmLoading={okLoading}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="日期类型">
          {getFieldDecorator('dateType', {
            initialValue: dateType,
            rules: [
              {
                required: true,
                message: '日期类型必填',
              }
            ],
          })(<Radio.Group disabled={openType === 'view'}>
            {dateTypeRadios}
          </Radio.Group>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="开始时间">
          {getFieldDecorator('startTime', {
            initialValue: startTime,
            rules: [
              {
                required: true,
                message: '开始时间必填',
              }
            ],
          })(<TimePicker format={format} minuteStep={15} disabled={openType === 'view'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="结束时间">
          {getFieldDecorator('endTime', {
            initialValue: endTime,
            rules: [
              {
                required: true,
                message: '结束时间必填',
              }
            ],
          })(<TimePicker format={format} minuteStep={15} disabled={openType === 'view'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="描述">
          {getFieldDecorator('description', {
            initialValue: description,
            rules: [
              {
                max: 525,
                message: '长度不能超过525',
              },
            ]
          })(<TextArea disabled={openType === 'view'} rows={2}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}


TimeQuantumModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

TimeQuantumModal.defaultProps = {};

export default TimeQuantumModal;


