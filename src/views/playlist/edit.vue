<template>
  <div>
    <el-form ref="form" :model="playinfo" label-width="80px">
      <el-form-item label="歌单名称">
        <el-input v-model="playinfo.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="playinfo.copywriter"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchById,update } from "@/api/playlist";
export default {
  data() {
    return {
      playinfo: {},
    };
  },

  created() {
    fetchById({
      id: this.$route.params.id,
    }).then((res) => {
      this.playinfo = res.data
      console.log(this.playinfo)
    });
  },

  methods: {
      onSubmit() {
          update(this.playinfo).then((res)=> {
              if (res.data.modified > 0) {
                  this.$message( {
                    message: '更新成功',
                    type: 'success'
                  })
                  this.$route.push('/playlist/list')
              } else {
                this.$message.error('更新失败')
              }
          })
      },
      onCancel() {}
  },
};
</script>

<style>
</style>