export const state = () => ({
    _Page: [],
    change: {
        _id: '',
        oldName: '',
        name: '',
        inner: '<p></p>',
        display: true
    },
    form: {
        name: '',
        inner: '',
        position: 1,
        display: true
    }
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
    },
    change(state){
        let Page = {
            _id: state.change._id,
            name: state.change.name,
            inner: state.change.inner,
            display: state.change.display
        }
        state._Page = state._Page.map(page => {
            if(page._id === state.change._id) {
                return Page
            }
            return page
        })
    },
    updateChange(state, page) {
        state.change = {
            ...page,
            oldName: page.name
        }
    },
    counter(state, obj){
        state._Page.forEach((element, index) => {
            if(element._id === obj._id){
                state._Page[index].position = state._Page[index].position + obj.num
            }
            if(state._Page[index].position < 0){
                state._Page[index].position = 0
            }
        })
    }
}