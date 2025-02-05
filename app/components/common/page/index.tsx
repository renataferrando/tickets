import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  navbar?: React.ReactNode | false;
}

const Page = ({ children, className, navbar = false }: Props) => {
  const classes = classNames(className, "min-h-[100vh]");
  return (
    <div className={classes}>
      <div className="m-[0_auto] lg:max-w-[90rem] h-full">
        {navbar && <>{navbar}</>}
        {children}
      </div>
    </div>
  );
};

export default Page;
