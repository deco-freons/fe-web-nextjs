import { Status } from "../configs/types";
import Success from "../public/mail-success.svg";
import Error from "../public/mail-error.svg";
interface IMailResponse {
  status: Status;
  message: string;
}

const MailResponse = ({ status, message }: IMailResponse) => {
  const className = "w-36 h-36 sm:w-52 sm:h-52";
  const textClassName = "text-xl sm:text-2xl font-bold";

  return (
    <div className="flex flex-col items-center gap-y-8">
      {status === "SUCCESS" && <Success className={className} />}
      {status === "ERROR" && <Error className={className} />}
      <p className={textClassName}>{message}</p>
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
