import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);

    return (
      
           <div className="container">
            <div className="row">
            <div className="col-1 mx-auto loader-center">
            <div className="sweet-loading ">
                <HashLoader
                    color='blue'
                    loading={loading}
                    css=''
                    size={80}
                />
            </div>
            </div>
            </div>
           </div>

    )
}

export default Loader
