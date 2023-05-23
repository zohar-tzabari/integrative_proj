import axios from "axios";

async function GetCommand(miniAppName,command,userEmail) {
  let dataToSend = {};
  //Todo: need to get this as data for now its hardCoded
  dataToSend["command"] = command;
  dataToSend["invokedBy"] = {
    userId: {
      superapp: "2023b.zohar.tzabari",
      email: userEmail,
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

async function GetObjectByType(type,userEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byType/${type}?userEmail=${userEmail}`,
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function GetAllSuppliers(miniAppName,userEmail) {
return GetObjectByType("Supplier",userEmail)
}

export async function GetSupplierTypes(miniAppName,userEmail) {
  return GetCommand(miniAppName,"getTypes",userEmail)
  }