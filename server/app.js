import express from 'express'
import {
    getTodoByid,
    getTodo,
    getSharedTodoById,
    getUserById,
    getUserByEmail,
    createTodo,
    deleteTodo,
    toggleComplete,
    shareTodo
} from './database.js'
import cors from 'cors'

const cosrOptions = {
    origin: "http://127.0.0.1:5173",
    methods: ["POST", "GET"],
    credentials: true
}

const app = express()
app.use(express.json())
app.use(cors())

//consulta para ver todas las tareas
app.get('/todo/:id', async (req,res) => {
    const todos = await getTodoByid(req.params.id)
    res.status(200).send(todos)
})

//consulta para ver una tarea, el autor y con quien se compartio la tarea
app.get('/todo/shared_todo/:id', async (req, res) => {
    const todo = await getSharedTodoById(req.params.id);
    const author = await getUserById(todo.user_id);
    const shared_with = await getUserById(todo.shared_with_id);
    res.status(200).send({ author, shared_with })
})

//consulta para obtener los usuarios por el id
app.get('/users/:id', async (req, res) => {
    const user = await getUserById(req.params.id)
    res.status(200).send(user)
})

app.post('/todo', async (req,res) => {
    const {user_id, title} = req.body
    const todo = await createTodo(user_id, title)
    res.status(200).send(todo)
})

app.post('/todo/shared_todo', async (req,res) => {
    const {todo_id, user_id, email} = req.body
    const userToShare = await getUserByEmail(email)
    const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id)
    res.status(200).send(sharedTodo)
})

//para actualizar los todo
app.put('/todo/:id', async (req,res) => {
    const { value } = req.body
    const todo = await toggleComplete(req.params.id, value)
    res.status(200).send(todo)
})

//para borrar los todo
app.delete('/todo/:id', async (req, res) => {
    await deleteTodo(req.params.id)
    res.send({message: 'TODO_DELECTED'})
})

app.listen(8080, () => {
    console.log('Server reaady at 8080');
})