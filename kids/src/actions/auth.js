import axios from 'axios'
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
// Headers
const config = {
    headers: {
        'Content-Type': 'application/json'

    }
}

// Login the user in

export const login = (data, callback) => {

    const body = data
    axios
        .post('http://localhost:5000/users/login', body, config)
        .then(res => {

            if (res.status == 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userinfo', JSON.stringify(res.data.user))

            }
            if(res.status==400){
                
            }
            if (typeof callback === "function") {

                callback(res)
            }
        })
        .catch(err =>{console.log(err)
        
            M.toast({html:"Invalid User",classes:"#43a047 red darken-1"})

    })
}

//change password accounts
export const change = (data, callback) => {
    // Request body
    const body = data

    axios
        .post('http://localhost:5000/users/change', body, config)
        .then(res => {

            if (res.status == 200) {
                localStorage.setItem('token', res.data.token)
            }
            if (typeof callback === "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}
//deactivate
export const deactivate = (data, callback) => {
    // Request body
    const body = data

    axios
        .post('http://localhost:5000/users/deactivate', body, config)
        .then(res => {

            if (res.status == 200) {
                localStorage.setItem('token', res.data.token)
            }
            if (typeof callback === "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}
// verify the user in

export const verify = (data, callback) => {
    // Request body
    const body = data

    axios
        .post('http://localhost:5000/users/verify', body, config)
        .then(res => {
            // if (res.status==200) {
            //      localStorage.setItem('token', res.data.token)
            // }
            if (typeof callback === "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

//reset password
export const reset = (user, callback) => {

    //Request body
    const body = user
    axios
        .post('http://localhost:5000/users/reset', body, config)
        .then(res => {
            // if (res.data.success) {
            //     localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            // }

            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err =>{console.log(err)
        
            M.toast({html:"Invalid User",classes:"#43a047 red darken-1"})

    })
}
//new password
export const PasswordChange = (user, callback) => {

    //Request body
    //  const {token} = useParams()

    // const {token}= this.props.params;
    const body = user

    axios
        .post('http://localhost:5000/users/NewPassword', body, config,)
        .then(res => {

            // if (res.data.success) {
            //     localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            // }


            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

// Register new User

export const register = (user, callback,inerror) => {

    //Request body
    const body = user
    axios
        .post('http://localhost:5000/users/register', body, { headers: { "Content-Type": "multipart/form-data" } })
        .then(res => {
            if (res.data.success) {
                localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            }
            if(res.status==400){
                
            }

            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err => {console.log(err);
            
            
            M.toast({html:"User with this email already exist",classes:"#43a047 red darken-1"})

    inerror()
})
}
export const activate = (user, callback) => {

    //Request body
    //  const {token} = useParams()

    // const {token}= this.props.params;
    const body = user

    axios
        .post('http://localhost:5000/users/activate', body, config,)
        .then(res => {

            // if (res.data.success) {
            //     localStorage.setItem('token', res.date && res.data.token ? res.data.token : "")
            // }


            if (typeof callback == "function") {
                callback(res)
            }
        })
        .catch(err => console.log(err))
}
export const fetchData = async (user, callback) => {
    const body = user
    var data = []
    await axios
        .post('http://localhost:5000/users/fetchData', body, config,)
        .then(res => {
            if (typeof callback == "function") {
                callback(res)
            }
            data = res.data
        }
        )
        .catch(err => console.log(err))
    return data
}

export const fetchLinks = async(user,callback)=>{
    const body = user
    var data = []
    await axios
    .post('http://localhost:5000/users/getLinks', body, config,)
        .then(res => {
            if (typeof callback == "function") {
                callback(res)
            }
            data = res.data
        }
        )
        .catch(err => console.log(err))
    return data
}
export const displayName = async (user, callback) => {
    const body = user
    var data = []
    await axios
        .post('http://localhost:5000/users/changeName', body, config,)
        .then(res => {
            if (typeof callback == "function") {
                callback(res)
            }
            data = res.data
        }
        )
        .catch(err => console.log(err))
    return data
}
export const uploadPicture = async (user, callback) => {
    const body = user
    var data = []
    await axios
        .post('http://localhost:5000/users/uploadImage', body, config,)
        .then(res => {
            if (typeof callback == "function") {
                callback(res)
            }
            data = res.data
        }
        )
        .catch(err => console.log(err))
    return data
}