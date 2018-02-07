<template>
  <el-row>
    <!--未提交-->
    <el-form v-if="pack_list === null" label-width="180px" class="demo-ruleForm"
             :rules="rules" :model="ruleForm" ref="ruleForm">
      <!--编辑框-->
      <el-row :gutter="20">
        <el-col class="col-upload" :span="16" :offset="4">
          <el-form-item label="上传采购文件" prop="fileList">
            <Upload :fileList="ruleForm.fileList" @onUploadSuccess="onUploadSuccess"></Upload>
          </el-form-item>
        </el-col>
        <el-col :span="16" :offset="4">
          <el-form-item label="采购文件发售截止时间" prop="saleEndTime">
            <el-date-picker v-model="ruleForm.saleEndTime"
                            type="datetime"
                            placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="16" :offset="4">
          <el-form-item label="递交响应文件截止时间" prop="submitEndTime">
            <div class="block">
              <el-date-picker
                v-model="ruleForm.submitEndTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="16" :offset="4">
          <el-form-item label="联系人">
            <el-input v-model="ruleForm.contact" style="width:75%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" :offset="4">
          <el-form-item label="手机号">
            <el-input v-model="ruleForm.phone" style="width:75%"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="text-align: center" :span="16" :offset="4">
          <el-button @click="cancelSubmit('ruleForm')">重置</el-button>
          <el-button type="primary" @click="resule_btn('ruleForm')">提 交</el-button>
        </el-col>
      </el-row>

      <!--确认弹框-->
      <el-dialog title="详情" :visible.sync="dialogVisible">
        <el-row id="details">
          <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5" style="width: 100%">
            <tbody>
            <tr>
              <th>采购文件</th>
              <td>{{ruleForm.file_name}}</td>
            </tr>
            <tr>
              <th>采购文件发售截止时间</th>
              <td style="color: #ff0000;letter-spacing: 5px;font-weight: 700">{{ruleForm.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
            </tr>
            <tr>
              <th>递交响应文件截止时间</th>
              <td style="color: #ff0000;letter-spacing: 5px;font-weight: 700">{{ruleForm.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
            </tr>
            <tr>
              <th>联系人</th>
              <td>{{ruleForm.contact}}</td>
            </tr>
            <tr>
              <th>手机号</th>
              <td>{{ruleForm.phone}}</td>
            </tr>
            </tbody>
          </table>
        </el-row>
        <el-row style="padding-top: 1%;">
          <el-checkbox :checked="checked" v-model="checked" @change="checkedChange"><span style="color: #FF0000">是否确认发布采购文件,发布后将不可修改！</span>
          </el-checkbox>
        </el-row>
        <el-row style="text-align: center">
          <el-button @click="dialogVisible = false">关 闭</el-button>
          <el-button :disabled="checked === false" @click="submitForm" type="primary">确定提交</el-button>
        </el-row>
      </el-dialog>
    </el-form>

    <!--以提交过-->
    <el-row class="weight" v-else>
      <table border="1" cellspacing="0" cellpadding="0" bordercolor="#e6ebf5" style="width: 100%;line-height: 40px;">
        <tbody>
        <tr>
          <th>采购文件</th>
          <td>
            <el-button type="text">{{pack_list.annexName}}</el-button>
          </td>
        </tr>
        <tr>
          <th>采购文件发售截止时间</th>
          <td>{{pack_list.saleEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
        </tr>
        <tr>
          <th>递交响应文件截止时间</th>
          <td>{{pack_list.submitEndTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</td>
        </tr>
        <tr>
          <th>联系人</th>
          <td>{{pack_list.contact}}</td>
        </tr>
        <tr>
          <th>手机号</th>
          <td>{{pack_list.phone}}</td>
        </tr>
        </tbody>
      </table>
    </el-row>
  </el-row>
</template>
<script>

  import {executeSaveAddNotice, executeProjectDoc} from '@/api/project'
  import {mapGetters} from 'vuex'
  import {USER_FORM, USER_RULES} from '@/store/COMMON_DATA';
  import {deepClone} from '@/utils'
  import Upload from '@/custom-components/Upload/singleFile_back'
  import packChecked from '@/custom-components/project_manages/packChecked'
  import ElFormItem from "element-ui/packages/form/src/form-item";

  export default {
    props: ['packList'],
    components: {
      ElFormItem,
      Upload,
      packChecked
    },
    data() {
      return {
        ruleForm: deepClone(USER_FORM),
        rules: USER_RULES,
        pack_list: this.packList[0].purchaseDoc,
        file_index: null,
        projectId: this.$store.getters.subProjectId,
        must_click: true,
        packNameList: [this.packList[0].packNum],
        packIdList: [this.packList[0].packId],
        dialogVisible: false,
        checked: false,
        purchaseDocList: {}
      }
    },
    mounted() {
      // console.log(this.packList)
      this.ruleForm.contact = this.name
      this.ruleForm.phone = this.phone
    },
    computed: {
      ...mapGetters([
        'name',
        'company',
        'avatar',
        'roles',
        'phone',
      ])
    },
    methods: {
      getNumList(msg) {
        this.packNameList = msg
        // console.log(msg)
      },
      cancelSubmit(ruleForm) {
        this.packIdList = [this.packList[0].packId]
        this.packNameList = [this.packList[0].packNum]
        this.$refs[ruleForm].resetFields();
      },
      onUploadSuccess(msg) {
        // console.log(msg)
        this.ruleForm.fileToken = msg.response.data
        this.ruleForm.file_name = msg.name
        this.ruleForm.fileList = [msg]
      },
      checkedChange() {
        if (this.checked !== false) {
          this.must_click = false
        }
      },
      getIdList(msg) {
        this.packIdList = msg
        // console.log(msg)
      },
      resule_btn(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.dialogVisible = true
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm() {
        this.dialogVisible = false
        executeSaveAddNotice(this.packIdList, this.ruleForm).then(response => {
          // console.log(response)
          if (response.state === true) {
            this.$message({
              message: '上传成功',
              type: 'success'
            });
            this.cancelSubmit('ruleForm')
            this.checked = false
            // 当前视图更新
            const id = response.data[this.packList[0].packId].packId
//          注意表单判断
            this.pack_list = response.data[id]
          } else {
            this.checked = false
            this.$message({
              message: '提交失败，请确认填写信息',
              type: 'error'
            });
          }
        })
      },
    }
  }
</script>
<style scoped>
  #details th {
     width: 30%;
}
</style>

