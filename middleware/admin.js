export default function ({store}) {
    store.commit('getTechnology');
    store.commit('getSpecialization');
    store.commit('getWorks');
    store.commit('getProject');
    store.commit('getPage');
    console.log("MW work");
}