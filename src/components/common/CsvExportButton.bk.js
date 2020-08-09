import React, { useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import { instance } from 'utils';

export default (props) => {
	const { headers, api, filename } = props;
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	const fetchRows = () => {
		setLoading(true);
		instance.get(api).then((res) => {
			setLoading(false);
			setData(res.rows);
		});
	};

	if (!data) return <button onClick={fetchRows}>FETHC</button>;

	return (
		<CSVLink data={data} headers={headers} filename={`${filename || 'arise'}.csv`}>
			Download me
		</CSVLink>
	);

	return (
		<CSVDownload
			data={data}
			headers={headers}
			filename={`${filename || 'arise'}.csv`}
			target="_blank"
		/>
	);
};
