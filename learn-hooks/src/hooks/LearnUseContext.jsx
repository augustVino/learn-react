
import React, { createContext,useContext } from 'react'

// 1. 先用createContext创建一个共享区域
const MyContext = createContext({});

// 创建两个子组件
const ChildOne = () => {
    // 3.在子组件中使用useContext获取状态
    const {name} = useContext(MyContext);

    return (
        <div>ChildOne组件---{name}</div>
    )
}
const ChildTwo = () => {
    // 3.在子组件中使用useContext获取状态
    const {age} = useContext(MyContext);
    return (
        <div>ChildTwo组件---{age}</div>
    )
}
export default function LearnUseContext() {
    return (
        // 2.MyContext.Provider提供了一个context对象，这个对象可以被子组件共享
        <MyContext.Provider value={{name:'Vino',age: 18}}>
            <div className="comp-wrapper">
                <h3>我是useContext组件</h3>
                <ChildOne />
                <ChildTwo />
            </div>
        </MyContext.Provider>
    )
}
