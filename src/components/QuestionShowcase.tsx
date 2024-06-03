import { Col, Divider, FlexboxGrid, Grid, Heading, Row } from 'rsuite';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { Question } from '../pieces/Realm.types';

import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
const QuestionShowcase = ({ q }: { q: Question }) => {
    const author = q.author.substring(0, 10) + "..." + q.author.substring(q.author.length - 10, q.author.length)
    return (
        <>
            <Divider />
            <Grid fluid>
                    <Row>
                        <Col>
                        <FlexboxGrid>
                            <FlexboxGridItem colspan={2}><Heading level={3}>{q.score}</Heading></FlexboxGridItem>
                            <FlexboxGridItem colspan={22}><Heading level={2}>{q.question}</Heading></FlexboxGridItem>
                        </FlexboxGrid>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs={6} xsPull={18}><a href={"member/"+q.author}>{author}</a>, {q.createdOn}</Col>
                    </Row>
            </Grid>
        </>
    );
};

export default QuestionShowcase;
