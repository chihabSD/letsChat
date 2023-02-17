import axios from "axios";

export const _register = (details) => {
    return async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const { data } = await axios.post("http://localhost:5000/auth/register", details  ); 

            // dispatch(setLoading())
            // await slowCode(1000)
            // const { data } = await axios.post("http://localhost:5000/auth/register", {details}); 
            // console.log("get lorem using old method", data);
        } catch (error) {
            
        }
    }
}