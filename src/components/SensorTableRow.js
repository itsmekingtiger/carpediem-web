
import React, { Fragment } from 'react'
import { Input, Button, Table, Modal, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'


function SensorTableRow({ profDeviceInfo, onChanged }) {
    const { room: location, uid } = profDeviceInfo;





    return (
        <Fragment>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    <Input name={`location.room@${uid}`} defaultValue={location.room} onChange={onChanged}></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input name={`location.locationId@${uid}`} defaultValue={location.locationId} onChange={onChanged}></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input name={`location.x@${uid}`} defaultValue={location.x} onChange={onChanged}></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Input name={`location.y@${uid}`} defaultValue={location.y} onChange={onChanged}></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {uid}
                </Table.Cell>
            </Table.Row>
        </Fragment>



    )
}

export default React.memo(SensorTableRow);