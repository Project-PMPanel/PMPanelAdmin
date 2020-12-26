<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-row :gutter="24">
      <div v-if="loading" style="text-align: center;margin: 40px 0">
        <a-spin size="large" tip="Loading..." :spinning="loading"/>
      </div>
      <div v-else>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.ticket')" :bordered="false" style="height: 181px">
            <span>
              <span>{{ $i18n.t('dashboard.info.ticketCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">
                <router-link :to="{path: '/admin/ticket/index'}">{{ dashboard.ticketCount }}</router-link>
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
                <router-link :to="{path: '/admin/node'}">{{ dashboard.nodeCount }}</router-link>
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
                <router-link :to="{path: '/admin/user'}">{{ dashboard.userCount }}</router-link>
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
              <span>{{ $i18n.t('dashboard.info.todayNewOrderCount') }} : </span>
              <span style="font-size: 18px;font-weight: bold;">{{ dashboard.todayNewOrderCount }}</span>
              <br>
            </span>
          </a-card>
        </a-col>
        <div>
          <a-button type="primary" @click="cleanCache">{{ $i18n.t('dashboard.cache.clean') }}</a-button>
        </div>
      </div>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { getDashboardInfo, cleanCache } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  data () {
    return {
      loading: true,
      dashboard: {}
    }
  },
  async created () {
    const result = await getDashboardInfo()
    if (result.code === 200) {
      this.dashboard = result.data
      this.loading = false
      console.log(this.dashboard)
    }
  },
  methods: {
    async cleanCache  () {
      const result = await cleanCache()
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style scoped>
/deep/ .ant-card-body {
  padding: 10px;
}
</style>
