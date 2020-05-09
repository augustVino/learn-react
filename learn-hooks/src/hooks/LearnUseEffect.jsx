import React, { Component, useState, useEffect } from 'react'

const LearnUseEffect = () => {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    // 当不传递第二个参数的时候，每次组件渲染的时候都会执行
    useEffect(() => {
        console.log(`此时没有传递第二个参数 --- count${count}---num${num}`);
    })

    // 当第二个参数传递的是空数组时，只有组件初始化挂载的时候会执行一遍
    useEffect(() => {
        console.log(`此时第二个参数为[] --- count${count}---num${num}`)
    }, [])

    // 当第二个参数传递了相应的依赖项时，只有依赖项发生了变化，才会执行
    // 1.初始化先执行一遍；
    // 2.如果点击“改变num”的按钮，则不会执行；
    // 3.只有点击“改变count”的按钮才会执行
    useEffect(() => {
        console.log(`此时第二个参数为[count] --- count${count}---num${num}`)
    }, [count])

    return (
        <div className="comp-wrapper">
            <h3>我是useEffect组件（函数组件）</h3>
            <p>当前的值---count{count}---num{num}</p>
            <button onClick={() => {
                setCount(count + 1);
            }}>改变count</button>
            <button onClick={() => {
                setNum(num + 1);
            }}>改变num</button>
        </div>
    )
}

/*
*   需求：定义一个变量，用来统计点击按钮的次数，并且要求实时提现到浏览器的标签栏title上。
*/
// 一、首先用类组件实现
// 因为生命周期中的 componentDidMount 只在组件挂载后会执行一次，点击按钮无法触发， componentDidUpdate 是只能在点击按钮时候触发，无法在初始化的时候执行
// 所以在类组件中如果需要实现类似的需求，需要在多个生命周期中写相同的代码
class LearnUseEffectTimes extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        count: 0
    }
    clickHandler = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    componentDidMount() {
        console.log(`componentDidMount---${this.state.count}`)
        document.title = `当前点击了${this.state.count}次`
    }
    componentDidUpdate() {
        console.log(`componentDidUpdate---${this.state.count}`)
        document.title = `当前点击了${this.state.count}次`
    }
    render() {
        return (
            <div className="comp-wrapper">
                <h5 className="red">需求：定义一个变量，用来统计点击按钮的次数，并且要求实时提现到浏览器的标签栏title上。</h5>
                <h3>我是useEffect组件(动态改变标题的类组件)</h3>
                <p>当前点击的次数---count：{this.state.count}</p>
                <button onClick={this.clickHandler}>增加点击次数</button>
            </div>
        );
    }
}

// 二、使用函数组件 + Hooks 实现
// 可以明显看出来，使用了 useEffect() 方法后，代码量可以大大减少
const LearnUseEffectTimesFun = () => {
    const [count,setCount] = useState(0);
    useEffect(() => {
        console.log(`当前点击了${count}次`)
        document.title = `当前点击了${count}次`;
    })
    return (
        <div className="comp-wrapper">
            <h5 className="red">需求：定义一个变量，用来统计点击按钮的次数，并且要求实时提现到浏览器的标签栏title上。</h5>
            <h3>我是useEffect组件(动态改变标题的函数组件)</h3>
            <p>当前点击的次数---count：{count}</p>
            <button onClick={() => {
                setCount(count+1);
            }}>增加点击次数</button>
        </div>
    )
}

export {
    LearnUseEffect, LearnUseEffectTimes, LearnUseEffectTimesFun
};