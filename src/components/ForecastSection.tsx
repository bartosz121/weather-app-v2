import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  children?: React.ReactNode;
};

function ForecastSection({ title, children, ...props }: Props) {
  return (
    <section {...props}>
      {title ? <h2 className="text-2xl">{title}</h2> : null}
      <div className="border-t border-black">{children}</div>
    </section>
  );
}

export default ForecastSection;
