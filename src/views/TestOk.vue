<template>
  <div>
    <div>
      <label for="currency">Currency:</label>
      <select id="currency" v-model="coinName">
        <option value="">-- Select Currency --</option>
        <option v-for="currency in currencies" :value="currency.id" :key="currency.id">{{ currency.symbol }} - {{ currency.name }}</option>
      </select>
      <button @click="addTransaction" :disabled="!coinName">Add Transaction</button>
    </div>

    <table v-if="transactions.length > 0">
  <thead>
    <tr>
      <th>Currency</th>
      <th>Price</th>
      <th>Change (%)</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="transaction in transactions" :key="transaction.id">
      <td>{{ transaction.symbol }}</td>
      <td>{{ transaction.price }}</td>
      <td>{{ transaction.change7d }}</td>
    </tr>
  </tbody>
</table>
    <p v-else>No transactions available.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      coinName: '',
      currencies: [], // Список доступных криптовалют
      transactions: [] // Список транзакций
    };
  },
  methods: {
    addTransaction() {
      if (this.coinName) {
        axios.get(`https://api.coincap.io/v2/assets/${this.coinName}`)
          .then(response => {
            const transaction = {
              id: this.transactions.length + 1,
              symbol: response.data.data.symbol,
              price: response.data.data.priceUsd,
              change7d: 0 // Изменение цены за 7 дней, изначально 0
            };

            this.getHistoricalData(transaction);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    getHistoricalData(transaction) {
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
            transaction.change7d = percentChange.toFixed(2);
          }

          this.transactions.push(transaction);
        })
        .catch(error => {
          console.error(error);
        });
    },
    loadCurrencies() {
      axios.get('https://api.coincap.io/v2/assets')
        .then(response => {
          this.currencies = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.loadCurrencies();
  }
};
</script>



<!--<template>-->

<!--  <div class="wallet-info flex" style="flex-direction: column">-->
<!--    <div class="flex" style="width: 100%;">-->
<!--      <div class="chart-menu">-->

<!--      </div>-->
<!--      <div class="distribution">-->
<!--        <h2>Круговая диаграмма</h2>-->
<!--        <div>-->
<!--          <Doughnut-->
<!--              id="my-chart-id"-->
<!--              :options="chartOptions"-->
<!--              :data="chartData"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="flex" style="padding-left: 10px; margin-top: 20px">-->
<!--      <button class="btn fl-mid" style="height: 50px; font-size: 18px" @click="openTransactionModal">-->
<!--        {{ $t('add_transaction') }}-->
<!--      </button>-->
<!--    </div>-->
<!--    <div class="table">-->
<!--      <div class="flex" style="justify-content: space-between">-->
<!--        <div class="flex" style="flex-direction: row">-->
<!--          <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ $t('Assets') }}:</p>-->
<!--          <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ wallet }}</p>-->
<!--        </div>-->

<!--        <button style="margin: 10px; font-size: 16px" class="btn" @click="openTransactionCoinModal">{{ $t('more_transact') }}</button>-->
<!--      </div>-->
<!--      <table class="table_main">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th style="padding-left: 10px">-->
<!--            <div>{{ $t('Name') }}</div></th>-->
<!--          <th>-->
<!--            <div >{{ $t('Price') }}</div></th>-->
<!--          <th class="fl-mid">-->
<!--            <div>{{ $t('24_h') }}</div></th>-->
<!--          <th>-->
<!--            <div>{{ $t('Assets') }}</div><div style="background-color: #feffff; width: 100px">{{ WalletName }}</div></th>-->
<!--          <th>-->
<!--            <div >{{ $t('profitLoss') }}</div></th>-->
<!--          <th style="text-align: center;" class="fl-mid td-small">-->
<!--            <div>{{ $t('Delete_coin') }}</div></th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        &lt;!&ndash;          v-if="NameWallet === wallet"&ndash;&gt;-->
<!--        <tr  v-for="(summary, coinName) in transactionsSummary" :key="coinName" class="table-info" >-->
<!--          &lt;!&ndash;        v-for="transaction in transactions" :key="transaction.coinName"&ndash;&gt;-->
<!--          <th style="padding-left: 10px">-->
<!--            <div>{{ coinName }}</div>-->
<!--            &lt;!&ndash;            <div>{{ summary.wallet }}</div>&ndash;&gt;-->
<!--          </th>-->
<!--          <th>-->
<!--            <div>{{ summary.totalTransactionPrice }}</div>-->
<!--          </th>-->
<!--          <th class="fl-mid">-->
<!--            <div>+ $3 (2%)</div></th>-->
<!--          <th>-->
<!--            <div>{{ calculateTotalAssets(summary) }}</div>-->
<!--            <div style="font-size: 12px; color: #9598a3">{{ summary.totalCoinAmount }}</div>-->
<!--          </th>-->
<!--          <th>-->
<!--            <div>profit/loss</div></th>-->
<!--          <th class="fl-mid td-small">-->
<!--            <div style="text-align: center;" >-->
<!--              <button class="delete-coin" @click="removeCoin(coinName)">-->
<!--                <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">-->
<!--              </button>-->
<!--            </div>-->
<!--          </th>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->

