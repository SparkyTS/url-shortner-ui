import React from "react";
import {Button, Card, CardBody, CardText, Col, Input, Row} from "reactstrap";

export default function CardDetails() {
    return (
        <Row className="mb-3">
            <Card className="w-100 p-2">
                <Row className="p-2">
                    <Col md={9}>
                        <b>Full URL : </b> Hello world this is tanay
                    </Col>

                    <Col md={3} className="text-center">
                        <Button outline color="danger">Delete</Button>
                    </Col>
                </Row>
                <Row className="p-2">
                    <Col md={9}>
                        <b>Short Url : </b> http://localhost:8080/<a href="/hello">hello</a>
                        <Input type="text" value={'hello'}/>
                    </Col>

                    <Col md={3} className="text-center">
                        <Button outline color="primary">Edit</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}