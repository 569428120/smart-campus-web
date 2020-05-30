import React, {PureComponent} from 'react';
import {Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import enums from "@/pages/SystemManage/config/enums";
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
class AuthorityGroupModal extends PureComponent {
  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    const {id} = (dataSource || {});
    validateFields((errors, values) => {
      if (errors === null) {
        values.id = id;
        onOk && onOk(values, openType);
      }
    });
  };

  render() {
    const {
      visible,
      openType,
      dataSource,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {authorityName, authorityCode, description} = dataSource;

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={500}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="权限名称">
          {getFieldDecorator('authorityName', {
            initialValue: authorityName,
            rules: [
              {
                required: true,
                message: '权限名称必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Input disabled={openType === 'view'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="权限编码">
          {getFieldDecorator('authorityCode', {
            initialValue: authorityCode,
            rules: [
              {
                required: true,
                message: '权限编码必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Input disabled={openType === 'view'}/>)}
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


AuthorityGroupModal.propTypes = {
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

AuthorityGroupModal.defaultProps = {};

export default AuthorityGroupModal;


