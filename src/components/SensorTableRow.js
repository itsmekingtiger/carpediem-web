
import React, { Fragment } from 'react'
import { Input, Button, Table, Modal, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'


function SensorTableRow({ profDeviceInfo, onChanged }) {
    const { type, location, uid, "last-update-time": lastUpdateTime, state } = profDeviceInfo;


    const getMainState = (type, state) => {
        let ltu = new Date(lastUpdateTime).getTime();
        let diff = Math.round((Date.now() - ltu) / 1000) + " sec ago";
        if (300 > ltu) {
            diff = "disconnected"
        }

        let mainStateStr = ""
        switch (enumType(type)) {
            case "USM":
                switch (state.presence.properties.presence) {
                    case 1:
                    case 3:
                        mainStateStr = "부재"
                        break;

                    case 2:
                    case 4:
                        mainStateStr = "재실"
                        break;

                    default:
                        mainStateStr = `알수없음(${state.presence.properties.presence})`
                        break;
                }
                return mainStateStr + " / " + diff;
            case "DSM":
                switch (state.door.properties.door) {
                    case 1:
                    case 3:
                        mainStateStr = "닫힘"
                        break;

                    case 2:
                    case 4:
                        mainStateStr = "열림"
                        break;

                    default:
                        mainStateStr = `알수없음(${state.door.properties.door})`
                        break;
                }
                return mainStateStr + " / " + diff;
            default:
                console.error("센서의 대표값을 구할 수 없습니다: 잘못된 센서 타입: ", type)
                break;
        }
    }


    const onClickDelete = (e) => {
        axios.delete(`/api/sensor/${uid}`)
            .then((res) => {
                if (res.status !== 200) {
                    alert("오류:" + res.data);
                    console.error(res.data);
                } else {
                    alert("삭제됨");
                }
            })
    }

    return (
        <Fragment>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    <Input name={`location.room@${uid}`} defaultValue={location.room} onChange={onChanged} fluid></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input name={`location.locationId@${uid}`} defaultValue={location.locationId} onChange={onChanged} fluid></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input name={`location.x@${uid}`} defaultValue={location.x} onChange={onChanged} fluid></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input name={`location.y@${uid}`} defaultValue={location.y} onChange={onChanged} fluid></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {getMainState(type, state)}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {enumType(type)}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {uid}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button color='red' onClick={onClickDelete}>삭제</Button>
                </Table.Cell>
            </Table.Row>
        </Fragment>
    )
}

function enumType(typenum) {
    switch (typenum) {
        case 1:
            return "BSM"
        case 2:
            return "DSM"
        case 3:
            return "OSM"
        case 4:
            return "TSM"
        case 7:
            return "USM"
        case 99:
            return "ZBC"
        default:
            return "알 수 없는 장치"
    }
}

export default React.memo(SensorTableRow);