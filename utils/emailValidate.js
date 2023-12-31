const emailValidate = (email) => {
  if (!email) {
    return "Enter an Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "Enter a valid Email Address!!";
  } else {
    return;
  }
};

export default emailValidate;
