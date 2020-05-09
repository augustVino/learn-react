import React,{forwardRef, useRef} from 'react'
import { useState } from 'react';

const ChildCom = (props, refa) => (
    <div className="comp-wrapper">
        <h3>我是ChildCom组件</h3>
        <input type="text" ref={refa}/>
    </div>
)


const ChildComRef = forwardRef(ChildCom);


export default function LearnForwardRef() {
    const inpRef = useRef();
    const [inpVal, setInpVal] = useState('');

    function clickHandler(){
        inpRef.current.focus()
    }
    function getValue(){
        setInpVal(inpRef.current.value)
    }
    function removeValue(){
        inpRef.current.value = '';
    }
    return (
        <div className="comp-wrapper">
            <h3>我是forwardRef组件</h3>
            <button onClick={clickHandler}>给子组件的输入框加上焦点</button>
            <button onClick={getValue}>获取子组件输入框的值</button>
            <button onClick={removeValue}>清空子组件输入框</button>
            <p>{inpVal}</p>
            <ChildComRef ref={inpRef} />
        </div>
    )
}
