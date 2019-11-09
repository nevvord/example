import axios from 'axios'
import { serverHttp } from '../config/default.json'

export default async function({ store }){
    await axios
        .get(serverHttp + 'api/technologies')
        .then(res => {
            store.commit('technologies/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(serverHttp + 'api/projects')
        .then(res => {
            store.commit('projects/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(serverHttp + 'api/specializations')
        .then(res => {
            store.commit('specializations/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(serverHttp + 'api/works')
        .then(res => {
            store.commit('works/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(serverHttp + 'api/pages')
        .then(res => {
            store.commit('pages/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(`${serverHttp}api/getfiles`)
        .then(res => {
            store.commit('files/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(`${serverHttp}api/carousel`)
        .then(res => {
            store.commit('carousel/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    await axios
        .get(`${serverHttp}api/inner`)
        .then(res => {
            store.commit('inner/update', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    
}