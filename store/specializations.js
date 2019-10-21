export const state = () => ({
    _Specialization: []
})

export const mutations = {
    update(state, specializations) {
        state._Specialization = specializations
    },
    push(state, specialization) {
        state._Specialization.push(specialization)
    },
    delete(state, id) {
        state._Specialization = state._Specialization.filter(spec => spec._id !== id)
    }
}