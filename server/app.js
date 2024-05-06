import express from 'express'
import {
    getTodoByid,
    getTodo,
    getSharedTodoById,
    getUserById,
    getUserByEmail,
    createTodo,
    deleteTodo,
    toggleComplete
} from './database'

const app = express()
app.use(express.json())

app.listen(8080, () => {
    console.log('Server reaady at 8080');
})