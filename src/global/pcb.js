function PCB (obj) {
    this.name = obj.name
    this.priority = obj.priority
    this.needTime = obj.needTime
    this.runTime = obj.runTime
    this.status = obj.status
}

PCB.prototype = {
    setStatus: function (newSatus) {
        this.status = newSatus
        console.log(this.status)
    }
}

export default {
    PCB
}
