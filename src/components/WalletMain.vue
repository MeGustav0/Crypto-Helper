<template>
  <div class="wallet-info flex" style="flex-direction: column">
    <div class="flex" style="width: 100%;">
      <div class="chart-menu">

      </div>
      <div class="distribution">
        <h2 style="color: #feffff; padding: 10px">Круговая диаграмма</h2>
        <div>
          <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData"/>
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
          <th style="padding-left: 10px">
            <div>{{ existingTable.coinName }}</div>
          </th>
          <th>
            <div>{{ existingTable.currentPrice }}</div>
          </th>
          <th class="fl-mid">
            <div>+ $3 (2%)</div></th>
          <th>
            <div>{{ existingTable.currentPrice * existingTable.coinAmount }}</div>
            <div style="font-size: 12px; color: #9598a3">{{ existingTable.coinAmount }}</div>
          </th>
          <th>
            <div>profit/loss</div></th>
          <th class="fl-mid td-small">
            <div style="text-align: center;" >
              <button class="delete-coin" >
                <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
              </button>
            </div>
          </th>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="transaction-modal flex fl-mid" v-if="showTransactionCoinModal">
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
          <tbody  >
          <tr class="table-info" v-for="(transactions, coinName) in this.userStore.transactions" :key="coinName">
            <th style="padding-left: 10px">
              <div>{{ transactions.transactionType }}  {{ transactions.coinName }}</div>
              <div style="font-size: 14px">{{ transactions.transactionDate }}</div>
            </th>
            <th>
              <div>{{ transactions.transactionPrice }}</div>
            </th>
            <th class="fl-mid">
              <div>+ $3 (2%)</div>
            </th>
            <th>
              <div :class="{'positive': transactions.coinAmount > 0, 'negative': transactions.coinAmount < 0}">{{ transactions.coinAmount }}</div>
            </th>
            <th>
              <div>{{ transactions.transactionNote }}</div>
            </th>
            <th style="text-align: center;" class="fl-mid td-small">
              <div>
                <button class="delete-coin" >
                  <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">
                </button>
              </div>
            </th>
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
            {{ currency.name }}
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "WalletMain",
  components: {
    Doughnut
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
      transactionsDetails: {}, // Детали транзакций
      totalAssets: 0, // Добавлено свойство для общих активов
      currentDate: null,
      currencies: [],
      currentPrice: null,
    };
  },
  setup() {
    const userStore = useUserStore();

    return {
      userStore
    }
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
    chartData() {
      return {
        labels: ['btn','eth'],
        plugins: {
          colors: {
            enabled: false
          }
        },
        datasets: [{
            backgroundColor: ['rgb(32,151,98)', '#E46651', '#1d8ca2', '#DD1B16'],
            data: [40, 20, 80, 10]
          }]
      }
    },
  },
  methods:{
    async addTransaction() {
      // Получение данных из формы
      const coinName = this.coinName;
      const transactionType = this.transactionType;
      let transactionPrice = Number(this.transactionPrice);
      let coinAmount = Number(this.coinAmount);

      // Проверка типа транзакции
      if (transactionType === 'sell') {
        transactionPrice = -transactionPrice;
        coinAmount = -coinAmount;
      }

      const currentPrice = await this.userStore.getCurrentPrice(coinName);
      // Создание новой транзакции
      const newTransaction = {
        coinName,
        transactionType,
        transactionPrice: Math.abs(transactionPrice),
        coinAmount,
        price: currentPrice, // Используем полученную текущую цену
        transactionDate: this.transactionDate,
        transactionNote: this.transactionNote,
        wallet: this.wallet,
      };

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
        existingTable.transactionDate = this.transactionDate;
        existingTable.transactionNote = this.transactionNote;
      } else {
        // Добавление новой таблицы
        this.userStore.arrTransactions.push(newTransaction);
      }
      this.userStore.transactions.push(newTransaction);
      console.log(this.userStore.arrTransactions);
      await this.userStore.filterTransactions()

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