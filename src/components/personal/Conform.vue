<template>
  <div class="nav-con">
    <div class="conform" v-if="!isDel">
      <img @click="del" src="@/assets/images/personal/close1.png" alt />
      <p>此操作将永久删除该文件，需要先输入该账户密码</p>
      <input type="password" placeholder="请输入您的密码"  v-model="password" @blur="blur"/>
      <div class="btn">
        <input class="define" type="button" value="确认" @click="defineDel"/>
        <input type="button" class="cancel" name id @click="del" value="取消" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isDel:true,
      password:'',
    }
  },

  methods:{
    del(){
      this.isDel = !this.isDel;
    },
    blur(){
      var passwordReg = '123456';
      if(passwordReg === this.password){
        alert('删除成功')
        this.del()
      }else{
        alert('删除失败')
        this.del()
      }
    },
    defineDel(){
      
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-con {
  display: flex;
  justify-content: center;
  align-items: center;
  .idDel{
    display: none;
  }
  .conform {
    position: absolute;
    width: 400px;
    height: 200px;
    border-radius: 10px;
    background-color: white;
    z-index: 1000;
    img {
      width: 20px;
      height: 20px;
      margin-left: 95%;
      cursor: pointer;
    }
    input {
      width: 220px;
      height: 30px;
      border: 1px solid gray;
      border-radius: 20px;
      margin-left: 90px;
      outline: none;
      padding-left: 10px;
      margin-bottom: 20px;
    }
    p {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .btn {
      position: relative;
      .define,
      .cancel {
        width: 80px;
        height: 30px;
        padding-right: 10px;
        background-color: cornflowerblue;
        border: none;
        color: #fff;
        opacity: 0.7;
        display: inline-block;
        position: absolute;
        left: 20px;
        cursor: pointer;
      }
      .cancel {
        position: absolute;
        left: 120px !important;
      }
    }
  }
}
</style>