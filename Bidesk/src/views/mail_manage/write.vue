<template>
  <div class="app-container">
    <div class="writecontent">
      <div class="btns">
        <span><el-button type="primary" plain size="small">发送</el-button></span>
        <span><el-button type="primary" plain size="small">存草稿</el-button></span>
        <span><el-button type="primary" plain size="small">清空</el-button></span>
      </div>
      <div class="inputs">
        <div class="inputA">
            <div class="info">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="收件人">
                <el-input v-model="form.name" placeholder="请输入收件人"></el-input>
              </el-form-item>
                <el-form-item label="主题">
                  <el-input v-model="form.region" placeholder="请输入主题"></el-input>
                </el-form-item>
              </el-form>
              <div class="flies">
                附件：<input type="file">
                <span class="shangc"><el-button type="primary" plain size="small">上传</el-button></span>
              </div>
              <div class="describe">
                <div class="editor-container">
                  <TinyMce :height=400 ref="editor"></TinyMce>
                </div>
              </div>
            </div>
        </div>
        <div class="RecentContacts">
          <div class="recent">
            <div class="recenthead">
              <p>最近联系人</p>
            </div>
            <div class="contacts">
              <span>赵强</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TinyMce from '@/custom-components/Tinymce'
  export default {
    components: { TinyMce },
    data() {
      return {
        input: '',
        form: {
          name: '',
          region: ''
        }
      }
    },
    computed: {},
    methods: {
    }
  }
</script>

<style scoped>
  .writecontent{
    width: 100%;
  }
  .writecontent>.btns{
    padding-left: 20px;
  }
  .writecontent>.btns>span{
    padding-left: 50px;
  }
  .writecontent>.inputs{
    width: 100%;
  }
  .writecontent>.inputs>.inputA{
    width: 80%;
    height: 600px;
    float: left;
    padding-top: 20px;
  }
  .writecontent>.inputs>.RecentContacts{
    width: 20%;
    height: 600px;
    float: right;
    padding-top: 20px;
  }
  .writecontent>.inputs>.inputA>.info{
    width: 100%;
  }
  .writecontent>.inputs>.inputA>.info>.flies{
    padding-left: 20px;
  }
  .writecontent>.inputs>.inputA>.info>.flies>input{
    width: 250px;
  }
  .writecontent>.inputs>.inputA>.info>.flies>.shangc{
    padding-left: 0px;
  }
  .writecontent>.inputs>.inputA>.info>.describe{
    padding-left: 20px;
    padding-top: 20px;
  }

  /*最近联系人的样式*/

  .writecontent>.inputs>.RecentContacts>.recent{
    width:70%;
    height: 400px;
    margin:0 auto;
    border:2px solid black;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .writecontent>.inputs>.RecentContacts>.recent>.recenthead{
    text-align: center;
    background-color: #84a9de;
    border:1px solid black;
  }
  .writecontent>.inputs>.RecentContacts>.recent>.contacts{

    text-align: center;
    padding-top: 15px;
  }
</style>


