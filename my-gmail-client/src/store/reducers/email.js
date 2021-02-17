import {
	INBOX_LIST,
	STARRED_LIST,
	SNOOZED_LIST,
	SENT_LIST,
	TRASH_LIST,
	ALL_LIST,
	SPAM_LIST,
	SENT_EMAIL,
	STARRED_EMAIL,
	DELETED_EMAIL,
	ARCHIVED_EMAIL,
	SPAM_EMAIL
} from "../actionTypes";

const DEFAULT_STATE = {
	inboxList: [],
	starredList: [],
	snoozedList: [],
	sentList: [],
	allList: [],
	spamList: [],
	trashList: [],
	sentEmail: {},
	starredEmail: {},
	deletedEmail: {},
	archivedEmail: {},
	spamEmail: {}

};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SENT_EMAIL:
			return {
				...state,
				sentEmail: action.sentEmail
			};
		case STARRED_EMAIL:
			return {
				...state,
				starredEmail: action.starredEmail
			};
		case DELETED_EMAIL:
			return {
				...state,
				deletedEmail: action.deletedEmail
			};
		case ARCHIVED_EMAIL:
			return {
				...state,
				archivedEmail: action.archivedEmail
			};
		case SPAM_EMAIL:
			return {
				...state,
				spamEmail: action.spamEmail
			};
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
