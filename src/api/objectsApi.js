import axios from "axios";

export async function CreateNewObject(values) {
  try {
    const response = await axios.post(
      `http://localhost:8081/superapp/objects`,
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
    return null;
  }
}

export async function GetObjectByType(type,userEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byType/${type}`,
      {
        params: {
          userSuperapp: "2023b.zohar.tzabari",
          userEmail: userEmail,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function GetObjectByAlias(alias,userEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byAlias/${alias}`,
      {
        params: {
          userSuperapp: "2023b.zohar.tzabari",
          userEmail: userEmail,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}