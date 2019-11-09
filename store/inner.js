export const state = () => ({
    _Data: null,
    inner: ''
})

export const mutations = {
    update(state, data) {
        state._Data = data[0]
        state.inner = data[0].inner
    }
}