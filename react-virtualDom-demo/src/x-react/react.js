/**
 * 将函数的嵌套结构转化成虚拟dom树
 * @param {*} type 元素类型
 * @param {*} config 元素属性
 * @param  {...any} children 子元素
 * 
 * 
 * @return {*} key 元素标识
 * @return {*} ref 元素上下文
 * @return {*} props 元素属性集合(eg: children、事件函数、className等)
 * @return {*} type 元素类型 @typeof TEXT、string、function、class、undefined
 */
export const createElement = (type, config, ...children) => {
    // 设置 key 和 ref 值
    let key = null;
    let ref = null;

    // 设置 props 属性值
    let props = {};
    if (config) {
        if (config.key !== undefined) {
            key = config.key;
            delete config.key;
        }
        if (config.ref) {
            ref = config.ref;
            delete config.ref;
        }
        delete config.__self;
        delete config.__source;

        Object.keys(config).forEach(propName => {
            props[propName] = config[propName];
        });
    }

    // 针对函数、类组件，如果props对应的属性没有属性值, 将defaultProps赋给props
    if (type && type.defaultProps) {
        const { defaultProps } = type;
        Object.keys(defaultProps).forEach(propName => {
            if (!props[propName] && defaultProps[propName]) {
                props[propName] = defaultProps[propName];
            }
        });
    }

    // 当children为text文本，构造其属性结构, 在react-dom.js，为匹配TEXT类型的代码作铺垫
    // console.log('children :>> ', children);
    props.children = children.map(child =>
        typeof child === 'object' ? child : createTextNode(child)
    );

    return {
        key,
        ref,
        type,
        props,
    };
};

function createTextNode(text) {
    return {
        type: 'TEXT',
        props: {
            children: [],
            nodeValue: text,
        },
    };
}

/**
 * 类组件声明
 * @param {*} props 组件属性
 */
export function Component(props) {
    this.props = props;
}

// 设置 isReactComponent 属性，用来区分类组件和函数组件
Component.prototype.isReactComponent = {};

export default {
    createElement,
    Component,
};