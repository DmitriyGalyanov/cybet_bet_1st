import React from 'react';

import {ScrollView} from 'react-native';
import HeaderNavListItem from './HeaderNavListItem';

import {headerNavListItemsData} from '../constants';

export default function HeaderNavList() {

	return (
		<ScrollView horizontal>
			{headerNavListItemsData.map((listItem, index) => {
				const {routeName, imgSource, title} = listItem;
				return (
					<HeaderNavListItem key={index}
						routeName={routeName}
						imgSource={imgSource}
						title={title}
					/>
				)
			})}
		</ScrollView>
	)
}
