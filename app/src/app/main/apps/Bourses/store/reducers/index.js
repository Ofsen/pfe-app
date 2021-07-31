import {combineReducers} from 'redux';
import orders from './orders.reducer';
import order from './order.reducer';

const reducer = combineReducers({
    orders,
    order
});

export default reducer;
