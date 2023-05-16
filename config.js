const main_config= {
    "clientPort": 8080,
    "catalogHost": "/catalog_admin/index.html#/uploads",
    "monolithHost": "https://qas16.bigbasket.com",
    "grootHost": "/content-svc/apluscontent",
    "partnerLogoutUrl": "/partner/marketeer/tpv_dashboard/",
    "AuthKey": "Authorization",
    "ttl": 24,  
    "debug": true,  
    "BasicAuthVal": "",
    "statusDraft": "cms_contentDrafted",
    "statusRevision": "cms_contentSentForReview",
    "statusReview": "cms_contentCreated",
    "statusActive": "cms_contentActive",
    "statusInactive": "cms_contentInActive",
    "statusSentForPublish": "cms_contentSentForPublish",
    "statusPending": "cms_contentPending",
    "creatorPermission": "cmsCreators",
    "reviewerPermission": "cmsReviewers",
    "publisherPermission": "cmsPublishers",
    "unpublisherPermission": "cmsUnPublishers",
    "imageSize": 1048576,   //1024*1024 = 1MB
    "FroalaKey": "lA5B4C3D1uF2C1F1H2A10C1B5A1D6C4hwJ-7pzxipyiB2G-7ol==",
    "signKey": "",
    "timeout": 1500,
    "pendingTimeout": 30000,
    "pageListSize": "",
    "imageDomain":"https://www.bigbasket.com",
    "templateAPI" :"/content-svc/templates",
    "getGroupUserUrl": "/api/get-group-users/"
}

module.exports = main_config;