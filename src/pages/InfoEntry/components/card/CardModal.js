import React, {PureComponent} from 'react';
import {Form, Input, Modal, TreeSelect, Select} from "antd";
import PropTypes from "prop-types";
import enums from "../../config/enums";
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
  return treeData.map(({id, type, groupName, children}) =>
    <TreeNode value={id} title={groupName} key={id}>
      {getTreeNode(children)}
    </TreeNode>)
};

@Form.create()
class CardModal extends PureComponent {

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

  /**
   *  新增表单
   */
  renderAddFrom() {
    const {
      visible,
      openType,
      dataSource,
      userGroupList,
      userList,
      onUserTypeSelect,
      onUserGroupSelect,
      onOk,
      onCancel,
      form: {
        getFieldDecorator,
        getFieldValue,
      }
    } = this.props;

    const userTypeSelectOptions = Object.keys(enums.UserType).map(mKey => {
      const {key, value} = enums.UserType[mKey];
      return <Select.Option key={key} value={key}>{value}</Select.Option>
    });

    const treeNodes = getTreeNode(userGroupList);
    const userListSelectOptions = (userList || []).map(({id, name}) =>
      <Select.Option key={id} value={id}>{name}</Select.Option>
    );

    const cardTypeSelectOptions = Object.keys(enums.CardType).map(mKey => {
      const {key, value} = enums.CardType[mKey];
      return <Select.Option key={key} value={key}>{value}</Select.Option>
    });

    return <Form>
      <Form.Item {...formItemLayout} label="用户类型">
        {getFieldDecorator('userType', {
          initialValue: enums.UserType.student.key,
          rules: [
            {
              required: true,
              message: '用户类型必填',
            },
          ],
        })(<Select onChange={onUserTypeSelect} disabled={openType === 'view'}>
          {userTypeSelectOptions}
        </Select>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="用户组">
        {getFieldDecorator('userGroupId', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '用户组必填',
            }
          ],
        })(<TreeSelect
          onChange={(groupId) => onUserGroupSelect && onUserGroupSelect(getFieldValue('userType'), groupId)}
          disabled={openType === 'view'}
          allowClear
          treeDefaultExpandAll>
          {treeNodes}
        </TreeSelect>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="用户">
        {getFieldDecorator('userId', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '用户必填',
            },
          ],
        })(<Select disabled={openType === 'view'}>
          {userListSelectOptions}
        </Select>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="卡类型">
        {getFieldDecorator('cardType', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '卡类型必填',
            },
          ],
        })(<Select disabled={openType === 'view'}>
          {cardTypeSelectOptions}
        </Select>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="卡号">
        {getFieldDecorator('cardNumber', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '卡号必填',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="描述">
        {getFieldDecorator('description', {
          initialValue: null,
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
   * 编辑表单
   */
  renderEditFrom() {
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
    const {userType, userGroupName, userName, cardType, cardNumber, description} = dataSource;
    const cardTypeSelectOptions = Object.keys(enums.CardType).map(mKey => {
      const {key, value} = enums.CardType[mKey];
      return <Select.Option key={key} value={key}>{value}</Select.Option>
    });
    return <Form>
      <Form.Item {...formItemLayout} label="用户类型">
        {getFieldDecorator('userType', {
          initialValue: (enums.UserType[userType] || {}).value,
          rules: [
            {
              required: true,
              message: '用户类型必填',
            },
          ],
        })(<Input disabled={true}/>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="用户组">
        {getFieldDecorator('userGroupId', {
          initialValue: userGroupName,
          rules: [
            {
              required: true,
              message: '用户组必填',
            }
          ],
        })(<Input disabled={true}/>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="用户">
        {getFieldDecorator('userId', {
          initialValue: userName,
          rules: [
            {
              required: true,
              message: '用户必填',
            },
          ],
        })(<Input disabled={true}/>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="卡类型">
        {getFieldDecorator('cardType', {
          initialValue: cardType,
          rules: [
            {
              required: true,
              message: '卡类型必填',
            },
          ],
        })(<Select disabled={openType === 'view'}>
          {cardTypeSelectOptions}
        </Select>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="卡号">
        {getFieldDecorator('cardNumber', {
          initialValue: cardNumber,
          rules: [
            {
              required: true,
              message: '卡号必填',
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
      onOk,
      onCancel,
    } = this.props;

    const {groupName, groupCode, description} = dataSource;
    const from = openType === 'add' ? this.renderAddFrom() : this.renderEditFrom();
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
      {from}
    </Modal>;
  }
}


CardModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 用户组
  userGroupList: PropTypes.array,
  // 用户
  userList: PropTypes.array,
  // 选择用户类型
  onUserTypeSelect: PropTypes.func,
  // 选择组
  onUserGroupSelect: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

CardModal.defaultProps = {};

export default CardModal;


