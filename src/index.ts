import express, { Request, Response } from 'express'
import cors from 'cors'
import { users, products, purchase, createUser, getAllUsers, getAllProducts, getAllProductsById, queryProductsByName } from "./database"
import { TProduct, TUser, TPurchase } from './types'
// console.log(users, products, purchase)
const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// createUser("0", "imeiu@email.com", "123123")

// getAllUsers()

// getAllProducts()

// getAllProductsById()

// queryProductsByName("almofada")

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong')
})
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})
app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter(
        (products) => {
            return products.name.toLowerCase().includes(q.toString().toLowerCase())
        }
    )
    res.status(200).send(result)
})

// POST criando um novo Usuário, produto e compra

app.post ('/users', (req: Request, res: Response) => {
    // pegar os dados: id, email, password
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser: TUser = {
        id,
        email,
        password,
    }
    // const body = req.body
    //const { id, name, lessons, stack } = body
    users.push(newUser)

    res.status(200).send("Usuário cadastrado com sucesso")
})

app.post ('/products', (req: Request, res: Response) => {
      // pegar os dados: id, name, price e category
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as string

    // if (typeof !id || typeof !name || typeof !price || typeof !category){
    //     res.status(400).send("Error: Não foi possível cadastrar o produto")
    // } else{
      

    const newProduct: TProduct = {
        id,
        name,
        price,
        category,
    }
    // const body = req.body
    //const { id, name, price, category } = body
    products.push(newProduct)

    res.status(201).send("Produto cadastrado. Boas vendas")
    // }
    
})

app.post ('/purchase', (req: Request, res: Response) => {
    // pegar os dados: userId, productId, price e totalPrice
//   const userId = req.body.userId as string
//   const productId = req.body.productId as string
//   const quantity = req.body.quantity as number
//   const totalPrice = req.body.totalPrice as number
    const body = req.body
    const { userId, productId, quantity, totalPrice } = body
//   if (typeof !userId || typeof !productId || typeof !quantity || typeof !totalPrice){
//       res.status(400).send("Error: Não foi possível realizar essa compra")
//   } else{
    

  const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
  }
  
  purchase.push(newPurchase)

  res.status(201).send("Compra realizada. Você rebecerá seu produto em breve")
//   }
  
})