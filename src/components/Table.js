import uuid from "react-uuid";
function Row(props) {
    return (
        <tr>
            <td>{props.project}</td>
            <td>{props.avgDiff.toFixed(2)}</td>
            <td>{props.avgRating.toFixed(2)}</td>
        </tr>
    );
}

function Table(props) {
    return (
        <div className="overflow-auto" style={{ height: 550 }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Project name</th>
                        <th>Average rating</th>
                        <th>Average difficulty</th>
                    </tr>
                </thead>
                <tbody className="overflow-auto">
                    {props.averages.map((rating) => {
                        return <Row {...rating} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
