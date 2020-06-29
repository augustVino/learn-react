import React from 'react'
import 'antd/dist/antd.css';
// 请求
import UseRequest from './UseRequest'
// 表单与table联动
import UseAntdTable from './UseAntdTable'
// 拖拽
import UseDrop from './UseDrop'
// checkbox 联动（多选，单选，全选）
import UseSelections from './UseSelections'
// 提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。
import UseVirtualList from './UseVirtualList'
// 一个跟踪鼠标位置的 Hook
import UseMouse from './UseMouse'

export default function Index() {
    return (
        <>
            {/* <UseRequest /> */}
            {/* <UseAntdTable /> */}
            {/* <UseDrop /> */}
            {/* <UseSelections /> */}
            {/* <UseVirtualList /> */}
            <UseMouse />
        </>
    );
}
