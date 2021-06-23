<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <div v-if="loading" style="text-align: center;margin: 40px 0">
          <a-spin size="large" tip="Loading..." :spinning="loading"/>
        </div>
        <a-form v-else layout="inline">
          <a-form-item :label="$t('settings.oauth.enable')" style="display: inline-block; margin-right: 20px">
            <a-switch v-model="oauthConfig.enable" @change="updateConfigByName('oauthConfig')">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </a-form-item>
          <div v-if="oauthConfig.enable">
            <div>
              <a-form-item :label="$t('settings.oauth.google.enable')" style="display: inline-block; margin-right: 20px">
                <a-switch v-model="oauthConfig.google.enable" @change="updateConfigByName('oauthConfig')">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item :label="$t('settings.oauth.google.id')">
                <a-input v-model="oauthConfig.google.id" @blur="updateConfigByName('oauthConfig')"/>
              </a-form-item>
              <a-form-item :label="$t('settings.oauth.google.secret')">
                <a-input v-model="oauthConfig.google.secret" @blur="updateConfigByName('oauthConfig')"/>
              </a-form-item>
              <a-form-item :label="$t('settings.oauth.google.redirectUri')">
                <a-input v-model="oauthConfig.google.redirectUri" @blur="updateConfigByName('oauthConfig')"/>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getOauthConfig, updateConfigByName } from '@/api/settings'

export default {
  data () {
    return {
      loading: true,
      oauthConfig: {}
    }
  },
  async created () {
    await getOauthConfig().then(res => {
      this.oauthConfig = res.data.oauthConfig
      this.loading = false
    })
  },
  methods: {
    async updateConfigByName (name) {
      // 转成json字符串
      const params = {
        'name': name,
        'value': JSON.stringify(this.oauthConfig)
      }
      const result = await updateConfigByName(params)
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
