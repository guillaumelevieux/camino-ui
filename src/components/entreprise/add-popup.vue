<template>
  <Popup :messages="messages">
    <template slot="header">
      <div>
        <h2 class="mb-0">
          Création d'une entreprise
        </h2>
      </div>
    </template>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Pays</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <select
          v-model="entreprise.paysId"
          class="p-s mr"
          :disabled="true"
        >
          <option
            v-for="pay in pays"
            :key="pay.id"
            :value="pay.id"
          >
            {{ pay.nom }}
          </option>
        </select>
      </div>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Siren</h6>
      </div>
      <div class="mb tablet-blob-2-3">
        <div>
          <input
            v-model="entreprise.legalSiren"
            type="text"
            class="p-s"
            placeholder="123456789"
          >
        </div>
      </div>
    </div>

    <template slot="footer">
      <div class="tablet-blobs">
        <div class="mb tablet-mb-0 tablet-blob-1-3">
          <button
            v-if="!loading"
            class="btn-border rnd-xs p-s full-x"
            @click="cancel"
            @keyup.esc.native="cancel"
          >
            Annuler
          </button>
        </div>
        <div
          class="tablet-blob-2-3"
          :class="{ disabled: !complete }"
        >
          <button
            v-if="!loading"
            class="btn-flash rnd-xs p-s full-x"
            @click="save"
            @keyup.enter.native="save"
          >
            Enregistrer
          </button>
          <div
            v-else
            class="p-s full-x bold"
          >
            Enregistrement en cours…
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script>
import Popup from '../ui/popup.vue'

export default {
  name: 'CaminoEntrepriseEditPopup',

  components: {
    Popup
  },

  data() {
    return {
      entreprise: { legalSiren: '', paysId: 'fr' },
      pays: [{ id: 'fr', nom: 'France' }]
    }
  },

  computed: {
    loading() {
      return this.$store.state.popup.loading
    },

    messages() {
      return this.$store.state.popup.messages
    },

    complete() {
      return this.sirenValide && this.entreprise.paysId
    },

    sirenValide() {
      return (
        this.entreprise.legalSiren &&
        this.entreprise.legalSiren.match('[0-9]{9}$')
      )
    }
  },

  created() {
    document.addEventListener('keyup', this.keyup)
    this.current = null
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    async save() {
      if (this.complete) {
        await this.$store.dispatch('entreprise/create', this.entreprise)
      }
    },

    cancel() {
      this.errorsRemove()
      this.$store.commit('popupClose')
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.cancel()
      } else if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    },

    errorsRemove() {
      this.$store.commit('popupMessagesRemove')
    }
  }
}
</script>
