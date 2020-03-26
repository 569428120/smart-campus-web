import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import {parse, stringify} from 'qs';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

/**
 *   最小宽度
 * @param minWidth
 */
export function modalWidth(minWidth) {
  if (window.innerWidth <= minWidth) {
    return window.innerWidth;
  }
  return minWidth;
}


/**
 *  将树结构的数据转换为map
 * @param treeData
 * @param idToModelMap
 * @param pidToModelsMap
 * @param pid
 */
export function treeDataToMap(treeData, idToModelMap, pidToModelsMap, pid = 'root') {
  if ((treeData || []).length <= 0) {
    return
  }
  pidToModelsMap.set(pid, treeData);
  treeData.forEach(item => {
    const {children, id} = item;
    idToModelMap.set(id, item);
    treeDataToMap(children, idToModelMap, pidToModelsMap, id);
  });
}

/**
 * 　　删除数组中的元素
 * @param arr
 * @param val
 */
export function arrRemove(arr, val) {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

/**
 *  获取当前节点的所有父节点
 * @param idToTreeMap
 * @param pidToTreesMap
 * @param record
 */
export function getTreePids(idToTreeMap, pidToTreesMap, record) {
  if (!record) {
    return [];
  }
  const pids = [];
  let pRecord = record;
  do {
    pRecord = idToTreeMap.get(pRecord.pid, undefined);
    if (pRecord) {
      pids.push(pRecord.id);
    }
  } while (pRecord !== undefined);
  return pids;
}

/**
 *  所有子节点
 * @param idToTreeMap
 * @param pidToTreesMap
 * @param record
 */
export function getTreeChildrenIds(idToTreeMap, pidToTreesMap, record) {
  if (!record) {
    return [];
  }

  const getChildren = (children) => {
    if ((children || []).length <= 0) {
      return [];
    }
    const nChildren = [];
    children.forEach(item => {
      nChildren.push(...(pidToTreesMap.get(item.id) || []));
    });
    return nChildren;
  };

  const childrenIds = [];
  let children = (pidToTreesMap.get(record.id) || []);
  do {
    childrenIds.push(...children.map(item => item.id));
    children = getChildren(children);
  } while ((children || []).length > 0);

  return childrenIds;
}

/**
 *   树结构数据级联选择和取消选择的处理方法
 *    一个元素选择，则父节点和子节点都要选择
 *    一个元素取消，子节点都要取消，父节点在所有子节点取消后也取消
 * @param idToTreeMap
 * @param pidToTreesMap
 * @param selectedRowKeys
 * @param record
 * @param selected
 */
export function treePidAndChildRecords(idToTreeMap, pidToTreesMap, selectedRowKeys, record, selected) {
  // 递归退出条件
  if (!record) {
    return [];
  }

  const allPids = getTreePids(idToTreeMap, pidToTreesMap, record);
  const allChildrenIds = getTreeChildrenIds(idToTreeMap, pidToTreesMap, record);

  if (selected === true) {
    if (!selectedRowKeys.includes(record.id)) {
      selectedRowKeys.push(record.id);
    }
    allPids.forEach(id => {
      if (!selectedRowKeys.includes(id)) {
        selectedRowKeys.push(id)
      }
    });
    allChildrenIds.forEach(id => {
      if (!selectedRowKeys.includes(id)) {
        selectedRowKeys.push(id)
      }
    })
  } else {
    // 删除本身
    arrRemove(selectedRowKeys, record.id);
    // 子节点全部取消
    allChildrenIds.forEach(id => arrRemove(selectedRowKeys, id));
    // 父节点如果没有子节点了就取消
    allPids.forEach(id => {
      const pChildren = pidToTreesMap.get(id, []);
      if (!pChildren.find(item => selectedRowKeys.includes(item.id))) {
        arrRemove(selectedRowKeys, id);
      }
    })
  }
}

/**
 *   获取树节点的key
 * @param treeData
 * @param key
 */
export function getTreeKeys(treeData, key) {
  if ((treeData || []).length <= 0) {
    return [];
  }
  const keys = [];
  treeData.forEach(item => {
    keys.push(item[key]);
    keys.push(...getTreeKeys(item.children, key))
  });
  return keys;
}


