export const state = () => ({
    _Project: [],
    changeProject: {},
    form: {
        name: '',
        link: '',
        description: '',
        inner: '',
        file: null
    }
})

export const mutations = {
    update(state, projects) {
        state._Project = projects
    },
    push(state, project) {
        state._Project.push(project)
    },
    delete(state, id) {
        state._Project = state._Project.filter(proj => proj._id !== id)
    },
    change(state, newFile){
        let project = {
            _id: state.changeProject._id,
            name: state.changeProject.name,
            link: state.changeProject.link,
            description: state.changeProject.description,
            file: state.changeProject.file
        }
        if(newFile && newFile !== null){
            project = {
                ...project,
                file: newFile
            }
            state.changeProject.file = newFile
            state.changeProject.newFile = null
        }
        state._Project = state._Project.map(proj => {
            if(proj._id === state.changeProject._id) {
                return project
            }
            return proj
        })
    },
    updateChangeProject(state, project) {
        state.changeProject = {
            ...project,
            newFile: null,
            oldName: project.name
        }
    },
    updateProjectInner(state, body) {
        state._Project = state._Project.map(proj => {
            if (proj._id === body._id) {
                proj.inner = body.inner
                return proj
            }
            return proj
        })
    }
}