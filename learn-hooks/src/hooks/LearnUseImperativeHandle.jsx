import React,{ forwardRef,useRef,useImperativeHandle,useEffect } from 'react'

const ChildCom = (props, parentRef) => {
    const nameInpRef = useRef();
    const ageInpRef = useRef();

    // 子组件选择性的暴露
    useImperativeHandle(
        parentRef,
        () => {
            // 这个函数会返回一个对象
            // 该对象会作为父组件 current 属性的值
            // 通过这种方式，父组件可以使用操作子组件中的多个 ref
            return {
                name: 'Vino',
                nameInpRef,
                ageInpRef,
                focus(){
                    nameInpRef.current.focus();
                },
                changeAge(text){
                    ageInpRef.current.value = text;
                }
            }
        }
    )
    return(
        <div className="comp-wrapper">
            <h3>我是ChildCom组件</h3>
            <p>
                <input type="text" ref={nameInpRef} placeholder="name input"/>
            </p>
            <p>
                <input type="text" ref={ageInpRef} placeholder="age input"/>
            </p>
        </div>
    )
}

const ChildComRef = forwardRef(ChildCom);

export default function LearnUseImperativeHandle(){

    const parentRef = useRef();
    function getFocus(){
        console.log(parentRef.current)
        const {focus,changeAge,nameInpRef,ageInpRef,name} = parentRef.current;
        focus();
        changeAge(18)
    }
    return (
        <div className="comp-wrapper">
            <h3>我是useImperativeHandle组件</h3>
            <button onClick={getFocus}>获得焦点</button>

            <ChildComRef ref={parentRef}/>
        </div>
    )
}
