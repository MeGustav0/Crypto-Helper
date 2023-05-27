<template>
  <div class="wallet-info flex" style="flex-direction: column">
    <div class="flex graph" style="width: 100%;">
      <div class="chart-menu">
        <h2 style="color: #feffff; padding: 10px">График</h2>
        <div style="height: 350px">
          <Line :data="LineData" :options="options" style="padding: 10px;"/>
        </div>
      </div>
      <div class="distribution">
        <h2 style="color: #feffff; padding: 10px">Распределение</h2>
        <div>
          <Doughnut :data="chartData" :options="chartOptions"/>
        </div>
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
        <tr  v-for="(existingTable, coinName) in this.userStore.viewTransactionForName" :key="coinName" class="table-info" >
          <td style="padding-left: 10px">
            <div>{{ existingTable.coinName }}</div>
          </td>
          <td>
            <div>${{ existingTable.currentPrice }}</div>
          </td>
          <td class="fl-mid">
            <div :class="{'positive': existingTable.oneWeekAgoPrice > 0, 'negative': existingTable.oneWeekAgoPrice < 0}">
             {{existingTable.oneWeekAgoPrice}}%
            </div></td>
          <td>
            <div>${{ (existingTable.currentPrice * existingTable.coinAmount).toFixed(2) }}</div>
            <div style="font-size: 12px; color: #9598a3">{{ existingTable.coinAmount }}</div>
          </td>
          <td>
            <div :class="{
              'positive': ((existingTable.currentPrice * existingTable.coinAmount) - (existingTable.transactionPrice * existingTable.coinAmount)) / (existingTable.transactionPrice * existingTable.coinAmount) > 0, 
              'negative': ((existingTable.currentPrice * existingTable.coinAmount) - (existingTable.transactionPrice * existingTable.coinAmount)) / (existingTable.transactionPrice * existingTable.coinAmount) < 0}">
              {{((((existingTable.currentPrice * existingTable.coinAmount) - (existingTable.transactionPrice * existingTable.coinAmount)) / (existingTable.transactionPrice * existingTable.coinAmount))* 100).toFixed(2) }}%
            </div>
            <div>{{((existingTable.currentPrice * existingTable.coinAmount) - (existingTable.transactionPrice * existingTable.coinAmount)).toFixed(2)}}$</div>
          </td>
          <td class="fl-mid td-small">
            <div style="text-align: center;" >
              <button class="delete-coin" >
                <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="transaction-modal flex fl-mid" v-if="showTransactionCoinModal">
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
            <th style="padding-left: 10px; width: 160px">
              <div>{{ $t('Type') }}</div>
            </th>
            <th class="td-small">
              <div>{{ $t('wallet') }}</div>
            </th>
            <th>
              <div>{{ $t('Price') }}</div>
            </th>
            <th>
              <div >{{ $t('Assets') }}</div>
            </th>
            <th>
              <div >{{ $t('Notes') }}</div>
            </th>
            <th style="text-align: center;">
              <div>{{ $t('Delete_coin') }}</div>
            </th>
          </tr>
          </thead>
          <tbody   v-for="(transactionList, coinName) in transactionsDetails" :key="coinName">
          <tr class="table-info" v-for="(transaction, index) in transactionList" :key="index">
            <td style="padding-left: 10px; width: 160px" >
              <div>{{ transaction.transactionType }}  {{ transaction.coinName }}</div>
              <div style="font-size: 14px; color: #9598a3">{{ transaction.transactionDate }}</div>
            </td>
            <td class="td-small">
              <div>{{ transaction.wallet }}</div>
            </td>
            <td>
              <div>${{ transaction.transactionPrice }}</div>
            </td>
            <td>
              <div :class="{'positive': transaction.coinAmount > 0, 'negative': transaction.coinAmount < 0}">{{ transaction.coinAmount }}</div>
            </td>
            <td>
              <div>{{ transaction.transactionNote }}</div>
            </td>
            <td style="text-align: center;" class="fl-mid td-small">
              <div>
                <button class="delete-coin" @click="removeTransaction(coinName, index)">
                  <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div class="modal flex fl-mid" v-if="showTransactionModal" @submit.prevent="getTransactionPrice">
      <div class="add-transaction flex">
        <!-- Form for adding a transaction -->
        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
          <label>{{ $t('AddingTransaction') }}</label>
          <button class="close-btn"  @click="closeTransactionModal">✕
            <i></i>
          </button>
        </div>
        <label for="coin-name">{{ $t('NameCryptocurrency') }}</label>

        <select  class="inForm " id="currency" v-model="coinName">
          <option class="list_cu" v-for="currency in currencies" :value="currency.id" :key="currency.id">
            {{ currency.symbol }} - {{ currency.name }}
          </option>
        </select>
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
        <input class="inForm" type="number" v-model="transactionPrice" min="0" step="0.01" v-if="transactionPrice !== null" required>
        <label for="transaction-date">{{ $t('Transaction_Date') }}</label>
        <div>
          <input class="calendar" type="datetime-local" v-model="transactionDate" @change="updatedSelectedCurrencyAndDate()" required>
          <input class="inForm" style="width: 44%" :placeholder="$t('Notes')" v-model="transactionNote">
        </div>
        <button :disabled="isFormIncomplete" class="btn" @click="addTransaction" >{{ $t('AddingTransaction') }}</button>
      </div>
    </div>



  </div>
