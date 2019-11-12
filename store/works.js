export const state = () => ({
    _Data: [],
    form: {
        name: '',
        description: '',
        file: null,
        technology: [],
        projects: [],
        inner: ''
    },
    change: {
        id: '',
        name: '',
        oldName: '',
        description: '',
        file: '',
        newFile: null,
        technology: [],
        projects: []
    }
})

export const mutations = {
    update(state, works) {
        state._Data = works
    },
    push(state, work) {
        state._Data.push(work)
    },
    delete(state, id) {
        state._Data = state._Data.filter(work => work._id !== id)
    },
    updateChange(state, data) {
        state.change = {
            ...data,
            newFile: null,
            oldName: data.name
        }
    },
    updateInner(state, body) {
        state._Data = state._Data.map(data => {
            if (data._id === body._id) {
                data.inner = body.inner
                return data
            }
            return data
        })
    },
    change(state, newFile){
        let body = {
            _id: state.change._id,
            name: state.change.name,
            link: state.change.link,
            description: state.change.description,
            technology: state.change.technology,
            projects: state.change.projects,
            inner: state.change.inner,
            file: state.change.file
        }
        if(newFile){
            body = {
                ...body,
                file: newFile
            }
            state.change.file = newFile
            state.change.newFile = null
        }
        
        
        state._Data = state._Data.map(data => {
            if(data._id === state.change._id) {
                return body
            }
            return data
        })
    },
    clear(state, id){
        state._Data = state._Data.map(data => {
            return {
                ...data,
                technology: data.technology.filter(tech => {
                    return tech !== id
                })
            }
        })
        state._Data = state._Data.map(data => {
            return {
                ...data,
                projects: data.projects.filter(proj => {
                    return proj !== id
                })
            }
        })
    }
}