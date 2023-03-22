import Head from 'next/head'
import Card from "@/modules/Card/components/Card";
import React, {Fragment, useState, useEffect} from "react";
import styled from "styled-components";
import {Button, Alert} from "@mui/material";

import {BottomDrawer} from "@/components/BottomDrawer";
import AddNewCard from "@/modules/Card/components/AddNewCard";
import OtpInput from 'react-otp-input';

export default function Home() {
    const [drawer, setDrawer] = useState({from: 'CARD', open: false});
    const [cards, setCards] = useState([]);
    const [pin, setPin] = useState({action: 'SET', val: '', error: false});
    const onDrawerCloseOpen = (from) => setDrawer({from, open: !drawer.open});
    const fetchCardsFromLocalStorage = () => {
        const localCards = localStorage.getItem('cards');
        let listOfCards = JSON.parse(localCards);
        setCards(listOfCards);
    }
    const containerStyle = {
        margin: '16px 0',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
    };

    const inputStyle = {
        width: '48px',
        height: '48px',
        background: `#ffffff`,
        border: `1px solid #000000`,
        boxSizing: 'border-box',
        borderRadius: '8px',
        fontWeight: 'bold',
    };
    const onPinSubmit = () => {
        let storedPin = localStorage.getItem('card-app-pin');
        if(!storedPin) {
            localStorage.setItem('card-app-pin', pin.val);
            setDrawer({...drawer, open: false});
            return;
        }
        if(pin.val === storedPin) {
            setDrawer({...drawer, open: false, error: false})
        }
        else {
            alert('wrong PIN')
            setPin({...pin, val: ''})
        }
    }

    useEffect(() => {
        setDrawer({from: 'PIN', open: true, error: false})
        fetchCardsFromLocalStorage();
    }, [])

    const pinUi = (
        <PinParent>
            <span>Enter your PIN</span>
            <OtpInput value={pin.val} onChange={(val) => setPin({...pin, val: val})} numInputs={4} shouldAutoFocus containerStyle={containerStyle} inputStyle={inputStyle} />
            <Button onClick={onPinSubmit}>Submit</Button>
        </PinParent>
    )
    return (<>
        <Head>
            <title>Save your cards</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel='manifest' href='/manifest.webmanifest' />
        </Head>
        <Parent isBlur={drawer.open}>
            {cards?.length > 0 && <div className='cards'>
                <Alert severity="info" variant='outlined' sx={{width: '90%', borderRadius: '10px'}}>
                    Double click on card to delete.
                </Alert>
                {cards?.map((item) => <Fragment key={item.id}><Card {...item} onCardDelete={fetchCardsFromLocalStorage}/></Fragment>)}
            </div>}
            {cards?.length === 0 || !cards && <span>No Added cards yet :/</span>}
            <Button onClick={() => onDrawerCloseOpen('CARD')} variant='contained' size='large' className='btn'>Add New
                Card</Button>
        </Parent>
        <BottomDrawer id='add-card' open={drawer.open}>
            {drawer.from === 'CARD' && <AddNewCard onDrawerClose={() => onDrawerCloseOpen('CARD')} onCardAdd={fetchCardsFromLocalStorage}/>}
            {drawer.from === 'PIN' && pinUi}
        </BottomDrawer>
    </>)
}

const Parent = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .cards {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin: 1rem 1rem 2rem 1rem;
    filter: ${(props) => props.isBlur && 'blur(10px)'};
  }

  .btn {
    position: fixed;
    bottom: 1rem;
    width: 90%;
  }
`;

const PinParent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  position: relative;
  height: 50%;
  
  .pin {
    height: 40px;
    width: 100%;
  }
    
`;