import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

import store from './src/redux/store';
import {Provider} from 'react-redux';

import {Game, WebViewScreen} from './src/screens';

import remoteConfig from '@react-native-firebase/remote-config';

import {IDFA} from 'react-native-idfa';

import appsFlyer from 'react-native-appsflyer';

import {
	appsflyerDevKey,
	bundleName,
} from './src/constants';

/**
 * Custom hook that obtains AppsFlyer Unique ID
 * @returns {string} AppsFlyer Unique ID
 */
const useAppsflyerId = () => {
	const [appsflyer_id, setAppsflyer_id] = useState('');

	useEffect(() => {
		appsFlyer.getAppsFlyerUID((err, appsflyerUID) => {
			if (err) {
				console.error(err);
			} else {
				// console.log('on getAppsFlyerUID: ' + appsflyerUID);
				setAppsflyer_id(appsflyerUID);
			}
		});
	}, []);

	return appsflyer_id;
};

/**
 * Custom hook that obtains Google Advertising ID
 * @returns {string} Google Advertising ID
 */
const useAdvertisingId = () => {
	const [advertising_id, setAdvertising_id] = useState('');

	useEffect(() => {
		IDFA.getIDFA().then(idfa => {
			setAdvertising_id(idfa);
		})
		.catch(er => console.error(er));
	}, []);

	return advertising_id;
};


const App = () => {
	//get appsflyer unique device id
	const appsflyer_id = useAppsflyerId();

	//gather remote config value(s) and set appropriate local (state) values
	const [depend_on, setDepend_on] = useState('game');
	const [remoteConfigUrl, setRemoteConfigUrl] = useState('');

	useEffect(() => {
		remoteConfig()
		.setDefaults({
			'depend_on': 'game', //'game' || 'remote_config'
			'url': '',
		})
		.then(() => {
			return remoteConfig().setConfigSettings({
				minimumFetchIntervalMillis: 10000,
			})
		})
		.then(() => remoteConfig().fetchAndActivate())
		.then(fetchedRemotely => {
			setDepend_on(remoteConfig().getValue('depend_on').asString());
			setRemoteConfigUrl(remoteConfig().getValue('url').asString());
			// if (fetchedRemotely) {
			// 	console.log('Configs were retrieved from the backend and activated. \n');
			// } else {
			// 	console.log(
			// 		'No configs were fetched from the backend, and the local configs were already activated \n',
			// 	);
			// }
		})
		.catch(er => console.error(er));
	}, []);

	//get google advertising id and set local (state) advertising_id value
	const advertising_id = useAdvertisingId();

	//set remote config dependent final URL
	const [remoteConfigFinalUrl, setRemoteConfigFinalUrl] = useState('');

	useEffect(() => {
		if (remoteConfigUrl && appsflyer_id && advertising_id) {
			setRemoteConfigFinalUrl(remoteConfigUrl.replace('{appsflyer_id}', appsflyer_id));
			// setRemoteConfigFinalUrl(`${remoteConfigUrl}?app_id=${bundleName}&authentication=${appsflyerDevKey}&appsflyer_id=${appsflyer_id}&advertising_id=${advertising_id}`);
		};
	}, [remoteConfigUrl, appsflyer_id, advertising_id]);

	//set render component
	const [shouldRenderWebView, setShouldRenderWebView] = useState(false);

	useEffect(() => {
		if (depend_on === 'remote_config' && remoteConfigFinalUrl) {
			setShouldRenderWebView(true);
		}
	}, [remoteConfigFinalUrl, depend_on]);

	return (
		<Provider store={store}>
			{!shouldRenderWebView && (
				<Game />
			)}
			{shouldRenderWebView && (
				<WebViewScreen url={remoteConfigFinalUrl} />
			)}
		</Provider>
	);
};

export default App;