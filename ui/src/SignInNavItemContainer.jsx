import { connect } from 'react-redux';
import { onUserChange } from './actions.js';
import SignInNavItem from './SignInNavItem.jsx';

function mapStateToProps(state) {
	return { 
		signedIn: state.user.signedIn, 
		givenName: state.user.givenName,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onUserChange: (signedIn, givenName) => dispatch(onUserChange(signedIn, givenName)),
	};
}

const SignInNavItemContainer = connect(mapStateToProps, mapDispatchToProps)(SignInNavItem);

export default SignInNavItemContainer;

