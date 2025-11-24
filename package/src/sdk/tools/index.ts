import { SolanaWalletTool } from "./solana-wallet";
import { TwitterTool } from "./twitter";
import { EarnTool } from "./earn";
import { BasicMathTool } from "./basic-math";
import { FakeWeatherTool } from "./fake-weather";
import { LanguageTranslatorTool } from "./language-translator";
import { GeoDistanceTool } from "./geo-distance";
import { RandomizerTool } from "./randomizer";

import { solanaWalletGenerateKeypairTool } from "./solana-wallet/actions/generate-keypair";
import { solanaWalletGetBalanceTool } from "./solana-wallet/actions/get-balance";
import { solanaWalletGetMyPublicKeyTool } from "./solana-wallet/actions/get-my-publicKey";
import { solanaWalletTransferTool } from "./solana-wallet/actions/transfer";
import { basicMathSolveTool } from "./basic-math/actions/solve";
import { fakeWeatherGenerateTool } from "./fake-weather/actions/generate";
import { languageTranslatorTool } from "./language-translator/actions/translate";
import { geoDistanceCalculateTool } from "./geo-distance/actions/calculate";
import { randomizerRunTool } from "./randomizer/actions/run";

import {
    twitterSearchTool,
    twitterSearchAllTool,
    twitterHomeTimelineTool,
    twitterUserTimelineTool,
    twitterUserMentionTimelineTool,
    twitterCreateTweetTool,
    twitterReplyTweetTool,
    twitterDeleteTweetTool,
    twitterLikeTweetTool,
    twitterUnlikeTweetTool,
    twitterRetweetTool,
    twitterUnretweetTool,
    twitterTweetCountRecentTool,
    twitterTweetCountAllTool,
    twitterSingleTweetTool,
    twitterGetUserTool,
    twitterGetUserByUsernameTool,
    twitterGetUsersTool,
    twitterGetUsersByUsernamesTool,
    twitterTweetLikedByTool,
    twitterTweetRetweetedByTool,
    twitterCreateTweetThreadTool,
    twitterBookmarkTweetTool,
    twitterRemoveBookmarkTool,
    twitterCreateListTool,
    twitterUpdateListTool,
    twitterDeleteListTool,
    twitterGetSpaceTool,
    twitterGetSpacesTool,
    twitterListDmEventsTool,
    twitterListDmEventsWithParticipantTool,
    twitterListDmEventsOfConversationTool,
    twitterSendDmToParticipantTool,
    twitterSendDmInConversationTool,
    twitterGetComplianceJobTool,
    twitterSearchComplianceJobsTool,
    twitterCreateComplianceJobTool,
    twitterGetComplianceJobResultTool,
} from "./twitter/actions/v2";

import { earnActivityFeedTool } from "./earn/actions/activity-feed";
import { earnFetchGrantDetailsTool } from "./earn/actions/fetch-grant-details";
import { earnFetchExclusiveSponsorGrantsTool } from "./earn/actions/fetch-exclusive-sponsor-grants";
import { earnFetchUserPoWsTool } from "./earn/actions/fetch-user-pow";
import { earnBountyListingsTool } from "./earn/actions/bounty-listings";
import { earnGrantsListingsTool } from "./earn/actions/grants-listings";
import { earnSearchUsersTool } from "./earn/actions/search-users";
import { earnSubmissionDetailsTool } from "./earn/actions/submission-details";
import { earnTotalUserCountTool } from "./earn/actions/total-user-count";
import { earnFetchUserPublicStatsTool } from "./earn/actions/user-public-stats";
import { earnFetchFeedTool } from "./earn/actions/feed";

import { RedditTool } from "./reddit";
import { redditFilterTool } from "./reddit/actions/filter";
import { redditCommentTool } from "./reddit/actions/comment";
import { redditCreatePostTool } from "./reddit/actions/create-post";
import { redditDeletePostTool } from "./reddit/actions/delete-post";

