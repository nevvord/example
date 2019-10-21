export const state = () => ({
    _Works: []
})

export const mutations = {
    update(state, works) {
        state._Works = works
    },
    push(state, work) {
        state._Works.push(work)
    },
    delete(state, id) {
        state._Works = state._Works.filter(work => work._id !== id)
    }
}