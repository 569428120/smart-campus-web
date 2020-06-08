import React, {PureComponent} from 'react';
import {Form, Input, Modal, Tabs, Steps, Select, Button} from "antd";
import PropTypes from "prop-types";
import enums from '../../config/enums';
import {modalWidth} from '@/utils/utils';
import OperatorButton from '@/components/SmartCampus/AuthorityToolbar/OperatorButton';
import TimeQuantumTable from "./TimeQuantumTable";
import TimeQuantumModal from "./TimeQuantumModal";

const FormItem = Form.Item;
const {Step} = Steps;
const {TextArea} = Input;
const {Option} = Select;

const genId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
};

@Form.create()
class AccessStrategyModal extends PureComponent {

  state = {
    dataSource: {},
    timeQuantumList: [],//时间段
    timeQuantumModalVisible: false,
    selectedRowKeys: [],
    loading: false,
  };

  formLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 13},
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  renderBasicContent = () => {
    const {
      openType,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {dataSource} = this.state;
    const {strategyName, description} = (dataSource || {});
    return [
      <FormItem key="strategyName" {...this.formLayout} label="策略名称">
        {getFieldDecorator('strategyName', {
          initialValue: strategyName,
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
      </FormItem>,
      <FormItem key="description"  {...this.formLayout} label="描述">
        {getFieldDecorator('description', {
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

  openTimeQuantumModal = () => {
    this.setState({
      timeQuantumModalVisible: true,
    })
  };

  onQuantumTableDelete = () => {
    const {timeQuantumList, selectedRowKeys} = this.state;
    const deleteFunc = () => {
      const newTimeQuantumList = [...(timeQuantumList || [])].filter(item => !(selectedRowKeys || []).includes(item.id));
      this.setState({
        timeQuantumList: newTimeQuantumList,
        selectedRowKeys: [],
      })
    };
    Modal.confirm({
      title: '删除确认',
      content: '是否删除选择的数据',
      onOk: deleteFunc,
      okText: '确认',
      cancelText: '取消',
    });
  };

  onTimeQuantumModalOk = (values) => {
    this.setState({loading: true}, () => {
      const {timeQuantumList} = this.state;
      const newTimeQuantumList = [...timeQuantumList, {
        ...values,
        id: genId(),
        status: 'add'
      }];
      this.setState({
        timeQuantumList: newTimeQuantumList,
        timeQuantumModalVisible: false,
        loading: false
      })
    });

  };

  renderTimeQuantumContent = () => {
    const {openType} = this.props;
    const {selectedRowKeys, timeQuantumList} = this.state;
    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: 'primary',
      text: '新建',
      key: 'time-quantum-add',
      onClick: this.openTimeQuantumModal,
    });
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        key: 'time-quantum-delete',
        onClick: this.onQuantumTableDelete,
      });
    }
    const operatorButtonProps = {
      buttonList
    };
    const tableProps = {
      height: 120,
      dataSource: timeQuantumList,
      loading: false,
      selectedRowKeys,
      onTableSelectChange: (selectedRowKeys) => this.setState({selectedRowKeys}),
    };
    return <div>
      {['add', 'edit'].includes(openType) ? <OperatorButton {...operatorButtonProps} /> : null}
      <TimeQuantumTable {...tableProps}/>
    </div>
  };

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {dataSource} = this.state;
    const {form: {validateFields}, openType} = this.props;
    validateFields((errors, values) => {
      if (errors === null) {
        onOk && onOk({...dataSource, ...values}, openType);
      }
    });
  };

  close = () => {
    const {onCancel} = this.props;
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
      key: 'TimeQuantum',
      title: '时间段设置',
      renderContent: () => this.renderTimeQuantumContent(),
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
      onOk,
      onCancel,
    } = this.props;
    //时间段
    const steps = this.stepList.map(({key, title}) => <Steps.Step key={key} title={title}/>);
    const {renderContent} = (this.stepList[currentStep] || {});
    const timeQuantumModalProps = {
      visible: this.state.timeQuantumModalVisible,
      openType,
      dataSource: {},
      okLoading: this.state.loading,
      onOk: this.onTimeQuantumModalOk,
      onCancel: () => this.setState({timeQuantumModalVisible: false})
    };
    return (
      <div>
        <Modal
          title={enums.OperatorType[openType]}
          width={800}
          destroyOnClose={true}
          visible={visible}
          bodyStyle={{padding: '32px 40px 48px'}}
          footer={this.renderFooter(currentStep)}
          onCancel={onCancel}
        >
          <Steps style={{marginBottom: 28}} size="small" current={currentStep}>{steps}</Steps>
          {renderContent && renderContent()}
        </Modal>
        <TimeQuantumModal {...timeQuantumModalProps}/>
      </div>
    );
  }
}


AccessStrategyModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 下一步上一步保存按钮是否可用
  mDisabled: PropTypes.bool,
  // 当前步骤
  currentStep: PropTypes.number,
  // 步骤变化
  onCurrentStepChange: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

AccessStrategyModal.defaultProps = {};

export default AccessStrategyModal;


