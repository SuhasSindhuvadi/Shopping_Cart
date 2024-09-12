import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="container">
            <div className="product py-2">
                <div className="details p-3">z
                    Page not found. Go to{"  "}
                    <Link to="/">
                        homepage
                    </Link>
                    .
                </div>
            </div>
        </div>
    )
}

export default NotFound; 
