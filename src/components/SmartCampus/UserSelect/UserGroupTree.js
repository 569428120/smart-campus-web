import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Tree, Input, Select, Row, Col, Spin} from 'antd';

const {TreeNode} = Tree;
const {Search} = Input;
const {Option} = Select;


const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const generateList = (data, dataList) => {
  for (let i = 0; i < (data || []).length; i++) {
    const node = data[i];
    dataList.push({...node});
    if (node.children) {
      generateList(node.children, dataList);
    }
  }
};

class UserGroupTree extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  componentDidMount() {
    const {onRef} = this.props;
    onRef && onRef(this);
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const {userGroupList} = this.props;
    const {value} = e.target;
    const dataList = [];
    generateList(userGroupList, dataList);
    const expandedKeys = dataList
      .map(item => {
        if ((item.groupName || "").indexOf(value) > -1) {
          return getParentKey(item.id, dataList);
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
      loading,
      typeDefaultValue,
      typeValue,
      userTypeList,
      userGroupList,
      selectedKeys,
      onSelectChange,
      onTypeChange
    } = this.props;

    const loop = data =>
      data.map(item => {
        const groupName = (item.groupName || "");
        const index = groupName.indexOf(searchValue);
        const beforeStr = groupName.substr(0, index);
        const afterStr = groupName.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{color: '#f50'}}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{groupName}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.id} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.id} title={title}/>;
      });
    const typeOptions = (userTypeList || []).map(({key, value}) => <Option key={key} value={key}>{value}</Option>);
    return <div>
      <Spin spinning={!!loading}>
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
            <Search style={{marginBottom: 8}}
                    placeholder="请输入"
                    value={this.state.searchValue}
                    onChange={this.onChange}/>
          </Col>
        </Row>
        <Tree
          style={{overflow: 'auto', height: height - 80}}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          selectedKeys={selectedKeys}
          onSelect={onSelectChange}
        >
          {loop((userGroupList || []))}
        </Tree>
      </Spin>
    </div>;
  }
}

UserGroupTree.propTypes = {
  typeValue: PropTypes.string,
  typeDefaultValue: PropTypes.string,
  userGroupList: PropTypes.array,
  userTypeList: PropTypes.array,
};

UserGroupTree.defaultProps = {};

export default UserGroupTree;
