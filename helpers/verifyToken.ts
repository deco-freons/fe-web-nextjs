const verifyToken = (token: string | string[] | undefined) => typeof token === "string" ? token : ""

export default verifyToken