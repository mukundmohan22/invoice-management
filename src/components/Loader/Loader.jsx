import { HashLoader } from "react-spinners";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="modal">
      <HashLoader size={70} color={"#5619a6"} />
    </div>
  );
};

export default Loader;
