<template>
  <div class="hello">
    <h2>{{dataName}}</h2>
    <h3>状态：{{number}}</h3>
    <router-link to="/">去往首页</router-link>
    <!-- <ul>
      <li v-for="item in listData" :key="item._id">
        {{ item.title }}
      </li>
    </ul> -->
    <Table :columns="columns1" :data="listData"></Table>
  </div>
</template>

<script>
import axios from 'axios';
import {
  Table
} from 'iview';

export default {
  name: 'HelloWorld',
  data () {
    return {
      dataName: undefined,
      listData: undefined, // 数据
      columns1: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '简略',
          key: 'summary'
        },
        {
          title: '地址',
          key: 'url',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'text'
              },
              on: {
                click: (e) => {
                  window.open(params.row.url);
                }
              }
            }, params.row.url);
          }
        },
        {
          title: '来源',
          key: 'source',
          render: (h, params) => {
            let _name = '-';
            if(params.row.source === 1) {
              _name = 'RedHub';
            } else if (params.row.source === 2) {
              _name = '开源中国';
            } else if (params.row.source === 3) {
              _name = '头条新闻';
            } else if (params.row.source === 4) {
              _name = '36氪';
            }

            return h('span', {
            }, _name)
          }
        }
      ]
    };
  },
  computed: {
    // store 计数状态
    number () {
      return this.$store.state.count;
    }
  },
  mounted () {
    this.get();
  },
  methods: {
    get () {
      let that = this;

      axios.get('http://localhost:3030/api/user', {
        params: {
          page: 1,
          keyword: 'axios'
        }
      })
      .then(res => {
        console.log(res);
        that.dataName = res.data.name;
        that.listData = res.data.data;
      })
      .catch( err => {
        console.error(err);
      })
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
