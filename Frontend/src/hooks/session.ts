import * as React from 'react';
import { useAppSelector } from '../redux/hooks';
import { useAuth } from './auth';

export const useAuthSession = () => {
  const { user } = useAppSelector(state => state.auth); 
  const { handleSignOut } = useAuth();  

  const session = React.useMemo(() => ({
    user: {
      email: user?.email,
      image: user?.name.slice(0, 2),
      id: user?.id,
      name: user?.name,
    },
  }), [user]); 

  const authentication = React.useMemo(() => ({
    signIn: () => {
      
    },
    signOut: () => {
      handleSignOut(); 
    },
  }), [handleSignOut]);

  return { session, authentication };
};
