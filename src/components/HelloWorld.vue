<template>
  <div class="hello">
    <h2>{{dataName}}</h2>
    <router-link to="/user">去往信息页</router-link>
    <p>使用vuex 管理状态，修改下面的参数后去往信息页查看状态</p>
    <div>
      计数：
      <input type="number" v-model="num">
    </div>
  </div>
</template>

<script>
import ajax from '../../public/js/ajax'

export default {
  data () {
    return {
      dataName: undefined
    }
  },
  computed: {
    num: {
      get () {
        return this.$store.state.count
      },
      set (value) {
        this.$store.commit('updateCount', value)
      }
    }
  },
  mounted () {
    console.log(this.$store)
    this.get()
  },
  methods: {
    get () {
      var that = this
      ajax.get('http://localhost:3030/api/index', {
      }, (res) => {
        console.log(res)
        that.dataName = res.name
      }, (err) => {
        console.log(err)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
