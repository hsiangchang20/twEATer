import React, {useState, useEffect, useCallback} from "react";
import { Form, FormGroup, Label, CustomInput, Button, Input, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import './css/style.css'
import './css/mobile-style.css'
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
    const [addPost] = useMutation(CREATE_POST_MUTATION);
    const [addRestaurant] = useMutation(CREATE_RESTAURANT_MUTATION);

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

    return (
        <div className="App">
            <Form>
                <FormGroup>
                    <Label>You Want To Add?</Label>
                    <Input type="select" name="select" id="exampleSelectMulti" onChange={selected}>
                        <option>Type</option>
                        <option>Restaurant</option>
                        <option>Post</option>
                    </Input>
                </FormGroup>
                {state==='Post'? (<FormGroup>
                    <Label for="fileBrowser">File (Up to 10MB)</Label>
                    <Input
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
                        <Label>Restaurant</Label>
                        <Input  placeholder="Restaurant" 
                                onChange={(e) => setRestaurant(e.target.value)}
                                value={restaurant}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Article</Label>
                        <Input  type="textarea" 
                                name="text" 
                                placeholder="Article" 
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                        />
                    </FormGroup>
                    <Button onClick={createPost}>Submit</Button>
                </>): ""}
                {state==='Restaurant'? ( <>
                    <FormGroup>
                        <Label>Restaurant</Label>
                        <Input  placeholder="Restaurant" 
                                onChange={(e) => setRestaurant(e.target.value)}
                                value={restaurant}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <Row>
                    <Col md={4}>
                    <FormGroup>
                        <Label>Type</Label>
                        <Input  type="select" placeholder="Type" onChange={selectType} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">TYPE</option>
                            <option>Taiwanese</option>
                            <option>American</option>
                            <option>Japanese</option>
                            <option>Italian</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label>Time</Label>
                        <Input  type="select" placeholder="Time" onChange={selectTime} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">TIME</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label>Cost</Label>
                        <Input  type="select" placeholder="Cost" onChange={selectCost} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">COST</option>
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
                        <Label>Staple</Label>
                        <Input  type="select" placeholder="Staple" onChange={selectStaple} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">Staple</option>
                            <option>Rice</option>
                            <option>Noodle</option>
                            <option>Others</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label>Location</Label>
                        <Input  type="select" placeholder="Location" onChange={selectLocation} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">Location</option>
                            <option>Taiwan</option>
                            <option>South Africa</option>
                            <option>Republic of Sierra Leone</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label>Star</Label>
                        <Input  type="select" placeholder="Star" onChange={selectStar} style={{ marginBottom: 10 }}>
                            <option placeholder="" value="">Star</option>
                            <option>5</option>
                            <option>3~5</option>
                            <option>Under 3</option>
                        </Input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                        <Label>Openhours</Label>
                        <Input  placeholder="Type" 
                                onChange={(e) => setOpenhours(e.target.value)}
                                value={openhours}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input  placeholder="Type" 
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telephone</Label>
                        <Input  placeholder="Type" 
                                onChange={(e) => setTele(e.target.value)}
                                value={tele}
                                style={{ marginBottom: 10 }}
                        />
                    </FormGroup>
                    <Button onClick={createRestaurant}>Submit</Button>
                </>): ""}
            </Form>
        </div>
    );
}