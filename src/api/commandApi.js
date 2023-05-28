import axios from "axios";
import { useSelector } from "react-redux";

export async function GetAllSuppliers(values) {
  console.log(values);
  let dataToSend = {};
  const miniApp = useSelector((state) => state.miniApp);
  dataToSend["command"] = "getAllSuppliers";
  try {
    const response = await axios.post(
      `http://localhost:8081/superapp/miniapp/${miniApp.miniAppName}`,
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

export async function GetAllGuests(email) {
  const miniApp = useSelector((state) => state.miniApp);
  const objectM = useSelector((state) => state.objectManager);
  const user = useSelector((state) => state.user);

  let dataToSend = {};
  dataToSend["command"] = "getAllGuestsOfUser";
  dataToSend["commandAttributes"] = { email: user.email };
  dataToSend["targetObject"] = objectM;
  dataToSend["invokedBy"] = user;
  console.log(dataToSend);
  try {
    const response = await axios.post(
      `http://localhost:8081/superapp/miniapp/${miniApp.miniAppName}`,
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
