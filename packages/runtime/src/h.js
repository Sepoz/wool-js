import {withoutNulls} from "./utils/arrays";

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
}

// example of virtual dom
/*const vdom = h('form', { class: 'login-form', action: 'login' }, [
    h('input', { type: 'text', name: 'user' }),
    h('input', { type: 'password', name: 'pass' }),
    h('button', { on: { click: login } }, ['Login'])
])*/

export function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    }

}

export function hString(string) {
    return {
        type: DOM_TYPES.TEXT,
        value: string
    }
}

export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    }
}

export function mapTextNodes(children) {
    return children.map(child => {
        typeof child === 'string' ? hString(child) : child
    })
}

