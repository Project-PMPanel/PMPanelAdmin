<template>
  <page-header-wrapper :breadcrumb="{}">
    <div v-if="loading" style="text-align: center;margin: 40px 0">
      <a-spin size="large" tip="Loading..." :spinning="loading"/>
    </div>
    <div v-else>
      <div>
        <a-input v-model="announcement.title" :placeholder="$i18n.locale === 'zh-CN' ? '标题' : 'Title'" />
      </div>
      <div id="editor">
        <v-md-editor @change="getHtml" v-model="announcement.markdownContent" style="height: 100%"/>
      </div>
      <div>
        <a-form>
          <a-form-item :label="$i18n.locale === 'zh-CN' ? '更新公告' : 'Update Announcement'" style="display: inline-block; margin-right: 20px">
            <a-switch v-model="flags.save">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </a-form-item>
          <!--
          <a-form-item :label="$i18n.locale === 'zh-CN' ? 'Bot提醒' : 'TGBot Notification'" style="display: inline-block; margin-right: 20px">
            <a-switch v-model="flags.bot">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </a-form-item>
          <a-form-item :label="$i18n.locale === 'zh-CN' ? '邮件发信' : 'Send Email'" style="display: inline-block; margin-right: 20px">
            <a-switch v-model="flags.mail">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </a-form-item>
          -->
        </a-form>
      </div>
      <div>
        <a-button type="primary" block style="margin-top: 10px" @click="saveOrUpdateAnnouncement">{{ $i18n.t('setting.save') }}</a-button>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getAnnouncement, saveOrUpdateAnnouncement, deleteAnnouncementById } from '@/api/announcement'

export default {
  components: {},
  data () {
    return {
      loading: true,
      announcement: {
        title: '',
        markdownContent: ''
      },
      flags: {
        save: true,
        bot: false,
        mail: false,
        html: ''
      }
    }
  },
  async created () {
    const result = await getAnnouncement()
    if (result.code === 200) {
      if (result.data.announcement !== null) {
        this.announcement = result.data.announcement
      }
      this.loading = false
    }
  },
  methods: {
    getHtml (markdown, html) {
      console.log(html)
      this.flags.html = html
    },
    async saveOrUpdateAnnouncement () {
      const params = Object.assign({}, this.announcement, this.flags)
      // console.log(params)
      const result = await saveOrUpdateAnnouncement(params)
      if (result.code === 200) {
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async deleteAnnouncementById (id) {
      const result = await deleteAnnouncementById(id)
      if (result.code === 200) {
        this.announcement = {}
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #editor {
    margin: 20px auto;
    height: 400px;
  }
  .v-note-wrapper {
    z-index: 1;
  }
</style>
