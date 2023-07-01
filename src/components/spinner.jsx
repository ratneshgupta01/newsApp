import React, { Component } from "react";
import loading from "./loading.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={loading}
          alt="Loading..."
          style={{ height: "30px", width: "30x" }}
        />
      </div>
    );
  }
}

export default Spinner;
