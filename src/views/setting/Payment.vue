<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <div v-if="loading" style="text-align: center;margin: 40px 0">
          <a-spin size="large" tip="Loading..." :spinning="loading"/>
        </div>
        <a-tabs v-else default-active-key="alipay">
          <a-tab-pane key="alipay">
            <span slot="tab">
              <my-icon type="icon-alipay" />
              {{ $t('settings.payment.alipay') }}
            </span>
            <a-form layout="vertical">
              <a-form-item :label="$t('settings.payment.alipay')">
                <a-select :value="paymentConfig.alipay" @change="handleSelectAlipay">
                  <a-select-option value="none">{{ $t('settings.payment.alipay.close') }}</a-select-option>
                  <a-select-option value="alipay">{{ $t('settings.payment.alipay.alipay') }}</a-select-option>
                  <a-select-option value="stripe">Stripe</a-select-option>
                </a-select>
              </a-form-item>

              <a-divider />

              <a-form-item v-if="paymentConfig.alipay === 'alipay' " :label="$t('settings.payment.alipayConfig')">
                <a-input v-model="paymentConfig.alipayConfig.appId" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="AppId" /><br><br>
                <a-input v-model="paymentConfig.alipayConfig.pId" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="Partner Id" /><br><br>
                <a-textarea v-model="paymentConfig.alipayConfig.appPrivateKey" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="Private Key" :auto-size="{ minRows: 2, maxRows: 5 }"/><br><br>
                <a-form-item :label="$t('settings.payment.alipay.alipay.alipayConfig.isCertMode')">
                  <a-switch v-model="paymentConfig.alipayConfig.isCertMode" @change="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)">
                    <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
                  </a-switch>
                </a-form-item>
                <div v-if="paymentConfig.alipayConfig.isCertMode">
                  <a-input v-model="paymentConfig.alipayConfig.appCertPath" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="AppCertPath" /><br><br>
                  <a-input v-model="paymentConfig.alipayConfig.alipayCertPath" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="AlipayCertPath" /><br><br>
                  <a-input v-model="paymentConfig.alipayConfig.alipayRootCertPath" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="AlipayRootCertPath" /><br><br>
                </div>
                <div v-else>
                  <a-textarea v-model="paymentConfig.alipayConfig.alipayPublicKey" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="Alipay Public Key" :auto-size="{ minRows: 2, maxRows: 5 }"/><br><br>
                </div>
                <a-input v-model="paymentConfig.alipayConfig.serverUrl" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="Server Url" /><br><br>
                <a-input v-model="paymentConfig.alipayConfig.domain" @blur="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)" placeholder="Domain" /><br><br>
                <a-divider />
                <a-form-item :label="$t('settings.payment.alipay.alipay.alipayConfig.web')" style="display: inline-block; margin-right: 20px">
                  <a-switch v-model="paymentConfig.alipayConfig.web" @change="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)">
                    <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
                  </a-switch>
                </a-form-item>

                <a-form-item :label="$t('settings.payment.alipay.alipay.alipayConfig.wap')" style="display: inline-block; margin-right: 20px">
                  <a-switch v-model="paymentConfig.alipayConfig.wap" @change="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)">
                    <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
                  </a-switch>
                </a-form-item>

                <a-form-item :label="$t('settings.payment.alipay.alipay.alipayConfig.f2f')" style="display: inline-block; margin-right: 20px">
                  <a-switch v-model="paymentConfig.alipayConfig.f2f" @change="updateConfigByName('alipayConfig', paymentConfig.alipayConfig)">
                    <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
                  </a-switch>
                </a-form-item>
              </a-form-item>

              <a-form-item v-if="paymentConfig.alipay === 'stripe' " :label="$t('settings.payment.stripeConfig')">
                <a-input v-model="paymentConfig.stripeConfig.currency" @blur="updateConfigByName('stripeConfig', paymentConfig.stripeConfig)" placeholder="currency" /><br><br>
                <a-input v-model="paymentConfig.stripeConfig.sk_live" @blur="updateConfigByName('stripeConfig', paymentConfig.stripeConfig)" placeholder="sk_live" /><br><br>
                <a-input v-model="paymentConfig.stripeConfig.webhook_secret" @blur="updateConfigByName('stripeConfig', paymentConfig.stripeConfig)" placeholder="webhook_secret" /><br><br>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="wxpay">
            <span slot="tab">
              <my-icon type="icon-wxpay" />
              {{ $t('settings.payment.wxpay') }}
            </span>
            <a-form layout="vertical">
              <a-form-item :label="$t('settings.payment.wxpay')">
                <a-select :value="paymentConfig.wxpay" @change="handleSelectWxpay">
                  <a-select-option value="none">{{ $t('settings.payment.alipay.close') }}</a-select-option>
                </a-select>
              </a-form-item>

              <a-divider />
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getPaymentConfig, updateConfigByName } from '@/api/settings'

export default {
  data () {
    return {
      loading: true,
      paymentConfig: {}
    }
  },
  async created () {
    await getPaymentConfig().then(res => {
      this.paymentConfig = res.data.paymentConfig
      this.loading = false
      // console.log(this.paymentConfig)
    })
  },
  methods: {
    async updateConfigByName (name, value) {
      // 如果name不是alipay或wxpay,把value转成json字符串
      if (name !== 'alipay' && name !== 'wxpay') {
        // 判断范围是否规范
        value = JSON.stringify(value)
      }
      const params = {
        'name': name,
        'value': value
      }
      // console.log(params)
      const result = await updateConfigByName(params)
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    handleSelectAlipay (value) {
      console.log(value)
      this.paymentConfig.alipay = value
      this.updateConfigByName('alipay', value)
    },
    handleSelectWxpay (value) {
      console.log(value)
      this.paymentConfig.wxpay = value
      this.updateConfigByName('wxpay', value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
