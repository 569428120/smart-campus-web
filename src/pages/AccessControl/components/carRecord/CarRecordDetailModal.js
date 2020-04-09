import React, {PureComponent} from 'react';
import {Input, Modal, Steps, Tabs, Descriptions} from "antd";
import PropTypes from "prop-types";
import enums from '../../config/enums';
import {modalWidth} from '@/utils/utils';
import TimeQuantumTable from "../strategy/TimeQuantumTable";

const {TabPane} = Tabs;
const {Step} = Steps;


class CarRecordDetailModal extends PureComponent {

  /**
   *  策略详情
   */
  renderStrategyDetail() {
    const {carRecord: {strategyType}, timeQuantumList} = this.props;
    // TODO 枚举
    if (strategyType === 'accessStrategy') {
      return <TimeQuantumTable dataSource={timeQuantumList}/>
    }
    return <Steps direction="vertical" current={1}>
      <Step title="创建（申请人：xxx）" description="This is a description."/>
      <Step title="审核（审核人：xxx）" description="This is a description."/>
      <Step title="结束" description="This is a description."/>
    </Steps>
  };

  /**
   *  基本信息
   */
  renderBaseInfo() {
    const {
      carRecord: {
        userName,
        userType,
        userCode,
        strategyType,
        mode,
        inOrOut,
        deviceInfo,
        modeInfo,
      }
    } = this.props;
    // 策略详情
    const strategyDetail = this.renderStrategyDetail();
    return (
      <Descriptions column={3} layout="vertical" bordered>
        <Descriptions.Item label="人员名称">{"xuzhipeng"}</Descriptions.Item>
        <Descriptions.Item label="人员类型">{userType}</Descriptions.Item>
        <Descriptions.Item label="策略类型">{strategyType}</Descriptions.Item>

        <Descriptions.Item label="车牌号">{"粤S6LM58"}</Descriptions.Item>
        <Descriptions.Item label="出入类型">{inOrOut}</Descriptions.Item>
        <Descriptions.Item label="证件号码">{"430481199010220094"}</Descriptions.Item>

        <Descriptions.Item span={3} label="设备信息">{deviceInfo}</Descriptions.Item>
        <Descriptions.Item span={3} label="策略详情">{strategyDetail}</Descriptions.Item>
      </Descriptions>
    );
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
    const baseInfo = this.renderBaseInfo();

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      footer={null}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Tabs defaultActiveKey="1" onChange={onTabsChange}>
        <TabPane tab="基本信息" key="1">
          {baseInfo}
        </TabPane>
      </Tabs>
    </Modal>;
  }
}


CarRecordDetailModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 回显的数据
  carRecord: PropTypes.object,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

CarRecordDetailModal.defaultProps = {
  carRecord: {}
};

export default CarRecordDetailModal;


