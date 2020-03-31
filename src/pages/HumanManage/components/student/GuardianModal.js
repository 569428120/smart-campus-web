import React, {PureComponent} from 'react';
import {Radio, Form, Input, Modal, Select} from "antd";
import PropTypes from "prop-types";
import enums from "@/pages/HumanManage/config/enums";
import {modalWidth} from '@/utils/utils';

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


@Form.create()
class GuardianModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource, studentModel} = this.props;
    const {id} = (dataSource || {});
    const {studentId} = studentModel;
    if (!studentId) {
      console.error("数据错误，学生id找不到");
      return;
    }
    const formatValues = (values) => {
      values.id = id;
      values.studentId = studentId;
    };
    validateFields((errors, values) => {
      if (errors === null) {
        onOk && onOk(formatValues(values), openType);
      }
    });
  };

  render() {
    const {
      visible,
      openType,
      studentModel,
      dataSource,
      okLoading,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {familyType, name, phoneNumber, certificate, description} = dataSource;
    // 确认按钮参数
    const okButtonProps = {
      disabled: openType === 'view',
      loading: okLoading
    };

    const familyTypeSelectOptions = Object.keys(enums.FamilyType).map(pKey => {
      const {key, value} = (enums.FamilyType[pKey] || {});
      return <Select.Option key={key} value={key}>{value}</Select.Option>
    });

    return <Modal
      title={"监护人"}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="关系类型">
          {getFieldDecorator('familyType', {
            initialValue: familyType,
            rules: [
              {
                required: true,
                message: '关系类型必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Select disabled={openType === 'view'}>
            {familyTypeSelectOptions}
          </Select>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: name,
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
          })(<Input.Password disabled={openType === 'view'}/>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="手机号码">
          {getFieldDecorator('phoneNumber', {
            initialValue: phoneNumber,
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
          })(<Input.Password disabled={openType === 'view'}/>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="证件号码">
          {getFieldDecorator('certificate', {
            initialValue: certificate,
            rules: [
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Input.Password disabled={openType === 'view'}/>)}
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
          })(<TextArea disabled={openType === 'view'} rows={4}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}


GuardianModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 学生数据
  studentModel: PropTypes.object,
  // 回显的数据
  dataSource: PropTypes.object,
  // 确认按钮加载
  okLoading: PropTypes.bool,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

GuardianModal.defaultProps = {};

export default GuardianModal;


