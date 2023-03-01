// // import { authApiHandler } from "../../../api/auth";
// import { messageApiHandler } from "../../../api/message";
// import { insertMessages } from "../../reducers/friends";
// // import { setError } from "../../reducers/error";
// // import { clearLoading, setLoading } from "../../reducers/loading";
// // import { setRegistered } from "../../reducers/register";
// import { names } from "../names";
// export const _sendImage= (details) => {
//   return async (dispatch) => {
//     console.log('ssss');
//     try {
//     //   dispatch(setLoading());
//       const { data:{message} } = await messageApiHandler(names.SEND_IMAGE, details);
      
//       console.log(message);
//         let messages = []
//       messages.push(message)
//       dispatch(insertMessages([...messages]))
//     } catch (error) {
//     //   dispatch(setError(error.response.data.message));
//     //   setTimeout(() => {

//     //   dispatch(clearLoading());
//     //   }, 1000)
//     }
//   };
// };
