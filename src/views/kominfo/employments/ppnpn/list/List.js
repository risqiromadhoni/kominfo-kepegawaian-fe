import React from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	UncontrolledDropdown,
	UncontrolledButtonDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	Collapse,
	Spinner,
	Button,
} from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import { ContextLayout } from '../../../../../utility/context/Layout';
import { AgGridReact } from 'ag-grid-react';
import {
	Edit,
	Trash2,
	ChevronDown,
	Clipboard,
	Printer,
	Download,
	Eye,
	RotateCw,
	X,
} from 'react-feather';
import { history } from '../../../../../history';
import '../../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss';
import '../../../../../assets/scss/pages/users.scss';
import { Fragment } from 'react';
import BreadCrumbs from '../../../../../components/@vuexy/breadCrumbs/BreadCrumb';
import classnames from 'classnames';
class UsersList extends React.Component {
	state = {
		rowData: null,
		pageSize: 20,
		isVisible: true,
		reload: false,
		collapse: true,
		status: 'Opened',
		role: 'All',
		selectStatus: 'All',
		verified: 'All',
		department: 'All',
		defaultColDef: {
			sortable: true,
		},
		fieldFilters: [
			'Nama Pegawai',
			'Status Pegawai',
			'Golongan',
			'Satuan Kerja',
			'Pangkat',
			'Jabatan',
			'Jenis Kelamin',
			'Jenjang Sekolah',
			'Jurusan',
		],
		ruleFilters: [
			{ value: 'All', label: 'Semua' },
			{ value: 'User', label: 'Filter Data 1' },
			{ value: 'Staff', label: 'Filter Data 2' },
			{ value: 'Admin', label: 'Filter Data 3' },
		],
		searchVal: '',
		columnDefs: [
			{
				headerName: 'ID',
				field: 'id',
				width: 150,
				filter: true,
				checkboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				headerCheckboxSelection: true,
			},
			{
				headerName: 'Nama',
				field: 'name',
				filter: true,
				width: 200,
				cellRendererFramework: params => {
					return (
						<div
							className="d-flex align-items-center cursor-pointer"
							onClick={() => history.push(`/kominfo/employments/ppnpn/${params.data.id}`)}>
							<img
								className="rounded-circle mr-50"
								src={params.data.avatar}
								alt="user avatar"
								height="30"
								width="30"
							/>
							<span>{params.data.name}</span>
						</div>
					);
				},
			},
			{
				headerName: 'NIP',
				field: 'nip',
				filter: true,
				width: 250,
			},
			{
				headerName: 'Satuan Kerja',
				field: 'role',
				filter: true,
				width: 150,
			},
			{
				headerName: 'TMT Jabatan',
				field: 'tmtJabatan',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Jenis Kelamin',
				field: 'jenisKelamin',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Tahun Lulus',
				field: 'thnLulus',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Jenjang',
				field: 'jenjang',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Jurusan',
				field: 'jurusan',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Agama',
				field: 'agama',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Tempat Lahir',
				field: 'tempatLahir',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Tanggal Lahir',
				field: 'tglLahir',
				filter: true,
				width: 150,
			},
			{
				headerName: 'Status',
				field: 'status',
				filter: true,
				width: 150,
				cellRendererFramework: params => (
					<>
						<div
							className={
								params.data.status === 'active'
									? 'bg-success'
									: params.data.status === 'deactivated'
									? 'bg-warning'
									: params.data.status === 'blocked'
									? 'bg-danger'
									: 'bg-danger'
							}
							style={{
								height: '10px',
								width: '10px',
								borderRadius: '50%',
								display: 'inline-block',
								marginRight: '5px',
							}}
						/>
						<span>{params.data.status}</span>
					</>
				),
			},
			{
				headerName: 'Actions',
				field: 'transactions',
				width: 150,
				cellRendererFramework: params => {
					return (
						<div className="actions cursor-pointer">
							<Eye
								className="mr-50"
								size={15}
								onClick={() => history.push(`/kominfo/employments/ppnpn/${params.data.id}`)}
							/>
							<Edit
								className="mr-50"
								size={15}
								onClick={() => history.push(`/kominfo/employments/ppnpn/${params.data.id}/edit`)}
							/>
							<Trash2
								size={15}
								onClick={() => {
									let selectedData = this.gridApi.getSelectedRows();
									this.gridApi.updateRowData({ remove: selectedData });
								}}
							/>
						</div>
					);
				},
			},
		],
	};

	async componentDidMount() {
		await axios.get('api/users/list').then(response => {
			let rowData = response.data;
			this.setState({ rowData });
		});
	}

