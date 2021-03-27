📦 **Installation**
``` javascript
npm install attrs-observer
```
🔨 **Usage**
``` javascript
import AttrsObserver from 'attrs-observer'

const target = document.querySelector('div')

const observer = new AttrsObserver();

observer.observe(target,
    (target, from, to) => {
        console.log(target, from, to)
        //如果这里返回true 属性就不会设置下去
    },
    (target, from, to) => {
        console.log(target, from, to)
    }
)
//todo 这时候修改 style 或者calss 都会被检查到
observer.unobserve(target)
```
🖥 **API**
# Class AttrsObserver

### Hierarchy

- AttrsObserver

## Index

### Constructors

- [constructor](AttrsObserver.html#constructor)

### Properties

- [targets](AttrsObserver.html#targets)

### Methods

- [observe](AttrsObserver.html#observe)
- [unobserve](AttrsObserver.html#unobserve)

## Constructors

### constructor

- new AttrsObserver(): [AttrsObserver](AttrsObserver.html)

- #### Returns [AttrsObserver](AttrsObserver.html)

## Methods

### observe

- observe(target: HTMLElement, preHook: Hook, afterHook: Hook): [AttrsObserver](AttrsObserver.html)

- - Defined in [AttrsObserver.ts:195]

  开始观察

  #### Parameters

  - ##### target: HTMLElement

    目标对象

  - ##### preHook: Hook

    在样式或者类名改变之前的回调 ps 如果返回 true 那么样式或者类名就不会变

  - ##### afterHook: Hook

    在样式或者类名改变之后的回调

  #### Returns [AttrsObserver](https://github.com/robertpanvip/attributes-observe/blob/cd9940a/src/AttrsObserver.ts#L223)

### unobserve

- unobserve(target: HTMLElement): boolean

- - Defined in [AttrsObserver.ts:223](https://github.com/robertpanvip/attributes-observe/blob/cd9940a/src/AttrsObserver.ts#L223)

  解除观察

  #### Parameters

  - ##### target: HTMLElement

    目标对象

  #### Returns boolean