</template>

<script>
import {useUserStore} from '../store/index'
import axios from 'axios';
import {Doughnut} from 'vue-chartjs'
import {Line} from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { computed } from 'vue';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

export default {
  name: "WalletMain",
  components: {
    Doughnut,
    Line,
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      showTransactionModal: false,
      showTransactionCoinModal: false,
      showCurrencyList: false,
      coinName: '',
      transactionType: 'buy',
      transactionPrice: 0,
      coinAmount: '',
      oneWeekAgoPrice: 0,
      transactionDate: '',
      transactionNote: '',
      NameWallet: '',
      PurchaseAssets: '',
      transactionsDetails: {}, // Детали транзакций
      // totalAssets: 0, // Добавлено свойство для общих активов
      currentDate: null,
      currencies: [],
      currentPrice: null,
    };
  },
  setup() {
    const userStore = useUserStore();
    const totalAssets = computed(() => userStore.totalAssets);
    return {
      userStore,
      totalAssets
    }
  },
  computed: {
    averageTransactionPrice() {
      // Расчет средней цены транзакции
      const transactions = this.userStore.transactions;
      const transactionCount = Object.keys(transactions).length;

      if (transactionCount === 0) {
        return 0;
      }
      let totalTransactionPrice = 0;
      for (const coinName in transactions) {
        const transaction = transactions[coinName];
        totalTransactionPrice += transaction.transactionPrice;
      }
      return totalTransactionPrice / transactionCount;
    },
    isFormIncomplete() {
      return (
          this.coinName === '' ||
          this.transactionPrice === '' ||
          this.coinAmount === '' ||
          this.transactionDate === ''
      );
    },
    chartData() {
      const labels = []; // Массив для меток
      const data = []; // Массив для данных активов

      // Проход по каждой записи в массиве arrTransactions
      for (const transaction of this.userStore.arrTransactions) {
        const coinName = transaction.coinName;
        const totalAssets = transaction.transactionPrice * transaction.coinAmount;

        labels.push(coinName); // Добавить метку
        data.push(totalAssets); // Добавить данные активов
      }
      return {
        labels,
        datasets: [{
          backgroundColor: ['rgb(32,151,98)', '#e4d851', '#1d52a2', '#DD1B16', '#E46651', '#1d8ca2'],
          borderColor: '#324152',
          data,
        }],
      };
    },
    LineData() {
    const transactions = this.userStore.arrTransactions;
    const sortedTransactions = transactions.sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate));

    let totalAssets = 0;
    const labels = [];
    const data = [];

    for (const transaction of sortedTransactions) {
      const amount = transaction.coinAmount;
      const price = transaction.ChartPrice;
      const transactionDate = transaction.transactionDate;

      console.log(sortedTransactions)
      totalAssets += transaction.transactionType === 'buy' ? amount * price : -amount * price;
      labels.push(transactionDate);
      data.push(totalAssets);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Total Assets',
          backgroundColor: '#ef8307',
          borderColor: '#ef8307',
          data,
        },
      ],
    };
  },
  },
  methods:{
    async addTransaction() {
      // Получение данных из формы
      const coinName = this.coinName;
      const transactionType = this.transactionType;
      let transactionPrice = Number(this.transactionPrice).toFixed(2);
      let coinAmount = Number(this.coinAmount);

      // Проверка типа транзакции
      if (transactionType === 'sell') {
        transactionPrice = -transactionPrice;
        coinAmount = -coinAmount;
      }
      const currentPrice = await this.userStore.getCurrentPrice(coinName);
      // const oneWeekAgoPrice = await this.userStore.getOneWeekAgoPrice(coinName);
      // Создание новой транзакции
    
      const newTransaction = {
        coinName,
        transactionType,
        transactionPrice: Math.abs(transactionPrice),
        ChartPrice: transactionPrice,
        coinAmount,
        // oneWeekAgoPrice,
        price: currentPrice, // Используем полученную текущую цену
        transactionDate: this.transactionDate,
        transactionNote: this.transactionNote,
        wallet: this.wallet,
      };
       this.getOneWeekAgoPrice(newTransaction);
      if (coinName in this.transactionsDetails) {
        this.transactionsDetails[coinName].push(newTransaction);
      } else {
        this.transactionsDetails[coinName] = [newTransaction];
      }
      // Сброс значений формы
      this.coinName = '';
      this.transactionType = 'buy';
      this.transactionPrice = '';
      this.coinAmount = '';
      this.transactionDate = '';
      this.transactionNote = '';

      this.showTransactionModal = false;
      // Проверка наличия таблицы с таким же coinName
      const existingTable = this.userStore.viewTransactionForName.find(item => item.coinName === coinName);
      if (existingTable) {
        // Обновление данных в существующей таблице
        existingTable.transactionType = transactionType;
        existingTable.transactionPrice = Math.abs(transactionPrice);
        existingTable.coinAmount += coinAmount;
        existingTable.price = currentPrice;
        existingTable.oneWeekAgoPrice = this.oneWeekAgoPrice;
        existingTable.transactionDate = this.transactionDate;
        existingTable.transactionNote = this.transactionNote;
      } else {
        
        // Добавление новой таблицы
        this.userStore.arrTransactions.push(newTransaction);
      }
      console.log(this.userStore.arrTransactions);
      await this.userStore.filterTransactions()
    },
    async getOneWeekAgoPrice(arrTransactions) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);

      axios.get(`https://api.coincap.io/v2/assets/${this.coinName}/history?interval=d1&start=${startDate.getTime()}&end=${endDate.getTime()}`)
        .then(historyResponse => {
          const historyData = historyResponse.data.data;

          if (historyData.length >= 2) {
            const startPrice = historyData[0].priceUsd;
            const endPrice = historyData[historyData.length - 1].priceUsd;
            const percentChange = ((endPrice - startPrice) / startPrice) * 100;
            arrTransactions.oneWeekAgoPrice = percentChange.toFixed(2);
          }

          this.transactions.push(arrTransactions);
          console.log(this.arrTransactions)
        })
        .catch(error => {
          console.error(error);
        });
    },
    removeTransaction(coinName, index) {
      const transaction = this.transactionsDetails[coinName][index];
      const coinAmount = transaction.coinAmount;

      this.transactionsDetails[coinName].splice(index, 1);// Удаление транзакции из массива

      // Обновление сводной информации в основной таблице
      this.viewTransactionForName[coinName].coinAmount -= coinAmount;

      // Проверка, нужно ли удалить валюту из основной таблицы
      if (this.transactionsDetails[coinName].length === 0) {
        delete this.transactionsDetails[coinName];
        delete this.viewTransactionForName[coinName];
      }
    },
    updatedSelectedCurrencyAndDate() {
      if (this.coinName && this.transactionDate) {
        this.getTransactionPrice();
      } else {
        this.transactionPrice = null;
      }
    },
    async getTransactionPrice() {
      try {
        const startDate = new Date(this.transactionDate).getTime();
        const endDate = startDate + 24 * 60 * 60 * 1000; // Добавляем 24 часа для установки конечной даты на следующий день

        // Запрос к API для получения исторических данных о цене валюты
        const response = await axios.get(`https://api.coincap.io/v2/assets/${this.coinName}/history`, {
          params: {
            interval: 'd1', // ежедневные данные
            start: startDate, // числовое значение начальной даты
            end: endDate // числовое значение конечной даты
          }
        });

        const data = response.data;
        if (data && data.data.length > 0) {
          const price = data.data[0].priceUsd; // Получаем цену из свойства "priceUsd"
          this.transactionPrice = price;
        } else {
          this.transactionPrice = null; // Если данные не найдены, устанавливаем значение null
        }
      } catch (error) {
        console.error(error);
        this.transactionPrice = null; // В случае ошибки устанавливаем значение null
      }
    },
    loadCurrencies() {
      axios
          .get('https://api.coincap.io/v2/assets')
          .then(response => {
            this.currencies = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
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
    this.loadCurrencies();
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
  color: #00ce00;
  text-shadow: #00ce0094 1px 0 10px;
  font-weight: 600!important;
}

.negative {
  color: red;
  text-shadow: rgba(255, 0, 0, 0.555) 1px 0 10px;
  font-weight: 600!important;
}
.table_main{
  width: 100%;
  border-top: rgba(254,255,255,0.35) solid 1px;
  padding: 10px;
  font-weight: normal!important;
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
  background-color: #c0862f;
  border: 0;
  border-radius:15px;
  transition: background-color .15s ease-in-out;
}
.buy_sell:hover{
  background-color:  #ef8307;
  text-decoration: none;
  cursor: pointer;
}
.flex{
  display: flex;
}
.fl-mid{
  align-items: center;
  justify-content: center;
}
.close-btn{
  width: 30px;
  height: 30px;
  line-height: 30px;
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
option{
  background-color: #324152;
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
@media (max-width: 1000px) {
  .table-coin {
    font-size: 2vw!important;
  }
  .table-info{
    font-size: 1.8vw!important;
  }
}
@media (max-width: 700px) {
  .graph {
    flex-wrap: wrap;
  }
  .distribution{
    width: 100%!important;
  }
  .chart-menu{
    width: 100%!important;
    margin: 0!important;
  }
}

.table-coin{
  width: 90vw;
  /*min-width: 350px;*/
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