
import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { Input, Button, Grid, Header, Segment, Popup, Container, Table, Checkbox, List } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Login.css'
import DeviceTableRow from './DeviceTableRow.js';
import SensorTableRow from './SensorTableRow.js';
import axios from 'axios';


function Dashboard() {
    const [deviceRows, setdeviceRows] = useState([])
    let deviceStatus = [];
    const [sensorRows, setSensorRows] = useState([])
    const [enablePush, setEnablePush] = useState(false)
    const [homename, setHomename] = useState('')


    useEffect(() => {
        // 장치 상태 가져오기
        axios.get('/api/devices/*')
            .then((res) => {
                console.log(res.data);

                let deviceSchema = res.data.map((e) => {
                    let ds = e.DeviceSchema;
                    ds.state = e.Features;
                    // console.log(ds);
                    return ds;
                })

                setdeviceRows(deviceSchema)
            })
            .catch(err => console.log(err.response));

        // 센서 상태 가져오기
        axios.get('/api/sensors/*')
            .then((res) => {
                // console.log("센서가져오기", res.data);

                let sensorSchema = res.data.map((e) => {
                    let ss = e.SensorSchema;
                    ss.state = e.Features;
                    // console.log(ss);
                    return ss;
                })
                setSensorRows(sensorSchema)
            })
            .catch(err => console.log(err.response));


        // 홈 이름 가져오기
        axios.get('/api/home')
            .then((res) => {
                setHomename(res.data.home)
            })
            .catch((err) => {
                console.log(err);
            })

        // 푸쉬 상태 받아오기
        axios.get('/api/service/push')
            .then((res) => {
                setEnablePush(res.data.push)
            })
            .catch((err) => {
                console.log(err);
            })

        return () => {
        }
    }, [])



    const onChangedDevice = (e) => {
        var { name, className, value } = e.target
        const key = name.split('@')
        const nested = key[0].split('.')
        setdeviceRows(
            deviceRows.map((dev) => {
                if (dev.mac === key[1]) {
                    if (key[0] === 'label') {
                        dev = {
                            ...dev,
                            [key[0]]: value.split(',')
                        }
                    } else {
                        // 로케이션 처리
                        console.log("dev", dev["location"]);
                        if (nested.length === 2) {
                            switch (nested[1]) {
                                case "x":
                                case "y":
                                    value = Number(value)
                                    break;

                                default:
                                    break;
                            }
                            dev = {
                                ...dev,
                                [nested[0]]: {
                                    ...dev.location,
                                    [nested[1]]: value
                                }
                            }
                        } else {
                            dev = {
                                ...dev,
                                [key[0]]: value
                            }
                        }
                    }
                }
                return dev
            })
        )
    }

    const onChangedSensor = (e) => {
        var { name, value } = e.target
        const key = name.split('@')
        const nested = key[0].split('.')
        console.log(`${key[1]}, ${nested[1]}는 ${value}`);

        setSensorRows(
            sensorRows.map((sens) => {
                if (sens.uid == key[1]) {
                    console.log(sens.uid);

                    switch (nested[1]) {
                        case 'x':
                        case 'y':
                            sens = {
                                ...sens,
                                [nested[0]]: {
                                    ...sens.location,
                                    [nested[1]]: Number(value)
                                }
                            }
                            break;

                        case 'locationId':
                        case 'room':
                            sens = {
                                ...sens,
                                [nested[0]]: {
                                    ...sens.location,
                                    [nested[1]]: value
                                }
                            }

                        default:
                            break;
                    }
                    return sens
                }
                return sens
            })
        )
    }


    const onClickDeviceDiscovery = () => {
        axios.post('/api/devices/discovery')
    }
    const onClickDeviceSave = () => {
        console.log(JSON.stringify(deviceRows));


        axios.put('/api/devices', JSON.stringify(deviceRows))
    }

    const onClickSensorSave = () => {
        console.log(sensorRows);

        axios.put('/api/sensors', sensorRows)
    }

    const onChangeHome = (e) => {
        let { value } = e.target;
        setHomename(value)
    }

    const onClickPushToggle = () => {
        setEnablePush(!enablePush)
    }
    const onClickConfig = () => {
        axios.put('/api/service/set', { push: enablePush, home: homename })
            .then((res) => {
                console.log(res.data);

                if (res.status !== 200) {
                    console.error(res.data);
                }
            })
    }
    const onClickShutdown = () => {
        axios.post('/api/service/shutdown', { push: enablePush, home: homename })
    }


    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 900 }}>
                <Segment>
                    {/* 장치 */}
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
                                    <Table.HeaderCell textAlign='center'>갱신시각</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>윙크</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>설정</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {deviceRows.map(dev => (
                                    <DeviceTableRow
                                        profDeviceInfo={dev}
                                        onChanged={onChangedDevice}
                                        key={dev.mac} />
                                ))}

                            </Table.Body>
                        </Table>

                        <Container textAlign='left'>
                            <Button onClick={onClickDeviceDiscovery} color='teal'>검색</Button>
                            <Button onClick={onClickDeviceSave} color='teal'>저장</Button>
                        </Container>
                    </Container>


                    {/* 센서 */}
                    <Container style={{ marginBottom: 100 }}>
                        <Header as='h2' textAlign='left'>센서</Header>
                        <Table selectable compact>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='center'>room</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>locationId</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>X</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Y</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>갱신시각</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>타입</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>UID</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {sensorRows.map(sens => (
                                    <SensorTableRow
                                        profDeviceInfo={sens}
                                        onChanged={onChangedSensor}
                                        key={sens.uid} />
                                ))}
                            </Table.Body>
                        </Table>

                        <Container textAlign='left'>
                            <Button onClick={onClickSensorSave} color='teal'>저장</Button>
                        </Container>
                    </Container>


                    {/* 설정 */}
                    <Container textAlign='left'>
                        {/* <Container style={{ marginTop: 100, marginBottom: 100 }}> */}

                        <Header as='h1'>기타설정</Header>

                        <Popup
                            trigger={<Input
                                label='홈 이름'
                                name='home'
                                placeholder='홈 이름'
                                value={homename}
                                onChange={onChangeHome} />}
                            header='홈 이름'
                            content={<List>
                                <List.Item>- 홈 이름은 다음과 같이 설정해 주세요</List.Item>
                                <List.Item>- 아파트이름.d동.h호</List.Item>
                                <List.Item>- 만일 한미아파트 101동 109호라면</List.Item>
                                <List.Item>- hanmi.d101.h109</List.Item>
                            </List>}
                            on={['hover', 'focus']}
                        />
                        <p />
                        <Checkbox
                            // name='push'
                            toggle
                            checked={enablePush}
                            onClick={onClickPushToggle}
                            label='Push to CarpeDiem' />
                        <p />
                        <Button onClick={onClickConfig} color='teal'>저장</Button>
                        <Button onClick={onClickShutdown} color='red'>서비스 종료(재시작)</Button>
                        <p />

                        {"* 서비스 종료시 10초 후에 새로고침 해주세요."}
                    </Container>
                </Segment>
            </Grid.Column>
        </Grid >
    )
}

export default React.memo(Dashboard);