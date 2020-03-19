import React, {PureComponent} from 'react';
import {Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import enums from "@/pages/SystemManage/config/enums";
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

const {TextArea} = Input;


@Form.create()
class PcMenuModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource, pDataSource} = this.props;
    const {id: pid} = (pDataSource || {});
    const {id} = (dataSource || {});
    validateFields((errors, values) => {
      if (errors === null) {
        if (openType === 'add' && pid) {
          values.pid = pid;
        }
        values.id = id;
        onOk && onOk(values, openType);
      }
    });
  };

  /**
   *  菜单表单
   */
  renderMenuForm = () => {
    const {
      openType,
      dataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {menuName, route, description} = dataSource;

    return <Form style={{textAlign: "center"}}>
      <Form.Item {...formItemLayout} label="菜单名称">
        {getFieldDecorator('menuName', {
          initialValue: menuName,
          rules: [
            {
              required: true,
              message: '菜单名称必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="路由">
        {getFieldDecorator('route', {
          initialValue: route,
          rules: [
            {
              required: true,
              message: '路由必填',
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
    </Form>;
  };

  /**
   *  操作表单
   */
  renderOperateForm = () => {
    const {
      openType,
      dataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {operateName, operateCode, description} = dataSource;

    return <Form style={{textAlign: "center"}}>
      <Form.Item {...formItemLayout} label="操作名称">
        {getFieldDecorator('operateName', {
          initialValue: operateName,
          rules: [
            {
              required: true,
              message: '操作名称必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>

      <Form.Item {...formItemLayout} label="操作编码">
        {getFieldDecorator('operateCode', {
          initialValue: operateCode,
          rules: [
            {
              required: true,
              message: '操作编码必填',
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
    </Form>;
  };

  render() {
    const {
      visible,
      openType,
      dataSource,
      pDataSource,
      onOk,
      onCancel
    } = this.props;

    const {menuLevel} = (dataSource || {});
    const {menuLevel: pMenuLevel} = (pDataSource || {});

    const form = (menuLevel === 4 || pMenuLevel === 3) ? this.renderOperateForm() : this.renderMenuForm();

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(500)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      {form}
    </Modal>;
  }
}

PcMenuModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 父节点数据
  pDataSource: PropTypes.object,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

PcMenuModal.defaultProps = {};

export default PcMenuModal;