import { GibworkTool } from "./gibwork";
import { gibworkExploreTool } from "./gibwork/actions/explore";
import { gibworkTasksTool } from "./gibwork/actions/tasks";
import { gibworkCreateTaskTool } from "./gibwork/actions/create-task";

import { GitHubTool } from "./github";
import { githubSearchRepositoriesTool } from "./github/actions/search-repositories";
import { githubCreateRepositoryTool } from "./github/actions/create-repository";
import { githubGetFileContentsTool } from "./github/actions/get-file-contents";
import { githubCreateOrUpdateFileTool } from "./github/actions/create-or-update-file";
import { githubCreateIssueTool } from "./github/actions/create-issue";
import { githubCreatePullRequestTool } from "./github/actions/create-pull-request";

import { StampchainTool } from "./stampchain";
import { stampchainGetStampTool } from "./stampchain/actions/get-stamp";
import { stampchainSearchStampsTool } from "./stampchain/actions/search-stamps";
import { stampchainGetRecentStampsTool } from "./stampchain/actions/get-recent-stamps";
import { stampchainGetRecentSalesTool } from "./stampchain/actions/get-recent-sales";
import { stampchainGetMarketDataTool } from "./stampchain/actions/get-market-data";
import { stampchainGetStampMarketDataTool } from "./stampchain/actions/get-stamp-market-data";

import { PexelsTool } from "./pexels";
import { pexelsSearchPhotosTool } from "./pexels/actions/search-photos";
import { pexelsSearchVideosTool } from "./pexels/actions/search-videos";
import { pexelsGetPhotoTool } from "./pexels/actions/get-photo";
import { pexelsGetVideoTool } from "./pexels/actions/get-video";
import { pexelsGetCuratedPhotosTool } from "./pexels/actions/get-curated-photos";
import { pexelsGetPopularVideosTool } from "./pexels/actions/get-popular-videos";

import { NotionTool } from "./notion";
import { notionSearchTool } from "./notion/actions/search";
import { notionGetPageTool } from "./notion/actions/get-page";
import { notionGetDatabaseTool } from "./notion/actions/get-database";
import { notionQueryDatabaseTool } from "./notion/actions/query-database";
import { notionCreatePageTool } from "./notion/actions/create-page";
import { notionAppendBlockChildrenTool } from "./notion/actions/append-block-children";
import { notionRetrieveBlockTool } from "./notion/actions/retrieve-block";
import { notionRetrieveBlockChildrenTool } from "./notion/actions/retrieve-block-children";
import { notionListUsersTool } from "./notion/actions/list-users";
import { notionListCommentsTool } from "./notion/actions/list-comments";
import { notionCreateCommentTool } from "./notion/actions/create-comment";

import { TavilyTool } from "./tavily";
import { tavilySearchTool } from "./tavily/actions/search";
import { tavilyExtractTool } from "./tavily/actions/extract";
import { tavilyCrawlTool } from "./tavily/actions/crawl";
import { tavilyMapTool } from "./tavily/actions/map";

import { AgentMailTool } from "./agentmail";
import { agentmailListToolsTool } from "./agentmail/actions/list-tools";
import { agentmailExecuteTool } from "./agentmail/actions/execute";


//  A P P S

export enum App {
    SOLANA_WALLET = 'solana-wallet',
    TWITTER = 'twitter',
    EARN = 'earn',
    REDDIT = 'reddit',
    GIBWORK = 'gibwork',
    GITHUB = 'github',
    STAMPCHAIN = 'stampchain',
    PEXELS = 'pexels',
    NOTION = 'notion',
    TAVILY = 'tavily',
    AGENTMAIL = 'agentmail',
    BASIC_MATH = 'basic-math',
    FAKE_WEATHER = 'fake-weather',
    LANGUAGE_TRANSLATOR = 'language-translator',
    GEO_DISTANCE = 'geo-distance',
    RANDOMIZER = 'randomizer',
}

