<template>
  <div>
    <Row>
      <Col span="20" offset="2">
        <Form :model="formData" :rules="ruleInline" label-position="left">
          <FormItem label="统计名称">
            <Input type="text" v-model="formData.title" placeholder="请输入统计名称" :maxlength=100 clearable />
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker v-model="formData.startTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择开始时间" style="width:100%"></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker v-model="formData.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间" style="width:100%"></DatePicker>
          </FormItem>
          <!-- 单选开始 -->
          <FormItem label="标题" v-for="(item, index) in formData.topicData" :key="index">
            <div class="form-item">
              <Input type="text" style="width:60%" v-model="item.title" placeholder="请输入标题名称" :maxlength=100 clearable />
              <Button type="text" @click="deleteItem(index)">删除该项</Button>
            </div>
            <div class="form-item" v-if="item.type !== 3" v-for="(subItem, subIndex) in item.valueList" :key="subIndex">
              <Radio class="fl" disabled>
                <Input type="text" v-model="subItem.value" :maxlength=100 clearable />
              </Radio>
              <Icon type="ios-close" size="24"/>
            </div>
            <div class="form-item" v-if="item.type !== 3">
              <Icon type="ios-add-circle-outline" size="24"/>新增参数
            </div>
          </FormItem>
          <!-- 单选结束 -->

          <!-- 多选开始 -->
          <!-- <FormItem label="标题">
            <Input type="text" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=100 clearable />
            <div class="form-item">
              <Radio class="fl" v-model="single" style="width:80%"  disabled>
                <Input type="text" v-model="formData.topicData" :maxlength=100 clearable />
              </Radio>
              <Icon type="ios-close" size="24"/>
            </div>
            <div class="form-item">
              <Button type="text" icon="ios-add-circle-outline">新增参数</Button>
            </div>
          </FormItem> -->
          <!-- 多选结束 -->

          <!-- 输入框开始 -->
          <!-- <FormItem label="标题">
            <Input type="text" v-model="formData.topicData" placeholder="请输入标题名称" :maxlength=100 clearable />
            <div class="form-item">
              <Radio class="fl" v-model="single" style="width:80%"  disabled>
                <Input type="text" v-model="formData.topicData" :maxlength=100 clearable />
              </Radio>
              <Icon type="ios-close" size="24"/>
            </div>
          </FormItem> -->
          <!-- 输入框结束 -->

          <!-- 题目类型开始 -->
          <FormItem label="类型">
            <Select v-model="itemType">
              <Option :value="1">单选</Option>
              <Option :value="2">多选</Option>
              <Option :value="3">输入框</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="addItem" style="width:100%">新增题目</Button>
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
      itemType: 1, // 题目类型，1：单选，2:多选，3:输入框，默认1
      formData: {
        title: '', // 名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        topicData: [] // 题目
      },
      ruleInline: {
        title: [
          {required: true, message: '请输入名称'}
        ],
        startTime: [
          {required: true, message: '请选择开始时间'}
        ],
        endTime: [
          {required: true, message: '请选择结束时间'}
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
    console.log('topicData', this.formData.topicData);
  },
  methods: {
    // 新增项目
    addItem() {
      if(this.itemType=== 1 || this.itemType===2) {
        this.formData.topicData.push({
          type: this.itemType,
          title: '',
          valueList: [{
            value: ''
          }]
        });
      }
      else {
        this.formData.topicData.push({
          type: this.itemType,
          title: '',
        });
      }
    },
    // 删除项目
    deleteItem(index) {
      console.log('index', index);
      this.formData.topicData.splice(index, 1);
    },
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
.ivu-form {
  .ivu-form-item {
    .ivu-form-item-label {
      float: left;
      &::after {
        clear: both;
        height: 0;
        content: '';
        overflow: hidden;
      }
    }
  }
}

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
