import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
	return (dispatch) =>
		jwtService
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				dispatch(setUserData(user));

				return dispatch({
					type: LOGIN_SUCCESS,
				});
			})
			.catch((error) => {
				return dispatch({
					type: LOGIN_ERROR,
					payload: error,
				});
			});
}
