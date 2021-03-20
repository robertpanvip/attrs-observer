
type From = { attribute: string, property?: string, value: string | null | undefined }
type To = From;
type Hook = (target: HTMLElement, from: From, to: To) => boolean | void;

/**
 *
 * @param target
 * @param preHook
 * @param afterHook
 */
function init(target: HTMLElement, preHook: Hook, afterHook: Hook) {
    const {setProperty} = target.style;
    const {removeProperty} = target.style;

    const {setAttribute} = target;
    const {removeAttribute} = target;
    const {toggleAttribute} = target;

    const observer = (attribute: string, property: string, value: string | null, callback: () => any) => {
        let res;
        const preValue = attribute === 'style'
            ? window.getComputedStyle(target)[property as keyof CSSStyleDeclaration] as string
            : target.getAttribute(attribute);
        const from = attribute === 'style' ? {
            attribute,
            property,
            value: preValue,
        } : {
            attribute,
            value: preValue,
        };
        const to = attribute === 'style' ? {
            attribute,
            property,
            value,
        } : {
            attribute,
            value: property
        }
        if (!preHook) {
            return callback();
        }
        if (!preHook(target, from, to)) {
            res = callback();
            requestAnimationFrame(() => {
                afterHook(target, from, to)
            })
            return res;
        }
    }

    Object.keys(target.style).forEach(key => {
        if (key !== 'setProperty' && key !== 'removeProperty' && (isNaN(parseInt(key)))) {
            Object.defineProperty(target.style, key, {
                configurable: true,
                get(): any {
                    return target.style.getPropertyValue(key)
                },
                set(v: any) {
                    target.style.setProperty(key, v)
                }
            })
        }
    })

    target.style.setProperty = function (property: string, value: string | null, priority?: string) {
        const callback = () => setProperty.call(this, property, value, priority);
        return observer('style', property, value, callback)
    }

    target.style.removeProperty = function (property: string) {
        const callback = () => removeProperty.call(this, property)
        return observer('style', property, undefined, callback)
    }

    target.setAttribute = function (qualifiedName: string, value: string) {
        const callback = () => setAttribute.call(this, qualifiedName, value)
        if (qualifiedName === 'style') {
            const arr = value.split(';');
            arr.forEach(item => {
                const [key, value] = item.split(':')
                target.style.setProperty(key, value)
            })
        } else {
            return observer(qualifiedName, value, null, callback)
        }
    }

    target.removeAttribute = function (qualifiedName: string) {
        const callback = () => removeAttribute.call(this, qualifiedName)
        return observer(qualifiedName, undefined, null, callback)
    }
    target.toggleAttribute = function (qualifiedName: string, force?: boolean) {
        const _value = target.getAttribute(qualifiedName);
        const value = force != undefined ? force : !!_value

        const callback = () => toggleAttribute.call(this, qualifiedName, force)
        return observer(qualifiedName, value === true ? _value : undefined, null, callback)
    }


    if (target.classList) {
        const {add} = target.classList;
        const {remove} = target.classList;
        const {replace} = target.classList;
        const {toggle} = target.classList;
        if (add) {
            target.classList.add = function (...tokens: string[]) {
                const callback = () => add.call(this, ...tokens)
                return observer('className', tokens.join(' '), null, callback)
            }
        }
        if (remove) {
            target.classList.remove = function (...tokens: string[]) {

                const callback = () => remove.call(this, ...tokens)
                return observer('className', tokens.join(' '), null, callback)
            }
        }
        if (replace) {
            target.classList.replace = function (oldToken: string, newToken: string) {
                const callback = () => replace.call(this, oldToken, newToken)
                return observer('className', newToken, null, callback)
            }
        }
        if (toggle) {
            target.classList.toggle = function (token: string, force?: boolean) {
                const have = target.classList.contains(token);
                const value = force != undefined ? force : !have;
                const callback = () => toggle.call(this, token, force)
                return observer('className', value === true ? token : undefined, null, callback)
            }
        }
    }
}

const _WeakMap = function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (new.target !== _WeakMap) {throw new TypeError("Constructor _WeakMap requires 'new'");}
    if (window.WeakMap) {
        return new WeakMap();
    } else if (window.Map) {
        return new Map();
    } else {
        const targets: {key: object,value: any }[] = [];
        return {
            delete(key: object) {
                targets.filter((target: {key: object,value: any }) => target.key !== key);
                return true;
            },
            get(key: object) {
                const target= targets.find((target: {key: object,value: any } ) => target.key === key);
                if(target){
                    return target.value;
                }
            },
            has(key: object) {
                return !!this.get(key);
            },
            set(key: object,value: any) {
                targets.push({key,value});
                return this;
            }
        };
    }
} as unknown as WeakMapConstructor

interface WeakMap<K extends object, V> {
    delete(key: K): boolean;

    get(key: K): V | undefined;

    has(key: K): boolean;

    set(key: K, value: V): this;
}

interface WeakMapConstructor {
    new<K extends object = object, V = any>(): WeakMap<K, V>;

    readonly prototype: WeakMap<object, any>;
}

export class AttributesObserve {
    private readonly targets = new _WeakMap();

    /**
     *开始观察
     * @param target 目标对象
     * @param preHook 在样式或者类名改变之前的回调 ps 如果返回true 那么样式或者类名就不会变
     * @param afterHook 在样式或者类名改变之后的回调
     */
    observe(
        target: HTMLElement,
        preHook: Hook,
        afterHook: Hook
    ):AttributesObserve {
        const {setProperty} = target.style;
        const {removeProperty} = target.style;

        const {setAttribute} = target;
        const {removeAttribute} = target;
        const {toggleAttribute} = target;

        init(target, preHook, afterHook)

        this.targets.set(target, {
            setProperty,
            removeProperty,
            setAttribute,
            removeAttribute,
            toggleAttribute
        })
        return this;
    }

    /**
     * 解除观察
     * @param target 目标对象
     */
    unobserve(target: HTMLElement):boolean {
        if (!this.targets.has(target)) {
            return false;
        }
        const vmTargetValue = this.targets.get(target);
        target.style.setProperty = vmTargetValue.setProperty
        target.style.removeProperty = vmTargetValue.removeProperty
        target.setAttribute = vmTargetValue.setAttribute;
        target.toggleAttribute = vmTargetValue.toggleAttribute;
        target.removeAttribute = vmTargetValue.removeAttribute;
        if (target.classList) {
            target.classList.add && (target.classList.add = vmTargetValue.add)
            target.classList.remove && (target.classList.remove = vmTargetValue.remove)
            target.classList.replace && (target.classList.replace = vmTargetValue.replace)
            target.classList.toggle && (target.classList.toggle = vmTargetValue.toggle)
        }
        return this.targets.delete(target);
    }
}
