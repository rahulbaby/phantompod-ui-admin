import React, { Component, Fragment, useState } from 'react';
import { instance } from 'utils';
import Layout from 'layouts/Main';
import ProfileForm from "./ProfileForm"
import ResetPassword from "./ResetPassword"
import TrialSubsriptionSettings from "./TrialSubsriptionSettings"
import SubscriptionSettings from "./SubscriptionSettings"
import {CirclularLoader} from 'components/loaders'
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const Title=({label})=>(
	<React.Fragment>
	<br/>
	<Typography color="secondary" variant="h2" >{label.toUpperCase()}</Typography>
	</React.Fragment>
)

const Page=()=>{
	const [loading,setLoading] =useState(true)
	const [settings,setSettings] =useState({})
	const getSettings=()=>{
		setLoading(true)
		instance.get( 'settings' ).then(res=>{
			setSettings(res)
			setLoading(false)
		})
	}
	React.useEffect(()=>{
		getSettings()
	},[])

	if( loading ) return <CirclularLoader/>

	return (
		<React.Fragment>
		<Title label="trial subsription" />
		<Card><TrialSubsriptionSettings  row={settings} onSuccess={getSettings}/></Card>
		<Title label="stripe product"  />
		<Card><SubscriptionSettings row={settings} onSuccess={getSettings}/></Card>
		<Title label="reset password" />
		<Card><ResetPassword/></Card>
		</React.Fragment>
		)
}

export default ()=><Layout><Page/></Layout>