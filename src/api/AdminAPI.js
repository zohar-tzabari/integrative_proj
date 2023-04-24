import axios from "axios";

export async function deleteAllObjects() {
  try {
    const response = await axios.delete(
      `http://localhost:8081/superapp/admin/objects`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteAllUsers() {
  try {
    const response = await axios.delete(
      `http://localhost:8081/superapp/admin/users`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteAllCommandsHistory() {
  try {
    const response = await axios.delete(
      `http://localhost:8081/superapp/admin/miniapp`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/admin/users`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllCommands() {
    try {
        const response = await axios.get(
          `http://localhost:8081/superapp/admin/miniapp`
        );
        return response;
      } catch (error) {
        console.error(error);
        return null;
      }
}
