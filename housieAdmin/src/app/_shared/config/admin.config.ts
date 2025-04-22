import { IAppConfig } from './iapp.config';

import { environment } from 'src/environments/environment';

export const AdminConfig: IAppConfig = {

    host: environment.host,

    endpoints: {
        login: 'login',
        logout: 'logout',
        forgotPassword: 'forgotPassword',
        resetPassword: 'resetPassword',
        changePassword: 'changePassword',

        editProfile: 'editProfile',
        getProfileById:'getProfileById',
        getCounts: 'getCounts',

        getUsers: 'getUsers',
        tdsDetails: 'tdsDetails',
        DepositGstDetails:'deposit/list',
        updateUser: 'updateUser',
        deleteUser: 'deleteUser',
        getUesrDetails: 'getUserDetails',
        updateKYC: 'updateKYC',

        getBanners: 'getBanners',
        uploadForm16: 'uploadForm16',
        getForm16ForUser: 'getForm16ForUser',
        addBanner: 'addBanner',
        updateBanner: 'updateBanner',
        deleteBanner: 'deleteBanner',

        getBonus: 'getBonus',
        addBonus: 'addBonus',
        updateBonus: 'updateBonus',
        deleteBonus: 'deleteBonus',

        getAdmin: 'getAdmin',
        addAdmin: 'add-admin',
        updateAdmin: 'updateAdmin',
        deleteAdmin: 'deleteAdmin',

        getSet: 'getSet',
        addSet: 'addSet',
        deleteSet: 'deleteSet',
        updateQuiz: 'updateQuiz',

        getQuestions: "getQuestions",
        addQuestion: 'addQuestion',
        updateQuestion: 'updateQuestion',
        deleteQuestion: "deleteQuestion",

        getWithdrawRequests: 'getWithdrawRequests',
        updateWithdrawRequests: 'updateWithdrawRequests',
        getuserTransactions: 'getuserTransactions',
        withdrawRequestsFilter: 'withdrawRequestsFilter',
        getTranscationDetails: 'getTranscationDetails', //reports

        uploadAppAndroid: 'uploadAppAndroid',
        uploadAppIOS: 'uploadAppIOS',

        //Content Management
        addGame: "addGame",
        getGame: "getGame",
        deleteGame: "deleteGame",
        cancelGame: "cancelGame",
        updateGame: 'updateGame',
        getGameById: 'getGameById',
        getGameByStatus:'getGameByStatus',
        getUsersParticipated:"getUsersParticipated",
        getUserTicketsByGameId:"fullgame/details",
        getNumberDetailsByUserId:"getNumberDetailsByUserId",
        getUsersByNumberCrossed:"fullgame/number/details",
        getOverAllNumbers:"getGameNumbers",
        getUsersByWinning:"leaderboard",

        getallUsersByWinning:"getallUsersByWinning",
        downloadImage:"downloadImage", 
               //notification:-
        addNotification: 'addNotification',
        getNotification: 'getNotification',
        deleteNotification: 'deleteNotification',
        updateNotification: 'updateNotification',
        transactionsFilter:'transactionsFilter',
        updateUserWallet:'updateUserWallet',
        pushNotification:"pushNotification"
    },

    messages: {
        http_error: 'Please try again after some time'
    },
}
