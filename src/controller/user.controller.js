// const pool = require("../../db");

class UserController{
    async registerUser(req,res){
        const { username, email, password } = req.body
        console.log(username, email, password)
        res.json("ок")

        // try {
        //     const newPerson = await pool.query(`INSERT INTO person (username, email, password) VALUES ($1, $2, $3)`, [username, email, password]);
        //     res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
        //     res.json(newPerson)
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя' });
        // }
    }
}

module.exports = new UserController()