<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="20" >
        <Form :model="formData" :rules="ruleInline">
          <FormItem label="手机号">
            <Input type="text" v-model="formData.mobile" placeholder="请输入手机号" :maxlength=11 clearable />
          </FormItem>
          <FormItem label="密码">
            <Input type="password" v-model="formData.passwd" placeholder="请输入秘密" clearable />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit" style="width:100%">登陆</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios';
import {
  Row,
  Col,
  Form,
  FormItem,
  Icon,
  Button
} from 'iview';

export default {
  name: 'login',
  data () {
    return {
      formData: {
        mobile: '', // 手机号
        passwd: '' // 密码
      },
      ruleInline: {
        mobile: [
          {required: true, message: '请输入手机号'}
        ],
        passwd: [
          {required: true, message: '请输入秘密'}
        ]
      }
    };
  },
  components: {
    Row,
    Col,
    Form,
    FormItem,
    Icon,
    Button
  },
  computed: {
    // store 计数状态
    number () {
      return this.$store.state.count;
    }
  },
  mounted () {
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
      .catch(err => {
        console.error(err);
      });
    },
    // 提交登陆
    submit () {
      let that = this;

      axios.post('http://localhost:3030/api/login', that.formData)
        .then(res => {
          console.log(res);
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
</style>
