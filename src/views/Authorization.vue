<template>
  <div class="Auth">
    <div class="container">
      <div class="content">
        <div style="display: flex; align-items: center; margin-bottom: 30px">
            <div style="padding: 25px; border-radius: 20px" >
              <svg width="80.000000pt" height="65.000000px" viewBox="0 0 158.000000 97.000000"
                   preserveAspectRatio="xMidYMid meet"  style="border-radius: 10px;">
                <g transform="translate(0.000000,97.000000) scale(0.100000,-0.100000)"
                   fill="#F0C70B" stroke="none" >
                  <path d="M0 485 l0 -485 790 0 790 0 0 485 0 485 -790 0 -790 0 0 -485z m1195
                265 c13 -77 81 -144 157 -156 l38 -7 0 -102 0 -102 -38 -7 c-76 -12 -144 -79
                -157 -156 l-7 -40 -404 0 -404 0 0 25 c0 69 -68 146 -146 167 l-44 12 0 102 0
                101 38 6 c70 12 152 96 152 158 0 14 3 29 7 32 3 4 185 7 404 7 l397 0 7 -40z"/>
                  <path d="M736 673 c-40 -11 -93 -55 -116 -95 -53 -95 -16 -213 82 -262 28 -14
                63 -26 77 -26 76 0 161 53 187 117 49 117 -35 257 -161 268 -28 2 -59 1 -69
                -2z"/></g>
              </svg>
            </div>
          <div class="txt" style="color: #F0C70B">Cripto-Helper</div>
        </div>
        <span class="-ff" style="font-size: 40px;display: flex;justify-content: center; margin-bottom: 20px">Authorization</span>
        <div>
          <span class="h1 -ff">Login</span>
          <input type="email" class="inForm -ff" >
        </div>
        <div>
          <span class="h1 -ff">Password</span>
          <input type="password" class="inForm -ff" >
          <span><a href="" class="-ff" >forgot your password?</a></span>
        </div>
        <div style="display:flex;margin-top:40px;flex-direction: column;align-items: center; margin-top: 40px">
          <button class="btn" @click="$router.push('/Main')">Enter</button>
          <span class="-ff" style="font-size: 25px; margin: 16px">-----OR-----</span>
          <button class="btn" @click="$router.push('/reg')">Registration</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Authorization"
}
</script>

<style scoped>
a{
  font-size: 22px;
}
a:hover{
  color: #feffff;
}
.Auth{
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

.container{
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 700px;
  padding:15px;
  background-color: #324152;
  border-radius: 30px;
  -webkit-box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.3);
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
  font-size: 32px;
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
  transition:all 0.1s ease-in-out;
}

.inForm:hover{
  box-shadow:0 0 0 2.5px rgba(117, 123, 130, 0.28);
  border:2px rgba(23, 23, 23, 0.1) solid;
}

.btn{
  width: 70%;
  font-size: 1.9rem;
  font-weight: 600;
  padding-left: 30px;
  padding-right: 30px;
  color: #feffff;
  background-color: #F0C70B;
  border: 2px solid rgba(0, 0, 0, 0.11);
  border-radius:20px;
  transition:background-color 0.1s ease-in-out;
}

.btn:hover{
  background-color: #fff200;
  text-decoration: none;
  cursor: pointer;
}
</style>