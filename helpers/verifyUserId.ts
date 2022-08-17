import isNumeric from "./isNumeric";

const verifyUserId = (userId: string | string[] | undefined) => {
  const isString = typeof userId === "string";
  return isString ? (isNumeric(userId) ? Number(userId) : userId) : "";
};

export default verifyUserId;