<!--    <div class="modal flex fl-mid" v-if="showTransactionModal" @submit.prevent="getTransactionPrice">-->
<!--      <div class="add-transaction flex">-->
<!--        &lt;!&ndash; Form for adding a transaction &ndash;&gt;-->
<!--        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">-->
<!--          <label>{{ $t('AddingTransaction') }}</label>-->
<!--          <button class="close-btn"  @click="closeTransactionModal">✕-->
<!--            <i></i>-->
<!--          </button>-->
<!--        </div>-->
<!--        <label for="coin-name">{{ $t('NameCryptocurrency') }}</label>-->

<!--        <select  class="inForm " id="currency" v-model="coinName">-->
<!--          <option class="list_cu" v-for="currency in currencies" :value="currency.id" :key="currency.id">-->
<!--            {{ currency.name }}-->
<!--          </option>-->
<!--        </select>-->
<!--        <label for="coin-amount">{{ $t('Quantity') }}</label>-->
<!--        <div class="flex">-->
<!--          <div class="flex" style="flex-direction: column;">-->
<!--            <input class="inForm" style="width: 80%" type="number" v-model="coinAmount" min="0" step="0.0001" required>-->
<!--          </div>-->
<!--          <div class="flex">-->
<!--            <select class="buy_sell" v-model="transactionType" required>-->
<!--              <option value="buy">{{ $t('Purchase') }}</option>-->
<!--              <option value="sell">{{ $t('Sale') }}</option>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->
<!--        <label for="transaction-price">{{ $t('Price') }}</label>-->
<!--        <input class="inForm" type="number" v-model="transactionPrice" min="0" step="0.01" v-if="transactionPrice !== null" required>-->
<!--&lt;!&ndash;        <span v-if="transactionPrice !== null">Цена на выбранную дату: {{ transactionPrice }}</span>&ndash;&gt;&ndash;&gt;-->
<!--        <label for="transaction-date">{{ $t('Transaction_Date') }}</label>-->
<!--        <div>-->
<!--          <input class="calendar" type="datetime-local" v-model="transactionDate" @change="updatedSelectedCurrencyAndDate()" required>-->
<!--          <input class="inForm" style="width: 45.1%" :placeholder="$t('Note')" v-model="transactionNote">-->
<!--        </div>-->
<!--        <button :disabled="isFormIncomplete" class="btn" @click="addTransaction" >{{ $t('AddingTransaction') }}</button>-->
<!--      </div>-->
<!--    </div>-->

