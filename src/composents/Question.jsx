import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const STOQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState()
    const [newAnswer, setNewAnswer] = useState([]);
    const session = sessionStorage.getItem("token");

    useEffect(() => {
        const getQuestion = async (id) => {
            if (session == null) {
                navigate('/')
            }
            const { data } = await axios.get(`https://server.joeleprof.com/questions/${id}/${session}`);

            if (data.success) {
                setQuestion(data.data)
            }
        }

        getQuestion(id);

    }, [session, id, navigate]);

    const getInitialFromAutor = (autor) => {
        const name = autor;
        var names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    const showAnswer = (answers) => {
        let compteur = 0;
        return answers.map((answer) => <div key={compteur += 1} className="answer-container">
            <div className="answer-title">
                <div >{getInitialFromAutor(answer.autor)}</div>
                <div>{answer.autor}</div>

            </div>
            <div className="answer">{answer.answer}</div>
        </div>)
    }

    const addNewAnswer = async () => {
        const body = { newAnswer: newAnswer }
        const { data } = await axios.post(`https://server.joeleprof.com/questions/${id}/create-answer/${session}`, body);
        if (data.success) {
            setQuestion(data.data)
        }

        setNewAnswer('')
    }


    return (
        <>
           
            <div >
                <div >{question?.question}
                </div>
                <div >
                    <br /><br /><br />
                    <input  type="text" placeholder="Vous avez la réponse à cette question? Répondez ici ..." value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                    <button  onClick={addNewAnswer}>Répondre</button>
                </div>
                {question?.answers.length > 0 && showAnswer(question?.answers)}
            </div>
        </>

    )
}

export default STOQuestion
