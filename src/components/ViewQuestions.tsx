import 'rsuite/Header/styles/index.css';
import 'rsuite/Sidebar/styles/index.css';
import 'rsuite/Content/styles/index.css';
import 'rsuite/Footer/styles/index.css';
import 'rsuite/Divider/styles/index.css';
import ProviderContext from '../context/ProviderContext';
import AccountContext from '../context/AccountContext';
import { useContext, useEffect, useState } from 'react';
import { parseJSONResponse } from '../pieces/supportFuns';
import { QuestionsMap } from '../pieces/Realm.types';
import QuestionShowcase from './ShowQuestion';

const Questions = () => {
    const { provider } = useContext(ProviderContext);
    const { address } = useContext(AccountContext);
    const [Questions, setQuestions] = useState<QuestionsMap>({} as QuestionsMap)

    useEffect(() => {
        // Calls contract to get exam data
        const GetQuestions = async () => {
            if (provider !== null && address !== "") {
                const fetchData = async () => {
                    if (provider && address != null) {
                        provider.evaluateExpression('gno.land/r/dev/gnowledge', `GetQuestions()`)
                            .then((response: any) => parseJSONResponse(response))
                            .then((response: string) => JSON.parse(response) as QuestionsMap)
                            .then((response: QuestionsMap) => { setQuestions(response); })
                            .catch((error: any) => console.log(error));
                    };
                };
                fetchData();
            }
        }

        GetQuestions()
    }, [provider, address])


    return (
        <>
            {Questions !== {} as QuestionsMap ?
                Object.entries(Questions).map(key => {
                    let q = key[1];
                    return <QuestionShowcase q={q} />
                }) : <></>}
        </>
    );
};

export default Questions;
