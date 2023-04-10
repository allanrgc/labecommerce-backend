import express, { Request, Response } from 'express'
import cors from 'cors'
import { users, products, purchase, CATEGORY, createUser, getAllUsers, getAllProducts, getAllProductsById, queryProductsByName } from "./database"
import { TProduct, TUser, TPurchase } from './types'
import { db } from './database/knex'
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
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM users`)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`SELECT * FROM products`)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})
app.get('/products/search', async (req: Request, res: Response) => {
    try {
       const q = req.query.q as string
       if(q.length < 1){
        res.status(404)
        throw new Error("O novo nome deve possuir no mínimo 1 caractere")
    }
        const productsSearch = await db.raw(`
                SELECT * FROM products
                WHERE name = "${q}";
                `)
    // const result = products.filter(
    //     (products) => {
    //         return products.name.toLowerCase().includes(q.toString().toLowerCase())
    //     }
    // )
    res.status(200).send(productsSearch)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})


// POST criando um novo Usuário, produto e compra

app.post ('/users', async (req: Request, res: Response) => {
    try {
        // pegar os dados: id, email, password
        const id = req.body.id as string
        const email = req.body.email as string
        const password = req.body.password as string

        const verifyUserId = users.find((user) => user.id === id)
        if(verifyUserId){
            res.status(400)
            throw new Error("Esse produto não pode usar a mesma ID de outro");
        }
        const verifyUserEmail = users.find((user) => user.email === email)
        if(verifyUserEmail){
            res.status(400)
            throw new Error("Email já cadastrado. Coloque outro");
        }

        const newUser: TUser = {
            id,
            email,
            password,
        }
        // const body = req.body
        //const { id, name, lessons, stack } = body
        users.push(newUser)
        await db.raw(`
            INSERT INTO users(id, email, password)
                VALUES ("${newUser.id}", "${newUser.email}", "${newUser.password}");
            `)
        
        // if(newUser.id === id){
        //     res.status(400)
        //     throw new Error("ID já cadastrado");
        // }
        // if(email === email){
        //     res.status(400)
        //     throw new Error("");
        // }

        res.status(201).send("Usuário cadastrado com sucesso")
        } catch (error) {
            console.log(error)
            if(res.statusCode === 200){
                res.status(500)
            }
            if(error instanceof Error){
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    
    
})

app.post ('/products', async (req: Request, res: Response) => {
    try {
          // pegar os dados: id, name, price e category
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as string
    
    const verifyProductId = products.find((product) => product.id === id)
        if(verifyProductId){
            res.status(400)
            throw new Error("Esse produto não pode usar a mesma ID de outro");
        }

    const newProduct: TProduct = {
        id,
        name,
        price,
        category,
    }
    // const body = req.body
    //const { id, name, price, category } = body
    products.push(newProduct)
    await db.raw(`
        INSERT INTO products(id, name, price, category)
        VALUES ("${id}", "${name}", "${price}", "${category}");
        `)

    res.status(201).send("Produto cadastrado. Boas vendas")
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
    // }
    
})
app.post ('/purchases', async (req: Request, res: Response) => {
    try {
  const id = req.body.id as string
  const buyer_id = req.body.buyer_id as string
  const total_price = req.body.total_price as number
  const paid = req.body.paid as string
  const delivered_at = req.body.delivered_at as number

  if(buyer_id !== buyer_id){
    res.status(400)
    throw new Error("Usuário não existente");
  }
  if(total_price !== total_price){
    res.status(400)
    throw new Error("Usuário não existente");
  }
  await db.raw (`
    INSERT INTO purchases(id, buyed_id, paid, total_price)
        VALUES("${id}", "${buyer_id}", "${total_price}", "${paid}");
    `)
  res.status(201).send("Compra realizada. Você rebecerá seu produto em breve")
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post ('/purchases', async (req: Request, res: Response) => {
    try {
  const id = req.body.id as string
  const buyer_id = req.body.buyer_id as string
  const total_price = req.body.total_price as number

        
  if(buyer_id !== buyer_id){
    res.status(400)
    throw new Error("Usuário não existe")
  }

    await db.raw(`
        INSERT INTO purchases(id, buyer_id, total_price)
            VALUES ("${id}", "${buyer_id}", "${total_price}");
        `)
  

  res.status(201).send("Compra realizada. Você rebecerá seu produto em breve")
    } catch (error) {
        console.log(error)
    }
  
})
// GET All Users by ID
app.get("/users/:id", (req: Request, res: Response) => {
    try {
       const id = req.params.id

        const result = users.find((user) => user.id === id) 

        if(!result){
            res.status(404)
            throw new Error("User não encontrado. Verifique a 'id'.")
        }
        res.status(200).send(result) 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

// GET produto by ID
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
         const id = req.params.id
        
        //  const productById = products.find((product) => product.id === id)
        const searchProductById = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";
            `)
         res.status(200).send(searchProductById)
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
   
})
// GET Purchase by User ID
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
       const userId = req.params.id
        // const purchaseByUserId = purchase.find((purch) => purch.userId === userId)
        
        const searchProductByUserId = await db.raw(`
            SELECT * FROM purchases
            WHERE buyer_id = "${userId}";
            `)
        res.status(200).send(searchProductByUserId) 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})
// DELETE by id
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
       const id = req.params.id
        const deleteUser = users.findIndex((user) => user.id === id)

        if (deleteUser === -1){
            res.status(404)
            throw new Error("Usuário não existe.");
            
        }
        users.splice(deleteUser, 1)
        res.status(200).send("Usuário apagado com sucesso") 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const deleteProduct = products.findIndex((product) => product.id === id)

        if (deleteProduct === -1){
            throw new Error("Produto não existe");
        }
        products.splice(deleteProduct, 1)

        res.status(200).send("Produto apagado com sucesso")  
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

//PUT - Editar by id

app.put("/users/:id", (req:Request, res:Response) => {
    try {
        const id = req.params.id
        const newEmail = req.body.newEmail as string | undefined
        const newPassword = req.body.newPassword as string| undefined
        //edição de um elemento do array de users
        const userToEdit = users.find((user) => user.id === id)
        if(!userToEdit){
            res.status(404)
            throw new Error("Usuário não existe. Verifique os dados inseridos");
        }
        if (userToEdit){
            userToEdit.email = newEmail || userToEdit.email
            userToEdit.password = newPassword || userToEdit.password
        }
        
        res.status(200).send("Atualização realizada com sucesso") 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

app.put("/products/:id", (req:Request, res:Response) => {
    try {
        const id = req.params.id
        const newName = req.body.newName as string | undefined
        const newPrice = req.body.price as number
        const newCategory = req.body.newCategory as CATEGORY | undefined
        //edição de um elemento do array de products
        const productToEdit = products.find((product) => product.id === id)
        if(!productToEdit){
            res.status(404)
            throw new Error("Produto não existe. Verifique os dados inseridos");
        }
        if (productToEdit){
            productToEdit.name = newName || productToEdit.name
            productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
            productToEdit.category = newCategory || productToEdit.category
        }
        res.status(200).send("Atualização realizada com sucesso")
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})