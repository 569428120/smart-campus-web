import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Tree, Input, Select, Row, Col} from 'antd';

const {TreeNode} = Tree;
const {Search} = Input;
const {Option} = Select;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({title: key, key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const {key} = node;
    dataList.push({key, title: key});
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class UserGroupTree extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const {value} = e.target;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  render() {
    const {searchValue, expandedKeys, autoExpandParent} = this.state;
    const {
      height,
      typeDefaultValue,
      typeValue,
      userTypeList,
      onTypeChange
    } = this.props;

    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{color: '#f50'}}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title}/>;
      });
    const typeOptions = (userTypeList || []).map(({key, value}) => <Option key={key} value={key}>{value}</Option>);
    return <div>
      <div style={{
        height: 40,
        textAlign: 'center',
        lineHeight: '40px',
        backgroundColor: '#D9D9D8',
        marginBottom: '2px'
      }}>用户分组
      </div>
      <Row>
        <Col span={8}>
          <Select defaultValue={typeDefaultValue} value={typeValue} onChange={onTypeChange} style={{width: '96%'}}>
            {typeOptions}
          </Select>
        </Col>
        <Col span={16}>
          <Search style={{marginBottom: 8}} placeholder="请输入" onChange={this.onChange}/>
        </Col>
      </Row>
      <Tree
        style={{overflow: 'auto', height: height - 80}}
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
      >
        {loop(gData)}
      </Tree>
    </div>;
  }
}

UserGroupTree.propTypes = {
  typeValue: PropTypes.string,
  typeDefaultValue: PropTypes.string,
  userGroupList: PropTypes.array,
  userTypeList: PropTypes.func,
};

UserGroupTree.defaultProps = {};

export default UserGroupTree;
