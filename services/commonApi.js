import axios from "axios"

export const commonApi = async (httpRequest, url, reqBody,reqHeader) => {
    const reqConfig = {

        method: httpRequest,
        url,
        data: reqBody,
        //not mandatory but as we are using to ensure the user already lofin persion so we are sending the token and token can be send only in header
        headers:reqHeader 
    }
    // axios have the potential to  convert the object into json 
    // so no need to parse again
    return await axios(reqConfig).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

}

