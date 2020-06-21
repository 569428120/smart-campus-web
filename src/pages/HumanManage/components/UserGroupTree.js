import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Tree, Input, Select, Row, Col, Menu, Dropdown, Button, message, Modal, Popconfirm, Icon, Spin, Tag} from 'antd';
import enums from "../config/enums";

const {TreeNode} = Tree;
const {Search} = Input;
const {Option} = Select;
const {SubMenu} = Menu;

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
    expandedKeys: ['root'],
    searchValue: '',
    autoExpandParent: true,
    copyExpandedKeys: ['root'],
    copyAutoExpandParent: true,
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onSearch = value => {
    const {userGroupList} = this.props;
    const dataList = [];
    generateList(userGroupList, dataList);
    const expandedKeys = dataList
      .map(item => {
        if ((item.groupName || "").indexOf(value) > -1 && value) {
          return getParentKey(item.id, userGroupList);
        }
        return "root";
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys: ["root", ...expandedKeys],
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onTreeSelect = (keys, e) => {
    const {onSelectChange, selectedRowKeys} = this.props;
    const {selected} = e;
    if ((keys || []).length <= 0 || !selected) {
      return
    }
    const key = keys[0];
    if ((selectedRowKeys || []).includes(key)) {
      return
    }
    onSelectChange && onSelectChange([key]);
  };

  treeDropdown = (title, node) => {
    const {onAddNode, onEditNode, onDeleteNode, onCopyNode, onMoveNode} = this.props;
    const menus = [
      <Menu.Item key="1" onClick={() => onAddNode && onAddNode(node)}>
        新增子节点
      </Menu.Item>,
    ];
    if ((node || {}).id) {
      menus.push(...[
        <Menu.Item key="2" onClick={() => onEditNode && onEditNode(node)}> 修改</Menu.Item>,
        <Menu.Item key="3" onClick={() => onDeleteNode && onDeleteNode(node)}>删除</Menu.Item>,
        <Menu.Item key="4" onClick={() => onMoveNode && onMoveNode(node)}>移动至</Menu.Item>,
        <Menu.Item key="5" onClick={() => onCopyNode && onCopyNode(node)}>复制至</Menu.Item>,
      ])
    }

    return <Dropdown.Button type={"link"} trigger={["click"]} overlay={<Menu>{menus}</Menu>}>
      {title}
    </Dropdown.Button>
  };

  getTreeTitle = (groupName, searchValue, item) => {
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
        <span>{(groupName || "")}</span>
      );

    const getTag = (item) => {
      const {type, gradeLevel} = item;
      if (!type) {
        return null;
      }
      if (type === "grade" && gradeLevel) {
        return <Tag color="#2db7f5">{enums.GradeLevel[gradeLevel]}</Tag>
      }
      if (type === "class") {
        return <Tag color="#87d068">{enums.StudentGroupType[type]}</Tag>
      }
      return <Tag color="#108ee9">{enums.StudentGroupType[type]}</Tag>
    };
    return <span style={{lineHeight: "10px"}}>{title}{getTag(item)}</span>;
  };

  renderTreeNode = ({data, height, onExpand, expandedKeys, selectedRowKeys, autoExpandParent, isEdit, searchValue, onSelectChange}) => {
    const loopTreeNode = (data) => {
      return data.map(item => {
        const title = this.getTreeTitle((item.groupName || ""), searchValue, item);
        if (item.children) {
          return (
            <TreeNode icon={<Icon type="folder-open"/>} key={item.key || item.id}
                      title={isEdit ? this.treeDropdown(title, item) : title}>
              {loopTreeNode(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode icon={<Icon type="folder-open"/>} key={item.key || item.id}
                         title={isEdit ? this.treeDropdown(title, item) : title}/>;
      });
    };
    return (
      <Tree
        style={{overflow: 'auto', height: height - 80}}
        showIcon
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        selectedKeys={selectedRowKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelectChange}
      >
        <TreeNode key={"root"} icon={<Icon type="folder-open"/>}
                  title={isEdit ? this.treeDropdown("root", {}) : "root"}>{loopTreeNode(data)}</TreeNode>
      </Tree>
    );
  };

  getOperatorButtonProps = () => {
    const buttonList = [];
    // 新增按钮
    buttonList.push({
      icon: 'plus',
      type: '',
      text: '导入',
      operatorKey: 'staff-group-add',
      onClick: () => this.openStaffUserModal({}, 'add'),
    });
    return {buttonList}
  };

  render() {
    const {expandedKeys, autoExpandParent} = this.state;
    const {
      height,
      title,
      userGroupList,
      selectedRowKeys,
      onSelectChange,
      isEdit,
      loading,
    } = this.props;

    const treeProps = {
      height,
      data: (userGroupList || []),
      isEdit,
      searchValue: this.state.searchValue,
      onExpand: this.onExpand,
      expandedKeys,
      selectedRowKeys,
      autoExpandParent,
      onSelectChange: this.onTreeSelect,
    };
    const treeNodes = this.renderTreeNode(treeProps);
    const operatorButtonProps = this.getOperatorButtonProps();

    return <div style={{border: '1px solid #d9d9d9'}}>
      <Row style={{
        height: 40,
        textAlign: 'center',
        lineHeight: '40px',
        backgroundColor: '#D9D9D8',
        marginBottom: '2px'
      }}>
        <Col span={24}>{title || "用户分组"}</Col>
      </Row>
      <Row>
        <Search style={{marginBottom: 8}} allowClear placeholder="请输入" onSearch={this.onSearch}/>
      </Row>
      <Spin spinning={loading}>{treeNodes}</Spin>
    </div>;
  }
}

UserGroupTree.propTypes = {
  isEdit: PropTypes.bool,
  height: PropTypes.number,
  userGroupList: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  onSelectChange: PropTypes.func,
  onAddNode: PropTypes.func,
  onDeleteNode: PropTypes.func,
  onCopyNode: PropTypes.func,
  onMoveNode: PropTypes.func,
};

UserGroupTree.defaultProps = {
  isEdit: true
};

export default UserGroupTree;
