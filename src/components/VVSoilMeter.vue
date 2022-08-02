<template>
    <div class="tile is-parent">
        <div class="tile is-child panel">
            <div class="panel-heading">Soil Moisture - {{meterName}}</div>
            <div class="section">
                <b-progress :max="100" :min="0" :value="moistureRating" :type="moistureColor" show-value size="is-large">
                    {{moistureName}}
                </b-progress>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VVSoilMeter",
    props: {
        soilMoisture: Object,
        meterName: String,
        maxSoilValueRaw: Number
    },
    computed: {
        moistureRating() {
            return (this.soilMoisture.value / this.maxSoilValueRaw) * 100;
        },
        moistureColor() {
            if (this.moistureRating <= this.triggerRating) {
                return "is-water";
            }
            return "is-dirt";
        },
        moistureName() {
            return this.moistureRating >= this.triggerRating ? "Dry" : "Moist";
        },
        triggerRating() {
            return (this.soilMoisture.trigger / this.maxSoilValueRaw) * 100;
        }
    },
    data() {
        return {
            
        }
    }
}
</script>