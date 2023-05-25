import axios from "axios";

// export async function GetAllSuppliers(miniAppName) {
//   console.log(values);
//   let dataToSend = {};
//   dataToSend["command"] = "getAllSuppliers";
//   try {
//     const response = await axios.post(
//       `http://localhost:8081/superapp/miniapp/${miniAppName}`,
//       dataToSend,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

export async function GetAllSuppliers(email) {
  console.log(values);
  let dataToSend = {};
  dataToSend["command"] = "searchObjectsByType";
  try {
    const response = await axios.post(
      `http://localhost:8081/superapp/objects/search/byType/Supplier?userEmail=${email}`,
      dataToSend,
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
    return null;
  }
}
