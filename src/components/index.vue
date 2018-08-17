<template>
  <div class="hello">
    <h2>{{dataName}}</h2>
    <router-link to="/user">去往信息页</router-link>
    <p>使用vuex 管理状态，修改下面的参数后去往信息页查看状态</p>
    <div>
      计数：
      <input type="number" v-model="num">
    </div>
    <div>
      <Button type="success">查看</Button>
      <Button type="info" v-has>编辑</Button>
      <Button type="error" v-has>删除</Button>
    </div>
  </div>
</template>

<script>
import {
  Button
} from 'iview';

import axios from 'axios';

export default {
  data () {
    return {
      dataName: undefined
    };
  },
  components: {
    Button
  },
  computed: {
    num: {
      get () {
        return this.$store.state.count;
      },
      set (value) {
        this.$store.commit('updateCount', value);
      }
    }
  },
  mounted () {
    console.log(this.$store);
    this.get();
  },
  methods: {
    get () {
      let that = this;

      axios.get('http://localhost:3030/api/index', {
        params: {
          page: 1,
          keyword: 'axios'
        }
      })
      .then(res => {
        console.log(res);
        that.dataName = res.data.name;
      })
      .catch(err => {
        console.error(err);
      });
    }

  }
};
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
