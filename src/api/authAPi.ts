interface LoginParams {
  username: string;
  password: string;
}

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
};

export const login = async ({
  username,
  password,
}: LoginParams): Promise<AuthResponse> => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Неверная почта или пароль");
  }

  return res.json();
};
