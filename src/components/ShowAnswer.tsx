import { Col, Divider, FlexboxGrid, Grid, Heading, Row } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { Answer } from '../pieces/Realm.types';
import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import { Link } from 'react-router-dom';
import ShowScoreAndVote from './ShowScoreAndVote';

const ShowAnswer = ({ a, qId, aId }: { a: Answer, qId: string, aId: string }) => {

    const author = a.author.substring(0, 6) + "..." + a.author.substring(a.author.length - 6, a.author.length)
    return (
        <>
            <Divider />
            <Grid fluid>
                <Row>
                    <Col>
                        <FlexboxGrid style={{ alignItems: "center" }}>
                            <ShowScoreAndVote qId={qId} id={aId} answerOrQuestion={"Answer"} score={a.score} />

                            <FlexboxGridItem style={{ marginLeft: "20px", alignItems: "center" }}>
                                <Heading level={4}>
                                    {a.response}
                                </Heading>
                            </FlexboxGridItem>

                        </FlexboxGrid>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6} xsPull={18}>
                        <Link to={`/member/${a.author}`} state={{ address: a.author }}>
                            {author}
                        </Link>, {a.createdOn}
                    </Col>
                </Row>
            </Grid>
        </>
    );
};

export default ShowAnswer;
