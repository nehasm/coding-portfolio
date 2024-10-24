export function getConfig() {
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