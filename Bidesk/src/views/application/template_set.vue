<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <div class="template">
        <div class="temp">
          <span>模板名称：</span>
          <!--<span>{{pronamea}}</span>-->
          <span>委托函模板</span>
        </div>
        <div class="content">
          <div class="head">
            <span>模板内容：</span>
          </div>
            <!--<TinyMce :height=400 ref="editor">-->
            <!--</TinyMce>-->
            <div class="textcont">
              <h3> {项目名称}项目委托函</h3>
              <p> 根据《中华人民共和国采购法》，现委托贵单位作为采购项目： xxxxx xxx xxx   的招标代理负责相关事宜。</p>
              <div class="floots">
                <p> 委托单位：{委托单位名称}</p>
                <p> 委 托 人： {委托人姓名}</p>
                <p> 委托时间：{委托具体时间}</p>
              </div>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
  import TinyMce from '@/custom-components/Tinymce'
  export default {
    components: { TinyMce },
    data() {
      return {
        activeName: 'first',
      }
    },
    computed: {},
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .template{
    width: 100%;
    height: 100vh;
      .temp{
      padding-left:20px;
      padding-top:2%;
        span{
          font-weight: 700;
          /*margin-top:2%;*/
        }
      }
      .content{
        padding-left:2%;
        padding-top:2%;
        position: relative;
          .head{
            font-weight:700;
          }
          .textcont{
            width: 80%;
            height: 70vh;
            position: absolute;
            top: 0;
            left: 10%;
            border:2px dashed #3f6aa9;
            border-radius: 5px;
            margin-top: 20px;
            padding:20px;
            h3{
              text-align: center;
            }
            p{
              text-indent: 2em;
            }
            .floots{
              padding-top:10%;
              padding-left:60%;
            }
          }
      }
  }
</style>


