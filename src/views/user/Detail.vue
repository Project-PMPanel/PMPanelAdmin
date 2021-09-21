<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-button type="primary" v-if="edit" @click="updateUserById" style="margin: 0 10px 20px 0">{{ $t('setting.save') }}</a-button>
    <a-button type="danger" v-if="!edit" @click="edit = true;infoBak=JSON.parse(JSON.stringify(info))" style="margin-bottom: 20px">{{ $t('setting.change') }}</a-button>
    <a-button type="default" v-else @click="edit = false;info=infoBak" style="margin-bottom: 20px">{{ $t('setting.cancel') }}</a-button>
    <a-button type="primary" @click="resetPasswdById" style="margin: 0 10px 20px 20px">{{ $t('user.detail.resetPasswd') }}</a-button>
    <a-card :bordered="false">
      <div v-if="loading" style="text-align: center;margin: 40px 0">
        <a-spin size="large" tip="Loading..." :spinning="loading"/>
      </div>
      <div>
        <a-row :gutter="24">
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="6"
            v-if="(!edit && (item === 'password') ? '' : item) && (edit && (item === 'hasUsedGb' || item === 'todayUsedGb' || item === 'parentId') ? '' : item )"
            :key="index"
            v-for="(item, index) in ['email', 'password', 'clazz', 'expireIn', 'money', 'transferEnableGb', 'hasUsedGb', 'todayUsedGb', 'inviteCount', 'inviteCycleRate', 'parentId', 'nodeSpeedlimit', 'nodeConnector', 'nodeGroup', 'isAdmin', 'inviteCycleEnable', 'enable']">
            <a-form layout="vertical">
              <a-form-item :label="$i18n.t('user.detail.' + item)">
                <span v-if="!edit">
                  <span v-if="item === 'money'">
                    {{ info.user[item] | numberFormat }}
                  </span>
                  <span v-else-if="item === 'parentId'">
                    <router-link :to="'/admin/manage/user/' + info.user[item]">{{ info.user[item] }}</router-link>
                  </span>
                  <span v-else-if="item === 'isAdmin'">
                    {{ info.user[item] === 0 ? $t('user.detail.isAdmin.user') : ( info.user[item] === 1 ? $t('user.detail.isAdmin.admin') : $t('user.detail.isAdmin.customerService')) }}
                  </span>
                  <span v-else>
                    {{ info.user[item] }}
                  </span>
                </span>
                <span v-else>
                  <span v-if="item === 'isAdmin'">
                    <a-select :value="info.user[item]" @change="handleSelectIsAdmin">
                      <a-select-option :value="0">{{ $t('user.detail.isAdmin.user') }}</a-select-option>
                      <a-select-option :value="1">{{ $t('user.detail.isAdmin.admin') }}</a-select-option>
                      <a-select-option v-if="false" :value="2">{{ $t('user.detail.isAdmin.customerService') }}</a-select-option>
                    </a-select>
                  </span>
                  <span v-else>
                    <a-input v-if="typeof info.user[item] !== 'boolean'" v-model="info.user[item]"/>
                    <a-switch v-if="typeof info.user[item] === 'boolean'" v-model="info.user[item]"/>
                  </span>
                </span>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getUserDetail, updateUserById, resetPasswdById } from '@/api/user'

export default {
  name: 'Detail',
  data () {
    return {
      loading: true,
      id: undefined,
      info: {
        user: {}
      },
      infoBak: {
        user: {}
      },
      edit: false
    }
  },
  created () {
    this.getUserDetail()
  },
  watch: {
    '$route' (to, from) {
      this.getUserDetail()
    }
  },
  methods: {
    async getUserDetail () {
      this.id = this.$route.params.id
      // 获取该用户所有信息
      const result = await getUserDetail(this.id)
      if (result.code === 200) {
        this.info = result.data.info
        // 将密码设置为空
        this.info.user.password = ''
        this.loading = false
        console.log(this.info.user)
      }
    },
    handleSelectIsAdmin (value) {
      this.info.user['isAdmin'] = value
    },
    async updateUserById () {
      console.log(this.info.user)
      const result = await updateUserById(this.info.user)
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
        this.edit = false
      }
    },
    async resetPasswdById () {
      console.log(this.info.user)
      const result = await resetPasswdById(this.info.user)
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style scoped>

</style>
