import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { questionApi, answerQuestion, url, httpPost } from '../services/api';
import './Exercise.css';

const Exercise = () => {

    const [question, setQuestion] = useState([]);
    const [alternative, setAlternatives] = useState([]);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [buttonLabel, setButtonLabel] = useState('Verificar resposta');
    const [feedback, setFeedback] = useState('');
    const [changeColor, setChangeColor] = useState('');
    let isCorrect;

    // puxa os dados da api
    useEffect(() => {
        questionApi().then((res) => {
            if (res) {
                setQuestion(res.exercise);
            }
        })
    }, []);

    // captura a letra selecionada e habilita o botão
    let answer;
    const selectedOption = (value) => {
        setAlternatives(value);
        answer = value;
        setButtonDisable(false);
    }

    const retry = () => {
        setFeedback('');
        setButtonLabel('Verificar resposta');
        setAlternatives(null);
        setButtonDisable(true)
    }

    const rightFeedback = '<b>Resposta correta</b> Boa! Acertou em cheio.';
    const wrongFeedback = '<b>Resposta incorreta</b> Que tal tentar novamente?';

        // envia a seleção pra api e retorna a resposta
    const handleSubmit = async (exercise_id, teste_alternative) => {
        let response = await httpPost(exercise_id, teste_alternative);

        isCorrect = response.is_correct;

        if(isCorrect) {
            setButtonLabel('Próxima');
            setFeedback(rightFeedback);
        } else {
            setButtonLabel('Refazer');
            setFeedback(wrongFeedback);
        }        
    }    

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <section className="limite">
            <Row className="pt-5 mt-5">
                <h2>{question.institution}</h2>
                <p dangerouslySetInnerHTML={{__html: question.exercise_text}} />
                <ul>
                    {question.alternatives?.map((option) => 
                        <li key={option.letter}>
                            <p>
                                <input type="radio" name="alternatives" onChange={() => selectedOption(option.letter)} checked={alternative === option.letter} />
                                <span className="option">{option.letter}. <span id="value">{option.label}</span></span>
                                </p>
                        </li>
                    
                    )}                    
                </ul>

                <hr/>
                <Col className="feedback">
                    <p dangerouslySetInnerHTML={{__html: feedback}} />
                </Col>
                <Col className="pb-3 text-end">
                    <button id="btn" className="button" disabled={buttonDisable} onClick={() => handleSubmit(question.exercise_id, alternative)} >{buttonLabel}</button>
                </Col>
                <hr/>
            </Row>
            </section>
        </Container>
    )    
}


export default Exercise;
