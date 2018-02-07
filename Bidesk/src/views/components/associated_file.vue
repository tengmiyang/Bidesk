<template>
    <div class="app-container">
        <el-button type="text" @click="dialogVisible = true">关联邮件</el-button>
        <el-dialog title="详情" :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
            <el-row>
                <el-col>
                    <span style="">主题：</span><el-input type="text"></el-input>
                </el-col>
                <el-col>
                    <span style="marging-left:8px;">联系人：</span><el-input type="text" style="width:25%"></el-input>
                    <span>时间：</span><el-date-picker v-model="value1" type="date" placeholder="选择日期" ></el-date-picker>—<el-date-picker v-model="value1" type="date" placeholder="选择日期" style="margin-right:5px;"></el-date-picker>
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-row>


            <div style="border-bottom:2px #225dd4 dashed ;margin:2% 0"></div>

            <el-row>
                <el-col>
                    <el-button type="primary">发件箱</el-button>
                    <el-button type="primary">收件箱</el-button>
                </el-col>
                <el-col>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column fixed prop="date" label="日期" min-width="80" align="center">
                        </el-table-column>
                        <el-table-column fixed prop="name" label="日期" min-width="80" align="center">
                        </el-table-column>
                        <el-table-column fixed prop="province" label="省份" min-width="80" align="center">
                        </el-table-column>
                        <el-table-column fixed prop="city" label="省份" min-width="80" align="center">
                        </el-table-column>
                        <el-table-column fixed label="操作" min-width="80" align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">关联</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2" :page-sizes="[5, 10, 15, 20]" :page-size="5"
                    layout="sizes, prev, pager, next" :total="15">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage2: 5,
                dialogVisible: false,
                form: {
                    name: '',
                    date1: '',
                    date2: ''
                },
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                }],
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            handleClick(row) {
                // console.log(row);
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
            },
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-col {
    display: flex;
    padding: 2%;
}
.el-col span {
    width: 10%;
    text-align: right;
    line-height: 40px;
}
el-date-picker {
    width: 25%;
}
.block {
    text-align: right;
}
</style>

