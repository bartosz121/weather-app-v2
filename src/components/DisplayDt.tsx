type Props = React.HTMLAttributes<HTMLSpanElement> & {
  dt: number;
  dtFormat: Intl.DateTimeFormat;
};

function DisplayDt({ dt, dtFormat, ...props }: Props) {
  const date = new Date(dt);

  return <span {...props}>{dtFormat.format(date)}</span>;
}

export default DisplayDt;
