import axios from 'axios';

export const strict = false; // Обязательная переменная

export const state = () => ({
    _Technology: [],
    _Specialization: [],
    _Works: [],
    _Project: [],
    _Page:[],
    _PageInner: '',
    _WorkBody: {
        inner: '',
        id: []
    },
    _SpecBody: {
        inner: '',
        id: []
    },
    _ProjInner: '',
    _Auth: false,
    _ServerHttp: 'http://localhost:3012/'
});


export const mutations = {
    //AUTH
    setAuth(state, bull){
        bull === true ? state._Auth = true : state._Auth = false;
    },
    //AUTH
    //GET
    getTechnology(state) {
        axios.get(`${state._ServerHttp}technology`).then(res => {
            state._Technology = res.data;
        });
    },
    getSpecialization(state) {
        axios.get(`${state._ServerHttp}specialization`).then(res => {
            state._Specialization = res.data;
        });
    },
    getWorks(state) {
        axios.get(`${state._ServerHttp}works`).then(res => {
            state._Works = res.data;
        });
    },
    getProject(state) {
        axios.get(`${state._ServerHttp}project`).then(res => {
            state._Project = res.data.reverse();
        });
    },
    getPage(state) {
        axios.get(`${state._ServerHttp}page`).then(res => {
            state._Page = res.data;
        });
    },
    //GET
    //DELETE
    deletTechnology(state, id) {
        axios.delete(`${state._ServerHttp}technology/` + id).then(res => {
            state._Technology = state._Technology.filter(u => u._id !== id);
        });
    },
    deletSpecialization(state, id) {
        axios.delete(`${state._ServerHttp}specialization/` + id).then(res => {
            state._Specialization = state._Specialization.filter(u => u._id !== id);
        });
    },
    deletWorks(state, id) {
        axios.delete(`${state._ServerHttp}works/` + id).then(res => {
            state._Works = state._Works.filter(u => u._id !== id);
        });
    },
    deletProject(state, id) {
        axios.delete(`${state._ServerHttp}project/` + id).then(res => {
            state._Project = state._Project.filter(u => u._id !== id);
        });
    },
    deletPage(state, id) {
        axios.delete(`${state._ServerHttp}page/` + id).then(res => {
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
    changePutInnerProject(state, body) {
        state._Project = state._Project.map(proj => {
            if (proj._id === body.id) {
                proj.inner = body.inner;
                return proj;
            }
            return proj;
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
    changeWorkInner(state, body) {
        state._WorkBody.inner = body.inner;
        state._WorkBody.id = body.id;
    },
    changeSpecInner(state, body) {
        state._SpecBody.inner = body.inner;
        state._SpecBody.id = body.id;
    },
    changeProjInner(state, inner) {
        state._ProjInner = inner
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
        axios.put(`${state._ServerHttp}specialization` + id, body).then(res => {});
    },
    //PUT
    //Clear
    //Очистка специализаий и работ от техналогий и проектов (Изменений не требует!)
    clearWithTechnology(state, id) {
        state._Specialization = state._Specialization.map(spec => {
            return {
                ...spec,
                technology: spec.technology.filter((tech) => {
                    return tech !== id;
                })
            };
        });
        state._Specialization.forEach(element => {
            axios.put(`${state._ServerHttp}specTech/` + element._id, { technology: element.technology });
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
            axios.put(`${state._ServerHttp}workTech/` + element._id, { technology: element.technology });
        });
    },
    clearWithProject(state, id) {
        state._Specialization = state._Specialization.map(spec => {
            return {
                ...spec,
                projects: spec.projects.filter((tech) => {
                    return tech !== id;
                })
            };
        });
        state._Specialization.forEach(element => {
            axios.put(`${state._ServerHttp}specProj/` + element._id, { projects: element.projects });
        });
        state._Works = state._Works.map(work => {
            return {
                ...work,
                projects: work.projects.filter((tech) => {
                    return tech !== id;
                })
            };
        });
        state._Works.forEach(element => {
            axios.put(`${state._ServerHttp}workProj/` + element._id, { projects: element.projects });
        });
    },
    //Clear
    // USER WORK
    // Отображение внутриности страниц
    pageInner(state, inner) {
        state._PageInner = '';
        state._PageInner = inner;

    }

};