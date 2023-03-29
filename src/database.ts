import { TUser, TProduct, TPurchase } from "./types"

export enum CATEGORY {
    ELETRONIC = "Eletronic",
    HEALTY = "Healty",
    FOOD = "Food"
}


export const users: TUser[] = [
    {
        id: 'zeroum',
        email: 'emaildo@gmeidev.com',
        password: 'senhadagota'
    }, {
        id: 'zerodois',
        email: 'miminviacarta@gmeioso.com',
        password: 'senhadoquere'
    }
];

export const products: TProduct[] = [
    {
        id: 'zerotrei',
        name: "Almofada",
        price: 2,
        category: CATEGORY.HEALTY
    }, {
        id: 'zerocatro',
        name: "Pipoca",
        price: 1,
        category: CATEGORY.HEALTY
    }
];

export const purchase: TPurchase[] = [
    {
        userId: 'zerotrei',
        productId: 'zeroZeroUm',
        quantity: 3,
        totalPrice: products[0].price * 3
    }, {
        userId: 'zerocatro',
        productId: 'zeroZeroDois',
        quantity: 5,
        totalPrice: products[1].price * 5
    }
];

export const createUser = (id: string, email: string, password: string): void => {
    const userExist = users.find(user => {
        return user.id === id || user.email === email
    })

    if(userExist){
        console.log("Usuário já cadastrado")
    } else {
        users.push({
            id,
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
        const alrBought = purchase.find(product => {
            return product.userId === userId || product.productId === productId
        })
    
        if(alrBought){
            console.log("Produto já comprado")
        } else {
            purchase.push({
                userId,
                productId,
                quantity,
                totalPrice
            })
            console.log("Compra realizada com sucesso")
            // console.log("Produtos: ", products)
        }
    }