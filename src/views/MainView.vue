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
        <div v-for="wallet in walletsList" :key="wallet">
          <WalletModal :isSelected="wallet === selectedWallet" @click="toggleSelected(wallet)" :wallet="wallet" @open-wallet-info="openWalletInfo" />
        </div>
        <div class="add-wallet flex fl-mid" @click="openAddWalletModal">+</div>
      </div>
      <div>
        <WalletMain
            v-if="isWalletInfoOpen"
            :wallet="selectedWalletName" @total-assets-updated="updateTotalAssets"/>
      </div>
      <component :is="activeComponent" :walletName="selectedWalletName"></component>
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

<!--    меню уведомлений-->
    <div class="modal flex fl-mid" v-if="showMenuNotification">
      <div style="padding: 30px" class="flex fl-mid">
        <div class="flex notification">
          <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px; text-align: center">
            <label >{{ $t('MenuNotification') }}</label>
            <button class="close-btn" style="margin-left: 15px" @click="closeMenuNotification">✕
            </button>
          </div>
          <label>{{ $t('AddNotification') }}</label>
          <div>
            <input class="inForm" type="number" style="width: 320px"  v-model="notificationAmount">
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
    </div>

<!--    Создание нового кошелька-->
    <div class="modal flex fl-mid" v-if="showAddWalletModal">
      <div class="add-transaction flex">
        <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
          <label >{{ $t('AddWALLET') }}</label>
          <button class="close-btn" style="margin-left: 15px" @click="closeAddWalletModal">✕
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
      showAddWalletModal: false,
      showWalletModal: false,
      showMenuNotification: false,
      NameWallet: '',
      notificationAmount: 0,
      notifications: [],
      notificationId: 1,
      activeComponent: null,
      totalAssets: 0,
      walletsList: [], // Ваш список кошельков
      selectedWallet: null // Выбранный кошелек
    };
  },
  computed: {
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
    addPortfol (){
      const name = this.NameWallet.trim();
      if (name === '') {
        return;
      }
      // Проверка на уникальность имени кошелька
      if (this.walletsList.includes(name)) {
        // Имя кошелька уже существует
        // Обработка ошибки или отображение сообщения пользователю
        return;
      }
      this.walletsList.push(this.NameWallet);
      // Создание нового кошелька с переданным названием

      // Добавление нового кошелька в список или хранилище данных
      // ...
      this.NameWallet = '';
      this.closeAddWalletModal();
      this.showWalletModal = true;
    },
    toggleSelected(wallet) {
      if (this.selectedWallet === wallet) {
        this.selectedWallet = null; // Отменить выбор, если кошелек уже выбран
      } else {
        this.selectedWallet = wallet; // Установить выбранный кошелек
      }
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
.butt-wall{
  width: 100%;
  height: 60px;
  justify-content: space-between;
}
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
  font-size: 3vh;
  font-weight: 600;
  padding: 10px;
  color: #edecec;
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