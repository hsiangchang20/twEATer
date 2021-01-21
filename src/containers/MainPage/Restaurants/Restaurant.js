import React, { useEffect, useState } from "react";
import "./restaurant.css";
import {RESTAURANT_QUERY, USER_QUERY} from '../../../graphql'
import { useQuery, useLazyQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import fruits from "../fruits/fruits";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import Geocode from "react-geocode";

export default function Restaurant(props) {
    //const restaurantIDs = ["1", "2", "3", "4", "5", "6", "7"];
    const { name, userid } = props.match.params;
    const { loading, error, data} = useQuery(RESTAURANT_QUERY, {variables: {name: name}});
    const { data: userData } = useQuery(USER_QUERY, {variables: {query: userid}})
    const [rest, {loading2, data2}] = useLazyQuery(RESTAURANT_QUERY)
    const [restaurant, setRestaurant] = useState('dao')
    const [photo, setPhoto] = useState('')
    const [posts, setPosts] = useState([]);

	const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
    const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]

//////////////////////////
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);  // Hides or shows the InfoWindo
    const [activeMarker, setActiveMarker] = useState({});          // Shows the active marker upon click
    const [selectedPlace, setSelectedPlace] = useState({});
    const [position, setPosition] = useState({lat: 1, lng: 1});

    const containerStyle = {
        width: '600px',
        height: '600px'
      };
    const center = {
        lat: 25.01918,
        lng: 121.53191
      };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAYkLoO3spHeJHdVi763GLCRAq-KMgbDmo"
    })

    const [map, setMap] = useState(null)
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        Geocode.setApiKey("AIzaSyAYkLoO3spHeJHdVi763GLCRAq-KMgbDmo");
        Geocode.setLanguage("zh-TW");
        Geocode.fromAddress(restaurant.address).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              setPosition({lat: lat, lng: lng});
            },
            error => {
              console.error(error);
              console.log(restaurant.address)
            }
          );
        console.log('hi')
    }, [restaurant])

/////////////////////////////
    
    useEffect(()=>{    
        // console.log(data)    
        if (data && (data.restaurant[0])){
            setRestaurant(data.restaurant[0]);
            if (data.restaurant[0].posts[0]){
                setPhoto(data.restaurant[0].posts[0].photo)
            }
            
        }
    })

    useEffect(()=>{
        if(userData&&data){
            let POST = [];
            for(let i=0;i<data.restaurant[0].posts.length;i++){
                if(userData.users[0].Like.includes(data.restaurant[0].posts[i]._id)){
                    const dao = {...data.restaurant[0].posts[i]}
                    dao.liked = true;
                    POST.push(dao)
                }
                else{
                    const dao = {...data.restaurant[0].posts[i]}
                    dao.liked = false;
                    POST.push(dao)
                }
            }
            console.log(POST)
            setPosts(POST);
        }
    }, [userData, data])

    const Time = (t) => {
        var time = new Date();
        time.setTime(t);
        //console.log(time);
        return time
    }

    const google_map = (
        <div className="map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={19}
                onUnmount={onUnmount}
            >
                <Marker
                    onClick={(props, marker, e) => {
                        setSelectedPlace(props);
                        setActiveMarker(marker);
                        setShowingInfoWindow(true);
                    }}
                    key={restaurant.name}
                    position={position}
                />
            </GoogleMap>
        </div>
        )

    const restaurant_view = (restaurant === 'dao') ? (<div className="name"><p>Restaurant does not exist</p></div>) : (
        <div className="wrap-restaurant">
            <div className="name">
                <p>{'< ' + restaurant.name + ' >'}</p>
            </div>
            {photo!==""?<img className="photo" src={photo}></img>:""}
            <div className="info">
                <p>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.type}</p>
                <p>Telephone&ensp;&nbsp;:&nbsp;&nbsp; {restaurant.tele}</p>
                <p>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.address}</p>
                <p>Openhours&nbsp;&nbsp;:&nbsp;&nbsp; {restaurant.Openhours}</p>
            </div>
            {isLoaded ? google_map : <>{console.log('no map')}</>}
        </div>
    )

    const posts_list = (!restaurant.posts) ? (<></>) : posts.map(post => (
        <div className="wrap-post100" key={post.time}>
            <div className="posts-overview">
                <div className="posts-userdata">
                    <img src={fruitlist[post.users[0].fruit]} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{post.users[0].name}</p>
                    </div>
                </div>
                <div className="posts-restaurant">
                    <p>{"< " + restaurant.name + " >"}</p>
                </div>
                <div className="posts-body">
                    <p>{(post.body.length <= 18) ? post.body : post.body.slice(0, 17) + "  .  .  ."}</p>
                </div>
                <div className="posts-time">
                    <p>{Time(post.time).toString().slice(4, 24)}</p>
                </div>
                <div className='posts-likeOrResponse'>  
                    <div className="posts-like">
                        <button onClick={/*()=>Like(post._id)*/console.log("nothing")}>
                            {post.liked?(<p>Like&nbsp;&nbsp;<FaThumbsUp color="lightgreen"/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>):
                            (<p><FaThumbsUp/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</p>)}
                        </button>
                    </div>
                    <div className="posts-response">
                        <p>Comment&nbsp;&nbsp;<FaCommentAlt/>
                            <NavLink to={"/postrender/" + post._id + "/" + userid} className="posts-readmore">
                                Read More&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <div className='posts-picture'>
                <img src={post.photo} alt="IMG"/>
            </div>
        </div>        
    ));

    return (loading || error) ? (<></>) : (
        <>
            {restaurant_view}
            {(restaurant.posts && restaurant.posts.length !== 0) ? (<p className="view-posts">&nbsp;&nbsp;&nbsp;Relating Posts:</p>) : <p className="view-posts">&nbsp;&nbsp;&nbsp;No Relating Posts Yet!</p>}
            {posts_list}
        </>
    );
}


/*                         onClick={(props, marker, e) => {
                            setSelectedPlace(props);
                            setActiveMarker(marker);
                            setShowingInfoWindow(true);
                        }}
                        <InfoWindow
                        position={position}
                        clickable={true}
                        onCloseClick={() => setSelectedPlace({})}
                        >
                        <p>{restaurant.name}</p>
                    </InfoWindow>):(<></>)}
*/