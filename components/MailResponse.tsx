import { Status } from "../configs/types";
import Success from "../public/check-circle.svg";
import Warning from "../public/exclamation-circle.svg";
import Error from "../public/x-circle.svg";
interface IMailResponse {
  status: Status;
}

const MailResponse = ({ status }: IMailResponse) => {
  const className = "w-36 h-36";
  const textClassName = "text-xl font-bold";

  return (
    <div className="flex flex-col items-center gap-y-8">
      {status === "SUCCESS" && <Success className={className} />}
      {status === "ALREADY_VERIFIED" && <Warning className={className} />}
      {status === "ERROR" && <Error className={className} />}

      <p className={textClassName}>
        {status === "SUCCESS" || status === "ALREADY_VERIFIED"
          ? "Your account has been verified!"
          : "Something went wrong!"}
      </p>
      {status === "SUCCESS" && (
        <a
          href="decofreonsfe://app/test"
          className="rounded-md px-4 py-2 font-bold bg-neutral-100 text-primary-400 uppercase"
        >
          Back To NAMA_APP
        </a>
      )}
    </div>
  );
};

export default MailResponse;