	onGridReady = params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
	};

	filterData = (column, val) => {
		var filter = this.gridApi.getFilterInstance(column);
		var modelObj = null;
		if (val !== 'all') {
			modelObj = {
				type: 'equals',
				filter: val,
			};
		}
		filter.setModel(modelObj);
		this.gridApi.onFilterChanged();
	};

	filterSize = val => {
		if (this.gridApi) {
			this.gridApi.paginationSetPageSize(Number(val));
			this.setState({
				pageSize: val,
			});
		}
	};
	updateSearchQuery = val => {
		this.gridApi.setQuickFilter(val);
		this.setState({
			searchVal: val,
		});
	};

	refreshCard = () => {
		this.setState({ reload: true });
		setTimeout(() => {
			this.setState({
				reload: false,
				role: 'All',
				selectStatus: 'All',
				verified: 'All',
				department: 'All',
			});
		}, 500);
	};

	toggleCollapse = () => {
		this.setState(state => ({ collapse: !state.collapse }));
	};
	onEntered = () => {
		this.setState({ status: 'Opened' });
	};
	onEntering = () => {
		this.setState({ status: 'Opening...' });
	};

	onEntered = () => {
		this.setState({ status: 'Opened' });
	};
	onExiting = () => {
		this.setState({ status: 'Closing...' });
	};
	onExited = () => {
		this.setState({ status: 'Closed' });
	};
	removeCard = () => {
		this.setState({ isVisible: false });
	};

	render() {
		const { rowData, columnDefs, defaultColDef, pageSize } = this.state;
		return (
			<Fragment>
				<BreadCrumbs
					breadCrumbTitle="Pegawai"
					breadCrumbParent="Pegawai"
					breadCrumbActive="PPNPN"
				/>
				<Row className="app-user-list">
					<Col sm="12">
						<Card
							className={classnames('card-action card-reload', {
								'd-none': this.state.isVisible === false,
								'card-collapsed': this.state.status === 'Closed',
								closing: this.state.status === 'Closing...',
								opening: this.state.status === 'Opening...',
								refreshing: this.state.reload,
							})}>
							<CardHeader>
								<CardTitle>Filters</CardTitle>
								<div className="actions">
									<ChevronDown
										className="collapse-icon mr-50"
										size={15}
										onClick={this.toggleCollapse}
									/>
									<RotateCw
										className="mr-50"
										size={15}
										onClick={() => {
											this.refreshCard();
											this.gridApi.setFilterModel(null);
										}}
									/>
									<X size={15} onClick={this.removeCard} />
								</div>
							</CardHeader>
							<Collapse
								isOpen={this.state.collapse}
								onExited={this.onExited}
								onEntered={this.onEntered}
								onExiting={this.onExiting}
								onEntering={this.onEntering}>
								<CardBody>
									{this.state.reload ? <Spinner color="primary" className="reload-spinner" /> : ''}
									<Row>
										{this.state.fieldFilters.map(field => (
											<Col lg="4" md="6" sm="12" className="mb-1">
												<FormGroup className="mb-0">
													<Label for="role">{field}</Label>
													<Select
														className="React"
														classNamePrefix="select"
														defaultValue={this.state.ruleFilters[0]}
														name="role"
														options={this.state.ruleFilters}
														onChange={e => {
															this.setState(
																{
																	role: e.value,
																},
																() => this.filterData('role', this.state.role.toLowerCase())
															);
														}}
													/>
												</FormGroup>
											</Col>
										))}
									</Row>
								</CardBody>
							</Collapse>
						</Card>
					</Col>
					<Col sm="12">
						<Card>
							<CardBody>
								<div className="ag-theme-material ag-grid-table">
									<div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
										<div className="sort-dropdown">
											<UncontrolledDropdown className="ag-dropdown p-1">
												<DropdownToggle tag="div">
													1 - {pageSize} of 150
													<ChevronDown className="ml-50" size={15} />
												</DropdownToggle>
												<DropdownMenu right>
													<DropdownItem tag="div" onClick={() => this.filterSize(20)}>
														20
													</DropdownItem>
													<DropdownItem tag="div" onClick={() => this.filterSize(50)}>
														50
													</DropdownItem>
													<DropdownItem tag="div" onClick={() => this.filterSize(100)}>
														100
													</DropdownItem>
													<DropdownItem tag="div" onClick={() => this.filterSize(150)}>
														150
													</DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
										</div>
										<div className="filter-actions d-flex">
											<Input
												className="mr-1 mb-1 mb-sm-0"
												type="text"
												style={{ width: '45%' }}
												placeholder="search..."
												onChange={e => this.updateSearchQuery(e.target.value)}
												value={this.state.searchVal}
											/>
											<div className="dropdown actions-dropdown mr-1">
												<UncontrolledButtonDropdown>
													<DropdownToggle className="px-2 py-75" color="white">
														Actions
														<ChevronDown className="ml-50" size={15} />
													</DropdownToggle>
													<DropdownMenu right>
														<DropdownItem tag="a">
															<Trash2 size={15} />
															<span className="align-middle ml-50">Delete</span>
														</DropdownItem>
														<DropdownItem tag="a">
															<Clipboard size={15} />
															<span className="align-middle ml-50">Archive</span>
														</DropdownItem>
														<DropdownItem tag="a">
															<Printer size={15} />
															<span className="align-middle ml-50">Print</span>
														</DropdownItem>
														<DropdownItem tag="a">
															<Download size={15} />
															<span className="align-middle ml-50">CSV</span>
														</DropdownItem>
													</DropdownMenu>
												</UncontrolledButtonDropdown>
											</div>
											<div>
												<Button.Ripple
													color="primary"
													onClick={() => history.push('/kominfo/employments/ppnpn/1/edit')}>
													Add
												</Button.Ripple>
											</div>
										</div>
									</div>
									{this.state.rowData !== null ? (
										<ContextLayout.Consumer>
											{context => (
												<AgGridReact
													gridOptions={{}}
													rowSelection="multiple"
													defaultColDef={defaultColDef}
													columnDefs={columnDefs}
													rowData={rowData}
													onGridReady={this.onGridReady}
													colResizeDefault={'shift'}
													animateRows={true}
													floatingFilter={true}
													pagination={true}
													pivotPanelShow="always"
													paginationPageSize={pageSize}
													resizable={true}
													enableRtl={context.state.direction === 'rtl'}
												/>
											)}
										</ContextLayout.Consumer>
									) : null}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default UsersList;
