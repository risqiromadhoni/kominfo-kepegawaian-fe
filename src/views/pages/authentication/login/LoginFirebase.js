import React from 'react';
import { CardBody, FormGroup, Form, Input, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import Checkbox from '../../../../components/@vuexy/checkbox/CheckboxesVuexy';
import { Mail, Lock, Check } from 'react-feather';
import { history } from '../../../../history';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';
import {
	submitLoginWithFireBase,
	loginWithFB,
	loginWithTwitter,
	loginWithGoogle,
	loginWithGithub,
} from '../../../../redux/actions/auth/loginActions';

class LoginFirebase extends React.Component {
	state = {
		email: 'demo@demo.com',
		password: 'demodemo',
		remember: false,
	};

	handleLogin = e => {
		e.preventDefault();
		this.props.submitLoginWithFireBase(this.state.email, this.state.password, this.state.remember);
	};

	handleRemember = e => {
		this.setState({
			remember: e.target.checked,
		});
	};

	render() {
		return (
			<React.Fragment>
				<CardBody className="pt-1">
					<Form action="/" onSubmit={this.handleLogin}>
						<FormGroup className="form-label-group position-relative has-icon-left">
							<Input
								type="email"
								placeholder="Email"
								value={this.state.email}
								onChange={e => this.setState({ email: e.target.value })}
								required
							/>
							<div className="form-control-position">
								<Mail size={15} />
							</div>
							<Label>Email</Label>
						</FormGroup>
						<FormGroup className="form-label-group position-relative has-icon-left">
							<Input
								type="password"
								placeholder="Password"
								value={this.state.password}
								onChange={e => this.setState({ password: e.target.value })}
								required
							/>
							<div className="form-control-position">
								<Lock size={15} />
							</div>
							<Label>Password</Label>
						</FormGroup>
						<FormGroup className="d-flex justify-content-between align-items-center">
							<Checkbox
								color="primary"
								icon={<Check className="vx-icon" size={16} />}
								label="Remember me"
								defaultChecked={false}
								onChange={this.handleRemember}
							/>
							<div className="float-right">
								<Link to="/pages/forgot-password">Forgot Password?</Link>
							</div>
						</FormGroup>
						<div className="d-flex justify-content-between">
							<Button.Ripple
								color="primary"
								outline
								onClick={() => {
									history.push('/pages/register');
								}}>
								Register
							</Button.Ripple>
							<Button.Ripple color="primary" type="submit">
								Login
							</Button.Ripple>
						</div>
					</Form>
				</CardBody>
				<div className="auth-footer">
					<div className="divider">
						<div className="divider-text">OR</div>
					</div>
					<div className="footer-btn px-2">
						<GoogleButton
							onClick={this.props.loginWithGoogle}
							style={{
								display: 'block',
								width: '100%',
							}}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		values: state.auth.login,
	};
};

export default connect(mapStateToProps, {
	submitLoginWithFireBase,
	loginWithFB,
	loginWithTwitter,
	loginWithGoogle,
	loginWithGithub,
})(LoginFirebase);
