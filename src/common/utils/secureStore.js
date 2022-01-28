import * as SecureStore from "expo-secure-store";

export async function saveUser(value) {
  await SecureStore.setItemAsync('user', value);
}

export async function getUser() {
  let result = await SecureStore.getItemAsync('user');  
  return result
}

export async function deleteUser() {
    await SecureStore.deleteItemAsync('user');
}
  