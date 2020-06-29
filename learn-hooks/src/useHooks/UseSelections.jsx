import { Checkbox, Col, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { useSelections } from 'ahooks';

const ChildCom = () => {
    const [hideOdd, setHideOdd] = useState(false);

    const list = useMemo(() => {
        if(hideOdd){
            return [
                {value:2, label: '李四'},
                {value:4, label: '马六'}
            ]
        }
        return [
            {value:1, label:'张三'},
            {value:2, label: '李四'},
            {value:3, label:'王五'},
            {value:4, label: '马六'}
        ]
    }, [hideOdd]);
    const {
        selected,
        isSelected,
        allSelected,
        toggleAll,
        toggle,
        partiallySelected,
        setSelected
    } = useSelections(list,[list[1]])
    console.log(selected)
    return (
        <div>
            <div>Selected：{selected.map(item => item.label).join(',')}</div>
            <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
                <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
                    Check all
                </Checkbox>
                <Checkbox checked={hideOdd} onClick={() => {
                    setHideOdd((v) => !v);
                    // 重置选中项
                    setSelected([]);
                }}>
                    Hide Odd
                </Checkbox>
            </div>
            <Row style={{ padding: '10px 0' }}>
                {list.map(o => (
                    <Col span={12} key={o.value}>
                        <Checkbox checked={isSelected(o)} onClick={() => toggle(o)}>
                            {o.label}
                        </Checkbox>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default () => {
    const [hideOdd, setHideOdd] = useState(false);

    const list = useMemo(() => {
        if(hideOdd){
            return [2,4,6,8]
        }
        return [1,2,3,4,5,6,7,8]
    }, [hideOdd]);

    const {
        // 已经选择的元素,array
        selected,
        // 是否全选,boolean
        allSelected,
        // 是否被选择,boolean
        isSelected,
        // 反选元素
        toggle,
        // 反选全部元素
        toggleAll,
        // 是否半选,boolean
        partiallySelected
    } = useSelections(list, [2]);

    return (
        <div>
            <div>Selected：{selected.join(',')}</div>
            <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
                <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
                    Check all
                </Checkbox>
                <Checkbox checked={hideOdd} onClick={() => setHideOdd((v) => !v)}>
                    Hide Odd
                </Checkbox>
            </div>
            <Row style={{ padding: '10px 0' }}>
                {list.map(o => (
                    <Col span={12} key={o}>
                        <Checkbox checked={isSelected(o)} onClick={() => toggle(o)}>
                            {o}
                        </Checkbox>
                    </Col>
                ))}
            </Row>

            <ChildCom />
        </div>
    )
}