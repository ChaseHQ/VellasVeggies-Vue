<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Vella Veggies Settings</p>
        </header>
        <div class="modal-card-body">
            <b-field :label="'Update Frequency ('+ settings.updateTime + ' seconds)'">
                <b-slider v-model="settings.updateTime" :tooltip="false" :max="60" :min="1"></b-slider>
            </b-field>
            <b-field :label="'Max Watering Time ('+ settings.maxWateringTime + ' seconds)'">
                <b-slider v-model="settings.maxWateringTime" :tooltip="false" :max="600" :min="1"></b-slider>
            </b-field>
            <b-field :label="'Max Override Time ('+ settings.maxOverrideTime + ' seconds)'">
                <b-slider v-model="settings.maxOverrideTime" :tooltip="false" :max="600" :min="1"></b-slider>
            </b-field>
            <b-field :label="'Trigger Hold Time ('+ settings.triggerHoldTime + ' seconds)'">
                <b-slider v-model="settings.triggerHoldTime" :tooltip="false" :max="900" :min="1"></b-slider>
            </b-field>
            <b-field :label="'Soil Moisture Trigger - 0 - ' + settings.soilTrigger0 + '%'">
                <b-slider v-model="settings.soilTrigger0" :tooltip="false" :max="100" :min="1"></b-slider>
            </b-field>
            <b-field :label="'Soil Moisture Trigger - 1 - ' + settings.soilTrigger1 + '%'">
                <b-slider v-model="settings.soilTrigger1" :tooltip="false" :max="100" :min="1"></b-slider>
            </b-field>
        </div>
        <div class="modal-card-foot">
            <b-button
                label="Cancel"
                type="is-warning" @click="$emit('cancel')" />
            <b-button
                label="Update"
                type="is-success" @click="$emit('update',settings)"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "VVSettings",
    props: {
        state: Object,
        staticRawValues: Object
    }, 
    data() {
        return {
            settings: {
                updateTime: (this.state.updateFrequency / 1000),
                maxWateringTime: (this.state.maxWateringTime / 1000),
                maxOverrideTime: (this.state.maxOverrideTime / 1000),
                soilTrigger0: Math.round((this.state.soil[0].trigger / this.staticRawValues.maxSoilValueRaw) * 100),
                soilTrigger1: Math.round((this.state.soil[1].trigger / this.staticRawValues.maxSoilValueRaw) * 100),
                triggerHoldTime: (this.state.triggerHoldTime / 1000)
            }
        }
    }
}
</script>