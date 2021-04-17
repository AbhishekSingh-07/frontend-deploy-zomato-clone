import React from 'react';
import '../Styles/Header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'brown',
        border: 'solid 2px brown'
    }
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isUserLoggedIn: false,
            userName: undefined,
            signUpModalIsOpen:false,
            email: '',
            pwd: '',
            FN: '',
            LN: ''
        }
    }

    Navigate = () => {
        this.props.history.push("/");
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    handleCancelSignUp = () => {
        this.setState({ signUpModalIsOpen: false });
    }

    handleSignUp = () => {
        this.setState({ signUpModalIsOpen: true });
        const { email, pwd, FN, LN } = this.state;
        const signUpObj = {
            email: email,
            password: pwd,
            firstname: FN,
            lastname: LN
        };
        axios({
            method: 'POST',
            url: 'https://whispering-reef-47493.herokuapp.com/usersignup',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
        })
            .then(response => {
                if (response.data.message === 'User Registered Successfully') {
                    this.setState({
                        signUpModalIsOpen: false,
                        email: '',
                        pwd: '',
                        FN: '',
                        LN: ''
                    });
                    alert(response.data.message);
                }
            })
            .catch(err => console.log(err))
    }

    handleLoginWithCre = () => {
        const { email, pwd } = this.state;
        const loginObj = {
            email: email,
            password: pwd
        };
        axios({
            method: 'GET',
            url: 'https://whispering-reef-47493.herokuapp.com/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                this.setState({
                    isUserLoggedIn: response.data.IsLoggedIn,
                    loginModalIsOpen: false,
                    email: '',
                    pwd: '',
                });
                sessionStorage.setItem('isLoggedIn', response.data.IsLoggedIn);
            })
            .catch(err => console.log(err))
    }

    handleCancelLogin = () => {
        this.setState({ loginModalIsOpen: false });
    }



    responseGoogle = (response) => {
        if (response && response.profileObj && response.profileObj.name) {
            this.setState({ loginModalIsOpen: false, isUserLoggedIn: true, userName: response.profileObj.name });
        } else {
            this.setState({ loginModalIsOpen: false });
        }
    }

    responseFacebook = (response) => {
        if (response && response.name) {
            this.setState({ loginModalIsOpen: false, isUserLoggedIn: true, userName: response.name });
        }
        else {
            this.setState({ loginModalIsOpen: false });
        }
    }

    handleLogout = () => {
        this.setState({ isUserLoggedIn: false, userName: undefined })
    }

    render() {
        const { loginModalIsOpen, isUserLoggedIn, userName,signUpModalIsOpen, email, pwd, FN, LN} = this.state;
        return (
            <div style={{ backgroundColor: '#ce0505', height: '50px' }}>
                <div className="header-logo" onClick={this.Navigate}>
                    <p>e!</p>
                </div>
                {isUserLoggedIn ? <div style={{ float: 'right', marginTop: '10px' }}>
                    <div style={{ display: 'inline-block' }} className="header-login" >{userName}</div>
                    <div style={{ display: 'inline-block' }} className="header-account" onClick={this.handleLogout}>Logout</div>
                </div> :
                    <div style={{ float: 'right', marginTop: '10px' }}>
                        <div style={{ display: 'inline-block' }} className="header-login" onClick={this.handleLogin}>Login</div>
                        <div style={{ display: 'inline-block' }} className="header-account" onClick={this.handleSignUp}>Create an account</div>
                    </div>}
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                    <h3>Login with Credentials</h3>
                      
                        <GoogleLogin
                            clientId="745717577080-ktpt1gjr08r357q5pvldh0lhgair2hkc.apps.googleusercontent.com"
                            buttonText="Continue with Gmail"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /><br />
                        <FacebookLogin
                            appId="185596516704467"
                            textButton="Continue with Facebook"
                            size="metro"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn-md fb"
                            icon="fa-facebook-square"
                        />
                    </div>
                </Modal>
                <Modal
                    isOpen={signUpModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <h3>SignUp User</h3>
                        <div><span>Email : </span><input type="text" value={email} onChange={(event) => this.handleChange(event, 'email')} /></div>
                        <div><span>Password : </span><input type="password" value={pwd} onChange={(event) => this.handleChange(event, 'pwd')} /></div>
                        <div><span>First Name: </span><input type="text" value={FN} onChange={(event) => this.handleChange(event, 'FN')} /></div>
                        <div><span>Last Name: </span><input type="text" value={LN} onChange={(event) => this.handleChange(event, 'LN')} /></div>
                        <button onClick={this.handleSignUp} class="btn btn-sm btn-primary">SignUp</button>
                        <button class="btn btn-sm btn-primary" onClick={this.handleCancelSignUp}>Cancel</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);











