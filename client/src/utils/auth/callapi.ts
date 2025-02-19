import axios, { Method } from "axios";
import { IPADDRESS, PORTSERVER, URL_SERVER } from "../variables";
import JWTManager from "./jwt";

const AxiosAPI = (method: Method, endpoint: string, data: any) => {
  return axios({
    method,
    // url: `${URL_SERVER}/${endpoint}`,
    url: `http://${IPADDRESS}:${PORTSERVER}/${endpoint}`,
    data,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + JWTManager.getToken(),
    },
  });
};
export default AxiosAPI;
