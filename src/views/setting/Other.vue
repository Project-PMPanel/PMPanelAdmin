<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <div v-if="loading" style="text-align: center;margin: 40px 0">
          <a-spin size="large" tip="Loading..." :spinning="loading"/>
        </div>
        <a-form v-else layout="vertical">
          <a-form-item label="muSuffix">
            <a-input v-model="otherConfig.muSuffix" @blur="updateConfigByName('muSuffix', otherConfig.muSuffix)"/>
          </a-form-item>

          <a-form-item :label="$t('settings.other.trafficSaveDays')">
            <a-input v-model="otherConfig.userTrafficLogLimitDays" @blur="updateConfigByName('userTrafficLogLimitDays', otherConfig.userTrafficLogLimitDays)"/>
          </a-form-item>

          <a-form-item :label="$t('settings.other.notifyInfo')">
            <a-textarea :auto-size="{ minRows: 2, maxRows: 6 }" :placeholder="$t('settings.other.notifyInfoRule')" v-model="otherConfig.notifyInfo" @blur="updateConfigByName('notifyInfo', otherConfig.notifyInfo)"/>
          </a-form-item>
        </a-form>
        <span style="margin-right: 10px">
          <a-button type="primary" @click="cleanCache">{{ $i18n.t('dashboard.cache.clean') }}</a-button>
        </span>
        <span style="margin-right: 10px">
          <a-button type="primary" @click="notifyRenew">{{ $i18n.t('dashboard.notify.renew') }}</a-button>
        </span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getOtherConfig, updateConfigByName } from '@/api/settings'
import { cleanCache, notifyRenew } from '@/api/dashboard'

export default {
  data () {
    return {
      loading: true,
      otherConfig: {}
    }
  },
  async created () {
    await getOtherConfig().then(res => {
      this.otherConfig = res.data.otherConfig
      this.loading = false
      console.log(this.otherConfig)
    })
  },
  methods: {
    async updateConfigByName (name, value) {
      const params = {
        'name': name,
        'value': value
      }
      const result = await updateConfigByName(params)
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async cleanCache  () {
      const result = await cleanCache()
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async notifyRenew  () {
      const result = await notifyRenew()
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
