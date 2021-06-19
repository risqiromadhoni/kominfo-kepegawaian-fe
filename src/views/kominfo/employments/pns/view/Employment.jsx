import React from 'react';
import { Row, Col, FormGroup, Form, Input, Label } from 'reactstrap';
import { strToName } from '../../../../../utility/helper';

const fields = [
	'NIP',
	'Tipe Pegawai',
	'Satuan Kerja',
	'Jabatan',
	'TMT Jabatan',
	'Kelas Jabatan',
	'Jabatan PLT',
	'Jabatan PLH',
	'TMT CPNS',
	'TMT PNS',
	'Masa Kerja Keseluruhan',
	'Masa Golongan Kerja',
	'Pangkat Ruang',
	'TMT Kepangkatan',
	'Pangkat Berikutnya',
	'TMT Kepangkatan Berikutnya',
	'Status Pegawai',
	'Kedudukan Pegawai',
];

const Employment = props => {
	return (
		<Form>
			<Row>
				{fields.map((field, index) => (
					<Col key={index} md="6" sm="12">
						<FormGroup>
							<Label for={strToName(field)}>{field}</Label>
							<Input
								type="text"
								id={strToName(field)}
								name={strToName(field)}
								placeholder={field}
							/>
						</FormGroup>
					</Col>
				))}
			</Row>
		</Form>
	);
};

export default Employment;
