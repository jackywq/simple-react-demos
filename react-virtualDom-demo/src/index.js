// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import React, { Component } from './x-react/react';
import ReactDOM from './x-react/react-dom';

import './index.css';

// 类组件
class ClassComp extends Component {
    static defaultProps = {
        title: '类组件默认标题',
        name: 'class',
    };

    render() {
        const { title, name } = this.props;
        return (
            <h2>
                title：{title}，name： {name}
            </h2>
        );
    }
}

// 函数组件
function FunComponent({ title, name }) {
    return (
        <h2>
            title：{title}，name： {name}
        </h2>
    );
}

FunComponent.defaultProps = {
    title: '函数组件默认标题',
    name: 'function',
};

const todoList = ['吃饭', '睡觉', '敲代码'];

// app
const App = () => (
    <div className="box bg">
        <h3>兴趣爱好:</h3>
        <>
            {todoList.map((val, i) => (
                <li key={i}>{val}</li>
            ))}
        </>
        <ClassComp name="Jack" />
        <FunComponent name="Lily" />
        <button onClick={() => alert('Hello React')} onClick={() => {}}>弹出提示</button>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
