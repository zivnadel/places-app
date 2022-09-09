interface Props {
  children: React.ReactNode;
  className?: string;
}

const MainHeader: React.FC<Props> = ({ children }) => {
  return (
    <header className="w-full h-16 flex items-center fixed top-0 left-0 bg-secondary shadow-md py-0 px-4 z-[5] md:justify-between">
      {children}
    </header>
  );
};

export default MainHeader;
