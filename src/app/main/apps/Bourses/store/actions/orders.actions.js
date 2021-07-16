import axios from 'axios';

export const GET_ORDERS = '[BOURSES] GET ORDERS';
export const SET_ORDERS_SEARCH_TEXT = '[BOURSES] SET ORDERS SEARCH TEXT';

export function getOrders()
{
    const request = axios.get('/api/e-commerce-app/orders');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDERS,
                payload: response.data
            })
        );
}

export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

