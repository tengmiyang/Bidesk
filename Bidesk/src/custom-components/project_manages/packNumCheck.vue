<template>
  <el-row style="margin: 1% 0">
    <el-col :span="8">同时作为以下包件的操作：</el-col>
    <el-col :span="16">
      <el-checkbox-group v-model="check_list">
        <el-checkbox
          v-for="(item, index) in check_list" :label="'第' + (item.packNum)+'包'" :key="index"
          @change="handleCheck(index, $event)"
          v-if="item.show"
          style="padding-right: 1%;">
        </el-checkbox>
      </el-checkbox-group>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: ['packList', 'current_tab'],
    mounted() {
      const array = [...this.packList]
      this.file_index = this.current_tab
      array.forEach((item, index) => {
        if (item.purchaseDoc === null) {
          item.show = true
        }
      })
      this.check_list = array
    },
    data() {
      return {
        purchaseDoc: this.packList[this.current_tab].purchaseDoc,
        file_index: null,
        packIdList: [this.packList[this.current_tab].packId],
        text: '同时作为以下包件的操作',
        check_list: []
      }
    },
    watch: {
      file_index(val) {
        // console.log(this.current_tab)
        this.tabChange(val)
      }
    },
    methods: {
      tabChange(current_tab) {
        this.check_list.forEach((item, index) => {
          if (index === current_tab) {
            item.show = false
          }
        })
      },
      handleCheck(index, eve) {
        if (eve) {
          this.packIdList.push(this.packList[index].packId)
        } else {
          this.packIdList.pop()
        }
        this.packIdList = [...new Set(this.packIdList)] // 数组去重
        this.$emit('transferIdList', this.packIdList)
      },
    }
  }
</script>

<style>
</style>
