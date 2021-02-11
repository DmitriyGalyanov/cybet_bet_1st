//main
import {Dimensions} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
export {windowWidth, windowHeight};

export const gameScreenPadding = 8;

export const teamImgInTileWidth = windowWidth * 0.2;
export const teamImgInTileHeight = teamImgInTileWidth;

export const teamImgWidth = windowWidth * 0.2;
export const teamImgHeight = teamImgWidth;

export const navigationHeaderBarHeight = 54;

//initial values
export const initialMatchesAmount = 15;

export const initialBalance = 1500;

export const betAmount = 100; //unchangeable ...

export const resultsInRuArray = [
	'Победа левой команды',
	'Ничья',
	'Победа правой команды',
];

//styles
export const mainBGColor = '#242422';

export const matchTileWidth = windowWidth * 0.9;
export const matchTileHeight = matchTileWidth * 0.5; //
export const matchTileBGColor = '#404040';

export const roundedTeamImgBGColor = '#615C68';
export const roundedTeamImgShadowColor = '#803C3940';


export const mainColor = 'yellow';

export const mainButtonsTextStyle = {
	color: mainColor,
	textTransform: 'uppercase',
	fontSize: 18,
	fontWeight: 'bold',
};

export const matchTileTextStyle = {
	color: mainColor,
	fontSize: 18,
};

export const coloredHeadersTextStyle = {
	color: mainColor,
	fontSize: 22,
	fontWeight: 'bold',
	textTransform: 'uppercase',
};
export const headersTextStyle = {
	color: '#000',
	fontSize: 22,
	fontWeight: 'bold',
	textTransform: 'uppercase',
};

export const secondaryTextStyle = {
	color: mainColor,
	fontSize: 20,
};


//HeaderNavList
import {headerNavListItemsArray} from '../assets/images';

export const headerNavListItemImgWidth = 50;
export const headerNavListItemImgHeight = 50;
export const headerNavListItemWidth = headerNavListItemImgWidth * 1.6;
export const headerNavListItemHeight = headerNavListItemWidth;

export const headerNavListItemsData = [
	{
		routeName: 'all',
		imgSource: headerNavListItemsArray[0],
		title: 'Все',
	},
	{
		routeName: 'football',
		imgSource: headerNavListItemsArray[1],
		title: 'Футбол',
	},
];


// not game-logics related
export const appsflyerDevKey = 'Cb84BpRLyB5r2M9m8zjhfe';
export const bundleName = 'com.cybet_bet_1st';
export const theXValue = 14;