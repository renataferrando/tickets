const Navbar = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <div className="flex z-10 justify-between items-center w-full py-10 mx-auto px-20 absolute top-0 left-0">
      {left}
      {right}
    </div>
  );
};

export default Navbar;
