export const getSender = (loggedUserEmail, users) => {
  //   console.log(users[0].email, "-> ", loggedUserEmail);

  return users[0].email == loggedUserEmail ? users[1].name : users[0].name;
};
