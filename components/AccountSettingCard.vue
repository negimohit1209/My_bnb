<template>
  <v-card elevation="2" outlined shaped>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          <v-icon large color="primary darken-2"> mdi-message-text </v-icon>
        </div>
        <NuxtLink :to="getRoute(setting.to)">
          <v-list-item-title class="mb-2">
            <span class="text-xl">{{ setting.name }}</span>

            <span><v-icon color="primary"> mdi-chevron-right </v-icon></span>
          </v-list-item-title>
        </NuxtLink>
        <v-list-item-subtitle>{{ setting.description }}</v-list-item-subtitle>
      </v-list-item-content>

      <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
    </v-list-item>

    <!-- <v-card-actions>
      <v-btn outlined rounded text> Button </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: 'AccountSettingCard',
  props: {
    setting: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    discountedAmount() {
      return Math.max(
        Math.floor(this.property.rent.amount * 0.9),
        this.property.rent.minAmount
      )
    },
    taxAmount() {
      return 500
    },
  },
  methods: {
    getRoute(to) {
      return `/${this.$route.params.userid}${to}`
    },
  },
}
</script>

<style></style>
