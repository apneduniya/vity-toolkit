import { App, VityToolKit } from 'vity-toolkit';

const toolkit = new VityToolKit({
    appPrivateKey: "3C82AFmHn64h2gYGQbPHFrQB9bJzT5hfSGXuTwpf9RCX59yvusZd5DhVMmq9AYbgRNooGqdY2D2oJqvPAX8CLnGv"
});

const iDetails = await toolkit.getIntegration({ app: App.TWITTER });


if (iDetails.success) {
    console.log("Integration details:\n", iDetails.data);
} else {
    // Get the expected params for the integration and fill in the required values
    const params = toolkit.getExpectedParamsForIntegration({ app: App.TWITTER });
    params.APP_KEY = "YOUR_TWITTER_API_KEY";
    params.APP_SECRET = "YOUR_TWITTER_API_SECRET";

    // Initiate the integration
    await toolkit.appIntegration({
        app: App.TWITTER,
        authData: params,
    })
}

