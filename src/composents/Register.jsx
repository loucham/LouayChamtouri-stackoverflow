import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components

const Register = () => {
    const navigate = useNavigate();
    const [da, setDa] = useState('')
    const [fullName, setFullName] = useState('')
    const [psw, setPsw] = useState('')
    const [pswConfirm, setPswConfirm] = useState('')
    const [isAlert, setIsAlertPsw] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        if (psw !== pswConfirm) {
            return setIsAlertPsw('Attention, les mots de passe doivent être identique');
        }

        const body = { matricule: da, fullName: fullName, password: psw }
        const { data } = await axios.post('https://server.joeleprof.com/auth/register', body);

        setDa('');
        setFullName('')
        setPsw('');
        setPswConfirm('');

        if (!data.success) {
            return setIsAlertPsw(data.msg);
        }

        // Save data to sessionStorage
        sessionStorage.setItem("token", data.token);
        navigate('/stackoverteccart/questions')
    }

    const goToRegisterPage = () => {
        navigate('/stackoverteccart')
    }



    return (
        <>

            <div className='container'>
                <h1>Page d'inscription</h1>
                {
                    isAlert !== '' &&
                    <div className="alert-box">
                        {isAlert}
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <h1> </h1>
                    <input
                        className="input-reverse-sot"
                        placeholder="Matricule"
                        value={da}
                        onChange={(e) => setDa(e.target.value)}
                    />
                    <input
                        className="input-reverse-sot"
                        placeholder="Votre nom complet"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <h1> </h1>
                    <input
                        placeholder="Mot de passe"
                        value={psw}
                        type='password'
                        onChange={(e) => setPsw(e.target.value)}
                    />
                    <input
                        placeholder="Confirmer mot de passe"
                        type='password'
                        value={pswConfirm}
                        onChange={(e) => setPswConfirm(e.target.value)}
                    />
                    <h1> </h1>
                    <input type='submit' value="S'inscrire" className='btn' />
                </form >
                <h1> </h1>
                <div className="register" onClick={goToRegisterPage}>Déjà client ? Se connecter</div>
            </div >
        </>
    )
}

export default Register