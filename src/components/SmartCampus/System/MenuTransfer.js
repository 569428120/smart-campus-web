import React, {PureComponent} from 'react';
import {Tree, Transfer} from "antd";

const {TreeNode} = Tree;

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({children, ...props}) => (
    <TreeNode {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({dataSource, targetKeys, ...restProps}) => {
  const transferDataSource = [];

  function flatten(list = []) {
    list.forEach(item => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }

  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({direction, onItemSelect, selectedKeys}) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(_,
                        {
                          node: {
                            props: {eventKey},
                          },
                        },) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(_,
                         {
                           node: {
                             props: {eventKey},
                           },
                         },) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
      }}
    </Transfer>
  );
};

const treeData = [
  {key: '0-0', title: '0-0'},
  {
    key: '0-1',
    title: '0-1',
    children: [{key: '0-1-0', title: '0-1-0'}, {key: '0-1-1', title: '0-1-1'}],
  },
  {key: '0-2', title: '0-3'},
];


/**
 *   菜单分配穿梭控件
 */
class MenuTransfer extends PureComponent {
  state = {
    targetKeys: [],
  };

  onChange = targetKeys => {
    console.log('Target Keys:', targetKeys);
    this.setState({targetKeys});
  };

  render() {
    const {targetKeys} = this.state;
    return <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange}/>;
  }
}

export default MenuTransfer;
