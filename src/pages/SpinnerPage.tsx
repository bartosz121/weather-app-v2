import clsx from "clsx";

import Spinner from "../components/Spinner";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

function SpinnerPage({ children, ...props }: Props) {
  return (
    <div
      className={clsx(
        "flex h-screen w-screen items-center justify-center",
        "bg-slate-900"
      )}
    >
      <Spinner size="xxl" color="slate" />
    </div>
  );
}

export default SpinnerPage;
