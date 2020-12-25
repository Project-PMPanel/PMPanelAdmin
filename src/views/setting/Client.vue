<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="24">
        <div v-if="loading" style="text-align: center;margin: 40px 0">
          <a-spin size="large" tip="Loading..." :spinning="loading"/>
        </div>
        <a-form v-else layout="vertical">
          <a-form-item label="Android">
            <a-input v-model="clientConfig.title" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="title" /><br><br>
            <a-textarea :auto-size="{ minRows: 3, maxRows: 5 }" v-model="clientConfig.content" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="content" /><br><br>
            <a-input v-model="clientConfig.broadUrl" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="broadUrl" /><br><br>
            <span>broadShow </span>
            <a-switch v-model="clientConfig.broadShow" @change="updateConfigByName('clientConfig', clientConfig)">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch><br><br>
            <a-input v-model="clientConfig.versionCode" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="versionCode" /><br><br>
            <a-input v-model="clientConfig.description" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="description" /><br><br>
            <a-input v-model="clientConfig.download" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="download" />
          </a-form-item>
          <a-form-item label="Win & Mac">
            <a-input v-model="clientConfig.pcAnnoTitle" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="pcAnnoTitle" /><br><br>
            <a-textarea :auto-size="{ minRows: 3, maxRows: 5 }" v-model="clientConfig.pcAnnoContent" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="pcAnnoContent" /><br><br>
            <span>pcAnnoShow </span>
            <a-switch v-model="clientConfig.pcAnnoShow" @change="updateConfigByName('clientConfig', clientConfig)">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch><br><br>
            <a-input v-model="clientConfig.pcUpdateVersionCode" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="pcUpdateVersionCode" /><br><br>
            <a-input v-model="clientConfig.pcUpdateDescription" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="pcUpdateDescription" /><br><br>
            <a-input v-model="clientConfig.pcUpdateDownload" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="pcUpdateDownload" /><br><br>
            <a-input v-model="clientConfig.pcUpdateDownloadMac" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="pcUpdateDownloadMac" />
          </a-form-item>
          <hr>
          <a-form-item label="API URL">
            <a-input v-model="clientConfig.baseUrl" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="baseUrl" />
          </a-form-item>
          <a-form-item label="ProxyName">
            <a-input v-model="clientConfig.subecribeRule" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="subecribeRule" />
          </a-form-item>
          <a-form-item label="启动图">
            <a-input v-model="clientConfig.bootstrapShow" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="bootstrapShow" /><br><br>
            <a-input v-model="clientConfig.bootstrapImg" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="bootstrapImg" /><br><br>
            <a-input v-model="clientConfig.bootstrapUrl" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="bootstrapUrl" />
          </a-form-item>
          <a-form-item label="内置浏览器长宽">
            <a-input v-model="clientConfig.bootstrap.width" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="width" /><br><br>
            <a-input v-model="clientConfig.bootstrap.height" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="height" />
          </a-form-item>
          <a-form-item label="导航菜单1">
            <a-input v-model="clientConfig.nav[0].desc" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="desc" /><br><br>
            <a-input v-model="clientConfig.nav[0].color" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="color" /><br><br>
            <a-input v-model="clientConfig.nav[0].link" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="link" />
          </a-form-item>
          <a-form-item label="导航菜单2">
            <a-input v-model="clientConfig.nav[1].desc" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="desc" /><br><br>
            <a-input v-model="clientConfig.nav[1].color" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="color" /><br><br>
            <a-input v-model="clientConfig.nav[1].link" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="link" />
          </a-form-item>
          <a-form-item label="导航菜单3">
            <a-input v-model="clientConfig.nav[2].desc" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="desc" /><br><br>
            <a-input v-model="clientConfig.nav[2].color" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="color" /><br><br>
            <a-input v-model="clientConfig.nav[2].link" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="link" />
          </a-form-item>
          <a-form-item label="等级名称">
            <a-input v-model="clientConfig.levelDesc.l0" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="l0" /><br><br>
            <a-input v-model="clientConfig.levelDesc.l1" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="l1" /><br><br>
            <a-input v-model="clientConfig.levelDesc.l2" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="l2" /><br><br>
            <a-input v-model="clientConfig.levelDesc.l3" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="l3" />
          </a-form-item>
          <a-form-item label="holdConnect">
            <a-switch v-model="clientConfig.holdConnect" @change="updateConfigByName('clientConfig', clientConfig)">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch><br><br>
            <a-input v-model="clientConfig.userinfoFrq" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="userinfoFrq" /><br><br>
            <a-input v-model="clientConfig.onlineinfoFrq" @blur="updateConfigByName('clientConfig', clientConfig)" placeholder="onlineinfoFrq" />
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getClientConfig, updateConfigByName } from '@/api/settings'

export default {
  data () {
    return {
      loading: true,
      clientConfig: {
        bootstrap: {
          width: 1200,
          height: 800
        },
        nav: [
          {
            desc: '',
            color: '',
            link: ''
          },
          {
            desc: '',
            color: '',
            link: ''
          },
          {
            desc: '',
            color: '',
            link: ''
          }
        ],
        levelDesc: {}
      }
    }
  },
  async created () {
    await getClientConfig().then(res => {
      if (Object.keys(res.data.clientConfig).length > 0) {
        this.clientConfig = res.data.clientConfig
      }
      this.loading = false
      console.log(Object.keys(res.data.clientConfig).length)
    })
  },
  methods: {
    async updateConfigByName (name, value) {
      // 转成json字符串
      value = JSON.stringify(value)
      const params = {
        'name': name,
        'value': value
      }
      console.log(params)
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
