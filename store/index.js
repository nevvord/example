import axios from 'axios';

export const strict = false;

export const state = () => ({
    _Technology: [],
    _Specialization: []
});


export const mutations = {
    getTechnology(state) {
        axios.get(`http://localhost:3012/technology`).then(res => {
            state._Technology = res.data;
        });
    },
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
    pushToTechnology(state, obj) {
        state._Technology.push(obj);
    },
    getSpecialization(state) {
        axios.get(`http://localhost:3012/specialization`).then(res => {
            state._Specialization = res.data;
        });
    },
    pushToSpecialization(state, obj) {
        state._Specialization.push(obj);
        console.log(state._Specialization);

    },
    changePutInner(state, body) {
        state._Specialization = state._Specialization.map(spec => {
            if (spec._id === body.id) {
                spec.inner = body.inner;
                return spec;
            }
            return spec;
        });

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
    putTechToSpec(tech, id) {
        let body = { technology: tech };
        axios.put('http://localhost:3012/specialization' + id, body).then(res => {});
    },
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
    }
};