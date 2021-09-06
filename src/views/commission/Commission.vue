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
            <span slot="relatedOrderId" slot-scope="text">
              <router-link :to="'/admin/funds/order/detail/' + text">
                {{ text }}
              </router-link>
            </span>
          </s-table>
        </a-card>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getCommission } from '@/api/commission'
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
          title: this.$i18n.t('commission.list.inviterUser'),
          align: 'center',
          dataIndex: 'userId',
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: this.$i18n.t('commission.list.relatedOrder'),
          align: 'center',
          dataIndex: 'relatedOrderId',
          scopedSlots: { customRender: 'relatedOrderId' }
        },
        {
          title: this.$i18n.t('commission.list.commission'),
          align: 'center',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: this.$i18n.t('commission.list.time'),
          align: 'center',
          dataIndex: 'time',
          scopedSlots: { customRender: 'time' }
        }
      ],
      loadData: parameter => {
        return getCommission(Object.assign(parameter))
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
          title: this.$i18n.t('commission.list.inviterUser'),
          align: 'center',
          dataIndex: 'userId',
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: this.$i18n.t('commission.list.relatedOrder'),
          align: 'center',
          dataIndex: 'relatedOrderId',
          scopedSlots: { customRender: 'relatedOrderId' }
        },
        {
          title: this.$i18n.t('commission.list.commission'),
          align: 'center',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: this.$i18n.t('commission.list.time'),
          align: 'center',
          dataIndex: 'time',
          scopedSlots: { customRender: 'time' }
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
