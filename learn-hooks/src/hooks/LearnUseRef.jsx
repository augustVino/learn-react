import React,{useRef} from 'react'
import { useState } from 'react';

export default function LearnUseRef() {
    const inp = useRef(null);
    const [inpVal, setInpVal] = useState('');

    function getValue(){
        // console.log(inp.current); // input dom
        console.log(inp.current.value);
        setInpVal(inp.current.value);
    }
    return (
        <div className="comp-wrapper">
            <h3>我是useRef组件</h3>
            <p>
                <input type="text" ref={inp}/>
                <button onClick={getValue}>点我获取输入框的值</button>
            </p>
            <p>{inpVal}</p>
        </div>
    )
}
