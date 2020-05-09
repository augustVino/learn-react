import React,{useState} from 'react'

export default function LearnUseState() {
    // 声明一个状态变量 count = 0 ，并可以通过setCount方法来改变它
    const [count,setCount] = useState(0);

    // 创建一个对象
    const [developer, setDeveloper] = useState({name: 'Vino', age: 18});

    return (
        <div className="comp-wrapper">
            <h3>我是useState组件</h3>

            {/* 当通过useState创建基础数据类型时： */}
            <>
                <p>count---{count}</p>
                <button onClick={() => {
                    setCount(count+1)
                }}>点我改变count</button>
            </>

            {/* 当通过useState创建对象类型数据时 */}
            <>
                <p>developer---{developer.name}---{developer.age}</p>
                <button onClick={() => {
                    // 注意：
                    // 这里修改对象类型的数据时，不能在原来的引用上修改，需要传递一个新创建的对象
                    setDeveloper({
                        name: 'Bob',
                        age: 20
                    })
                }}>点我改变developer</button>
            </>
        </div>
    )
}
