export const fetchUser = () => {
    // stokage des information local des utilisateur 
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
  
    return userInfo;
  };
   