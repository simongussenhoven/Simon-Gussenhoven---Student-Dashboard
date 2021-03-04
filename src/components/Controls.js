export default function Controls(props) {
    return (
        <div className="container">
            <div className="mt-2 bg-light d-flex flex-row flex-wrap py-2 px-4 mx-2">
                <span className="navbar-brand">Sort by</span>
                <form onChange={props.sortReviews} className="mt-1">
                    <select default={props.sorting} className="p-1">
                        <option value="code-az">Project name (a-z)</option>
                        <option value="code-za">Project name (z-a)</option>
                        <option value="rating-up">Rating (low-high)</option>
                        <option value="rating-down">Rating (high-low)</option>
                        <option value="difficulty-up">Difficulty (low-high)</option>
                        <option value="difficulty-down">Difficulty (high-low)</option>
                    </select>
                </form>
                <span className="navbar-brand ml-md-5">Select view</span>
                <form className="mt-2 ml-3 d-flex no-wrap">
                    <label>
                        <input className="" onChange={props.selectView} type="radio" value="graph" checked={props.view === "graph"} />
                        <span className="ml-2">Graph</span>
                    </label>

                    <label>
                        <input className="ml-3" onChange={props.selectView} type="radio" value="table" checked={props.view === "table"} />
                        <span className="ml-2">Table</span>
                    </label>
                </form>
            </div>
        </div>
    );
}
