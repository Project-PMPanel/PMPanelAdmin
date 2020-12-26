<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-row :gutter="24">
      <a-col>
        <div style="font-size: 24px;color: #777171;font-weight: bold;margin-bottom: 24px">
          {{ tickets[0].title }}
        </div>
      </a-col>
      <a-col>
        <div v-for="(item) in tickets" :key="item.id" style="margin-bottom: 24px">
          <a-card :body-style="{padding: '0'}" :bordered="false">
            <v-md-editor :value="item.content" mode="preview"/>
            <div style="padding: 0 0 20px 20px">
              {{ tickets[0].userId === item.userId ? item.time : '管理员回复于: ' + item.time }}
            </div>
          </a-card>
        </div>
        <div v-if="!close">
          <div>
            <a-button type="danger" block style="margin-top: 10px;margin-bottom: 24px" @click="closeTicket">{{ $i18n.t('ticket.detail.close') }}</a-button>
          </div>
          <div id="editor">
            <v-md-editor v-model="ticket.content" style="height: 100%"/>
          </div>
          <div>
            <a-button type="primary" block style="margin-top: 10px;margin-bottom: 24px" @click="saveTicket">{{ $i18n.t('setting.submit') }}</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { getTicketById, saveTicket, closeTicket } from '@/api/ticket'

export default {
  data () {
    return {
      close: false,
      ticket: {},
      tickets: [
        {
          title: ''
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
    }
  },
  async created () {
    await this.init()
  },
  methods: {
    async init () {
      const id = this.$route.params.id
      const result = await getTicketById(id)
      if (result.code === 200) {
        this.tickets = result.data.tickets
        if (this.tickets[0].status === 2) {
          this.close = true
        }
      }
    },
    async saveTicket () {
      this.ticket.parentId = this.tickets[0].id
      if (this.ticket.content === '' || this.ticket.content === null || this.ticket.content === undefined) {
        this.$i18n.locale === 'zh-CN' ? this.$message.info('请填写工单内容') : this.$message.info('Please input the ticket content')
        return
      }
      const result = await saveTicket(this.ticket, 'reply')
      if (result.code === 200) {
        await this.init()
        this.ticket = {}
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async closeTicket () {
      const result = await closeTicket(this.tickets[0].id)
      if (result.code === 200) {
        await this.init()
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
