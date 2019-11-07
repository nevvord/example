export const state = () => ({
    _Data: [],
    form:{
        file: null
    }
})


export const mutations = {
    update(state, data) {
        state._Data = data
    },
    push(state, data) {
        state._Data.push(data)
    },
    delete(state, _id) {
        state._Data = state._Data.filter(data => data._id !== _id)
    }
}