export const appsMap = {
    [App.SOLANA_WALLET]: SolanaWalletTool,
    [App.TWITTER]: TwitterTool,
    [App.EARN]: EarnTool,
    [App.REDDIT]: RedditTool,
    [App.GIBWORK]: GibworkTool,
    [App.GITHUB]: GitHubTool,
    [App.STAMPCHAIN]: StampchainTool,
    [App.PEXELS]: PexelsTool,
    [App.NOTION]: NotionTool,
    [App.TAVILY]: TavilyTool,
    [App.AGENTMAIL]: AgentMailTool,
    [App.BASIC_MATH]: BasicMathTool,
    [App.FAKE_WEATHER]: FakeWeatherTool,
    [App.LANGUAGE_TRANSLATOR]: LanguageTranslatorTool,
    [App.GEO_DISTANCE]: GeoDistanceTool,
    [App.RANDOMIZER]: RandomizerTool,
}

// Integrable apps

export type IntegrableApps = Extract<
    App,
    App.TWITTER | App.REDDIT
>;

// Connectable apps

export type ConnectableApps = Extract<
    App,
    App.TWITTER | App.REDDIT | App.GITHUB | App.PEXELS | App.NOTION | App.TAVILY | App.AGENTMAIL
>;


// A C T I O N S

export enum Action {
    SOLANA_WALLET_GENERATE_KEYPAIR,
    SOLANA_WALLET_GET_BALANCE,
    SOLANA_WALLET_GET_MY_PUBLIC_KEY,
    SOLANA_WALLET_TRANSFER,

    TWITTER_SEARCH,
    TWITTER_SEARCH_ALL,
    TWITTER_HOME_TIMELINE,
    TWITTER_USER_TIMELINE,
    TWITTER_USER_MENTION_TIMELINE,
    TWITTER_CREATE_TWEET,
    TWITTER_REPLY_TWEET,
    TWITTER_DELETE_TWEET,
    TWITTER_LIKE_TWEET,
    TWITTER_UNLIKE_TWEET,
    TWITTER_RETWEET,
    TWITTER_UNRETWEET,
    TWITTER_TWEET_COUNT_RECENT,
    TWITTER_TWEET_COUNT_ALL,
    TWITTER_SINGLE_TWEET,
    TWITTER_GET_USER,
    TWITTER_GET_USER_BY_USERNAME,
    TWITTER_GET_USERS,
    TWITTER_GET_USERS_BY_USERNAMES,
    TWITTER_TWEET_LIKED_BY,
    TWITTER_TWEET_RETWEETED_BY,
    TWITTER_CREATE_TWEET_THREAD,
    TWITTER_BOOKMARK_TWEET,
    TWITTER_REMOVE_BOOKMARK,
    TWITTER_CREATE_LIST,
    TWITTER_UPDATE_LIST,
    TWITTER_DELETE_LIST,
    TWITTER_GET_SPACE,
    TWITTER_GET_SPACES,
    TWITTER_LIST_DM_EVENTS,
    TWITTER_LIST_DM_EVENTS_WITH_PARTICIPANT,
    TWITTER_LIST_DM_EVENTS_OF_CONVERSATION,
    TWITTER_SEND_DM_TO_PARTICIPANT,
    TWITTER_SEND_DM_IN_CONVERSATION,
    TWITTER_GET_COMPLIANCE_JOB,
    TWITTER_SEARCH_COMPLIANCE_JOBS,
    TWITTER_CREATE_COMPLIANCE_JOB,
    TWITTER_GET_COMPLIANCE_JOB_RESULT,

    EARN_ACTIVITY_FEED,
    EARN_FETCH_FEED,
    EARN_FETCH_GRANT_DETAILS,
    EARN_FETCH_EXCLUSIVE_SPONSOR_GRANTS,
    EARN_FETCH_USER_POWS,
    EARN_BOUNTY_LISTINGS,
    EARN_GRANT_LISTINGS,
    EARN_SEARCH_USERS,
    EARN_SUBMISSION_DETAILS,
    EARN_TOTAL_USER_COUNT,
    EARN_FETCH_USER_PUBLIC_STATS,

