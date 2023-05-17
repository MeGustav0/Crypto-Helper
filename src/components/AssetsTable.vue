<template>
      <tr  v-for="(summary, coinName) in transactionsSummary" :key="coinName" class="table-info" @click="openTransactionCoinModal">
<!--        v-for="transaction in transactions" :key="transaction.coinName"-->
        <th style="padding-left: 10px">
          <div>{{ coinName }}</div>
        </th>
        <th>
          <div>{{ summary.totalTransactionPrice }}</div>
        </th>
        <th class="fl-mid">
          <div>+ $3 (2%)</div></th>
        <th>
          <div>{{ calculateTotalAssets(summary) }}</div>
          <div style="font-size: 12px; color: #9598a3">{{ summary.totalCoinAmount }}</div>
        </th>
        <th>
          <div>profit/loss</div></th>
        <th style="text-align: center;" class="fl-mid td-small">
          <div style="z-index: 1000">
            <button class="delete-coin" @click="removeCoin(coinName)">
              <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
            </button>
          </div>
        </th>
      </tr>
  <TransactionCoinModal/>
</template>

<script>
import transactionCoinModal from "@/components/TransactionCoinModal";

export default {
  name: "AssetsTable",
  components: {
    transactionCoinModal,
  },
  // created() {
  //   // Прослушивание события
  //   this.$eventBus.$on('transactionAdded', (newTransaction) => {
  //     // Обновление таблицы с активами на основе новой транзакции
  //     this.updateTable(newTransaction);
  //   });
  // },
  // data() {
  //   return {
  //     showTransactionCoinModal: false,
  //     transactionsSummary: {}, // Сводная информация о транзакциях
  //     transactionsDetails: {}, // Детали транзакций
  //   };
  // },
  props: {
    transactions: {
      transactions: Array
    },
    transactionsSummary: {
      transactions: Object
    },
    transactionsDetails: {
      transactions: Object
    }
  },
  methods: {
    // removeCoin(coinName) {
    //   // Удаление валюты из основной таблицы и деталей транзакций
    //   delete this.transactionsDetails[coinName];
    //   delete this.transactionsSummary[coinName];
    //   this.updateTotalAssets(); // Обновление общих активов
    // },
    // calculateTotalAssets(summary) {
    //   return (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2); // Вывод общего актива по названию валюты
    // },
    openTransactionCoinModal() {
      this.showTransactionModal = true;
    },
    closeTransactionCoinModal() {
      this.showTransactionCoinModal = false;
    },
  }
}
</script>

<style scoped>
.table-info{
  background: #1e2c39;
  z-index: 50;
  cursor: pointer;
  height: 65px!important;
}
.table-info:hover{
  background: rgba(149, 152, 163, 0.2);
}
.td-small{
  width: 140px;
}
.delete-coin{
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 0;
  background: inherit;
  transition: background-color .15s ease-in-out;
  z-index: 900;
}
.delete-coin:hover{
  background-color: rgba(255, 255, 255, 0.27);
  text-decoration: none;
  cursor: pointer;
}
</style>