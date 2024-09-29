"use client";
import React, { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

// Define the prop types
interface SpinnerProps {
  loading: boolean;
}

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
};

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div style={override}>
      <SyncLoader
        color={"#0fa271"}
        loading={loading} // Use the loading prop
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
