//main
import {Dimensions} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
export {windowWidth, windowHeight};

export const gameScreenPadding = 8;

export const teamImgWidth = windowWidth * 0.2;
export const teamImgHeight = teamImgWidth;

//initial values
export const initialMatchesAmount = 25;

export const initialBalance = 1500;

export const betAmount = 100; //unchangeable ...

export const resultsInRuArray = [
	'Победа левой команды',
	'Ничья',
	'Победа правой команды',
];

//styles
export const mainBGColor = '#242422';

export const roundedTeamImgBGColor = '#615C68';
export const roundedTeamImgShadowColor = '#803C3940';

export const mainColor = 'yellow';
export const masterColor = 'white';
export const accentColor = '#2B6DDB';
export const mainTextColor = 'black';
export const grayedTextColor = '#ACACAC';

export const mainButtonsTextStyle = {
	color: mainColor,
	textTransform: 'uppercase',
	fontSize: 18,
	fontWeight: 'bold',
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

//routes
import {headerNavListItemsArray} from '../assets/images';

export const routesList = [
	{
		routeName: 'all',
		imgSource: headerNavListItemsArray[0],
		descWord: 'всё',
	},
	{
		routeName: 'footballPredictionsScreen',
		imgSource: headerNavListItemsArray[1],
		descWord: 'футбол',
	},
];

//navigation default header bar
export const navigationHeaderBarHeight = 54;

export const navigationHeaderBarImgWidth = 40;
export const navigationHeaderBarImgHeight = navigationHeaderBarImgWidth;

//HeaderNavList
export const headerNavListItemImgWidth = 50;
export const headerNavListItemImgHeight = 50;
export const headerNavListItemWidth = headerNavListItemImgWidth * 1.6;
export const headerNavListItemHeight = headerNavListItemWidth;

//HeaderDateNav
export const headerDateNavItemsData = [
	{
		dateName: 'any',
		title: 'Все дни',
	},
	{
		dateName: 'today',
		title: 'Сегодня',
	},
	{
		dateName: 'tomorrow',
		title: 'Завтра',
	},
	{
		dateName: 'later',
		title: 'Позже',
	},
];

// export const headerDateNavItemWidth = windowWidth / headerDateNavItemsData.length;
export const headerDateNavItemWidth = windowWidth / headerDateNavItemsData.length <= 115
	? windowWidth / headerDateNavItemsData.length
	: 115;

//PredictionsSection
export const predictionsSectionImgWidth = 60;
export const predictionsSectionImgHeight = 60;
//MatchTile
export const matchTileMaxWidth = (windowWidth / 2) - 6; //double margin
export const matchTileBGColor = masterColor;

export const teamImgInTileWidth = 50;
export const teamImgInTileHeight = teamImgInTileWidth;

//modal
export const teamImgInModalWidth = 70;
export const teamImgInModalHeight = teamImgInModalWidth;

export const confettiWidth = windowWidth * 0.3;
export const confettiHeight = confettiWidth * 1.14;

//
export const bottomNavBarHeight = 60;

// not game-logics related
export const appsflyerDevKey = 'Cb84BpRLyB5r2M9m8zjhfe';
export const bundleName = 'com.cybet_bet_1st';
export const theXValue = 14;