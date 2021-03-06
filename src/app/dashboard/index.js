import React, {Fragment} from "react"
import CardDetails from "./CardDetails";
import {Button, Col, Container, Input, Row} from "reactstrap";
import {createNewURLMapping, getURLMappings} from "../../api/UrlMappingApi";
import {appConfigs} from "../../config/app.config";
import {toastErrorMessage, toastInfoMessage} from "../../shared/components/ToastMessage";
import Loader from "../../shared/components/Loader";
import {regexEnum} from "../../shared/enums";

const initialValues = {
    fullUrl: '',
    customShortUrl: '',
    isNewOpen: false,
}

function Dashboard() {

    const [urlMappings, setUrlMappings] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [newShortenUrlOptions, setNewShortenUrlOptions] = React.useState({
        ...initialValues
    });

    React.useEffect(() => {
        fetchUrlMappings();
    }, []);

    const fetchUrlMappings = async () => {
        setLoading(true);
        const res = await getURLMappings();
        if (res?.success) {
            setUrlMappings(res.data);
        } else {
            setUrlMappings([]);
        }
        setLoading(false);
    }

    const updateMapping = (newMapping) => {
        if(newMapping)
            setUrlMappings(urlMappings.map(urlMapping => urlMapping.id === newMapping.id ? newMapping : urlMapping));
        else
          fetchUrlMappings();
    }

    const handleChange = e => {
        setNewShortenUrlOptions({
            ...newShortenUrlOptions,
            [e.target.name]: e.target.value
        });
    }

    const toggleNew = () => {
        setNewShortenUrlOptions({
            ...newShortenUrlOptions,
            isNewOpen: !newShortenUrlOptions.isNewOpen
        })
    }

    const generateNewUrl = async () => {
        const {fullUrl, customShortUrl} = newShortenUrlOptions;
        if(!fullUrl || !fullUrl.trim()){
            toastErrorMessage("Please enter valid full url to shorten it !")
            return;
        } else if(customShortUrl && regexEnum.inValidShortUrl.test(customShortUrl)){
            toastErrorMessage("Please enter valid short url !");
            return;
        }
        const res = await createNewURLMapping(fullUrl.trim(), customShortUrl);
        if(res?.success){
            setNewShortenUrlOptions(initialValues);
            setUrlMappings([res.data, ...urlMappings]);
            toastInfoMessage("Shorten Url generated successfully !")
        }
    }


    const {fullUrl, customShortUrl, isNewOpen} = newShortenUrlOptions;

    return (
        <>
            <Container>

                <Row className="pl-2 pr-2 pt-3 pb-3 mt-3 mb-3" style={{background: "#efefef"}}>
                    <Col md={9} className="m-auto text-uppercase">
                        <b>Shorten URLs </b>
                    </Col>
                    <Col md={3} className="text-center">
                        <Button color="primary" onClick={toggleNew}>Shorten New URL</Button>
                    </Col>
                </Row>

                {isNewOpen &&
                <Row className="bg-light mb-3">
                    <Col md={12}>
                        <Row className="p-2">
                            <Col md={3} className="m-auto">
                                <b>Full URL * : </b>
                            </Col>
                            <Col md={9}>
                                <Input onChange={handleChange} placeholder="Enter original url here" name="fullUrl"
                                       style={{wordBreak: 'break-all', height: 86}}
                                       type="textarea" value={fullUrl}/>
                            </Col>
                        </Row>
                        <Row className="p-2">
                            <Col md={3} className="m-auto">
                                <b>Custom Shorten URL : </b>
                            </Col>
                            <Col md={6}>{appConfigs.API_HOST}/&nbsp;
                                <Input onChange={handleChange} className="d-inline-block w-auto" placeholder="Shorten URL (optional)"
                                       name="customShortUrl" type="text" value={customShortUrl} maxLength={15}/>
                            </Col>
                            <Col md={3}>
                                <Button id="save" outline color="primary" className="mr-2" onClick={generateNewUrl}>Generate</Button>
                                <Button outline color="secondary" onClick={() => setNewShortenUrlOptions(initialValues)}>Cancel</Button>
                            </Col>
                        </Row>
                        <p className="text-muted ml-2 mt-2">Note : If you do not wish to enter a custom url, we will generate for you !</p>
                    </Col>
                </Row>
                }

                {loading && <Loader/>}
                {!urlMappings.length && !isNewOpen &&
                <div className="text-center">
                    <p> To shorten a, URL click on 'Shorten New URL' button. </p>
                    <p> Your shortened URLs will be displayed here !</p>
                </div>}


                {
                    urlMappings.map(urlMapping =>
                        <Fragment key={urlMapping.shortUrl}>
                            <CardDetails urlMapping={urlMapping} updateMapping={updateMapping}/>
                        </Fragment>)
                }
            </Container>
        </>
    )
}

export default Dashboard;