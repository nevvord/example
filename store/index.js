import axios from 'axios';

export const strict = false;

export const state = () => ({
    _Technology: [],
    _Specialization: []
});


export const mutations = {
    getTechnology(state){
        axios.get(`http://localhost:3012/technology`).then(res => {
            state._Technology = res.data;            
        });
    },
    deletTechnology(state, id){
        axios.delete('http://localhost:3012/technology/'+ id).then(res=>{
            state._Technology = state._Technology.filter( u => u._id !== id);
        });
    },
    pushToTechnology(state, obj){
        state._Technology.push(obj);
    },
    getSpecialization(state){
        axios.get(`http://localhost:3012/specialization`).then(res => {
            state._Specialization = res.data;
            state._Specialization.technology = state._Specialization.technology.split(',')
            console.log(state._Specialization.technology);
                 
        });
    },
    pushToSpecialization(state, obj){
        state._Specialization.push(obj);
    }
};