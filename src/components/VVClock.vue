<template>
    <div class="tile is-parent">
        <div class="tile is-child panel">
            <div class="panel-heading">
                Last Reading Time
            </div>
            <div class="section">
                <h1 class="title is-4">{{currentSystemDate}}</h1>
                <h1 class="subtitle is-4">{{currentSystemTime}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
import DayJS from 'dayjs'
export default {
    name: "VVClock",
    props: {
        dateTime: Number
    },
    computed: {
        currentSystemTime() {
            return DayJS(Date(this.dateTime)).format("h:mm:ss A");
        },
        currentSystemDate() {
            return DayJS(Date(this.dateTime)).format("dddd, MMMM D, YYYY");
        }
    }
}
</script>