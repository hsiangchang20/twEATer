import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fruits from "../fruits/fruits";
import "./tweat.css";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import {ONE_POST_QUERY, POST_SUBSCRIPTION, USER_QUERY, CREATE_COMMENT_MUTATION, COMMENT_SUBSCRIPTION, MESSAGES_QUERY, MESSAGE_SUBSCRIPTION, FOLLOW_MUTATION} from '../../../graphql'

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
    })

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

    const tweats = tweat.map(tweat => (
        <div className="wrap-tweat100" key={tweat}>
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
                    <p>{tweat.body}</p>
                </div>
                <div className='tweats-likeOrResponse'>  
                    <div className="tweats-like">
                        {(tweat.follower.length<tweat.limit)&&!(tweat.follower.includes(userid))?(<button onClick={()=>followTweat(tweat._id)} className="tweats-btn">
                            <p>Join</p>
                        </button>): ""}
                        {(tweat.follower.includes(userid)||tweat.users[0].name===userName)? (<button className="tweats-btn">
                            <p>joined</p>
                        </button>):""}
                    </div>
                    <div className="tweats-response">
                    </div>
                </div>
            </div>
        </div>        
    ));
    return tweats
}