<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="vertical">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item :label="this.$i18n.locale === 'zh-CN' ? '订单ID' : 'Order ID'">
                <a-input v-model="queryParam.orderId" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="this.$i18n.locale === 'zh-CN' ? '用户ID' : 'User ID'">
                <a-input v-model="queryParam.userId" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="this.$i18n.locale === 'zh-CN' ? '状态' : 'Status'">
                <a-select v-model="queryParam.status" :defaultValue="1" @change="handleSelectStatus">
                  <a-select-option :value="1">{{ $i18n.locale === 'zh-CN' ? '已完成' : 'Success' }}</a-select-option>
                  <a-select-option :value="0">{{ $i18n.locale === 'zh-CN' ? '待付款' : 'Wait for pay' }}</a-select-option>
                  <a-select-option :value="2">{{ $i18n.locale === 'zh-CN' ? '已取消' : 'Cancel' }}</a-select-option>
                  <a-select-option :value="3">{{ $i18n.locale === 'zh-CN' ? '已失效' : 'Invalid' }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } ">
                <a-button type="primary" @click="$refs.table.refresh(true)"> {{ $i18n.t('setting.select') }} </a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {status: 1}"> {{ $i18n.t('setting.reset') }} </a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div style="background-color: #e6f7ff;border: 1px solid #91d5ff;padding: 8px 15px 8px 15px;">
        <a-icon theme="filled" type="info-circle" style="color: #1890ff;margin-right: 5px"/>
        <span style="margin-right: 12px">{{ $i18n.locale === 'zh-CN' ? '查询总数' : 'Count' }}: <a style="font-weight: 600">{{ totalCount }}</a></span>
      </div>

      <s-table ref="table" size="default" rowKey="id" :columns="orderColumns" :data="loadData">
        <span slot="userId" slot-scope="text">
          <router-link :to="'/admin/user/' + text">
            {{ text }}
          </router-link>
        </span>
        <span slot="name" slot-scope="text, record">
          {{ $i18n.locale === 'zh-CN' ? record.name : record.nameEnglish }}
        </span>
        <span slot="price" slot-scope="text">
          {{ text | numberFormat }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <router-link :to="{path:'/admin/order/detail/'+record.orderId}">{{ $t('order.list.operation.detail') }}</router-link>
            <a-divider v-if="record.status === 0 || record.status === 1 || record.status === 2" type="vertical" />
            <a-popconfirm v-if="record.status === 1" :title="$t('order.list.operation.cancel')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="cancelOrder(record.orderId)">
              <a>{{ $t('order.list.operation.cancel') }}</a>
            </a-popconfirm>
            <a-popconfirm v-if="record.status === 0 || record.status === 2" :title="$t('order.list.operation.confirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="confirmOrder(record.orderId)">
              <a>{{ $t('order.list.operation.confirm') }}</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getOrder, deleteOrderById, cancelOrder, confirmOrder } from '@/api/order'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      orderColumns: [
        {
          title: '#',
          align: 'center',
          dataIndex: 'orderId'
        },
        {
          title: this.$i18n.t('order.list.user'),
          align: 'center',
          dataIndex: 'userId',
          scopedSlots: { customRender: 'userId' }
        },
        {
          title: this.$i18n.t('order.list.name'),
          align: 'center',
          dataIndex: this.$i18n.locale === 'zh-CN' ? 'planDetailsMap.name' : 'planDetailsMap.nameEnglish'
        },
        {
          title: this.$i18n.t('order.list.price'),
          align: 'center',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: this.$i18n.t('order.list.created'),
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: this.$i18n.t('order.list.expire'),
          align: 'center',
          dataIndex: 'expire'
        },
        {
          title: this.$i18n.t('order.list.payTime'),
          align: 'center',
          dataIndex: 'payTime'
        },
        {
          title: this.$i18n.t('order.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        status: 1
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getOrder(requestParameters)
          .then(res => {
            this.totalCount = res.data.totalCount
            return res.data
          })
      },
      totalCount: 0
    }
  },
  watch: {
    '$i18n.locale' () {
      this.orderColumns = [
        {
          title: '#',
          align: 'center',
          dataIndex: 'orderId'
        },
        {
          title: this.$i18n.t('order.list.name'),
          align: 'center',
          dataIndex: this.$i18n.locale === 'zh-CN' ? 'planDetailsMap.name' : 'planDetailsMap.nameEnglish'
        },
        {
          title: this.$i18n.t('order.list.price'),
          align: 'center',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: this.$i18n.t('order.list.created'),
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: this.$i18n.t('order.list.expire'),
          align: 'center',
          dataIndex: 'expire'
        },
        {
          title: this.$i18n.t('order.list.payTime'),
          align: 'center',
          dataIndex: 'payTime'
        },
        {
          title: this.$i18n.t('order.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    handleSelectStatus (val) {
      this.queryParam.status = val
    },
    async deleteOrderById (id) {
      const result = await deleteOrderById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async cancelOrder (id) {
      const result = await cancelOrder(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async confirmOrder (id) {
      const result = await confirmOrder(id)
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
