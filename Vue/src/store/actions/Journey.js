import vm from '@/main'
import * as filter from '@/filter/filter.js'

export function addJourney ({commit,dispatch}, info) {
    vm.$http.post('/api/journey', info).then(response => {
        if (response.data.status === 0) {
            info.callback && info.callback(response)
            commit('UPDATE_POPUP_TEXT', '发布成功')
            filter.popupShow(commit)
        }

    }, response => {
        // error callback
    })
}

export function getJourneys ({commit,dispatch}, info) {
    vm.$http.get('/api/journeys', info).then(response => {
        if (response.data.status === 0) {
            commit('UPDATE_PUBLISHED_LIST', response.data.list)
            info.callback && info.callback(response)
        }
    }, response => {
        // error callback
    })
}

export function getJourneyInfo ({commit,dispatch}, info) {
    vm.$http.get(`/api/journey/${info.id}`, info).then(response => {
        if (response.data.status === 0) {
            info.callback && info.callback(response)
        }
    }, response => {
        // error callback
    })
}

export function updateJourneyInfo ({commit,dispatch}, info) {
    vm.$http.put(`/api/journey/${info.id}`, info).then(response => {
        if (response.data.status === 0) {
            info.callback && info.callback(response)
        }
    }, response => {
    // error callback
    })
}
