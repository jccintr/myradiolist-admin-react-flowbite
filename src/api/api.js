//const BASE_API = 'http://localhost:8080';
const BASE_API = 'https://radios-api-production.up.railway.app'


export default {

    validateToken: async (token) => {
        const response = await fetch(`${BASE_API}/auth/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

     login: async (email, password) => {
        const response = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       
        return response;
    },

    cadastro: async (name,email,password) => {
       
        const response = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        });
              
        return response;
    },
    getRadiosPaged: async (currentPage) => {
        const response = await fetch(`${BASE_API}/radios?page=${currentPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              
            },
        });
        return response;
    },
    getUsers: async (token,currentPage) => {
        const response = await fetch(`${BASE_API}/users?page=${currentPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getCategoriesPaged: async (token,currentPage) => {
        const response = await fetch(`${BASE_API}/categories?page=${currentPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getAllCategories: async (token) => {
        const response = await fetch(`${BASE_API}/categories/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getCitiesPaged: async (token,currentPage) => {
        const response = await fetch(`${BASE_API}/cities?page=${currentPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
     getAllCities: async (token) => {
        const response = await fetch(`${BASE_API}/cities/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getLists: async (token,currentPage) => {
        const response = await fetch(`${BASE_API}/lists?page=${currentPage}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    addCategory: async (token,name) => {
        const response = await fetch(`${BASE_API}/categories`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
    addCity: async (token,name,state) => {
        const response = await fetch(`${BASE_API}/cities`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name,state})
        });
        return response;
    },
    updateCategory: async (token,id,name) => {
        const response = await fetch(`${BASE_API}/categories/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
    updateCity: async (token,id,name,state) => {
        const response = await fetch(`${BASE_API}/cities/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name,state})
        });
        return response;
    },
    deleteCategory: async (token,id) => {
        const response = await fetch(`${BASE_API}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
     deleteCity: async (token,id) => {
        const response = await fetch(`${BASE_API}/cities/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
     deleteList: async (token,id) => {
        const response = await fetch(`${BASE_API}/lists/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
     addRadio: async (token,fd) => {
      
        const response = await fetch(`${BASE_API}/radios`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
     updateRadio: async (token,id,fd) => {
        const response = await fetch(`${BASE_API}/radios/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
     updateUser: async (token,id,name) => {
        const response = await fetch(`${BASE_API}/users/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
     deleteRadio: async (token,id) => {
        const response = await fetch(`${BASE_API}/radios/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
     deleteUser: async (token,id) => {
        const response = await fetch(`${BASE_API}/users/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
   
  
  
   
};