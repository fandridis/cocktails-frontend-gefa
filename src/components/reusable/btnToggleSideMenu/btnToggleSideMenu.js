import React from "react";

const styles = {
  position: "fixed",
  top: "25px",
  right: "25px"
};

export default props => {
  return (
    <button style={styles} onClick={props.toggleSideMenu}>
      TOGGLE
    </button>
  );
};
