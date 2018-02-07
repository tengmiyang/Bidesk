<template>
  <el-checkbox-group v-model="all_packs[current_tab].relatedList" v-cloak>
    <el-checkbox @change="handleCheckChange"
                 v-for="(item, index) in all_packs"
                 :label="'第' + (index + 1) + '包'"
                 :disabled="item.disabled"
                 v-show="item.show"
                 :key="index"
                 style="padding-right: 4%;">
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
  // 数组中去除某个值
  Array.prototype.removeByValue = function (...theArgs) {//esLint推荐用 ...theArgs(剩余参数)取代arguments(所有参数)
    const array = [...this] //splice()会改变原数组，这里首先进行深拷
    for (let i = 0; i < theArgs.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[j] === theArgs[i]) {
          array.splice(j, 1)
          break
        }
      }
    }
    return array
  }

  //数组去重
  Array.prototype.unique = function () {
    const res = [];
    const json = {};
    for (let i = 0; i < this.length; i++) {
      if (!json[this[i]]) {
        res.push(this[i]);
        json[this[i]] = 1;
      }
    }
    return res;
  }

  export default {
    //'all_packs'所有包, 'current_tab'当前tab的index
    props: ['all_packs', 'current_tab'],
    mounted() {
      //初次加载的时候在第一包，把第一包隐藏掉
      this.all_packs[0].show = false
    },
    data() {
      return {
        all_checked: [],
      }
    },
    watch: {
      current_tab(val) {
        //监测current_tab值的变化,变化后执行tabChange
        this.tabChange(val)
      }
    },
    methods: {
      tabChange(current_tab) {
        // 合并所有pack的relatedList数组,这是所有被选中的数组
        this.all_packs.forEach((item, index) => {
          this.all_checked = this.all_checked.concat(item.relatedList).unique()
        })
        this.all_packs.forEach((item, index) => {
          // 隐藏与current_tab值相同的index
          item.show = index === parseInt(current_tab) ? 0 : 1
          const label = '第' + (index + 1) + '包'
          //有关联包的在别的包中禁止勾选
          if (item.relatedList.length !== 1) {
            item.disabled = true
          }
          if (this.all_packs[this.current_tab].relatedList.includes(label)) {
            item.disabled = false
          }//补充上面一条，还有些细节待处理
          if (item.relatedList.length === 0 && this.all_checked.includes(label)) {
            item.tabDisabled = true
          }
          this.$set(this.all_packs, index, item)
        })
      },
      handleCheckChange(isChecked, event) {
//        // console.log(isChecked, event.target.defaultValue)
//        // console.log(this.all_checked)
        const changeItem = event.target.defaultValue
        const changeIndex = parseInt(changeItem.substring(1, 2)) - 1
        const changePackName = this.all_packs[changeIndex].packName
        let relatedList = this.all_packs[this.current_tab].relatedList
        let packNameList = this.all_packs[this.current_tab].packNameList
        if (isChecked) {
          //如果其中任何一个选中，修改当前tab序号对应的关联数组
          relatedList = [...relatedList, changeItem]
          packNameList = [...packNameList, changePackName]
          //如果其中任何一个选中，则清空那个index对应的相关列表，应为他已经被别的关联
          this.all_packs[changeIndex].relatedList = []
          this.all_packs[changeIndex].packNameList = []
          //同时禁用掉对应tab
          this.all_packs[changeIndex].tabDisabled = true
        } else {
          //如果其中任何一个去掉选中，修改当前tab序号对应的关联数组（删除数据）
          relatedList = relatedList.removeByValue(changeItem)
          packNameList = packNameList.removeByValue(changePackName)
          //如果其中任何一个选中，则恢复那个index对应的相关列表，同时tab解除禁用
          this.all_packs[changeIndex].relatedList = [changeItem]
          this.all_packs[changeIndex].tabDisabled = false
        }
        //最后对所有的数组进行去重然后赋值
        this.all_packs[this.current_tab].relatedList = relatedList.unique()
        this.all_packs[this.current_tab].packNameList = packNameList.unique()
      }
    }
  }
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
