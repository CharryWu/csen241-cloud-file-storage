import cognito from '../../api/cognito'
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js";
const userPool = new CognitoUserPool({
    UserPoolId: cognito.poolID,
    ClientId: cognito.poolClientID,
});

export default userPool;