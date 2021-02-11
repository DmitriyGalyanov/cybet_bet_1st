import React from 'react';

import {ScrollView} from 'react-native';
import { headerDateNavItemsData } from '../constants';
import HeaderDateNavItem from './HeaderDateNavItem';


export default function HeaderDateNav() {

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{headerDateNavItemsData.map((item, index) => {
				const {dateName, title} = item;
				return (
					<HeaderDateNavItem key={index}
						dateName={dateName}
						title={title}
					/>
				)
			})}
		</ScrollView>
	)
}