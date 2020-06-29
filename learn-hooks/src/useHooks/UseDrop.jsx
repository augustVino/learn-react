/**
 * useDrop 可以单独使用来接收文件、文字和网址的拖拽。
 * useDrag 允许一个 dom 节点被拖拽，需要配合 useDrop 使用。
 * 向节点内触发粘贴时也会被视为拖拽的内容
 */

import React from 'react';
import { useDrop, useDrag } from 'ahooks';

export default () => {
    const getDragProps = useDrag();
    const [props, { isHovering }] = useDrop({
        onText: (text, e) => {
            console.log(text,e);
        },
        onFiles: (files, e) => {
            console.log(files,e);
        },
        onUri: (uri, e) => {
            console.log(uri,e);
        },
        onDom: (content, e) => {
            console.log(content,e)
        },
    });
    return (
        <div>
            <div style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }} {...props}>
                {isHovering ? 'release here' : 'drop here'}
            </div>
            <div style={{ display: 'flex', marginTop: 8 }}>
                {Array.from(Array(5)).map((e, i) => (
                    <div
                        {...getDragProps(`box${i}`)}
                        style={{
                            border: '1px solid #e8e8e8',
                            padding: 16,
                            width: 80,
                            textAlign: 'center',
                            marginRight: 16,
                        }}
                    >
                        box{i}
                    </div>
                ))}
            </div>
        </div>
    );
};