function PersonalHeader(props) {
    return (
        <div className="container my-3">
            <h2 className="display-5 my-1 text-center">{props.student.name}'s reviews</h2>
        </div>
    );
}

export default PersonalHeader;
