import React, {PureComponent} from 'react';
import {Form, Input, Modal, Tabs} from "antd";
import PropTypes from "prop-types";
import enums from '../../config/enums';
import {modalWidth} from '@/utils/utils';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import TimeQuantumTable from "./TimeQuantumTable";

const {TextArea} = Input;
const {TabPane} = Tabs;

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
class AccessStrategyModal extends PureComponent {
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

  renderForm = () => {
    const {
      openType,
      dataSource,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {authorityName, authorityCode, description} = dataSource;
    return <Form>
      <Form.Item {...formItemLayout} label="策略名称">
        {getFieldDecorator('authorityName', {
          initialValue: authorityName,
          rules: [
            {
              required: true,
              message: '策略名称必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="策略编码">
        {getFieldDecorator('authorityCode', {
          initialValue: authorityCode,
          rules: [
            {
              required: true,
              message: '策略编码必填',
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
   *  时间段
   * @returns {*}
   */
  renderTimeQuantumTable = () => {
    const {timeQuantumTableProps} = this.props;
    const {onQuantumTableAdd, onQuantumTableDelete, selectedRowKeys} = (timeQuantumTableProps || {});
    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新建',
      key: 'add',
      onClick: () => onQuantumTableAdd && onQuantumTableAdd,
    });
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        key: 'delete',
        onClick: () => onQuantumTableDelete && onQuantumTableDelete(selectedRowKeys),
      });
    }

    const operatorButtonProps = {
      buttonList
    };
    return <div>
      <OperatorButton {...operatorButtonProps} />
      <TimeQuantumTable/>
    </div>
  };

  render() {
    const {
      visible,
      openType,
      onOk,
      onCancel,
      onTabsChange,
    } = this.props;
    //基本信息
    const form = this.renderForm();
    //时间段
    const timeQuantumTable = this.renderTimeQuantumTable();
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
      <Tabs defaultActiveKey="1" onChange={onTabsChange}>
        <TabPane tab="时间段" key="1">
          {timeQuantumTable}
        </TabPane>
        <TabPane tab="基本信息" key="2">
          {form}
        </TabPane>
      </Tabs>
    </Modal>;
  }
}


AccessStrategyModal.propTypes = {
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

AccessStrategyModal.defaultProps = {};

export default AccessStrategyModal;


