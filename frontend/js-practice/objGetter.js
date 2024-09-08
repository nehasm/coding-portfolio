const obj = {
    a: {
        b: {
            c: [1,2,3,4]
        }
    }
}
console.log(getValue(obj, 'a.b.c')) // [1,2,3,4]
console.log(getValue(obj, 'a.b.c.1')) // 2
console.log(getValue(obj, 'a.b.c[2]')) // 3
console.log(getValue(obj, ['a','b','c','0'])) // 1
console.log(getValue(obj, 'a.b.c[4]')) // undefined
console.log(getValue(obj, 'a.c', 'default')) // 'default'


function isNumeric(value) {
    return !isNaN(Number(value));
}

function getValue(obj, path, defaultValue = null) {
    if(typeof path === 'string') {
        path = path.replace('[', '.').replace(']', '').split('.')
    }
    let lastObj = obj
    for(let i = 0; i < path.length; i++) {
        if(i === path.length - 1 && defaultValue !== null && lastObj[path[i]] === undefined) {
            lastObj[path[i]] = defaultValue
            return defaultValue
        }
        if(lastObj[path[i]]) {
            lastObj = lastObj[path[i]]
        } else {
            return undefined
        }
    }
    return lastObj
}