import styled from "styled-components";
import React, {useState} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {Button, OutlinedInput} from "@mui/material";
import {formatSetCcNumber} from "../utils";

interface AddNewCardProps {
    onDrawerClose: () => void;
    onCardAdd: () => void;
}

const AddNewCard = ({onDrawerClose, onCardAdd}: AddNewCardProps) => {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardType: 'CREDIT',
        cardOwnerName: '',
        cardExpiryDate: '',
        cardCvv: '',
        cardBankOrigin: '',
    })
    const closeDrawerAndResetForm = () => {
        setCardData({
            cardNumber: '',
            cardType: 'CREDIT',
            cardOwnerName: '',
            cardExpiryDate: '',
            cardCvv: '',
            cardBankOrigin: '',
        })
        onDrawerClose();
    }
    const addCard = () => {
        const card = {
            ...cardData,
            cardNumber: cardData.cardNumber.trim(),
            id: crypto.randomUUID(),
        };
        let getLocalStorageCards = localStorage.getItem('cards');
        let listOfCards = []
        if(!getLocalStorageCards){
            listOfCards.push(card);
            localStorage.setItem('cards', JSON.stringify(listOfCards))
            onCardAdd();
            return;
        };
        listOfCards = JSON.parse(getLocalStorageCards);
        listOfCards = [...listOfCards, card];
        localStorage.setItem('cards', JSON.stringify(listOfCards))
        onCardAdd();
        closeDrawerAndResetForm()
    }
    const disabled = cardData.cardNumber.length < 16 || cardData.cardCvv.length < 3 || cardData.cardOwnerName.length < 5;
    return (
        <DrawerParent>
            <ClearIcon className='close-icon' onClick={onDrawerClose}/>
            <OutlinedInput value={formatSetCcNumber(cardData.cardNumber)} placeholder='card number' onChange={(event) => setCardData({...cardData, cardNumber: event.target.value.trim()})} />
            <OutlinedInput value={cardData.cardOwnerName} placeholder='Card holder name' onChange={(event) => setCardData({...cardData, cardOwnerName: event.target.value})} />
            <div className='card-exp-cvv'>
                <OutlinedInput className='month' type='month' value={cardData.cardExpiryDate} placeholder='Card Expiry' onChange={(event) => setCardData({...cardData, cardExpiryDate: event.target.value})} />
                <OutlinedInput className='cvv' value={cardData.cardCvv} placeholder='CVV' onChange={(event) => setCardData({...cardData, cardCvv: event.target.value})} />
            </div>
            <OutlinedInput value={cardData.cardBankOrigin} placeholder='Bank name' onChange={(event) => setCardData({...cardData, cardBankOrigin: event.target.value})} />
            <Button onClick={addCard} variant='contained' size='large' className='btn' disabled={disabled}>Submit</Button>
        </DrawerParent>
    );
}

export default AddNewCard;
const DrawerParent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  position: relative;
  height: 50%;
  .card-exp-cvv {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    width: 100%;
    .month {
      width: 50%;
    }
  }
  .close-icon {
    position: absolute;
    right: 2rem;
    top: 0;
    cursor: pointer;
  }

  .input {
    height: 60px;
    font-size: 18px;
  }

`;
