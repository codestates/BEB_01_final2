import React from "react";
import "./Popup.scss";
import { Link } from "react-router-dom";//이미지를 누르면 마이페이지로 가도록 설정할 생각입니다.


    function Popup(props) {
            
        return (props.trigger) ?(
            <div className="popup">
                <div className="popup_inner">
                    <button className="close_btn" onClick={()=>props.setTrigger(false)}>close</button>
                    {props.children}

                    <br></br>

                    <p className="popup_img">
                        <div className="Shop_App">
                        <div className="Shop_Img">
                            <img src="./img/집행검.jpg" alt="뽑기" />
                        </div>
                        </div>
                    </p>

                    <br></br>
                    
                </div>
            </div>
        
            ) : "";
        };
    
            export default Popup;
    
