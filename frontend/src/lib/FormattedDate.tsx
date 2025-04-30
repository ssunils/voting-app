import { format } from 'date-fns';

interface FormattedDateProps {
  value: string | number | Date;
}

export function FormattedDate({ value }: FormattedDateProps) {
  if (!value) return '-';

  const parsedDate = new Date(value);

  if (isNaN(parsedDate.getTime())) {
    return <span>Invalid Date</span>;
  }

  const formatted = format(parsedDate, 'dd, MMM HH:mm');

  return <span>{formatted}</span>;
}
