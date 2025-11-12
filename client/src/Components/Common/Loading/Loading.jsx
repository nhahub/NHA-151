import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className={`flex justify-center items-center fixed bottom-0 bg-white h-[100vh] w-[100vw] mx-auto z-50 `}
    >
      <HashLoader
        color="oklch(45.3% 0.124 130.933)"
        speedMultiplier={2}
        size={80}
      />
    </div>
  );
};

export default Loading;
