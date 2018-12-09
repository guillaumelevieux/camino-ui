// import Vue from 'vue'

import { titreTravauxRapportAdd } from '../api'

export const state = {
  current: null,
  periode: {
    trimestre: 1,
    annee: 2018
  },
  rapportCalendrier: [
    {
      id: 1,
      nom: '1er trimestre',
      mois: [
        {
          id: 1,
          nom: 'Janvier'
        },
        {
          id: 2,
          nom: 'Février'
        },
        {
          id: 3,
          nom: 'Mars'
        }
      ]
    },
    {
      id: 2,
      nom: '2nd trimestre',
      mois: [
        {
          id: 4,
          nom: 'Avril'
        },
        {
          id: 5,
          nom: 'Mai'
        },
        {
          id: 6,
          nom: 'Juin'
        }
      ]
    },
    {
      id: 3,
      nom: '3ème trimestre',
      mois: [
        {
          id: 7,
          nom: 'Juillet'
        },
        {
          id: 8,
          nom: 'Août'
        },
        {
          id: 9,
          nom: 'Septembre'
        }
      ]
    },
    {
      id: 4,
      nom: '4ème trimestre',
      mois: [
        {
          id: 10,
          nom: 'Octobre'
        },
        {
          id: 11,
          nom: 'Novembre'
        },
        {
          id: 12,
          nom: 'Décembre'
        }
      ]
    }
  ],
  rapportStatuts: [
    {
      id: 'nonDebutes',
      nom: 'Non débutés'
    },
    {
      id: 'exploitationEnCours',
      nom: 'Exploitation en cours'
    },
    {
      id: 'arretTemporaire',
      nom: 'Arrêt temporaire'
    },
    { id: 'rehabilitation', nom: 'Réhabilitation' },
    {
      id: 'arretDefinitif',
      nom: 'Arrêt définitif (après réhabilitation)'
    }
  ],
  rapportContenus: [
    {
      nom: 'Or net extrait (g)',
      id: 'or',
      description: `Masse d’or en gramme obtenue au cours du trimestre après fonderie ou affinage (au sens de l’<a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021850943&cidTexte=LEGITEXT000006069569" target="_blank" rel="noopener noreferrer">article 318 B de l'annexe II au code général des impôts, annexe 2 </a>).`
    },
    {
      id: 'mercure',
      nom: 'Mercure récupéré (g)',
      description: `Masse en gramme de l’ensemble des produits contaminés envoyés en traitement au cours du trimestre.`
    },
    {
      id: 'carburantDetaxe',
      nom: 'Carburant détaxé (l)',
      description: `Volume total en litre de carburant détaxé consommé au cours du trimestre par les travaux réalisés sur le chantier.`
    },
    {
      id: 'carburantConventionnel',
      nom: 'Carburant conventionnel (l)',
      description: `Volume total en litre de carburant conventionnel consommé au cours du trimestre par les travaux réalisés sur le chantier.`
    },
    {
      id: 'pompes',
      nom: 'Pompes actives',
      description: `Nombre moyen de pompes actives au cours du trimestre utilisées sur le chantier (pompe à gravier, pompe de relevage…).`
    },
    {
      id: 'pelles',
      nom: 'Pelles actives',
      description: `Nombre moyen de pelles actives au cours du trimestre utilisées sur le chantier (aménagement, exploitation, réhabilitation).`
    },
    {
      id: 'effectifs',
      nom: 'Effectifs',
      description: `Nombre moyen de salariés sur le chantier au cours du trimestre.`
    },
    {
      id: 'environnement',
      nom: 'Dépenses relatives à la protection de l’environnement (euros)',
      description: ` Montant en euros des investissements consentis au cours du trimestre listés à l’<a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021850940&cidTexte=LEGITEXT000006069569" target="_blank" rel="noopener noreferrer">article 318 C de l’annexe II du code général des impôts</a>. Afin de bénéficier des déductions fiscales afférentes, les justificatifs attestant de la réalisation effective des investissements sont susceptibles de vous êtres demandés par l’administration.`
    }
  ]
}

export const actions = {
  async rapportAdd({ commit, dispatch }, rapport) {
    commit('popupMessagesRemove', null, { root: true })
    try {
      const res = await titreTravauxRapportAdd({ rapport })

      if (res) {
        commit('popupClose', null, { root: true })
        dispatch(
          'messageAdd',
          {
            value: `le rapport a été enregistré`,
            type: 'success'
          },
          { root: true }
        )
        dispatch('titre/reload', null, { root: true })
      }
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    }
  }
}

export const getters = {}

export const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
