import { Container, Divider, FlexboxGrid, Heading, HeadingGroup } from 'rsuite';

import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import Connect from '../services/adena/connectButton';
import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import AnswerQuestion from '../components/AnswerQuestion';
import AnswerShowcase from '../components/AnswerShowcase';
import ProviderContext from '../context/ProviderContext';
import AccountContext from '../context/AccountContext';
import { AnswersMap } from '../pieces/Realm.types';
import { parseJSONResponse } from '../pieces/supportFuns';

const PageQuestion = () => {
    const location = useLocation();
    const qData = location.state?.qData;
    useEffect(() => { console.log(qData) }, [])
    const { provider } = useContext(ProviderContext);
    const { address } = useContext(AccountContext);
    const [answers, setAnswers] = useState<AnswersMap>({} as AnswersMap)

    useEffect(() => {
        GetAnswers()
    }, [])

    // Calls contract to get exam data
    const GetAnswers = async () => {
        if (provider !== null && address !== "") {
            const fetchData = async () => {
                if (provider && address != null) {
                    provider.evaluateExpression('gno.land/r/dev/gnowledge', `GetAnswers("${qData.id}")`)
                        .then((response: any) => parseJSONResponse(response))
                        .then((response: string) => JSON.parse(response) as AnswersMap)
                        .then((response: AnswersMap) => { setAnswers(response); })
                        .catch((error: any) => console.log(error));
                };
            };
            fetchData();
            console.log(answers);
        }
    }

    return (
        <div>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    <Container>
                        <Heading level={1}>Gnowledge</Heading>
                        <Divider />
                    </Container>
                    <Container style={{backgroundColor: "white", padding: "10px"  }}>
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
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={12}>
                                <p>
                                    [Refers to: {qData.topics.substring(1, qData.topics.length - 1)}]
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
                    {
                        answers != {} as AnswersMap ? Object.entries(answers).map(key => {
                            let [id, a] = key;
                            return <AnswerShowcase a={a} />
                        }) : <></>}
                    <AnswerQuestion qId={qData.id} />

                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={6}>
                    <Connect />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};

export default PageQuestion;
