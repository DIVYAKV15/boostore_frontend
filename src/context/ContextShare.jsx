import React, { createContext, useState } from 'react'

// create context 
export const adminProfileUpdateStatusContext
    = createContext("")

export const userProfileUpdateStatusContext = createContext("")

// setting intial value empty

// children is a default props name as a contextShare is a parent bcause we wrap it with app soi it sharing the data to its children
function ContextShare({ children }) {
    // data to be shared so setting it in state
    const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({})

    const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState({})
    return (
        // whenever the mentioned context called in the component the provider tag will share the value which we set in value
        // we should pass as object because in useState we set as {}
        <adminProfileUpdateStatusContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }}>
            <userProfileUpdateStatusContext.Provider value={{ userProfileUpdateStatus, setUserProfileUpdateStatus }}>

                {children}
            </userProfileUpdateStatusContext.Provider>
        </adminProfileUpdateStatusContext.Provider>
    )
}

export default ContextShare