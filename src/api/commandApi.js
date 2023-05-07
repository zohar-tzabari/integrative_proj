import axios from "axios";

export async function GetAllSuppliers(miniAppName) {
  console.log(values);
  let dataToSend = {};
  dataToSend["command"] = "getAllSuppliers";
  try {
    const response = await axios.post(
      `http://localhost:8081/superapp/miniapp/${miniAppName}`,
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
