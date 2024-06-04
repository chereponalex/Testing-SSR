import { get } from "..";
import { config } from "../../../config";

export const getEntities = (query: any) =>
  get<any, void>(`${config.BACKEND_URL}/api/v1/crm/employee`, query);
