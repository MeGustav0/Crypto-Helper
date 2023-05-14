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
        <div>
          <button class="prof" @click="openProfMenu">
            <img src="/img/icons/img.svg" style="width: 55px;height: 55px; fill: #fff200;" alt="">
          </button>
          <div class="prof_menu flex" v-show="visibleProfMenu">
            <button class="dwn-itm flex" @click="showProfile = true">Profile</button>
            <button class="dwn-itm flex" >FAQ</button>
            <button class="dwn-itm flex" style="border: 0" @click="openExitMenu = true">Exit</button>
          </div>
        </div>
      </div>

    </header>
<!--интересный метод открытия модели с булевыми внутри @click-->
    <div class="portfolio flex">
      <div class="butt-wall flex fl-mid">
        <div class="balance" style="font-size: 20px; font-weight: 600;">
          <div style="font-size: 15px; color: #9598a3">current balance</div>
          <div style="font-size: 35px; color: #feffff">$43653463</div>
          <div style="font-size: 15px; color: green">+ $2323 (3,34%)</div>
        </div>
        <div>
          <button class="btn" style="margin-right: 15px">
            change
          </button>
          <button class="btn" @click="openTransactionModal">
            add transaction
          </button>
        </div>
      </div>
      <div class="num-portfol flex">
        <div class="test-wallet flex">
          <div class="icon-wallet flex fl-mid">
            <img src="/img/icons/wallet-svgrepo-com.svg" style="width: 27px; height: 27px" alt="">
          </div>
          <div style="padding-left: 5px">
            <div class="name-wallet">
              Test wallet
            </div>
            <div class="min-balance">
              $342342
            </div>
          </div>
        </div>
        <div class="add-wallet flex fl-mid">+</div>
      </div>
      <div class="wallet-info flex" style="flex-direction: column">
        <div class="flex" style="width: 100%; ">
          <div class="distribution">

          </div>
          <div class="chart">
          </div>
        </div>
        <div class="table">
          <p style="font-size: 35px; color: #feffff;  padding:10px; ">Assets</p>
          <table class="table_main">
            <thead>
            <tr>
              <th style="padding-left: 10px">
                <div>Name</div></th>
              <th>
                <div >Price</div></th>
              <th class="fl-mid">
                <div>24 h.</div></th>
              <th>
                <div >Assets</div></th>
              <th>
                <div >profit/loss</div></th>
              <th style="text-align: center;" class="fl-mid td-small">
                <div>Delete coin</div></th>
            </tr>
            </thead>
            <tbody>
            <tr class="table-info" @click="openTransactionCoinModal">
              <th style="padding-left: 10px">
                <div id="Name">Bitcoin</div></th>
              <th>
                <div>$3234</div></th>
              <th class="fl-mid">
                <div>+ $3 (2%)</div></th>
              <th>
                <div id="assets">$43653463</div></th>
              <th>
                <div>profit/loss</div></th>
              <th style="text-align: center;" class="fl-mid td-small">
                <div>
                  <button class="delete-coin">
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

    <div class="ex-modal flex fl-mid" v-if="openExitMenu">
      <div class="ex-que flex">
        <div class="-ff" style="padding: 30px; font-size: 26px; text-align: center">Are you sure you want to leave the page?</div>
        <div class="flex">
          <button class="Ex-btn" style="margin: 15px" @click="exit">Exit</button>
          <button class="Ex-btn" style="margin: 15px" @click="openExitMenu = false">Cancel</button>
        </div>
      </div>
    </div>
    <div v-if="showProfile">
      <ProfUser />
    </div>
  </div>
  <TransactionModal v-if="showTransactionModal" @close="closeTransactionModal" />
  <TransactionCoinModal v-if="showTransactionCoinModal" @close="closeTransactionCoinModal" />

</template>

<script>
import router from "@/router";
import TransactionModal from "@/components/TransactionModal";
import TransactionCoinModal from "@/components/TransactionCoinModal";
// import axios from 'axios';

export default {
  components: {
    TransactionModal,
    TransactionCoinModal,
  },
  data() {
    return {
      visibleProfMenu: false,
      openExitMenu: false,
      showProfile: false,
      showTransactionModal: false,
      showTransactionCoinModal: false,
    }
  },
  methods: {
    exit() {
      router.push('/')
      localStorage.clear()
    },
    openProfMenu() {
      this.visibleProfMenu = this.visibleProfMenu === false;
    },
    openTransactionModal() {
      this.showTransactionModal = true;
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
  },
}
</script>

<style>
.chart {
  width: 400px;
  height: 400px;
  margin: 20px auto;
}
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
.table_main{
  width: 100%;
  border-top: rgba(254,255,255,0.35) solid 1px;
  padding: 10px;
  border-collapse: collapse;
  text-align: left;
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
.num-portfol{
  width: 100%;
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.test-wallet{
  width: 180px;
  height: 60px;
  background-color: #1e2c39;
  margin-right: 15px;
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
  color: #F0C70B;
  font-size: 50px;
  font-weight: 700;
  cursor: pointer;
}
.add-wallet:hover{
  background-color: rgba(30, 44, 57, 0.73);
}
.wallet-info{
  height: inherit;
}
.butt-wall{
  width: 100%;
  height: 60px;
  justify-content: space-between;
}
.btn{
  font-size: 2.5vh;
  font-weight: 600;
  padding: 5px 10px 5px 10px;
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
.chart{
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
  z-index: 100;
}
.delete-coin:hover{
  background-color: rgba(255, 255, 255, 0.27);
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