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
    alert("Hãy nhập đầy đủ thông tin");
    return false;
  }
  if (!validatePhoneNumber(phoneNumber)) {
    alert("Số điện thoại không hợp lệ");
    return false;
  }
  if (!validateEmail(email)) {
    alert("Email không hợp lệ");
    return false;
  }
  if (!validatePassword(password)) {
    alert(
      "Mật khẩu phải chứa ít nhất 5 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    );
    return false;
  }
  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return false;
  }
  return true;
};
