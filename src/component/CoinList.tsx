import React from 'react';
import {ICoin} from "../domain/coin/type";

interface ICoinList {
    coin: ICoin;
}
const CoinList = (props: ICoinList): JSX.Element => {
    const { coin } = props;
    return (
        <div>
            <p>{coin.name}</p>
            <p>{coin.id}</p>
            <p>{coin.current_price}</p>
        </div>
    )
}

export default CoinList;
