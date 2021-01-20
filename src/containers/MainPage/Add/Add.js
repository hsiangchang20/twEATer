import React, {useState, useEffect, useCallback} from "react";
import { Form, FormGroup, Label, CustomInput, Button, Input, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import './css/style.css'
import './css/mobile-style.css'
import './font-awesome-4.7.0/css/font-awesome.css'
import post from "../../../components/Post/Post";
import { CREATE_POST_MUTATION, CREATE_RESTAURANT_MUTATION, USER_QUERY } from '../../../graphql'
import { useMutation, useQuery } from "@apollo/client";

export default function Add(props){
    const { userid } = props.match.params;
    const [images, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState('');
    const [body, setBody] = useState('');
    const [state, setState] = useState('');
    const [openhours, setOpenhours] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [tele, setTele] = useState('');
    const [time, setTime] = useState('');
    const [cost, setCost] = useState('');
    const [staple, setStaple] = useState('');
    const [location, setLocation] = useState('');
    const [Star, setStar] = useState('');
    //tweat
    const [tweat_res, setTweat_res] = useState('');
    const [tweat_time, setTweat_time] = useState('');
    const [tweat_people, setTweat_people] = useState('');
    const [tweat_body, setTweat_body] = useState('');
    const [addPost] = useMutation(CREATE_POST_MUTATION);
    const [addRestaurant] = useMutation(CREATE_RESTAURANT_MUTATION);

    /*
    const createTweat = useCallback(() => {
        if (!(tweat_res&&tweat_time&&tweat_people&&tweat_body)) return
        addTweat({
            variables: {
                
                //authorID: userid,
                //餐廳:tweat_res
                //內文:tweat_body
                //人數:tweat_people
                //時間:tweat_time
                
            }
        });
        setTweat_body('');
        setTweat_people(0);
        setTweat_res('');
        setTweat_time('');
    })
    */

    const createPost = useCallback(()=>{
        if (!(images&&restaurant&&body)) return
        addPost({
            variables: {
                authorID: userid,
                photo: images,
                body: body,
                restaurant: restaurant,
                thumb: 0
            }
        });
        setImage('');
        setLoading(false);
        setBody('');
        setRestaurant('');
        setState('');
    })

    const createRestaurant = useCallback(()=>{
        if(!(restaurant&&openhours&&type&&address&&tele)) {
            console.log('missing');
            return
        }
        addRestaurant({
            variables: {
                name: restaurant,
                type: type,
                Openhours: openhours,
                address: address,
                tele: tele,
                time: time,
                cost: cost,
                staple: staple,
                location: location,
                Star: Star,
            }
        })
        setAddress('');
        setRestaurant('');
        setOpenhours('');
        setTele('');
        setTele('')
        setLoading(false);
        setState('');
        setTime('');
        setCost('');
        setStar('');
        setStaple('');
        setLocation('');
    })

    const imageUpload = async e => {
        setLoading({ loading: true });
        let files = [];
        for (const file of e.target.files) files.push(file);
        await imageUploadToImgur(files);
    };

    const imageUploadToImgur = async (files, index = 0) => {
        const REACT_APP_CLIENT_ID = "c61f0a8cc317dc8";
        const formData = new FormData();
        formData.append("type", "file");
        formData.append("image", files[index]);
        const response = await fetch("https://api.imgur.com/3/upload.json", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Client-ID ${REACT_APP_CLIENT_ID}`
            },
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            const name = files[index].name;
            console.log(`$file (${name}) upload success!`);
            console.log(data);
            setImage(data.data.link);
        } 
        else {
            console.log(`${index}번째 이미지 업로드 실패...`);
        }
        if (index === files.length - 1) return setLoading({ loading: false });
        await this.imageUploadToImgur(files, index + 1);
    };

    const selected = (event) => {
        console.log(event.target.value)
        setState(event.target.value);
    }

    const selectType = (event) => {
        setType(event.target.value)
    }

    const selectTime = (event) => {
        setTime(event.target.value)
    }

    const selectCost = (event) => {
        setCost(event.target.value)
    }

    const selectStaple = (event) => {
        setStaple(event.target.value)
    }

    const selectLocation = (event) => {
        setLocation(event.target.value)
    }

    const selectStar = (event) => {
        setStar(event.target.value)
    }

    const selectMaxPeople = (event) => {
        setTweat_people(event.target.value)
    }

    return (
        <div className="App">
            <link 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" 
                rel="stylesheet"  type='text/css'/>
            <div>
                <FormGroup>
                    <div><p className="add-title">You Want To Add?</p></div>
                    <select className="add-select" type="select" name="select" id="exampleSelectMulti" onChange={selected}>
                        <option>Type</option>
                        <option>twEAT!!</option>
                        <option>Restaurant</option>
                        <option>Post</option>
                    </select>
                </FormGroup>
                {state==='Post'? (<FormGroup>
                    <Label className="add-label" for="fileBrowser">File (Up to 10MB)</Label>
                    <input
                        className="add-uploadfile"
                        type="file"
                        multiple="multiple"
                        id="fileBrowser"
                        label="click here to upload!"
                        onChange={imageUpload}
                    />
                </FormGroup>): ""}
                {(images.length > 0 && state==='Post') ? (
                    <>
                      <img src={images} />
                    </>
                ) : (
                    ""
                )}
                {state==='Post'? ( <>
                    <FormGroup>
                        <Label className="add-label">Restaurant</Label>
                        <Input className="add-input" placeholder="Restaurant" 
                                onChange={(e) => setRestaurant(e.target.value)}
                                value={restaurant}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Article</Label>
                        <Input className="add-input" type="textarea" 
                                name="text" 
                                placeholder="Article" 
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                        />
                    </FormGroup>
                    <div className="add-btn-container">
                        <Button className="add-submit-btn" onClick={createPost}>Submit</Button>
                    </div>
                </>): ""}
                {state==='Restaurant'? ( <>
                    <FormGroup>
                        <Label className="add-label">Restaurant</Label>
                        <Input className="add-input" placeholder="Name" 
                                onChange={(e) => setRestaurant(e.target.value)}
                                value={restaurant}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <Row>
                    <Col md={4}>
                    <FormGroup>
                        <Input className="add-select fa" type="select" placeholder="Type" onChange={selectType} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf1b1; TYPE</option>
                            <option>Taiwanese</option>
                            <option>American</option>
                            <option>Japanese</option>
                            <option>Italian</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Input className="add-select fa" type="select" placeholder="Time" onChange={selectTime} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf017; TIME</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Input className="add-select fa" type="select" placeholder="Cost" onChange={selectCost} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf155; COST</option>
                            <option>Under $100</option>
                            <option>$100~$200</option>
                            <option>$200~$300</option>
                            <option>Over $300</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={4}>
                    <FormGroup>
                        <Input className="add-select fa" type="select" placeholder="Staple" onChange={selectStaple} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf0f4; STAPLE</option>
                            <option>Rice</option>
                            <option>Noodle</option>
                            <option>Others</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Input className="add-select fa" type="select" placeholder="Location" onChange={selectLocation} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf024; LOCATION</option>
                            <option>Taiwan</option>
                            <option>South Africa</option>
                            <option>Republic of Sierra Leone</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Input className="add-select fa" type="select" placeholder="Star" onChange={selectStar} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf005; STAR</option>
                            <option>5</option>
                            <option>3~5</option>
                            <option>Under 3</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                        <Label className="add-label">Openhours</Label>
                        <Input  className="add-input"
                                placeholder="Type" 
                                onChange={(e) => setOpenhours(e.target.value)}
                                value={openhours}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Address</Label>
                        <Input  className="add-input"
                                placeholder="Type" 
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Telephone</Label>
                        <Input  className="add-input"
                                placeholder="Type" 
                                onChange={(e) => setTele(e.target.value)}
                                value={tele}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <div className="add-btn-container">
                        <Button className="add-submit-btn" onClick={createRestaurant}>Submit</Button>
                    </div>
                </>): ""}
                {state==='twEAT!!'? ( <>
                    <FormGroup>
                        <Label className="add-label">Restaurant</Label>
                        <Input className="add-input" placeholder="Name" 
                                onChange={(e) => setTweat_res(e.target.value)}
                                value={tweat_res}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleTime" className="add-label">Time</Label>
                        <Input
                        className="add-input"
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={tweat_time}
                        onChange={(e) => setTweat_time(e.target.value)}
                        style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label className="add-label">Maximum Number of People</Label>
                        <Input className="add-select fa" type="select" placeholder="Maximum Number of People" onChange={selectMaxPeople} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">&#xf1ae; Number</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="add-label">Article</Label>
                        <Input className="add-input" placeholder="Name" 
                                onChange={(e) => setTweat_body(e.target.value)}
                                value={tweat_body}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <div className="add-btn-container">
                        <Button className="add-submit-btn" onClick={/*createTweat*/console.log("createtweat")}>Submit</Button>
                    </div>
                    </>): ""}
            </div>
        </div>
    );
}