<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="20" >
        <Form :model="formData" :rules="ruleInline">
          <FormItem label="统计名称">
            <Input type="text" v-model="formData.username" placeholder="请输入统计名称" :maxlength=11 clearable />
          </FormItem>
          <FormItem label="日期">
            <DatePicker type="date" placeholder="请选择日期" style="width:100%"></DatePicker>
          </FormItem>
          <!-- 单选开始 -->
          <FormItem label="标题">
            <Input type="text" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=11 clearable />
            <RadioGroup v-model="phone" vertical>
              <Radio label="饭">
                <span>饭</span>
              </Radio>
              <Radio label="粥">
                <span>粥</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <!-- 单选结束 -->

          <!-- 多选开始 -->
          <FormItem label="标题">
            <Input type="text" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=11 clearable />
            <CheckboxGroup v-model="disabledGroup" vertical>
              <Checkbox label="香蕉" style="width:100%"></Checkbox>
              <Checkbox label="苹果" style="width:100%"></Checkbox>
              <Checkbox label="西瓜" style="width:100%"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <!-- 多选结束 -->

          <!-- 题目类型开始 -->
          <FormItem label="类型">
            <Select v-model="model8">
              <Option :value="1">单选</Option>
              <Option :value="2">多选</Option>
              <Option :value="3">自定义</Option>
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
<style scoped>
</style>
