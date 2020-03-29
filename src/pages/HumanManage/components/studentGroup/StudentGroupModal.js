import React, {PureComponent} from 'react';
import {Form, Input, Modal, Select} from "antd";
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
class StudentGroupModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource, pDataSource} = this.props;
    const {id} = (dataSource || {});
    const {id: pid, type} = (pDataSource || {});
    const groupType = enums.StudentGroupTypeFunc(id, type);
    validateFields((errors, values) => {
      if (errors === null) {
        values.id = id;
        values.pid = pid;
        values.type = groupType;
        onOk && onOk(values, openType);
      }
    });
  };

  /**
   *  年级表单
   */
  renderGradeForm = () => {
    const {
      visible,
      openType,
      dataSource,
      pDataSource,
      validatorGradeLevel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {gradeLevel, gradeName, groupCode, description} = (dataSource || {});

    const gradeLevelSelectOptions = Object.keys(enums.GradeLevel).map(key =>
      <Select.Option key={key} value={key}>{enums.GradeLevel[key]}</Select.Option>);

    return <Form>
      <Form.Item {...formItemLayout} label={"年级"}>
        {getFieldDecorator('gradeLevel', {
          initialValue: gradeLevel,
          rules: [
            {
              required: true,
              message: '年级必填',
            },
            {
              validator: validatorGradeLevel
            }
          ],
        })(<Select allowClear disabled={openType === 'view'} placeholder="请输入">
          {gradeLevelSelectOptions}
        </Select>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label={"年级名称"}>
        {getFieldDecorator('gradeName', {
          initialValue: gradeName,
          rules: [
            {
              required: true,
              message: '分组编码必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label={"分组编码"}>
        {getFieldDecorator('groupCode', {
          initialValue: groupCode,
          rules: [
            {
              required: true,
              message: '分组编码必填',
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
  };

  /**
   *  班级表单
   */
  renderClassForm = () => {
    const {
      visible,
      openType,
      dataSource,
      pDataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {gradeLevel, gradeName, groupCode, description} = (dataSource || {});

    const gradeLevelSelectOptions = Object.keys(enums.GradeLevel).map(key =>
      <Select.Option key={key} value={key}>{enums.GradeLevel[key]}</Select.Option>);

    return <Form>
      <Form.Item {...formItemLayout} label={"年级"}>
        {getFieldDecorator('gradeLevel', {
          initialValue: gradeLevel,
          rules: [
            {
              required: true,
              message: '年级必填',
            },
          ],
        })(<Select allowClear disabled={true} placeholder="请输入">
          {gradeLevelSelectOptions}
        </Select>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label={"班级名称"}>
        {getFieldDecorator('groupName', {
          initialValue: gradeName,
          rules: [
            {
              required: true,
              message: '分组编码必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label={"分组编码"}>
        {getFieldDecorator('groupCode', {
          initialValue: groupCode,
          rules: [
            {
              required: true,
              message: '分组编码必填',
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
  };

  /**
   *  分组
   */
  renderGroupForm = () => {
    const {
      visible,
      openType,
      dataSource,
      pDataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {gradeLevel, gradeName, groupCode, description} = (dataSource || {});

    const gradeLevelSelectOptions = Object.keys(enums.GradeLevel).map(key =>
      <Select.Option key={key} value={key}>{enums.GradeLevel[key]}</Select.Option>);

    return <Form>
      <Form.Item {...formItemLayout} label={"年级"}>
        {getFieldDecorator('gradeLevel', {
          initialValue: gradeLevel,
          rules: [
            {
              required: true,
              message: '年级必填',
            }
          ],
        })(<Select allowClear disabled={true} placeholder="请输入">
          {gradeLevelSelectOptions}
        </Select>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label={"分组名称"}>
        {getFieldDecorator('groupName', {
          initialValue: gradeName,
          rules: [
            {
              required: true,
              message: '分组编码必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label={"分组编码"}>
        {getFieldDecorator('groupCode', {
          initialValue: groupCode,
          rules: [
            {
              required: true,
              message: '分组编码必填',
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
  };

  render() {
    const {
      visible,
      openType,
      dataSource,
      pDataSource,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {id, type} = (pDataSource || {});

    const {groupName, groupCode, description} = dataSource;
    const typeToFrom = {
      // 新增年级的表单
      grade: this.renderGradeForm,
      // 新增班级的表单
      class: this.renderClassForm,
      // 新增分组的表单
      group: this.renderGroupForm
    };
    // 没有父节点则为年级，父节点为年级则子节点为班级，其他为分组
    const groupType = enums.StudentGroupTypeFunc(id, type);
    const form = typeToFrom[groupType]();

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      {form}
    </Modal>;
  }
}


StudentGroupModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 父节点数据
  pDataSource: PropTypes.object,
  // 确认按钮加载状态
  okLoading: PropTypes.bool,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

StudentGroupModal.defaultProps = {};

export default StudentGroupModal;


