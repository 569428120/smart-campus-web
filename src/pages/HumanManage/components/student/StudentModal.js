import React, {PureComponent} from 'react';
import {Form, Input, Modal, Radio, TreeSelect} from "antd";
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
class StudentModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    const {id} = (dataSource || {});
    validateFields((errors, values) => {
      if (errors === null) {
        onOk && onOk({...values, id}, openType);
      }
    });
  };

  render() {
    const {
      visible,
      openType,
      dataSource,
      okLoading,
      studentGroupList,
      validatorStudentModel,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {id, name, groupId, studentCode, address} = (dataSource || {});

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={600}
      onCancel={onCancel}
      confirmLoading={okLoading}
      okText="确认"
      cancelText="取消"
    >
      <Form>
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
          })(<Input placeholder={"请输入学生姓名，例如：张三"} disabled={openType === 'view'}/>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="学号">
          {getFieldDecorator('studentCode', {
            initialValue: studentCode,
            rules: [
              {
                required: true,
                message: '学号必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
              {
                validator: (rule, value, callback) => validatorStudentModel && validatorStudentModel(rule, {
                  studentCode: value,
                  id
                }, callback),
              },
            ],
          })(<Input placeholder={"请输入学生学号，例如：XS0001"} disabled={openType === 'view'}/>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="家庭住址">
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [
              {
                max: 525,
                message: '长度不能超过525',
              },
            ]
          })(<TextArea placeholder={"请输入学生家庭住址，例如：湖南省XXX市XX街道XXX"} disabled={openType === 'view'} rows={4}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}


StudentModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 确认按钮加载
  okLoading: PropTypes.bool,
  // 校验方法
  validatorStudentModel: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

StudentModal.defaultProps = {};

export default StudentModal;


