const debounce = (delay) => {
    //debounce function
    let timer;
    return () => {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(storeProduct, delay)
    }
}

let myStorage = []

document.addEventListener('scroll', function() {
    checkIfUserStopped()
})


// Create a debounced version of the storeProduct function
const checkIfUserStopped = debounce(1000);



const storeProduct = () => {
    const products = document.getElementById('products');
    const viewHeight = window.innerHeight || document.documentElement.clientHeight
    const viewWidth = window.innerWidth || document.documentElement.clientWidth
    const userVisibility = Array.from(products.children).filter((product) => {
        const dimension = product.getBoundingClientRect()
        if(dimension.top >= 0 && dimension.left >= 0 && dimension.bottom <= viewHeight && dimension.right <= viewWidth) {
            return product.innerText;
        }
    })
    myStorage = [...userVisibility]
}


console.log("script loaded")