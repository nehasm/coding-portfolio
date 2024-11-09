// const counter = makeCounter(5);
// counter(); // 5
// counter(); // 6
// counter(); // 7

function makeCounter(n) {
    let curr = n;
    return () => curr++;
}
const counter = makeCounter(5)
console.log(counter())
console.log(counter())
console.log(counter())
console.log(counter())

// Type Utilities
function isBoolean(value) {
    return typeof value === 'boolean'
}
function isNumber(value) {
    return typeof value === 'number'
}
function isNull(value) {
    return value === null
}
function isArray(arr) {
    return Array.isArray(arr)
}
function isFuncation(value) {
    return typeof value === 'function'
}
function isObject(value) {
    return value !== null && typeof value === 'object' || typeof value === 'function';
}

function cycle(value1,value2) {
    let curr = value2;
    return () => {
        curr = curr === value1 ? value2 : value1;
        return curr
    }
}

const onOffFn = cycle('on', 'off');
console.log(onOffFn()); 
console.log(onOffFn()); 
console.log(onOffFn());  
console.log(onOffFn());
console.log(onOffFn());

// call, bind and apply


//debounce
function debounce(func,wait) {
    let id;
    let lastContext;
    let lastArgs;
    function main (...args){
        lastContext = this;
        lastArgs = args
        clearTimeout(id);
        id = setTimeout(() => {
            func.call(lastContext,...lastArgs)
        },wait);
    }
    main.cancel = () => {
        clearTimeout(id)
    }
    main.flush = () => {
        clearTimeout(id)
        func.call(lastContext,...lastArgs)
    }
    return main
}
const debouncedIncrement = debounce((val1,val2,val3) => {console.log("debounce function called", val1,val2,val3)}, 1000);
debouncedIncrement(1,2,3)
debouncedIncrement(4,5,6)
debouncedIncrement.flush()


function classNames(...args) {
    let res = ''
    for(let i = 0; i < args.length; i++) {
        const val = args[i]
        if(!val) {
            continue
        }
        if(typeof val === 'string') {
            res += val
        } else if (Array.isArray(val)) {
            res += classNames(...val)
        } else {
            for(let [key,value] of Object.entries(val)) {
                if(value) {
                    res += key
                }
            }
        }
    }
    return res
}
console.log(classNames('foo','bar'))
console.log(classNames('foo', 'bar')); // 'foo bar'
console.log(classNames('foo', { bar: true })) // 'foo bar'
console.log(classNames({ 'foo-bar': true })) // 'foo-bar'
console.log(classNames({ 'foo-bar': false })) // ''
console.log(classNames({ foo: true }, { bar: true })) // 'foo bar'
console.log(classNames({ foo: true, bar: true })) // 'foo bar'
console.log(classNames({ foo: true, bar: false, qux: true })) // 'foo qux'
console.log(classNames('a', ['b', { c: true, d: false }])) // 

function deepClone(obj, map = new Map()) {
    if(obj === null || typeof obj !== 'object') {
        return obj //it means the obj is primitive values
     }
     if(map.has(obj)) {
        return map.get(obj)
     }
     const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
     map.set(obj, clone)

      for (let key in obj) {
        if(obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key],map)
        }
     }
     return clone
}


const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
console.log(clonedObj1.user.role); // 'guest'
console.log(obj1.user.role); // Should still be 'admin'.

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
console.log(obj2.foo[0].bar); // 'bax'
console.log(clonedObj2.foo[0].bar); // baz

class SingleTon {
    static instance = null
    constructor() {
        if(SingleTon.instance) {
            return SingleTon.instance
        }
        this.createdAt = Date.now()
        SingleTon.instance = this
    }

    getInstanceTime() {
        return SingleTon.instance.createdAt
        return this.createdAt; // this will also work
    }
}

const firstCall = new SingleTon()
console.log(firstCall.getInstanceTime())

const secondCall = new SingleTon()
console.log(secondCall.getInstanceTime())
