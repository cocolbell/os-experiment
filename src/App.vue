<template>
	<div id="app">
		<p class="header">/ 操作系统实验——进程调度程序 /</p>
		<div class="content">
			<el-tabs type="border-card">
				<el-tab-pane label="静态优先权算法"><PSA></PSA></el-tab-pane>
				<el-tab-pane label="先来先服务算法"><FCFS></FCFS></el-tab-pane>
				<el-tab-pane label="简单轮转法"><PR></PR></el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import FCFS from './components/FCFS.vue'
import PSA from './components/PSA.vue'
import PR from './components/PR.vue'
export default {
	name: 'app',
	components : {
		PSA,
		FCFS,
		PR
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 30px;
}
.header {
	font-size: 20px;
}
.content {
	max-width: 1400px;
	margin: 0 auto;
}
</style>
