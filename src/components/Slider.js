import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
function Slider(props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    const dark = "bg-dark"
    return (
        <div className="container">
            <Carousel responsive={responsive}>
                <Link className="d-flex justify-content-center text-decoration-none text-dark" to="/" onClick={() => props.handleInput("all", "all")}>
                    <div key={uuid()} className="card mx-2">
                        <div className="card-body d-flex justify-content-center align-content-center flex-column">
                            <img className="w-50 rounded-circle mx-auto" src={process.env.PUBLIC_URL + `/user-img/users.png`} alt="users" />
                            <h5 className="card-title mx-auto my-2">All users</h5>
                        </div>
                    </div>
                </Link>
                {props.names.map((student) => {
                    return (
                        <Link className="d-flex justify-content-center text-decoration-none text-dark" to={`/${student.name}`} onClick={() => props.handleInput(student.name, "click")}>
                            <div key={uuid()} className="card mx-2">
                                <div className="card-body d-flex justify-content-center align-content-center flex-column">
                                    <img className="w-50 rounded-circle mx-auto" src={process.env.PUBLIC_URL + `/user-img/${student.name}.jpg`} alt={`"${student.name}"`} />
                                    <h5 className="card-title mx-auto my-2">
                                        {student.name} {student.lastname}
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </Carousel>
        </div>
    );
}
export default Slider;
