<template>
  <div class="add-modal flex fl-mid">
    <div class="add-transaction flex">
      <div class="flex" style="justify-content: space-between;padding-bottom: 30px; font-size: 30px">
        <label for="coin-name" >Add Transaction</label>
        <button class="close-btn" @click="closeModal">✕
          <i></i>
        </button>
      </div>
      <label for="coin-name" >Название криптовалюты:</label>
      <input class="inForm" type="text" id="coin-name" name="coin-name" required>
      <label for="coin-amount">Количество:</label>
      <div class="flex">
        <div class="flex" style="flex-direction: column;">
          <input class="inForm" style="width: 80%" type="number" id="coin-amount" name="coin-amount" min="0" step="0.0001" required>
        </div>
        <div  class="flex">
          <select class="buy_sell"  id="transaction-type" name="transaction-type" required>
            <option value="buy">Покупка</option>
            <option value="sell">Продажа</option>
          </select>
        </div>
      </div>
      <label for="transaction-price">Цена:</label>
      <input class="inForm" type="number" id="transaction-price" name="transaction-price" min="0" step="0.01" required>
      <label for="transaction-date">Дата транзакции:</label>
      <div>
        <input class="calendar" type="date" id="transaction-date" name="transaction-date" required>
        <input class="inForm" style="width: 50%" placeholder="Заметка">
      </div>
      <button class="btn" type="submit">Добавить транзакцию</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionModal",

  methods: {
    closeModal() {
      this.$emit('close');
    }
  }

}
</script>

<style scoped>
.add-modal{
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  top: 0px;
  left: 0px;
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
  box-shadow:0 0 0 2.5px rgba(117, 123, 130, 0.28);
  border:2px rgba(23, 23, 23, 0.1) solid;
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
  width: 37%;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 10px;
  font-size: 22px;
  color: #9598a3;
  background-color: rgba(149, 152, 163, 0.09);
  offset: 0;
  transition:all 0.15s ease-in-out;
}
</style>