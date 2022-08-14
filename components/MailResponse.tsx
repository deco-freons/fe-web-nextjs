import { Status } from "../configs/types";
import MailSuccess from "../public/mail-success.svg";
import MailError from "../public/mail-error.svg";
import MailLoading from "../public/envelope.svg";
import Loading from "../public/loading.svg";
interface IMailResponse {
  status: Status;
  message: string;
}

const MailResponse = ({ status, message }: IMailResponse) => {
  const className = "w-36 h-36 sm:w-52 sm:h-52";
  const textClassName = "text-xl sm:text-2xl font-bold";

  return (
    <div className="flex flex-col items-center gap-y-8">
      {status === "SUCCESS" && <MailSuccess className={className} />}
      {status === "ERROR" && <MailError className={className} />}
      {status === "LOADING" && <MailLoading className={className} />}

      {status === "LOADING" && <Loading className="w-12 h-12 animate-spin" />}
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
