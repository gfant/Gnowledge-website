import { Container, FlexboxGrid, Heading, HeadingGroup } from 'rsuite';

import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import Questions from '../components/Questions';
import Connect from '../services/adena/connectButton';

const PageHome = () => {
    return (
        <div>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    <Container>
                        <Heading level={1}>Gnowledge</Heading>
                        <Questions/>
                    </Container>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}><Connect/></FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};

export default PageHome;
