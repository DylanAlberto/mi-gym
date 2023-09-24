import { CognitoIdentityProvider, SignUpRequest } from '@aws-sdk/client-cognito-identity-provider';
import { signUpInputSchema, signUpOutputSchema } from 'types';
import { Lambda } from 'src/lib/response';
import { z } from 'zod';

const cognito = new CognitoIdentityProvider();

const createAccount = Lambda(
  signUpInputSchema,
  signUpOutputSchema,
  async (event: z.infer<typeof signUpInputSchema>) => {
    const params: SignUpRequest = {
      ClientId: process.env['COGNITO_USER_POOL_CLIENT_ID'],
      Username: event.email,
      Password: event.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: event.email,
        },
      ],
    };

    await cognito.signUp(params);
    return { message: 'Cuenta creada exitosamente', email: event.email };
  },
);

export default createAccount;
