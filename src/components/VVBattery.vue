<template>
    <div class="tile is-parent">
        <div class="tile is-child panel">
            <div class="panel-heading">Battery Status</div>
            <div class="section">
                <b-progress :type="batteryStatus" :rounded="false" :value="batteryPercentage" size="is-large" show-value>
                    {{batteryPercentage}}%
                </b-progress>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VVBattery",
    props: {
        battery: Number
    },
    computed: {
        batteryPercentage(){
            let batLevel = ((this.battery > 3800) ? 3800 : this.battery);
            return Math.round((batLevel / 3800) * 100);
        },
        batteryStatus() {
            if (this.batteryPercentage > 55) {
                return "is-success"
            }else if(this.batteryPercentage > 35) {
                return "is-warning"
            }
            return "is-danger";
        }
    }
}
</script>