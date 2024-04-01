import { Alert } from "react-native";

const validateEmail = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePhoneNumber = (phone) => {
  let re = /^0\d{9}$/;
  return re.test(phone);
};

const validatePassword = (password) => {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;
  return re.test(password);
};

export const validateField = (field) => {
  if (field.trim() === "") {
    return false;
  }
  return;
};
export const validateRegister = (user) => {
  const { name, phoneNumber, email, password, confirmPassword, gender } = user;
  if (
    name.trim() === "" ||
    phoneNumber.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === "" ||
    gender.trim() === ""
  ) {
    Alert.alert("Cảnh báo", "Hãy nhập đầy đủ thông tin");
    return false;
  }
  if (!validatePhoneNumber(phoneNumber)) {
    Alert.alert("Cảnh báo", "Số điện thoại không hợp lệ");
    return false;
  }
  if (!validateEmail(email)) {
    Alert.alert("Cảnh báo", "Email không hợp lệ");
    return false;
  }
  if (!validatePassword(password)) {
    Alert.alert(
      "Cảnh báo",
      "Mật khẩu phải chứa ít nhất 5 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    );
    return false;
  }
  if (password !== confirmPassword) {
    Alert.alert("Cảnh báo","Mật khẩu không khớp");
    return false;
  }
  return true;
};
