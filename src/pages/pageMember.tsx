import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DefaultView from '../components/MainView';
import ViewMember from '../components/ViewMember';

const PageMember = () => {
    const location = useLocation();
    const addr = location.state?.address;
    const [address, setAddress] = useState("")

    useEffect(() => {
        setAddress(addr);
        const savedAddress = localStorage.getItem('savedAddress');
        if (savedAddress && location == null) {
            setAddress(savedAddress);
        }
        console.log({ address, addr, location })
        return () => {
            localStorage.setItem('savedAddress', addr);
        };
    }, [location])

    return (
        <DefaultView component={ViewMember} />
    );
};

export default PageMember;
