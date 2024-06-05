import { Button, Col, Container, FlexboxGrid, Heading, HeadingGroup, Row } from 'rsuite';

import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import Questions from '../components/Questions';
import Connect from '../services/adena/connectButton';
import { Link } from 'react-router-dom';
import { SideBar } from '../components/SideBar/SideBar';

interface Content {
    component: React.ComponentType;
}

const DefaultView: React.FC<Content> = ({ component: C }) => {
    return (
        <div>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}>
                    <SideBar />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    <Container>
                        <Link to="/">
                            <Heading level={1}>Gnowledge</Heading>
                        </Link>
                        <C />
                    </Container>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <Connect />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};

export default DefaultView;
