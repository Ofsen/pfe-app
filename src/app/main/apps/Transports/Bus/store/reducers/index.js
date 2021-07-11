import {combineReducers} from 'redux';
import products from './products.reducer';
import product from './product.reducer';

const reducer = combineReducers({
    products,
    product,
});

export default reducer;
