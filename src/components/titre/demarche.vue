<template>
  <div class="mb">
    <div class="card-border mb" />
    <div class="tablet-blobs">
      <div class="tablet-blob-3-4">
        <h3 class="cap-first mb-s">
          {{ demarche.type.nom }}
        </h3>
        <h4>
          <Dot :color="`bg-${demarche.statut.couleur}`" /><span
            class="cap-first"
          >
            {{ demarche.statut.nom }}
          </span>
        </h4>
      </div>
      <div class="tablet-blob-1-4 flex">
        <div
          v-if="demarche.editable || demarche.supprimable"
          class="flex-right"
        >
          <button
            v-if="demarche.supprimable"
            class="btn-border rnd-l-xs py-s px-m mb"
            @click="removePopupOpen"
          >
            <i class="icon-24 icon-trash" />
          </button>

          <button
            v-if="demarche.editable"
            class="btn-border rnd-r-xs py-s px-m mb"
            @click="editPopupOpen"
          >
            <i class="icon-24 icon-pencil" />
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="demarche.editable"
      class="btn-border rnd-xs py-s px-m full-x flex mb"
      @click="etapeAddPopupOpen"
    >
      Ajouter une étape <i class="icon-24 icon-plus flex-right" />
    </button>

    <TitreEtape
      v-for="etape in demarche.etapes"
      :key="etape.id"
      :etape="etape"
      :demarche-type="demarche.type"
      :demarche-id="demarche.id"
      :etapes-type-ids="etapesTypeIds"
    />
  </div>
</template>

<script>
import Dot from '../ui/dot.vue'
import EtapeEditPopup from './etape/edit.vue'
import TitreEtape from './etape.vue'
import EditPopup from './demarche-edit-popup.vue'
import RemovePopup from './demarche-remove-popup.vue'

export default {
  components: {
    Dot,
    TitreEtape
  },

  props: {
    demarche: {
      type: Object,
      default: () => ({})
    },

    type: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    titre() {
      return this.$store.state.titre.current
    },

    etapesTypeIds() {
      return this.demarche.etapes.map(({ type }) => type.id)
    }
  },

  methods: {
    editPopupOpen() {
      const demarche = {}

      demarche.typeId = this.demarche.type.id
      demarche.titreId = this.titre.id
      demarche.id = this.demarche.id

      this.$store.commit('popupOpen', {
        component: EditPopup,
        props: {
          demarche,
          typeNom: this.type.nom,
          demarchesTypes: this.type.demarchesTypes,
          titreNom: this.titre.nom
        }
      })
    },

    removePopupOpen() {
      this.$store.commit('popupOpen', {
        component: RemovePopup,
        props: {
          demarcheTypeNom: this.demarche.type.nom,
          titreNom: this.titre.nom,
          demarcheId: this.demarche.id,
          typeNom: this.titre.type.nom
        }
      })
    },

    etapeAddPopupOpen() {
      const etape = {
        ordre: 0,
        titreDemarcheId: this.demarche.id,
        typeId: null,
        typeIdOriginal: null,
        statutId: null,
        duree: { ans: null, mois: null },
        titulairesIds: [],
        amodiatairesIds: [],
        administrationsIds: [],
        substancesIds: [],
        groupes: [],
        geoSystemeIds: [],
        geoSystemeOpposableId: null,
        incertitudes: {},
        contenu: {}
      }

      this.$store.commit('popupOpen', {
        component: EtapeEditPopup,
        props: {
          etape,
          domaineId: this.titre.domaine.id,
          demarcheType: this.demarche.type,
          titreNom: this.titre.nom,
          creation: true,
          etapesTypeIds: this.etapesTypeIds
        }
      })
    }
  }
}
</script>
