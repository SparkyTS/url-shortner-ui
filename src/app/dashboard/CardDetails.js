import React from "react";
import {Button, Card, Col, Input, Row, Tooltip} from "reactstrap";
import {appConfigs} from "../../config/app.config";
import {deleteMapping, updateURLMapping} from "../../api/UrlMappingApi";
import {toastErrorMessage, toastInfoMessage} from "../../shared/components/ToastMessage";
import useClippy from "use-clippy/use-clippy";
import {regexEnum} from "../../shared/enums";

export default function CardDetails({urlMapping, updateMapping}) {

    //Copy Shorten url related variables
    const [copyTooltipOpen, setCopyTooltipOpen] = React.useState(false);
    const toggleToolTip = () => setCopyTooltipOpen(!copyTooltipOpen);
    const [, setClipboard] = useClippy();
    const copyShortenUrl = () => {
        setClipboard(`${appConfigs.API_HOST}/${urlMapping.shortUrl}`);
    }


    // url mapping related variables
    const [mappingOptions, setMappingOptions] = React.useState({
        isEdit: false,
        isExpanded: false,
        ...urlMapping
    });

    const toggleExpanded = () => {
        setMappingOptions({
            ...mappingOptions,
            isExpanded: !mappingOptions.isExpanded,
        })
    }

    const deleteUrl = async () => {
        await deleteMapping(urlMapping.id);
        updateMapping();
    }

    const toggleEdit = async (e, withSave = false) => {
        const newIsEdit = !mappingOptions.isEdit;
        let newShortUrl = mappingOptions.shortUrl;
        if(withSave) {
            if(!shortUrl) toastErrorMessage("Please enter new short url to update !")
            if(shortUrl === urlMapping.shortUrl) {
                setMappingOptions({...mappingOptions, isEdit: false});
                return;
            }
            if(shortUrl &&  regexEnum.inValidShortUrl.test(shortUrl)){
                toastErrorMessage("Please enter valid short url !");
                return;
            }
            const res = await updateURLMapping(urlMapping.id, shortUrl);
            if(res?.success){
                toastInfoMessage(res.message);
                updateMapping(res.data);
            } else {
                newShortUrl = urlMapping.urlMapping;
                setMappingOptions({
                    ...mappingOptions,
                    shortUrl: newShortUrl,
                    isEdit: newIsEdit,
                });
            }
        } else {
            setMappingOptions({
                ...mappingOptions,
                shortUrl: urlMapping.shortUrl,
                isEdit: newIsEdit
            });
        }
    }

    const handleOnChange = e => {
        setMappingOptions({...mappingOptions, [e.target.name]: e.target.value})
    }

    const {shortUrl, isExpanded, isEdit} = mappingOptions;
    return (
        <Row className="mb-3">
            <Card className="w-100 p-2">
                {/*FULL URL SECTION */}
                <Row className="p-2">
                    <Col md={2}><b>Full URL : </b></Col>
                    <Col md={7}>
                        {
                            isExpanded || urlMapping.fullUrl.length <= 120 ?
                                urlMapping.fullUrl
                                :
                                <>
                                    {urlMapping.fullUrl.substring(0, 120)}&nbsp;
                                    <input type="button" className="border-0 bg-transparent text-primary" value="show more" onClick={toggleExpanded}/>
                                </>
                        }
                        &nbsp;{isExpanded &&
                    <input type="button" className="border-0 bg-transparent text-primary" value="hide" onClick={toggleExpanded}/>}
                    </Col>

                    <Col md={3} className="text-center">
                        <Button outline color="danger" onClick={deleteUrl}>Delete</Button>
                    </Col>
                </Row>

                {/*SHORTEN URL SECTION*/}

                <Row className="p-2">
                    <Col md={2} className="m-auto"> <b>Shorten Url : </b> </Col>
                    <Col md={7}>
                        {appConfigs.API_HOST}/
                        {isEdit ?
                            <Input className="d-inline-block w-auto ml-1"
                                   onChange={handleOnChange} name="shortUrl" type="text" value={shortUrl} maxLength={15} autoFocus/>
                            :
                            <>
                                <a href={`${appConfigs.API_HOST}/${shortUrl}`} target="_blank">{shortUrl}</a>

                                <button className="far fa-copy btn" onClick={copyShortenUrl} id="copy-tooltip"/>
                                <Tooltip
                                    placement={"right"}
                                    isOpen={copyTooltipOpen}
                                    target={"copy-tooltip"}
                                    toggle={toggleToolTip}
                                >
                                    Copy Shorten Url
                                </Tooltip>
                            </>
                        }
                    </Col>

                    <Col md={3} className="text-center">
                        {isEdit ?
                            <>
                                <Button id="save" outline color="primary" onClick={(e) => toggleEdit(e, true)}>Save</Button>
                                &nbsp;
                                <Button outline color="secondary" onClick={toggleEdit}>Cancel</Button>
                            </>
                            :
                            <Button id="edit" outline color="primary" onClick={toggleEdit}>Edit</Button>
                        }
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}