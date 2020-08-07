import React, {PureComponent} from 'react';
import {Form, Input, Modal, TreeSelect, message, Select} from "antd";
import PropTypes from "prop-types";
import enums from "../../config/enums";
import {modalWidth} from '@/utils/utils';
import PicturesWall from "./PicturesWall";
import UserSelectInput from "../../../../components/SmartCampus/UserSelect/UserSelectInput";
import config from "../../config/config";

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
class FaceModal extends PureComponent {

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource} = this.props;
    const {state: {fileList}} = (this.picturesWall || {});
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
      dataSource,
      fileList,
      okLoading,
      typeDefaultValue,
      validatorFaceModel,
      onFileListChange,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;
    const {id, description, userVo} = dataSource;

    const picturesWallProps = {
      action: config.imageApi.uploadImage,
      disabled: openType === "view",
      fileList,
      onFileListChange,
      size: 1
    };

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      confirmLoading={okLoading}
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
              {
                validator: (rule, value, callback) => validatorFaceModel(rule, {
                  userId: (value || [{}])[0].id,
                  id
                }, callback),
              },
            ],
          })(<UserSelectInput typeDefaultValue={typeDefaultValue} disabled={openType !== 'add'}/>)}
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
          })(<TextArea disabled={openType === 'view'} rows={2}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="特征照片">
          <PicturesWall {...picturesWallProps} onRef={r => this.picturesWall = r}/>
        </Form.Item>
      </Form>
    </Modal>;
  }
}


FaceModal.propTypes = {
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

FaceModal.defaultProps = {};

export default FaceModal;


