<template>
  <div>
    <div
      v-if="titre.editable"
    >
      <div class="card-border mb" />
      <button
        class="btn-border rnd-xs py-s px-m full-x flex mb"
        @click="demarcheAddPopupOpen"
      >
        Ajouter une démarche <i class="icon-24 icon-plus flex-right" />
      </button>
    </div>

    <TitreDemarche
      v-for="demarche in demarches"
      :key="demarche.id"
      :demarche="demarche"
      :type="titre.type"
    />
  </div>
</template>

<script>
import TitreDemarche from './demarche.vue'
import EditPopup from './demarche-edit-popup.vue'

export default {
  components: {
    TitreDemarche
  },

  props: {
    demarches: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    }
  },

  methods: {
    demarcheAddPopupOpen() {
      const demarche = {
        typeId: null,
        titreId: this.titre.id
      }

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          demarche,
          typeNom: this.titre.type.nom,
          demarchesTypes: this.titre.type.demarchesTypes,
          titreNom: this.titre.nom,
          creation: true
        }
      })
    }
  }
}
</script>
