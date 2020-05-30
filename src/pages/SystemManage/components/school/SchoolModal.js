import React, {PureComponent} from 'react';
import {Form, Input, Modal, Select, Steps, Button} from "antd";
import PropTypes from "prop-types";
import enums from '@/pages/SystemManage/config/enums';
import * as regionService from "../../services/regionService";

const {TextArea} = Input;
const {Option} = Select;
const {Step} = Steps;
const FormItem = Form.Item;

/**
 *  新增修改弹窗
 */
@Form.create()
class SchoolModal extends PureComponent {
  state = {
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

  /**
   *  提交数据
   */
  onSubmit = () => {
    const {form: {validateFields}, onOk, openType} = this.props;
    const {dataSource} = this.state;
    validateFields((errors, values) => {
      if (errors === null) {
        onOk && onOk({...values, ...dataSource}, openType);
      }
    });
  };

  backward = () => {
    const {onCurrentStepChange, currentStep, form: {resetFields}} = this.props;
    onCurrentStepChange && onCurrentStepChange(currentStep - 1);
    resetFields();
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

  close = () => {
    const {onCancel} = this.props;
    onCancel && onCancel();
  };

  renderBasicContent = () => {
    const {
      openType,
      regionList,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {dataSource} = this.state;
    const {regionId, schoolName, description} = (dataSource || {});
    const regionOptions = (regionList || []).map(item => <Option key={item.id}
                                                                 value={item.id}>{item.regionName}</Option>);
    return [
      <FormItem key="regionId" {...this.formLayout} label="所属教育局">
        {getFieldDecorator('regionId', {
          initialValue: regionId,
          rules: [
            {
              required: true,
              message: '所属教育局必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(
          <Select placeholder={"请选择所属教育局"}
                  disabled={openType === 'view'}
                  style={{width: '100%'}}>
            {regionOptions}
          </Select>
        )}
      </FormItem>,
      <FormItem key="schoolName" {...this.formLayout} label="学校名称">
        {getFieldDecorator('schoolName', {
          initialValue: schoolName,
          rules: [
            {
              required: true,
              message: '学校名称必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input placeholder={"请输入学校名称，如：xxx学校"} disabled={openType === 'view'}/>)}
      </FormItem>,
      <FormItem key="description" {...this.formLayout} label="描述">
        {getFieldDecorator('description', {
          initialValue: description,
          rules: [
            {
              max: 255,
              message: '长度不能超过255',
            },
          ]
        })(<TextArea placeholder={"请输入描述"} disabled={openType === 'view'} rows={4}/>)}
      </FormItem>,
    ]
  };

  renderAdminContent = () => {
    const {
      openType,
      form: {
        getFieldDecorator

      }
    } = this.props;
    const {dataSource} = this.state;
    const {userName, password, contact} = (dataSource || {});
    return [
      <FormItem key="contact" {...this.formLayout} label="手机号码">
        {getFieldDecorator('contact', {
          initialValue: contact,
          rules: [
            {
              required: true,
              message: '手机号码必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ]
        })(<Input placeholder={"请输入手机号码"} disabled={openType === 'view'}/>)}
      </FormItem>,
      <FormItem key="password" {...this.formLayout} label="登录密码">
        {getFieldDecorator('password', {
          initialValue: password,
          rules: [
            {
              required: true,
              message: '登录密码必填',
            },
            {
              max: 64,
              message: '长度不能超过64',
            },
          ],
        })(<Input placeholder={"请输入登录密码"} disabled={openType === 'view'}/>)}
      </FormItem>,
    ]
  };

  renderTemplateContent = () => {
    const {
      openType,
      authorityTemplateList,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {dataSource} = this.state;
    const {authorityTemplateId} = (dataSource || {});
    const authorityTemplateOptions = (authorityTemplateList || []).map(item => <Option key={item.id}
                                                                                       value={item.id}>{item.authorityName}</Option>);
    return [
      <FormItem key="authorityTemplateId" {...this.formLayout} label="权限模板">
        {getFieldDecorator('authorityTemplateId', {
          initialValue: authorityTemplateId,
          rules: [
            {
              required: true,
              message: '权限模板必填',
            }
          ],
        })(<Select placeholder={"请选择管理员权限模板"}
                   disabled={openType === 'view'}
                   style={{width: '100%'}}>{authorityTemplateOptions}</Select>)}
      </FormItem>
    ]
  };

  renderFooter = currentStep => {
    const {mDisabled, confirmLoading} = this.props;
    const {buttonList} = (this.stepList[currentStep] || {});
    return (buttonList || []).map(({text, ...ret}) => <Button
      loading={ret.key === 'submit' && confirmLoading} disabled={mDisabled} {...ret} >
      {text}
    </Button>)
  };

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
      key: 'AdminUserSetting',
      title: '管理员用户设置',
      renderContent: () => this.renderAdminContent(),
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
      key: 'TemplateSetting',
      title: '模板设置',
      renderContent: () => this.renderTemplateContent(),
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


  render() {
    const {
      visible,
      openType,
      dataSource,
      currentStep,
      onOk,
      onCancel,
      confirmLoading,
      form: {
        getFieldDecorator
      }
    } = this.props;

    // 回显的数据
    const steps = this.stepList.map(({key, title}) => <Steps.Step key={key} title={title}/>);
    const {renderContent} = (this.stepList[currentStep] || {});
    return <Modal
      title={enums.OperatorType[openType]}
      width={640}
      bodyStyle={{padding: '32px 40px 48px', height: 325}}
      destroyOnClose={true}
      visible={visible}
      onCancel={onCancel}
      footer={this.renderFooter(currentStep)}
    >
      <Steps style={{marginBottom: 28}} size="small" current={currentStep}>{steps}</Steps>
      {renderContent && renderContent()}
    </Modal>;
  }
}

SchoolModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 下一步上一步保存按钮是否可用
  mDisabled: PropTypes.bool,
  // 权限模板
  authorityTemplateList: PropTypes.array,
  // 当前步骤
  currentStep: PropTypes.number,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
  // 步骤变化
  onCurrentStepChange: PropTypes.func,
};

SchoolModal.defaultProps = {};

export default SchoolModal;
