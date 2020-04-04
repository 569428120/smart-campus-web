import React, {PureComponent} from 'react';
import {Select, Form, Modal} from "antd";
import PropTypes from "prop-types";
import enums from '../../config/enums';
import {modalWidth} from '@/utils/utils';
import TimeQuantumTable from "../strategy/TimeQuantumTable";


const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 10},
  },
};

@Form.create()
class AccessDistributionModal extends PureComponent {
  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, groupIds, openType, dataSource} = this.props;
    const {id} = (dataSource || {});
    validateFields((errors, values) => {
      if (errors === null) {
        values.id = id;
        onOk && onOk(values, groupIds, openType);
      }
    });
  };

  render() {
    const {
      visible,
      openType,
      dataSource,
      loading,
      accessStrategyList,
      timeQuantumList,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {strategyId} = (dataSource || {});
    const timeQuantumTableProps = {
      dataSource: timeQuantumList,
      loading,
    };
    const accessStrategySelectOpens = (accessStrategyList || []).map(({id, strategyName}) =>
      <Select.Option key={id} value={id}>{strategyName}</Select.Option>);
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
      <Form>
        <Form.Item {...formItemLayout} label="权限策略">
          {getFieldDecorator('strategyId', {
            initialValue: strategyId,
            rules: [
              {
                required: true,
                message: '策略名称必填',
              }
            ],
          })(<Select allowClear disabled={openType === 'view'}>
            {accessStrategySelectOpens}
          </Select>)}
        </Form.Item>
        <TimeQuantumTable {...timeQuantumTableProps}/>
      </Form>
    </Modal>;
  }
}


AccessDistributionModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 分组id
  groupIds: PropTypes.array,
  // 回显的数据
  dataSource: PropTypes.object,
  // 策略列表
  accessStrategyList: PropTypes.array,
  // 时间段
  timeQuantumList: PropTypes.array,
  // 加载
  loading: PropTypes.bool,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

AccessDistributionModal.defaultProps = {};

export default AccessDistributionModal;


