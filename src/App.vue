<template>
  <div id="app">
    <b-modal v-model="settingsOpened" has-modal-card :can-cancel="false">
      <VVSettings @cancel="settingsOpened = false" @update="saveSettings" :state="veggieData" :staticRawValues="staticRawValues"></VVSettings>
    </b-modal>
    <b-loading is-full-page :active="!isConnected"></b-loading>
    <section class="hero is-header logo">
      <div class="hero-body">
        <div class="level is-mobile">
          <div class="level-item"></div>
          <div class="level-right">
            <b-button icon-left="cog" @click="settingsOpened = true"></b-button>
          </div>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child">
            <VVClock :dateTime="veggieData.dateTime"></VVClock>
            <VVBattery :battery="veggieData.battery"></VVBattery>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child">
            <VVSoilMeter meterName="Tomato Pot" :soilMoisture="veggieData.soil[0]" :maxSoilValueRaw="staticRawValues.maxSoilValueRaw"></VVSoilMeter>
            <VVSoilMeter meterName="Eggplant Pot" :soilMoisture="veggieData.soil[1]" :maxSoilValueRaw="staticRawValues.maxSoilValueRaw"></VVSoilMeter>
            <VVWatering :waterState="veggieData.waterState" :triggersEnabled="veggieData.triggersEnabled" @enableTriggers="enableTriggers" @waterOverride="waterOverride"></VVWatering>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VVClock from './components/VVClock.vue';
import VVBattery from './components/VVBattery.vue';
import VVSettings from './components/VVSettings.vue';
import VVSoilMeter from './components/VVSoilMeter.vue';
import VVWatering from './components/VVWatering.vue';

export default {
  name: 'App',
  components: {
    VVClock,
    VVBattery,
    VVSettings,
    VVSoilMeter,
    VVWatering
},
  data() {
    return {
      connection: null,
      isConnected: false,
      veggieData: {
        soil: [
          {},{}
        ]
      },
      staticRawValues: {
        maxSoilValueRaw: 3500
      },
      settingsOpened: false
    }
  },
  created() {
    this.attemptConnect();
  },
  metaInfo: {
    titleTemplate: "Vella's Veggies %s"
  },
  methods: {
    ws_onOpen() {
      console.log('Connection Successful');
      this.isConnected = true;
    },
    ws_onClose() {
      console.log('Disconnected... Attempting Reconnect');
      this.isConnected = false;
      this.attemptConnect();
    },
    ws_onMessage(event) {
      this.veggieData = JSON.parse(event.data);
    },
    attemptConnect() {
      const urlParams = new URLSearchParams(window.location.search);
      console.log("Attempting connection to Websocket");
      this.connection = new WebSocket("ws://" + urlParams.get('vv') + "/ws");
      this.connection.onopen = this.ws_onOpen;
      this.connection.onclose = this.ws_onClose;
      this.connection.onmessage = this.ws_onMessage;
    },
    saveSettings(settings) {
      this.settingsOpened = false;
      if (this.isConnected) {
        this.connection.send("updateFrequency:"+(settings.updateTime*1000));
        this.connection.send("setMaxWateringTime:"+(settings.maxWateringTime*1000));
        this.connection.send("setMaxOverrideTime:"+(settings.maxOverrideTime*1000));
        this.connection.send("setTriggerHoldTime:"+(settings.triggerHoldTime*1000));
        this.connection.send("setSoilTrigger0:"+((settings.soilTrigger0/100)*this.staticRawValues.maxSoilValueRaw));
        this.connection.send("setSoilTrigger1:"+((settings.soilTrigger1/100)*this.staticRawValues.maxSoilValueRaw));
      }
    },
    waterOverride() {
      if (this.isConnected) {
        let overrideValue = this.veggieData.waterState ? 0 : 1;
        this.connection.send("waterOverride:"+overrideValue);
      }
    },
    enableTriggers(enable) {
      if (this.isConnected) {
        let triggerValue = enable ? 1 : 0;
        this.connection.send("setTriggersEnabled:"+triggerValue);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
}

.logo {
  background-image: url('@/assets/head.png');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-size: contain;
}

.systemtime {
  text-align: center;
  font-size: small;
}
</style>
