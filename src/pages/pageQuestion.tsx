import { Container, Divider, FlexboxGrid, Heading, HeadingGroup } from 'rsuite';

import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import Connect from '../services/adena/connectButton';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import AnswerQuestion from '../components/AnswerQuestion';

const PageQuestion = () => {
    const location = useLocation();
    const qData = location.state?.qData;
    useEffect(() => { console.log(qData) }, [])
    return (
        <div>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    <Container>
                        <Heading level={1}>Gnowledge</Heading>
                        <Divider />
                        <FlexboxGrid style={{ alignItems: "center" }}>
                            <FlexboxGridItem colspan={2} style={{ border: "3px solid black", padding: "10px" }}>
                                <Heading level={3}>
                                    {qData.score}
                                </Heading>
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={22} style={{ padding: "0 20px" }}>
                                <Heading level={2}>
                                    {qData.question}
                                </Heading>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Container>
                    <Container>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={12}>
                                <p>
                                    [Refers to: {qData.topics.substring(1,qData.topics.length-1)}]
                                </p>
                            </FlexboxGrid.Item>

                            <FlexboxGrid.Item colspan={12}>
                                <p>
                                    by {qData.author},
                                </p>
                                <p>
                                    on {qData.createdOn}
                                </p>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Container>
                    <AnswerQuestion qId={qData.id}/>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={6}>
                    <Connect />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};

export default PageQuestion;
