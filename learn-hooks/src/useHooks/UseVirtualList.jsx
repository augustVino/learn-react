import React from 'react';
import { useVirtualList } from 'ahooks';

// 动态指定每个元素的高度
const ChildCom = () => {
    const [value, onChange] = React.useState(0);
    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
        Array.from(Array(99999).keys()),
        {
            itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
            overscan: 10,
        },
    );
    return (
        <div>
            <div style={{ textAlign: 'right', marginBottom: 16 }}>
                <input
                    style={{ width: 120 }}
                    placeholder="line number"
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <button
                    style={{ marginLeft: 8 }}
                    type="button"
                    onClick={() => {
                        scrollTo(Number(value));
                    }}
                >
                    scroll to
          </button>
            </div>
            <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
                <div {...wrapperProps}>
                    {list.map((ele) => (
                        <div
                            style={{
                                height: ele.index % 2 === 0 ? 42 : 84,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #e8e8e8',
                                marginBottom: 8,
                            }}
                            key={ele.index}
                        >
                            Row: {ele.data} size: {ele.index % 2 === 0 ? 'small' : 'large'}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default () => {
    const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(99999).keys()), {
        // 视区上、下额外展示的 dom 节点数量
        overscan: 10,
        // 行高度，静态高度可以直接写入像素值，动态高度可传入函数
        itemHeight: 60,
    });
    return (
        <>
            <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
                <div {...wrapperProps}>
                    {list.map((ele) => (
                        <div
                            style={{
                                height: 52,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #e8e8e8',
                                marginBottom: 8,
                            }}
                            key={ele.index}
                        >
                            Row: {ele.data}
                        </div>
                    ))}
                </div>
            </div>

            <ChildCom />
        </>
    );
};