
import React, { useState } from 'react'
import { Input, Button, Grid, Header, Segment, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Login.css'


function LoginPage() {
    const [user_id, setUser_id] = useState('');
    const [user_pw, setUser_pw] = useState('');
    const [idHasErr, setIdHasErr] = useState(true);
    const [pwHasErr, setPwHasErr] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(true)

    const onChangeID = (evt, data) => {
        setUser_id(data.value)
        setIdHasErr(data.value.length === 0 ? true : false)
        calcValid()
    }

    const onChangePW = (evt, data) => {
        setUser_pw(data.value)
        setPwHasErr(data.value.length === 0 ? true : false)
        calcValid()
    }

    const calcValid = () => {
        if (!idHasErr && !pwHasErr) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }

    const onClickSubmit = (evt, data) => {
        let err = false

        console.log(user_id);
        console.log(user_pw);
    }

    return (
        // <Segment>

        <Grid className='centre-pannel' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 300 }}>

                <Form size='large'>
                    <Segment stacked>
                        <Header as='h1'>Carpe Diem</Header>
                        <Form.Input error={idHasErr} icon='user' iconPosition='left' placeholder='사용자' onChange={onChangeID} />
                        <Form.Input error={pwHasErr} icon='key' iconPosition='left' placeholder='비밀번호' onChange={onChangePW} type='password' />
                        <Button color='teal' fluid size='large'>
                            로그인
                        </Button>
                    </Segment>
                </Form>

            </Grid.Column>
        </Grid>
        // </Segment>
    )
}

export default LoginPage;