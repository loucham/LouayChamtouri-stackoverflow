import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipsesOutline, IoEyeOutline, IoPersonOutline } from "react-icons/io5";
import axios from "axios";


const Questions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState([]);
    const session = sessionStorage.getItem("token");

    useEffect(() => {
        const getQuestions = async () => {
            if (session == null) {
                navigate('/')
            }
            const { data } = await axios.get(`https://server.joeleprof.com/questions/${session}`);

            if (data.success) {
                setQuestions(data.data);
            }
        }
        getQuestions();
    }, [navigate, session]);


    const showQuestionDetails = (id) => {
        navigate(`/stackoverteccart/question/${id}`)
    }

    const getInitialFromAutor = (autor) => {
        const name = autor;
        var names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    const showQuestion = (question) => {
        return <div key={question._id} >
            <div >{question.question}</div>
            <div >
                <div  onClick={() => showQuestionDetails(question._id)}>
                    <IoChatboxEllipsesOutline />
                    <div >{question.answers.length}</div>
                    <IoEyeOutline />
                    <div >{question.views}</div>
                    <IoPersonOutline />
                    <div >{getInitialFromAutor(question.autor)}</div>
                </div>

            </div>
        </div>


    }

    const showQuestions = () => {
        return questions.map((question) => showQuestion(question))
    }

    const addNewQuestion = async () => {
        const body = { newQuestion: newQuestion }
        const { data } = await axios.post(`https://server.joeleprof.com/questions/${session}`, body);

        if (data.success) {
            setQuestions(data.data);
        }
        setNewQuestion('')
    }

   

    return (<>
       
        <div >
            <div c>
                <input  type="text" placeholder="Vous avez une question? Posez la ici ..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                <button  onClick={addNewQuestion}>Ajouter</button>
            </div>
            <div ></div>
            {showQuestions()}
        </div>
    </>
    )
}

export default Questions