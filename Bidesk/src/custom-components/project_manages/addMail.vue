<template>
  <div>
    <el-row style="margin-left:5%">
      <el-col style="padding-bottom: 2%;">发件人：
        <el-select v-model="value">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width:35%;" v-model="input" placeholder="请输入内容"></el-input>
      </el-col>

      <el-col style="padding-bottom: 2%;">收件人：
        <el-input v-model="input1" :disabled="true" style="width: 69%">
        </el-input>
      </el-col>

      <el-col style="margin-left:14px;padding-bottom: 2%;">标题：
        <el-input style="width:69%;" v-model="input" placeholder="请输入内容"></el-input>
      </el-col>

      <el-col style="margin-left:14px;padding-bottom: 2%;">时间：
        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-col>

      <el-col style="margin-left:14px;padding-bottom: 2%;">附件：
        <Upload></Upload>
      </el-col>

      <el-col style="margin-left:14px;padding-bottom: 2%;">说明：
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:69%;">
        </el-input>
      </el-col>

      <!--<el-col style="margin-left:14px;">类型：-->
        <!--<el-radio v-model="radio" label="1">继续讨论</el-radio>-->
        <!--<el-radio v-model="radio" label="2">定稿</el-radio>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>
<script>
  import Upload from '@/custom-components/Upload/singleFile';

  export default {
    components: {Upload},
    data() {
      return {
        input1: '张三<74399811@qq.com>',
        radio: '',
        input: '',
        value: '',
        value1: '',
        textarea3: '',
        dialogVisible1: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
      }
    }
  }
</script>
