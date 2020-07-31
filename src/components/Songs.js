import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

const ParentDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const StyledDiv = styled.div`
    font-family: 'Roboto';
    width: 29%;
    margin: 5px 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    @media(max-width: 500px) {
        width: 90%;
    }
`

const HeaderDiv = styled.div`
    background-color: #ED370D;
    color: white;
    width: 100%;
    border-radius: 10px 10px 0 0;
    font-weight: 900;
    text-transform: uppercase;
    height: 50%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`

const ContainerDiv = styled.div`
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
`

const Songs = (props) => {
    let userId = localStorage.getItem('id');
    const [songs, setSongs] = useState([]);
    const [recommended, setRecommended] = useState(false);
    const [recommendedSongs, setRecommendedSongs] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get(`/user/dashboard/${userId}/songs`)
        .then(res => {
            console.log(res.data)
            setSongs(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [userId])

    const sendData = (track_id) => {
        console.log("track_id", track_id);
        axiosWithAuth()
            .post('https://ar-spotify-rec.herokuapp.com/send', {"track_id": track_id})
            .then(res => {
                let songsRecommended = JSON.parse(res.data);
                setRecommendedSongs(songsRecommended)
            })
            .catch(err => {
                console.log(err)
            })
            setRecommended(true)
        // props.history.push(`/recommended`);
    }

    console.log("recommendedSongs", recommendedSongs)
    return (
        <ContainerDiv>
            {recommended 
            ? <ContainerDiv>
                <h1 style={{color: 'white'}}>
                    Recommended Songs:
                </h1> 
                {recommendedSongs.map(song => {return (
                    <StyledDiv 
                        key={song.track_id} 
                        onClick={() => sendData(song.track_id)}
                        >
                        <HeaderDiv>
                            {song.track_name}
                        </HeaderDiv>
                        <p>
                            {song.artist_name}
                        </p>
                    </StyledDiv>
                    )})}</ContainerDiv>
                    : null} 
            <h3 style={{color: 'white'}}>Pick a song you like</h3>
            <ParentDiv>
                {songs.map(song => {
                    return (
                    <StyledDiv 
                        key={song.track_id} 
                        onClick={() => sendData(song.track_id)}
                        >
                        <HeaderDiv>
                            {song.track_name}
                        </HeaderDiv>
                        <p>
                            {song.artist_name}
                        </p>
                    </StyledDiv>
                    )})}
            </ParentDiv>
        </ContainerDiv>
    )
}

export default Songs;