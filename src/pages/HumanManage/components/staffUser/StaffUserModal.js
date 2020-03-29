import React, {PureComponent} from 'react';
import {Radio, Form, Input, Modal, TreeSelect} from "antd";
import PropTypes from "prop-types";
import enums from "@/pages/HumanManage/config/enums";
import {modalWidth} from '@/utils/utils';

const {TextArea} = Input;
const {TreeNode} = TreeSelect;

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

/**
 *  获取树节点
 * @param treeData
 * @returns {Array}
 */
const getTreeNode = (treeData) => {
  if ((treeData || []).length <= 0) {
    return [];
  }
  return treeData.map(({id, groupName, children}) =>
    <TreeNode value={id} title={groupName} key={id}>
      {getTreeNode(children)}
    </TreeNode>)
};

@Form.create()
class StaffUserModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    const {id} = (dataSource || {});
    const formatValues = (values) => {
      values.id = id;
      values.groupIds = (values.groupIds || []).join(",")
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
      staffGroupList,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {name, userType, groupIds, userIdentity, phoneNumber, address} = dataSource;
    const treeNodes = getTreeNode(staffGroupList);
    const userTypeCheckbox = Object.keys(enums.UserTypes).map(key =>
      <Radio key={key} value={key}>{enums.UserTypes[key]}</Radio>);

    const okButtonProps = {
      disabled: openType === 'view',
      loading: okLoading
    };

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okButtonProps={okButtonProps}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="所属分组">
          {getFieldDecorator('groupIds', {
            initialValue: groupIds ? groupIds.split(",") : null,
            rules: [
              {
                required: true,
                message: '所属分组必填',
              },
            ],
          })(<TreeSelect
            disabled={openType === 'view'}
            allowClear
            multiple
            treeDefaultExpandAll>
            {treeNodes}
          </TreeSelect>)}
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
          })(<Input disabled={openType === 'view'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="用户类型">
          {getFieldDecorator('userType', {
            initialValue: userType,
            rules: [
              {
                required: true,
                message: '用户类型必填',
              }
            ],
          })(<Radio.Group disabled={openType === 'view'}>
            {userTypeCheckbox}
          </Radio.Group>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="身份证号码">
          {getFieldDecorator('userIdentity', {
            initialValue: userIdentity,
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
          })(<Input disabled={openType === 'view'}/>)}
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
          })(<Input disabled={openType === 'view'}/>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="住址">
          {getFieldDecorator('address', {
            initialValue: address,
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


StaffUserModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 确认按钮加载
  okLoading: PropTypes.bool,
  // 分组
  staffGroupList: PropTypes.array,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

StaffUserModal.defaultProps = {};

export default StaffUserModal;


