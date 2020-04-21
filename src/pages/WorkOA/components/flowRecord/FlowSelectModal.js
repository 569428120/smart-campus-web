import React, {PureComponent} from 'react';
import {Button, Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import enums from "../../config/enums";
import {modalWidth} from '@/utils/utils';

const {TextArea} = Input;

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

class FlowSelectModal extends PureComponent {
  render() {
    const {
      visible,
      onSelect,
      onOk,
      onCancel,
    } = this.props;
    const flowTypeButtons = Object.keys(enums.FlowType).map(mKey => {
      const {key, value} = enums.FlowType[mKey];
      return <Button style={{width: '100%'}} key={key} onClick={() => onSelect(key)}>{value}</Button>
    });
    return <Modal
      title={"流程类型"}
      destroyOnClose={true}
      visible={visible}
      onOk={onOk}
      width={modalWidth(window.innerWidth * 0.4)}
      onCancel={onCancel}
      okText={null}
      cancelText="关闭"
    >
      {flowTypeButtons}
    </Modal>;
  }
}


FlowSelectModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 选择
  onSelect: PropTypes.func,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

FlowSelectModal.defaultProps = {};

export default FlowSelectModal;


