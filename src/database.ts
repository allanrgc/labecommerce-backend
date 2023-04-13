import { TUser, TProduct, TPurchase } from "./types"

export enum CATEGORY {
    ELETRONIC = "Eletronic",
    HEALTY = "Healty",
    FOOD = "Food"
}


export const users: TUser[] = [
    {
        id: 'u001',
        name: 'ana',
        email: 'anabarbiepocket@gmeioso.com.com',
        password: '141415'
    }, {
        id: 'u002',
        name: 'Anonymous',
        email: 'senhordev@gmail.com',
        password: 'senha1236'
    }
];

export const products: TProduct[] = [
    {
        id: 'p003',
        name: "Almofada",
        price: 2,
        category: CATEGORY.HEALTY
    }, {
        id: 'p004',
        name: "Pipoca",
        price: 1,
        category: CATEGORY.FOOD
    }
];

export const purchases: TPurchase[] = [
    {
        userId: 'b001',
        productId: 'p003',
        quantity: 3,
        totalPrice: products[0].price * 3
    }, {
        userId: 'b002',
        productId: 'p004',
        quantity: 5,
        totalPrice: products[1].price * 5
    }
];

export const createUser = (id: string, name:string, email: string, password: string): void => {
    const userExist = users.find(user => {
        return user.id === id || user.email === email
    })

    if(userExist){
        console.log("Usuário já cadastrado")
    } else {
        users.push({
            id,
            name,
            email,
            password
        })
        console.log("Cadastro realizado com sucesso")
        console.log("usuários", users)
    }
}

export const getAllUsers = ():void => {
    const userCall = users.map(user =>{
        return user.email
        
        })
        console.log("Usuários: ", userCall)
    }

    export const createProduct = (id: string, name: string, price: number, category: string): void => {
        const productExist = products.find(product => {
            return product.id === id || product.name === name
        })
    
        if(productExist){
            console.log("Produto já existe")
        } else {
            products.push({
                id,
                name,
                price,
                category
            })
            console.log("Cadastro realizado com sucesso")
            // console.log("Produtos: ", products)
        }
    }
    
    export const getAllProducts = ():void => {
        const productsCall = products.map(product =>{
            return product
            
            })
            console.log("Produtos: ", productsCall)
        }
    export const getAllProductsById = ():void => {
        const productsCallById = products.find(product =>{
            return product.id === product.id
            
            })
            console.log("Produtos por ID: ", productsCallById)
        }
    

    export const queryProductsByName = (q: string):void => {
        const productQuery = q.length !== 0 ? products.filter((product) => {
            return product.name.toLowerCase() === q.toLowerCase()
        }) : false

        if(productQuery){
            console.log("Lista de producots com o nome pesquisado: ", productQuery, "\n")
        } else {
            console.log("Não foi possível encontrar produto pesquisado \n")
        }
    }

    export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number): void => {
        const alrBought = purchases.find(product => {
            return product.userId === userId || product.productId === productId
        })
    
        if(alrBought){
            console.log("Produto já comprado")
        } else {
            purchases.push({
                userId,
                productId,
                quantity,
                totalPrice
            })
            console.log("Compra realizada com sucesso")
            // console.log("Produtos: ", products)
        }
    }