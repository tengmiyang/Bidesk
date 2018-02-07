<template>
  <div>
    <el-checkbox-group v-model="check_list1">
      <el-checkbox
        v-for="(item, index) in resPackList" :label="'第' + (item.packNum)+'包'" :key="index"
        @change="handleCheck(index, $event, item)"
        style="padding-right: 1%;">
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    props: {
      resPackList: {
        type: Array,
        default() {
          return []
        }
      },
      check_list: {
        type: Array,
        default() {
          return []
        }
      },
      pack_id_list: {
        type: Array,
        default() {
          return []
        }
      },
      packNameList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    watch: {
      // 父组件传的数组需要用新值监听，不然会报错
      check_list() {
        this.check_list1 = this.check_list
      },
      pack_id_list() {
        this.packIdList = this.pack_id_list
      },
      packNameList() {
        this.packNumList = this.packNameList
      },
    },
    data() {
      return {
        file_index: null,
        packIdList: [],
        packNumList: [],
        check_list1: [],
      }
    },
    methods: {
      handleCheck(index, eve, item) {
        if (eve) {
          this.packIdList.push(this.resPackList[index].packId)
          this.packNumList.push(this.resPackList[index].packNum)
//          console.log(this.packNumList)
        } else {
          this.packIdList.pop()
          this.packNumList.pop()
//          console.log(this.packNumList)
        }
        this.packIdList = [...new Set(this.packIdList)] // 数组去重
//        this.packNumList = [...new Set(this.packNumList)] // 数组去重
        this.$emit('transferIdList', this.packIdList)
        this.$emit('transferEve', this.check_list1)
        this.$emit('transferName', this.packNumList)
      },
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
  }
</style>
