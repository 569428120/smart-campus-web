import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Form, Input, DatePicker} from "antd";
import enums from "../../config/enums";
import UserSelectInput from "../../../../components/SmartCampus/UserSelect/UserSelectInput";

const {TextArea} = Input;
const {RangePicker} = DatePicker;

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
class GuardFlowForm extends PureComponent {

  render() {
    const {
      flowServiceModel,
      createStep,
      currFlowStep,
      flowPool,
      openType,
      form: {
        getFieldDecorator,
      }
    } = this.props;
    const {opinion: createOpinion} = (createStep || {});
    const {applicantId, applicantName} = (flowPool || {});
    const {startTime, endTime, carNumber} = (flowServiceModel || {});
    const {opinion} = (currFlowStep || {});
    const formItems = [
      <Form.Item {...formItemLayout} label="申请人">
        {getFieldDecorator('applicantId', {
          initialValue: applicantId,
          rules: [
            {
              required: true,
              message: '申请人必填',
            },
          ],
        })(<UserSelectInput disabled={flowPool.examineStatus !== enums.FlowPoolStatus.unSubmit.key}/>)}
      </Form.Item>,
      <Form.Item  {...formItemLayout} label="时间段">
        {getFieldDecorator('timeRange', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: '申请人必填',
            },
          ],
        })(<RangePicker allowClear disabled={flowPool.examineStatus !== enums.FlowPoolStatus.unSubmit.key}/>)}
      </Form.Item>,
      <Form.Item {...formItemLayout} label="车牌号">
        {getFieldDecorator('carNumber', {
          initialValue: carNumber,
          rules: [],
        })(<Input disabled={flowPool.examineStatus !== enums.FlowPoolStatus.unSubmit.key}/>)}
      </Form.Item>,
      <Form.Item {...formItemLayout} label="申请原因">
        {getFieldDecorator('createOpinion', {
          initialValue: createOpinion,
          rules: [
            {
              required: true,
              message: '申请原因必填',
            },
            {
              max: 525,
              message: '长度不能超过525',
            },
          ]
        })(<TextArea disabled={flowPool.examineStatus !== enums.FlowPoolStatus.unSubmit.key} rows={4}/>)}
      </Form.Item>
    ];
    // 状态为待提交则显示创建表单
    if (flowPool.examineStatus === enums.FlowPoolStatus.toReviewed.key) {
      formItems.push(
        <Form.Item {...formItemLayout} label="审核意见">
          {getFieldDecorator('opinion', {
            initialValue: opinion,
            rules: [
              {
                required: true,
                message: '审核意见必填',
              },
              {
                max: 525,
                message: '长度不能超过525',
              },
            ]
          })(<TextArea disabled={openType === 'view'} rows={4}/>)}
        </Form.Item>
      )
    }

    return <Form>{formItems}</Form>;
  }
}

GuardFlowForm.propTypes = {
  userModel: PropTypes.object,
  createStep: PropTypes.object,
  currFlowStep: PropTypes.object,
  flowPool: PropTypes.object,
  flowServiceModel: PropTypes.object,
  onUserSelect: PropTypes.func,
};

GuardFlowForm.defaultProps = {};

export default GuardFlowForm;
