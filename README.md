📦 **Installation**
``` javascript
npm install attributes-observe
```
🖥 **API**
[AttributesObserve](./docs/classes/attributesobserve.html)
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
