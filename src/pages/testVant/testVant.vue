<template>
    <div id="app"> 
        C2C
        <van-button type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>

        <van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
<van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
/>
<van-picker :columns="columns" @change="onChange" />
<van-radio-group v-model="radio">
  <van-radio name="1">单选框 1</van-radio>
  <van-radio name="2">单选框 2</van-radio>
</van-radio-group>
<div>

    <van-circle
  v-model="currentRate"
  color="#07c160"
  fill="#fff"
  size="120px"
  layer-color="#ebedf0"
  :text="text"
  :rate="rate"
  :speed="100"
  :clockwise="false"
  :stroke-width="60"
/>
</div>

    </div>
</template>
<script>


import {
    mapGetters
} from 'vuex'

export default {
    name: "c2cIndex",
    components: {

    },
    created(){
        console.log(this.$store)
        this.$store.dispatch('getInfoPrize')
    },
    data() {
        return {
            minHour: 10,
            maxHour: 20,
            minDate: new Date(),
            maxDate: new Date(2019, 10, 1),
            currentDate: new Date(),
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            radio: '1',
            currentRate: 0
        };
    },
    computed:{ 
        text() {
        return this.currentRate.toFixed(0) + '%'
        },
        ...mapGetters([
            'getHasPrize',
        ]),
    },
    methods:{
        onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    }
        
    },
    mounted(){

    },
    watch: {
        
    },
    
}
</script>

