import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  flexSize?: string;
  onClick?: () => void;
};

function Card({ children, flexSize, onClick: onClickProp }: Props) {
  return (
    <div
      onClick={onClickProp && onClickProp}
      className={clsx(
        flexSize ? flexSize : "shrink-0 grow basis-44",
        "cursor-pointer border border-black bg-slate-700 bg-opacity-50 text-center hover:bg-opacity-100"
      )}
    >
      {children}
    </div>
  );
}

export default Card;
