export const state = () => ({
    _Page: []
})

export const mutations = {
    update(state, page) {
        state._Page = page
    },
    push(state, page) {
        state._Page.push(page)
    },
    delete(state, id) {
        state._Page = state._Page.filter(page => page._id !== id)
    }
}