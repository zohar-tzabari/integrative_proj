import axios from "axios";

export async function GetAllSuppliers(miniAppName) {
  let dataToSend = {};
  //Todo: need to get this as data for now its hardCoded
  dataToSend["command"] = "getAllSuppliers";
  dataToSend["invokedBy"] = {
    userId: {
      superapp: "2023b.zohar.tzabari",
      email: "zohar.zabari@gmail.com",
    },
  };
  dataToSend["targetObject"] = {
    objectId: { superapp: "2023b.zohar.tzabari", internalObjectId: "1" },
  };

  console.log(dataToSend);
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
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
