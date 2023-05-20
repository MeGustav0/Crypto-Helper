<template>
  <div class="test-wallet flex" @click="openWalletInfo(wallet)">
    <div class="icon-wallet flex fl-mid">
      <img src="/img/icons/wallet-svgrepo-com.svg" style="width: 27px; height: 27px" alt="">
    </div>
    <div style="padding-left: 5px">
      <div class="name-wallet">
        {{ wallet }}
      </div>
      <div class="min-balance">
        {{ totalAssets }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletModal",
  data(){
    return{
      NameWallet: '',
    }
  },
  props: {
    wallet: {
      type: String,
      required: true
    },
    totalAssets: {
      type: Number,
      required: true
    },
  },
  methods:{
    addPortfol(){

    },
    openWalletInfo(wallet) {
      // Вызов соответствующего метода или передача данных в родительский компонент
      this.$emit('open-wallet-info', wallet);
    },
    closeAddWalletModal(){
      this.showAddWalletModal = false;
    },
    closeModal() {
      this.$emit('close');
    },
  }
}
</script>

<style scoped>

</style>