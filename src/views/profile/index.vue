<template>
  <div class="app-container">

    <el-button type="primary" @click="handleChangePassword()">change password</el-button>

    <hr>

    <!--个人信息表-->
    <h3>profile</h3>
    <el-form ref="profileForm" :loading="listLoading" :model="principal" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="id: ">
        <span>{{ principal.id }}</span>
      </el-form-item>
      <el-form-item label="username: ">
        <span>{{ principal.username }}</span>
      </el-form-item>
      <el-form-item label="name: ">
        <span>{{ principal.name }}</span>
      </el-form-item>
      <el-form-item label="corp: ">
        <span>{{ principal.corp }}</span>
      </el-form-item>
      <el-form-item label="phone: ">
        <span>{{ principal.phone }}</span>
      </el-form-item>
      <el-form-item label="email: ">
        <span>{{ principal.email }}</span>
      </el-form-item>
      <el-form-item label="sex: ">
        <span>{{ principal.sex?'male':'female' }}</span>
      </el-form-item>
      <el-form-item label="role: ">
        <span v-for="item in principal.roles" :key="item.id">{{ item.name }}</span>
      </el-form-item>
      <el-form-item label="Permission" prop="permission">
        <el-tree
          ref="tree"
          :data="listPermissionTree"
          show-checkbox
          default-expand-all
          :default-checked-keys="checkedPermissionList"
          node-key="id"
          highlight-current
          :props="myProps"
        />
      </el-form-item>
    </el-form>

    <!--修改密码对话框-->
    <el-dialog title="change password" :visible.sync="changePasswordDialogVisible">
      <el-form ref="passwordForm" :rules="changePasswordRules" :model="passwordTemp" label-position="right" label-width="180px" style="width: 400px; margin-left:50px;">
        <el-form-item label="oldPassword" prop="oldPassword">
          <el-input v-model="passwordTemp.oldPassword" type="password" clearable />
        </el-form-item>
        <el-form-item label="newPassword" prop="newPassword">
          <el-input v-model="passwordTemp.newPassword" type="password" clearable />
        </el-form-item>
        <el-form-item label="rePassword" prop="rePassword">
          <el-input v-model="passwordTemp.rePassword" type="password" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changePassword()">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changeUserPasswordById } from '../../api/user'
import { getAllPermissionTree } from '../../api/permission'

export default {
  name: 'Logistics',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length && /^\w{4,18}$/.test(value)) {
        callback()
      } else {
        callback(new Error('limit: a-z, A-Z, 0-9, _  length: 4-18'))
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('rePassword is required'))
      } else if (value !== this.passwordTemp.newPassword) {
        callback(new Error('newPassword & rePassword is not same'))
      } else {
        callback()
      }
    }
    return {
      passwordTemp: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      myProps: {
        label: 'name',
        children: 'children'
      },
      checkedPermissionList: [],
      listPermissionTree: [],
      listLoading: false,
      changePasswordDialogVisible: false,
      permissionDialogVisible: false,
      changePasswordRules: {
        oldPassword: [{ validator: validatePassword, trigger: 'blur' }],
        newPassword: [{ validator: validatePassword, trigger: 'blur' }],
        rePassword: [{ validator: validateRePassword, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters({
      principal: 'principal'
    })
  },
  created() {
    this.getTree()
    this.checkedPermissionList = this.principal.permissions.map(per => per.id)
  },
  methods: {
    getTree() {
      this.listLoading = true
      getAllPermissionTree().then(response => {
        this.listPermissionTree = response.data
        this.listLoading = false
      })
    },
    handleChangePassword() {
      this.passwordTemp = {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      }
      this.changePasswordDialogVisible = true
      this.$nextTick(() => {
        this.$refs['passwordForm'].clearValidate()
      })
    },
    changePassword() {
      const oldPassword = this.passwordTemp.oldPassword
      const newPassword = this.passwordTemp.newPassword
      changeUserPasswordById(this.principal.id, { oldPassword, newPassword }).then(() => {
        this.$message.success('change password successfully!\nyou need to login again!')
        this.logout()
      })
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
