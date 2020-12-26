<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-row :gutter="24">
      <a-col>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table ref="table" size="default" rowKey="id" :columns="ticketColumns" :data="loadTicketData">
            <span slot="status" slot-scope="text">
              <a-tag :color="text === 0 ? 'red' : (text === 1 ? 'cyan' : 'blue')">
                {{ text === 0 ? $t('ticket.status.0') : (text === 1 ? $t('ticket.status.1') : $t('ticket.status.2')) }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <router-link :to="{path:'/admin/ticket/detail/'+record.id}">{{ $t('ticket.detail') }}</router-link>
                <a-divider type="vertical" />
                <a-popconfirm :title="$t('ticket.operation.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteTicketById(record.id)">
                  <a>{{ $t('ticket.operation.delete') }}</a>
                </a-popconfirm>
              </template>
            </span>
          </s-table>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { getTicket, deleteTicketById } from '@/api/ticket'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      ticket: {},
      ticketColumns: [
        {
          title: this.$i18n.t('ticket.title'),
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: this.$i18n.t('ticket.time'),
          align: 'center',
          dataIndex: 'time'
        },
        {
          title: this.$i18n.t('ticket.status'),
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$i18n.t('ticket.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadTicketData: parameter => {
        return getTicket(Object.assign(parameter))
          .then(res => {
            console.log(res)
            return res.tickets
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.ticketColumns = [
        {
          title: this.$i18n.t('ticket.title'),
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: this.$i18n.t('ticket.time'),
          align: 'center',
          dataIndex: 'time'
        },
        {
          title: this.$i18n.t('ticket.status'),
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$i18n.t('ticket.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  async created () {
  },
  methods: {
    async deleteTicketById (id) {
      const result = await deleteTicketById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
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