<!--&lt;!&ndash;    <div>&ndash;&gt;-->
<!--&lt;!&ndash;      <form @submit.prevent="getTransactionPrice">&ndash;&gt;-->
<!--&lt;!&ndash;        <label for="currency">Выберите валюту:</label>&ndash;&gt;-->
<!--&lt;!&ndash;        <select id="currency" v-model="coinName">&ndash;&gt;-->
<!--&lt;!&ndash;          <option v-for="currency in currencies" :value="currency.id" :key="currency.id">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ currency.name }}&ndash;&gt;-->
<!--&lt;!&ndash;          </option>&ndash;&gt;-->
<!--&lt;!&ndash;        </select>&ndash;&gt;-->
<!--&lt;!&ndash;        <label for="transaction-date">Выберите дату:</label>&ndash;&gt;-->
<!--&lt;!&ndash;        <div>&ndash;&gt;-->
<!--&lt;!&ndash;          <input placeholder="Дата" type="date" v-model="transactionDate" @change="updatedSelectedCurrencyAndDate()">&ndash;&gt;-->
<!--&lt;!&ndash;          <span v-if="transactionPrice !== null">Цена на выбранную дату: {{ transactionPrice }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </form>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->

<!--    <div class="transaction-modal flex fl-mid" v-if="showTransactionCoinModal" @click="closeTransactionCoinModal" >-->
<!--      <p style="font-size: 50px; color: #9598a3">Вы еще не добавили не одной транзакции...</p>-->
<!--      <div class="table-coin flex" style="z-index: 2000" >-->

<!--        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">-->
<!--          <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ $t('more_transact') }}</p>-->
<!--          <button class="close-btn " @click="closeTransactionCoinModal" >✕-->
<!--            <i ></i>-->
<!--          </button>-->
<!--        </div>-->
<!--        <table style="border-collapse: collapse;">-->
<!--          <thead>-->
<!--          <tr style="border-bottom: rgba(254,255,255,0.35) solid 1px;">-->
<!--            <th style="padding-left: 10px">-->
<!--              <div>{{ $t('Type') }}</div>-->
<!--            </th>-->
<!--            <th>-->
<!--              <div>{{ $t('Price') }}</div>-->
<!--            </th>-->
<!--            <th class="fl-mid">-->
<!--              <div>{{ $t('24_h') }}</div>-->
<!--            </th>-->
<!--            <th>-->
<!--              <div >{{ $t('Assets') }}</div>-->
<!--            </th>-->
<!--            <th>-->
<!--              <div >{{ $t('Notes') }}</div>-->
<!--            </th>-->
<!--            <th style="text-align: center;" class="fl-mid td-small">-->
<!--              <div>{{ $t('Delete_coin') }}</div>-->
<!--            </th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          &lt;!&ndash;          v-if="NameWallet === wallet"&ndash;&gt;-->
<!--          <tbody v-for="(transactionList, coinName) in transactionsDetails" :key="coinName">-->
<!--          <tr v-for="(transaction, index) in transactionList" :key="index" class="table-info">-->
<!--            <th style="padding-left: 10px">-->
<!--              <div>{{ transaction.transactionType }}{{ coinName }}</div>-->
<!--              <div style="font-size: 14px">{{ transaction.transactionDate }}</div>-->
<!--            </th>-->
<!--            <th>-->
<!--              <div>{{ transaction.transactionPrice }}</div>-->
<!--            </th>-->
<!--            <th class="fl-mid">-->
<!--              <div>+ $3 (2%)</div>-->
<!--            </th>-->
<!--            <th>-->
<!--              &lt;!&ndash;Здесь цена умноженная на количество&ndash;&gt;-->
<!--              <div>{{ calculateTransactionAssets(transaction) }}</div>-->
<!--              <div :class="{'positive': transaction.coinAmount > 0, 'negative': transaction.coinAmount < 0}">{{ transaction.coinAmount }}</div>-->
<!--            </th>-->
<!--            <th>-->
<!--              <div>{{ transaction.transactionNote }}</div>-->
<!--            </th>-->
<!--            <th style="text-align: center;" class="fl-mid td-small">-->
<!--              <div>-->
<!--                <button class="delete-coin" @click="removeTransaction(coinName, index)">-->
<!--                  <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">-->
<!--                </button>-->
<!--              </div>-->
<!--            </th>-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </table>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->


<!--</template>-->

<!--<script>-->
<!--import axios from 'axios';-->

<!--import {Doughnut} from 'vue-chartjs'-->
<!--import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'-->
<!--ChartJS.register(ArcElement, Tooltip, Legend)-->