    REDDIT_FILTER,
    REDDIT_COMMENT,
    REDDIT_CREATE_POST,
    REDDIT_DELETE_POST,

    GIBWORK_EXPLORE,
    GIBWORK_TASKS,
    GIBWORK_CREATE_TASK,

    GITHUB_SEARCH_REPOSITORIES,
    GITHUB_CREATE_REPOSITORY,
    GITHUB_GET_FILE_CONTENTS,
    GITHUB_CREATE_OR_UPDATE_FILE,
    GITHUB_CREATE_ISSUE,
    GITHUB_CREATE_PULL_REQUEST,

    STAMPCHAIN_GET_STAMP,
    STAMPCHAIN_SEARCH_STAMPS,
    STAMPCHAIN_GET_RECENT_STAMPS,
    STAMPCHAIN_GET_RECENT_SALES,
    STAMPCHAIN_GET_MARKET_DATA,
    STAMPCHAIN_GET_STAMP_MARKET_DATA,

    PEXELS_SEARCH_PHOTOS,
    PEXELS_SEARCH_VIDEOS,
    PEXELS_GET_PHOTO,
    PEXELS_GET_VIDEO,
    PEXELS_GET_CURATED_PHOTOS,
    PEXELS_GET_POPULAR_VIDEOS,

    NOTION_SEARCH,
    NOTION_GET_PAGE,
    NOTION_GET_DATABASE,
    NOTION_QUERY_DATABASE,
    NOTION_CREATE_PAGE,
    NOTION_APPEND_BLOCK_CHILDREN,
    NOTION_RETRIEVE_BLOCK,
    NOTION_RETRIEVE_BLOCK_CHILDREN,
    NOTION_LIST_USERS,
    NOTION_LIST_COMMENTS,
    NOTION_CREATE_COMMENT,

    TAVILY_SEARCH,
    TAVILY_EXTRACT,
    TAVILY_CRAWL,
    TAVILY_MAP,

    AGENTMAIL_LIST_TOOLS,
    AGENTMAIL_EXECUTE,

    BASIC_MATH_SOLVE,

    FAKE_WEATHER_GENERATE,

    LANGUAGE_TRANSLATOR_TRANSLATE,

    GEO_DISTANCE_CALCULATE,
    
    RANDOMIZER_RUN,
}

