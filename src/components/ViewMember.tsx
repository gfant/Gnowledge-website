import { useContext, useEffect, useState } from 'react';
import { Button, Divider, FlexboxGrid, Heading, Input } from 'rsuite';
import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import AccountContext from '../context/AccountContext';
import { AdenaService } from '../services/adena/adena';
import { EMessageType } from '../services/adena/adena.types';
import config from '../config';
import { useLocation } from 'react-router-dom';

const ViewMember = () => {
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
        <>
            <Heading level={2}>{address}</Heading>
            <Heading level={4}>{address}</Heading>
        </>
    )
};

export default ViewMember;
