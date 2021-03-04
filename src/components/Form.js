import uuid from "react-uuid";
function Form(props) {
    return (
        <form className="ml-5 mt-2 d-flex flex-column">
            {props.selectedStudents.map((student) => {
                if (student.displayed === true) {
                    return (
                        <label key={uuid()}>
                            <input onChange={props.handleForm} type="checkbox" className="form-check-input" value={student.name} defaultChecked={true} />
                            <span className="form-check-label ml-3">{student.name}</span>
                        </label>
                    );
                } else {
                    return (
                        <label key={uuid()}>
                            <input onChange={props.handleForm} type="checkbox" className="form-check-input" value={student.name} defaultChecked={false} />
                            <span className="form-check-label ml-3">{student.name}</span>
                        </label>
                    );
                }
            })}
        </form>
    );
}
export default Form;
