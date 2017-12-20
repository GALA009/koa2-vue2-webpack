<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{dataName}}</h2>
    <router-link to="/">去往首页</router-link>
  </div>
</template>

<script>
import ajax from '../../public/js/ajax'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataName: undefined
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      var that = this
      ajax.get('http://localhost:3030/api/user', {
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
