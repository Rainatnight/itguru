export const useAuth = (): { isAuth: boolean } => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return { isAuth: Boolean(token) };
};
