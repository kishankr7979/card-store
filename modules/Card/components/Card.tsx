import React, {useState} from "react";
import styled from "styled-components";
import {formatSetCcNumber, listOfBg} from "../utils";
import {BottomDrawer} from "../../../components/BottomDrawer";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {Button} from "@mui/material";
interface CardProps {
    id: string;
    cardNumber: string;
    cardType: 'DEBIT' | 'CREDIT';
    cardOwnerName: string;
    cardExpiryDate: string;
    cardCvv: number;
    cardBankOrigin: string;
    onCardDelete: () => void;
}

const Card = ({onCardDelete, id, cardNumber, cardCvv, cardType, cardExpiryDate, cardOwnerName, cardBankOrigin}: CardProps) => {
    const [deleteDrawer, setDeleteDrawer] = useState(false);
    const randomBg = listOfBg[(Math.random() * listOfBg.length) | 0]
    const deleteCard = () => {
        let getLocalStorageCards = localStorage.getItem('cards');
        let listOfCards = JSON.parse(getLocalStorageCards);
        let updateCardList = listOfCards.filter((item) => item.id !== id);
        localStorage.setItem('cards', JSON.stringify(updateCardList))
        setDeleteDrawer(!deleteDrawer);
        onCardDelete();

    }
    const copyCardNumber = () => navigator.clipboard.writeText(cardNumber).then(() => alert('copied'))
    return (
        <CardContainer background={randomBg} onDoubleClick={() => setDeleteDrawer(!deleteDrawer)}>
            <span className='card-bank-name'>{cardBankOrigin}</span>
            <span className='card-number'>{formatSetCcNumber(cardNumber)} <ContentCopyIcon onClick={copyCardNumber}/></span>
            <span className='card-name'>{cardOwnerName}</span>
            <CardNameAndCVV>
                <span className='card-expiry'>Expiry: {cardExpiryDate}</span>
                <span className='card-cvv'>CVV: {cardCvv}</span>
            </CardNameAndCVV>
            <BottomDrawer id={'delete'} open={deleteDrawer}>
                <DrawerParent>
                <span>Are you sure? want to delete</span>
                    <div className='card-exp-cvv'>
                        <Button variant="contained" color="success" onClick={() => setDeleteDrawer(!deleteDrawer)}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="error" onClick={deleteCard}>Delete</Button>
                    </div>
                </DrawerParent>
            </BottomDrawer>
        </CardContainer>
    );
}
export default Card;

const CardContainer = styled.div<{background: string}>`
    background: url(${(props) => props.background}) no-repeat;
    background-size: 100% 100%;
    width: 354px;
    height: 225px;
    padding: 1rem 1rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
    .card-number {
      font-size: 24px;
      color: #ffffff;
    }
  .card-bank-name {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
  }
  .card-name {
    font-size: 16px;
    color: #ffffff;
  }
  .card-cvv {
    font-size: 16px;
    color: #ffffff;
  }
  .card-expiry {
    font-size: 16px;
    color: #ffffff;
  }
`;

const CardNameAndCVV = styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: center;
`;

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
  }


`;