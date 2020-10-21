
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

        switch (enumType(type)) {
            case "USM":
                return "재실: " + state.presence.properties.presence + " / " + diff;
            case "DSM":
                return "문열림: " + state.door.properties.door + " / " + diff;
            default:
                console.error("센서의 대표값을 구할 수 없습니다: 잘못된 센서 타입: ", type)
                break;
        }
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