import React from 'react';
import logo from './logo.png';

function teacherLanding() {
    return (
        <body className="teacherBody">

            <div id="logo">
                <img src={logo} alt="Logo" />
            </div>

            <div id="teacherHeading">
                <h1>Teacher Workspace</h1>
            </div>

        </body>
    )
  }

  export default teacherLanding;