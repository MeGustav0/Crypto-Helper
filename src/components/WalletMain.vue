<template>
  <div class="wallet-info flex" style="flex-direction: column">
    <div class="flex" style="width: 100%;">
      <div class="chart-menu">

      </div>
      <div class="distribution">
        <h2>Круговая диаграмма</h2>
      </div>
    </div>
    <div class="flex" style="padding-left: 10px; margin-top: 20px">
      <button class="btn fl-mid" style="height: 50px; font-size: 18px" @click="openTransactionModal">
        {{ $t('add_transaction') }}
      </button>
    </div>
    <div class="table">
      <div class="flex" style="justify-content: space-between">
        <div class="flex" style="flex-direction: row">
          <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ $t('Assets') }}:</p>
          <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ wallet }}</p>
        </div>

        <button style="margin: 10px; font-size: 16px" class="btn" @click="openTransactionCoinModal">{{ $t('more_transact') }}</button>
      </div>
      <table class="table_main">
        <thead>
        <tr>
          <th style="padding-left: 10px">
            <div>{{ $t('Name') }}</div></th>
          <th>
            <div >{{ $t('Price') }}</div></th>
          <th class="fl-mid">
            <div>{{ $t('24_h') }}</div></th>
          <th>
            <div>{{ $t('Assets') }}</div><div style="background-color: #feffff; width: 100px">{{ NameWallet }}</div></th>
          <th>
            <div >{{ $t('profitLoss') }}</div></th>
          <th style="text-align: center;" class="fl-mid td-small">
            <div>{{ $t('Delete_coin') }}</div></th>
        </tr>
        </thead>
        <tbody>
           <!--          v-if="NameWallet === wallet"-->
        <tr  v-for="(summary, coinName) in transactionsSummary" :key="coinName" class="table-info" >
          <!--        v-for="transaction in transactions" :key="transaction.coinName"-->
          <th style="padding-left: 10px">
            <div>{{ coinName }}</div>
<!--            <div>{{ summary.wallet }}</div>-->
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
          <th class="fl-mid td-small">
            <div style="text-align: center;" >
              <button class="delete-coin" @click="removeCoin(coinName)">
                <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
              </button>
            </div>
          </th>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal flex fl-mid" v-if="showTransactionModal" >
      <div class="add-transaction flex">
        <!-- Form for adding a transaction -->
        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
          <label for="coin-name">{{ $t('AddingTransaction') }}</label>
          <button class="close-btn"  @click="closeTransactionModal">✕
            <i></i>
          </button>
        </div>
        <label for="coin-name">{{ $t('NameCryptocurrency') }}</label>
          <input class="inForm" type="text" @click="openCurrencyList" v-model="coinName"  required>
          <ul v-show="showCurrencyList">
            <li v-for="currency in currencies" :key="currency" @click="selectCurrency(currency)">{{ currency }}</li>
          </ul>
        <label for="coin-amount">{{ $t('Quantity') }}</label>
        <div class="flex">
          <div class="flex" style="flex-direction: column;">
            <input class="inForm" style="width: 80%" type="number" v-model="coinAmount" min="0" step="0.0001" required>
          </div>
          <div class="flex">
            <select class="buy_sell" v-model="transactionType" required>
              <option value="buy">{{ $t('Purchase') }}</option>
              <option value="sell">{{ $t('Sale') }}</option>
            </select>
          </div>
        </div>
        <label for="transaction-price">{{ $t('Price') }}</label>
        <input class="inForm" type="number" v-model="transactionPrice" min="0" step="0.01" required>
        <label for="transaction-date">{{ $t('Transaction_Date') }}</label>
        <div>
          <input class="calendar" type="datetime-local" v-model="transactionDate"  required>
          <input class="inForm" style="width: 45.1%" :placeholder="$t('Note')" v-model="transactionNote">
        </div>
        <button :disabled="isFormIncomplete" class="btn" @click="addTransaction" >{{ $t('AddingTransaction') }}</button>
      </div>
    </div>

    <div class="transaction-modal flex fl-mid" v-if="showTransactionCoinModal" @click="closeTransactionCoinModal" >
      <p style="font-size: 50px; color: #9598a3">Вы еще не добавили не одной транзакции...</p>
      <div class="table-coin flex" style="z-index: 2000" >

        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
          <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ $t('more_transact') }}</p>
          <button class="close-btn " @click="closeTransactionCoinModal" >✕
            <i ></i>
          </button>
        </div>
        <table style="border-collapse: collapse;">
          <thead>
          <tr style="border-bottom: rgba(254,255,255,0.35) solid 1px;">
            <th style="padding-left: 10px">
              <div>{{ $t('Type') }}</div>
            </th>
            <th>
              <div>{{ $t('Price') }}</div>
            </th>
            <th class="fl-mid">
              <div>{{ $t('24_h') }}</div>
            </th>
            <th>
              <div >{{ $t('Assets') }}</div>
            </th>
            <th>
              <div >{{ $t('Notes') }}</div>
            </th>
            <th style="text-align: center;" class="fl-mid td-small">
              <div>{{ $t('Delete_coin') }}</div>
            </th>
          </tr>
          </thead>
