import { Button, Container, Divider, FlexboxGrid, Heading, Input } from 'rsuite';

import 'rsuite/FlexboxGrid/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import 'rsuite/HeadingGroup/styles/index.css';
import Connect from '../services/adena/connectButton';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import AccountContext from '../context/AccountContext';
import { AdenaService } from '../services/adena/adena';
import { EMessageType } from '../services/adena/adena.types';
import config from '../config';

const PageMakeQuestion = () => {
    const { address } = useContext(AccountContext);
    const [question, setQuestion] = useState("")
    const [topics, setTopics] = useState("")


    const MakeQuestion = async () => {
        if (address && question.length !== 0) {
            let response = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_CALL,
                        value: {
                            caller: address,
                            send: '6',
                            pkg_path: config.REALM_PATH,
                            func: 'MakeQuestion',
                            args: [
                                question,
                                topics
                            ]
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                console.log("Answer sent!")
            }
        }
    }

    return (
        <div>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    <Container>
                        <Link to="/">
                            <Heading level={1}>Gnowledge</Heading>
                        </Link>
                        <Divider />
                        <Heading level={2}>Make a Question</Heading>
                        <FlexboxGrid style={{ alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
                            <FlexboxGridItem >
                                <FlexboxGrid style={{ flexDirection: "column" }}>
                                    <p>Add your question below</p>
                                    <Input as="textarea" cols={80} rows={12} placeholder="My question" value={question} onChange={value => setQuestion(value)} />
                                </FlexboxGrid>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                        <FlexboxGrid style={{ alignItems: "center", justifyContent: "center", marginTop: "50px", flexDirection: "column" }}>
                            <FlexboxGridItem >
                                <FlexboxGrid style={{ flexDirection: "column" }}>
                                    <p>Add the topics that relate to your question. There is no need to </p>
                                    <Input as="textarea" cols={80} rows={2} placeholder="code,magic,community" value={topics} onChange={value => setTopics(value)} />
                                </FlexboxGrid>
                                <Divider />
                            </FlexboxGridItem>
                            <FlexboxGridItem>
                                <Button onClick={MakeQuestion}>Send Question</Button>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Container>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}><Connect /></FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
};

export default PageMakeQuestion;
