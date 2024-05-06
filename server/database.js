import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getTodoByid(id){
    const [rows] = await pool.query(
        `
        SELECT todo.*, shared_todo.shared_whith_id FROM todo LEFT JOIN
         shared_todo ON todo_id = shared_todo.todo_id WHERE todo.user_id = ?
          OR shared_todo.shared_whith_id = ?;
        `, [id, id]
    )
    return rows
}

export async function getTodo(id){
    const [rows] = await pool.query(
        `SELECT * FROM todo WHERE id = ?;`, [id])
        return rows[0]
}

export async function getSharedTodoById(id){
    const [rows] = await pool.query(
        `SELECT * FROM shared_todo WHERE id = ?;`, [id])
        return rows[0]
}

export async function getUserById(id){
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE id = ?;`, [id])
        return rows[0]
}

export async function getUserByEmail(email){
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ?;`, email)
        return rows[0]
}

export async function createTodo(user_id, title){
    const [rows] = await pool.query(
        `INSERT INTO todo (user_id, title) VALUES (?, ?);`, [user_id, title])
        const todoId = result.insertid;
        return getTodo(todoId)
}

export async function deleteTodo(id){
    const [result] = await pool.query(
        `DELETE FROM todo WHERE id = ?;`,
        [id]
    )
    return result
}

export async function toggleComplete(id, value){
    const newValue = value = true? "TRUE" : "FALSE";
    const [result] = await pool.query(
        `
        UPDATE todo SET completed = ${newValue} WHERE id = ?;
        `,
        [id]
    )
    return result
}

export async function shareTodo(todo_id, user_id, shared_whith_id){
    const [result] = await pool.query(
        `
        INSERT INTO shared_todo (todo_id, user_id, shared_whith_id) VALUES (?, ?, ?);
        `,
        [todo_id, user_id, shared_whith_id]
        
    )
    return result.insertId;
}