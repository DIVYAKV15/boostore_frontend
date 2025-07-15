import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// register api
export const regiserApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)
}

// login api

export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

// google login api

export const googleLoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/google-login`, reqBody)
}



//api to get home books
export const homebookApi = async () => {
    return await commonApi('GET', `${serverUrl}/home-book`)
}

// api to get all jobs

export const getAllJobApi = async (searchKey) => {
    return await commonApi('GET', `${serverUrl}/all-jobs?search=${searchKey}`)
}

// api to edit profile

export const editProfileApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/edit-profile`, reqBody, reqHeader)
}


// ---------------

// USERS API

//api to  Add book info
// to ensure the login person only should send the book info 
// so to ensure that token can be use
// but token cannot be send it reqbody it has to send it header 

export const addBookAPi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-book`, reqBody, reqHeader)
}


// api to get all user submitted book
// 
//  - so to check the user we need token so passing the reqheader
// --------------------

// Why "" (empty string)?
// Because the third parameter represents the request body (reqBody), and for a GET request, you usually don't send a request body.

// GET requests typically only have URL and headers, no body.

// So, to keep the function signature consistent, the code passes "" to indicate "no body."

// qyery parameter - baseUrl?key=value

export const allBooksUserApi = async (reqHeader, searchKey) => {
    return await commonApi('GET', `${serverUrl}/all-books-user?search=${searchKey}`, "", reqHeader)
}



// api to view a book 
// view-book path's are from backend 
// id pass from frontend - path parameter
export const viewBookApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/view-book/${id}`)

}


// api to view user added book 
// reqHEader passing as we are passing the jwt in backend to get the userEmail

export const getAllUserAddedBooksApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-user-added-books`, "", reqHeader)
}

// api to view the user purchased book history

export const getAllUserPurchasedBooksApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-user-purchased-books`, "", reqHeader)
}

// api to delete a book

export const deleteBookApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/delete-book/${id}`)
}

// api to add job application

export const addApplicationApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-application`, reqBody, reqHeader)
}


// api to make payment

export const makePaymentApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/make-payment`,reqBody,reqHeader)
}


// ----------
// ADMIN API

// api to get all the books

export const getAllBookAdminApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-books`)
}

// api to approve book

export const approveBookApi = async (id) => {
    return await commonApi('PUT', `${serverUrl}/approve-book/${id}`)
}

// to get all users list 
export const getAllUsersApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-users`)
}

// api to add job

export const addJobApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/add-job`, reqBody)
}


// api to delete a job

export const deleteAJobApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/delete-job/${id}`)
}

// api to get all applied job applciation

export const getAllApplicationApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-application`)
}