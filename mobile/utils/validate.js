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
export const validateRegister = (
  name,
  phonNumber,
  email,
  password,
  confirmPassword,
  gender
) => {
  if (name === "" || phonNumber === "" || email === "" || password === "") {
    alert("Please fill in all fields");
    return false;
  }
  if (!validatePhoneNumber(phonNumber)) {
    alert("Invalid phone number");
    return false;
  }
  if (!validateEmail(email)) {
    alert("Invalid email");
    return false;
  }
  if (!validatePassword(password)) {
    alert(
      "Password must contain at least 5 characters, including uppercase, lowercase, number and special character"
    );
    return false;
  }
  if (password !== confirmPassword) {
    alert("Password and confirm password do not match");
    return false;
  }
  return true;
};
