import { Status } from "../configs/types";
import MailSuccess from "../public/mail-success.svg";
import MailError from "../public/mail-error.svg";
import MailExpired from "../public/expired.svg";
import Loading from "../public/loading.svg";

interface IMailResponseIcon {
  status: Status;
}
const MailResponseIcon = ({ status }: IMailResponseIcon) => {
  const className = "w-32 h-32 text-primary-400 fill-primary-400";

  switch (status) {
    case "SUCCESS":
      return <MailSuccess className={className} />;
    case "ERROR":
      return <MailError className={className} />;

    case "EXPIRED":
      return <MailExpired className={className} />;

    case "LOADING":
      return <Loading className={`${className} animate-spin`} />;

    default:
      return null;
  }
};

export default MailResponseIcon;
