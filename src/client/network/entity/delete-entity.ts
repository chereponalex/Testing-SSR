import { Delete } from "..";
import { config } from "../../../config";

export const deleteEntity = (id: string) => {
  return Delete<void, any>(
    `${config.PROXY_URL}/api/v1/crm/employee/soft/${id}`
  );
};
