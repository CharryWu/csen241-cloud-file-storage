// modules
import userPool from "../auth/cognitopool";


const signIn = () => {

    const cognitoUser = userPool.getCurrentUser()
    // const access_token = cognitoUser.getSession(function (err, session) {
    //     console.log(session);
    //     console.log(session.accessToken.jwtToken)
    // });
    // //const allUser = userPool.get

    // console.log(access_token)


    return cognitoUser
};

export default signIn;
