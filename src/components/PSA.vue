<template>
    <div class="panel">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-table :data="runPcbList" max-height="700" min-height="400" border>
                    <el-table-column label="内存" align="center">
                        <el-table-column
                        prop="name"
                        align="center"
                        label="进程名">
                        </el-table-column>
                        <el-table-column
                        prop="priority"
                        align="center"
                        label="优先级">
                        </el-table-column>
                        <el-table-column
                        prop="needTime"
                        align="center"
                        label="需要运行时间">
                        </el-table-column>
                        <el-table-column
                        prop="runTime"
                        align="center"
                        label="已运行时间">
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        align="center"
                        label="进程状态">
                        <template slot-scope="scope">
                            <el-tag
                            :type="statusChange(scope.row.status)"
                            close-transition>{{scope.row.status}}</el-tag>
                        </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <el-table :data="waitPcbList" max-height="700" min-height="400" border>
                    <el-table-column label="外存" align="center">
                        <el-table-column
                        prop="name"
                        align="center"
                        label="进程名">
                        </el-table-column>
                        <el-table-column
                        prop="priority"
                        align="center"
                        label="优先级">
                        </el-table-column>
                        <el-table-column
                        prop="needTime"
                        align="center"
                        label="需要运行时间">
                        </el-table-column>
                        <el-table-column
                        prop="runTime"
                        align="center"
                        label="已运行时间">
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        align="center"
                        label="进程状态">
                        <template slot-scope="scope">
                            <el-tag
                            :type="statusChange(scope.row.status)"
                            close-transition>{{scope.row.status}}</el-tag>
                        </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div class="handleArea">
            <el-row :gutter="20">
                <el-button type="primary" size="small" @click="init" :disabled="btnDisabled.init">随机生成</el-button>
                <el-button type="success" size="small" @click="excute" :disabled="btnDisabled.excute">执行</el-button>
                <el-button type="danger" size="small" @click="reset" :disabled="btnDisabled.reset">重置</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PSA',
    data () {
        return {
            runPcbList : [],
            waitPcbList : [],
            btnDisabled : {
                init : false,
                excute : true,
                reset : false,
            }
        }
    },
    methods : {
        randomNum (max,min) {
            var res = Math.floor(Math.random()*(max-min+1)+min);
            return res;
        },
        arrCompare(property) {
            return function(obj1, obj2) {
                var val1 = obj1[property];
                var val2 = obj2[property];
                if (val2 < val1) {
                    return 1;
                } else if (val2 > val1) {
                    return -1;
                } else {
                    return 0;
                }
            }
        },
        getPereferItem () {
            var arrCopy = [].concat(this.waitPcbList);  //创建副本，解除对waitPcbList的引用
            var arrSorted = arrCopy.sort(this.arrCompare('priority'));
            var itemSelect = arrSorted.shift();
            console.log(itemSelect.id);
            for (var i = this.waitPcbList.length-1; i>=0; i--) {
                if (this.waitPcbList[i].id==itemSelect.id)
                    this.waitPcbList.splice(i,1);
            }
            return itemSelect
        },
        init () {
            var vm = this;
            this.btnDisabled.excute = false;
            vm.waitPcbList = [];
            for (var i=0 ; i<5 ; i++) {
                var newPcb = {
                    id : i,
                    name : 'instance_' + (i +1),
                    priority : vm.randomNum(8,1),
                    needTime : vm.randomNum(8,1),
                    runTime : 0,
                    status : 'wait'
                };
                vm.waitPcbList.push(newPcb)
            }
        },
        excute () {
            var vm = this;
            
            //初始化按钮
            this.btnDisabled.init = true;
            this.btnDisabled.excute = true;
            this.btnDisabled.reset = true;

            this.runPcbList.push(this.getPereferItem());
            var runningPcb = this.runPcbList[this.runPcbList.length - 1];            
            runningPcb.status = 'run'
            var processor = setInterval (function () {
                runningPcb = vm.runPcbList[vm.runPcbList.length - 1]; //选取当前执行列表中最后一个元素
                runningPcb.needTime--;
                runningPcb.runTime++;
                if(runningPcb.needTime == 0) {  //如果此进程运行结束
                    runningPcb.status = 'finish';
                    if(vm.waitPcbList.length) {
                        vm.runPcbList.push(vm.getPereferItem());  //取出当前执行列表中优先级最高的元素
                        vm.runPcbList[vm.runPcbList.length - 1].status = 'run'
                    }
                    else {
                        clearInterval(processor)
                        vm.btnDisabled.reset = false;
                    }
                }
            },1000)
        },
        reset () {
            this.runPcbList = [];
            this.waitPcbList = [];
            this.btnDisabled.init = false;
        },
        statusChange (status) {
            return status === 'wait' ? 'warning' : status ==='run' ? '': status === 'finish' ? 'success' : console.log('no')          
        }
    },
    mounted () {

    }
}
</script>

<style lang="scss">
.panel {
    padding: 30px 15px;
}
.handleArea {
    margin-top: 45px;
}
</style>
