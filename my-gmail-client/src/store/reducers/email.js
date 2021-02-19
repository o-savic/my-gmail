import {
	INBOX_LIST,
	STARRED_LIST,
	SNOOZED_LIST,
	SENT_LIST,
	TRASH_LIST,
	ALL_LIST,
	SPAM_LIST,
	DRAFT_LIST,
	IMPORTANT_LIST,

	SENT_EMAIL,
	STARRED_EMAIL,
	DELETED_EMAIL,
	ARCHIVED_EMAIL,
	SPAM_EMAIL,
	SNOOZED_EMAIL,
	READ_EMAIL,
	DRAFT_EMAIL,
	EMAIL_DATA,
	IMPORTANT_EMAIL
} from "../actionTypes";

const DEFAULT_STATE = {
	inboxList: [],
	starredList: [],
	snoozedList: [],
	sentList: [],
	allList: [],
	spamList: [],
	trashList: [],
	draftList: [],
	importantList: [],

	emailData: {},
	sentEmail: {},
	starredEmail: {},
	deletedEmail: {},
	archivedEmail: {},
	spamEmail: {},
	snoozedEmail: {},
	readEmail: {},
	draftEmail: {},
	importantEmail: {}

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
		case SNOOZED_EMAIL:
			return {
				...state,
				snoozedEmail: action.snoozedEmail
			};
		case READ_EMAIL:
			return {
				...state,
				readEmail: action.readEmail
			};
		case DRAFT_EMAIL:
			return {
				...state,
				draftEmail: action.draftEmail
			};
		case IMPORTANT_EMAIL:
			return {
				...state,
				importantEmail: action.importantEmail
			};
		case EMAIL_DATA:
			return {
				...state,
				emailData: action.emailData
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
		case DRAFT_LIST:
			return {
				...state,
				draftList: action.draftList
			};
		case IMPORTANT_LIST:
			return {
				...state,
				importantList: action.importantList
			};
		default:
			return state;
	}
};
