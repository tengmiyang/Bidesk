<template>
  <div id="btn" style="margin-bottom: 1%">
    <span>包件编号：</span>
    <!--<el-button v-for="(item, index) in packList" :key=index @click="handleBtn(index)">{{'第' + (item.packNum) + '包'}}-->
    <!--</el-button>-->
    <el-radio-group @change="handleBtns" v-model="defaultTab" class="radiobtn">
      <!--<el-radio-button label="全部">全部</el-radio-button>-->
      <el-radio-button v-for="(item, index) in packList" :key="index"
                       :label="'第' + (item.packNum) + '包'">
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    props: {
      packList: {
        type: Array,
        default() {
          return []
        }
      },
      handleBtnView: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        defaultTab: '第1包',
      }
    },
    watch: {
      handleBtnView(){
        this.defaultTab = this.handleBtnView
      }
    },
    methods: {
      handleBtns() {
        this.$emit('transferIndex', this.defaultTab)
      },
    }
  }
</script>

<style>
  .radiobtn {
    border-color: #d8dce5;
  }
</style>
