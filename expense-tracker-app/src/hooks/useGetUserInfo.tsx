export const useGetUserInfo = () => {
  const results = localStorage.getItem("auth");

  let name = "";
  let profilePhoto = "";
  let userID = "";
  let isAuth = false;

  if (results) {
    const parsed = JSON.parse(results);
    name = parsed.name;
    profilePhoto = parsed.profilePhoto;
    userID = parsed.userID;
    isAuth = parsed.isAuth;
  }

  return { name, profilePhoto, userID, isAuth };
};
