import * as React from 'react';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
}

export function GoogleButton() {
    return (
        <GoogleLogin
            clientId="998047635259-97u2qfmpfre6nb7btat6bp4q8he7cfbc.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            cookiePolicy="single_host_origin"
        />
    );
}
export default GoogleButton;
