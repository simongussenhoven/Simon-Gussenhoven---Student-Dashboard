import React from "react";
import Loader from "./Loader";
import Form from "./Form";
import Slider from "./Slider";
import MainHeader from "./MainHeader";
import PersonalHeader from "./PersonalHeader";
import Tabletop from "tabletop";
import Controls from "./Controls";
import Chart from "./Chart";
import uuid from "react-uuid";
import Card from "./Card";
import Table from "./Table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getAverage, initNames, sort } from "../functions/helpers";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLoaded: false,
            personalView: false,
            sorting: "rating-down",
            view: "graph",
        };
    }
    //connect to google sheets
    componentDidMount() {
        Tabletop.init({
            key: "https://docs.google.com/spreadsheets/d/1aCgvCzSpiQ_Y7nZgh3xuhYET9fMTZwOudw_DNnIvtmA/edit?usp=sharing",
            simpleSheet: false,
        })
            //set the results from sheet 1, and the mockup data from 2
            .then((result) =>
                this.setState({
                    projectReviews: result.Sheet1.elements,
                    randomData: result.Sheet2.elements,
                })
            )
            //combine all the names with mockup data and set display: true
            .then(() => {
                this.setState({
                    selectedStudents: initNames(this.state.projectReviews, this.state.randomData),
                });
            })
            //get the averages from the reviews
            .then(() => {
                this.setState({
                    averages: getAverage(this.state.projectReviews, this.state.selectedStudents),
                });
            })
            //change hasLoaded to display the components
            .then(() => {
                this.setState({ hasLoaded: true });
            })
            .catch((err) => console.warn(err));
    }
    //helper function for the forms and buttons in the slider
    calcAndSet = (newStudents) => {
        this.setState({
            selectedStudents: newStudents,
        });
        this.setState({
            averages: sort(getAverage(this.state.projectReviews, this.state.selectedStudents), this.state.sorting),
        });
    };

    //When a name in the form is checked or unchecked change displayed to true or false
    handleForm = (event) => {
        const newStudents = this.state.selectedStudents.map((student) => {
            if (student.name === event.target.value) {
                student.displayed = event.target.checked;
                return student;
            } else {
                return student;
            }
        });
        this.setState({
            selectedStudents: newStudents,
        });
        this.calcAndSet(newStudents);
    };
    //for handling the clicks in the slider
    handleInput = (student, type) => {
        let newStudents;
        let personalView;
        if (type === "all") {
            newStudents = this.state.selectedStudents.map((person) => {
                person.displayed = true;
                personalView = false;
                return person;
            });
        } else {
            newStudents = this.state.selectedStudents.map((person) => {
                if (person.name === student) {
                    person.displayed = true;
                    return person;
                } else {
                    person.displayed = false;
                    return person;
                }
            });
            personalView = true;
        }
        this.calcAndSet(newStudents);
        this.setState({ personalView });
    };

    //changing to table or graph
    selectView = (event) => {
        this.setState({
            view: event.target.value,
        });
    };

    //sorting the data based on the dropdown
    sortReviews = (event) => {
        this.setState({
            averages: sort(this.state.averages, event.target.value),
            sorting: event.target.value,
        });
    };

    //if the personalview is selected, show the card, otherwise show the form
    getSideBar = () => {
        if (this.state.personalView === true) {
            return <Card selectedStudents={this.state.selectedStudents} />;
        } else {
            return <Form {...this.state} handleForm={this.handleForm} />;
        }
    };

    //get chart or table IF there is data, otherwise, show an error
    getContent = () => {
        const students = this.state.selectedStudents.filter((student) => {
            return student.displayed === true;
        });
        if (students.length > 0) {
            if (this.state.view === "graph") {
                return <Chart {...this.state} />;
            } else {
                return <Table {...this.state} />;
            }
        } else {
            return (
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    <h4>No data!</h4>
                    <h5>Please select at least one student</h5>
                </div>
            );
        }
    };

    getRouting = () => {
        return this.state.selectedStudents.map((student) => {
            return <Route key={uuid()} path={"/" + student.name} render={() => <PersonalHeader {...this.state} student={student} handleInput={this.handleInput} />} />;
        });
    };

    render() {
        if (this.state.hasLoaded === false) {
            return <Loader />;
        } else {
            return (
                <div className="container mt-5">
                    <Router>
                        <Slider names={this.state.selectedStudents} handleInput={this.handleInput} />
                        <Controls sortReviews={this.sortReviews} sorting={this.state.sorting} selectView={this.selectView} view={this.state.view} averages={this.state.averages} />
                        <Switch>
                            {this.getRouting()}
                            <Route key={uuid()} path="/" render={() => <MainHeader {...this.state} />} />;
                        </Switch>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-10">{this.getContent()}</div>
                                <div className="col-12 col-md-2">{this.getSideBar()}</div>
                            </div>
                        </div>
                    </Router>
                </div>
            );
        }
    }
}

export default App;
