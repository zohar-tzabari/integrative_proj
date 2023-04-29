import axios from "axios";

export async function CreateNewObject(values) {
  console.log(values);
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

