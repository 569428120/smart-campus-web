import React, {PureComponent} from 'react';
import {Radio, Form, Input, Modal, Select} from "antd";
import PropTypes from "prop-types";
import enums from "@/pages/HumanManage/config/enums";
import {modalWidth} from '@/utils/utils';
import StudentContactTable from "./StudentContactTable";
import OperatorButton from "../../../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import {guid} from "../../../../utils/utils";

const {TextArea} = Input;

@Form.create()
class StudentContactModal extends PureComponent {

  state = {
    contactList: [],
    selectedRowKeys: [],
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  }

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, studentModel} = this.props;
    const {contactList} = this.state;
    const {id: studentId} = (studentModel || {});
    validateFields((errors, values) => {
      if (errors === null) {
        onOk && onOk(contactList, studentId, openType);
      }
    });
  };

  onTableSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
  };

  onDeleteStudentContact = (ids) => {
    const {contactList} = this.state;
    const deleteFunc = () => {
      this.setState({
        contactList: (contactList || []).filter(item => !(ids || []).includes(item.id)),
        selectedRowKeys: []
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

  onCreateStudentContact = () => {
    const {contactList} = this.state;
    if ((contactList || []).find(item => item.isNew)) {
      console.log("已存在不能新增");
      return;
    }
    contactList.push({
      id: guid(),
      isNew: true,
    });
    this.setState({
      contactList: [...contactList]
    });
  };

  onPutStudentContact = (values) => {
    const {contactList} = this.state;
    const model = (contactList || []).pop();
    if (!model.isNew) {
      console.error("数据错误，新增数据丢失");
      return;
    }
    this.setState({
      contactList: [...contactList, {...model, ...values, isNew: false}]
    })
  };

  getOperatorButtonProps = () => {
    const {selectedRowKeys} = this.state;
    const buttonList = [
      {
        icon: 'plus',
        type: 'primary',
        text: '新增',
        operatorKey: 'student-contact-add',
        onClick: () => this.onCreateStudentContact(),
      }
    ];
    if ((selectedRowKeys || []).length > 0) {
      buttonList.push({
        icon: '',
        type: '',
        text: '删除',
        operatorKey: 'student-contact-delete',
        onClick: () => this.onDeleteStudentContact(selectedRowKeys),
      });
    }
    return {buttonList};
  };

  render() {
    const {
      visible,
      openType,
      studentModel,
      loading,
      okLoading,
      onOk,
      onCancel,
      form,
    } = this.props;

    const familyTypeSelectOptions = Object.keys(enums.FamilyType).map(pKey => {
      const {key, value} = (enums.FamilyType[pKey] || {});
      return <Select.Option key={key} value={key}>{value}</Select.Option>
    });

    const studentContactTableProps = {
      height: 350,
      dataSource: this.state.contactList,
      selectedRowKeys: this.state.selectedRowKeys,
      loading,
      form,
      onPutStudentContact: this.onPutStudentContact,
      onTableSelectChange: this.onTableSelectChange,
    };

    const operatorButtonProps = this.getOperatorButtonProps();

    return <Modal
      title={"家长联系人"}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={650}
      onCancel={onCancel}
      confirmLoading={okLoading}
      okText="确认"
      cancelText="取消"
    >
      <OperatorButton {...operatorButtonProps} />
      <StudentContactTable {...studentContactTableProps}/>
    </Modal>;
  }
}


StudentContactModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 学生数据
  studentModel: PropTypes.object,
  // 确认按钮加载
  okLoading: PropTypes.bool,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

StudentContactModal.defaultProps = {};

export default StudentContactModal;


