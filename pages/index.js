import Head from 'next/head'
import Card from "@/modules/Card/components/Card";
import React, {Fragment, useState, useEffect} from "react";
import styled from "styled-components";
import {Button, Alert} from "@mui/material";

import {BottomDrawer} from "@/components/BottomDrawer";
import AddNewCard from "@/modules/Card/components/AddNewCard";

export default function Home() {
    const [drawer, setDrawer] = useState(false);
    const [cards, setCards] = useState([]);
    const onDrawerCloseOpen = () => setDrawer(!drawer);
    const fetchCardsFromLocalStorage = () => {
        const localCards = localStorage.getItem('cards');
        let listOfCards = JSON.parse(localCards);
        setCards(listOfCards);
    }

    useEffect(() => {
        fetchCardsFromLocalStorage();
    }, [])

    return (<>
        <Head>
            <title>Save your cards</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Parent>
            {cards?.length > 0 && <div className='cards'>
                <Alert severity="info" variant='outlined' sx={{width: '90%', borderRadius: '10px'}}>
                    Double click on card to delete.
                </Alert>
                {cards?.map((item) => <Fragment key={item.id}><Card {...item} onCardDelete={fetchCardsFromLocalStorage}/></Fragment>)}
            </div>}
            {cards?.length === 0 || !cards && <span>No Added cards yet :/</span>}
            <Button onClick={onDrawerCloseOpen} variant='contained' size='large' className='btn'>Add New
                Card</Button>
        </Parent>
        <BottomDrawer id='add-card' open={drawer}>
            <AddNewCard onDrawerClose={onDrawerCloseOpen} onCardAdd={fetchCardsFromLocalStorage}/>
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
  }

  .btn {
    position: fixed;
    bottom: 1rem;
    width: 90%;
  }
`;
