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

export async function searchObjectsByType() {
  //console.log(values);
  let dataToSend = {};
  dataToSend["command"] = "searchObjectsByType";
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byType/Supplier?userEmail=liriella71@gmail.com`,
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
