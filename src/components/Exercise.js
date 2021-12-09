import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { questionApi, answerQuestion, url, httpPost } from '../services/api';
import './Exercise.css';

const Exercise = () => {

    const [question, setQuestion] = useState([]);
    const [alternative, setAlternatives] = useState([]);
    const [is_correct, setIsCorrect] = useState(null);
    const [buttonDisable, setButtonDisable] = useState(true);

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
    

    // const handleSubmit = () => {
    //         answerQuestion(question.exercise_id, alternative).then((res) => {
    //             if (res) {
    //                 setIsCorrect(res.is_correct);
    //             }
    //         })
    // };

    // const handleSubmit = () => {
    //     let a = question.exercise_id;
    //     let b = alternative;

    //     answerQuestion(a, b).then((res) => {
    //         console.log(res)
    //     })
    // }

    const correct = (value) => {
        setIsCorrect(value);
        console.log(value);
    }

    const handleSubmit = (exercise_id, teste_alternative) => {
        console.log('aqui o botão que chama')
        console.log(httpPost(exercise_id, teste_alternative));
        // e.preventDefault();

        // let resp = {
        //     exercise_id: question.exercise_id,
        //     choice: alternative
        // }

        // let response = fetch(url, {
        //     method : 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(resp)
        // })
        // console.log(response)
        // .then((response) => {
        //     correct(resp.is_correct)
        //     console.log('deu certo' + resp.choice)
        // })

        // console.log(resp)
        // console.log(resp.is_correct)

    }



    //const value = {alternative, selectedOption, buttonDisable}
    const rightFeedback = '<b>Resposta correta</b> Boa! Acertou em cheio.';
    const wrongFeedback = '<b>Resposta incorreta</b> Que tal tentar novamente?';

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <section className="limite">
            <Row className="pt-5 mt-5">
                <h2>{question.institution}</h2>
                <p dangerouslySetInnerHTML={{__html: question.exercise_text}} />
                <ul>
                    {question.alternatives?.map((option) => 
                        <li>
                            <p>
                                <input type="radio" name="alternatives" id={option.letter} onChange={() => selectedOption(option.letter)}/>
                                <span className="option">{option.letter}. <span id="value">{option.label}</span></span>
                                </p>
                        </li>
                    
                    )}                    
                </ul>

                <hr/>
                <Col>
                {is_correct}
                </Col>
                <Col className="pb-3 text-end">
                    <button id="btn" className="button" disabled={buttonDisable} onClick={() => handleSubmit(question.exercise_id, alternative)} >Verificar resposta</button>
                </Col>
                <hr/>

                

            </Row>
            </section>
        </Container>
    )

    
}


export default Exercise;
