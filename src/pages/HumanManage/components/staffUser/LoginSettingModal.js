import React, {PureComponent} from 'react';
import {Radio, Form, Input, Modal, TreeSelect} from "antd";
import PropTypes from "prop-types";
import {modalWidth} from '@/utils/utils';


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
class LoginSettingModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    const {id} = (dataSource || {});
    const formatValues = (values) => {
      values.id = id;
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
      dataSource,
      okLoading,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {userName, userPassword} = dataSource;
    // 确认按钮参数
    const okButtonProps = {
      disabled: openType === 'view',
      loading: okLoading
    };

    return <Modal
      title={"登录账户设置"}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="登录账户">
          {getFieldDecorator('userName', {
            initialValue: userName,
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
          })(<Input disabled={openType === 'view' || (userName || '').length > 0}/>)}
        </Form.Item>


        <Form.Item {...formItemLayout} label="登录密码">
          {getFieldDecorator('userPassword', {
            initialValue: userPassword,
            rules: [
              {
                required: true,
                message: '身份证号码必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Input.Password disabled={openType === 'view'}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}


LoginSettingModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 确认按钮加载
  okLoading: PropTypes.bool,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

LoginSettingModal.defaultProps = {};

export default LoginSettingModal;


