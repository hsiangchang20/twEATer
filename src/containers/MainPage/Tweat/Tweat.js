import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fruits from "../fruits/fruits";
import "./tweat.css";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import {USER_QUERY, MESSAGES_QUERY, MESSAGE_SUBSCRIPTION, FOLLOW_MUTATION, DELETE_MESSAGE} from '../../../graphql'

export default function Tweat(props){
    const { userid } = props.match.params;
    const {watermelon, apple, avocado, cherry, kiwi, lemon, orange, pineapple, strawberry, peach} = fruits
	const fruitlist = [null, watermelon, cherry, strawberry, apple, lemon, peach, kiwi, orange, pineapple, avocado]
    const { loading, error, data, subscribeToMore, refetch} = useQuery(MESSAGES_QUERY);
    const {data: userData, refetch: refetchUser} = useQuery(USER_QUERY, {variables: {query: userid}})
    const [tweat, setTweat] = useState([]);
    const [init, setInit] = useState(true);
    const [userName, setUserName] = useState('');
    const [follow] = useMutation(FOLLOW_MUTATION);
    const [del] = useMutation(DELETE_MESSAGE);

    const TimeOver = (posttime, TweatID) => {
        //console.log(posttime)
        const post_hour = posttime.slice(0,2)
        const post_minute = posttime.slice(3, 5)
        console.log(post_hour, post_minute)
        const now = Date()
        const hour = now.slice(16, 18)
        const minute = now.slice(19, 21)
        console.log(hour)
        console.log(minute)
        if (parseInt(post_hour, 10) < parseInt(hour, 10)){
            console.log(TweatID)
            Delete(TweatID);
            return true
        }
        if (parseInt(post_minute, 10) < parseInt(minute, 10) && parseInt(post_hour, 10) === parseInt(hour, 10)){
            Delete(TweatID);
            return true
        }
        return false
    }

    useEffect(()=>{
        if(data) setTweat(data.message)
    }, [data])

    useEffect(()=>{
        console.log(userData);
        if(userData) setUserName(userData.users[0].name)
    }, [userData])

    useEffect(()=>{
        if (init){
            refetch();
            refetchUser();
            setInit(false);
        }
    }, [init, refetch]);

    const followTweat = useCallback((TweatID)=>{
        console.log(TweatID, userid, userName)
        follow({
            variables: {
                id: TweatID,
                follower: userid,
                followerName: userName
            }
        })
    });

    const Delete = useCallback((TweatID)=>{
        del({
            variables: {id: TweatID}
        })
    }, [del]);

    useEffect(()=>{
        subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            updateQuery: (prev,{ subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev
                }
                else {
                    return subscriptionData
                }
            }
        });
    }, [subscribeToMore]);

    const tweats = tweat.map(tweat => TimeOver(tweat.date, tweat._id)?<></>:(
        <div className={tweat.follower.includes(userid)||tweat.users[0].name===userName|| tweat.follower.length===(tweat.limit-1)? "wrap-tweat100 joined" : "wrap-tweat100"} key={tweat}>
            <div className="tweats-overview">
                <div className="tweats-userdata">
                    <img src={fruitlist[tweat.users[0].fruit]} alt="IMG" className="user-fruit"/> 
                    <div>
                        <p>{tweat.users[0].name}</p>
                    </div>
                </div>
                <div className="tweats-restaurant">
                        <NavLink to={"/restaurant/" + tweat.restaurant + "/" + userid}>
                            <p>{"< " + tweat.restaurant + " >"}</p>
                        </NavLink>
                </div>
                <table>
                    <tbody>
                        <tr className="tweats-container-header">
                            <td>
                                Reserved Time
                            </td>
                            <td>
                                Attenders
                            </td>
                        </tr>
                        <tr className="tweats-container">
                            <td>
                                {tweat.date}
                            </td>
                            <td>
                                {tweat.follower.length+1} / {tweat.limit}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="tweats-body">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;{tweat.body}</p>
                </div>
                <div className='tweats-likeOrResponse'>  
                    <div className="tweats-like">
                        {(tweat.follower.length<tweat.limit-1)&&!(tweat.follower.includes(userid))&&!(tweat.users[0].name===userName)?(<button onClick={()=>followTweat(tweat._id)} className="tweats-btn">
                            <p>Join</p>
                        </button>): ""}
                        {(tweat.follower.includes(userid)||tweat.users[0].name===userName)? (<button className="tweats-btn">
                            <p>joined</p>
                        </button>):""}
                        {(tweat.follower.length===tweat.limit-1)&&!(tweat.follower.includes(userid)||tweat.users[0].name===userName)?(<button className="tweats-btn">
                            <p>full</p>
                        </button>): ""}
                    </div>
                    <div className="tweats-response">
                    </div>
                </div>
            </div>
        </div>        
    ));
    return tweats
}