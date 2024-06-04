import { get } from "..";
import { config } from "../../../config";

export const getEntity = (id: string) =>
  get<any, void>(`${config.BACKEND_URL}/api/v1/crm/employee/${id}`);
