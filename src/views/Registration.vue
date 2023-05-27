<template>
  <div class="reg flex" style="flex-direction: column;">
    <div class="container">
      <div class="content">
        <div style="display: flex; align-items: center; margin-bottom: 30px">
          <div style="padding: 25px; border-radius: 20px" >
            <svg width="80.000000pt" height="65.000000px" viewBox="0 0 158.000000 97.000000"
                 preserveAspectRatio="xMidYMid meet"  style="border-radius: 10px;">
              <g transform="translate(0.000000,97.000000) scale(0.100000,-0.100000)"
                 fill="#ef8307" stroke="none" >
                <path d="M0 485 l0 -485 790 0 790 0 0 485 0 485 -790 0 -790 0 0 -485z m1195
                265 c13 -77 81 -144 157 -156 l38 -7 0 -102 0 -102 -38 -7 c-76 -12 -144 -79
                -157 -156 l-7 -40 -404 0 -404 0 0 25 c0 69 -68 146 -146 167 l-44 12 0 102 0
                101 38 6 c70 12 152 96 152 158 0 14 3 29 7 32 3 4 185 7 404 7 l397 0 7 -40z"/>
                <path d="M736 673 c-40 -11 -93 -55 -116 -95 -53 -95 -16 -213 82 -262 28 -14
                63 -26 77 -26 76 0 161 53 187 117 49 117 -35 257 -161 268 -28 2 -59 1 -69
                -2z"/></g>
            </svg>
          </div>
          <div class="txt " style="color: #ef8307">Crypto-Helper</div>
        </div>
        <span class="-ff" style="font-size: 40px;display: flex;justify-content: center; margin-bottom: 20px">{{ $t('Registration') }}</span>
        <div>
          <span class="h1 -ff">{{ $t('UserName') }}</span>
          <input type="text" id="username" v-model="username" class="inForm -ff" >
        </div>
        <div>
          <span class="h1 -ff">{{ $t('Login') }}</span>
          <input type="email" id="email" v-model="email" class="inForm -ff" >
        </div>
        <div>
          <span class="h1 -ff">{{ $t('Password') }}</span>
          <input type="password" id="password" v-model="password" class="inForm -ff" >
          <!-- <p>{{ message }}</p> -->
        </div>
        <div style="display:flex;margin-top:40px;flex-direction: column;align-items: center;">
          <button class="btn" @click="$router.push('/')">{{ $t('Confirm') }}</button>
        </div>
      </div>
    </div>
    <div class="flex" >
      <button @click="changeLanguage('ru')" class="dwn-itm flex" >RU</button>
      <button @click="changeLanguage('en')" class="dwn-itm flex" >EN</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "reg",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('language', locale); // Сохранение выбранного языка в localStorage
    },
    async registerUser() {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.message = data.message;
          this.username = '';
          this.email = '';
          this.password = '';
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
        this.message = 'Произошла ошибка при регистрации пользователя';
      }
    },
  },
}
</script>

<style scoped>
.reg{
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: #1e2c39;
  font-family: "Montserrat",Sans-serif,serif;
}
@media (max-width: 530px){
  .txt{
    font-size: 8.5vw!important;
  }
}
.container{
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 700px;
  padding:15px;
  background-color: #324152;
  border-radius: 30px;
  -webkit-box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.3);
}
.content{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.txt{
  height: initial;
  text-align: center;
  font-size: 3em;
  font-weight: 600;
}
.-ff{
  color: #9598a3;
}
.h1{
  margin-top: 20px;
  font-size: 28px;
}

.inForm {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 22px;
  width: 95.8%;
  background-color: rgba(30, 44, 57, 0.59);
  offset: 0;
  transition:all 0.15s ease-in-out;
}

.inForm:hover{
  box-shadow:0 0 0 2.5px rgba(117, 123, 130, 0.28);
  border:2px rgba(23, 23, 23, 0.1) solid;
}

.btn{
  width: 70%;
  font-size: 2.5rem;
  font-weight: 600;
  padding-left: 30px;
  padding-right: 30px;
  color: #feffff;
  background-color: #c0862f;
  border: 2px solid rgba(0, 0, 0, 0.11);
  border-radius:20px;
  transition:background-color 0.15s ease-in-out;
}

.btn:hover{
  background-color: #ef8307;
  text-decoration: none;
  cursor: pointer;
}
</style>