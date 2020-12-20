<template>
  <page-header-wrapper :breadcrumb="{}">
    <a-card :bordered="false">
      <div>
        <div>
          <a-button type="primary" style="margin-bottom: 10px" @click="openAddDrawer">{{ $i18n.t('setting.add') }}</a-button>
          <a-drawer
            :title="this.$i18n.t('plan.list.add')"
            placement="right"
            width="60%"
            :visible="addDrawer"
            :destroyOnClose="true"
            @close="onClose"
          >
            <a-form layout="vertical">
              <a-form-item :label="$t('plan.list.name')">
                <a-input v-model="newPlan.name"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.nameEnglish')">
                <a-input v-model="newPlan.nameEnglish"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.price')">
                <a-input v-model="newPlan.price" :placeholder="$i18n.locale === 'zh-CN' ? '使用-分割' : 'split with -'"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.months')">
                <a-input v-model="newPlan.months" :placeholder="$i18n.locale === 'zh-CN' ? '使用-分割' : 'split with -'"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.clazz')">
                <a-input v-model="newPlan.clazz"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.transferEnable')">
                <a-input v-model="newPlan.transferEnableGb"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.package')">
                <a-input v-model="newPlan.packageGb" :placeholder="$i18n.locale === 'zh-CN' ? '等于0不开放购买流量包' : 'Disable purchase package when setup 0'"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.nodeConnector')">
                <a-input v-model="newPlan.nodeConnector"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.nodeSpeedlimit')">
                <a-input v-model="newPlan.nodeSpeedlimit"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.nodeGroup')">
                <a-input v-model="newPlan.nodeGroup"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.buyLimit')">
                <a-input v-model="newPlan.buyLimit" :placeholder="$i18n.locale === 'zh-CN' ? '小于0不限制' : 'less than 0 is no limit'"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.isDiscount')">
                <a-switch v-model="newPlan.isDiscount">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item :label="$t('plan.list.discountStart')">
                <a-input v-model="newPlan.discountStart" placeholder="yyyy-MM-dd HH:mm:ss"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.discountEnd')">
                <a-input v-model="newPlan.discountEnd" placeholder="yyyy-MM-dd HH:mm:ss"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.sort')">
                <a-input v-model="newPlan.sort"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.extraInfo')">
                <a-input v-model="newPlan.extraInfo" :placeholder="$i18n.locale === 'zh-CN' ? '使用 ; 分割' : 'split with ; '"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.extraInfoEnglish')">
                <a-input v-model="newPlan.extraInfoEnglish" :placeholder="$i18n.locale === 'zh-CN' ? '使用 ; 分割' : 'split with ; '"></a-input>
              </a-form-item>
              <a-form-item :label="$t('plan.list.enableRenew')" style="display: inline-block; margin-right: 20px">
                <a-switch v-model="newPlan.enableRenew">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item :label="$t('plan.list.supportMedia')" style="display: inline-block; margin-right: 20px">
                <a-switch v-model="newPlan.supportMedia">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item :label="$t('plan.list.supportDirectLine')" style="display: inline-block; margin-right: 20px">
                <a-switch v-model="newPlan.supportDirectline">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item :label="$t('plan.list.enable')" style="display: inline-block; margin-right: 20px">
                <a-switch v-model="newPlan.enable">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" block @click="addPlan">{{ $i18n.t('setting.add') }}</a-button>
              </a-form-item>
            </a-form>
          </a-drawer>
        </div>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table ref="table" size="default" rowKey="id" :columns="nodeColumns" :data="loadPlanData">
            <span slot="name" slot-scope="text, record">
              {{ $i18n.locale === 'zh-CN' ? record.name : record.nameEnglish }}
            </span>
            <span slot="enable" slot-scope="text">
              <a-badge v-if="text === true" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text === true ? '启用' : '禁用' }}
              </span>
              <span v-else>
                {{ text === true ? 'Enable' : 'Disable' }}
              </span>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="openEditDrawer(record)">{{ $t('setting.change') }}</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deletePlanById(record.id)">
                  <a>{{ $t('setting.delete') }}</a>
                </a-popconfirm>
              </template>
            </span>
          </s-table>
        </a-card>
        <a-drawer
          :title="this.$i18n.t('node.list.editNode')"
          placement="right"
          width="60%"
          :visible="editDrawer"
          @close="editOnClose"
        >
          <a-form layout="vertical">
            <a-form-item :label="$t('plan.list.name')">
              <a-input v-model="editOldPlan.name"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.nameEnglish')">
              <a-input v-model="editOldPlan.nameEnglish"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.price')">
              <a-input v-model="editOldPlan.price" :placeholder="$i18n.locale === 'zh-CN' ? '使用-分割' : 'split with -'"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.months')">
              <a-input v-model="editOldPlan.months" :placeholder="$i18n.locale === 'zh-CN' ? '使用-分割' : 'split with -'"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.clazz')">
              <a-input v-model="editOldPlan.clazz"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.transferEnable')">
              <a-input v-model="editOldPlan.transferEnableGb"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.package')">
              <a-input v-model="editOldPlan.packageGb" :placeholder="$i18n.locale === 'zh-CN' ? '等于0不开放购买流量包' : 'Disable purchase package when setup 0'"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.nodeConnector')">
              <a-input v-model="editOldPlan.nodeConnector"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.nodeSpeedlimit')">
              <a-input v-model="editOldPlan.nodeSpeedlimit"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.nodeGroup')">
              <a-input v-model="editOldPlan.nodeGroup"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.buyLimit')">
              <a-input v-model="editOldPlan.buyLimit" :placeholder="$i18n.locale === 'zh-CN' ? '小于0不限制' : 'less than 0 is no limit'"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.isDiscount')">
              <a-switch v-model="editOldPlan.isDiscount">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item :label="$t('plan.list.discountStart')">
              <a-input v-model="editOldPlan.discountStart" placeholder="yyyy-MM-dd HH:mm:ss"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.discountEnd')">
              <a-input v-model="editOldPlan.discountEnd" placeholder="yyyy-MM-dd HH:mm:ss"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.sort')">
              <a-input v-model="editOldPlan.sort"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.extraInfo')">
              <a-input v-model="editOldPlan.extraInfo" :placeholder="$i18n.locale === 'zh-CN' ? '使用 ; 分割' : 'split with ; '"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.extraInfoEnglish')">
              <a-input v-model="editOldPlan.extraInfoEnglish" :placeholder="$i18n.locale === 'zh-CN' ? '使用 ; 分割' : 'split with ; '"></a-input>
            </a-form-item>
            <a-form-item :label="$t('plan.list.enableRenew')" style="display: inline-block; margin-right: 20px">
              <a-switch v-model="editOldPlan.enableRenew">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item :label="$t('plan.list.supportMedia')" style="display: inline-block; margin-right: 20px">
              <a-switch v-model="editOldPlan.supportMedia">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item :label="$t('plan.list.supportDirectLine')" style="display: inline-block; margin-right: 20px">
              <a-switch v-model="editOldPlan.supportDirectline">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item :label="$t('plan.list.enable')" style="display: inline-block; margin-right: 20px">
              <a-switch v-model="editOldPlan.enable">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block @click="updatePlanById">{{ $i18n.t('setting.change') }}</a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getPlan, addPlan, updatePlanById, deletePlanById } from '@/api/plan'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      addDrawer: false,
      editDrawer: false,
      newPlan: {},
      editOldPlan: {},
      nodeColumns: [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('plan.list.name'),
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: this.$i18n.t('plan.list.price'),
          align: 'center',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: this.$i18n.t('plan.list.months'),
          align: 'center',
          dataIndex: 'months',
          scopedSlots: { customRender: 'months' }
        },
        {
          title: this.$i18n.t('plan.list.transferEnable'),
          align: 'center',
          dataIndex: 'transferEnableGb'
        },
        {
          title: this.$i18n.t('plan.list.package'),
          align: 'center',
          dataIndex: 'packageGb'
        },
        {
          title: this.$i18n.t('plan.list.clazz'),
          align: 'center',
          dataIndex: 'clazz',
          scopedSlots: { customRender: 'class' }
        },
        {
          title: this.$i18n.t('plan.list.enable'),
          align: 'center',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'enable' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadPlanData: parameter => {
        return getPlan(Object.assign(parameter))
          .then(res => {
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
          title: this.$i18n.t('plan.list.name'),
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: this.$i18n.t('plan.list.price'),
          align: 'center',
          dataIndex: 'price',
          scopedSlots: { customRender: 'price' }
        },
        {
          title: this.$i18n.t('plan.list.months'),
          align: 'center',
          dataIndex: 'months',
          scopedSlots: { customRender: 'months' }
        },
        {
          title: this.$i18n.t('plan.list.transferEnable'),
          align: 'center',
          dataIndex: 'transferEnableGb'
        },
        {
          title: this.$i18n.t('plan.list.package'),
          align: 'center',
          dataIndex: 'packageGb'
        },
        {
          title: this.$i18n.t('plan.list.clazz'),
          align: 'center',
          dataIndex: 'clazz',
          scopedSlots: { customRender: 'class' }
        },
        {
          title: this.$i18n.t('plan.list.enable'),
          align: 'center',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'enable' }
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
    openAddDrawer () {
      this.addDrawer = true
    },
    openEditDrawer (value) {
      this.editOldPlan = JSON.parse(JSON.stringify(value))
      this.editDrawer = true
    },
    onClose () {
      this.newPlan = {}
      this.addDrawer = false
    },
    editOnClose () {
      this.editOldPlan = {}
      this.editDrawer = false
    },
    async addPlan () {
      const result = await addPlan(this.newPlan)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async updatePlanById () {
      const result = await updatePlanById(this.editOldPlan)
      if (result.code === 200) {
        this.editDrawer = false
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async deletePlanById (id) {
      const result = await deletePlanById(id)
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
