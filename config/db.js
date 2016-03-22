// create public connection string
module.exports = {

    //local
    //'url': 'mongo://localhost/test';
    // live on mLab

    'url': 'mongodb://adamrydall:pass123@ds064718.mlab.com:64718/adamcomp2106',
    'githubClientId': '3a75aa9df792f59afaf2',
    'githubClientSecret': '9e351de9d5cd047c870ee49685609b9011b418c9',
    'githubCallbackUrl': 'http://localhost:3000/auth/github/callback'

};