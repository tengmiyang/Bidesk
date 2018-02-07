<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <!--日程共享-->
        <div class="sharedate">
          <div class="btn">
            <h3>日程共享</h3>
          </div>
          <div class="sharename">
            <el-button type="primary" plain size="small" @click="dialogVisible = true">添加共享人</el-button>
          </div>
          <el-table :data="tableData">
            <el-table-column prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="proname" label="用户名称">
            </el-table-column>
            <el-table-column prop="procurement" label="手机号码">
            </el-table-column>
            <el-table-column prop="stage" label="部门名称">
            </el-table-column>
            <el-table-column prop="procurementmet" label="共享时间段">
            </el-table-column>
            <el-table-column prop="agency" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogVisible3 = true">更改授权时间</el-button>
                <el-button type="text" @click="dialogVisible2 = true">取消共享</el-button>
              </template>
            </el-table-column>

          </el-table>
          <!--添加共享人对话框-->
           <el-dialog width="50%" :visible.sync="dialogVisible" center>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input placeholder="姓名" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查找</el-button>
              </el-form-item>
            </el-form>
             <el-table :data="tableData">
               <el-table-column prop="number" label="选择" width="50">
               </el-table-column>
               <el-table-column prop="proname" label="用户名称">
               </el-table-column>
               <el-table-column prop="procurement" label="手机号">
               </el-table-column>
               <el-table-column prop="stage" label="部门名称">
               </el-table-column>
             </el-table>
             <div class="sharetimes">
               <el-form ref="form" :model="form" label-width="120px">
                 <el-form-item label="选择共享时间段">
                   <el-col :span="11">
                     <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                   </el-col>
                   <el-col class="line" :span="2">---------</el-col>
                   <el-col :span="11">
                     <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                   </el-col>
                 </el-form-item>
               </el-form>
             </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
          <!--取消共享弹出框-->
          <el-dialog width="30%" :visible.sync="dialogVisible2" center>
            <h3>是否取消对该用户的共享</h3>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
          </span>
          </el-dialog>
          <!--更改授权时间弹出框-->
          <el-dialog width="40%" :visible.sync="dialogVisible3" center>
              <div class="sharetime">
                <p>用户姓名：<span>张三</span></p>
                <p>手机号码：<span>13522225555</span></p>
                <p>部门名称：<span>采购一部</span></p>
              </div>
              <div class="block">
                  <span class="demonstration">共享时间段：</span>
                  <el-date-picker v-model="value6" type="daterange" range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="dialog">确 定</el-button>
          </span>
          </el-dialog>
        </div>
    <!--项目共享-->
        <div class="sharepro">
          <div class="btn">
            <h3>项目共享</h3>
          </div>
          <div class="sharename">
            <el-button type="primary" plain size="small" @click="dialogVisible1 = true">添加共享人</el-button>
          </div>
          <el-table :data="tableData">
            <el-table-column prop="number" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="proname" label="用户名称">
            </el-table-column>
            <el-table-column prop="procurement" label="手机号码">
            </el-table-column>
            <el-table-column prop="stage" label="部门名称">
            </el-table-column>
            <el-table-column prop="procurementmet" label="共享时间段">
            </el-table-column>
            <el-table-column prop="agency" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogVisible3 = true">更改授权时间</el-button>
                <el-button type="text" @click="dialogVisible2 = true">取消共享</el-button>
              </template>
            </el-table-column>

          </el-table>
          <!--添加共享项目对话框-->
          <el-dialog width="50%" :visible.sync="dialogVisible1" center>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input placeholder="姓名" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查找</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData">
              <el-table-column prop="number" label="选择" width="50">
              </el-table-column>
              <el-table-column prop="proname" label="用户名称">
              </el-table-column>
              <el-table-column prop="procurement" label="手机号">
              </el-table-column>
              <el-table-column prop="stage" label="部门名称">
              </el-table-column>
            </el-table>
            <div class="sharetimes">
              <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="选择共享时间段">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">---------</el-col>
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
          </el-dialog>
        </div>


    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          number: '1',
          proname: '钱钱钱',
          procurement: '8888888888',
          stage: '采购一部',
          procurementmet: '1988-2-25/2017-11-20'
        }, {
          number: '1',
          proname: '钱钱钱',
          procurement: '8888888888',
          stage: '采购一部',
          procurementmet: '1988-2-25/2017-11-20'
        }],
        activeName: 'first',
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        value6: '',
//        tableData: Array(2).fill(item),
        formInline: {
          user: '',
          region: ''
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    computed: {},
    methods: {
      dialog(){
        this.dialogVisible3=false;
        alert(this.value6);
        // console.log(this.value6);
        for(let i=0; i<this.value6.length; i++){
          this.value6[i].toLocaleDateString();
          // console.log(this.value6[i]);
        }
        this.tableData[0].procurementmet=this.value6;
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .sharetime{
    width:100%;
  }
  .sharetime>p{
    padding-left: 20px;
  }
  .sharetime>p>span{
    padding-left: 20px;
  }
  .sharetimes{
    margin-top: 15px;
  }
  .sharedate{
    padding: 20px;
    margin-top: 20px;
    border:1px dashed #3a8ee6;
    position: relative;
  }
  .sharedate>.btn{
    background-color: #fff;
    position: absolute;
    top: -35px;
    left: 30px;
    color: #3a8ee6;
  }
  .sharepro{
    padding: 20px;
    margin-top: 40px;
    border:1px dashed #3a8ee6;
    position: relative;
  }
  .sharepro>.btn{
    background-color: #fff;
    position: absolute;
    top: -35px;
    left: 30px;
    color: #3a8ee6;
  }
  .el-table .cell{
    text-align: center;
  }
  .sharename{
    padding-left: 85%;
  }
</style>


