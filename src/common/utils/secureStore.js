import * as SecureStore from "expo-secure-store";

export async function saveUser(value) {
  console.log('saving .....', value)
  await SecureStore.setItemAsync('user', JSON.stringify(value));
}

export async function getUser() {
  let result = await SecureStore.getItemAsync('user');  
  return JSON.parse(result)
}

export async function deleteUser() {
    await SecureStore.deleteItemAsync('user');
}
  