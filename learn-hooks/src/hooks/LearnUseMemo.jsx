import React,{useState,useMemo} from 'react'

const ChildCom = ({ c, n }) => {
    
    let data = useMemo(() => {
        console.log(c,n)
        return {c, n};
    },[c])

    return (
        <div className="comp-wrapper">
            <h3>我是子组件</h3>
            <p>
                count:{data.c}---num:{data.n}
            </p>
        </div>
    )
}

export default function LearnUseMemo() {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    return (
        <div className="comp-wrapper">
            <h3>我是useMemo组件</h3>
            <p>
                count:{count}---num:{num}
            </p>
            <button onClick={() => {setCount(count+1)}}>点我修改count</button>
            <button onClick={() => {setNum(num+1)}}>点我修改num</button>
            <ChildCom c={count} n={num} />
        </div>
    )
}
