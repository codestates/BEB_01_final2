import React from "react";
import Welcome from "./Welcome/Welcome";
import Services from "./Services/Services";
import { Member } from "./main";

function Homepage() {
  return (
    <div>
      <Welcome />
      <Services />
      <Member />
    </div>
  );
}

export default Homepage;
