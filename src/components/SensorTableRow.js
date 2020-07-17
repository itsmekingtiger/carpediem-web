
import React, { Fragment } from 'react'
import { Input, Button, Table, Modal, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'


function SensorTableRow({ profDeviceInfo, onChanged }) {
    const { room, uid } = profDeviceInfo;





    return (
        <Fragment>
            <Table.Row>
                <Table.Cell textAlign='center'>
                    <Input name={uid} defaultValue={room} onChange={onChanged}></Input>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    {uid}
                </Table.Cell>
            </Table.Row>
        </Fragment>



    )
}

export default React.memo(SensorTableRow);