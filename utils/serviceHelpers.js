import Toast from "react-native-toast-message";

export default async function asyncWithTimeout(
  asyncFn,
  timeout=15000,
  errorMsg='',
  toast={}
) {
  const timeoutPromise = new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Operation timed out'));
    }, timeout);
  });

  try {
    const result = await Promise.race([asyncFn, timeoutPromise]);
    return result;
  } catch (err) {
    console.error(err);
    Toast.show({
      type: 'error',
      text1: errorMsg,
      visibilityTime: 3000,
      autoHide: true,
      ...toast
    });
    return { error: errorMsg };
  }
}