import axios from 'axios';

export const strict = false;

export const state = () => ({
    _Technology: [],
    _Specialization: [],
    _Works: [],
    _Project: [],
    _Page:[],
    _PageInner: '',
    _WorkInner: '',
    _SpecInner: ''
});


export const mutations = {
    //GET
    getTechnology(state) {
        axios.get(`http://localhost:3012/technology`).then(res => {
            state._Technology = res.data;
        });
    },
    getSpecialization(state) {
        axios.get(`http://localhost:3012/specialization`).then(res => {
            state._Specialization = res.data;
        });
    },
    getWorks(state) {
        axios.get(`http://localhost:3012/works`).then(res => {
            state._Works = res.data;
        });
    },
    getProject(state) {
        axios.get(`http://localhost:3012/project`).then(res => {
            state._Project = res.data.reverse();
        });
    },
    getPage(state) {
        axios.get(`http://localhost:3012/page`).then(res => {
            state._Page = res.data;
        });
    },
    //GET
    //DELETE
    deletTechnology(state, id) {
        axios.delete('http://localhost:3012/technology/' + id).then(res => {
            state._Technology = state._Technology.filter(u => u._id !== id);
        });
    },
    deletSpecialization(state, id) {
        axios.delete('http://localhost:3012/specialization/' + id).then(res => {
            state._Specialization = state._Specialization.filter(u => u._id !== id);
        });
    },
    deletWorks(state, id) {
        axios.delete('http://localhost:3012/works/' + id).then(res => {
            state._Works = state._Works.filter(u => u._id !== id);
        });
    },
    deletProject(state, id) {
        axios.delete('http://localhost:3012/project/' + id).then(res => {
            state._Project = state._Project.filter(u => u._id !== id);
        });
    },
    deletPage(state, id) {
        axios.delete('http://localhost:3012/page/' + id).then(res => {
            state._Page = state._Page.filter(u => u._id !== id);
        });
    },
    //DELETE
    //PUSH
    pushToTechnology(state, obj) {
        state._Technology.push(obj);
    },
    pushToWorks(state, obj) {
        state._Works.push(obj);
    },
    pushToSpecialization(state, obj) {
        state._Specialization.push(obj);
    },
    pushToProject(state, obj) {
        state._Project.unshift(obj);
    },
    pushToPage(state, obj) {
        state._Page.push(obj);
    },
    //PUSH
    //PUT
    changePutInner(state, body) {
        state._Specialization = state._Specialization.map(spec => {
            if (spec._id === body.id) {
                spec.inner = body.inner;
                return spec;
            }
            return spec;
        });

    },
    changePutInnerWork(state, body) {
        state._Works = state._Works.map(spec => {
            if (spec._id === body.id) {
                spec.inner = body.inner;
                return spec;
            }
            return spec;
        });

    },
    changePage(state, body) {
        state._Page = state._Page.map(page => {
            if (page._id === body.id) {
                page.inner = body.inner;
                page.name = body.name;
                return page;
            }
            return page;
        });

    },
    changeWorkInner(state, inner) {
        state._WorkInner = inner
    },
    changeSpecInner(state, inner) {
        state._SpecInner = inner
    },
    changeProject(state, body) {
        if(body.file) {
            state._Project = state._Project.map(proj => {

                if (proj._id === body.id) {
                    proj.name = body.name;
                    proj.link = body.link;
                    proj.description = body.description;
                    proj.file = body.file;
                    return proj;
                }
                return proj;
            });
        }else{
            state._Project = state._Project.map(proj => {

                if (proj._id === body.id) {
                    proj.name = body.name;
                    proj.link = body.link;
                    proj.description = body.description;
                    return proj;
                }
                return proj;
            });
        }

    },
    changeSpecialization(state, body) {
        if (body.file) {
            state._Specialization = state._Specialization.map(spec => {

                if (spec._id === body.id) {
                    spec.name = body.name;
                    spec.description = body.description;
                    spec.file = body.file;
                    spec.technology = body.technology;

                    return spec;
                }
                return spec;
            });
        } else {
            state._Specialization = state._Specialization.map(spec => {
                if (spec._id === body.id) {
                    spec.name = body.name;
                    spec.description = body.description;
                    spec.technology = body.technology;

                    return spec;
                }
                return spec;
            });
        }
    },
    changeWork(state, body) {
        if (body.file) {
            state._Works = state._Works.map(spec => {

                if (spec._id === body.id) {
                    spec.name = body.name;
                    spec.description = body.description;
                    spec.file = body.file;
                    spec.technology = body.technology;

                    return spec;
                }
                return spec;
            });
        } else {
            state._Works = state._Works.map(spec => {
                if (spec._id === body.id) {
                    spec.name = body.name;
                    spec.description = body.description;
                    spec.technology = body.technology;

                    return spec;
                }
                return spec;
            });
        }
    },
    putTechToSpec(tech, id) {
        let body = { technology: tech };
        axios.put('http://localhost:3012/specialization' + id, body).then(res => {});
    },
    //PUT
    //Clear
    clearSpecWithTechnology(state, id) {
        state._Specialization = state._Specialization.map(spec => {
            return {
                ...spec,
                technology: spec.technology.filter((tech) => {
                    return tech !== id;
                })
            };
        });
        state._Specialization.forEach(element => {
            axios.put('http://localhost:3012/specTech/' + element._id, { technology: element.technology });
        });
        state._Works = state._Works.map(work => {
            return {
                ...work,
                technology: work.technology.filter((tech) => {
                    return tech !== id;
                })
            };
        });
        state._Works.forEach(element => {
            axios.put('http://localhost:3012/workTech/' + element._id, { technology: element.technology });
        });
    },
    //Clear
    // USER WORK

    pageInner(state, inner) {
        state._PageInner = '';
        state._PageInner = inner;

    }

};