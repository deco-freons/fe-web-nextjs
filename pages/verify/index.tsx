import { GetServerSideProps, NextPage } from "next";
import MailResponse from "../../components/MailResponse";
import { Status } from "../../configs/types";
import apiClient from "../../network/apiClient";

interface IVerify {
  status: Status;
}

const Verify: NextPage<IVerify> = ({ status }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <MailResponse status={status} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IVerify> = async (ctx) => {
  const { uid, token } = ctx.query;

  // Check type of uid and token
  let id = null;
  let emailToken = null;

  if (typeof uid === "string") {
    id = uid;
  }

  if (typeof token === "string") {
    emailToken = token;
  }

  // Request to backend
  // Set Status of response to display correct component (email verified, already verified, error)
  let status: Status;
  try {
    const res = await apiClient.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = res.data;
    status = "SUCCESS";
  } catch (error) {
    // CHECK IF ALREADY VERIFIED ERROR
    status = "ERROR";
  }

  return {
    props: { status },
  };
};

export default Verify;
