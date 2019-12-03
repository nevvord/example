export const state = () => ({
    _Data: [],
    change: {},
    form: {
        name: '',
        inner: '',
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
    delete(state, id) {
        state._Data = state._Data.filter(data => data._id !== id)
    },
    change(state, newFile){
        let dataBody = {
            _id: state.change._id,
            name: state.change.name,
            inner: state.change.inner,
            file: state.change.oldFile
        }
        if(newFile){
            dataBody = {
                ...dataBody,
                file: newFile
            }
            state.change.oldFile = newFile
            state.change.file = null
        }
        
        
        state._Data = state._Data.map(data => {
            if(data._id === state.change._id) {
                return dataBody
            }
            return data
        })
    },
    updateChange(state, data) {
        state.change = {
            ...data,
            oldName: data.name,
            oldFile: data.file,
            file: null
        }
    }
}