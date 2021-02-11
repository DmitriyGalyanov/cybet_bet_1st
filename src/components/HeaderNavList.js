import React from 'react';

import {ScrollView} from 'react-native';
import HeaderNavListItem from './HeaderNavListItem';

import {routesList} from '../constants';

export default function HeaderNavList() {

	return (
		<ScrollView horizontal>
			{routesList.map((listItem, index) => {
				const {routeName, imgSource, descWord} = listItem;
				return (
					<HeaderNavListItem key={index}
						routeName={routeName}
						imgSource={imgSource}
						descWord={descWord}
					/>
				)
			})}
		</ScrollView>
	)
}
