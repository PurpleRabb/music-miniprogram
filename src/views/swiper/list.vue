<template>
  <div>
      <el-table v-loading="loading" :data="swiperList" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50" />
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { fetchList } from '@/api/swiper'
export default {
  data() {
    return {
      swiperList: [],
      loading: false
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.loading = true
      fetchList().then((res) => {
        console.log(res)
        this.swiperList = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>