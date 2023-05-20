const express = require('express');
const app = express();
const userRouter = require('./src/router/user.router')
// const request = require('request');
// const dotenv = require('dotenv');
// const path = require('path');
const PORT = process.env.PORT || 3000

app.use('/api',userRouter)
app.use(express.json())

app.listen(PORT,() => console.log(`Localhost:${PORT}`))

// dotenv.config();
// //
// // app.use(express.static(path.join(__dirname, 'src')));
// // Обработчик GET-запроса на корневой путь "/"
// app.get('/:crypto', (req, res) => {
//     const crypto = req.params.crypto;
//     // const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`;
//     const url2 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`;
//     // res.sendFile(path.join(__dirname, 'src', 'App.vue'));
//     request.get({
//         url: url2,
//         json: true,
//         headers: {
//             'X-CMC_PRO_API_KEY': process.env.API_KEY
//         }
//     }, (error, response, data) => {
//         if (error) {
//             return res.send({
//                 error: error
//             });
//         }
//
//         res.send({
//             data: data.data[crypto].quote
//         });
//     });
// });

// Запуск сервера на порту 3000
// app.listen(3000, () => {
//     console.log('Сервер запущен на порту 3000');
// });