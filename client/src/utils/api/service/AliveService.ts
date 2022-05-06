import http from '../MyApi'

const apiConnectToFullstackProject = () => {
    return http.get('/')
}

export default {
    apiConnectToFullstackProject
}