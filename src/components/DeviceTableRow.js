
import React, { Fragment } from 'react'
import { Input, Button, Table, Modal, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'


function DeviceTableRow({ profDeviceInfo, onChanged }) {

    const {
        location,
        nickname,
        type,
        mac,
        ip,
        label,
        config,
        "enernet-label": enernetLabel,
        "last-update-time": lastUpdateTime,
        state,
    } = profDeviceInfo;


    const onClickWink = (e) => {
        axios.post(`/api/devices/wink/${ip}`)
            .then((res) => {
                if (res.status !== 200) {
                    console.error(res.data);
                }
            })
    }

    const onClickDelete = (e) => {
        axios.delete(`/api/device/${mac}`)
            .then((res) => {
                if (res.status !== 200) {
                    alert("오류:" + res.data);
                    console.error(res.data);
                } else {
                    alert("삭제됨");
                }
            })
    }

    const getMainState = (type, state) => {
        let ltu = new Date(lastUpdateTime).getTime();
        let diff = Math.round((Date.now() - ltu) / 1000) + " sec ago";
        if (300 > ltu) {
            diff = "disconnected"
        }

        let mainStateStr = ""
        switch (type) {
            case "ACM":
                switch (state.airconditioner.properties.switch) {
                    case 0:
                        mainStateStr = "꺼짐"
                        break;
                    case 1:
                        mainStateStr = "켜짐"
                        break;
                    default:
                        mainStateStr = `알수없음(${state.airconditioner.properties.switch})`
                        break;
                }
                return mainStateStr + " / " + diff;

            case "AQM":
                return state.airquality.properties.temperature + "°C / " + diff;

            case "BCM":
                switch (state.boiler.properties.switch) {
                    case 0:
                        mainStateStr = "꺼짐"
                        break;
                    case 1:
                        mainStateStr = "켜짐"
                        break;
                    default:
                        mainStateStr = `알수없음(${state.boiler.properties.switch})`
                        break;
                }
                return mainStateStr + " / " + diff;

            case "CCM":
                switch (state.smartswitch.properties.switch) {
                    case 0:
                        mainStateStr = "꺼짐"
                        break;
                    case 1:
                        mainStateStr = "켜짐"
                        break;
                    default:
                        mainStateStr = `알수없음(${state.smartswitch.properties.switch})`
                        break;
                }
                return mainStateStr + " / " + diff;

            case "LCM":
                return state["dimming-switch"].properties.switch + "% / " + diff;

            case "STM":
                switch (state.switch0.properties.switch) {
                    case 0:
                        mainStateStr = "꺼짐"
                        break;
                    case 1:
                        mainStateStr = "켜짐"
                        break;
                    default:
                        mainStateStr = `알수없음(${state.switch0.properties.switch})`
                        break;
                }
                return mainStateStr + " / " + diff;

            case "SDM":
                return `밝기: ${state["dimming-switch0"].properties.switch}%` + " / " + diff;

            case "PMM":
                return `${state.meter.properties.power}W / ${diff}`;

            default:
                console.error("장치의 대표값을 구할 수 없습니다: 잘못된 장치 타입: ", type)
                break;
        }
    }

    const drawConnecttedDevice = () => {
        if (type === "PMM" || type === "CCM") {
            return <>
                <Header>장치 이름</Header>
                CCM에 연결된 가전기기 이름, 혹은 PMM의 구분(전열/에어컨)
                <p />
                <Input
                    defaultValue={nickname}
                    name={`nickname@` + mac}
                    placeholder='이름'
                    onChange={onChanged}
                />
            </>
        }
    }

    const drawSubLable = () => {
        if (type === "STM" || type === "SDM") {
            return <>
                <Header>서브 라벨</Header>
                `,`로 분리하여 입력. {config & 0b0111}개 입력 가능(STM/SDM한정).
                <p />

                <Input
                    defaultValue={label}
                    name={`label@` + mac}
                    placeholder='라벨'
                    onChange={onChanged}
                />
            </>
        }
    }

    // TODO: onchanged
    const drawEnnLables = () => {
        if (type === "ENN") {
            enernetLabel.map()
            let entries = []

            for (const [key, value] of enernetLabel.entries()) {
                let params = {
                    mac: mac,
                    subId: key,
                    label: value,
                    onchanged: onChanged,
                }
                entries.append(< EnerenyLableEntry params={params}> </EnerenyLableEntry >);
            }

            return <>
                <Header>에너넷 서브 디바이스</Header>
                {entries}
            </>
        }
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
                <Table.Cell textAlign='center'>{getMainState(type, state)}</Table.Cell>
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
                                    defaultValue={location.x}
                                    name={`location.x@` + mac}
                                    placeholder='x좌표'
                                    onChange={onChanged}
                                />
                                <Header>Y좌표</Header>
                                <Input
                                    defaultValue={location.y}
                                    name={`location.y@` + mac}
                                    placeholder='y좌표'
                                    onChange={onChanged}
                                />

                                {drawConnecttedDevice()}

                                {drawSubLable()}

                                {drawEnnLables()}
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button color='red' onClick={onClickDelete}>삭제</Button>
                </Table.Cell>
            </Table.Row>
        </Fragment>



    )
}

function EnerenyLableEntry(params) {
    const { mac, subId, label, onChanged } = params;
    return (
        <Table.Row>
            <Table.Cell textAlign='center'>
                {mac}
            </Table.Cell>
            <Table.Cell textAlign='center'>
                <Input
                    defaultValue={label}
                    onChange={onChanged}
                    name={`enernet-label.${subId}@${mac}`}
                />
            </Table.Cell>
        </Table.Row>
    )
}

export default React.memo(DeviceTableRow);