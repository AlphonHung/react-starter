import { useSelector } from 'react-redux';
import { RootState } from '~/store';

/** 判定是否已登入 */
const authorized = () => {
    const authData = useSelector((state: RootState) => state.auth.authData);
    return authData !== undefined;
}

const useAuth = {
    authorized
}

export default useAuth;