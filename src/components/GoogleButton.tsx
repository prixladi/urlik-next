import React, { useState } from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { GoogleConfig } from '../configs';
import { authService } from '../services';
import { useRouter } from 'next/router';

type Props = {
  render: (props: { onClick: () => void; disabled?: boolean; isLoading: boolean }) => JSX.Element;
  onSuccess: () => void;
};

const GoogleButton: React.FC<Props> = ({ render, onSuccess }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GoogleLogin
      clientId={GoogleConfig.clientId}
      render={(props) => render({ isLoading, ...props })}
      onRequest={() => {
        setIsLoading(true);
      }}
      onSuccess={async (response) => {
        await authService.googleLogin({ idToken: (response as GoogleLoginResponse).tokenId }, router);
        onSuccess();
        setIsLoading(false);
      }}
      onFailure={(err) => {
        console.error(err);
        setIsLoading(false);
      }}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleButton;
