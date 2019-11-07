export const state = () => ({
    _Specialization: [],
    form: {
        name: '',
        description: '',
        file: null,
        technology: [],
        projects: [],
        inner: ''
    },
    change:{
        _id: '',
        name: '',
        oldName: '',
        description: '',
        file: '',
        newFile: null,
        inner: '',
        technology: [],
        projects: []
    }
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
    },
    change(state, newFile){
        let specialization = {
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
            specialization = {
                ...specialization,
                file: newFile
            }
            state.change.file = newFile
            state.change.newFile = null
        }
        
        
        state._Specialization = state._Specialization.map(spec => {
            if(spec._id === state.change._id) {
                return specialization
            }
            return spec
        })
    },
    updateChange(state, specialization) {
        state.change = {
            ...specialization,
            newFile: null,
            oldName: specialization.name
        }
    },
    updateInner(state, body) {
        state._Specialization = state._Specialization.map(spec => {
            if (spec._id === body._id) {
                spec.inner = body.inner
                return spec
            }
            return spec
        })
    },
    clear(state, id){
        state._Specialization = state._Specialization.map(spec => {
            return {
                ...spec,
                technology: spec.technology.filter(tech => {
                    return tech !== id
                })
            }
        })
        state._Specialization = state._Specialization.map(data => {
            return {
                ...data,
                projects: data.projects.filter(proj => {
                    return proj !== id
                })
            }
        })
    }
}