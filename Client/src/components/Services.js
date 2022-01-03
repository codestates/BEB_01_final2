import React from "react";
import "./Services.scss";
function Services() {
  return (
    <div className="Services_app">
      <div className="Services_container">
        <div className="Services_one">
          <h1>
            Services that <br></br>we continue to improve
          </h1>
          <div>
            The best choice for buying and selling your ctypto assets. with
            <br></br> the barious super friendly services we offer
          </div>
        </div>
        <div className="Services_two">
          <div className="Services_Security">
            <img src="./img/security.png" alt="search" />
            <div>
              <h2>Security gurantee</h2>
              <p>
                Security is guranteed. We always maintain privacy and<br></br>
                maintain the quality of our products
              </p>
            </div>
          </div>
          <div className="Services_Best">
            {" "}
            <img src="./img/search.jpeg" alt="search" />
            <div>
              <h2>Best exchange rates</h2>
              <p>
                Security is guranteed. We always maintain privacy and <br></br>
                maintain the qualiry of our products
              </p>
            </div>
          </div>
          <div className="Services_Fatest">
            <img src="./img/heart.jpeg" alt="heart" />
            <div>
              <h2>Fastest transactions</h2>
              <p>
                Security is guranteed. We always maintain privacy and <br></br>
                maintain the qualiry of our products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
