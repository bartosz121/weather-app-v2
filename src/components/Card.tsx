import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  flexSize?: string;
  extraClassName?: string;
  onClick?: () => void;
};

function Card({
  children,
  flexSize,
  extraClassName,
  onClick: onClickProp,
}: Props) {
  return (
    <div
      onClick={onClickProp && onClickProp}
      className={clsx(
        flexSize ? flexSize : "shrink-0 grow basis-44",
        "border border-white border-opacity-0 bg-white bg-opacity-20 text-center transition-all hover:border-opacity-100 hover:bg-opacity-40",
        extraClassName ? extraClassName : null
      )}
    >
      {children}
    </div>
  );
}

export default Card;
