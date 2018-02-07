<template>
  <el-container>
    <el-main style="overflow: hidden">
      <full-calendar class="test-fc" :events="fcEvents"
                     first-day='1'
                     @changeMonth="changeMonth"
                     @eventClick="eventClick"
                     @dayClick="dayClick"
                     lang='zh'
                     @moreClick="moreClick">
        <!--<template slot="fc-event-card" scope="p">-->
        <!--<p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>-->
        <!--</template>-->
        <template slot="fc-header-right">
          <!--<i class="el-icon-date"></i>-->
          <span style="float: right;color: #2d8ac7" class="el-icon-menu"> 刘朴浩(代)</span>
        </template>
      </full-calendar>
    </el-main>
  </el-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import fullCalendar from 'vue-fullcalendar'


  export default {
    name: 'dashboard-editor',
    components: {PanThumb, fullCalendar},
    data() {
      return {
        fcEvents: [
          {
            title: 'A项目开标',
            start: '2018-02-02',
            end: '2018-02-02',
            cssClass: 'family'
          },
          {
            title: 'B项目开标',
            start: '2018-02-05',
            cssClass: ['home', 'work']
          },
          {
            title: 'C项目开标',
            start: '2018-02-14',
          },
          {
            title: 'D项目开标',
            start: '2018-02-22',
          },
          {
            title: 'D-2项目开标',
            start: '2018-02-09',
          },
        ],
      }
    },
    methods: {
      changeMonth(start, end, current) {
        console.log('changeMonth', start, end, current)
      },
      eventClick(event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      dayClick(day, jsEvent) {
        console.log('dayClick', day, jsEvent)
      },
      moreClick(day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    overflow: hidden;
    background-color: #e3e3e3;
    min-height: 100vh;
    margin-top: -50px;
    padding: 100px 60px 0px;
  }

  .comp-full-calendar {
    max-width: 95%;
  }

  .family {
    color: #2d8ac7;
  }
</style>
