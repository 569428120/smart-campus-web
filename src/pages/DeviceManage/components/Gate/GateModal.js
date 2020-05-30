import React, {PureComponent} from 'react';
import {Form, Input, Modal, Timeline, Select, Steps, message, Button, Row, Col, Progress} from "antd";
import PropTypes from "prop-types";
import enums from "../../config/enums";
import * as gateService from "../../services/gateService"


const FormItem = Form.Item;
const {Step} = Steps;
const {TextArea} = Input;
const {Option} = Select;

@Form.create()
class GateModal extends PureComponent {
  state = {
    testInterval: undefined,
    dataSource: {}
  };

  formLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 13},
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  componentWillUnmount() {
    // 关闭定时器
    this.clearTestInterval();
  };

  /**
   *  初始化dataSource数据
   * @param dataSource
   */
  onInitDataSource = (dataSource) => {
    const {form: {resetFields}} = this.props;
    this.setState({dataSource}, () => {
      resetFields();
    })
  };

  close = () => {
    const {onCancel} = this.props;
    this.clearTestInterval();
    onCancel && onCancel();
  };

  handleNext = () => {
    const {dataSource} = this.state;
    const {form: {validateFields}, onCurrentStepChange, currentStep} = this.props;
    validateFields((errors, values) => {
      if (errors === null) {
        onCurrentStepChange && onCurrentStepChange(currentStep + 1);
        this.setState({
          dataSource: {
            ...dataSource,
            ...values
          }
        })
      }
    });
  };

  backward = () => {
    const {onCurrentStepChange, currentStep, form: {resetFields}} = this.props;
    onCurrentStepChange && onCurrentStepChange(currentStep - 1);
    resetFields();
  };

  /**
   *  提交数据
   */
  onSubmit = () => {
    const {onOk, openType} = this.props;
    const {dataSource} = this.state;
    onOk(dataSource, openType);
  };


  /**
   *  步骤对应的表格内容
   * @type {{}}
   */
  stepList = [
    {
      key: 'Basic',
      title: '基本信息',
      renderContent: () => this.renderBasicContent(),
      buttonList: [
        {
          key: "cancel",
          text: "取消",
          onClick: this.close,
        },
        {
          key: "forward",
          type: "primary",
          text: "下一步",
          onClick: this.handleNext,
        },
      ],
    },
    {
      key: 'DeviceSetting',
      title: '设备配置',
      renderContent: () => this.renderSettingContent(),
      buttonList: [
        {
          key: "back",
          text: "上一步",
          style: {float: 'left'},
          onClick: this.backward,
        },
        {
          key: "cancel",
          text: "取消",
          onClick: this.close,
        },
        {
          key: "forward",
          type: "primary",
          text: "下一步",
          onClick: this.handleNext,
        },
      ],
    },
    {
      key: 'Test',
      title: '设备连接测试',
      renderContent: () => this.renderTestContent(),
      buttonList: [
        {
          key: "back",
          text: "上一步",
          style: {float: 'left'},
          onClick: this.backward,
        },
        {
          key: "cancel",
          text: "取消",
          onClick: this.close,
        },
        {
          key: "submit",
          type: "primary",
          text: "保存",
          onClick: this.onSubmit,
        },
      ],
    }
  ];


  /**
   *  获取设备类型列表
   */
  getDeviceTypeList = (manufacturerId) => {
    const {
      manufacturerList,
    } = this.props;
    const manufacturer = (manufacturerList || []).find(item => item.id === manufacturerId);
    return (manufacturer || {}).deviceTypeList;
  };

  onManufacturerChange = (manufacturerId) => {
    const {
      dataSource
    } = this.state;
    const {
      form: {
        setFieldsValue
      }
    } = this.props;
    setFieldsValue({manufacturerType: null});
    this.setState({
      dataSource: {
        ...dataSource,
        manufacturerId
      }
    })
  };

  /**
   *  基本信息表单
   */
  renderBasicContent = () => {
    const {
      openType,
      manufacturerList,
      form
    } = this.props;
    const {dataSource} = this.state;
    const {manufacturerId, manufacturerType, description} = dataSource;
    const manufacturerOptions = (manufacturerList || []).map(item => <Option key={item.id}
                                                                             value={item.id}>{item.name}</Option>);
    const deviceTypeList = this.getDeviceTypeList(manufacturerId);
    const deviceTypeOptions = (deviceTypeList || []).map(item => <Option key={item.id}
                                                                         value={item.id}>{`${item.name} ${item.version}`}</Option>);

    return [
      <FormItem key="manufacturerId" {...this.formLayout} label="设备厂商">
        {form.getFieldDecorator('manufacturerId', {
          initialValue: manufacturerId,
          rules: [
            {
              required: true,
              message: '设备厂商必填',
            },
          ]
        })(
          <Select placeholder={"请选择"} onChange={this.onManufacturerChange}
                  style={{width: '100%'}}>{manufacturerOptions}</Select>
        )}
      </FormItem>,
      <FormItem key="manufacturerType" {...this.formLayout} label="设备型号">
        {form.getFieldDecorator('manufacturerTypeId8', {
          initialValue: manufacturerType,
          rules: [
            {
              required: true,
              message: '设备型号必填',
            },
          ]
        })(
          <Select placeholder={"请选择"} style={{width: '100%'}}>{deviceTypeOptions}</Select>
        )}
      </FormItem>,
      <FormItem key="description"  {...this.formLayout} label="描述">
        {form.getFieldDecorator('description', {
          initialValue: description,
          rules: [
            {
              max: 525,
              message: '长度不能超过525',
            },
          ]
        })(<TextArea placeholder={"关于设备的描述"} disabled={openType === 'view'} rows={4}/>)}
      </FormItem>
    ]
  };

  renderSettingContent = () => {
    const {
      openType,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {dataSource} = this.state;
    const {deviceId, netAddress, userName, password} = dataSource;
    return [
      <Form.Item key="deviceId"  {...this.formLayout} label="DeviceID">
        {getFieldDecorator('deviceId', {
          initialValue: deviceId,
          rules: [
            {
              required: true,
              message: 'DeviceID必填',
            },
            {
              validator: async (rule, value) => gateService.validatorGate({"deviceId": value})
            }
          ],
        })(<Input placeholder={"设备的DeviceID"} disabled={openType === 'view'}/>)}
      </Form.Item>,
      <Form.Item key="netAddress"  {...this.formLayout} label="网络地址">
        {getFieldDecorator('netAddress', {
          initialValue: netAddress,
          rules: [
            {
              required: true,
              message: '网络地址必填',
            },
          ],
        })(<Input placeholder={"例如：10.10.0.1:80"} disabled={openType === 'view'}/>)}
      </Form.Item>,
      <Form.Item key="userName"  {...this.formLayout} label="用户名">
        {getFieldDecorator('userName', {
          initialValue: userName,
          rules: [
            {
              required: true,
              message: '用户名必填',
            },
          ],
        })(<Input disabled={openType === 'view'}/>)}
      </Form.Item>,
      <Form.Item key="password"  {...this.formLayout} label="密码">
        {getFieldDecorator('password', {
          initialValue: password,
          rules: [
            {
              required: true,
              message: '用户名必填',
            },
          ],
        })(<Input.Password disabled={openType === 'view'}/>)}
      </Form.Item>,
    ];
  };

  renderTestContent = () => {
    const {testLog, onStartTest} = this.props;
    const {status, percent, logDesc, logList} = (testLog || {});
    const logItems = (logList || []).map(item => <Timeline.Item key={item.id}>
      {item.createTime + " " + item.logText}
    </Timeline.Item>);
    return <div>
      <Row>
        <Col span={20}><Progress status={status} percent={percent}/></Col>
        <Col span={4}><Button onClick={this.onStartTestInterval}
                              loading={this.state.testInterval !== undefined}>开始</Button></Col>
      </Row>
      <Timeline style={{height: 250, overflow: 'auto'}} reverse={'normal' === status}>{logItems}</Timeline>
    </div>
  };

  clearTestInterval = () => {
    const {testInterval} = this.state;
    clearInterval(testInterval);
    this.setState({
      testInterval: undefined
    })
  };

  onRefreshTestData = () => {
    const {testLog, onRefreshTest} = this.props;
    const {status} = (testLog || {});
    onRefreshTest && onRefreshTest(testLog);
    // 停止刷新数据
    if (status !== 'normal') {
      this.clearTestInterval();
    }
  };

  onStartTestInterval = () => {
    const {onStartTest, onRefreshTest, form: {getFieldValue}} = this.props;
    const {testInterval, dataSource} = this.state;
    if (testInterval !== undefined) {
      message.info("已经启动，请勿重复点击");
      return;
    }
    const {deviceId} = dataSource;
    if (!deviceId) {
      message.info("设备id不能为空");
      return;
    }
    onStartTest && onStartTest(deviceId, () => {
      // 3秒执行一次
      this.setState({
        testInterval: setInterval(this.onRefreshTestData, 3000)
      })
    });
  };

  renderFooter = currentStep => {
    const {testInterval} = this.state;
    const {mDisabled} = this.props;
    const disabled = (testInterval !== undefined) || mDisabled;
    const {buttonList} = (this.stepList[currentStep] || {});
    return (buttonList || []).map(({text, ...ret}) => <Button disabled={disabled} {...ret} >{text}</Button>)
  };

  render() {
    const {
      visible,
      openType,
      currentStep,
      confirmLoading,
      onOk,
      onCancel,
    } = this.props;

    const steps = this.stepList.map(({key, title}) => <Steps.Step key={key} title={title}/>);
    const {renderContent} = (this.stepList[currentStep] || {});
    return <Modal
      width={640}
      title={`${enums.OperatorType[openType]}设备`}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose={true}
      visible={visible}
      confirmLoading={confirmLoading}
      footer={this.renderFooter(currentStep)}
      onCancel={onCancel}
    >
      <Steps style={{marginBottom: 28}} size="small" current={currentStep}>{steps}</Steps>
      {renderContent && renderContent()}
    </Modal>;
  }
}


GateModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 下一步上一步保存按钮是否可用
  mDisabled: PropTypes.bool,
  // 回显的数据
  dataSource: PropTypes.object,
  // 厂商列表
  manufacturerList: PropTypes.array,
  // 当前步骤
  currentStep: PropTypes.number,
  // 测试日志
  testLog: PropTypes.object,
  // 步骤变化
  onCurrentStepChange: PropTypes.func,
  // 启动测试方法
  onStartTest: PropTypes.func,
  // 刷新测试数据
  onRefreshTest: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

GateModal.defaultProps = {};

export default GateModal;


