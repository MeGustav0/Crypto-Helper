<template>
  <div class="transaction-modal flex fl-mid">
  <div class="table-coin flex" v-for="(transactionList, coinName) in transactionsDetails" :key="coinName">
<!--    v-for="transaction in transactions" :key="transaction.coinName"-->
    <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
      <p style="font-size: 35px; color: #feffff;  padding:10px; ">Bitcoin</p>
      <button class="close-btn " @click="closeModal">✕
        <i ></i>
      </button>
    </div>

    <table style="border-collapse: collapse;">
      <thead>
      <tr style="border-bottom: rgba(254,255,255,0.35) solid 1px;">
        <th style="padding-left: 10px">
          <div>Type</div>
        </th>
        <th>
          <div>Price</div>
        </th>
        <th class="fl-mid">
          <div>24 h.</div>
        </th>
        <th>
          <div >Assets</div>
        </th>
        <th>
          <div >Notes</div>
        </th>
        <th style="text-align: center;" class="fl-mid td-small">
          <div>Delete trade</div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(transaction, index) in transactionList" :key="index" class="table-info">
        <th style="padding-left: 10px">
          <div>{{ transaction.transactionType }}</div>
          <div style="font-size: 14px">{{ transaction.transactionDate }}</div>
        </th>
        <th>
          <div>{{ transaction.transactionPrice }}</div>
        </th>
        <th class="fl-mid">
          <div>+ $3 (2%)</div>
        </th>
        <th>
          <!--Здесь цена умноженная на количество-->
          <div>{{ calculateTransactionAssets(transaction) }}</div>
          <div>{{ transaction.coinAmount }}</div>
        </th>
        <th>
          <div>{{ transaction.transactionNote }}</div>
        </th>
        <th style="text-align: center;" class="fl-mid td-small">
          <div>
            <button class="delete-coin" @click="removeTransaction(coinName, index)">
              <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
            </button>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
export default {
  name: "TransactionCoinModal",
  // data() {
  //   return {
  //     transactionsSummary: {}, // Сводная информация о транзакциях
  //     transactionsDetails: {}, // Детали транзакций
  //   };
  // },
  methods: {
    // calculateTransactionAssets(transaction) {
    //   return (transaction.transactionPrice * transaction.coinAmount).toFixed(2); // Вывод общего актива для каждой транзакции
    // },
    // removeTransaction(coinName, index) {
    //   const transaction = this.transactionsDetails[coinName][index];
    //   const transactionPrice = transaction.transactionPrice;
    //   const coinAmount = transaction.coinAmount;
    //
    //   this.transactionsDetails[coinName].splice(index, 1);// Удаление транзакции из массива
    //
    //   // Обновление сводной информации в основной таблице
    //   this.transactionsSummary[coinName].totalTransactionPrice -= transactionPrice;
    //   this.transactionsSummary[coinName].totalCoinAmount -= coinAmount;
    //
    //   this.updateTotalAssets();// Обновление общих активов
    //
    //   // Проверка, нужно ли удалить валюту из основной таблицы
    //   if (this.transactionsDetails[coinName].length === 0) {
    //     delete this.transactionsDetails[coinName];
    //     delete this.transactionsSummary[coinName];
    //   }
    // },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.transaction-modal{
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  top: 0;
  left: 0;
  background: rgba(10, 30, 66, 0.4);
  z-index: 1002;
}
.table-coin{
  width: 1380px;
  min-width: 350px;
  flex-direction: column;
  margin: auto;
  position: absolute;
  color: #feffff;
  font-size: 22px;
  padding: 10px;
  background: #1e2c39;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.14);
  z-index: 6;
  border-collapse: collapse;
  text-align: left;
}
.close-btn{
  width: 40px;
  height: 40px;
  font-size: 40px;
  font-weight: 800;
  padding-right: 30px;
  background: none;
  border: none;
  padding-bottom: 10px;
  color: #324152;
  align-items: center;
  transition:all 0.15s ease-in-out;
}
.close-btn:hover{
  color: #9598a3;
  cursor: pointer;
}
</style>