
import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { Input, Button, Grid, Header, Segment, Form, Container, Table, Checkbox } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Login.css'
import DeviceTableRow from './DeviceTableRow.js';
import axios from 'axios';


function Dashboard() {
    const [deviceRows, setdeviceRows] = useState([])
    const [enablePush, setEnablePush] = useState(false)
    const [homename, setHomename] = useState('')


    useEffect(() => {
        // 장치 상태 가져오기
        axios.get('/devices/*')
            .then((res) => {
                console.log(res.data);

                setdeviceRows(res.data)
            });

        // 홈 이름 가져오기
        axios.get('/home')
            .then((res) => {
                setHomename(res.data.home)
            })
            .catch((err) => {
                console.log(err);
            })

        // 푸쉬 상태 받아오기
        axios.get('/service/push')
            .then((res) => {
                setEnablePush(res.data.push)
            })
            .catch((err) => {
                console.log(err);
            })

        return () => {
        }
    }, [])



    const onChanged = (e) => {
        var { name, className, value } = e.target
        const key = name.split('@')
        setdeviceRows(
            deviceRows.map((dev) => {
                if (dev.mac === key[1]) {
                    if (key[0] === 'label') {
                        dev = {
                            ...dev,
                            [key[0]]: value.split(',')
                        }
                    } else {
                        dev = {
                            ...dev,
                            [key[0]]: value
                        }

                    }
                }
                return dev
            })
        )
    }


    const onClickDiscovery = () => {
        axios.post('/devices/discovery')
    }
    const onClickSave = () => {
        console.log(deviceRows);

        axios.put('/devices', deviceRows)
    }

    const onChangeHome = (e) => {
        let { value } = e.target;
        setHomename(value)
    }

    const onClickPushToggle = () => {
        setEnablePush(!enablePush)
    }
    const onClickConfig = () => {
        axios.put('/service/set', { push: enablePush, home: homename })
            .then((res) => {
                console.log(res.data);

                if (res.status !== 200) {
                    console.error(res.data);
                }
            })

    }


    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 900 }}>
                <Segment>
                    <Container style={{ marginBottom: 100 }}>
                        <Header as='h2' textAlign='left'>장치</Header>
                        <Table selectable compact>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='center'>위치</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>닉네임</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>타입</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>MAC</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>IP</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>윙크</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>설정</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {deviceRows.map(dev => (
                                    <DeviceTableRow
                                        profDeviceInfo={dev}
                                        onChanged={onChanged}
                                        key={dev.mac} />
                                ))}

                            </Table.Body>
                        </Table>

                        <Container textAlign='left'>
                            <Button onClick={onClickDiscovery} color='teal'>검색</Button>
                            <Button onClick={onClickSave} color='teal'>저장</Button>
                        </Container>
                    </Container>

                    <Container textAlign='left'>
                        {/* <Container style={{ marginTop: 100, marginBottom: 100 }}> */}

                        <Header as='h1'>설정</Header>
                        <Input
                            name='home'
                            placeholder='홈 이름'
                            value={homename}
                            onChange={onChangeHome} />
                        <p />
                        <Checkbox
                            // name='push'
                            toggle
                            checked={enablePush}
                            onClick={onClickPushToggle}
                            label='Push to CarpeDiem' />
                        <p />
                        <Button onClick={onClickConfig} color='teal'>저장</Button>
                    </Container>
                </Segment>
            </Grid.Column>
        </Grid >
    )
}

export default React.memo(Dashboard);