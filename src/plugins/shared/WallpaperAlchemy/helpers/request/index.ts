import { errorCodes } from "../../constants/errorCodes";

export const checkResponseStatus = <
  T extends { success?: boolean; message?: string },
>(
  response: T,
  status: string,
): boolean => {
  return !!(response && response.message && response.message === status);
};

export const checkIsResponseServerError = <
  T extends { success?: boolean; message?: string },
>(
  response: T,
): boolean => {
  return (
    response &&
    response.success === false &&
    (!response.message || response.message === errorCodes.SERVER_ERROR)
  );
};
