export const useGetUserInfo = () => {
  const results = localStorage.getItem("auth");

  let name = "";
  let profilePhoto = "";
  let userID = "";
  let isAuth = false;

  try {
    if (results) {
      const parsed = JSON.parse(results);

      name = parsed?.name ?? "";
      profilePhoto = parsed?.profilePhoto ?? "";
      userID = parsed?.userID ?? "";
      isAuth = parsed?.isAuth ?? false;
    }
  } catch (error) {
    console.error("Erreur de parsing des infos utilisateur :", error);
  }

  return { name, profilePhoto, userID, isAuth };
};
