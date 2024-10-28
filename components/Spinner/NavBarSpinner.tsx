"use client";
import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Define the prop types
interface SpinnerProps {
  loading: boolean;
}

// const override: CSSProperties = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
//   width: "100%",
// };

const NavBarSpinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div>
      <ClipLoader
        color={"#0fa271"}
        loading={loading} // Use the loading prop
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default NavBarSpinner;
