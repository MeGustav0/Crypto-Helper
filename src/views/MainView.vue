<template>
<!--  добавить градиент сверху-->
  <div class="home">
    <header class="flex">
      <div class="dfg flex">
        <div style="display: flex;align-items: center;">
          <div style="border-radius: 20px; height: 34px; padding: 10px" >
            <img src="/img/icons/Logo.svg"  alt="">
          </div>
          <div class="txt -ff">Crypto-Helper</div>
        </div>
        <div class="flex">
          <button class=" fl-mid prof" @click="openMenuNotification">
            <img src="/img/icons/notification-copy-svgrepo-com.svg" style="width: 32px; height: 40px;" alt="">
          </button>
          <div>
            <button class="prof" @click="openLang">
              <img src="/img/icons/language-svgrepo-com.svg" style="width: 35px;height: 35px;" alt="">
            </button>
            <div class="prof_menu flex" style="min-width: 100px!important;transform: translate3d(-52px, 0px, 0px);" v-show="visibleLang">
<!--              @click="changeLanguage('ru')"-->
              <button @click="changeLanguage('ru')" class="dwn-itm flex" >RU</button>
              <button @click="changeLanguage('en')" class="dwn-itm flex" >EN</button>
            </div>
          </div>
          <div>
            <button class="prof" @click="openProfMenu">
              <img src="/img/icons/img.svg" style="width: 55px;height: 55px; fill: #fff200;" alt="">
            </button>
            <div class="prof_menu flex" v-show="visibleProfMenu">
              <button class="dwn-itm flex" @click="showProfile = true">{{ $t('profile') }}</button>
              <button class="dwn-itm flex" >FAQ</button>
              <button class="dwn-itm flex" style="border: 0" @click="openExitMenu = true">{{ $t('Exit') }}</button>
            </div>
          </div>
        </div>
      </div>

    </header>
<!--интересный метод открытия модели с булевыми внутри @click-->
    <div class="portfolio flex">
      <div class="butt-wall flex fl-mid">
        <div class="balance">
          <div style="font-size: 15px; color: #9598a3">{{ $t('current_balance') }}</div>
          <div style="font-size: 35px; color: #feffff">{{ totalAssets }}</div>
          <div style="font-size: 15px; color: green">+ $2323 (3,34%)</div>
        </div>
        <div class="flex" style="padding-right: 10px;">

        </div>
      </div>
      <div class="num-portfol flex" style="flex-wrap: wrap">
        <div class="test-wallet flex">
          <div class="icon-wallet flex fl-mid">
            <img src="/img/icons/wallet-svgrepo-com.svg" style="width: 27px; height: 27px" alt="">
          </div>
          <div style="padding-left: 5px">
            <div class="name-wallet">
              Test wallet
            </div>
            <div class="min-balance">
              {{ totalAssets }}
            </div>
          </div>
        </div>
        <div v-for="wallet in walletsList" :key="wallet">
          <WalletModal :wallet="wallet" @open-wallet-info="openWalletInfo" />
        </div>
        <div class="add-wallet flex fl-mid" @click="openAddWalletModal">+</div>
      </div>
      <div>
        <WalletMain
            v-if="isWalletInfoOpen"
            :wallet="selectedWalletName" @total-assets-updated="updateTotalAssets"/>
      </div>
      <component :is="activeComponent" :walletName="selectedWalletName"></component>
<!--      <div class="wallet-info flex" style="flex-direction: column">-->
<!--        <div class="flex" style="width: 100%;">-->
<!--          <div class="chart">-->

<!--          </div>-->
<!--          <div class="distribution">-->

