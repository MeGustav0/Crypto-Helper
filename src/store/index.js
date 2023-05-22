import { defineStore } from "pinia";
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    arrTransactions: [],
    viewTransactionForName: [],
    wallet: '',
    transactions: [],
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
          const price = data.data.priceUsd;
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
});