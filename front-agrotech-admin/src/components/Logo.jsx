
import { Link } from "react-router-dom";



export function Logo() {

    return (

        <>
            <Link to="/products"> <img src="../agrotech.png" alt="logo" className="logo" width={300} /></Link>
        </>
    )
}