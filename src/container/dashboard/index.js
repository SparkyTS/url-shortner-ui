import React from "react"
import CardDetails from "./CardDetails";
import {Container} from "reactstrap";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <>
                <Container>
                    <CardDetails/>
                </Container>
            </>
        )
    }

}

export default Dashboard;