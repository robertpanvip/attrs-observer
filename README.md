ð¦ **Installation**
``` javascript
npm install attrs-observer
```
ð¨ **Usage**
``` javascript
import AttrsObserver from 'attrs-observer'

const target = document.querySelector('div')

const observer = new AttrsObserver();

observer.observe(target,
    (target, from, to) => {
        console.log(target, from, to)
        //å¦æè¿éè¿åtrue å±æ§å°±ä¸ä¼è®¾ç½®ä¸å»
    },
    (target, from, to) => {
        console.log(target, from, to)
    }
)
//todo è¿æ¶åä¿®æ¹ style æècalss é½ä¼è¢«æ£æ¥å°
observer.unobserve(target)
```
ð¥ **API**
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

  å¼å§è§å¯

  #### Parameters

  - ##### target: HTMLElement

    ç®æ å¯¹è±¡

  - ##### preHook: Hook

    å¨æ ·å¼æèç±»åæ¹åä¹åçåè° ps å¦æè¿å true é£ä¹æ ·å¼æèç±»åå°±ä¸ä¼å

  - ##### afterHook: Hook

    å¨æ ·å¼æèç±»åæ¹åä¹åçåè°

  #### Returns [AttrsObserver](https://github.com/robertpanvip/attributes-observe/blob/cd9940a/src/AttrsObserver.ts#L223)

### unobserve

- unobserve(target: HTMLElement): boolean

- - Defined in [AttrsObserver.ts:223](https://github.com/robertpanvip/attributes-observe/blob/cd9940a/src/AttrsObserver.ts#L223)

  è§£é¤è§å¯

  #### Parameters

  - ##### target: HTMLElement

    ç®æ å¯¹è±¡

  #### Returns boolean
