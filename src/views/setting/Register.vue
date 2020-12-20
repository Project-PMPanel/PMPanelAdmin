<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <div v-if="loading" style="text-align: center;margin: 40px 0">
          <a-spin size="large" tip="Loading..." :spinning="loading"/>
        </div>
        <a-form v-else layout="vertical">
          <a-form-item :label="$t('settings.register.enableEmailSuffix')">
            <a-input v-model="registerConfig.enableEmailSuffix" @blur="updateConfigByName('enableEmailSuffix', registerConfig.enableEmailSuffix)"/>
          </a-form-item>

          <a-form-item :label="$t('settings.register.userPortRange')">
            <a-input-group compact>
              <a-input v-model="registerConfig.userMinPort" @blur="updateConfigByName('userMinPort', registerConfig.userMinPort)" style=" width: 100px; text-align: center" placeholder="Minimum" />
              <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled/>
              <a-input v-model="registerConfig.userMaxPort" @blur="updateConfigByName('userMaxPort', registerConfig.userMaxPort)" style="width: 100px; text-align: center; border-left: 0" placeholder="Maximum" />
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('settings.register.inviteCount')">
            <a-input v-model="registerConfig.inviteCount" @blur="updateConfigByName('inviteCount', registerConfig.inviteCount)"/>
          </a-form-item>

          <a-form-item :label="$t('settings.register.inviteRate')">
            <a-input v-model="registerConfig.inviteRate" @blur="updateConfigByName('inviteRate', registerConfig.inviteRate)"/>
          </a-form-item>

          <a-divider />

          <a-form-item :label="$t('settings.register.enableWithdraw')" style="display: inline-block; margin-right: 20px">
            <a-switch v-model="registerConfig.enableWithdraw" @change="updateConfigByName('enableWithdraw', registerConfig.enableWithdraw)">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </a-form-item>

          <a-form-item :label="$t('settings.register.minWithdraw')">
            <a-input v-model="registerConfig.minWithdraw" @blur="updateConfigByName('minWithdraw', registerConfig.minWithdraw)"/>
          </a-form-item>

          <a-form-item :label="$t('settings.register.withdrawRate')">
            <a-input v-model="registerConfig.withdrawRate" @blur="updateConfigByName('withdrawRate', registerConfig.withdrawRate)"/>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getRegisterConfig, updateConfigByName } from '@/api/settings'

export default {
  data () {
    return {
      loading: true,
      registerConfig: {}
    }
  },
  async created () {
    await getRegisterConfig().then(res => {
      this.registerConfig = res.data.registerConfig
      this.loading = false
      console.log(this.registerConfig)
    })
  },
  methods: {
    async updateConfigByName (name, value) {
      // 如果是用户端口号,拼接一下
      if (name === 'userMinPort' || name === 'userMaxPort') {
        // 判断范围是否规范
        if (this.registerConfig.userMinPort >= this.registerConfig.userMaxPort || this.registerConfig.userMaxPort > 65535) {
          this.$i18n.locale === 'zh-CN' ? this.$message.warn('请设置正确的端口范围,建议[10000:65535]') : this.$message.warn('please set up correct port range,suggest [10000:65535]')
          return
        }
        name = 'userPortRange'
        value = this.registerConfig.userMinPort.toString() + ':' + this.registerConfig.userMaxPort.toString()
      }
      const params = {
        'name': name,
        'value': value
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
