# React Hooks

## 前言
React 支持两种组件的写法，一种是类组件（通过class创建），另一种是无状态组件（函数组件）。
```js
// 类组件
class useState extends Component {
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}


// 函数组件
function App() {
    return (
        <div className="App">
            hello
        </div>
    );
}
```
React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 组件的最佳写法应该是函数，而不是类。

但是，之前在版本中，函数组件必须是纯函数，**不能包含状态，也不支持生命周期方法**，因此无法取代类。

`React Hooks` 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。

## Hook 的含义
`Hook` 这个单词的意思是"钩子"。

**`React Hooks` 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。** `React Hooks` 就是那些钩子。




## `useState()`: 状态钩子
`useState()`用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

如 `LearnUseState.jsx` 文件中的例子：
```js
import React, { useState } from "react";

export default function LearnUseState() {
    // 初始化一个状态 count = 0 ，并可以通过setCount方法来改变它
    const [count, setCount] = useState(0);

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
```
`useState()`这个函数接受状态的初始值，作为参数，上例的初始值为`0`和`Vino`。该函数返回一个数组，数组的第一个成员是一个变量（上例是`count`和`developer`），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名（上例是`setCount`和 `setDeveloper` ）。

## `useContext()`: 共享状态钩子
`useContext()` 用于在组件之间共享状态。需要和`createContext()`配合使用。
```js
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
```

## `useEffect()`: 副作用钩子
effect（副作用）：指那些没有发生在数据向视图转换过程中的逻辑，如 **ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志**等。

副作用操作可以分两类：需要清除的和不需要清除的。

原先在函数组件内（这里指在 React 渲染阶段）改变dom、发送ajax请求以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的bug并破坏UI的一致性。

useEffect 给函数组件增加了操作副作用的能力。它跟class组件中的 `componentDidMount` 、 `componentDidUpdate` 和 `componentWillUnMount` 具有相同的用途，只不过被合并成了一个API

`useEffect()`接收两个参数。第一个参数是一个函数，异步操作的代码放在里边。第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化， `useEffect()`就会执行。第二个参数可以省略，此时每次组件渲染时，都会执行`useEffect()`

具体使用请查看 demo

## `useRef()`
- 类组件、React 元素用 `React.createRef`，函数组件使用 `useRef`
- `useRef` 返回一个可变的 `ref` 对象，其 `current` 属性被初始化为传入的参数（initialValue）
- `useRef` 返回的 `ref` 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的`ref` 对象都是同一个.（使用 `React.createRef` ，每次重新渲染组件都会重新创建 `ref`）

## `forwardRef()`

- 因为函数组件没有实例，所以函数组件无法像类组件一样可以接收 `ref` 属性
- `forwardRef` 可以在父组件中操作子组件的 `ref` 对象
- `forwardRef` 可以将父组件中的 `ref` 对象转发到子组件中的 `dom` 元素上
- 子组件接受 `props` 和 `ref` 作为参数

```js
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
```

## `useImperativeHandle()`
- `useImperativeHandle`可以让你在使用 `ref` 时，自定义暴露给父组件的实例值，不能让父组件想干嘛就干嘛
- 在大多数情况下，应当避免使用 `ref` 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用
- 父组件可以使用操作子组件中的多个 `ref`
```js
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
```


## `useMemo()`
`useMemo()`的作用与`shouldComponentUpdate`类似，在渲染过程中避免重复渲染的问题，可以控制组件什么时候需要更新。

当状态或者父组件传来的属性发生变化时，更新组件。

- `useMemo`用的是`memoization`来提高性能的
- `memoization`是 JavaScript 中的一种缓存技术

如果我们有CPU密集型操作，我们可以通过将初始操作的结果储存在缓存中来优化使用。如果操作必然会再次执行，我们将不再麻烦再次使用我们的cpu，因为相同结果的结果储存在某个地方，我们只是简单的返回结果。

记住这个是以空间换速度，所以最好确定你是否值得这么做，有些场景很有必要使用。

`useMemo()`是一个函数，有两个参数，第一个参数是个函数，第二个参数是个数组

`useMemo(() => {}, [可以不写])`

useMemo 与 useEffect 执行的时间不同，useEffect 是在 componentDidMount 以后执行的，而 useMemo 是在组件渲染过程中执行的。

## `useCallback()`
作用：避免组件重复渲染，提高性能（useMemo）

同样用到缓存技术，和 useMemo 不同的是，useCallback 缓存的是个函数，是个函数就可以执行。

useCallback 有两个参数，第一个参数是个函数，第二个参数是个数组。

`useCallback(() => {}, [可以不写])`

`const callback = useCallback(() => {}, [])`. callback 是个函数，可以直接 `callback()` 执行。

## 自定义 Hook
自定义 Hook 是一个函数，其名称以 `use` 开头，函数内部可以调用其他的 Hook

```js
const useWinResize = () => {

    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    const resize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return size;
}

// 使用
const Home = () => {
    const {width, height} = useWinResize();

    return (
        <div>
            <p>width: {width}</p>
            <p>height: {height}</p>
        </div>
    );
};
```
