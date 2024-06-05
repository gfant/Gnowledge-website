import { Col, Divider, FlexboxGrid, Grid, Heading, Row } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';

import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import { AdenaService } from '../services/adena/adena';
import { EMessageType } from '../services/adena/adena.types';
import AccountContext from '../context/AccountContext';
import { useContext, useEffect, useState } from 'react';
import config from '../config';

const ShowScoreAndVote = ({ qId, id, score, answerOrQuestion }: { qId: string, id: string, score: number, answerOrQuestion: string }) => {
    const { address } = useContext(AccountContext);
    const [args, setArgs] = useState<string[]>([])
    useEffect(() => {
        let args = []
        if (answerOrQuestion === "Question") {
            setArgs([id])
        }
        if (answerOrQuestion === "Answer") {
            setArgs([qId, id])
        }
    }, [])

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
                            func: `Downvote${answerOrQuestion}`,
                            args: args
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                console.log(`Downvoted ${id}!`)
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
                            func: `Upvote${answerOrQuestion}`,
                            args: args
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                console.log(`Upvoted ${id}!`)
            }
        }
    }

    return (
        <>
            <FlexboxGridItem colspan={2} style={{ display: "grid", placeItems: "center", border: "3px solid black" }}>
                <ArrowUpLineIcon style={{ fontSize: "2em" }} onClick={() => { Upvote() }} />
                <Heading level={3}>
                    {score}
                </Heading>
                <ArrowDownLineIcon style={{ fontSize: "2em" }} onClick={() => { Downvote() }} />
            </FlexboxGridItem>
        </>
    );
};

export default ShowScoreAndVote;
