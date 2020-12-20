<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-row :gutter="24">
      <div v-if="loading" style="text-align: center;margin: 40px 0">
        <a-spin size="large" tip="Loading..." :spinning="loading"/>
      </div>
      <div v-else>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.ticket')" :bordered="false" style="height: 181px">
            <p>TODO</p>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card title="Card title" :bordered="false" style="height: 181px">
            <p>TODO</p>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12":xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.user')" :bordered="false" style="height: 181px">
            <span style="font-size: 14px;font-weight: bold">{{ $i18n.t('dashboard.info.userCount') }} : </span> <span style="font-size: 18px;font-weight: bold;">{{ dashboard.userCount }}</span>
            <p style="font-size: 16px;font-weight: bold;margin-top: 20px">{{ $i18n.t('dashboard.info.todayRegisterCount') }} : <span style="font-size: 24px;font-weight: bold;">{{ dashboard.todayRegisterCount }}</span></p>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.income')" :bordered="false" style="height: 181px">
            <span style="font-size: 14px;font-weight: bold">{{ $i18n.t('dashboard.info.monthIncome') }} : </span> <span style="font-size: 18px;font-weight: bold;">{{ dashboard.monthIncome }}</span>
            <p style="font-size: 16px;font-weight: bold;margin-top: 20px">{{ $i18n.t('dashboard.info.todayIncome') }} : <span style="font-size: 24px;font-weight: bold;">{{ dashboard.todayIncome }}</span></p>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="24" :lg="24" :xl="24" :style="{ marginBottom: '24px' }">
          <a-card :title="$i18n.t('dashboard.info.log')" :bordered="false" style="height: 300px">
            <p>TODO</p>
          </a-card>
        </a-col>
      </div>
    </a-row>
    <div>
      <a-button type="primary" @click="cleanCache">{{ $i18n.t('dashboard.cache.clean') }}</a-button>
    </div>
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
