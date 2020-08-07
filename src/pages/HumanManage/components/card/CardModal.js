import React, {PureComponent} from 'react';
import {Form, Input, Modal, TreeSelect, Select} from "antd";
import PropTypes from "prop-types";
import enums from "../../config/enums";
import {modalWidth} from '@/utils/utils';
import UserSelectInput from "../../../../components/SmartCampus/UserSelect/UserSelectInput";

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
        if ((values.userInfos || []).length > 0) {
          values.userId = values.userInfos[0].id;
        }
        onOk && onOk(values, openType);
      }
    });
  };


  render() {
    const {
      visible,
      openType,
      typeDefaultValue,
      validatorCardModel,
      dataSource,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {id, cardType, cardNumber, description, userVo} = dataSource;
    const cardTypeSelectOptions = Object.keys(enums.CardType).map(mKey => {
      const {key, value} = enums.CardType[mKey];
      return <Select.Option key={key} value={key}>{value}</Select.Option>
    });

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={600}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="用户">
          {getFieldDecorator('userInfos', {
            initialValue: userVo ? [userVo] : [],
            rules: [
              {
                required: true,
                message: '用户必填',
              },
            ],
          })(<UserSelectInput typeDefaultValue={typeDefaultValue} disabled={openType !== 'add'}/>)}
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
              {
                validator: (rule, value, callback) => validatorCardModel(rule, {
                  cardNumber: value,
                  id
                }, callback),
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


CardModal.propTypes = {
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

CardModal.defaultProps = {};

export default CardModal;


