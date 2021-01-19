import React, {useState, useEffect, useCallback} from "react";
import { Form, FormGroup, Label, CustomInput, Button, Input } from "reactstrap";
import { NavLink } from "react-router-dom";
import './css/style.css'
import './css/mobile-style.css'
import post from "../../../components/Post/Post";
import { CREATE_POST_MUTATION } from '../../../graphql'
import { useMutation } from "@apollo/client";

export default function Add(){
    const [images, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState('');
    const [body, setBody] = useState('');
    const [state, setState] = useState('');
    const [addPost] = useMutation(CREATE_POST_MUTATION)

    const createPost = useCallback(()=>{
        if (!(images&&restaurant&&body)) return
        addPost({
                variables: {
                    authorID: "81c2c68d-7464-4b23-a8cd-d65796eabe66",
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
    })

    useEffect(()=>{
        console.log(images, images.length);
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

    const selected = (s) => {
      setState(s);
    }

    return (
      <div className="App">
        <Form>
          <FormGroup>
            <Label>You Want To Add?</Label>
            <Input type="select" name="select" id="exampleSelectMulti" onChange={selected}>
                <option>Restaurant</option>
                <option>Post</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="fileBrowser">File (Up to 10MB)</Label>
            <CustomInput
              type="file"
              multiple="multiple"
              id="fileBrowser"
              label="click here to upload!"
              onChange={imageUpload}
            />
          </FormGroup>
          {images.length > 0 ? (
            <>
              <img src={images} />
            </>
          ) : (
            ""
          )}
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
        </Form>
      </div>
    );
}