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

export async function deleteAllUsers(userEmail) {
  try {
    const response = await axios.delete(
      `http://localhost:8081/superapp/admin/users?userEmail=${userEmail}`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteAllCommandsHistory(userEmail) {
  try {
    const response = await axios.delete(
      `http://localhost:8081/superapp/admin/miniapp?userEmail=${userEmail}`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllUsers(userEmail) {
  try {
    const response = await axios.get(
      `http://localhost:8081/superapp/admin/users?userEmail=${userEmail}`
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllCommands(userEmail) {
    try {
        const response = await axios.get(
          `http://localhost:8081/superapp/admin/miniapp?userEmail=${userEmail}`
        );
        return response;
      } catch (error) {
        console.error(error);
        return null;
      }
}
