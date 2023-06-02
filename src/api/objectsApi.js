import axios from "axios";
const SUPERAPP = "2023b.zohar.tzabari";

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

export async function BindObject(myObject, userEmail, childernObject) {
  console.log(myObject);
  const temp = myObject.objectId;
  var valuesAfterHash = temp.split("#")[1];
  console.log(valuesAfterHash);
  try {
    const response = await axios.put(
      `http://localhost:8081/superapp/objects/${SUPERAPP}/${valuesAfterHash}/children?userEmail=${userEmail}`,
      childernObject,
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

export async function GetChildrenObject(myObject, userEmail) {
  const temp = myObject.objectId;
  var valuesAfterHash = temp.split("#")[1];
  console.log(valuesAfterHash);
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/${SUPERAPP}/${valuesAfterHash}/children?userEmail=${userEmail}`,
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

export async function GetObjectByType(type, userEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byType/${type}`,
      {
        params: {
          userSuperapp: SUPERAPP,
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

export async function GetObjectByAlias(alias, userEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/objects/search/byAlias/${alias}`,
      {
        params: {
          userSuperapp: SUPERAPP,
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
