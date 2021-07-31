<template>
  <div>
    <a-tabs default-active-key="1" type="card" @change="callback">
      <a-tab-pane key="1" tab="Shadowsocks">
        <div>
          <a-button type="primary" style="margin-bottom: 10px" @click="openAddSsDrawer">{{ $i18n.t('setting.add') }}</a-button>
          <a-drawer
            :title="this.$i18n.t('node.list.addNode')"
            placement="right"
            width="60%"
            :visible="addSsDrawer"
            @close="onSsDrawerClose"
          >
            <a-form layout="vertical">
              <a-form-item :label="$t('node.list.name')">
                <a-input v-model="newSsNode.name"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.outServer')">
                <a-input v-model="newSsNode.outServer"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.outPort')">
                <a-input v-model="newSsNode.outPort"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.subServer')">
                <a-input v-model="newSsNode.subServer"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.subPort')">
                <a-input v-model="newSsNode.subPort"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.method')">
                <a-select :value="newSsNode.method" @change="handleSelectMethod">
                  <a-select-option value="aes-128-gcm">aes-128-gcm</a-select-option>
                  <a-select-option value="aes-192-gcm">aes-192-gcm</a-select-option>
                  <a-select-option value="aes-256-gcm">aes-256-gcm</a-select-option>
                  <a-select-option value="chacha20-ietf-poly1305">chacha20-ietf-poly1305</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('node.list.trafficRate')">
                <a-input v-model="newSsNode.trafficRate"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.class')">
                <a-input v-model="newSsNode.clazz"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.speedlimit')">
                <a-input v-model="newSsNode.speedlimit"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.flag')">
                <a-switch v-model="newSsNode.flag">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" block @click="addSsNode">{{ $i18n.t('setting.add') }}</a-button>
              </a-form-item>
            </a-form>
          </a-drawer>
        </div>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table ref="ss_table" size="default" rowKey="id" :columns="ssColumns" :data="loadSsNode">
            <span slot="flag" slot-scope="text">
              <a-badge v-if="text === true" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text === true ? '启用' : '停用' }}
              </span>
              <span v-else>
                {{ text === true ? 'Enable' : 'Disable' }}
              </span>
            </span>
            <span slot="heartbeat" slot-scope="text">
              <a-badge v-if="text > (Date.parse(new Date())/1000 - 90)" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text > (Date.parse(new Date())/1000 - 120) ? '在线' : '离线' }}
              </span>
              <span v-else>
                {{ text > (Date.parse(new Date())/1000 - 120) ? 'Online' : 'Offline' }}
              </span>
            </span>
            <span slot="online" slot-scope="text, record">
              <span v-if="text === 0">
                {{ text }}
              </span>
              <span v-else>
                <router-link :to="{path: '/admin/node/online/' + record.id}">{{ text }}</router-link>
              </span>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="openEditSsDrawer(record)">{{ $t('setting.change') }}</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeByTypeAndId('ss', record.id)">
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
          :visible="editSsDrawer"
          @close="editOnSsDrawerClose"
        >
          <a-form layout="vertical">
            <a-form-item :label="$t('node.list.name')">
              <a-input v-model="editOldSsNode.name"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.outServer')">
              <a-input v-model="editOldSsNode.outServer"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.outPort')">
              <a-input v-model="editOldSsNode.outPort"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.subServer')">
              <a-input v-model="editOldSsNode.subServer"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.subPort')">
              <a-input v-model="editOldSsNode.subPort"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.method')">
              <a-select :value="editOldSsNode.method" @change="handleSelectEditMethod">
                <a-select-option value="aes-128-gcm">aes-128-gcm</a-select-option>
                <a-select-option value="aes-192-gcm">aes-192-gcm</a-select-option>
                <a-select-option value="aes-256-gcm">aes-256-gcm</a-select-option>
                <a-select-option value="chacha20-ietf-poly1305">chacha20-ietf-poly1305</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('node.list.trafficRate')">
              <a-input v-model="editOldSsNode.trafficRate"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.class')">
              <a-input v-model="editOldSsNode.clazz"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.speedlimit')">
              <a-input v-model="editOldSsNode.speedlimit"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.flag')">
              <a-switch v-model="editOldSsNode.flag">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block @click="submitEditSsNode">{{ $i18n.t('setting.change') }}</a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </a-tab-pane>
      <a-tab-pane key="2" tab="V2ray">
        <div>
          <a-button type="primary" style="margin-bottom: 10px" @click="openAddV2rayDrawer">{{ $i18n.t('setting.add') }}</a-button>
          <a-drawer
            :title="this.$i18n.t('node.list.addNode')"
            placement="right"
            width="60%"
            :visible="addV2rayDrawer"
            @close="onV2rayDrawerClose"
          >
            <a-form layout="vertical">
              <a-form-item :label="$t('node.list.name')">
                <a-input v-model="newV2rayNode.name"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.outServer')">
                <a-input v-model="newV2rayNode.outServer"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.outPort')">
                <a-input v-model="newV2rayNode.outPort"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.alterId')">
                <a-input v-model="newV2rayNode.alterId"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.network')">
                <a-select :value="newV2rayNode.network" @change="handleSelectNetwork">
                  <a-select-option value="tcp">tcp</a-select-option>
                  <a-select-option value="ws">ws</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('node.list.security')">
                <a-select :value="newV2rayNode.security" @change="handleSelectSecurity">
                  <a-select-option value="none">none</a-select-option>
                  <a-select-option value="tls">tls</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('node.list.host')">
                <a-input v-model="newV2rayNode.host"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.path')">
                <a-input v-model="newV2rayNode.path"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.subServer')">
                <a-input v-model="newV2rayNode.subServer"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.subPort')">
                <a-input v-model="newV2rayNode.subPort"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.sni')">
                <a-input v-model="newV2rayNode.sni"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.trafficRate')">
                <a-input v-model="newV2rayNode.trafficRate"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.class')">
                <a-input v-model="newV2rayNode.clazz"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.speedlimit')">
                <a-input v-model="newV2rayNode.speedlimit"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.flag')">
                <a-switch v-model="newV2rayNode.flag">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" block @click="addV2rayNode">{{ $i18n.t('setting.add') }}</a-button>
              </a-form-item>
            </a-form>
          </a-drawer>
        </div>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table ref="v2ray_table" size="default" rowKey="id" :columns="v2rayColumns" :data="loadV2rayNode">
            <span slot="flag" slot-scope="text">
              <a-badge v-if="text === true" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text === true ? '启用' : '停用' }}
              </span>
              <span v-else>
                {{ text === true ? 'Enable' : 'Disable' }}
              </span>
            </span>
            <span slot="heartbeat" slot-scope="text">
              <a-badge v-if="text > (Date.parse(new Date())/1000 - 90)" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text > (Date.parse(new Date())/1000 - 120) ? '在线' : '离线' }}
              </span>
              <span v-else>
                {{ text > (Date.parse(new Date())/1000 - 120) ? 'Online' : 'Offline' }}
              </span>
            </span>
            <span slot="online" slot-scope="text, record">
              <span v-if="text === 0">
                {{ text }}
              </span>
              <span v-else>
                <router-link :to="{path: '/admin/node/online/' + record.id}">{{ text }}</router-link>
              </span>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="openEditV2rayDrawer(record)">{{ $t('setting.change') }}</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeByTypeAndId('v2ray', record.id)">
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
          :visible="editV2rayDrawer"
          @close="editOnV2rayDrawerClose"
        >
          <a-form layout="vertical">
            <a-form-item :label="$t('node.list.name')">
              <a-input v-model="editOldV2rayNode.name"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.outServer')">
              <a-input v-model="editOldV2rayNode.outServer"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.outPort')">
              <a-input v-model="editOldV2rayNode.outPort"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.alterId')">
              <a-input v-model="editOldV2rayNode.alterId"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.network')">
              <a-select :value="editOldV2rayNode.network" @change="handleSelectEditNetwork">
                <a-select-option value="tcp">tcp</a-select-option>
                <a-select-option value="ws">ws</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('node.list.security')">
              <a-select :value="editOldV2rayNode.security" @change="handleSelectEditSecurity">
                <a-select-option value="none">none</a-select-option>
                <a-select-option value="tls">tls</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('node.list.host')">
              <a-input v-model="editOldV2rayNode.host"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.path')">
              <a-input v-model="editOldV2rayNode.path"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.subServer')">
              <a-input v-model="editOldV2rayNode.subServer"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.subPort')">
              <a-input v-model="editOldV2rayNode.subPort"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.sni')">
              <a-input v-model="editOldV2rayNode.sni"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.trafficRate')">
              <a-input v-model="editOldV2rayNode.trafficRate"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.class')">
              <a-input v-model="editOldV2rayNode.clazz"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.speedlimit')">
              <a-input v-model="editOldV2rayNode.speedlimit"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.flag')">
              <a-switch v-model="editOldV2rayNode.flag">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block @click="submitEditV2rayNode">{{ $i18n.t('setting.change') }}</a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Trojan">
        <div>
          <a-button type="primary" style="margin-bottom: 10px" @click="openAddTrojanDrawer">{{ $i18n.t('setting.add') }}</a-button>
          <a-drawer
            :title="this.$i18n.t('node.list.addNode')"
            placement="right"
            width="60%"
            :visible="addTrojanDrawer"
            @close="onTrojanDrawerClose"
          >
            <a-form layout="vertical">
              <a-form-item :label="$t('node.list.name')">
                <a-input v-model="newTrojanNode.name"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.outServer')">
                <a-input v-model="newTrojanNode.outServer"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.outPort')">
                <a-input v-model="newTrojanNode.outPort"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.subServer')">
                <a-input v-model="newTrojanNode.subServer"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.subPort')">
                <a-input v-model="newTrojanNode.subPort"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.grpc')">
                <a-switch v-model="newTrojanNode.grpc">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item :label="$t('node.list.trafficRate')">
                <a-input v-model="newTrojanNode.trafficRate"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.class')">
                <a-input v-model="newTrojanNode.clazz"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.speedlimit')">
                <a-input v-model="newTrojanNode.speedlimit"/>
              </a-form-item>
              <a-form-item :label="$t('node.list.flag')">
                <a-switch v-model="newTrojanNode.flag">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" block @click="addTrojanNode">{{ $i18n.t('setting.add') }}</a-button>
              </a-form-item>
            </a-form>
          </a-drawer>
        </div>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table ref="trojan_table" size="default" rowKey="id" :columns="trojanColumns" :data="loadTrojanNode">
            <span slot="grpc" slot-scope="text">
              <a-badge v-if="text === true" status="success" />
              <a-badge v-else status="error" />
              {{ text === true ? '启用' : '停用' }}
            </span>
            <span slot="flag" slot-scope="text">
              <a-badge v-if="text === true" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text === true ? '启用' : '停用' }}
              </span>
              <span v-else>
                {{ text === true ? 'Enable' : 'Disable' }}
              </span>
            </span>
            <span slot="heartbeat" slot-scope="text">
              <a-badge v-if="text > (Date.parse(new Date())/1000 - 90)" status="success" />
              <a-badge v-else status="error" />
              <span v-if="$i18n.locale === 'zh-CN'">
                {{ text > (Date.parse(new Date())/1000 - 120) ? '在线' : '离线' }}
              </span>
              <span v-else>
                {{ text > (Date.parse(new Date())/1000 - 120) ? 'Online' : 'Offline' }}
              </span>
            </span>
            <span slot="online" slot-scope="text, record">
              <span v-if="text === 0">
                {{ text }}
              </span>
              <span v-else>
                <router-link :to="{path: '/admin/node/online/' + record.id}">{{ text }}</router-link>
              </span>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="openEditTrojanDrawer(record)">{{ $t('setting.change') }}</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeByTypeAndId('trojan', record.id)">
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
          :visible="editTrojanDrawer"
          @close="editOnTrojanDrawerClose"
        >
          <a-form layout="vertical">
            <a-form-item :label="$t('node.list.name')">
              <a-input v-model="editOldTrojanNode.name"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.outServer')">
              <a-input v-model="editOldTrojanNode.outServer"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.outPort')">
              <a-input v-model="editOldTrojanNode.outPort"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.subServer')">
              <a-input v-model="editOldTrojanNode.subServer"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.subPort')">
              <a-input v-model="editOldTrojanNode.subPort"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.grpc')">
              <a-switch v-model="editOldTrojanNode.grpc">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item :label="$t('node.list.trafficRate')">
              <a-input v-model="editOldTrojanNode.trafficRate"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.class')">
              <a-input v-model="editOldTrojanNode.clazz"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.speedlimit')">
              <a-input v-model="editOldTrojanNode.speedlimit"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.flag')">
              <a-switch v-model="editOldTrojanNode.flag">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block @click="submitEditTrojanNode">{{ $i18n.t('setting.change') }}</a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {
  getSsNode,
  addSsNode,
  submitEditSsNode,
  getV2rayNode,
  addV2rayNode,
  submitEditV2rayNode,
  getTrojanNode,
  addTrojanNode,
  submitEditTrojanNode,
  deleteNodeByTypeAndId
} from '@/api/node'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      // ss
      addSsDrawer: false,
      editSsDrawer: false,
      newSsNode: {
        method: 'aes-256-gcm'
      },
      editOldSsNode: {
        method: 'aes-256-gcm'
      },
      ssColumns: [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.method'),
          align: 'center',
          dataIndex: 'method'
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadSsNode: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getSsNode(Object.assign(requestParameters))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      },
      // v2ray
      addV2rayDrawer: false,
      editV2rayDrawer: false,
      newV2rayNode: {
        network: 'ws',
        security: 'none'
      },
      editOldV2rayNode: {
        network: 'ws',
        security: 'none'
      },
      v2rayColumns: [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.network'),
          align: 'center',
          dataIndex: 'network'
        },
        {
          title: this.$i18n.t('node.list.security'),
          align: 'center',
          dataIndex: 'security'
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadV2rayNode: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getV2rayNode(Object.assign(requestParameters))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      },
      // trojan
      addTrojanDrawer: false,
      editTrojanDrawer: false,
      newTrojanNode: {},
      editOldTrojanNode: {},
      trojanColumns: [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.grpc'),
          align: 'center',
          dataIndex: 'grpc',
          scopedSlots: { customRender: 'grpc' }
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadTrojanNode: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getTrojanNode(Object.assign(requestParameters))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.ssColumns = [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.method'),
          align: 'center',
          dataIndex: 'method'
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
      this.v2rayColumns = [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.network'),
          align: 'center',
          dataIndex: 'network'
        },
        {
          title: this.$i18n.t('node.list.security'),
          align: 'center',
          dataIndex: 'security'
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.online'),
          align: 'center',
          dataIndex: 'online',
          scopedSlots: { customRender: 'online' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
      this.trojanColumns = [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.grpc'),
          align: 'center',
          dataIndex: 'grpc',
          scopedSlots: { customRender: 'grpc' }
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
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
    callback (key) {
      console.log(key)
      // TODO 去查询节点列表
      switch (key) {
        case 1:
          break
        case 2:
          break
        case 3:
          break
      }
    },
    // ss
    openAddSsDrawer () {
      this.addSsDrawer = true
    },
    openEditSsDrawer (value) {
      this.editOldSsNode = JSON.parse(JSON.stringify(value))
      this.editSsDrawer = true
    },
    onSsDrawerClose () {
      this.addSsDrawer = false
      this.newSsNode = {}
    },
    editOnSsDrawerClose () {
      this.editSsDrawer = false
      this.editOldSsNode = {}
    },
    handleSelectMethod (value) {
      console.log(value)
      this.newSsNode.method = value
    },
    handleSelectEditMethod (value) {
      console.log(value)
      this.editOldSsNode.method = value
    },
    async addSsNode () {
      const result = await addSsNode(this.newSsNode)
      if (result.code === 200) {
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addSsDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async submitEditSsNode () {
      const result = await submitEditSsNode(this.editOldSsNode)
      if (result.code === 200) {
        this.editSsDrawer = false
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    // v2ray
    openAddV2rayDrawer () {
      this.addV2rayDrawer = true
    },
    openEditV2rayDrawer (value) {
      this.editOldV2rayNode = JSON.parse(JSON.stringify(value))
      this.editV2rayDrawer = true
    },
    onV2rayDrawerClose () {
      this.addV2rayDrawer = false
      this.newV2rayNode = {}
    },
    editOnV2rayDrawerClose () {
      this.editV2rayDrawer = false
      this.editOldV2rayNode = {
        network: 'ws',
        security: 'none'
      }
    },
    handleSelectNetwork (value) {
      console.log(value)
      this.newV2rayNode.network = value
    },
    handleSelectSecurity (value) {
      console.log(value)
      this.newV2rayNode.security = value
    },
    handleSelectEditNetwork (value) {
      console.log(value)
      this.editOldV2rayNode.network = value
    },
    handleSelectEditSecurity (value) {
      console.log(value)
      this.editOldV2rayNode.security = value
    },
    async addV2rayNode () {
      const result = await addV2rayNode(this.newV2rayNode)
      if (result.code === 200) {
        this.$refs.v2ray_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addV2rayDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async submitEditV2rayNode () {
      const result = await submitEditV2rayNode(this.editOldV2rayNode)
      if (result.code === 200) {
        this.editV2rayDrawer = false
        this.$refs.v2ray_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    // trojan
    openAddTrojanDrawer () {
      this.addTrojanDrawer = true
    },
    openEditTrojanDrawer (value) {
      this.editOldTrojanNode = JSON.parse(JSON.stringify(value))
      this.editTrojanDrawer = true
    },
    onTrojanDrawerClose () {
      this.addTrojanDrawer = false
      this.newTrojanNode = {}
    },
    editOnTrojanDrawerClose () {
      this.editTrojanDrawer = false
      this.editOldTrojanNode = {}
    },
    async addTrojanNode () {
      const result = await addTrojanNode(this.newTrojanNode)
      if (result.code === 200) {
        this.$refs.trojan_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addTrojanDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async submitEditTrojanNode () {
      const result = await submitEditTrojanNode(this.editOldTrojanNode)
      if (result.code === 200) {
        this.editTrojanDrawer = false
        this.$refs.trojan_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    // common delete
    async deleteNodeByTypeAndId (type, id) {
      const result = await deleteNodeByTypeAndId(type, id)
      if (result.code === 200) {
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$refs.v2ray_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$refs.trojan_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
