<template>
  <div>
    <Row>
      <Col span="20" offset="2">
        <Form :model="formData" :rules="ruleInline" label-position="top">
          <FormItem label="统计名称">
            <Input type="text" v-model="formData.username" placeholder="请输入统计名称" :maxlength=100 clearable />
          </FormItem>
          <FormItem label="日期">
            <DatePicker type="date" placeholder="请选择日期" style="width:100%"></DatePicker>
          </FormItem>
          <!-- 单选开始 -->
          <FormItem label="标题">
            <div class="form-item">
              <Input type="text" style="width:60%" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=100 clearable />
              <Button type="text">删除该项</Button>
            </div>
            <div class="form-item">
              <Radio class="fl" v-model="single"   disabled>
                <Input type="text" v-model="formData.topicData" :maxlength=100 clearable />
              </Radio>
              <Icon type="ios-close" size="24"/>
            </div>
            <div class="form-item">
              <Icon type="ios-add-circle-outline" size="24"/>新增参数
            </div>
          </FormItem>
          <!-- 单选结束 -->

          <!-- 多选开始 -->
          <FormItem label="标题">
            <Input type="text" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=100 clearable />
            <div class="form-item">
              <Radio class="fl" v-model="single" style="width:80%"  disabled>
                <Input type="text" v-model="formData.topicData" :maxlength=100 clearable />
              </Radio>
              <Icon type="ios-close" size="24"/>
            </div>
            <div class="form-item">
              <Icon type="ios-add-circle-outline" size="24"/>新增参数
            </div>
          </FormItem>
          <!-- 多选结束 -->

          <!-- 输入框开始 -->
          <FormItem label="标题">
            <Input type="text" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=100 clearable />
            <div class="form-item">
              <Radio class="fl" v-model="single" style="width:80%"  disabled>
                <Input type="text" v-model="formData.topicData" :maxlength=100 clearable />
              </Radio>
              <Icon type="ios-close" size="24"/>
            </div>
          </FormItem>
          <!-- 输入框结束 -->

          <!-- 题目类型开始 -->
          <FormItem label="类型">
            <Select v-model="model8">
              <Option :value="1">单选</Option>
              <Option :value="2">多选</Option>
              <Option :value="3">输入框</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit" style="width:100%">新增题目</Button>
          </FormItem>
          <!-- 题目类型结束 -->
          <FormItem>
            <Button type="success" @click="submit" style="width:100%">发布</Button>
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
  name: 'register',
  data () {
    return {
      formData: {
        user: '', // 用户名
        passwd: '', // 密码
        topicData: [] // 题目对象
      },
      ruleInline: {
        username: [
          {required: true, message: '请输入姓名'}
        ],
        mobile: [
          {required: true, message: '请输入手机号'}
        ],
        passwd: [
          {required: true, message: '请输入密码'}
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
<style lang="scss" scoped>
  .fl {
    float: left;
    &::after {
      clear: both;
      height: 0;
      content: '';
      overflow: hidden;
    }
  }

  .form-item {
    margin-top: 6px;
  }
</style>
