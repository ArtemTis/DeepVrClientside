import loadIcon from "../../assets/load.svg";
import "./CommonStyles.css";
import { IChildren } from "../utils/types";

interface Props {
  children?: IChildren;
  isLoading: boolean;
  height?: number;
}

export const LoadWrapper: React.FC<Props> = ({
  isLoading,
  children,
  height = 5,
}) => {
  return (
    <>
      {isLoading ? (
        <div
          className="load-icon-container-lg-wrapper"
          style={
            height
              ? { height: `calc(var(--icon-height) * ${height})` }
              : undefined
          }
        >
          <div className="load-icon-container">
            <img src={loadIcon} alt="load" className="load-icon load-icon-lg" />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
