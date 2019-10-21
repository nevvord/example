export const state = () => ({
    _Technology: []
})

export const mutations = {
    update(state, technologies) {
        state._Technology = technologies
    },
    push(state, technology) {
        state._Technology.push(technology)
    },
    delete(state, id) {
        state._Technology = state._Technology.filter(tech => tech._id !== id)
    }
}