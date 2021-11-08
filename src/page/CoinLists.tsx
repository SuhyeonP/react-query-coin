import React from 'react';
import {useQuery} from "react-query";
import {getCoinList} from "../domain/coin/api";
import {ICoin} from "../domain/coin/type";
import CoinList from "../component/CoinList";

const CoinLists = (): JSX.Element => {
    const { data, isLoading} = useQuery('coins', async () => await getCoinList())

    return (
        <div>
            {!isLoading && (
                data.map((coin: ICoin) => (
                    <CoinList key={coin.id} coin={coin} />
                ))
            )}
        </div>
    )
}

export default CoinLists;
