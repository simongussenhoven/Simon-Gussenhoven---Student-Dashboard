const initNames = (projectReviews, data) => {
    const students = [...new Set(projectReviews.map((rating) => rating.name))];
    const selectedStudents = students.map((student) => {
        const otherData = data.splice(0, 1)[0];

        const totalData = {
            name: student,
            displayed: true,
            dataDisplayed: false,
            ...otherData,
        };
        return totalData;
    });
    return selectedStudents;
};

const getAverage = (reviews, students) => {
    //list of all projects, name only
    const projects = [...new Set(reviews.map((record) => record.project))];

    //list of filtered students, only names
    const filteredStudents = [];
    students.forEach((student) => {
        if (student.displayed === true) {
            filteredStudents.push(student.name);
        }
    });
    //filter reviews on selected students
    const filteredReviews = reviews.filter((review) => {
        return filteredStudents.includes(review.name);
    });

    //get averages for each project
    const averages = projects.map((project) => {
        let avgDiff = [];
        let avgRating = [];
        let length = 0;
        filteredReviews.forEach((review) => {
            if (review.project === project) {
                length++;
                avgDiff.push(parseInt(review.difficulty));
                avgRating.push(parseInt(review.rating));
            }
        });
        return {
            project: project.replace(" - Project -", " - "),
            avgDiff: avgDiff.reduce((a, b) => a + b, 0) / length,
            avgRating: avgRating.reduce((a, b) => a + b, 0) / length,
            displayed: true,
        };
    });
    return averages;
};
//function to sort array of averages
const sort = (array, type) => {
    switch (type) {
        case "code-az":
            return array.sort((a, b) => (a.project > b.project ? 1 : -1));
        case "code-za":
            return array.sort((a, b) => (a.project < b.project ? 1 : -1));
        case "rating-up":
            return array.sort((a, b) => (a.avgRating > b.avgRating ? 1 : -1));
        case "rating-down":
            return array.sort((a, b) => (a.Rating < b.Rating ? 1 : -1));
        case "difficulty-up":
            return array.sort((a, b) => (a.avgDiff > b.avgDiff ? 1 : -1));
        case "difficulty-down":
            return array.sort((a, b) => (a.avgDiff < b.avgDiff ? 1 : -1));
        default:
            break;
    }
};

export { getAverage, initNames, sort };
