import { ticketingApi } from "@/api/ticketing-api";
import type {
  CheckAuthStatusActionResponse,
  CheckAuthStatusResponse,
  LoginFormValues,
  LoginRequestResponse,
  User,
} from "../types/auth.types";
import { constants } from "@/utils/utils";

export const loginAction = async (payload: LoginFormValues): Promise<LoginRequestResponse> => {

  // * 1. Realizamos la peticion HTTP por axios
  const { data } = await ticketingApi.post<LoginRequestResponse>(constants.TANSTACK_QUERY.HTTP_REQUESTS.AUTH.LOGIN, payload);

  // * 2. modificamos los datos de la respuesta
  const response = { user:data.user, access_token: data.access_token };

  console.log({ response });

  // * 3. Devolvemos los datos
  return response;
};

export const logoutAction = async () => {
  const { data, status } = await ticketingApi.post(constants.TANSTACK_QUERY.HTTP_REQUESTS.AUTH.LOGOUT); 

  return { data, status };
};

export const checkAuthStatusAction = async (): Promise<CheckAuthStatusActionResponse> => {
  const storedToken = localStorage.getItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN);

  if (!storedToken || storedToken === "undefined" || storedToken === "null") {
    throw new Error("No hay un token válido en el almacenamiento local");
  }

  try {
    const { data } = await ticketingApi.post<CheckAuthStatusResponse>(constants.TANSTACK_QUERY.HTTP_REQUESTS.AUTH.CHECK_STATUS);

    if (!data.access_token) {
      throw new Error("La respuesta de renovación no contiene un access_token");
    }

    localStorage.setItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN, data.access_token);

    const user = await getProfileData();
    console.log("Usuario de getProfileData");
    console.log(user)

    console.table({ user, token: data.access_token })

    return {
      user,
      token: data.access_token,
    };
  } catch (error) {
    localStorage.removeItem(constants.GLOBAL_STATE.AUTH_STATE.TOKEN);
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(
      `No se pudo renovar la sesión ni obtener el perfil del usuario: ${reason}`,
      { cause: error },
    );
  }
};

export const getProfileData = async (): Promise<User> => {
  const { data } = await ticketingApi.get<User>(
    constants.TANSTACK_QUERY.HTTP_REQUESTS.PROFILE,
  );

  console.log({ data });

  return data;
};