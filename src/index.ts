import express, { Request, Response } from 'express'
import cors from 'cors'
import { users, products, purchase, CATEGORY, createUser, getAllUsers, getAllProducts, getAllProductsById, queryProductsByName } from "./database"
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

// GET produto by ID
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const productById = products.find((product) => product.id === id)
    res.status(200).send(productById)
})
// GET Purchase by User ID
app.get('/purchase/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId
    const purchaseByUserId = purchase.find((purch) => purch.userId === userId)
    res.status(200).send(purchaseByUserId)
})
// DELETE by id
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const deleteUser = users.findIndex((user) => user.id === id)

    if (deleteUser >= 0){
        users.splice(deleteUser, 1)
    }
    res.status(200).send("Usuário apagado com sucesso")
})
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const deleteProduct = products.findIndex((product) => product.id === id)

    if (deleteProduct >= 0){
        products.splice(deleteProduct, 1)
    }
    res.status(200).send("Usuário apagado com sucesso")
})

//PUT - Editar by id

app.put("/users/:id", (req:Request, res:Response) => {
    const id = req.params.id
    const newEmail = req.body.newEmail as string | undefined
    const newPassword = req.body.newPassword as string| undefined
    //edição de um elemento do array de users
    const userToEdit = users.find((user) => user.id === id)
    if (userToEdit){
        userToEdit.email = newEmail || userToEdit.email
        userToEdit.password = newPassword || userToEdit.password
    }
    res.status(200).send("Atualização realizada com sucesso")
})

app.put("/products/:id", (req:Request, res:Response) => {
    const id = req.params.id
    const newName = req.body.newName as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.newCategory as CATEGORY | undefined
    //edição de um elemento do array de products
    const productToEdit = products.find((product) => product.id === id)
    if (productToEdit){
        productToEdit.name = newName || productToEdit.name
        productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
        productToEdit.category = newCategory || productToEdit.category
    }
    res.status(200).send("Atualização realizada com sucesso")
})