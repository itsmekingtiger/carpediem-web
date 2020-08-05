
import React, { Fragment } from 'react'
import { Input, Button, Table, Modal, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'


function DeviceTableRow({ profDeviceInfo, onChanged }) {
    // const [deviceInfo, setdeviceInfo] = useState({
    //     room: profDeviceInfo.room,
    //     nickname: profDeviceInfo.nickname,
    //     type: profDeviceInfo.type,
    //     mac: profDeviceInfo.mac,
    //     ip: profDeviceInfo.ip,
    //     label: profDeviceInfo.lable,
    // })

    const { location, nickname, type, mac, ip, label, config } = profDeviceInfo;


    const onClickWink = (e) => {
        axios.post(`/api/devices/wink/${ip}`)
            .then((res) => {
                if (res.status !== 200) {
                    console.error(res.data);
                }
            })
    }



    return (
        <Fragment>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    {location.room}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {nickname}
                </Table.Cell>
                <Table.Cell textAlign='center'>{type}</Table.Cell>
                <Table.Cell textAlign='center'>{mac}</Table.Cell>
                <Table.Cell textAlign='center'>{ip}</Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button color='teal' onClick={onClickWink}>Wink</Button>
                </Table.Cell>
                <Table.Cell textAlign='center' >
                    <Modal
                        trigger={<Button>설정</Button>}>
                        <Modal.Header>{location.room} - {nickname}({ip})의 설정</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <Header>장치위치</Header>
                                <Input
                                    defaultValue={location.room}
                                    name={`location.room@` + mac}
                                    placeholder='위치'
                                    onChange={onChanged}
                                />
                                <Header>locationID</Header>
                                <Input
                                    defaultValue={location.locationId}
                                    name={`location.locationId@` + mac}
                                    placeholder='location id'
                                    onChange={onChanged}
                                />
                                <Header>X좌표</Header>
                                <Input
                                    defaultValue={location.y}
                                    name={`location.x@` + mac}
                                    placeholder='x좌표'
                                    onChange={onChanged}
                                />
                                <Header>Y좌표</Header>
                                <Input
                                    defaultValue={location.x}
                                    name={`location.y@` + mac}
                                    placeholder='y좌표'
                                    onChange={onChanged}
                                />
                                <Header>장치 이름</Header>
                                <Input
                                    defaultValue={nickname}
                                    name={`nickname@` + mac}
                                    placeholder='이름'
                                    onChange={onChanged}
                                />
                                <Header>서브 라벨</Header>
                                `,`로 분리하여 입력. {config}개 입력 가능(STM한정).
                                <p />

                                <Input
                                    defaultValue={label}
                                    name={`label@` + mac}
                                    placeholder='라벨'
                                    onChange={onChanged}
                                />
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Table.Cell >
            </Table.Row>
        </Fragment>



    )
}

export default React.memo(DeviceTableRow);