export const actionsMap = {
    [Action.SOLANA_WALLET_GENERATE_KEYPAIR]: solanaWalletGenerateKeypairTool,
    [Action.SOLANA_WALLET_GET_BALANCE]: solanaWalletGetBalanceTool,
    [Action.SOLANA_WALLET_GET_MY_PUBLIC_KEY]: solanaWalletGetMyPublicKeyTool,
    [Action.SOLANA_WALLET_TRANSFER]: solanaWalletTransferTool,

    [Action.TWITTER_SEARCH]: twitterSearchTool,
    [Action.TWITTER_SEARCH_ALL]: twitterSearchAllTool,
    [Action.TWITTER_HOME_TIMELINE]: twitterHomeTimelineTool,
    [Action.TWITTER_USER_TIMELINE]: twitterUserTimelineTool,
    [Action.TWITTER_USER_MENTION_TIMELINE]: twitterUserMentionTimelineTool,
    [Action.TWITTER_CREATE_TWEET]: twitterCreateTweetTool,
    [Action.TWITTER_REPLY_TWEET]: twitterReplyTweetTool,
    [Action.TWITTER_DELETE_TWEET]: twitterDeleteTweetTool,
    [Action.TWITTER_LIKE_TWEET]: twitterLikeTweetTool,
    [Action.TWITTER_UNLIKE_TWEET]: twitterUnlikeTweetTool,
    [Action.TWITTER_RETWEET]: twitterRetweetTool,
    [Action.TWITTER_UNRETWEET]: twitterUnretweetTool,
    [Action.TWITTER_TWEET_COUNT_RECENT]: twitterTweetCountRecentTool,
    [Action.TWITTER_TWEET_COUNT_ALL]: twitterTweetCountAllTool,
    [Action.TWITTER_SINGLE_TWEET]: twitterSingleTweetTool,
    [Action.TWITTER_GET_USER]: twitterGetUserTool,
    [Action.TWITTER_GET_USER_BY_USERNAME]: twitterGetUserByUsernameTool,
    [Action.TWITTER_GET_USERS]: twitterGetUsersTool,
    [Action.TWITTER_GET_USERS_BY_USERNAMES]: twitterGetUsersByUsernamesTool,
    [Action.TWITTER_TWEET_LIKED_BY]: twitterTweetLikedByTool,
    [Action.TWITTER_TWEET_RETWEETED_BY]: twitterTweetRetweetedByTool,
    [Action.TWITTER_CREATE_TWEET_THREAD]: twitterCreateTweetThreadTool,
    [Action.TWITTER_BOOKMARK_TWEET]: twitterBookmarkTweetTool,
    [Action.TWITTER_REMOVE_BOOKMARK]: twitterRemoveBookmarkTool,
    [Action.TWITTER_CREATE_LIST]: twitterCreateListTool,
    [Action.TWITTER_UPDATE_LIST]: twitterUpdateListTool,
    [Action.TWITTER_DELETE_LIST]: twitterDeleteListTool,
    [Action.TWITTER_GET_SPACE]: twitterGetSpaceTool,
    [Action.TWITTER_GET_SPACES]: twitterGetSpacesTool,
    [Action.TWITTER_LIST_DM_EVENTS]: twitterListDmEventsTool,
    [Action.TWITTER_LIST_DM_EVENTS_WITH_PARTICIPANT]: twitterListDmEventsWithParticipantTool,
    [Action.TWITTER_LIST_DM_EVENTS_OF_CONVERSATION]: twitterListDmEventsOfConversationTool,
    [Action.TWITTER_SEND_DM_TO_PARTICIPANT]: twitterSendDmToParticipantTool,
    [Action.TWITTER_SEND_DM_IN_CONVERSATION]: twitterSendDmInConversationTool,
    [Action.TWITTER_GET_COMPLIANCE_JOB]: twitterGetComplianceJobTool,
    [Action.TWITTER_SEARCH_COMPLIANCE_JOBS]: twitterSearchComplianceJobsTool,
    [Action.TWITTER_CREATE_COMPLIANCE_JOB]: twitterCreateComplianceJobTool,
    [Action.TWITTER_GET_COMPLIANCE_JOB_RESULT]: twitterGetComplianceJobResultTool,

    [Action.EARN_ACTIVITY_FEED]: earnActivityFeedTool,
    [Action.EARN_FETCH_FEED]: earnFetchFeedTool,
    [Action.EARN_FETCH_GRANT_DETAILS]: earnFetchGrantDetailsTool,
    [Action.EARN_FETCH_EXCLUSIVE_SPONSOR_GRANTS]: earnFetchExclusiveSponsorGrantsTool,
    [Action.EARN_FETCH_USER_POWS]: earnFetchUserPoWsTool,
    [Action.EARN_BOUNTY_LISTINGS]: earnBountyListingsTool,
    [Action.EARN_GRANT_LISTINGS]: earnGrantsListingsTool,
    [Action.EARN_SEARCH_USERS]: earnSearchUsersTool,
    [Action.EARN_SUBMISSION_DETAILS]: earnSubmissionDetailsTool,
    [Action.EARN_TOTAL_USER_COUNT]: earnTotalUserCountTool,
    [Action.EARN_FETCH_USER_PUBLIC_STATS]: earnFetchUserPublicStatsTool,

    [Action.REDDIT_FILTER]: redditFilterTool,
    [Action.REDDIT_COMMENT]: redditCommentTool,
    [Action.REDDIT_CREATE_POST]: redditCreatePostTool,
    [Action.REDDIT_DELETE_POST]: redditDeletePostTool,

    [Action.GIBWORK_EXPLORE]: gibworkExploreTool,
    [Action.GIBWORK_TASKS]: gibworkTasksTool,
    [Action.GIBWORK_CREATE_TASK]: gibworkCreateTaskTool,

    [Action.GITHUB_SEARCH_REPOSITORIES]: githubSearchRepositoriesTool,
    [Action.GITHUB_CREATE_REPOSITORY]: githubCreateRepositoryTool,
    [Action.GITHUB_GET_FILE_CONTENTS]: githubGetFileContentsTool,
    [Action.GITHUB_CREATE_OR_UPDATE_FILE]: githubCreateOrUpdateFileTool,
    [Action.GITHUB_CREATE_ISSUE]: githubCreateIssueTool,
    [Action.GITHUB_CREATE_PULL_REQUEST]: githubCreatePullRequestTool,

    [Action.STAMPCHAIN_GET_STAMP]: stampchainGetStampTool,
    [Action.STAMPCHAIN_SEARCH_STAMPS]: stampchainSearchStampsTool,
    [Action.STAMPCHAIN_GET_RECENT_STAMPS]: stampchainGetRecentStampsTool,
    [Action.STAMPCHAIN_GET_RECENT_SALES]: stampchainGetRecentSalesTool,
    [Action.STAMPCHAIN_GET_MARKET_DATA]: stampchainGetMarketDataTool,
    [Action.STAMPCHAIN_GET_STAMP_MARKET_DATA]: stampchainGetStampMarketDataTool,

    [Action.PEXELS_SEARCH_PHOTOS]: pexelsSearchPhotosTool,
    [Action.PEXELS_SEARCH_VIDEOS]: pexelsSearchVideosTool,
    [Action.PEXELS_GET_PHOTO]: pexelsGetPhotoTool,
    [Action.PEXELS_GET_VIDEO]: pexelsGetVideoTool,
    [Action.PEXELS_GET_CURATED_PHOTOS]: pexelsGetCuratedPhotosTool,
    [Action.PEXELS_GET_POPULAR_VIDEOS]: pexelsGetPopularVideosTool,

    [Action.NOTION_SEARCH]: notionSearchTool,
    [Action.NOTION_GET_PAGE]: notionGetPageTool,
    [Action.NOTION_GET_DATABASE]: notionGetDatabaseTool,
    [Action.NOTION_QUERY_DATABASE]: notionQueryDatabaseTool,
    [Action.NOTION_CREATE_PAGE]: notionCreatePageTool,
    [Action.NOTION_APPEND_BLOCK_CHILDREN]: notionAppendBlockChildrenTool,
    [Action.NOTION_RETRIEVE_BLOCK]: notionRetrieveBlockTool,
    [Action.NOTION_RETRIEVE_BLOCK_CHILDREN]: notionRetrieveBlockChildrenTool,
    [Action.NOTION_LIST_USERS]: notionListUsersTool,
    [Action.NOTION_LIST_COMMENTS]: notionListCommentsTool,
    [Action.NOTION_CREATE_COMMENT]: notionCreateCommentTool,

    [Action.TAVILY_SEARCH]: tavilySearchTool,
    [Action.TAVILY_EXTRACT]: tavilyExtractTool,
    [Action.TAVILY_CRAWL]: tavilyCrawlTool,
    [Action.TAVILY_MAP]: tavilyMapTool,

    [Action.AGENTMAIL_LIST_TOOLS]: agentmailListToolsTool,
    [Action.AGENTMAIL_EXECUTE]: agentmailExecuteTool,
    [Action.BASIC_MATH_SOLVE]: basicMathSolveTool,
    [Action.FAKE_WEATHER_GENERATE]: fakeWeatherGenerateTool,
    [Action.LANGUAGE_TRANSLATOR_TRANSLATE]: languageTranslatorTool,
    [Action.GEO_DISTANCE_CALCULATE]: geoDistanceCalculateTool,
    [Action.RANDOMIZER_RUN]: randomizerRunTool,
}


