import { Col, Divider, FlexboxGrid, Grid, Heading, Row } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { Question } from '../pieces/Realm.types';

import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import { Link } from 'react-router-dom';
const QuestionShowcase = ({ q }: { q: Question }) => {
    const author = q.author.substring(0, 6) + "..." + q.author.substring(q.author.length - 6, q.author.length)
    return (
        <>
            <Divider />
            <Grid fluid>
                <Row>
                    <Col>
                        <FlexboxGrid style={{ alignItems: "center" }}>
                            <FlexboxGridItem colspan={2} style={{ border: "3px solid black", padding: "10px" }}>
                                <Heading level={3}>
                                    {q.score}
                                </Heading>
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
