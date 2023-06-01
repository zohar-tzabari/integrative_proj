import axios from "axios";
import { useSelector } from "react-redux";


export async function searchObjectsByType(email) {
  let dataToSend = {};
  dataToSend["command"] = "searchObjectsByType";
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byType/supplier?userEmail=${email}`,
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

export async function searchObjectsByUserEmail(miniAppName,objectId,mail,userId) {
  let dataToSend = {};
  dataToSend["command"] = "getObjectByMail";
  dataToSend['invokedBy'] = {userId};
  dataToSend["targetObject"] = {objectId};
  dataToSend["commandAttributes"] = {"mail": mail};
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
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}



export async function GetAllGuests(email,objectM,miniAppName) {

  let dataToSend = {};
  dataToSend["command"] = "getAllGuestsOfUser";
  dataToSend["commandAttributes"] = { email: email };
  dataToSend["targetObject"] = objectM;
  // dataToSend["invokedBy"] = user;
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
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
