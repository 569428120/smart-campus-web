import React from 'react';
import {connect} from "dva/index";
import {Card, Modal, Tabs, message, Row, Col, Steps} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from "umi/router";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import GuardFlowForm from "./components/flowEntry/GuardFlowForm";


const {Step} = Steps;

@connect(({loading, user, guardFlowEntry}) => ({
  loading,
  user,
  guardFlowEntry,
}))
class GuardFlowEntry extends React.PureComponent {

  state = {
    current: 0,
    openType: ''
  };

  componentDidMount() {
    const {dispatch,} = this.props;
    let openType = 'create';
    const flowId = '';
    switch (openType) {
      // 新建
      case 'create':
        dispatch({
          type: "guardFlowEntry/getFlowTemplate",
          payload: {}
        }).then(() => {
          this.initFlowData();
        });
        break;
      // 修改或者审批 默认查看
      default:
        openType = 'view';
        if (!flowId) {
          Modal.error({
            title: '错误提示',
            content: '参数错误，请点击返回',
            onOk: this.toFlowRecordPage,
          });
        }
        dispatch({
          type: "guardFlowEntry/getFlowPoolAndStepList",
          payload: {
            flowId
          }
        }).then(() => {
          this.initFlowData();
        });
    }
    this.setState({
      openType,
      flowId
    })
  }

  /**
   *  初始化数据
   */
  initFlowData = () => {
    const {guardFlowEntry: {flowPool, flowStepList}} = this.props;
    const getCurrent = () => {
      let current = 0;
      (flowStepList || []).forEach((item, index) => {
        if (flowPool.currStep === item.id) {
          current = index;
        }
      });
    };
    this.setState({
      current: getCurrent()
    })
  };

  /**
   *  跳转到列表页面
   */
  toFlowRecordPage = () => {
    router.push(`/work/flow/record`);
  };

  /**
   *   步骤选择
   * @param current
   */
  onStepChange = (current) => {
    this.setState({
      current
    })
  };

  /**
   *  操作按钮
   */
  getOperatorButtonProps = () => {
    const buttonList = [
      {
        text: '返回列表',
        isShow: () => true,
        operatorKey: 'flow-entry-fanhui',
        onClick: this.toFlowRecordPage,
      },
      {
        text: '保存',
        isShow: () => true,
        operatorKey: 'flow-entry-save',
        onClick: () => message.info("提交成功"),
      },
      {
        type: 'primary',
        text: '提交',
        isShow: () => true,
        operatorKey: 'flow-entry-tijiao',
        onClick: () => message.info("提交成功"),
      }
    ];
    return {buttonList};
  };

  /**
   *  步骤详情
   */
  renderDescription(item) {
    return item.opinion
  };

  /**
   *  流程步骤
   */
  renderSteps() {
    const {guardFlowEntry: {flowPool, flowStepList}} = this.props;
    const steps = (flowStepList || []).map(item => <Step
      title={item.stepName}
      subTitle={"xuzhipeng 2019-12-10 50:55"}
      status={item.handleStatus}
      key={item.id}
      description={this.renderDescription(item)}/>);
    return <Steps direction="vertical" current={this.state.current}>{steps}</Steps>
  };

  render() {
    const {guardFlowEntry: {flowPool, flowStepList, flowServiceModel}} = this.props;
    const createStep = (flowStepList || [{}])[0];
    const currFlowStep = ((flowStepList || [{}])[this.state.current] || {});
    const steps = this.renderSteps();
    // 操作按钮参数
    const operatorButtonProps = this.getOperatorButtonProps();
    const guardFlowFormProps = {
      userModel: this.state.userModel,
      createStep,
      currFlowStep,
      flowPool,
      flowServiceModel,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row style={{height: window.innerHeight - 250}}>
            <Col span={18}><GuardFlowForm {...guardFlowFormProps} ref={r => this.guardFlowForm = r}/></Col>
            <Col span={6}>{steps}</Col>
          </Row>
          <Row style={{textAlign: 'center'}}><OperatorButton {...operatorButtonProps} /></Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default GuardFlowEntry;
