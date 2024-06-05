import { Col, Divider, FlexboxGrid, Grid, Heading, Row } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { Question } from '../pieces/Realm.types';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { Gear, AddOutline } from '@rsuite/icons';

import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import { Link } from 'react-router-dom';
import { AdenaService } from '../services/adena/adena';
import { EMessageType } from '../services/adena/adena.types';
import AccountContext from '../context/AccountContext';
import { useContext } from 'react';
import config from '../config';

const QuestionShowcase = ({ q }: { q: Question }) => {
    const { address } = useContext(AccountContext);

    const author = q.author.substring(0, 6) + "..." + q.author.substring(q.author.length - 6, q.author.length)

    const Downvote = async () => {
        if (address) {
            let response = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_CALL,
                        value: {
                            caller: address,
                            send: '',
                            pkg_path: config.REALM_PATH,
                            func: 'DownvoteQuestion',
                            args: [
                                q.id
                            ]
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                console.log(`Downvoted ${q.id}!`)
            }
        }
    }
    
    const Upvote = async () => {
        if (address) {
            let response = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_CALL,
                        value: {
                            caller: address,
                            send: '',
                            pkg_path: config.REALM_PATH,
                            func: 'UpvoteQuestion',
                            args: [
                                q.id
                            ]
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                console.log(`Upvoted ${q.id}!`)
            }
        }
    }

    return (
        <>
            <Divider />
            <Grid fluid>
                <Row>
                    <Col>
                        <FlexboxGrid style={{ alignItems: "center" }}>
                            <FlexboxGridItem colspan={2} style={{ display: "grid", placeItems: "center", border: "3px solid black" }}>
                                <ArrowUpLineIcon style={{ fontSize: "2em" }} onClick={() => { Upvote() }} />
                                <Heading level={3}>
                                    {q.score}
                                </Heading>
                                <ArrowDownLineIcon style={{ fontSize: "2em" }} onClick={() => { Downvote() }} />

                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={22} style={{ padding: "0 20px" }}>
                                <Link to={`/question/${q.id}`} state={{ qData: q }}>
                                    <Heading level={2}>
                                        {q.question}
                                    </Heading>
                                </Link>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6} xsPull={18}>
                        <Link to={`/member/${q.author}`} state={{ address: q.author }}>
                            {author}
                        </Link>, {q.createdOn}
                    </Col>
                </Row>
            </Grid>
        </>
    );
};

export default QuestionShowcase;
