import {defineStore} from "pinia";
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    arrTransactions: [],
    viewTransactionForName: [],
    wallet: '',
    transactions: [],
    totalAssets: 0,
  }),

  actions: {
    async filterTransactions() {
      this.viewTransactionForName = this.arrTransactions.filter(item => item.wallet === this.wallet);
      for (const existingTable of this.viewTransactionForName) {
        existingTable.currentPrice = await this.getCurrentPrice(existingTable.coinName);
      }

      console.log(this.viewTransactionForName);
    },
    async getCurrentPrice(coinName) {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
        const data = response.data;

        if (data && data.data) {
          const roundedPrice = data.data.priceUsd;
          const price = parseFloat(roundedPrice).toFixed(2); // Ограничение до 2 цифр после запятой
          return price;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  getters: {
    totalAssets() {
      let sum = 0;
      for (const existingTable of this.viewTransactionForName) {
        sum += existingTable.currentPrice * existingTable.coinAmount;
      }
      return sum.toFixed(2);
    },
    AllAsset() {
      let sum2 = 0;
      for (const transactions of this.viewTransactionForName) {
        sum2 += transactions.currentPrice * transactions.coinAmount;
      }
      return sum2.toFixed(2);
    }
  }
});