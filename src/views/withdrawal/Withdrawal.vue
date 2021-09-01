<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-card :bordered="false">
      <div>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table ref="table" size="default" rowKey="id" :columns="nodeColumns" :data="loadData">
            <span slot="userId" slot-scope="text">
              <router-link :to="'/admin/manage/user/' + text">
                {{ text }}
              </router-link>
            </span>
            <span slot="status" slot-scope="text">
              <a-badge v-if="text === 1" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text === 1 ? '已完成' : '待处理' }}
              </span>
              <span v-else>
                {{ text === 1 ? 'Finished' : 'Waiting' }}
              </span>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <!--                <a @click="openEditDrawer(record)">{{ $t('setting.change') }}</a>
                <a-divider type="vertical" />-->
                <a-popconfirm v-if="record.status === 0" :title="$t('setting.confirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="ackWithdrawById(record.id)">
                  <a>{{ $t('withdraw.list.operation.ack') }}</a>
                </a-popconfirm>
                <div v-else>
                  {{ $i18n.locale === 'zh-CN' ? '已到账' : 'Completed' }}
                </div>
              </template>
            </span>
          </s-table>
        </a-card>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getWithdraw, ackWithdrawById } from '@/api/withdrawal'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      nodeColumns: [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('withdraw.list.user'),
          align: 'center',
          dataIndex: 'userId',
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: this.$i18n.t('withdraw.list.account'),
          align: 'center',
          dataIndex: 'account',
          scopedSlots: { customRender: 'account' }
        },
        {
          title: this.$i18n.t('withdraw.list.amount'),
          align: 'center',
          dataIndex: 'amount',
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: this.$i18n.t('withdraw.list.realAmount'),
          align: 'center',
          dataIndex: 'realAmount',
          scopedSlots: { customRender: 'realAmount' }
        },
        {
          title: this.$i18n.t('withdraw.list.createTime'),
          align: 'center',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: this.$i18n.t('withdraw.list.status'),
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$i18n.t('withdraw.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getWithdraw(Object.assign(parameter))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.nodeColumns = [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('withdraw.list.user'),
          align: 'center',
          dataIndex: 'userId',
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: this.$i18n.t('withdraw.list.account'),
          align: 'center',
          dataIndex: 'account',
          scopedSlots: { customRender: 'account' }
        },
        {
          title: this.$i18n.t('withdraw.list.amount'),
          align: 'center',
          dataIndex: 'amount',
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: this.$i18n.t('withdraw.list.realAmount'),
          align: 'center',
          dataIndex: 'realAmount',
          scopedSlots: { customRender: 'realAmount' }
        },
        {
          title: this.$i18n.t('withdraw.list.createTime'),
          align: 'center',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: this.$i18n.t('withdraw.list.status'),
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$i18n.t('withdraw.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    async ackWithdrawById (id) {
      const result = await ackWithdrawById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
