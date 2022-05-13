import http from '../MyApi'
import {CreateOrUpdateUser} from '../../interface/Users'

const UserService = {
    createUser: (payload: CreateOrUpdateUser) => {
        return http.post('/user', payload)
    },

    getAll: () => {
        return http.get('/user/all')
    },

    getByNameAndEmail: (name: string, eMail: string) => {
        return http.get(`/user/name/${name}/${eMail}`)
    },

    updateUserById: (id: string, payload: CreateOrUpdateUser) => {
        return http.put(`/user/${id}`, payload)
    },

    getById: (id: string) => {
        return http.get(`/user/${id}`)
    },

    deleteUserById: (id: string) => {
        return http.delete(`/user/${id}`)
    }
}

export default UserService