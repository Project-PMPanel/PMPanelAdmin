<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-row :gutter="24">
      <div>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.todo')" :bordered="false" style="height: 181px">
            <span>
              <span>{{ $i18n.t('dashboard.info.ticket') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">
                <router-link :to="{path: '/admin/manage/ticket/index'}">{{ dashboard.ticketCount }}</router-link>
              </span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.withdraw') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">
                <router-link :to="{path: '/admin/manage/withdrawal'}">{{ dashboard.withdrawCount }}</router-link>
              </span>
              <br>
            </span>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.node')" :bordered="false" style="height: 181px">
            <span>
              <span>{{ $i18n.t('dashboard.info.nodeCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">
                <router-link :to="{path: '/admin/manage/node'}">{{ dashboard.nodeCount }}</router-link>
              </span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.offlineCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.offlineCount }}</span>
              <br>
            </span>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12":xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.user')" :bordered="false" style="height: 181px">
            <span>
              <span>{{ $i18n.t('dashboard.info.userCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">
                <router-link :to="{path: '/admin/manage/user'}">{{ dashboard.userCount }}</router-link>
              </span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.monthRegisterCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.monthRegisterCount }}</span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.todayRegisterCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.todayRegisterCount }}</span>
              <br>
            </span>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.income')" :bordered="false" style="height: 181px">
            <span>
              <span>{{ $i18n.t('dashboard.info.monthIncome') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.monthIncome }}</span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.todayIncome') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.todayIncome }}</span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.todayOrderCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.todayOrderCount }}</span>
              <br>
            </span>
            <span>
              <span>{{ $i18n.t('dashboard.info.monthPaidUserCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.monthPaidUserCount }}</span>
              <br>
            </span>
          </a-card>
        </a-col>
        <a-col :xl="24" :md="24" :sm="24" :style="{ marginBottom: '24px' }">
          <a-card style="margin-bottom: 24px" :bordered="false">
            <span slot="title">
              <a-icon type="money-collect" />
              {{ $t('dashboard.info.incomeDetails') }}
            </span>
            <div>
              <div id="container"></div>
            </div>
          </a-card>
        </a-col>
      </div>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { getDashboardInfo } from '@/api/dashboard'
import { Chart } from '@antv/g2'

export default {
  name: 'Dashboard',
  components: {
    Chart
  },
  data () {
    return {
      dashboard: {}
    }
  },
  async created () {
    const result = await getDashboardInfo()
    if (result.code === 200) {
      this.dashboard = result.data
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500
      })
      chart.data(this.dashboard.incomeDetails)
      chart.scale('value', {
        nice: true
      })
      chart.axis('value', {
        label: {
          formatter: (val) => {
            return val + ' CNY'
          }
        }
      })
      chart.tooltip({
        showMarkers: false,
        shared: true
      })
      chart.interval().position('month*value').color('type').shape('stack')
      chart.interaction('active-region')
      chart.render()
    }
  }
}
</script>

<style scoped>
/deep/ .ant-card-body {
  padding: 10px;
}
</style>
