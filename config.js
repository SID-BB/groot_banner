const main_config= {
    "clientPort": process.env.CLIENT_PORT,
    "catalogHost": process.env.CATALOG_HOST,
    "monolithHost": process.env.MONOLITH_HOST,
    "grootHost": process.env.GROOT_HOST,
    "partnerLogoutUrl": process.env.PARTNER_LOGOUT_URL,
    "AuthKey": process.env.AUTH_KEY,
    "ttl": process.env.TTL,  
    "debug": process.env.DEBUG,  
    "BasicAuthVal": process.env.BASIC_AUTH,
    "statusDraft": process.env.STATUS_DRAFT,
    "statusRevision": process.env.STATUS_REVISION,
    "statusReview": process.env.STATUS_REVIEW,
    "statusActive": process.env.STATUS_ACTIVE,
    "statusInactive": process.env.STATUS_INACTIVE,
    "statusSentForPublish": process.env.STATUS_SENT_FOR_PUBLISH,
    "statusPending": process.env.STATUS_PENDING,
    "creatorPermission": process.env.CREATOR_PERMISSION,
    "reviewerPermission": process.env.REVIEWER_PERMISSION,
    "publisherPermission": process.env.PUBLISHER_PERMISSION,
    "unpublisherPermission": process.env.UNPUBLISHER_PERMISSION,
    "imageSize": process.env.IMAGE_SIZE,   //1024*1024 = 1MB
    "FroalaKey": process.env.FROALA_KEY,
    "signKey": process.env.SIGN_KEY,
    "timeout": process.env.TIMEOUT,
    "pendingTimeout": process.env.PENDING_TIMEOUT,
    "pageListSize": process.env.PAGE_LIST_SIZE,
    "templateAPI": process.env.TEMPLATE_API,
    "getGroupUserUrl": process.env.GET_GROUP_USER_URL
}

module.exports = main_config;