<!--          </div>-->
<!--        </div>-->
<!--        <div class="table">-->
<!--          <div class="flex" style="justify-content: space-between">-->
<!--            <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ $t('Assets') }}</p>-->
<!--            <button style="margin: 10px; font-size: 16px" class="btn" @click="openTransactionCoinModal">{{ $t('more_transact') }}</button>-->
<!--          </div>-->
<!--          <table class="table_main">-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th style="padding-left: 10px">-->
<!--                <div>{{ $t('Name') }}</div></th>-->
<!--              <th>-->
<!--                <div >{{ $t('Price') }}</div></th>-->
<!--              <th class="fl-mid">-->
<!--                <div>{{ $t('24_h') }}</div></th>-->
<!--              <th>-->
<!--                <div>{{ $t('Assets') }}</div></th>-->
<!--              <th>-->
<!--                <div >{{ $t('profitLoss') }}</div></th>-->
<!--              <th style="text-align: center;" class="fl-mid td-small">-->
<!--                <div>{{ $t('Delete_coin') }}</div></th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody >-->
<!--              <tr  v-for="(summary, coinName) in transactionsSummary" :key="coinName" class="table-info" >-->
<!--                &lt;!&ndash;        v-for="transaction in transactions" :key="transaction.coinName"&ndash;&gt;-->
<!--                <th style="padding-left: 10px">-->
<!--                  <div>{{ coinName }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div>{{ summary.totalTransactionPrice }}</div>-->
<!--                </th>-->
<!--                <th class="fl-mid">-->
<!--                  <div>+ $3 (2%)</div></th>-->
<!--                <th>-->
<!--                  <div>{{ calculateTotalAssets(summary) }}</div>-->
<!--                  <div style="font-size: 12px; color: #9598a3">{{ summary.totalCoinAmount }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div>profit/loss</div></th>-->
<!--                <th class="fl-mid td-small">-->
<!--                  <div style="text-align: center;" >-->
<!--                    <button class="delete-coin" @click="removeCoin(coinName)">-->
<!--                      <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">-->
<!--                    </button>-->
<!--                  </div>-->
<!--                </th>-->
<!--              </tr>-->
<!--            </tbody>-->
<!--          </table>-->
<!--        </div>-->
<!--        <div class="modal flex fl-mid" v-if="showTransactionModal" >-->
<!--          <div class="add-transaction flex">-->
<!--            &lt;!&ndash; Form for adding a transaction &ndash;&gt;-->
<!--            <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">-->
<!--              <label for="coin-name">{{ $t('AddingTransaction') }}</label>-->
<!--              <button class="close-btn"  @click="closeTransactionModal">✕-->
<!--                <i></i>-->
<!--              </button>-->
<!--            </div>-->
<!--            <label for="coin-name">{{ $t('NameCryptocurrency') }}</label>-->
<!--            <input class="inForm" type="text" v-model="coinName" required>-->
<!--            <label for="coin-amount">{{ $t('Quantity') }}</label>-->
<!--            <div class="flex">-->
<!--              <div class="flex" style="flex-direction: column;">-->
<!--                <input class="inForm" style="width: 80%" type="number" v-model="coinAmount" min="0" step="0.0001" required>-->
<!--              </div>-->
<!--              <div class="flex">-->
<!--                <select class="buy_sell" v-model="transactionType" required>-->
<!--                  <option value="buy">{{ $t('Purchase') }}</option>-->
<!--                  <option value="sell">{{ $t('Sale') }}</option>-->
<!--                </select>-->
<!--              </div>-->
<!--            </div>-->
<!--            <label for="transaction-price">{{ $t('Price') }}</label>-->
<!--            <input class="inForm" type="number" v-model="transactionPrice" min="0" step="0.01" required>-->
<!--            <label for="transaction-date">{{ $t('Transaction_Date') }}</label>-->
<!--            <div>-->
<!--              <input class="calendar" type="datetime-local" v-model="transactionDate"  required>-->
<!--              <input class="inForm" style="width: 45.1%" :placeholder="$t('Note')" v-model="transactionNote">-->
<!--            </div>-->
<!--            <button :disabled="isFormIncomplete" class="btn" @click="addTransaction" >{{ $t('AddingTransaction') }}</button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="transaction-modal flex fl-mid" v-if="showTransactionCoinModal" @click="closeTransactionCoinModal" >-->
<!--          <p style="font-size: 50px; color: #9598a3">Вы еще не добавили не одной транзакции...</p>-->
<!--          <div class="table-coin flex" style="z-index: 2000" >-->
<!--            &lt;!&ndash;    v-for="transaction in transactions" :key="transaction.coinName"&ndash;&gt;-->
<!--            <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">-->
<!--              <p style="font-size: 35px; color: #feffff;  padding:10px; ">{{ $t('more_transact') }}</p>-->
<!--              <button class="close-btn " @click="closeTransactionCoinModal" >✕-->
<!--                <i ></i>-->
<!--              </button>-->
<!--            </div>-->
<!--            <table style="border-collapse: collapse;">-->
<!--              <thead>-->
<!--              <tr style="border-bottom: rgba(254,255,255,0.35) solid 1px;">-->
<!--                <th style="padding-left: 10px">-->
<!--                  <div>{{ $t('Type') }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div>{{ $t('Price') }}</div>-->
<!--                </th>-->
<!--                <th class="fl-mid">-->
<!--                  <div>{{ $t('24_h') }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div >{{ $t('Assets') }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div >{{ $t('Notes') }}</div>-->
<!--                </th>-->
<!--                <th style="text-align: center;" class="fl-mid td-small">-->
<!--                  <div>{{ $t('Delete_coin') }}</div>-->
<!--                </th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody v-for="(transactionList, coinName) in transactionsDetails" :key="coinName">-->
<!--              <tr v-for="(transaction, index) in transactionList" :key="index" class="table-info">-->
<!--                <th style="padding-left: 10px">-->
<!--                  <div>{{ transaction.transactionType }}{{ coinName }}</div>-->
<!--                  <div style="font-size: 14px">{{ transaction.transactionDate }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div>{{ transaction.transactionPrice }}</div>-->
<!--                </th>-->
<!--                <th class="fl-mid">-->
<!--                  <div>+ $3 (2%)</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  &lt;!&ndash;Здесь цена умноженная на количество&ndash;&gt;-->
<!--                  <div>{{ calculateTransactionAssets(transaction) }}</div>-->
<!--                  <div :class="{'positive': transaction.coinAmount > 0, 'negative': transaction.coinAmount < 0}">{{ transaction.coinAmount }}</div>-->
<!--                </th>-->
<!--                <th>-->
<!--                  <div>{{ transaction.transactionNote }}</div>-->
<!--                </th>-->
<!--                <th style="text-align: center;" class="fl-mid td-small">-->
<!--                  <div>-->
<!--                    <button class="delete-coin" @click="removeTransaction(coinName, index)">-->
<!--                      <img src="/img/icons/trash-1-svgrepo-com.svg" style="width: 30px; height: 40px;" alt="">-->
<!--                    </button>-->
<!--                  </div>-->
<!--                </th>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--            </table>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>


    <div class="ex-modal flex fl-mid" v-if="openExitMenu">
      <div class="ex-que flex">
        <div class="-ff" style="padding: 30px; font-size: 26px; text-align: center">{{ $t('you_sure?') }}</div>
        <div class="flex">
          <button class="Ex-btn" style="margin: 15px" @click="exit">{{ $t('Exit') }}</button>
          <button class="Ex-btn" style="margin: 15px" @click="openExitMenu = false">{{ $t('Cancel') }}</button>
        </div>
      </div>
    </div>

    <div class="modal flex fl-mid" v-if="showMenuNotification">
      <div class="notification flex">
        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px; text-align: center">
          <label >{{ $t('MenuNotification') }}</label>
          <button class="close-btn" @click="closeMenuNotification">✕
          </button>
        </div>
        <label>{{ $t('AddNotification') }}</label>
        <div>
          <input class="inForm" type="number" style="margin-right: 10px"  v-model="notificationAmount">
        </div>
        <button class="btn" :disabled="isWalletIncomplete" @click="addNotification">{{ $t('save') }}</button>
        <h3 style="margin-top: 20px">{{ $t('notification_list') }}</h3>
        <ul style="margin-left: 20px">
          <li v-for="notification in notifications" :key="notification.id">
            {{ notification.id }} - {{ notification.amount }} - {{ notification.status }}
          </li>
        </ul>
      </div>
    </div>

    <div class="modal flex fl-mid" v-if="showAddWalletModal">
      <div class="add-transaction flex">
        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
          <label >{{ $t('AddWALLET') }}</label>
          <button class="close-btn"  @click="closeAddWalletModal">✕
          </button>
        </div>
        <label >{{ $t('NameWALLET') }}</label>
        <div class="flex" style="flex-direction: column">
          <input class="inForm" type="text" v-model="NameWallet" required>
          <button :disabled="isAddIncomplete" class="btn" @click="addPortfol" >{{ $t('AddingTransaction') }}</button>
        </div>

      </div>
    </div>


  </div>
</template>

<script>

import router from "@/router";
import WalletModal from "@/components/WalletModal";
import WalletMain from "@/components/WalletMain";
// import axios from 'axios';

export default {
  components: {
    WalletMain,
    WalletModal
  },
  data() {
    return {
      visibleLang: false,
      visibleProfMenu: false,
      openExitMenu: false,
      showProfile: false,
      isWalletInfoOpen: false,
      selectedWalletName: '',
      // showTransactionModal: false,
      // showTransactionCoinModal: false,
      showAddWalletModal: false,
      showWalletModal: false,
      showMenuNotification: false,
      NameWallet: '',
      // coinName: '',
      // transactionType: 'buy',
      // transactionPrice: '',
      // coinAmount: '',
      // transactionDate: '',
      // transactionNote: '',
      // transactionsSummary: {}, // Сводная информация о транзакциях
      // transactionsDetails: {}, // Детали транзакций
      notificationAmount: 0,
      notifications: [],
      notificationId: 1,
      walletsList: [],
      activeComponent: null,
      totalAssets: 0,
      // currentDate: null,
    };
  },
  computed: {
    // isFormIncomplete() {
    //   return (
    //       this.coinName === '' ||
    //       this.transactionPrice === '' ||
    //       this.coinAmount === '' ||
    //       this.transactionDate === ''
    //   );
    // },
    isAddIncomplete() {
      return (
          this.NameWallet === ''
      );
    },
    isWalletIncomplete(){
      return (
          this.notificationAmount === ''
      );
    },
  },
  methods: {
    exit() {
      router.push('/')
      localStorage.clear()
    },
    openWalletInfo(wallet) {
      this.selectedWalletName = wallet;
      this.isWalletInfoOpen = true;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('language', locale); // Сохранение выбранного языка в localStorage
    },
    addNotification() {
      const notification = {
        id: this.notificationId,
        amount: this.notificationAmount,
        status: 'В процессе',
        completionDate: null,
      };
      this.notifications.push(notification);

      if (this.notificationAmount <= this.totalAssets) {
        notification.status = 'Завершено';
        notification.completionDate = new Date().toLocaleDateString();
      }

      this.notificationId++;
      this.notificationAmount = 0;
    },
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
    //
    //   this.showTransactionModal = false;
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
    addPortfol (){
      const name = this.NameWallet.trim();
      if (name === '') {
        return;
      }
      this.walletsList.push(this.NameWallet);
      // Создание нового кошелька с переданным названием

      // Добавление нового кошелька в список или хранилище данных
      // ...
      // Сброс значения названия кошелька
      this.NameWallet = '';
      // Закрыть модальное окно добавления кошелька
      this.closeAddWalletModal();
      this.showWalletModal = true;
    },
    openProfMenu() {
      this.visibleProfMenu = this.visibleProfMenu === false;
      this.visibleLang = false;
    },
    openLang() {
      this.visibleLang = this.visibleLang === false;
      this.visibleProfMenu = false;
    },
    updateTotalAssets(value) {
      this.totalAssets = value;
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
    closeTransactionModal() {
      this.showTransactionModal = false;
    },
    openTransactionCoinModal() {
      this.showTransactionCoinModal = true;
    },
    closeTransactionCoinModal() {
      this.showTransactionCoinModal = false;
    },
    openAddWalletModal(){
      this.showAddWalletModal = true;
    },
    closeAddWalletModal(){
      this.showAddWalletModal = false;
    },
    openMenuNotification(){
      this.showMenuNotification = true;
    },
    closeMenuNotification(){
      this.showMenuNotification = false;
    },
  },
}
</script>

<style>
.home{
  width: 100%;
  height: 100%;
  background: #324152;
}
.dfg{
  width: 150vh;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
}
header{
  width: 100%;
  height: 60px;
  background: #1e2c39;
  position: absolute;
}
/*.positive {*/
/*  color: green;*/
/*}*/

/*.negative {*/
/*  color: red;*/
/*}*/
/*.table_main{*/
/*  width: 100%;*/
/*  border-top: rgba(254,255,255,0.35) solid 1px;*/
/*  padding: 10px;*/
/*  border-collapse: collapse;*/
/*  text-align: left;*/
/*}*/
tr{
  height: 50px;
  border-bottom: rgba(254,255,255,0.35) solid 1px;
}
.flex{
  display: flex;
}
.fl-mid{
  align-items: center;
  justify-content: center;
}
.txt{
  height: initial;
  text-align: center;
  font-size: 2em;
  font-weight: 600;
}
.-ff{
  color: #9598a3;
}
.portfolio{
  flex-direction: column;
  max-width: 150vh;
  height: 100vh;
  padding-top: 100px;
  margin-left: auto;
  margin-right: auto;
  font-family: unset;
  z-index: 0;
}
.balance{
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
}
.num-portfol{
  width: 100%;
  min-height: 60px;
  padding-left: 10px;
  margin-bottom: 20px;
}
.test-wallet{
  width: 180px;
  height: 60px;
  background-color: #1e2c39;
  margin-right: 15px;
  margin-top: 20px;
  border-radius: 20px;
  align-items: center;
  color: rgba(250, 250, 250, 0.94);
  cursor: pointer;
}
.test-wallet:hover{
  background-color: rgba(30, 44, 57, 0.73);
}
.icon-wallet{
  width: 45px;
  margin-left: 8px;
  height: 45px;
  border-radius: 100%;
  background: rgba(45, 45, 123, 0.49);
}
.add-wallet{
  width: 60px;
  height: 60px;
  background-color: #1e2c39;
  border-radius: 20px;
  margin-top: 20px;
  color: #F0C70B;
  font-size: 50px;
  font-weight: 700;
  cursor: pointer;
}
.add-wallet:hover{
  background-color: rgba(30, 44, 57, 0.73);
}
.modal{
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
.notification{
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
/*.buy_sell{*/
/*  height: 46px;*/
/*  width: 15vh;*/
/*  margin-top: 10px;*/
/*  font-size: 2vh;*/
/*  font-weight: 600;*/
/*  padding: 5px 10px 5px 10px;*/
/*  color: #feffff;*/
/*  background-color: #F0C70B;*/
/*  border: 0;*/
/*  border-radius:15px;*/
/*  transition: background-color .15s ease-in-out;*/
/*}*/
/*.buy_sell:hover{*/
/*  background-color: #faed02;*/
/*  text-decoration: none;*/
/*  cursor: pointer;*/
/*}*/
/*.close-btn{*/
/*  width: 30px;*/
/*  height: 30px;*/
/*  font-size: 30px;*/
/*  font-weight: 800;*/
/*  background: none;*/
/*  border: none;*/
/*  padding-bottom: 10px;*/
/*  color: #324152;*/
/*  align-items: center;*/
/*  transition:all 0.15s ease-in-out;*/
/*}*/
/*.close-btn:hover{*/
/*  color: #9598a3;*/
/*  cursor: pointer;*/
/*}*/
/*.calendar{*/
/*  border: 2px solid rgba(0, 0, 0, 0.1);*/
/*  border-radius: 10px;*/
/*  padding: 8px;*/
/*  width: 43%;*/
/*  margin-top: 10px;*/
/*  margin-bottom: 30px;*/
/*  margin-right: 10px;*/
/*  font-size: 18px;*/
/*  color: #9598a3;*/
/*  background-color: rgba(149, 152, 163, 0.09);*/
/*  offset: 0;*/
/*  transition:all 0.15s ease-in-out;*/
/*}*/
/*.table-info{*/
/*  background: #1e2c39;*/
/*  z-index: 50;*/
/*  height: 65px!important;*/
/*}*/
/*.table-info:hover{*/
/*  background: rgba(149, 152, 163, 0.2);*/
/*}*/
/*.td-small{*/
/*  width: 140px;*/
/*}*/
/*.transaction-modal{*/
/*  position: fixed;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  -webkit-box-pack: center;*/
/*  -webkit-box-align: center;*/
/*  top: 0;*/
/*  left: 0;*/
/*  background: rgba(10, 30, 66, 0.4);*/
/*  z-index: 1002;*/
/*}*/
/*.table-coin{*/
/*  width: 1380px;*/
/*  min-width: 350px;*/
/*  flex-direction: column;*/
/*  margin: auto;*/
/*  position: absolute;*/
/*  color: #feffff;*/
/*  font-size: 22px;*/
/*  padding: 10px;*/
/*  background: #1e2c39;*/
/*  border-radius: 20px;*/
/*  border: 2px solid rgba(0, 0, 0, 0.14);*/
/*  z-index: 6;*/
/*  border-collapse: collapse;*/
/*  text-align: left;*/
/*}*/
/*.wallet-info{*/
/*  height: inherit;*/
/*}*/
.butt-wall{
  width: 100%;
  height: 60px;
  justify-content: space-between;
}
/*.delete-coin{*/
/*  width: 40px;*/
/*  height: 40px;*/
/*  border-radius: 100%;*/
/*  border: 0;*/
/*  background: inherit;*/
/*  transition: background-color .15s ease-in-out;*/
/*  z-index: 900;*/
/*}*/
/*.delete-coin:hover{*/
/*  background-color: rgba(255, 255, 255, 0.27);*/
/*  text-decoration: none;*/
/*  cursor: pointer;*/
/*}*/
.btn{
  font-size: 2.0vh;
  font-weight: 600;
  padding: 10px 10px 10px 10px;
  color: #feffff;
  background-color: #F0C70B;
  border: 0;
  border-radius:18px;
  transition: background-color .15s ease-in-out;
}
.btn:hover{
  background-color: #fff200;
  text-decoration: none;
  cursor: pointer;
}

/*.chart{*/
/*  width: 60%;*/
/*  height: 400px;*/
/*  margin-right: 20px;*/
/*  background: #1e2c39;*/
/*  border-radius: 5px;*/
/*}*/
/*.distribution{*/
/*  width: 40%;*/
/*  height: 400px;*/
/*  background: #1e2c39;*/
/*  border-radius: 5px;*/
/*}*/
/*.table{*/
/*  width: 100%;*/
/*  background: #1e2c39;*/
/*  border-radius: 5px;*/
/*  margin-top: 20px;*/
/*  color: #feffff;*/
/*}*/
/*.td-small{*/
/*  width: 140px;*/
/*}*/
.prof{
  height: 60px;
  width: 60px;
  background: inherit;
  border: 0;
  cursor: pointer;
}
.prof:hover{
  background: #324152;
}
.prof_menu {
  flex-direction: column;
  position: absolute;
  min-width: 200px;
  transform: translate3d(-154px, 0px, 0px);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border:2px rgba(0, 0, 0, 0.24) solid;
  padding: 5px;
  background-color: #243343;
  z-index: 4;
}
.dwn-itm {
  background-color: inherit;
  transition: background-color .10s cubic-bezier(.66,.39,.21,.67);
  flex-direction: column;
  align-items: center;
  color: #9598a3;
  font-size: 28px;
  padding: 5px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.14);
  border-top: 0;
  border-right: 0;
  border-left: 0;
  font-weight: 400;
  cursor: pointer;
}
.dwn-itm:hover {
  background-color: rgb(128, 128, 128, 0.12);
}
.ex-modal{
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  top: 0;
  left: 0;
  background: rgba(10, 30, 66, 0.4);
  z-index: 1102;
}
.ex-que{
  max-width: 400px;
  height: 230px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  background: #1e2c39;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.14);
  z-index: 6;
}
.Ex-btn{
  width: 15vh;
  font-size: 3.5vh;
  font-weight: 600;
  color: #feffff;
  background-color: #F0C70B;
  border: 2px solid rgba(0, 0, 0, 0.11);
  border-radius:20px;
  transition: background-color .15s ease-in-out;
}
.Ex-btn:hover{
  background-color: #fff200;
  text-decoration: none;
  cursor: pointer;
}
</style>