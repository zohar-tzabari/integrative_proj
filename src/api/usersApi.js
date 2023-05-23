import axios from "axios";
const SUPERAPP = "2023b.zohar.tzabari";


export async function ClientRegisterApi(values) {
  try {
    const response = await axios.post(
      `http://localhost:8081/superapp/users`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data.message;
  }
}

// export async function ChangeUserRoleApi(loginEmail) {
//   try {
//     const response = await axios.get(
//       `http://localhost:8081/superapp/users/login/${SUPERAPP}/${loginEmail}`,
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }


export async function UserLoginApi(loginEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/users/login/${SUPERAPP}/${loginEmail}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


