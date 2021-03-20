📦 **Installation**
``` javascript
npm install attributes-observe
```
🔨 **Usage**
``` javascript
const target=document.querySelector('div')
const observer = new AttributesObserve();
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
//todo 这时候修改 style 或者calss 就不会被检查到了
```
🖥 **API**
# Class AttributesObserve

### Hierarchy

- AttributesObserve

## Index

### Constructors

- [constructor](attributesobserve.html#constructor)

### Properties

- [targets](attributesobserve.html#targets)

### Methods

- [observe](attributesobserve.html#observe)
- [unobserve](attributesobserve.html#unobserve)

## Constructors

### constructor

- new AttributesObserve(): [AttributesObserve](attributesobserve.html)

- #### Returns [AttributesObserve](attributesobserve.html)

## Methods

### observe

- observe(target: HTMLElement, preHook: Hook, afterHook: Hook): [AttributesObserve](attributesobserve.html)

- - Defined in [AttributesObserve.ts:195]

  开始观察

  #### Parameters

  - ##### target: HTMLElement

    目标对象

  - ##### preHook: Hook

    在样式或者类名改变之前的回调 ps 如果返回 true 那么样式或者类名就不会变

  - ##### afterHook: Hook

    在样式或者类名改变之后的回调

  #### Returns [AttributesObserve]

### unobserve

- unobserve(target: HTMLElement): boolean

- - Defined in [AttributesObserve.ts:223](https://github.com/robertpanvip/attributes-observe/blob/cd9940a/src/AttributesObserve.ts#L223)

  解除观察

  #### Parameters

  - ##### target: HTMLElement

    目标对象

  #### Returns boolean
