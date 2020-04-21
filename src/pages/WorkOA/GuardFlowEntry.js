import React from 'react';
import {connect} from "dva/index";
import {Card, Modal, Tabs, message} from 'antd';
import appConfig from "@/config/appConfig";
import styles from '@/pages/common.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from "./components/flowRecord/SearchForm";
import FlowRecordTable from "./components/flowRecord/FlowRecordTable";
import OperatorButton from "../../components/SmartCampus/AuthorityToolbar/OperatorButton";
import enums from "./config/enums";
import FlowSelectModal from "./components/flowRecord/FlowSelectModal";
import router from "umi/router";

const {TabPane} = Tabs;

@connect(({loading, todoFlowRecord, alreadyFlowRecord, myCreateFlowRecord}) => ({
  loading,
  todoFlowRecord,
  alreadyFlowRecord,
  myCreateFlowRecord
}))
class GuardFlowEntry extends React.PureComponent {

  state = {};

  componentDidMount() {

  }

  render() {

    return (
      <PageHeaderWrapper>
        <div>sdsadsa</div>
      </PageHeaderWrapper>
    );
  }
}

export default GuardFlowEntry;
