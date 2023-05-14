<template>
  <div class="profile">

  </div>

</template>

<script>
// import axios from 'axios';
//
// export default {
//   components: {
//
//   },
//   data() {
//     return {
//       balances: [
//         { currency: 'BTC', amount: 0.5, price: 55000 },
//         { currency: 'ETH', amount: 2, price: 3000 },
//         { currency: 'LTC', amount: 10, price: 150 }
//       ],
//       prices: {},
//       showModal: false
//     }
//   },
//   created() {
//     this.fetchPrices();
//     setInterval(this.fetchPrices, 10000);
//   },
//   methods: {
//     fetchPrices() {
//       axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
//         headers: {
//           'X-CMC_PRO_API_KEY': '<adf702ca-f610-4d94-8277-a35517b1b45b>'
//         },
//         params: {
//           symbol: 'BTC,ETH,LTC'
//         }
//       })
//           .then(response => {
//             const quotes = response.data.data;
//             Object.keys(quotes).forEach(symbol => {
//               this.prices[symbol] = quotes[symbol].quote.USD.price.toFixed(2);
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//     }
//   }
// }
</script>

<style scoped>
.profile{
  width: 150vh;
  height: 93.6vh;
  background-color: #fff200;
  margin-left: auto;
  margin-right: auto;
  font-family: unset;
  position: relative;
  z-index: 0;
}

</style>