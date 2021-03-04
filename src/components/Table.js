function Row(props) {
    console.log(props);
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
        <div className="overflow-auto col-12 col-md-10" style={{ height: 450 }}>
            <table className="table">
                <thead>
                    <th>Project name</th>
                    <th>Average rating</th>
                    <th>Average difficulty</th>
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
