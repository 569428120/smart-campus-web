import React, {PureComponent} from 'react';
import {Input, Tabs, Descriptions, Switch, Button, Empty, Spin, Modal} from "antd";
import PropTypes from "prop-types";
import OperatorButton from "../../../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import TimeQuantumTable from "./TimeQuantumTable";
import enums from '../../config/enums';

class StrategyDetailTabs extends PureComponent {

  getTimeQuantumTable = () => {
    const {
      timeQuantumTableProps: {
        selectedRowKeys,
        timeQuantumList,
        onAddTimeQuantum,
        onDeleteTimeQuantum,
        onTimeQuantumSelectChange
      }
    } = this.props;

    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新建',
      key: 'time-quantum-add',
      onClick: onAddTimeQuantum,
    });
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        key: 'time-quantum-delete',
        onClick: onDeleteTimeQuantum,
      });
    }
    const operatorButtonProps = {
      buttonList
    };
    const tableProps = {
      height: 250,
      dataSource: timeQuantumList,
      loading: false,
      selectedRowKeys,
      onTableSelectChange: onTimeQuantumSelectChange,
    };
    return <div>
      <OperatorButton {...operatorButtonProps} />
      <TimeQuantumTable {...tableProps}/>
    </div>
  };


  getDescriptions = () => {
    const {
      onEnableChange,
      dataSource,
    } = this.props;
    const {
      strategyName,
      strategyCode,
      strategyStatus,
      description
    } = (dataSource || {});

    const timeQuantumTable = this.getTimeQuantumTable();
    return <Descriptions layout="vertical" column={2} bordered>
      <Descriptions.Item label="策略名称">{(strategyName || "无")}</Descriptions.Item>
      <Descriptions.Item label="策略编号">{(strategyCode || "无")}</Descriptions.Item>
      <Descriptions.Item label="状态" span={2}>
        <Switch checkedChildren={enums.StrategyStatus.Enable.value}
                unCheckedChildren={enums.StrategyStatus.UnEnable.value}
                checked={strategyStatus === enums.StrategyStatus.Enable.key}
                onChange={(checked) => onEnableChange(dataSource, checked)}/>
      </Descriptions.Item>
      <Descriptions.Item label="描述" span={2}>{(description || "无")}</Descriptions.Item>
      <Descriptions.Item label="时间段" span={2}>
        {timeQuantumTable}
      </Descriptions.Item>
    </Descriptions>
  };

  render() {
    const {
      height,
      loading,
      dataSource
    } = this.props;

    const content = (dataSource || {}).id ? this.getDescriptions() : <Empty/>;
    return <Tabs defaultActiveKey="1" style={{padding: '0 10px'}}>
      <Tabs.TabPane tab="时间段配置" key="1" style={{overflow: "auto", maxHeight: `${height}px`}}>
        <Spin spinning={!!loading}>
          {content}
        </Spin>
      </Tabs.TabPane>
    </Tabs>;
  }
}

StrategyDetailTabs.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.object,
  onEnableChange: PropTypes.func,
  /*
  timeQuantumTableProps: PropTypes.object({
    selectedRowKeys: PropTypes.array,
    timeQuantumList: PropTypes.array,
    onAddTimeQuantum: PropTypes.func,
    onDeleteTimeQuantum: PropTypes.func,
    onTimeQuantumSelectChange: PropTypes.func
  })
  */
};
StrategyDetailTabs.defaultProps = {};

export default StrategyDetailTabs;
