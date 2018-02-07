<template>
  <div v-if="check_list.length > 1" style="margin: 1% 0">
    <span class="check_label">同时作为以下包件的采购文件:</span>
    <el-checkbox-group v-model="check_list1">
      <el-checkbox
        v-for="(item, index) in check_list" :label="'第' + (item.packNum)+'包'" :key="index"
        @change="handleCheck(index, $event, item)"
        v-if="item.show"
        style="padding-right: 1%;">
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props: ['packList', 'current_tab', 'packIdList'],
    mounted() {
      this.file_index = this.current_tab
      const array = [...this.packList]
      array.forEach((item, index) => {
        item.show = true
      })
      this.check_list = array
    },
    data() {
      return {
        file_index: null,
        purchaseDoc: this.packList[this.current_tab].purchaseDoc,
        pack_id_list: [this.packList[this.current_tab].packId],
        text: '同时作为以下包件的操作',
        check_list: [],
        check_list1: [],
        packNumList: [this.packList[this.current_tab].packNum]
      }
    },
    watch: {
      packNameList() {
        this.packNumList = this.packNameList
      },
      packIdList() {
        this.pack_id_list = this.packIdList
      },
      file_index(val) {
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
      handleCheck(index, eve, item) {
        if (eve) {
          this.pack_id_list.push(item.packId)
          this.packNumList.push(item.packNum)
        } else {
          this.pack_id_list.pop()
          this.packNumList.pop()
        }
        this.pack_id_list = [...new Set(this.pack_id_list)] // 数组去重
        this.packNumList = [...new Set(this.packNumList)] // 数组去重
        this.$emit('transferIdList', this.pack_id_list)
        this.$emit('transferNum', this.packNumList)
      },
    }
  }
</script>

<style scope>
  .check_label {
    font-weight: 700;
    font-size: 14px;
    color: #5a5e66;
    float: left;
    padding-right: 1%;
  }
</style>
