export const state = () => ({
    content: "projects"
})

export const mutations = {
    setContent(state, change){
        state.content = change;
    }
}