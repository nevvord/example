export const state = () => ({
    content: ""
})

export const mutations = {
    setContent(state, change) {
        state.content = change
    }
}