import React, {PureComponent} from 'react';
import {Select} from "antd";
import enums from "../../../config/enums"

class WeekRangeSelect extends PureComponent {

  state = {
    startWeekList: [],
    endWeekList: [],
  };

  componentDidMount() {
    this.setState({
      startWeekList: enums.weekList,
      endWeekList: enums.weekList
    })
  }

  handleStartWeekChange = (startWeek) => {
    const {startWeekList} = this.state;
    const endWeekList = [];
    startWeekList.forEach(item => {
      if (item.val >= startWeek) {
        endWeekList.push(item);
      }
    });
    const endWeek = endWeekList.length > 0 ? endWeekList[0].val : this.getEndWeek();
    const week = `${startWeek}-${endWeek}`;
    this.triggerChange(week);
    this.setState({
      endWeekList
    })
  };

  handleEndWeekChange = (endWeek) => {
    const startWeek = this.getStartWeek();
    const week = `${startWeek}-${endWeek}`;
    this.triggerChange(week)
  };

  triggerChange = changedValue => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  getStartWeek = () => {
    const {value: week} = this.props;
    const arr = (week || "").split("-");
    if (arr.length !== 2) {
      return "";
    }
    if (arr[0] === "" || arr[0] === "null") {
      return "";
    }
    return arr[0];
  };

  getEndWeek = () => {
    const {value: week} = this.props;
    const arr = (week || "").split("-");
    if (arr.length !== 2) {
      return "";
    }
    if (arr[1] === "" || arr[0] === "null") {
      return "";
    }
    return arr[1];
  };

  render() {
    const {value} = this.props;
    const startWeek = this.getStartWeek();
    const endWeek = this.getEndWeek();
    const startWeekOptions = this.state.startWeekList.map(item => {
      const {key, val} = item;
      return <Select.Option key={val} value={val}>{key}</Select.Option>
    });
    const endWeekOptions = this.state.endWeekList.map(item => {
      const {key, val} = item;
      return <Select.Option key={val} value={val}>{key}</Select.Option>
    });
    return <span>
      <Select
        value={startWeek}
        style={{width: '45%'}}
        onChange={this.handleStartWeekChange}
      >
        {startWeekOptions}
      </Select>
      <span style={{width: '10%'}}> ~ </span>
       <Select
         value={endWeek}
         style={{width: '45%'}}
         onChange={this.handleEndWeekChange}
       >
        {endWeekOptions}
      </Select>
    </span>;
  }
}

export default WeekRangeSelect;
