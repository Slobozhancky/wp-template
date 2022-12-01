import React from "react";
import wpLogo from "../assets/images/wp-logo.png";
const App = () => {
    return (
        <>
            <div className="container">
                <h1>Hello world</h1>
                <img src={wpLogo} alt="log" />
            </div>
        </>
    );
};

export default App;
