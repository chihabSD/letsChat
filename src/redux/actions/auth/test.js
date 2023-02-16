import axios from "axios";
import { slowCode } from "../../../helpers/slowCode";
import { clearLoading, setLoading } from "../../reducers/loading";

export const _getLorem = () => {
    return async dispatch => {
        try {
            dispatch(setLoading())
            await slowCode(1000)
            const { data } = await axios.get("https://baconipsum.com/api/?type=tst"); 
            console.log("get lorem using old method", data);
            dispatch(clearLoading())
        } catch (error) {
            
        }
    }
}