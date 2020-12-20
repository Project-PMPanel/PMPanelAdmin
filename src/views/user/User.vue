<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-card :bordered="false">
      <div>
        <div class="table-page-search-wrapper">
          <a-form layout="vertical">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="ID">
                  <a-input v-model="queryParam.id" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item :label="$i18n.t('user.list.email')">
                  <a-input v-model="queryParam.email" placeholder=""/>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item :label="$i18n.t('user.list.clazz')">
                    <a-input v-model="queryParam.clazz"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item :label="$i18n.t('user.list.expire')">
                    <a-date-picker v-model="queryParam.expire" style="width: 100%" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item :label="$i18n.t('user.list.role')">
                    <a-select v-model="queryParam.role">
                      <a-select-option value="0"> {{ $i18n.t('user.list.role.user') }} </a-select-option>
                      <a-select-option value="1"> {{ $i18n.t('user.list.role.admin') }} </a-select-option>
                      <a-select-option value="2"> {{ $i18n.t('user.list.role.customerService') }} </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item :label="$i18n.t('user.list.status')">
                    <a-select v-model="queryParam.enable">
                      <a-select-option value="0"> {{ $i18n.t('user.list.status.disable') }} </a-select-option>
                      <a-select-option value="1"> {{ $i18n.t('user.list.status.enable') }} </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || { marginTop: '29px' } ">
                  <a-button type="primary" @click="$refs.table.refresh(true)"> {{ $i18n.t('setting.select') }} </a-button>
                  <a-button style="margin-left: 8px" @click="() => this.queryParam = {}"> {{ $i18n.t('setting.reset') }} </a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    <span v-if="$i18n.locale === 'zh-CN'">
                      {{ advanced ? '收起' : '展开' }}
                    </span>
                    <span v-else>
                      {{ advanced ? 'Close' : 'Open' }}
                    </span>
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <div style="background-color: #e6f7ff;border: 1px solid #91d5ff;padding: 8px 15px 8px 15px;">
          <a-icon theme="filled" type="info-circle" style="color: #1890ff;margin-right: 5px"/>
          <span style="margin-right: 12px">{{ $i18n.locale === 'zh-CN' ? '查询总数' : 'Count' }}: <a style="font-weight: 600">{{ totalCount }}</a></span>
        </div>

        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="userColumns"
          :data="loadUserData"
          showPagination="auto"
        >
          <span slot="money" slot-scope="text">
            {{ text | numberFormat }}
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleDetail(record.id)">{{ $i18n.t('user.list.detail') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="handleDelete(record.id)">
                <a>{{ $i18n.t('user.list.delete') }}</a>
              </a-popconfirm>
            </template>
          </span>
        </s-table>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import moment from 'moment'
import { getUser, deleteUserById } from '@/api/user'

export default {
  name: 'User',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      userColumns: [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('user.list.email'),
          align: 'center',
          dataIndex: 'email'
        },
        {
          title: this.$i18n.t('user.list.group'),
          align: 'center',
          dataIndex: 'nodeGroup'
        },
        {
          title: this.$i18n.t('user.list.clazz'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('user.list.expire'),
          align: 'center',
          dataIndex: 'expireIn'
        },
        {
          title: this.$i18n.t('user.list.money'),
          align: 'center',
          dataIndex: 'money',
          scopedSlots: { customRender: 'money' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadUserData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getUser(requestParameters)
          .then(res => {
            this.totalCount = res.totalCount
            return res
          })
      },
      totalCount: 0
    }
  },
  watch: {
    '$i18n.locale' () {
      this.userColumns = [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('user.list.email'),
          align: 'center',
          dataIndex: 'email'
        },
        {
          title: this.$i18n.t('user.list.group'),
          align: 'center',
          dataIndex: 'nodeGroup'
        },
        {
          title: this.$i18n.t('user.list.clazz'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('user.list.expire'),
          align: 'center',
          dataIndex: 'expireIn'
        },
        {
          title: this.$i18n.t('user.list.money'),
          align: 'center',
          dataIndex: 'money',
          scopedSlots: { customRender: 'money' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleDetail (id) {
      console.log(id)
      this.$router.push('/admin/user/' + id)
    },
    async handleDelete (id) {
      console.log(id)
      const result = await deleteUserById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style scoped>

</style>
