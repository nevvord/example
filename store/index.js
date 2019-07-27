export const state = () => ({
    kek: "lol"
})


export const mutations = {
    setkek(state){
        console.log(state.kek);
        state.kek = "patau";
        console.log(state.kek);
        
    }
}