<template>
  <div class="add-modal flex fl-mid">
    <div class="add-transaction flex">
      <!-- Form for adding a transaction -->
      <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
        <label for="coin-name">Adding a Transaction</label>
        <button class="close-btn" @click="closeModal">✕
          <i></i>
        </button>
      </div>
      <label for="coin-name">Название криптовалюты:</label>
      <input class="inForm" type="text" v-model="coinName" required>
      <label for="coin-amount">Количество:</label>
      <div class="flex">
        <div class="flex" style="flex-direction: column;">
          <input class="inForm" style="width: 80%" type="number" v-model="coinAmount" min="0" step="0.0001" required>
        </div>
        <div class="flex">
          <select class="buy_sell" v-model="transactionType" required>
            <option value="buy">Покупка</option>
            <option value="sell">Продажа</option>
          </select>
        </div>
      </div>
      <label for="transaction-price">Цена:</label>
      <input class="inForm" type="number" v-model="transactionPrice" min="0" step="0.01" required>
      <label for="transaction-date">Дата транзакции:</label>
      <div>
        <input class="calendar" type="date" v-model="transactionDate" required>
        <input class="inForm" style="width: 51%" placeholder="Заметка" v-model="transactionNote">
      </div>
      <button :disabled="isFormIncomplete" class="btn" @click="addTransaction">Добавить транзакцию</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionModal",

  data() {
    return {
      coinName: '',
      transactionType: 'buy',
      transactionPrice: '',
      coinAmount: '',
      transactionDate: '',
      transactionNote: '',
      // transactionsSummary: {}, // Сводная информация о транзакциях
      // transactionsDetails: {}, // Детали транзакций
    };
  },
  computed: {
    isFormIncomplete() {
      return (
          this.coinName === "" ||
          this.transactionPrice === "" ||
          this.coinAmount === "" ||
          this.transactionDate === ""
      );
    },
  },
  methods: {
    addTransaction() {
      const TransactionArr = {
        coinName: this.coinName,
        coinAmount: this.coinAmount,
        transactionType: this.transactionType,
        transactionPrice: this.transactionPrice,
        transactionDate: this.transactionDate,
        transactionNote: this.transactionNote,
      };

      this.$emit('add-transaction', TransactionArr);

      // Сброс значений формы
      this.coinName = '';
      this.transactionType = 'buy';
      this.transactionPrice = '';
      this.coinAmount = '';
      this.transactionDate = '';
      this.transactionNote = '';

    },
    // calculateTotalAssetsForAllCoins() {
    //   let total = 0;
    //   for (const coinName in this.transactionsSummary) {
    //     const summary = this.transactionsSummary[coinName];
    //     total += summary.totalTransactionPrice * summary.totalCoinAmount;
    //   }
    //   this.totalAssets = total.toFixed(2);
    // },
    closeModal() {
      this.$emit('close');
    },
  }
}
</script>

<style>
.add-modal{
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
.add-transaction{
  max-width: 400px;
  flex-direction: column;
  position: absolute;
  color: #feffff;
  font-size: 20px;
  padding: 30px;
  background: #1e2c39;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.14);
  z-index: 6
}
.inForm {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 22px;
  color: #9598a3;
  background-color: rgba(149, 152, 163, 0.09);
  offset: 0;
  transition:all 0.15s ease-in-out;
}
.inForm:hover{
  box-shadow:0 0 0 3px rgba(117, 123, 130, 0.28);
  border:2px rgba(23, 23, 23, 0.1) solid;
}
.buy_sell{
  height: 46px;
  width: 15vh;
  margin-top: 10px;
  font-size: 2vh;
  font-weight: 600;
  padding: 5px 10px 5px 10px;
  color: #feffff;
  background-color: #F0C70B;
  border: 0;
  border-radius:15px;
  transition: background-color .15s ease-in-out;
}
.buy_sell:hover{
  background-color: #faed02;
  text-decoration: none;
  cursor: pointer;
}
.close-btn{
  width: 30px;
  height: 30px;
  font-size: 30px;
  font-weight: 800;
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
.calendar{
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 8px;
  width: 37%;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 10px;
  font-size: 22px;
  color: #9598a3;
  background-color: rgba(149, 152, 163, 0.09);
  offset: 0;
  transition:all 0.15s ease-in-out;
}
</style>