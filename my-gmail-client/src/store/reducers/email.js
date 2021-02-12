import {
	INBOX_LIST,
	STARRED_LIST,
	SNOOZED_LIST,
	SENT_LIST,
	TRASH_LIST,
	ALL_LIST,
	SPAM_LIST
} from "../actionTypes";

const DEFAULT_STATE = {
	inboxList: [],
	starredList: [],
	snoozedList: [],
	sentList: [],
	allList: [],
	spamList: [],
	trashList: []

};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case INBOX_LIST:
			return {
				...state,
				inboxList: action.inboxList
			};
		case STARRED_LIST:
			return {
				...state,
				starredList: action.starredList
			};
		case SNOOZED_LIST:
			return {
				...state,
				snoozedList: action.snoozedList
			};
		case SENT_LIST:
			return {
				...state,
				sentList: action.sentList
			};
		case ALL_LIST:
			return {
				...state,
				allList: action.allList
			};
		case SPAM_LIST:
			return {
				...state,
				spamList: action.spamList
			};
		case TRASH_LIST:
			return {
				...state,
				trashList: action.trashList
			};
		default:
			return state;
	}
};
