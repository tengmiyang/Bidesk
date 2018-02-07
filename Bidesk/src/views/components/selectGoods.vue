<template>
  <el-select multiple style="width: 100%" v-model="second_form.goods_list" placeholder="请添加主营产品标签">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options3: [{
          label: '服务类',
          options: [{
            value: 'Shanghai',
            label: '商品服务'
          }, {
            value: 'Beijing',
            label: '印刷'
          }, {
            value: 'sheji',
            label: '系统设计'
          }, {
            value: 'huodong',
            label: '活动策划与执行'
          }, {
            value: 'guanggao',
            label: '广告发布'
          }]
        }, {
          label: '货物类',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        },
          {
            label: '工程类',
            options: [{
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }]
          }
        ],
        value7: ''
      }
    },
    props: ['second_form']
  }
</script>