<!--export default {-->
<!--  name: "WalletMain",-->
<!--  components: {-->
<!--    Doughnut-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      chartOptions: {-->
<!--        responsive: true,-->
<!--        maintainAspectRatio: false,-->
<!--      },-->
<!--      showTransactionModal: false,-->
<!--      showTransactionCoinModal: false,-->
<!--      showCurrencyList: false,-->
<!--      coinName: '',-->
<!--      transactionType: 'buy',-->
<!--      transactionPrice: '',-->
<!--      coinAmount: '',-->
<!--      transactionDate: '',-->
<!--      transactionNote: '',-->
<!--      WalletName: '',-->
<!--      transactionsSummary: {}, // Сводная информация о транзакциях-->
<!--      transactionsDetails: {}, // Детали транзакций-->
<!--      totalAssets: 0, // Добавлено свойство для общих активов-->
<!--      currentDate: null,-->
<!--      currencies: []-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    isFormIncomplete() {-->
<!--      return (-->
<!--          this.coinName === '' ||-->
<!--          this.transactionPrice === '' ||-->
<!--          this.coinAmount === '' ||-->
<!--          this.transactionDate === ''-->
<!--      );-->
<!--    },-->
<!--    chartData() {-->
<!--      return {-->
<!--        labels: ['btn', 'eth'],-->
<!--        plugins: {-->
<!--          colors: {-->
<!--            enabled: false-->
<!--          }-->
<!--        },-->
<!--        datasets: [-->
<!--          {-->
<!--            backgroundColor: ['rgb(32,151,98)', '#E46651', '#1d8ca2', '#DD1B16'],-->
<!--            data: [40, 20, 80, 10]-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    openCurrencyList() {-->
<!--      this.showCurrencyList = true;-->
<!--    },-->
<!--    selectCurrency(currency) {-->
<!--      this.coinName = currency;-->
<!--      this.showCurrencyList = false;-->
<!--    },-->
<!--    addTransaction() {-->
<!--      // Получение данных из формы-->
<!--      const coinName = this.coinName;-->
<!--      const transactionType = this.transactionType;-->
<!--      let transactionPrice = Number(this.transactionPrice);-->
<!--      let coinAmount = Number(this.coinAmount);-->
<!--      let WalletName = this.wallet;-->
<!--      // Проверка типа транзакции-->
<!--      if (transactionType === 'sell') {-->
<!--        // Если тип транзакции - продажа, меняем знак цены на отрицательный-->
<!--        transactionPrice = -transactionPrice;-->
<!--        coinAmount = -coinAmount;-->
<!--      }-->

<!--      // Обновление сводной информации-->
<!--      if (coinName in this.transactionsSummary) {-->
<!--        this.transactionsSummary[coinName].totalTransactionPrice += transactionPrice;-->
<!--        this.transactionsSummary[coinName].totalCoinAmount += coinAmount;-->
<!--      } else {-->
<!--        this.transactionsSummary[coinName] = {-->
<!--          totalTransactionPrice: transactionPrice,-->
<!--          totalCoinAmount: coinAmount,-->
<!--          WalletName: WalletName-->
<!--        };-->
<!--      }-->

<!--      // Создание новой транзакции-->
<!--      const newTransaction = {-->
<!--        transactionType,-->
<!--        transactionPrice: Math.abs(transactionPrice),-->
<!--        coinAmount,-->
<!--        transactionDate: this.transactionDate,-->
<!--        transactionNote: this.transactionNote,-->
<!--        WalletName: this.wallet,-->
<!--      };-->
<!--      // Обновление деталей транзакций-->
<!--      if (coinName in this.transactionsDetails) {-->
<!--        this.transactionsDetails[coinName].push(newTransaction);-->
<!--      } else {-->
<!--        this.transactionsDetails[coinName] = [newTransaction];-->
<!--      }-->
<!--      // Пересчет общей стоимости всех активов-->
<!--      this.calculateTotalAssetsForAllCoins();-->
<!--      // Сброс значений формы-->
<!--      this.coinName = '';-->
<!--      this.transactionType = 'buy';-->
<!--      this.transactionPrice = '';-->
<!--      this.coinAmount = '';-->
<!--      this.transactionDate = '';-->
<!--      this.transactionNote = '';-->


<!--      this.showTransactionModal = false;-->

<!--      console.log(newTransaction)-->
<!--    },-->
<!--    updatedSelectedCurrencyAndDate() {-->
<!--      if (this.coinName && this.transactionDate) {-->
<!--        this.getTransactionPrice();-->
<!--      } else {-->
<!--        this.transactionPrice = null;-->
<!--      }-->
<!--    },-->
<!--    async getTransactionPrice() {-->
<!--      try {-->
<!--        const startDate = new Date(this.transactionDate).getTime();-->
<!--        const endDate = startDate + 24 * 60 * 60 * 1000; // Добавляем 24 часа для установки конечной даты на следующий день-->
<!--        const response = await axios.get(`https://api.coincap.io/v2/assets/${this.coinName}/history`, {-->
<!--          params: {-->
<!--            interval: 'd1', // ежедневные данные-->
<!--            start: startDate, // числовое значение начальной даты-->
<!--            end: endDate // числовое значение конечной даты-->
<!--          }-->
<!--        });-->

<!--        const data = response.data;-->
<!--        if (data && data.data.length > 0) {-->
<!--          const price = data.data[0].priceUsd;-->
<!--          this.transactionPrice = price;-->
<!--        } else {-->
<!--          this.transactionPrice = null;-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--        this.transactionPrice = null;-->
<!--      }-->
<!--    },-->
<!--    loadCurrencies() {-->
<!--      axios-->
<!--          .get('https://api.coincap.io/v2/assets')-->
<!--          .then(response => {-->
<!--            this.currencies = response.data.data;-->
<!--          })-->
<!--          .catch(error => {-->
<!--            console.log(error);-->
<!--          });-->
<!--    },-->
<!--    removeTransaction(coinName, index) {-->
<!--      const transaction = this.transactionsDetails[coinName][index];-->
<!--      const transactionPrice = transaction.transactionPrice;-->
<!--      const coinAmount = transaction.coinAmount;-->

<!--      this.transactionsDetails[coinName].splice(index, 1);// Удаление транзакции из массива-->

<!--      // Обновление сводной информации в основной таблице-->
<!--      this.transactionsSummary[coinName].totalTransactionPrice -= transactionPrice;-->
<!--      this.transactionsSummary[coinName].totalCoinAmount -= coinAmount;-->

<!--      this.updateTotalAssets();// Обновление общих активов-->

<!--      // Проверка, нужно ли удалить валюту из основной таблицы-->
<!--      if (this.transactionsDetails[coinName].length === 0) {-->
<!--        delete this.transactionsDetails[coinName];-->
<!--        delete this.transactionsSummary[coinName];-->
<!--      }-->
<!--    },-->
<!--    removeCoin(coinName) {-->
<!--      // Удаление валюты из основной таблицы и деталей транзакций-->
<!--      delete this.transactionsDetails[coinName];-->
<!--      delete this.transactionsSummary[coinName];-->
<!--      this.updateTotalAssets(); // Обновление общих активов-->
<!--    },-->
<!--    updateTotalAssets() {-->
<!--      let totalAssets = 0;-->
<!--      for (const coinName in this.transactionsSummary) {-->
<!--        const summary = this.transactionsSummary[coinName];-->
<!--        summary.totalAssets = (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2);-->
<!--        totalAssets += parseFloat(summary.totalAssets);-->
<!--      }-->
<!--      this.totalAssets = totalAssets.toFixed(2);-->
<!--    },-->
<!--    calculateTotalAssets(summary) {-->
<!--      return (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2); // Вывод общего актива по названию валюты-->
<!--    },-->
<!--    calculateTransactionAssets(transaction) {-->
<!--      return (transaction.transactionPrice * transaction.coinAmount).toFixed(2); // Вывод общего актива для каждой транзакции-->
<!--    },-->
<!--    calculateTotalAssetsForAllCoins() {-->
<!--      let total = 0;-->
<!--      for (const coinName in this.transactionsSummary) {-->
<!--        const summary = this.transactionsSummary[coinName];-->
<!--        total += summary.totalTransactionPrice * summary.totalCoinAmount;-->
<!--      }-->
<!--      this.totalAssets = total.toFixed(2);-->
<!--    },-->
<!--    closeTransactionModal() {-->
<!--      this.showTransactionModal = false;-->
<!--    },-->
<!--    openTransactionModal() {-->
<!--      this.showTransactionModal = true;-->
<!--      const currentDate = new Date();-->
<!--      const year = currentDate.getFullYear();-->
<!--      const month = String(currentDate.getMonth() + 1).padStart(2, '0');-->
<!--      const day = String(currentDate.getDate()).padStart(2, '0');-->
<!--      const hours = String(currentDate.getHours()).padStart(2, '0');-->
<!--      const minutes = String(currentDate.getMinutes()).padStart(2, '0');-->
<!--      this.transactionDate = `${year}-${month}-${day}T${hours}:${minutes}`;-->
<!--    },-->
<!--    openTransactionCoinModal() {-->
<!--      this.showTransactionCoinModal = true;-->
<!--    },-->
<!--    closeTransactionCoinModal() {-->
<!--      this.showTransactionCoinModal = false;-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$emit('total-assets-updated', this.totalAssets);-->
<!--    this.loadCurrencies();-->
<!--  },-->
<!--  props: {-->
<!--    wallet: {-->
<!--      type: String,-->
<!--      required: true-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->


<!--<template>-->
<!--  <div>-->
<!--    <div class="add-transaction flex">-->
<!--      &lt;!&ndash; Form for adding a transaction &ndash;&gt;-->
<!--      <div><label for="coin-name">Add Transaction</label></div>-->
<!--      <label for="currency">Выберите валюту:</label>-->
<!--      <select id="currency" v-model="CoinName">-->
<!--        <option v-for="currency in currencies" :value="currency.id" :key="currency.id">-->
<!--          {{ currency.name }}-->
<!--        </option>-->
<!--      </select>-->
<!--      <div>-->
<!--        <div><input placeholder="Количество" type="number" min="0" step="0.0001" required v-model="coinAmount"></div>-->
<!--        <div class="flex">-->
<!--          <select v-model="transactionType">-->
<!--            <option value="buy">Покупка</option>-->
<!--            <option value="sell">Продажа</option>-->
<!--          </select>-->
<!--        </div>-->
<!--      </div>-->
<!--      <input placeholder="Цена" type="number" min="0" step="0.01" v-model="transactionPrice">-->
<!--      <div>-->
<!--        <input placeholder="Дата" type="date" v-model="transactionDate">-->
<!--        <input placeholder="Заметка" type="text" v-model="transactionNote">-->
<!--      </div>-->
<!--      <button :disabled="isFormIncomplete" @click="addTransaction">Добавить транзакцию</button>-->
<!--    </div>-->
<!--     Основная таблица-->
<!--    <div class="main" style="margin-left: 400px">-->
<!--      <table>-->
<!--        <tr>-->
<!--          <th>coinName</th>-->
<!--          <th>transactionPrice</th>-->
<!--          <th>coinAmount</th>-->
<!--          <th>Total Assets</th> &lt;!&ndash; Добавленная ячейка &ndash;&gt;-->
<!--        </tr>-->
<!--        <tr v-for="(summary, coinName) in transactionsSummary" :key="coinName">-->
<!--          <td>{{ coinName }}</td>-->
<!--          <td>{{ summary.totalTransactionPrice }}</td>-->
<!--          <td>{{ summary.totalCoinAmount }}</td>-->
<!--          <td>{{ calculateTotalAssets(summary) }}</td> &lt;!&ndash; Вывод общего актива по названию валюты &ndash;&gt;-->
<!--          <td>-->
<!--            <button @click="removeCoin(coinName)">Удалить валюту</button>-->
<!--          </td> &lt;!&ndash; Кнопка удаления валюты &ndash;&gt;-->
<!--        </tr>-->
<!--      </table>-->
<!--    </div>-->
<!--    &lt;!&ndash; Дополнительные таблицы &ndash;&gt;-->
<!--    <div v-for="(transactionList, coinName) in transactionsDetails" :key="coinName" class="dop" style="margin-left: 400px; margin-top: 20px">-->
<!--      <table>-->
<!--        <tr>-->
<!--          <th><div>type</div><div>date</div></th>-->
<!--          <th><div>transactionPrice</div></th>-->
<!--          <th><div>coinAmount</div></th>-->
<!--          <th><div>Total Assets</div></th>-->
<!--          <th><div>Заметка</div></th>-->
<!--        </tr>-->
<!--        <tr v-for="(transaction, index) in transactionList" :key="index">-->
<!--          <td>-->
<!--            <div>{{ transaction.transactionType }}</div>-->
<!--            <div>{{ transaction.transactionDate }}</div>-->
<!--          </td>-->
<!--          <td>{{ transaction.transactionPrice }}</td>-->
<!--          <td>{{ transaction.coinAmount }}</td> &lt;!&ndash; Вывод coinAmount для каждой транзакции &ndash;&gt;-->
<!--          <td>{{ calculateTransactionAssets(transaction) }}</td> &lt;!&ndash; Вывод общего актива для каждой транзакции &ndash;&gt;-->
<!--          <td>{{ transaction.transactionNote }}</td>-->
<!--          <td>-->
<!--            <button @click="removeTransaction(coinName, index)">Удалить транзакцию</button>-->
<!--          </td>-->
<!--        </tr>-->
<!--      </table>-->
<!--    </div>-->
<!--    &lt;!&ndash; Общие активы &ndash;&gt;-->
<!--    <div class="total-assets" style="margin-left: 400px; margin-top: 20px">-->
<!--      Общие активы: {{ totalAssets }}-->
<!--    </div>-->

<!--    <div>-->
<!--      <form @submit.prevent="getCurrentPrice">-->
<!--        <label for="currency">Выберите валюту:</label>-->
<!--        <select id="currency" v-model="CoinName">-->
<!--          <option v-for="currency in currencies" :value="currency.id" :key="currency.id">-->
<!--            {{ currency.name }}-->
<!--          </option>-->
<!--        </select>-->
<!--        <label for="transaction-date">Выберите дату:</label>-->
<!--        <div>-->
<!--          <input placeholder="Дата" type="date" v-model="transactionDate" @change="updatedSelectedCurrencyAndDate()">-->
<!--          <span v-if="currentPrice !== null">Цена на выбранную дату: {{ currentPrice }}</span>-->
<!--        </div>-->
<!--      </form>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios';-->


<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      CoinName: '',-->
<!--      transactionType: 'buy',-->
<!--      transactionPrice: '',-->
<!--      coinAmount: '',-->
<!--      transactionDate: '',-->
<!--      transactionNote: '',-->
<!--      transactionsSummary: {}, // Сводная информация о транзакциях-->
<!--      transactionsDetails: {}, // Детали транзакций-->
<!--      totalAssets: 0, // Добавлено свойство для общих активов-->
<!--      currencies: [],-->
<!--      selectedCurrency: '',-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    isFormIncomplete() {-->
<!--      return (-->
<!--          this.coinName === '' ||-->
<!--          this.transactionPrice === '' ||-->
<!--          this.coinAmount === '' ||-->
<!--          this.transactionDate === ''-->
<!--      );-->
<!--    },-->
<!--    currentPrice() {-->
<!--      if (this.CoinName && this.transactionDate) {-->
<!--        const transaction = this.transactionsDetails[this.CoinName]?.[0];-->
<!--        if (transaction) {-->
<!--          return transaction.transactionPrice;-->
<!--        }-->
<!--      }-->
<!--      return null;-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    // Загрузка списка валют при инициализации компонента-->
<!--    this.loadCurrencies();-->
<!--  },-->
<!--  methods: {-->
<!--    updatedSelectedCurrencyAndDate() {-->
<!--      if (this.CoinName && this.transactionDate) {-->
<!--        this.getCurrentPrice();-->
<!--      }-->
<!--    },-->
<!--    async getCurrentPrice() {-->
<!--      try {-->
<!--        const startDate = new Date(this.transactionDate).getTime();-->
<!--        const endDate = startDate + 24 * 60 * 60 * 1000; // Добавляем 24 часа для установки конечной даты на следующий день-->
<!--        const response = await axios.get(`https://api.coincap.io/v2/assets/${this.CoinName}/history`, {-->
<!--          params: {-->
<!--            interval: 'd1', // ежедневные данные-->
<!--            start: startDate, // числовое значение начальной даты-->
<!--            end: endDate // числовое значение конечной даты-->
<!--          }-->
<!--        });-->

<!--        // Обработка успешного ответа-->
<!--        const data = response.data;-->
<!--        if (data && data.data.length > 0) {-->
<!--          // Получение цены из первой записи-->
<!--        } else {-->
<!--          // Если данных нет или ошибка, сброс значения цены-->
<!--          this.currentPrice = null;-->
<!--        }-->
<!--      } catch (error) {-->
<!--        // Обработка ошибки запроса-->
<!--        console.error(error);-->
<!--        this.currentPrice = null;-->
<!--      }-->
<!--    },-->
<!--    loadCurrencies() {-->
<!--      axios-->
<!--          .get('https://api.coincap.io/v2/assets')-->
<!--          .then(response => {-->
<!--            this.currencies = response.data.data;-->
<!--          })-->
<!--          .catch(error => {-->
<!--            console.log(error);-->
<!--          });-->
<!--    },-->
    // getCoinPrice() {
    //   axios
    //       .get(`https://api.coincap.io/v2/assets/${this.CoinName}`)
    //       .then(response => {
    //         this.currentPrice = response.data.data.priceUsd;
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         this.currentPrice = null;
    //       });
    // },
    // addTransaction() {
    //   if (this.coinName && this.coinAmount && this.transactionType && this.transactionPrice && this.transactionDate) {
    //     const price = this.currentPrice || this.transactionPrice;
    //     const transaction = {
    //       transactionType: this.transactionType,
    //       transactionDate: this.transactionDate,
    //       transactionPrice: price,
    //       coinAmount: this.coinAmount,
    //       transactionNote: this.transactionNote
    //     };
    //     this.transactionsDetails[this.coinName] = [transaction, ...this.transactionsDetails[this.coinName]];
    //     this.coinName = '';
    //     this.coinAmount = '';
    //     this.transactionType = 'buy';
    //     this.transactionPrice = '';
    //     this.transactionDate = '';
    //     this.transactionNote = '';
    //   }
    // },
    // addTransaction() {
    //   // Получение данных из формы
    //   const coinName = this.coinName;
    //   const transactionType = this.transactionType;
    //   let transactionPrice = Number(this.transactionPrice);
    //   let coinAmount = Number(this.coinAmount);
    //
    //   // Проверка типа транзакции
    //   if (transactionType === 'sell') {
    //     // Если тип транзакции - продажа, меняем знак цены на отрицательный
    //     transactionPrice = -transactionPrice;
    //     coinAmount = -coinAmount;
    //   }
    //
    //   // Обновление сводной информации
    //   if (coinName in this.transactionsSummary) {
    //     this.transactionsSummary[coinName].totalTransactionPrice += transactionPrice;
    //     this.transactionsSummary[coinName].totalCoinAmount += coinAmount;
    //   } else {
    //     this.transactionsSummary[coinName] = {
    //       totalTransactionPrice: transactionPrice,
    //       totalCoinAmount: coinAmount
    //     };
    //   }
    //
    //   // Создание новой транзакции
    //   const newTransaction = {
    //     transactionType,
    //     transactionPrice,
    //     coinAmount,
    //     transactionDate: this.transactionDate,
    //     transactionNote: this.transactionNote
    //   };
    //
    //   // Обновление деталей транзакций
    //   if (coinName in this.transactionsDetails) {
    //     this.transactionsDetails[coinName].push(newTransaction);
    //   } else {
    //     this.transactionsDetails[coinName] = [newTransaction];
    //   }
    //   // Пересчет общей стоимости всех активов
    //   this.calculateTotalAssetsForAllCoins();
    //   // Сброс значений формы
    //   this.coinName = '';
    //   this.transactionType = 'buy';
    //   this.transactionPrice = '';
    //   this.coinAmount = '';
    //   this.transactionDate = '';
    //   this.transactionNote = '';
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
    // removeCoin(coinName) {
    //   // Удаление валюты из основной таблицы и деталей транзакций
    //   delete this.transactionsDetails[coinName];
    //   delete this.transactionsSummary[coinName];
    //   this.updateTotalAssets(); // Обновление общих активов
    // },
    // updateTotalAssets() {
    //   let totalAssets = 0;
    //   for (const coinName in this.transactionsSummary) {
    //     const summary = this.transactionsSummary[coinName];
    //     summary.totalAssets = (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2);
    //     totalAssets += parseFloat(summary.totalAssets);
    //   }
    //   this.totalAssets = totalAssets.toFixed(2);
    // },
    // calculateTotalAssets(summary) {
    //   return (summary.totalTransactionPrice * summary.totalCoinAmount).toFixed(2); // Вывод общего актива по названию валюты
    // },
    // calculateTransactionAssets(transaction) {
    //   return (transaction.transactionPrice * transaction.coinAmount).toFixed(2); // Вывод общего актива для каждой транзакции
    // },
    // calculateTotalAssetsForAllCoins() {
    //   let total = 0;
    //   for (const coinName in this.transactionsSummary) {
    //     const summary = this.transactionsSummary[coinName];
    //     total += summary.totalTransactionPrice * summary.totalCoinAmount;
    //   }
    //   this.totalAssets = total.toFixed(2);
    // },
<!--  }-->
<!--};-->
<!--</script>-->

<style scoped>
th{
  border: 1px solid black;
  padding: 30px;
}
</style>