<template>
  <div>
    <div class="add-transaction flex">
      <!-- Form for adding a transaction -->
      <div><label for="coin-name">Add Transaction</label></div>
      <input placeholder="Название" type="text" v-model="coinName">
      <div>
        <div><input placeholder="Количество" type="number" min="0" step="0.0001" required v-model="coinAmount"></div>
        <div class="flex">
          <select v-model="transactionType">
            <option value="buy">Покупка</option>
            <option value="sell">Продажа</option>
          </select>
        </div>
      </div>
      <input placeholder="Цена" type="number" min="0" step="0.01" v-model="transactionPrice">
      <div>
        <input placeholder="Дата" type="date" v-model="transactionDate">
        <input placeholder="Заметка" type="text" v-model="transactionNote">
      </div>
      <button :disabled="isFormIncomplete" @click="addTransaction">Добавить транзакцию</button>
    </div>
    <!-- Основная таблица -->
    <div class="main" style="margin-left: 400px">
      <table>
        <tr>
          <th>coinName</th>
          <th>transactionPrice</th>
          <th>coinAmount</th>
          <th>Total Assets</th> <!-- Добавленная ячейка -->
        </tr>
        <tr v-for="(summary, coinName) in transactionsSummary" :key="coinName">
          <td>{{ coinName }}</td>
          <td>{{ summary.totalTransactionPrice }}</td>
          <td>{{ summary.totalCoinAmount }}</td>
          <td>{{ calculateTotalAssets(summary) }}</td> <!-- Вывод общего актива по названию валюты -->
          <td>
            <button @click="removeCoin(coinName)">Удалить валюту</button>
          </td> <!-- Кнопка удаления валюты -->
        </tr>
      </table>
    </div>
    <!-- Дополнительные таблицы -->
    <div v-for="(transactionList, coinName) in transactionsDetails" :key="coinName" class="dop" style="margin-left: 400px; margin-top: 20px">
      <table>
        <tr>
          <th><div>type</div><div>date</div></th>
          <th><div>transactionPrice</div></th>
          <th><div>coinAmount</div></th>
          <th><div>Total Assets</div></th>
          <th><div>Заметка</div></th>
        </tr>
        <tr v-for="(transaction, index) in transactionList" :key="index">
          <td>
            <div>{{ transaction.transactionType }}</div>
            <div>{{ transaction.transactionDate }}</div>
          </td>
          <td>{{ transaction.transactionPrice }}</td>
          <td>{{ transaction.coinAmount }}</td> <!-- Вывод coinAmount для каждой транзакции -->
          <td>{{ calculateTransactionAssets(transaction) }}</td> <!-- Вывод общего актива для каждой транзакции -->
          <td>{{ transaction.transactionNote }}</td>
          <td>
            <button @click="removeTransaction(coinName, index)">Удалить транзакцию</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- Общие активы -->
    <div class="total-assets" style="margin-left: 400px; margin-top: 20px">
      Общие активы: {{ totalAssets }}
    </div>

    <div>
      <form @submit="getCurrencyPrice">
        <label for="currency">Выберите валюту:</label>
        <select id="currency" v-model="selectedCurrency">
          <option v-for="currency in currencies" :value="currency.id" :key="currency.id">
            {{ currency.name }}
          </option>
        </select>
        <button type="submit">Получить цену</button>
      </form>
      <div v-if="currentPrice">
        <h2>Текущая цена для {{ selectedCurrency }}:</h2>
        <p>{{ currentPrice }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      coinName: '',
      transactionType: 'buy',
      transactionPrice: '',
      coinAmount: '',
      transactionDate: '',
      transactionNote: '',
      transactionsSummary: {}, // Сводная информация о транзакциях
      transactionsDetails: {}, // Детали транзакций
      totalAssets: 0, // Добавлено свойство для общих активов
      currencies: [],
      selectedCurrency: '',
      currentPrice: null,
    };
  },
  mounted() {
    // Выполняем запрос к API CoinMarketCap для получения списка валют
    fetch('https://api.coinmarketcap.com/v1/ticker/')
        .then(response => response.json())
        .then(data => {
          this.currencies = data;
        });
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
  methods: {
    getCurrencyPrice(event) {
      event.preventDefault();
      // Выполняем запрос к API CoinMarketCap для получения текущей цены выбранной валюты
      fetch(`https://api.coinmarketcap.com/v1/ticker/${this.selectedCurrency}`)
          .then(response => response.json())
          .then(data => {
            this.currentPrice = data[0].price_usd; // Здесь предполагается, что вы хотите получить цену в USD
          });
    },
    addTransaction() {
      // Получение данных из формы
      const coinName = this.coinName;
      const transactionType = this.transactionType;
      let transactionPrice = Number(this.transactionPrice);
      let coinAmount = Number(this.coinAmount);

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
        transactionNote: this.transactionNote
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
  }
};
</script>

<style scoped>
th{
  border: 1px solid black;
  padding: 30px;
}
</style>