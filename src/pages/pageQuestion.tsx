import { Container, Divider, FlexboxGrid, Heading } from 'rsuite';

import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import Connect from '../services/adena/connectButton';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import MakeAnswerToQuestion from '../components/MakeAnswerToQuestion';
import ShowAnswer from '../components/ShowAnswer';
import ProviderContext from '../context/ProviderContext';
import AccountContext from '../context/AccountContext';
import { AnswersMap, Question } from '../pieces/Realm.types';
import { parseJSONResponse } from '../pieces/supportFuns';
import { SideBar } from '../components/SideBar/SideBar';
import ShowScoreAndVote from '../components/ShowScoreAndVote';

const PageQuestion = () => {
    const location = useLocation();
    const qData = location.state?.qData;
    const [question, setQuestion] = useState<Question>(qData)
    const { provider } = useContext(ProviderContext);
    const { address } = useContext(AccountContext);
    const [answers, setAnswers] = useState<AnswersMap>({} as AnswersMap)

    useEffect(() => {
        GetAnswers()
        const savedQuestion = localStorage.getItem('savedQuestion');
        if (savedQuestion && location == null) {
            setQuestion(JSON.parse(savedQuestion) as Question);
        }
        return () => {
            localStorage.setItem('savedQuestion', JSON.stringify(qData));
        };
    }, [location, address])

    // Calls contract to get exam data
    const GetAnswers = async () => {
        if (provider !== null && address !== "") {
            const fetchData = async () => {
                if (provider && address != null) {
                    provider.evaluateExpression('gno.land/r/dev/gnowledge', `GetAnswers("${question.id}")`)
                        .then((response: any) => parseJSONResponse(response))
                        .then((response: string) => JSON.parse(response) as AnswersMap)
                        .then((response: AnswersMap) => {
                            setAnswers(response);
                        })
                        .catch((error: any) => console.log(error));
                };
            };
            fetchData();
        }
    }

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
                        <Divider />
                    </Container>
                    <Container style={{ backgroundColor: "white", padding: "10px" }}>
                        <FlexboxGrid style={{ alignItems: "center" }}>
                        <ShowScoreAndVote qId={question.id} id={question.id} answerOrQuestion={"Question"} score={question.score}/>
                            <FlexboxGridItem colspan={22} style={{ padding: "0 20px" }}>
                                <Heading level={2}>
                                    {question.question}
                                </Heading>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={12}>
                                <p>
                                    [Refers to: {question.topics.substring(1, question.topics.length - 1)}]
                                </p>
                            </FlexboxGrid.Item>

                            <FlexboxGrid.Item colspan={12}>
                                <p>
                                    by {question.author},
                                </p>
                                <p>
                                    on {question.createdOn}
                                </p>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Container>
                    {
                        answers != {} as AnswersMap ? Object.entries(answers).map(key => {
                            let [id, a] = key;
                            return <ShowAnswer a={a} qId={question.id} aId={id} key={id} />
                        }) : <></>}
                    <MakeAnswerToQuestion qId={question.id} />

                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={6}>
                    <Connect />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};

export default PageQuestion;
