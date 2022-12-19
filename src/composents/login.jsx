import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
    const navigate = useNavigate();
    const [da, daUser] = useState('')
    const [psw, setPsw] = useState('')

    const [isAlert, setIsAlertPsw] = useState('')
    const [isSucess, setIsSucess] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        if (da === '' || psw === '') {
            return setIsAlertPsw('Attention, vous devez remplir tous les champs');
        }

        const body = { matricule: da, password: psw }
        const { data } = await axios.post('https://server.joeleprof.com/auth/login', body);

        setIsAlertPsw('');
        setIsSucess('');

        daUser('');
        setPsw('');

        if (!data.success) {
            return setIsAlertPsw(data.msg)
        }

        if (data.token === undefined) {
            return setIsSucess(data.msg);
        }

        // Save data to sessionStorage
        sessionStorage.setItem("token", data.token);
        navigate('/stackoverteccart/questions')
    }

    const goToRegisterPage = () => {
        navigate('/stackoverteccart/register')
    }


    return (
        <>
           
            <div className='container'>
                <h1>Page de connexion</h1>
                {
                    isAlert !== '' ?
                        <div className="alert-box">
                            {isAlert}
                        </div>
                        : isSucess !== '' && <div className="success-box">
                            {isSucess}
                        </div>
                }

                <form onSubmit={onSubmit}>
                    <h1> </h1>
                    <input
                        className="input-reverse-sot"
                        placeholder="Matricule"
                        value={da}
                        onChange={(e) => daUser(e.target.value)}
                    />
                    <input
                        className="input-reverse-sot"
                        placeholder="Mot de passe"
                        type="password"
                        value={psw}
                        onChange={(e) => setPsw(e.target.value)}
                    />
                    <h1> </h1>
                    <input type='submit' value='Connexion' className='btn' />
                </form >
                <h1> </h1>
                <div className="register" onClick={goToRegisterPage}>Nouveau client ? M'inscrire</div>
            </div >
        </>
    )
}

export default Login