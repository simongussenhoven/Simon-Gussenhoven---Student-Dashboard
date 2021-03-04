export default function Card(props) {
    const student = props.selectedStudents.filter((person) => {
        return person.displayed === true;
    });
    return (
        <div className="card rounded mr-0 ml-1">
            <img className="card-img-top h-10" src={process.env.PUBLIC_URL + `/user-img/${student[0].name}.jpg`} alt={`"${student[0].name}"`} />
            <div className="card-body">
                <h5 className="card-title">
                    {student[0].name} {student[0].lastname} ({student[0].age})
                </h5>
                <span className="d-flex flex-column">
                    <strong>Email</strong> {student[0].email}
                    <strong>phone</strong> {student[0].phone}
                </span>
            </div>
        </div>
    );
}
