import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  navbar?: React.ReactNode | false;
}

const Page = ({ children, className, navbar = false }: Props) => {
  const classes = classNames(
    className,
    "m-[0_auto] lg:max-w-[90rem] h-[100vh]"
  );
  return (
    <div className={classes}>
      {navbar && <>{navbar}</>}
      {children}
    </div>
  );
};

export default Page;