<!--          v-if="NameWallet === wallet"-->
          <tbody v-for="(transactionList, coinName) in transactionsDetails" :key="coinName">
          <tr v-for="(transaction, index) in transactionList" :key="index" class="table-info">
            <th style="padding-left: 10px">
              <div>{{ transaction.transactionType }}{{ coinName }}</div>
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
              <div :class="{'positive': transaction.coinAmount > 0, 'negative': transaction.coinAmount < 0}">{{ transaction.coinAmount }}</div>
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

  </div>
</template>

<script>
export default {
  name: "WalletMain",
  data() {
    return {
      showTransactionModal: false,
      showTransactionCoinModal: false,
      showCurrencyList: false,
      coinName: '',
      transactionType: 'buy',
      transactionPrice: '',
      coinAmount: '',
      transactionDate: '',
      transactionNote: '',
      NameWallet: '',
      transactionsSummary: {}, // Сводная информация о транзакциях
      transactionsDetails: {}, // Детали транзакций
      totalAssets: 0, // Добавлено свойство для общих активов
      currentDate: null,
      currencies: ['USD', 'EUR', 'GBP', 'JPY'],
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
          },
        ],
      },
    };
  },
  computed: {
    isFormIncomplete() {
      return (
          this.coinName === '' ||
          this.transactionPrice === '' ||
          this.coinAmount === '' ||
          this.transactionDate === ''
      );
    },
  },
  methods:{
    openCurrencyList() {
      this.showCurrencyList = true;
    },
    selectCurrency(currency) {
      this.coinName = currency;
      this.showCurrencyList = false;
    },
    // createChart() {
    //   const chartData = {
    //     labels: Object.keys(this.transactionsSummary),
    //     datasets: [
    //       {
    //         data: Object.values(this.transactionsSummary).map(summary =>
    //             this.calculateTotalAssets(summary)
    //         ),
    //         backgroundColor: [
    //           '#FF6384',
    //           '#36A2EB',
    //           '#FFCE56',
    //           // Добавьте цвета по мере необходимости
    //         ],
    //       },
    //     ],
    //   };
    //   new Chart(this.$refs.chart, {
    //     type: 'doughnut',
    //     data: chartData,
    //   });
    // },
    addTransaction() {
      // Получение данных из формы
      const coinName = this.coinName;
      const transactionType = this.transactionType;
      let transactionPrice = Number(this.transactionPrice);
      let coinAmount = Number(this.coinAmount);
      // let wallet = this.wallet;
      // Проверка типа транзакции
      if (transactionType === 'sell') {
        // Если тип транзакции - продажа, меняем знак цены на отрицательный
        transactionPrice = -transactionPrice;
        coinAmount = -coinAmount;
      }

      // Обновление сводной информации
      if (coinName in this.transactionsSummary) {
        this.transactionsSummary[coinName].totalTransactionPrice += transactionPrice;
        this.transactionsSummary[coinName].totalCoinAmount += coinAmount;
      } else {
        this.transactionsSummary[coinName] = {
          totalTransactionPrice: transactionPrice,
          totalCoinAmount: coinAmount
        };
      }

      // Создание новой транзакции
      const newTransaction = {
        transactionType,
        transactionPrice,
        coinAmount,
        transactionDate: this.transactionDate,
        transactionNote: this.transactionNote,
        wallet: this.wallet,
      };
      // Обновление деталей транзакций
      if (coinName in this.transactionsDetails) {
        this.transactionsDetails[coinName].push(newTransaction);
      } else {
        this.transactionsDetails[coinName] = [newTransaction];
      }
      // Пересчет общей стоимости всех активов
      this.calculateTotalAssetsForAllCoins();
      // Сброс значений формы
      this.coinName = '';
      this.transactionType = 'buy';
      this.transactionPrice = '';
      this.coinAmount = '';
      this.transactionDate = '';
      this.transactionNote = '';


      this.showTransactionModal = false;

      console.log(newTransaction)
    },
    removeTransaction(coinName, index) {
      const transaction = this.transactionsDetails[coinName][index];
      const transactionPrice = transaction.transactionPrice;
      const coinAmount = transaction.coinAmount;

      this.transactionsDetails[coinName].splice(index, 1);// Удаление транзакции из массива

      // Обновление сводной информации в основной таблице
      this.transactionsSummary[coinName].totalTransactionPrice -= transactionPrice;
      this.transactionsSummary[coinName].totalCoinAmount -= coinAmount;

      this.updateTotalAssets();// Обновление общих активов

      // Проверка, нужно ли удалить валюту из основной таблицы
      if (this.transactionsDetails[coinName].length === 0) {
        delete this.transactionsDetails[coinName];
        delete this.transactionsSummary[coinName];
      }
    },
    removeCoin(coinName) {
      // Удаление валюты из основной таблицы и деталей транзакций
      delete this.transactionsDetails[coinName];
      delete this.transactionsSummary[coinName];
      this.updateTotalAssets(); // Обновление общих активов
    },
    updateTotalAssets() {
      let totalAssets = 0;
      for (const coinName in this.transactionsSummary) {
        const summary = this.transactionsSummary[coinName];
        summary.totalAssets = (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2);
        totalAssets += parseFloat(summary.totalAssets);
      }
      this.totalAssets = totalAssets.toFixed(2);
    },
    calculateTotalAssets(summary) {
      return (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2); // Вывод общего актива по названию валюты
    },
    calculateTransactionAssets(transaction) {
      return (transaction.transactionPrice * transaction.coinAmount).toFixed(2); // Вывод общего актива для каждой транзакции
    },
    calculateTotalAssetsForAllCoins() {
      let total = 0;
      for (const coinName in this.transactionsSummary) {
        const summary = this.transactionsSummary[coinName];
        total += summary.totalTransactionPrice * summary.totalCoinAmount;
      }
      this.totalAssets = total.toFixed(2);
    },
    closeTransactionModal() {
      this.showTransactionModal = false;
    },
    openTransactionModal() {
      this.showTransactionModal = true;
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      this.transactionDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    openTransactionCoinModal() {
      this.showTransactionCoinModal = true;
    },
    closeTransactionCoinModal() {
      this.showTransactionCoinModal = false;
    },
  },
  mounted() {
    this.$emit('total-assets-updated', this.totalAssets);
  },
  props: {
    wallet: {
      type: String,
      required: true
    },
  },
}
</script>

<style >
.positive {
  color: green;
}

.negative {
  color: red;
}
.table_main{
  width: 100%;
  border-top: rgba(254,255,255,0.35) solid 1px;
  padding: 10px;
  border-collapse: collapse;
  text-align: left;
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
  width: 43%;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 10px;
  font-size: 18px;
  color: #9598a3;
  background-color: rgba(149, 152, 163, 0.09);
  offset: 0;
  transition:all 0.15s ease-in-out;
}
.table-info{
  background: #1e2c39;
  z-index: 50;
  height: 65px!important;
}
.table-info:hover{
  background: rgba(149, 152, 163, 0.2);
}
.td-small{
  width: 140px;
}
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
.wallet-info{
  height: inherit;
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
.chart-menu{
  width: 60%;
  height: 400px;
  margin-right: 20px;
  background: #1e2c39;
  border-radius: 5px;
}
.distribution{
  width: 40%;
  height: 400px;
  background: #1e2c39;
  border-radius: 5px;
}
.table{
  width: 100%;
  background: #1e2c39;
  border-radius: 5px;
  margin-top: 20px;
  color: #feffff;
}
.td-small{
  width: 140px;
}
</style>