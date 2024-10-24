// import './styles.css';
// import { getConfig } from './api';


function getConfig() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                "containers": [
                    {
                    "id": "header",
                    "widgets": [
                        { "id": "search", "width": "100%", "color": "lightgrey" }
                    ]
                    },
                    {
                    "id": "banner",
                    "widgets": [
                        { "id": "promo", "width": "100%", "color": "blue" }
                    ]
                    },
                    {
                    "id": "products",
                    "widgets": [
                        { "id": "prod1", "width": "30%", "color": "green" },
                        { "id": "prod2", "width": "30%", "color": "red" },
                        { "id": "prod3", "width": "30%", "color": "yellow" }
                    ]
                    }
                ]
                })
        },2000)
    })
}

let configData = {}



async function getConfigData() {
    try {
        const data = await getConfig();
        configData = data;
        renderContainer(data)
    } catch(err) {
        console.log(err)
    }
}
document.addEventListener("DOMContentLoaded", function() {
    getConfigData();
    const root = document.getElementById("root")
});

function onWidgetSearch(e) {
    let value = e.target.value;
    const newContainers = configData.containers.map(container => {
        // Filter widgets based on the search value
        const filteredWidgets = container.widgets.filter(widget => 
            widget.id.toLowerCase().includes(value) || widget.id === "search"
        );

        // Only include the container if it has matching widgets
        return {
            ...container,
            widgets: filteredWidgets.length > 0 ? filteredWidgets : []
        };
    })
    renderContainer({ containers: newContainers})
}

function createSearch(parentDiv, {id,width,color}){
        const newWidget = document.createElement('div');
        newWidget.id = id
        newWidget.style.width = width;
        newWidget.style.backgroundColor = color;
        const searchInput = document.createElement('input');
        searchInput.placeholder = "Enter widget id";
        searchInput.style.padding = "8px";
        searchInput.style.margin = "16px";
        searchInput.style.minWidth = "250px"
        searchInput.addEventListener('input' , onWidgetSearch)
        newWidget.appendChild(searchInput)
        parentDiv.appendChild(newWidget)
}

function createPromoBanner(parentDiv, {id,width,color}) {
        const newWidget = document.createElement('div');
        newWidget.id = id
        newWidget.style.width = width;
        newWidget.style.backgroundColor = color;
        const promoImage = document.createElement('img');
        promoImage.src = "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d0e281a0cfa9c139.jpg?q=20"
        promoImage.style.margin = "16px"
        promoImage.style.width = "100%"
        promoImage.alt = "promo image"
        newWidget.appendChild(promoImage)
        parentDiv.appendChild(newWidget)
}

function createProduct(parentDiv, {id,width,color}) {
        const newWidget = document.createElement('div');
        newWidget.id = id
        newWidget.style.setProperty('--widget-width', width);
        newWidget.style.backgroundColor = color;
        newWidget.classList.add("product");
        const productImage = document.createElement('img');
        productImage.src = "https://rukminim2.flixcart.com/image/312/312/xif0q/monitor/i/h/9/-original-imah5c99twbujzar.jpeg?q=70";
        const productName = document.createElement('div')
        productName.innerText = "SAMSUNG 60.96 cm (24 inch) Full HD IPS Panel Flicker-Free, HDMI, Display Port, Bezel-less Design Flat Monitor (LS24C330GAWXXL)";
        const productPrice = document.createElement('div')
        productPrice.innerText = "₹7,399"
        newWidget.appendChild(productImage);
        newWidget.appendChild(productName);
        newWidget.appendChild(productPrice);
        parentDiv.appendChild(newWidget)
}

const widgetCreationMap = {
    "search" : createSearch,
    "promo" : createPromoBanner,
    "prod": createProduct
}

function createWidgets(parentDiv,widgets) {
    const searchWidgetId = 'search'; // Assuming the search widget ID is 'search'

    // Remove all children except the search widget
    while (parentDiv.firstChild) {
        if (parentDiv.firstChild.id !== searchWidgetId) {
            parentDiv.removeChild(parentDiv.firstChild);
        } else {
            break; // Keep the search widget
        }
    }
    for(let i = 0; i < widgets.length; i++) {
        const widgetId = widgets[i].id;
        let isOldWidgetPresent = document.getElementById(widgetId);
        if(!isOldWidgetPresent) {
        const widgetName = widgetId.replace(/[^a-zA-Z]/g, '');

        const widgetCreationFunc = widgetCreationMap[widgetName];
        widgetCreationFunc(parentDiv, widgets [i])
        }

    }
}

function renderContainer(data) {
    const containers = data.containers;
    for(let i = 0; i < containers.length ; i++) {
        let sectionDiv = document.getElementById(containers[i].id);
        if(!sectionDiv) {
            sectionDiv = document.createElement('div');
            sectionDiv.id = containers[i].id;
            root.appendChild(sectionDiv)
        } 
        createWidgets(sectionDiv,containers[i].widgets)
        
    }
}
