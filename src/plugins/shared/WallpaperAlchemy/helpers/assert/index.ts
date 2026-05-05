import { errorCodes } from "../../constants/errorCodes";

export const assertSuccess = <
  T extends { success?: boolean; message?: string },
>(
  response: T,
) => {
  if (!response?.success) {
    throw new Error(response?.message || errorCodes.SERVER_ERROR);
  }
};
