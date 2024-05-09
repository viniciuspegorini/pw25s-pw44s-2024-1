import axios from 'axios'
import { ChangeEvent, useState } from 'react'

export function UserSignupPage() {
    const [form, setForm] = useState({
        displayName: '',
        username: '',
        password: '',
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        })
    }


    const onClickSignup = () => {
        const user = {
            displayName: form.displayName,
            username: form.username,
            password: form.password
        }

        console.log(1)
        axios.post('http://localhost:8025/users', user)
            .then((response) => {
                console.log(2)
                console.log(response.data.message)
            })
            .catch((error) => {
                console.log(3)
                console.log(error)
            })
        console.log(4)

    }

    return (
        <>
            <div className="container">
                <h1 className="text-center">Sign Up - {form.displayName} - {form.username}</h1>
                <div className="col-12 mb-3">
                    <label htmlFor="displayName">Informe seu nome:</label>
                    <input type="text"
                        id="displayName"
                        name="displayName"
                        placeholder="Informe seu nome"
                        className="form-control"
                        value={form.displayName}
                        onChange={onChange} />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="username">Informe seu usuário:</label>
                    <input type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        placeholder="Informe seu usuário"
                        className="form-control"
                        onChange={onChange} />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="password">Informe sua senha:</label>
                    <input type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        placeholder="******"
                        className="form-control"
                        onChange={onChange} />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary"
                        onClick={onClickSignup}>Cadastrar</button>
                </div>
            </div>
        </>
    )
}