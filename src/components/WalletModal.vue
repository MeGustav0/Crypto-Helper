<template>
  <div class="test-wallet flex" @click="openWalletInfo(wallet)" :class="{ 'selected': isSelected }">
    <div class="icon-wallet flex fl-mid">
      <img src="/img/icons/wallet-svgrepo-com.svg" style="width: 27px; height: 27px" alt="">
    </div>
    <div style="padding-left: 5px">
      <div class="name-wallet">
        {{ wallet }}
      </div>
      <div class="min-balance">
        ${{ totalAssets }}
      </div>
    </div>
  </div>
</template>

<script>
import {useUserStore} from '../store/index'
import { computed } from 'vue';
export default {
  name: "WalletModal",
  props: {
    wallet: {
      type: String,
      required: true
    },
    // totalAssets: {
    //   type: Number,
    //   required: true
    // },
    isSelected: {
      type: Boolean,
      required: true
    },
  },
  setup() {
      const userStore = useUserStore();
    const totalAssets = computed(() => userStore.totalAssets);
      return {
        userStore,
        totalAssets
      }
  },
  methods:{
    openWalletInfo(wallet) {
      this.userStore.wallet = wallet;
      this.userStore.filterTransactions();
      this.$emit('open-wallet-info', wallet);
    },
    closeModal() {
      this.$emit('close');
    },
    closeAddWalletModal(){
      this.showAddWalletModal = false;
    },
  }
}
</script>

<style >
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
.selected {
  background-color: rgba(250, 250, 250, 0.17) !important;
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
</style>