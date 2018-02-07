<template>
  <div>
    <el-checkbox v-for="(item, index) in all_packs"
                 :label="'包件' + (index + 1)"
                 v-show="item.show"
                 :key="index"
                 style="padding-right: 4%;">
    </el-checkbox>
  </div>
</template>

<script>
  export default {
    props: ['all_packs', 'current_tab'],
    mounted() {
      this.all_packs.forEach((item, index) => {
        item.show = true
      })
      this.all_packs[0].show = false
    },
    data() {
      return {
        all_checked: [],
      }
    },
    watch: {
      current_tab(val) {
        alert('1')
        this.tabChange(val)
      }
    },
    methods: {
      tabChange(current_tab) {

        this.all_packs.forEach((item, index) => {
          item.show = index === parseInt(current_tab) ? 0 : 1
        })
      }
    }
  }
</script>

<style>
</style>
