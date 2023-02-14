import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DateProps {
  date: string;
  fulldate?: boolean;
  fulltimestamp?: boolean;
}

const DateFormat = ({
  date,
  fulldate = false,
  fulltimestamp = false,
}: DateProps) => {
  const formatDate = (time: string) => {
    return format(new Date(time), "dd MMM yyyy", {
      locale: ptBR,
    });
  };

  const formatFullDate = (time: string) => {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy'", {
      locale: ptBR,
    });
  };

  const formatFullTimeStamp = (time: string) => {
    return format(new Date(time), "dd 'de' MMMM 'de' yyyy', às' H:mm", {
      locale: ptBR,
    });
  };

  return (
    <>
      <span>
        {fulldate && formatFullDate(date)}{" "}
        {fulltimestamp && formatFullTimeStamp(date)}
        {!fulldate && !fulltimestamp && formatDate(date)}
      </span>
    </>
  );
};

export default DateFormat;
