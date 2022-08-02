<template>
    <div class="tile is-parent">
        <div class="tile is-child panel">
            <div class="panel-heading">Water Status</div>
            <div class="section has-text-centered">
                <b-field>
                    <b-button :type="buttonType" icon-left="water" @click="$emit('waterOverride')">{{this.waterState ? "Active" : "Not Active"}}</b-button>
                </b-field>
                <b-field>
                    <b-switch :value="triggersEnabled" type="is-success" @input="$emit('enableTriggers',!triggersEnabled)">Enable Triggers</b-switch>
                </b-field>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VVWatering",
    props: {
        waterState: Boolean,
        triggersEnabled: Boolean
    },
    computed: {
        buttonType() {
            if (this.waterState) {
                return "is-large is-water";
            }
            return "is-large is-danger";
        }
    }
}
</script>