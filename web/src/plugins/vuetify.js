import Vuetify, {
  VLayout, VApp, VCard, VBtn, VSubheader, VFlex, VIcon, VCardText, VListTileSubTitle, VListTileTitle, VListTileContent, VCheckbox, VListTileAction, VListTile, VList, VCardTitle, VDialog, VDivider, VTextField, VContent, VListTileAvatar, VProgressCircular, VSpeedDial, VSelect, VContainer, VRadioGroup, VRadio, VSlider, VTooltip, VTimePicker,
} from 'vuetify/lib';
import Vue from 'vue';
import * as directives from 'vuetify/es5/directives';
import '../../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#00BCD4',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
  },
  components: {
    VLayout, VApp, VCard, VBtn, VSubheader, VFlex, VIcon, VCardText, VListTileSubTitle, VListTileTitle, VListTileContent, VCheckbox, VListTileAction, VListTile, VList, VCardTitle, VDialog, VDivider, VTextField, VContent, VListTileAvatar, VProgressCircular, VSpeedDial, VSelect, VContainer, VRadioGroup, VRadio, VSlider, VTooltip, VTimePicker,
  },
  iconfont: 'md',
  directives,
});
